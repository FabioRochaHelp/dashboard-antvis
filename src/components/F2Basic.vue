<template>
  <card-base ref="cardBase">
    <canvas id="f2basic"/>
  </card-base>
</template>

<script>
import CardBase from 'components/CardBase'
import api from '../services/api'
export default {
  name: 'F2Basic',
  components: {
    CardBase
  },
  data () {
    return {
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
      )
        .then((res) => {
          // var dataFull = []
          var param = []
          var option = {}

          for (const key in res.data.calldate) {
            var day = 0
            if (Object.hasOwnProperty.call(res.data.calldate, key)) {
              day = key.split('/')
              day = day[0]
              option = {
                dia: day,
                total: res.data.calldate[key].TOTALS
              }
              param.push(option)
            }
          }

          this.dataChart = param

          const chart = new this.$f2.Chart({
            id: 'f2basic',
            pixelRatio: window.devicePixelRatio,
            height: 300,
            width: this.$refs.cardBase.$el.offsetWidth - 50
          })

          chart.source(this.dataChart, {
            dia: {
              tickCount: 10
            }
          })
          chart.axis('dia', {
            label: {
              fontSize: 14
            }
          })
          chart.axis('total', {
            label: {
              fontSize: 14
            }
          })

          chart.interval()
            .position('dia*total')
            .color('dia')

          chart.render()
        })
        .catch((error) => error)
    }
  }
}
</script>
