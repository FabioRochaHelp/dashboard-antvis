<template>
  <card-base ref="cardBase">
    <canvas id="containerPie" />
  </card-base>
</template>

<script>
import CardBase from 'components/CardBase'
import api from '../services/api'
export default {
  name: 'F2Pie',
  components: {
    CardBase
  },
  data () {
    return {
      map: '',
      dataChart: []
    }
  },
  mounted () {
    this.getCalls()
  },
  methods: {
    getCalls () {
      api.get(
        '?service=CallsReport&username=admin&password=2018@efix&start_date=2021-09-01&start_hour=00:00&end_date=2021-09-30&end_hour=23:59&status_noanswer=true&status_answered=true&status_busy=true&status_failed=true&time_call_init=10&report_type=synthetic',
        {
          auth: {
            username: 'admin',
            password: '2018@efix'
          }
        }
      ).then((res) => {
        this.dataChart = [{
          name: 'ATENDIDA',
          percent: parseInt(res.data.totals.ANSWERED),
          a: '1'
        }, {
          name: 'NÃO ATENDIDA',
          percent: parseInt(res.data.totals.NOANSWER),
          a: '1'
        }, {
          name: 'OCUPADA',
          percent: parseInt(res.data.totals.BUSY),
          a: '1'
        }, {
          name: 'FALHA',
          percent: parseInt(res.data.totals.FAILED),
          a: '1'
        }]
        this.map = {
          ATENDIDA: parseInt(res.data.totals.ANSWERED),
          'NÃO ATENDIDA': parseInt(res.data.totals.NOANSWER),
          OCUPADA: parseInt(res.data.totals.BUSY),
          FALHA: parseInt(res.data.totals.FAILED)
        }
        const chart = new this.$f2.Chart({
          id: 'containerPie',
          pixelRatio: window.devicePixelRatio,
          height: 300,
          width: this.$refs.cardBase.$el.offsetWidth - 25
        })
        chart.source(this.dataChart, {
          percent: {
            formatter: function formatter (val) {
              return val * 100 + '%'
            }
          }
        })
        chart.legend({
          position: 'right',
          itemFormatter: (val) => val + '  ' + this.map[val]

        })
        chart.tooltip(false)
        chart.coord('polar', {
          transposed: true,
          radius: 0.85
        })
        chart.axis(false)
        chart.interval()
          .position('a*percent')
          .color('name', ['#2FC25B', '#F04864', '#FACC14', '#8543E0'])
          .adjust('stack')
          .style({
            lineWidth: 1,
            stroke: '#fff',
            lineJoin: 'round',
            lineCap: 'round'
          })
          .animate({
            appear: {
              duration: 1200,
              easing: 'bounceOut'
            }
          })

        chart.render()
      })
        .catch((error) => error)
    }
  }
}
</script>
