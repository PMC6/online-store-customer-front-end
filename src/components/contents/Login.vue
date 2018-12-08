<template>
  <div>
    <Card style="width:40%;margin:20px auto;background:#eee;">
      <p slot="title">Customer login page</p>
      <Form ref="formInline" style="margin:10px auto;" :model="formInline" :rules="ruleInline" inline>
          <FormItem prop="user">
              <Input type="text" size="large" v-model="formInline.user" placeholder="Username">
                  <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <br>
          <FormItem prop="password">
              <Input type="password" size="large" v-model="formInline.password" placeholder="Password">
                  <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
          </FormItem>
          <br>
          <FormItem>
              <Button type="primary" size="large" @click="handleSubmit(formInline)">Login</Button>
          </FormItem>
      </Form>
    </Card>
  </div>
</template>
<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
      data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
            }
        },
        mounted: function() {
        },
        methods: {
          login(username, password) {
            axios.post('/user/login', {
              'username': username,
              'password': password
            }).then((response) => {
              this.success(false)
              this.$store.dispatch('login', response.data.data).then(() => {
                this.$router.replace('/')
              });
            }).catch((err) => {
              this.error(false)
            })
          },
          handleSubmit(data) {
            this.login(data.user, data.password)
          },
          success (nodesc) {
                this.$Notice.open({
                    title: 'Login Success',
                    desc: nodesc ? '' : 'Hello '+this.formInline.user+ '. Welcome to PARKnSHOP'
                });
            },
            error (nodesc) {
                this.$Notice.error({
                    title: 'Login failed',
                    desc: nodesc ? '' : 'username or password is not correct '
                });
            }
        }
    }
</script>

<style scoped>
</style>
