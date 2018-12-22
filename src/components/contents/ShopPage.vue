<template>
  <div>
      <div v-if="shop" class="cart-record">
          <div class="list-group">
              <a class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <div style="width:12%;"><img style="height:100px;width:100%;" :src="shop.image"/></div>
                    <div style="width:86%;">
                        <div class="d-flex w-100 justify-content-between">
                          <h3 class="mb-1">{{shop.name}}</h3>
                        </div>
                        <p class="mb-1">{{shop.info}}</p>
                    </div>
                </div>
              </a>
            </div>
        </div>
      <div class="container" style="margin-bottom:4%;">
          <h3 class="h3">
              <Input required='' @keyup.enter.native="list(pageNum, pageSize)"
              v-model="searchName" search placeholder="Enter something..."
              style="width:60%;"/>
          </h3>
        <div v-if="productList.length == 0" class="demo-spin-container">
            <Spin fix>
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>
        <div class="row">
          <div v-for="item in productList" class="col-md-3 col-sm-6" @click="clickEvent(item)">
              <div class="product-grid9">
                  <div class="product-image9">
                      <a v-if="item.image">
                          <img class="pic-1" v-bind:src="item.image">
                      </a>
                      <a v-else>
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo6/images/img-1.jpg">
                      </a>
                  </div>
                  <div class="product-content">
                      <h3 class="title">{{item.name}}</h3>
                      <div class="price">$ {{item.price}}</div>
                  </div>
              </div>
          </div>
        </div>
        <Divider />
        <Page :total="pageTotal" :current="pageNum" :page-size="pageSize" show-elevator show-sizer show-total
        placement="top" @on-change="handlePage" @on-page-size-change='handlePageSize'></Page>
        <Modal v-if="product" v-model="modal" width="720">
            <p slot="header" style="text-align:center">
                <Icon type="md-cloud-done" />
                <span>{{product.name}}</span>
            </p>
            <div style="text-align:center">
                <Row>
                    <Col span="12">
                        <a v-if="product.image">
                            <img style="width:150px;height:190px;" class="pic-1" v-bind:src="product.image">
                        </a>
                        <a v-else>
                          <img style="width:150px;height:190px;" class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo6/images/img-1.jpg">
                        </a>
                    </Col>
                    <Col span="12" align="left">
                        <p v-if="product.category" style="font-size:18px;">
                            <Icon type="md-pricetags" /> {{product.category.name}}
                            <Divider />
                        </p>
                        <p v-if="product.shop.name" style="font-size:18px;">
                            <Icon v-if="product.shop.name" type="ios-appstore" /> {{product.shop.name}}
                            <Button @click="addShop()" type="success" shape="circle" size="small"><Icon type="ios-heart" /></Button>
                        </p>
                        <Divider />
                        <p v-if="product.info"><Icon type="md-attach" size="18" /> {{product.info}}</p>
                        <p style="font-size:16px;color:#ed4014;"><Icon type="md-attach" size="18" />{{product.number}} left in stock</p>
                        <Divider />
                        <p v-if="product.price" style="font-size:32px;bottom:0;">$ {{product.price}}</p>
                    </Col>
                </Row>
            </div>
            <div slot="footer">
                <Row style="text-align:center;">
                    <Col span="12">
                        <Button @click="addProduct()" style="width:80%;" type="success" size="large" long :loading="modal_loading">
                            <Icon type="md-heart" /> Add To WishList
                        </Button>
                    </Col>
                    <Col span="12" align="left">
                        <Button @click="addToCart()" style="width:80%;" type="info" size="large" long :loading="modal_loading">
                            <Icon type="ios-cart" size="18" /> Add To Cart
                        </Button>
                    </Col>
                </Row>
            </div>
        </Modal>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'

    export default {
        data() {
            return {
                flag: true, modal: false, modal_loading: false,
                productList: [], searchName: '', product: null,
                pageTotal: 0, pageNum: 1, pageSize: 8, shop: null
            }
        },
        computed: {
            shopId() {
                return this.$route.query.id
            }
        },
        mounted: function() {
            this.shopDetail()
            this.list(this.pageNum, this.pageSize)
        },
        watch: {
            shopId(newId, oldId) {
                this.list(this.pageNum, this.pageSize)
            }
        },
        methods: {
            list(page, size) {
                this.productList = []
                this.amount()
                axios.get('/user/shop/list', { params: {
                    'page': page-1,'size': size,
                    'name':this.searchName, 'id':this.shopId}
                }).then((response) => {
                    this.productList = response.data.data
                    this.flag = false
                }).catch((err) => {
                    this.$Notice.error({
                        title: 'List error',
                        desc: 'Not found product in this shop'
                    })
                })
            },
            amount() {
                this.axios.get('/user/shop/amount', {params: {
                    'name': this.searchName, 'id':this.shopId
                }}).then((response) => {
                    this.pageTotal = response.data.data
                }).catch((err) => {console.error(err.response)})
            },
            shopDetail() {
                this.axios.get('/user/shop', {params:{id:this.shopId}})
                .then((response) => {this.shop = response.data.data})
                .catch((err) => {console.error(err.response)})
            },
            error(nodesc) {
              this.$Notice.error({
                title: 'Search failed',
                desc: nodesc ? '' : 'Not found product named ' + this.searchName
              });
            },
            clickEvent(product) {
                this.modal = true
                this.product = product
            },
            handlePage(data) {
                this.pageNum = data
                if (this.searchName)
                    this.search(this.pageNum, this.pageSize)
                else
                    this.list(this.pageNum, this.pageSize)
            },
            handlePageSize(data) {
                this.pageSize = data
                if (this.searchName)
                    this.search(this.pageNum, this.pageSize)
                else
                    this.list(this.pageNum, this.pageSize)
            },
            addToCart() {
                this.axios.post('/customer/cart/add', {id:this.product.id, number:1})
                .then((response) => {this.$Notice.success({
                    title: 'Successful', desc: 'Add one product in your cart'
                })})
                .catch((err) => {
                    if (err.response) {
                        this.$Notice.error({
                            title: 'Failed', desc: err.response.data.message
                        })
                    } else {
                        this.$Notice.error({
                            title: 'Failed', desc: 'Please login this system'
                        })
                    }
                })
            },
            addShop() {
                this.axios.post('/customer/favorite/add', {id:this.product.shop.id, type:1})
                .then((response) => {this.$Notice.success({
                    title: 'Successful', desc: 'Add one shop in your WishList'
                })}).catch((err) => {this.$Notice.error({
                    title: 'Failed', desc: 'Please login this system'
                })})
            },
            addProduct() {
                this.axios.post('/customer/favorite/add', {id:this.product.id, type:3})
                .then((response) => {this.$Notice.success({
                    title: 'Successful', desc: 'Add one product in your WishList'
                })}).catch((err) => {this.$Notice.error({
                    title: 'Failed', desc: 'Please login this system'
                })})
            }
        }
    }
