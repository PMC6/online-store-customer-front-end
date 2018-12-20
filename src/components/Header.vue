<template>
  <div>
    <Menu mode="horizontal" :theme="theme" active-name="1">
        <MenuItem name="1" to="/">
            PARKnSHOP.com
            <Dropdown style="margin-left: 20px">
                <a href="javascript:void(0)">
                    <span style="color:white;">Category</span>
                    <Icon style="color:white;" type="ios-arrow-down"></Icon>
                </a>
                <DropdownMenu slot="list">
                    <DropdownItem v-for="item in category" :key="item.id">{{item.name}}</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </MenuItem>
        <div v-if="user" style="float:right;">
          <Submenu name="2">
              <template v-if="user.name" slot="title">
                {{user.name}}
              </template>
              <MenuItem name="2-1" to="/home">Home</MenuItem>
              <MenuItem name="2-2" @click.native="logout()">Logout</MenuItem>
          </Submenu>
          <MenuItem name="3" to="/cart">
            <Icon type="ios-cart" size="24" />
          </MenuItem>
        </div>
        <div v-else style="float:right;">
          <MenuItem name="2" to="/login">Login / Join</MenuItem>
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
