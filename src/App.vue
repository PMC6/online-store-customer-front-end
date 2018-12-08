<template>
  <div id="app">
    <layout></layout>
  </div>
</template>

<script>
import layout from './components/Layout'

export default {
  name: 'App',
  components: {
    'layout': layout
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
