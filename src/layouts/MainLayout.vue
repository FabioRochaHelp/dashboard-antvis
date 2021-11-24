<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="shadow-8">
      <q-toolbar class="bg-purple-9">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="fas fa-bars" />
        </q-btn>

        <q-toolbar-title>
          Phoenix
        </q-toolbar-title>

        <q-btn
          color="purple-8"
          :icon="$q.fullscreen.isActive ? 'fas fa-compress' : 'fas fa-expand'"
          @click="$q.fullscreen.toggle()"
        />
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      content-class=""
      :breakpoint="400"
      overlay
      elevated
      behavior="mobile"
    >
    <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px;">
      <q-list class="text-purple-9" >
        <q-item-label header>Menu</q-item-label>
        <q-item clickable to="/" exact active-class="text-purple-5">
          <q-item-section avatar>
            <q-icon name="fas fa-home" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Home</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/dashboard" exact active-class="bg-purple-1">
          <q-item-section avatar>
            <q-icon name="fas fa-chart-bar" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Dashboard</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable to="/tablecdr" exact active-class="bg-purple-1">
          <q-item-section avatar>
            <q-icon name="fas fa-print" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Relatório de Chamadas</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>
      <q-img class="absolute-top q-mt-md q-ml-xl" src="../../src/assets/logo-efix.svg" style="width: 200px"></q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
.bg-custom-blue-dark {
  background: linear-gradient(130deg,#58397e,#706dff);
}
</style>
