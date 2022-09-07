<template>
  <div id="app">
    <Dashboard></Dashboard>
  </div>
</template>

<script>
import './scss/custom-boot.scss';

import Dashboard from './components/Dashboard.vue';

export default {
  name: 'App',
  components: {
    Dashboard
},
  data() {
      return {
          settings: false
      }
  },
}
</script>

<style>
  @import './assets/styles/global.css';
</style>