<template>
    <Tabs id="tabs" value="name1">
        <TabPane label="My Detail" name="name1">
            <Info></Info>
        </TabPane>
        <TabPane label="Open Shop" name="name2">
        </TabPane>
        <TabPane label="Change Password" name="name3">
            <ChangePasswd></ChangePasswd>
        </TabPane>
    </Tabs>
</template>
<script>
import Info from './tab/Info'
import ChangePasswd from './tab/ChangePasswd'

export default {
    data() {
        return {

        }
    },
    components: {
        'Info': Info,
        'ChangePasswd': ChangePasswd
    }
}
</script>
<style>
#tabs {
    margin-left: 4%;
    margin-right: 4%;
}
</style>
