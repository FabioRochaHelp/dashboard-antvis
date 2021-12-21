<template>
  <q-page class="container q-pa-lg">
    <div class="row q-col-gutter-sm">
     <MonitorAsterisk/>
    </div>
  </q-page>
</template>

<script>
import MonitorAsterisk from 'src/components/Monitor.vue'
export default {
  name: 'Monitor',
  components: {
    MonitorAsterisk
  }

}
</script>
