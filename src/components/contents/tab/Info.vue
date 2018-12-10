<template>
<div>
    <Row style="width:50%;">
        <Col span="12">
            <img style="width:120px;height:120px;"
             src="http://www.twwd.org/dashboard/wp-content/uploads/2014/08/avatar-circle-human-male-2-512.png"></img>
        </Col>
        <Col span="12" style="text-align:left;">
            <h3>
                <span v-if="user.name">{{user.name}}</span>
                <Icon type="md-bookmark" />
                <span v-if="user.principal.address">{{user.principal.address}}</span>
                <span v-else>xi'an</span>
            </h3><Divider />
            <h4><span style="font-size:18px;">Software Developer in Xidian</span></h4>
            <Tag checkable color="primary"><Icon type="md-mail" />
                <span v-if="user.principal.email">{{user.principal.email}}</span>
                <span v-else>xiaomi@mi.com</span>
            </Tag>
            <Tag checkable color="success"><Icon type="ios-call" />
                <span v-if="user.principal.telephone">{{user.principal.telephone}}</span>
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

        }
    },
    mounted: function() {
    },
    methods: {
        deal() {

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
