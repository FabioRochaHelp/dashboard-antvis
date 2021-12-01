<template>
    <div class="q-pa-md">
    <q-table
      title="CDR"
      :data="calls"
      :columns="columns"
      :pagination="initialPagination"
      dense
      row-key="name"
    >
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-x-md">
          <q-btn
          icon="download"
          color="green"
          dense
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import api from '../services/api'

export default ({
  name: 'Table-CDR',
  data () {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        rowsPerPage: 25
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'dia',
          label: 'Data',
          field: 'dia',
          align: 'left',
          sortable: true
        },
        {
          name: 'lastapp',
          label: 'Lastapp',
          field: 'lastapp',
          align: 'left',
          sortable: true
        },
        {
          name: 'tipo',
          label: 'tipo',
          field: 'tipo',
          align: 'left',
          sortable: true
        },
        {
          name: 'duration',
          label: 'Duração',
          field: 'duration',
          align: 'left',
          sortable: true
        },
        {
          name: 'destino',
          label: 'Destino dstchannel',
          field: 'destino',
          align: 'left',
          sortable: true
        },
        {
          name: 'dstchannel',
          label: 'Destino',
          field: 'dstchannel',
          align: 'left',
          sortable: true
        },
        {
          name: 'accountcode',
          label: 'Tipo',
          field: 'accountcode',
          align: 'left',
          sortable: true
        },
        {
          name: 'userfield',
          label: 'Userfield',
          field: 'userfield',
          align: 'left',
          sortable: true
        },
        {
          name: 'disposition',
          label: 'Disposition',
          field: 'disposition',
          align: 'left',
          sortable: true
        },
        {
          name: 'actions',
          field: 'actions',
          align: 'right'
        }
      ],
      calls: []
    }
  },
  mounted () {
    this.getCalls()
  },
  methods: {
    getCalls () {
      api.get(
        '?service=CallsReport&username=admin&password=2018@efix&start_date=2021-12-01&start_hour=00:00&end_date=2021-12-01&end_hour=23:59&status_answered=true&status_busy=true&time_call_init=10',
        {
          auth: {
            username: 'admin',
            password: '2018@efix'
          }
        }
      )
        .then((res) => {
          this.calls = res.data.data
        })
        .catch((error) => error)
    }
  }
})
</script>
