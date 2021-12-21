
<template>
  <div>
    <div class="row">
      <div class="col-12">
        <h1><strong>Fila: </strong>{{title}}</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-3 card card-default">
        <div class="card-body text-center ">
          {{ onHoldCalls.length }}
          <br />
          Ch. em espera
        </div>
      </div>
      <div class="col-3 card card-default">
        <div class="card-body text-center">
          {{ answered }}
          <br />
          Atendidas
        </div>
      </div>
      <div class="col-3 card card-default">
        <div class="card-body text-center">
          {{ abandon }}
          <br />
          Abandonadas
        </div>
      </div>
      <div class="col-3 card card-default">
        <div class="card-body text-center">
          {{ (parseInt(answered)+parseInt(abandon)) }}
          <br />
          Total
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <h3>Agentes:</h3>
        <table class="table table-hover table-bordered">
          <tr>
            <th>Agente:</th>
            <th>Ramal:</th>
            <th>Pausa:</th>
            <th>Status:</th>
          </tr>
          <tr v-for="agent in agents" v-bind:key="agent">
            <td>{{agent.name}}</td>
            <td>{{agent.location}}</td>
            <td>{{agent.paused}}</td>
            <td>{{agent.status}}</td>
            </tr>
        </table>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <h3>Ch. em espera:</h3>
        <table class="table table-hover table-bordered">
          <tr>
            <th>Bina:</th>
          </tr>
          <tr v-for="call in onHoldCalls" v-bind:key="call">
              <td>{{ call.clid }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const io = require('socket.io-client')
// import  io  from '../../socket.io-client/dist/socket.io'
export default {
  name: 'Monitor',
  data () {
    return {
      title: "",
      answered: 0,
      abandon: 0,
      agents: [],
      onHoldCalls: []
    }
  },
  mounted () {
    setTimeout(function () {
      fetch('http://localhost:3000/stats?queue=Entrada')
    }, 1000)

    const socket = io('http://localhost:3000')

    socket.on('Entrada', async (event) => {
      console.log(JSON.stringify(event))
      this.title = event.queue

      if (event.event == 'QueueParams') {
        this.abandon = event.abandoned
        this.answered = event.completed
      }

      if (event.event == 'QueueMember') {
        this.agents.push({ name: event.name, location: event.location, status: event.status, paused: event.paused })
      }

      if (event.event == 'QueueCallerJoin') {
        this.onHoldCalls.push({ clid: event.calleridnum, uniqueid: event.uniqueid })
      }

      if (event.event == 'QueueCallerLeave') {
        const tmpOnHoldCalls = []

        this.onHoldCalls.forEach((call) => {
          if (call.uniqueid != event.uniqueid) {
            tmpOnHoldCalls.push({ clid: call.clid, uniqueid: call.uniqueid })
          }
        })

        this.onHoldCalls = tmpOnHoldCalls
      }

      if (event.event == 'QueueMemberStatus') {
        const tmpAgents = []

        this.agents.forEach((agent) => {
          if (agent.location == event.interface) {
            agent.status = event.status
            agent.paused = event.paused
          }

          tmpAgents.push(agent)
        })

        this.agents = tmpAgents
      }

      if (event.event == 'QueueCallerAbandon') {
        this.abandon = parseInt(this.abandon) + 1
      }

      if (event.event == 'AgentConnect') {
        this.answered = parseInt(this.answered) + 1
      }
    })
  }
}
</script>
