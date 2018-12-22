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
  mounted: function() {
  },
  methods: {
      query() {
          this.axios.get('/user/auth', {params: {username:'fenlan'}})
          .then((response) => {console.log(response)})
          .catch((err) => {console.error(err.response)})
      }
  }
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
