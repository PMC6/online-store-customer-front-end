<template>
    <Tabs id="tabs" value="name1">
        <TabPane label="Customer Information" name="name1">
            <Info></Info>
        </TabPane>
        <TabPane label="Tab 2" name="name2">标签二的内容</TabPane>
        <TabPane label="Tab 3" name="name3">标签三的内容</TabPane>
    </Tabs>
</template>
<script>
import Info from './tab/Info'

export default {
    data() {
        return {

        }
    },
    components: {
        'Info': Info
    }
}
</script>
<style>
#tabs {
    margin-left: 4%;
    margin-right: 4%;
}
</style>
