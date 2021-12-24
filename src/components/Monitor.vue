
<template>
    <q-layout view="hHh lpR fFf">
    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div class="row q-mt-md">
        <div class="col-md-12">
            <div class="justify-center q-pa-md q-gutter-sm">
              <q-card class="my-card q-mt-xl">
                <q-card-section class="bg-dark text-white">
                  <div class="text-h6">{{title}}</div>
                </q-card-section>
              </q-card>
            </div>
            <div class="justify-center q-pa-md q-gutter-sm">
              <q-card v-for="call in onHoldCalls" v-bind:key="call" class="my-card">
                <q-card-section class="bg-warning text-dark">
                  <div class="text-subtitle2">{{call.clid}}</div>
                </q-card-section>
              </q-card>
            </div>
        </div>
    </div>

    </q-drawer>

    <q-page-container>

         <div class="row justify-center q-gutter-md">
            <q-card v-for="agent in agents" v-bind:key="agent" class="my-card col-md-3">
              <q-card-section class="bg-primary text-white">
                <div class="text-h6">{{agent.name}}</div>
                <div class="text-subtitle2">{{agent.name}}</div>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn flat>{{agent.calleridname}}</q-btn>
                <q-btn flat>05:00</q-btn>
              </q-card-actions>
            </q-card>
         </div>
         <div class="row q-gutter-md q-mt-sm">
         <div class="col">
            <q-banner rounded class="bg-red-8 text-white">

              Chamada em espera

              <div>
                {{ onHoldCalls.length }}
              </div>
            </q-banner>
         </div>
         <div class="col">
            <q-banner rounded class="bg-green-8 text-white">

              Atendidas

              <div>
              {{ answered }}
              </div>
            </q-banner>
         </div>
         <div class="col">
            <q-banner rounded class="bg-orange-8 text-white">

               Abandonadas

              <div>
                  {{ abandon }}
              </div>
            </q-banner>
         </div>
         <div class="col">
            <q-banner rounded class="bg-purple-8 text-white">

                  Total

                <div>
                  {{ (parseInt(answered)+parseInt(abandon)) }}
                  </div>
             </q-banner>
          </div>
        </div>
    </q-page-container>
  </q-layout>

  <!-- <div>
    <div class="col-4">
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
  </div> -->
</template>

<script>
/* eslint-disable */
import socket from '../socket/io'

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
            agent.paused = event.paused;
            agent.calleridname = event.calleridname;
            agent.status = event.status;
            tmpAgents.push(agent);
        });

        this.agents = tmpAgents;
      }

      if (event.event == 'QueueCallerAbandon') {
        this.abandon = parseInt(this.abandon) + 1
      }

      if (event.event == 'AgentConnect') {
        let tmpAgents = [];

        this.agents.forEach((agent) => {
            agent.paused = event.paused;
            agent.calleridname = event.calleridname;
            agent.status = event.status;
            tmpAgents.push(agent);
        });

        this.agents = tmpAgents;
        this.answered = parseInt(this.answered)+1;
      }
    })
  }
}
</script>