</script>

<style scoped>
h3.h3{text-align:center;margin:1em;text-transform:capitalize;font-size:1.7em;}
.product-grid9,.product-grid9 .product-image9{position:relative}
.product-grid9{font-family:Poppins,sans-serif;z-index:1}
.product-grid9 .product-image9 a{display:block}
.product-grid9 .product-image9 img{width:150px;height:190px}
.product-grid9 .product-content{padding:12px 12px 0;overflow:hidden;position:relative}
.product-content .rating{padding:0;margin:0 0 7px;list-style:none}
.product-grid9 .rating li{font-size:12px;color:#ffd200;transition:all .3s ease 0s}
.product-grid9 .rating li.disable{color:rgba(0,0,0,.2)}
.product-grid9 .title{font-size:16px;font-weight:400;text-transform:capitalize;margin:0 0 3px;transition:all .3s ease 0s}
.product-grid9 .title a{color:rgba(0,0,0,.5)}
.product-grid9 .title a:hover{color:#c0392b}
.product-grid9 .price{color:#ed4014;font-size:17px;margin:0;display:block;transition:all .5s ease 0s}
.product-grid9:hover .price{color:#2b85e4}
.product-grid9 .add-to-cart{display:block;color:#c0392b;font-weight:600;font-size:14px;opacity:0;position:absolute;left:10px;bottom:-20px;transition:all .5s ease 0s}
.product-grid9:hover .add-to-cart{opacity:1;bottom:0}
@media only screen and (max-width:990px){.product-grid9{margin-bottom:30px}
}

.demo-spin-container{
	display: inline-block;
    width: 50%;
    height: 100px;
    position: relative;
    background: #506b9e;
    border: 1px solid #eee;
}
.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
.demo-spin-col{
    height: 100px;
    position: relative;
    border: 1px solid #eee;
}
.cart-record {
    width: 60%;
    margin: 0 auto;
    text-align: left;
}
</style>
