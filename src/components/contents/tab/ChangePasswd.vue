<template>
    <div style="width:30%;margin:10px;">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="140">
            <FormItem label="Existing Password" prop="passwd">
                <Input type="password" v-model="formCustom.exitspasswd"></Input>
            </FormItem>
            <FormItem label="New Password" prop="passwd">
                <Input type="password" v-model="formCustom.passwd"></Input>
            </FormItem>
            <FormItem label="Confirm New Password" prop="passwdCheck">
                <Input type="password" v-model="formCustom.passwdCheck"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formCustom')">Submit</Button>
                <Button @click="handleReset('formCustom')" style="margin-left: 8px">Reset</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
    export default {
        data () {
            const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password'));
                } else {
                    if (this.formCustom.passwdCheck !== '') {
                        // 对第二个密码框单独验证
                        this.$refs.formCustom.validateField('passwdCheck');
                    }
                    callback();
                }
            };
            const validatePassCheck = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please enter your password again'));
                } else if (value !== this.formCustom.passwd) {
                    callback(new Error('The two input passwords do not match!'));
                } else {
                    callback();
                }
            };

            return {
                formCustom: {
                    exitspasswd: '',
                    passwd: '',
                    passwdCheck: ''
                },
                ruleCustom: {
                    passwd: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                    passwdCheck: [
                        { validator: validatePassCheck, trigger: 'blur' }
                    ]
                },
                message: ''
            }
        },
        methods: {
            handleSubmit (name) {
                var before = this.$refs[name].model.exitspasswd
                var after = this.$refs[name].model.passwd
                var confirm = this.$refs[name].model.passwdCheck
                if (after === confirm) {
                    this.axios.post('/change/password', {'before':before,'after':after})
                    .then((response) => {this.success(false)})
                    .catch((err) => {
                        this.message = err.response.data.message
                        this.error(false)
                    })
                } else {
                    this.message = 'The two input passwords do not match!'
                    this.error()
                }
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            },
            success (nodesc) {
              this.$Notice.open({
                title: 'Change Success',
                desc: nodesc ? '' : 'You have changed your password !'
              });
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
            error (nodesc) {
              this.$Notice.error({
                title: 'Change failed',
                desc: nodesc ? '' : this.message
              });
            }
        }
    }
</script>
