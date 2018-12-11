<template>
<div>
    <Row style="width:50%;margin-top:30px;">
        <Col span="12" style="text-align:left;width:140px;">
            <img style="width:120px;height:120px;"
             src="http://www.twwd.org/dashboard/wp-content/uploads/2014/08/avatar-circle-human-male-2-512.png"></img>
        </Col>
        <Col v-if="user" span="12" style="text-align:left;">
            <h3>
                <span v-if="user.username">{{user.username}}</span>
                <Icon type="md-bookmark" />
                <span v-if="user.address">{{user.address}}</span>
                <span v-else>xi'an</span>
            </h3><Divider />
            <h4><span style="font-size:18px;">Software Developer in Xidian</span></h4>
            <Tag checkable color="primary"><Icon type="md-mail" />
                <span v-if="user.email">{{user.email}}</span>
                <span v-else>xiaomi@mi.com</span>
            </Tag>
            <Tag checkable color="success"><Icon type="ios-call" />
                <span v-if="user.telephone">{{user.telephone}}</span>
                <span v-else>15148929034</span>
            </Tag>
        </Col>
    </Row>
</div>
</template>
<script>

export default {
    data() {
        return {
            user: {}
        }
    },
    mounted: function() {
        this.getUser()
    },
    methods: {
        getUser() {
            this.axios.get('/customer/detail', {params:{name:this.$store.state.user.name}})
            .then((response) => {this.user = response.data.data})
            .catch((err) => {console.error(err.response)})
        }
    },
    computed: {
    }
}
</script>

<style scoped>

</style>
