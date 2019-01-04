<template>
    <div>
        <div>
            <Select v-model="option" style="width:150px;">
                <Option v-for="item in optList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <DatePicker v-if="option == 'daily'" type="date" placeholder="Select time" v-model="value1" style="width: 150px;"></DatePicker>
            <InputNumber v-if="option == 'weekly'" :max="10" :min="0" :step="1" v-model="value2" style="width: 150px;"></InputNumber>
            <DatePicker v-if="option == 'monthly'" type="month" placeholder="Select time" v-model="value1" style="width: 150px;"></DatePicker>
            <DatePicker v-if="option == 'yearly'" type="year" placeholder="Select time" v-model="value1" style="width: 150px;"></DatePicker>
            <Button type="primary" icon="ios-search" @click="list()">Search</Button>
        </div><br>
        <div v-if="data1.length == 0" class="cart-empty">
            <Icon size="100" type="ios-cart-outline" />
            <p>
                Your buy history is empty. Start <a href="#/">shopping now</a>!
                And click the wish button to add product or shop in your wish list.
            </p>
        </div>
        <div v-else>
            <div class="cart-record">
                <div class="list-group">
                    <a v-for="item in data1" :key="item.id" class="list-group-item list-group-item-action flex-column align-items-start">
                      <div class="d-flex w-100 justify-content-between">
                          <div style="width:12%;"><img style="height:100px;width:100%;" :src="item.productImg"/></div>
                          <div style="width:84%;">
                              <div class="d-flex w-100 justify-content-between">
                                <h3 class="mb-1">{{item.productName}}</h3>
                                <p>{{item.createTime}}</p>
                            </div><br>
                              <!-- <p class="mb-1">{{item.entity.info}}</p> -->
                              <Steps :current="processMap[item.status]" small>
                                  <Step title="Processing" content="Processing Order"></Step>
                                  <Step title="Shipment" content="Preparing for Shipment"></Step>
                                  <Step title="Shipped" content="Ensure Shipped"></Step>
                                  <Step title="Complete" content="Leave your comment"></Step>
                              </Steps><br>
                              <div class="d-flex w-100 justify-content-between">
                                  <Tag type="border" color="success">{{item.shopName}}</Tag>
                                  <InputNumber disabled size="small" v-model="item.number"></InputNumber>
                                  <p style="color:#19be6b;">Total： ${{item.number * item.price}}</p>
                              </div>
                          </div>
                      </div>
                    </a>
                  </div>
              </div>
              <Divider />
              <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
              <br>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            data1: [], pageTotal: 0, pageNum: 1, pageSize: 8, value1: null,
            processMap: {
                'Processing Order': 0, 'Preparing for Shipment': 1, 'Shipped': 2, 'Complete': 3, 'Canceled': -1
            },
            optList: [
                {label: 'Day', value: 'daily'},
                {label: 'Week', value: 'weekly'},
                {label: 'Month', value: 'monthly'},
                {label: 'Year', value: 'yearly'}
            ], option: 'monthly', value2: 0
        }
    },
    mounted: function() {
        this.value1 = new Date()
        this.list()
    },
    methods: {
        list() {
            this.data1 = []
            var now = new Date()
            switch (this.option) {
                case 'daily': this.value2 = Math.floor((new Date().getTime()-this.value1.getTime())/(1000*60*60*24));break;
                case 'monthly': this.value2 = (now.getFullYear()-this.value1.getFullYear())*12+now.getMonth()-this.value1.getMonth()
                case 'yearly': this.value2 = now.getFullYear()-this.value1.getFullYear()
                default:
            }
            this.amount()
            this.axios.get('customer/order/history', {
                params: {
                    beforeNum: this.value2, type: this.option,
                    page: this.pageNum-1, size: this.pageSize
                }
            }).then((response) => {
                this.data1 = response.data.data
            }).catch((err) => {
                this.data1 = []
                console.error(err.response)
            })
        },
        amount() {
            this.axios.get('/customer/order/amountByTimes', {
                params: {beforeNum: this.value2, type: this.option}
            }).then((response) => {
                this.pageTotal = response.data.data
            }).catch((err) => {console.error(err.response)})
        },
        handlePage(data) {
            this.pageNum = data
            this.list()
        },
        handlePageSize(data) {
            this.pageSize = data
            this.list()
        },
        remove(item) {
            this.axios.delete('/customer/order/cancel', {params: {'orderId':item.id}})
            .then((response) => {this.list()}).catch((err) => {console.error(err)})
        }
    }
}
</script>
<style scoped>
.cart-record {
    width: 80%;
    margin: 0 auto;
}
.mb-1 {
    text-align: left;
}
.comment {
    margin: 10px auto;
    width: 50%;
}
</style>
