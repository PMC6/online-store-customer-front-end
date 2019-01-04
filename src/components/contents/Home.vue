<template>
    <Tabs id="tabs" value="name1" :animated="flag">
        <TabPane label="My Detail" icon="md-person" name="name1">
            <Info></Info>
        </TabPane>
        <TabPane label="Favorite Shop List" icon="md-heart" name="name2">
            <WishShop></WishShop>
        </TabPane>
        <TabPane label="Favorite Product List" icon="md-heart" name="name3">
            <WishProduct></WishProduct>
        </TabPane>
        <TabPane label="Order Detail" icon="md-information-circle" name="name4">
            <OrderDetail></OrderDetail>
        </TabPane>
        <TabPane label="Buy History" icon="md-information-circle" name="name5">
            <BuyHistory></BuyHistory>
        </TabPane>
        <TabPane label="Change Password" icon="md-build" name="name6">
            <ChangePasswd></ChangePasswd>
        </TabPane>
    </Tabs>
</template>
<script>
import Info from './tab/Info'
import WishShop from './tab/WishShop'
import WishProduct from './tab/WishProduct'
import OrderDetail from './tab/OrderDetail'
import ChangePasswd from './tab/ChangePasswd'
import BuyHistory from './tab/BuyHistory'

export default {
    data() {
        return {
            flag: false
        }
    },
    components: {
        'Info': Info,
        'WishShop': WishShop,
        'WishProduct': WishProduct,
        'OrderDetail': OrderDetail,
        'BuyHistory': BuyHistory,
        'ChangePasswd': ChangePasswd
    }
}
</script>
<style scoped>
#tabs {
    margin-left: 10%;
    margin-right: 10%;
}
</style>
