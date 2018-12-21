<template>
  <div>
    <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1" to="/">
            PARKnSHOP.com
        </MenuItem>
        <Submenu name="2">
            <template slot="title">
              Category
            </template>
            <MenuItem v-for="item in category" :key="item.id" :name="item.id"
            :to="{path:'/categoryhome', query: {id: item.id}}">
                {{item.name}}
            </MenuItem>
        </Submenu>
        <div v-if="user" style="float:right;">
          <Submenu name="3">
              <template v-if="user.name" slot="title">
                {{user.name}}
              </template>
              <MenuItem name="2-1" to="/home">Home</MenuItem>
              <MenuItem name="2-2" @click.native="logout()">Logout</MenuItem>
          </Submenu>
          <MenuItem name="4" to="/cart">
            <Icon type="ios-cart" size="24" />
          </MenuItem>
        </div>
        <div v-else style="float:right;">
          <MenuItem name="3" to="/login">Login / Join</MenuItem>
        </div>
    </Menu>
    <br>
  </div>
</template>
<script>
    export default {
      data () {
        return {
          theme: 'dark', category:[]
        }
      },
      mounted: function() {
          this.getCategory()
      },
      methods: {
          logout() {
            this.axios.get('/logout').then((response) => {
                this.$store.dispatch('logout').then(() => {
                  this.$router.replace('/login')
                })
            }).catch((err) => {
                this.$store.dispatch('logout').then(() => {
                  this.$router.replace('/login')
                })
            })
        },
        getCategory() {
            this.axios.get('/category')
            .then((response) => {this.category = response.data.data})
            .catch((err) => {console.error(err.response)})
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
