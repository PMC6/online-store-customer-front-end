<template>
  <div>
      <div class="container" style="margin-bottom:4%;">
          <h3 class="h3">
              <Input required='' @keyup.enter.native="search(pageNum, pageSize)"
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
          <div v-for="item in productList" class="col-md-3 col-sm-6">
              <div class="product-grid9">
                  <div class="product-image9">
                      <a v-if="item.image">
                          <img class="pic-1" v-bind:src="item.image" >
                      </a>
                      <a v-else>
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo6/images/img-1.jpg">
                      </a>
                      <a>
                          <ul class="social">
                              <li @click="clickEvent(item)"><Icon type="ios-search" /></li>
                              <li @click="addProduct(item)"><Icon type="ios-heart-outline" /></li>
                              <li @click="addToCart(item)"><Icon type="ios-cart-outline" /></li>
                          </ul>
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
                <div v-if="!commentFlag">
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
                    <Divider />
                </div>
                <a style="font-size:16px;color:#ed4014;" @click="showComments()">Customer Comments</a>
                <div v-if="commentFlag">
                    <br>
                    <div class="cart-record">
                        <div class="list-group">
                            <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                            <div v-if="comments.length == 0"> Don't have any comment</div>
                            <div v-else style="height:80%;overflowY:scroll">
                                <a v-for="item in comments" :key="item.id" class="list-group-item list-group-item-action flex-column align-items-start">
                                    <div class="d-flex w-100 justify-content-between">
                                        <div style="width:12%;">
                                            <img style="height:75px;width:100%;"
                                            src="http://www.twwd.org/dashboard/wp-content/uploads/2014/08/avatar-circle-human-male-2-512.png"/>
                                        </div>
                                        <div style="width:86%;">
                                            <div class="d-flex w-100 justify-content-between">
                                              <h3 class="mb-1">{{item.userName}}</h3>
                                              <Rate disabled v-model="item.grade" />
                                              <p>{{item.createTime}}</p>
                                            </div>
                                            <p class="mb-1">{{item.productComment}}</p>
                                        </div>
                                    </div>
                                </a>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>
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
                flag: true, modal: false, modal_loading: false, commentFlag: false,
                productList: [], searchName: '', product: null,
                pageTotal: 0, pageNum: 1, pageSize: 8, comments: []
            }
        },
        computed: {
            categoryId() {
                return this.$route.query.id
            }
        },
        mounted: function() {
            this.list(this.pageNum, this.pageSize)
        },
        watch: {
            categoryId(newId, oldId) {
                this.list(this.pageNum, this.pageSize)
            }
        },
        methods: {
            list(page, size) {
                this.productList = []
                this.amount()
                axios.get('/list', { params: {
                    'page': page-1,'size': size,'category':this.categoryId}
                }).then((response) => {
                    this.productList = response.data.data
                    this.flag = false
                }).catch((err) => {
                    this.$Notice.error({
                        title: 'List error',
                        desc: 'Not found product in this category'
                    })
                })
            },
            amount() {
                this.axios.get('/amount', {params: {'category': this.categoryId}}).then((response) => {
                    this.pageTotal = response.data.data
                }).catch((err) => {console.error(err.response)})
            },
            search(page, size) {
                this.productList = []
                this.amountByName()
                if (this.searchName == "") {
                    this.list(this.pageNum, this.pageSize)
                } else {
                    axios.get('/product/search', { params: {
                        'name': this.searchName, 'page': page-1,
                        'size': size, 'category': this.categoryId}
                    }).then((response) => {
                        this.productList = response.data.data
                    }).catch((err) => {
                        console.error(err.response)
                        this.error()
                    })
                }
            },
            amountByName() {
                this.axios.get('/product/search/amount', {params:{
                    name: this.searchName, category: this.categoryId}})
                .then((response) => {this.pageTotal=response.data.data})
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
                this.comment()
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
            addToCart(data) {
                if (data != null)
                    this.product = data
                this.axios.post('/customer/cart/add', {id:this.product.id, number:1})
                .then((response) => {this.$Notice.success({
                    title: 'Successful', desc: 'Add one product in your cart'
                })})
                .catch((err) => {
                    if (err.response) {
                        // it's a bug
                        // this.$Notice.error({
                        //     title: 'Failed', desc: err.response.data.message
                        // })
                        this.$Notice.success({
                            title: 'Successful', desc: 'Add one product in your cart'
                        })
                    } else {
                        this.$Notice.error({
                            title: 'Failed', desc: 'Please login this system'
                        })
                    }
                })
            },
            addShop(data) {
                this.axios.post('/customer/favorite/add', {id:this.product.shop.id, type:1})
                .then((response) => {this.$Notice.success({
                    title: 'Successful', desc: 'Add one shop in your WishList'
                })}).catch((err) => {this.$Notice.error({
                    title: 'Failed', desc: 'Please login this system'
                })})
            },
            addProduct(data) {
                if (data != null)
                    this.product = data
                this.axios.post('/customer/favorite/add', {id:this.product.id, type:3})
                .then((response) => {this.$Notice.success({
                    title: 'Successful', desc: 'Add one product in your WishList'
                })}).catch((err) => {this.$Notice.error({
                    title: 'Failed', desc: 'Please login this system'
                })})
            },
            comment() {
                this.comments = []
                this.commentFlag = false
                this.axios.get('/comment/list', {
                    params: { productId: this.product.id }
                }).then((response) => {
                    this.comments = response.data.data
                }).catch((err) => {
                    console.error(err)
                })
            },
            showComments() {
                this.commentFlag = !this.commentFlag
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
.product-grid9 .social{width:150px;padding:0;margin:0;list-style:none;opacity:0;transform:translateY(-50%) translateX(-50%);position:absolute;top:60%;left:50%;z-index:1;transition:all .3s ease 0s}
.product-grid9:hover .social{opacity:1;top:50%}
.product-grid9 .social li{display:inline-block;color:#fff;background-color:#333;font-size:16px;line-height:40px;text-align:center;height:40px;width:40px;margin:0 2px;display:block;position:relative;transition:all .3s ease-in-out}
.product-grid9 .social li a{color:#fff;background-color:#333;font-size:16px;line-height:40px;text-align:center;height:40px;width:40px;margin:0 2px;display:block;position:relative;transition:all .3s ease-in-out}
.product-grid9 .social li a:hover{color:#fff;background-color:#ef5777}
.product-grid9 .social li a:after,.product-grid .social li a:before{content:attr(data-tip);color:#fff;background-color:#000;font-size:12px;letter-spacing:1px;line-height:20px;padding:1px 5px;white-space:nowrap;opacity:0;transform:translateX(-50%);position:absolute;left:50%;top:-30px}
.product-grid9 .social li a:after{content:'';height:15px;width:15px;border-radius:0;transform:translateX(-50%) rotate(45deg);top:-20px;z-index:-1}
.product-grid9 .social li a:hover:after,.product-grid .social li a:hover:before{opacity:1}
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
</style>
