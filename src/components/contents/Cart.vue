<template>
    <div style="width:60%;margin: 0 auto;">
        <Table :columns="columns1" :data="data1"></Table>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: 'Name',
                        key: 'name'
                    },
                    {
                        title: 'Num',
                        key: 'num'
                    },
                    {
                        title: 'Price',
                        key: 'price'
                    }
                ],
                data1: []
            }
        },
        mounted: function() {
            this.list()
        },
        methods: {
            list() {
                this.axios.get('/customer/cart/list').then((response) => {
                    var arr = response.data.data
                    for(var i=0; i<arr.length; i++) {
                        var item = {
                            name:arr[i].product.name,
                            num:arr[i].number,
                            price:arr[i].product.price
                        }
                        this.data1.push(item)
                    }
                }).catch((err) => {
                    console.error(err.response)
                })
            }
        }
    }
</script>
<style scoped>

</style>
