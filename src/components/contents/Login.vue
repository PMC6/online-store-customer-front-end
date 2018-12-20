<template>
  <div style="width:80%;margin: 0 auto;">
      <p class="login-title">Login or Create an Account</p>
      <Divider />
      <div class='container'>
          <div class='regisinfo'>
              <div class="content register-span">
                  <h2>New Customers</h2>
                  <p>By creating an account with our store, you will be able to
                      move through the checkout process faster, store multiple
                      shipping addresses, view and track your orders in your
                      account and more.
                  </p>
                  <div class='btn'>
                      <Button type="primary" ghost to='/register' title="Create an Account"
                      class="redBtn"><em><span><i></i>register</span></em></Button>
                  </div>
              </div>
          </div>
          <div class='login'>
              <div class="content">
                  <h2>Registered Customers</h2>
                  <p>If you have an account with us, please log in.</p>
              </div>
              <Card style="width:100%;margin:20px auto;background:#eee;">
                  <Form ref="formInline" style="margin:10px auto;" :model="formInline" :rules="ruleInline" inline>
                      <FormItem prop="user">
                          <Input type="text" size="large" v-model="formInline.user" placeholder="Username">
                              <Icon type="ios-person-outline" slot="prepend"></Icon>
                          </Input>
                      </FormItem>
                      <br>
                      <FormItem prop="password">
                          <Input type="password" size="large" v-model="formInline.password"
                          placeholder="Password" @keyup.enter.native="handleSubmit(formInline)">
                          <Icon type="ios-lock-outline" slot="prepend"></Icon></Input>
                      </FormItem>
                      <br>
                      <FormItem>
                          <Button type="primary"  size="large" @click="handleSubmit(formInline)">Login</Button>
                      </FormItem>
                  </Form>
              </Card>
        </div>
      </div>
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
.register-span {
    margin-left: 50px;
    margin-right: 50px;
    margin-top: 50px;
    text-align: left;
}
.login-title {
    float: left;
    font-size: 22px;
    margin-top: 20px;
    margin-bottom: 15px;
}
.loginarea{
    position: relative;
    margin-top: 10px;

}
.page-title{
    border: medium none;
    /* margin: 60 0 3px; */
    padding: 5px 0;
}
.page-title h1{
    font-weight: 100;
    margin-left: 75px;
}
.container{
    width: 100%;
    border: 1px solid;
    display: flex;
    margin-bottom: 10px;
    padding-bottom: 50px;
}
.regisinfo{
    width: 480px;
    height: 230px;
    /* border: 1px solid #000; */
    margin-top: 70px;
}
.login{
    width: 480px;
    height: 365px;
    margin-top: 40px;
    border: 1px solid  rgb(202, 186, 186);

}
.content{
    margin-left: 20px;
    margin-top: 20px;
    margin-right: 40px;
}
Button{
    background: #4c6b99 none repeat scroll 0 0;
    border-radius: 2px;
    color: #fefefe;
    display: block;
    text-align: center;
    height: 35px;
    width: 100px;
     margin-left: 20px;
}
.btn {
    margin-top: 10px;
}
Button .redBtn {
    font-family: Arial;
    font-size: 0.875em;


}
</style>
