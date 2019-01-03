<template>
<div>
    <!-- <Menu mode="horizontal" style="background:rgb(245, 247, 249);" active-name="1">
        <MenuItem v-for="item in category" :key="item.id" :name="item.id">
            {{item.name}}
        </MenuItem>
    </Menu> -->
    <div>
        <div>
          <Carousel style="width: 80%;margin: 1% auto;background:#506b9e;" autoplay :autoplay-speed="speed" v-model="value">
            <CarouselItem>
                <div v-if="shop[0]" class="demo-carousel">
                  <img class="lazyOwl" alt="" @click="imageClick(shop[0].shop.id)"
                  :src="shop[0].image" style="width:100%;height:600px;cursor: pointer;">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div v-if="shop[1]" class="demo-carousel">
                  <img @click="imageClick(shop[1].shop.id)" class="lazyOwl" alt=""
                  :src="shop[1].image" style="width:100%;height:600px;cursor: pointer;">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div v-if="shop[2]" class="demo-carousel">
                  <img @click="imageClick(shop[2].shop.id)" class="lazyOwl" alt=""
                  :src="shop[2].image" style="width:100%;height:600px;cursor: pointer;">
                </div>
            </CarouselItem>
          </Carousel>
          <Row class="advertisement">
              <Col span="12">
                  <img v-if="shop[3]" @click="imageClick(shop[3].shop.id)" class="js_lazy"
                  data-original="//img.appfront.fancyecommerce.com/images/en_a.jpg"
                  :src="shop[3].image" alt="" width="100%" style="height:300px;cursor: pointer;">
              </Col>
              <Col span="12">
                  <img v-if="shop[4]" @click="imageClick(shop[4].shop.id)" class="js_lazy"
                  data-original="//img.appfront.fancyecommerce.com/images/en_a.jpg"
                  :src="shop[4].image" alt="" width="100%" style="height:300px;cursor: pointer;">
              </Col>
          </Row>
        </div>
        <p class="login-title">FEATURED PRODUCTS</p>
        <Divider class="divider" />
        <div class="row">
          <div v-for="item in productList" class="col-md-3 col-sm-6" @click="clickEvent(item.product)">
              <div class="product-grid9">
                  <div class="product-image9">
                      <a v-if="item.image">
                          <img class="pic-1" v-bind:src="item.image">
                      </a>
                      <a v-else>
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo6/images/img-1.jpg">
                      </a>
                      <a>
                          <ul class="social">
                              <li @click="clickEvent(item.product)"><Icon type="ios-search" /></li>
                              <li @click="addProduct(item.product)"><Icon type="ios-heart-outline" /></li>
                              <li @click="addToCart(item.product)"><Icon type="ios-cart-outline" /></li>
                          </ul>
                      </a>
                  </div>
                  <div v-if="item.product" class="product-content">
                      <h3 class="title">{{item.product.name}}</h3>
                      <div class="price">$ {{item.product.price}}</div>
                  </div>
              </div>
          </div>
        </div>
        <Divider />
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
import Product from './Product'

export default {
  data() {
    return {
        value: 0, flag: true, modal: false, modal_loading: false,
        productList: [], product: null, shop: [], speed: 6000
    }
  },
  components: {
      'Product': Product
  },
  mounted: function() {
      this.list()
      this.listShop()
  },
  methods: {
      list() {
          this.productList = []
          axios.get('/advertisement/product/list').then((response) => {
              this.productList = response.data.data
              this.flag = false
          }).catch((err) => {
              this.$Notice.error({
                  title: 'List error',
                  desc: 'Not found product in this category'
              })
          })
      },
      listShop() {
          axios.get('/advertisement/shop/list').then((response) => {
              this.shop = response.data.data
          }).catch((err) => {
              console.error(err.response)
          })
      },
      clickEvent(product) {
          this.modal = true
          this.product = product
      },
      imageClick(id) {
          this.$router.replace({path:'/shop', query: {'id': id}})
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
      }
  }
}
</script>

<style scoped>
.advertisement {
    width: 80%;
    margin: 0 auto;
}
.login-title {
    float: left;
    font-size: 22px;
    margin-left: 10%;
    margin-top: 40px;
    margin-bottom: 15px;
}
.divider {
    width: 80%;
    margin: 0 auto;
    background-color: black;
}
.row {
    width: 80%;
    margin: 0 auto;
    margin-top: 40px;
}
h3.h3{text-align:center;margin:1em;text-transform:capitalize;font-size:1.7em;}
.product-grid9,.product-grid9 .product-image9{position:relative}
.product-grid9{font-family:Poppins,sans-serif;z-index:1}
.product-grid9 .product-image9 a{display:block}
.product-grid9 .product-image9 img{width:190px;height:240px}
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
</style>
