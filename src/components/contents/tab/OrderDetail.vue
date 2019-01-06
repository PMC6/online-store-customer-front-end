<template>
    <div>
        <div v-if="data1.length == 0" class="cart-empty">
            <Icon size="100" type="ios-cart-outline" />
            <p>
                Your Order List is empty Start <a href="#/">shopping now</a>!
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
                              <p v-if="processMap[item.status] == 3" style="text-align:right;"><Button @click="showmodal(item)" size="small" type="success">Comment</Button></p>
                          </div>
                      </div>
                    </a>
                  </div>
              </div>
              <Divider />
              <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
              <br>
              <Modal v-if="order"
                     v-model="modalshow"
                     title="Leave your rate and comment"
                     width="1000"
                     cancel-text="cancel"
                     ok-text="ok"
                     @on-ok="ok">
                     <div class="cart-record">
                         <div class="list-group">
                             <a class="list-group-item list-group-item-action flex-column align-items-start">
                               <div class="d-flex w-100 justify-content-between">
                                   <div style="width:12%;"><img style="height:100px;width:100%;" :src="order.productImg"/></div>
                                   <div style="width:84%;">
                                       <div class="d-flex w-100 justify-content-between">
                                         <h3 class="mb-1">{{order.productName}}</h3>
                                         <p>{{order.createTime}}</p>
                                     </div><br>
                                       <!-- <p class="mb-1">{{order.entity.info}}</p> -->
                                       <Steps :current="processMap[order.status]" small>
                                           <Step title="Processing" content="Processing Order"></Step>
                                           <Step title="Shipment" content="Preparing for Shipment"></Step>
                                           <Step title="Shipped" content="Ensure Shipped"></Step>
                                           <Step title="Complete" content="Leave your comment"></Step>
                                       </Steps><br>
                                       <div class="d-flex w-100 justify-content-between">
                                           <Tag type="border" color="success">{{order.shopName}}</Tag>
                                           <InputNumber disabled size="small" v-model="order.number"></InputNumber>
                                           <p style="color:#19be6b;">Total： ${{order.number * order.price}}</p>
                                       </div>
                                   </div>
                               </div>
                             </a>
                           </div>
                     </div>
                     <center class="comment">
                         <Rate v-model="valueText">
                         </Rate><br>
                         <Input v-model="value" type="textarea" :autosize="{minRows: 5}" placeholder="Leave your comment..." />
                     </center>
                 </Modal>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            data1: [], pageTotal: 0, pageNum: 1, pageSize: 8, modalshow: false,
            order: null, valueText: 5, value: '',
            processMap: {
                'Processing Order': 0, 'Preparing for Shipment': 1, 'Shipped': 2, 'Complete': 3, 'Canceled': -1
            }
        }
    },
    mounted: function() {
        this.list()
    },
    methods: {
        list() {
            this.data1 = []
            this.amount()
            this.axios.get('/customer/order/list', {
                params: {
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
            this.axios.get('/customer/order/amount/total').then((response) => {
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
        },
        shipped() {
            console.log("Hello world")
        },
        showmodal(data) {
            this.order = data
            this.modalshow=true
        },
        ok() {
            this.axios.post('/customer/comment/add', {
                orderId: this.order.id, grade: this.valueText, comment: this.value
            }).then((response) => {this.$Notice.success({
            title: 'Successful', desc: 'comment success'})})
            .catch((err) => {console.error(err)})
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
