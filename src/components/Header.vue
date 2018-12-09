<template>
  <div>
    <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1" to="/">
            PARKnSHOP.com
        </MenuItem>
        <div v-if="user" style="float:right;">
          <Submenu name="2">
              <template slot="title">
                {{user.name}}
              </template>
              <MenuItem name="2-1" to="/home">Home</MenuItem>
              <MenuItem name="2-2" @click.native="logout()">Logout</MenuItem>
          </Submenu>
          <MenuItem name="3">
            <Icon type="ios-cart" size="24" />
          </MenuItem>
        </div>
        <div v-else style="float:right;">
          <MenuItem name="2" to="/login">Login</MenuItem>
          <MenuItem name="3" to="/register">
            Register
          </MenuItem>
        </div>
    </Menu>
    <br>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          theme: 'dark'
        }
      },
      methods: {
          logout() {
            this.$store.dispatch('logout').then(() => {
              this.$router.replace('/login')
            })
          }
        },
        computed: {
          user() {
            return this.$store.state.user
          }
        }
    }
</script>

<style scoped>
</style>
