<template>
  <div>
    <div>
      <Carousel style="width: 40%;margin: 1% auto;background:#506b9e;" autoplay v-model="value" loop>
        <CarouselItem>
            <div class="demo-carousel">
              <img height="212" width="173" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
              <img height="212" width="173" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
              <img height="212" width="173" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
            </div>
        </CarouselItem>
        <CarouselItem>
            <div class="demo-carousel">
              <img height="212" width="173" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
            </div>
        </CarouselItem>
      </Carousel>
    </div>
    <Divider />
    <div class="container" style="margin-bottom:4%;">
      <h3 class="h3">Product List</h3>
      <div class="row">
        <div v-for="item in arr" class="col-md-3 col-sm-6">
            <div class="product-grid9">
                <div class="product-image9">
                    <a href="#">
                        <img class="pic-1" src="http://bestjquery.com/tutorial/product-grid/demo6/images/img-1.jpg">
                        <img class="pic-2" src="http://bestjquery.com/tutorial/product-grid/demo6/images/img-1.jpg">
                    </a>
                </div>
                <div class="product-content">
                    <h3 class="title"><a href="#">Women's Top</a></h3>
                    <div class="price"> $12.60 - $40.53</div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    import axios from 'axios'
    import qs from 'qs'

    export default {
      data() {
        return {
          value: 0,
          productList: [],
          arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]
        }
      },
      mounted: function() {
        this.list()
      },
      methods: {
        list() {
          axios.get('/list', {
            params: {
              'page': 0,
              'size': 10
            }
          }).then((response) => {
            this.productList = response.data.data
            console.log(this.productList[0].name)
          }).catch((err) => {
            console.log(err)
          })
        }
      }
    }
</script>

<style scope>
h3.h3{text-align:center;margin:1em;text-transform:capitalize;font-size:1.7em;}
.product-grid9,.product-grid9 .product-image9{position:relative}
.product-grid9{font-family:Poppins,sans-serif;z-index:1}
.product-grid9 .product-image9 a{display:block}
.product-grid9 .product-image9 img{width:100%;height:auto}
.product-grid9 .pic-1{opacity:1;transition:all .5s ease-out 0s}
.product-grid9:hover .pic-1{opacity:0}
.product-grid9 .pic-2{position:absolute;top:0;left:0;opacity:0;transition:all .5s ease-out 0s}
.product-grid9:hover .pic-2{opacity:1}
.product-grid9 .product-full-view{color:#505050;background-color:#fff;font-size:16px;height:45px;width:45px;padding:18px;border-radius:100px 0 0;display:block;opacity:0;position:absolute;right:0;bottom:0;transition:all .3s ease 0s}
.product-grid9 .product-full-view:hover{color:#c0392b}
.product-grid9:hover .product-full-view{opacity:1}
.product-grid9 .product-content{padding:12px 12px 0;overflow:hidden;position:relative}
.product-content .rating{padding:0;margin:0 0 7px;list-style:none}
.product-grid9 .rating li{font-size:12px;color:#ffd200;transition:all .3s ease 0s}
.product-grid9 .rating li.disable{color:rgba(0,0,0,.2)}
.product-grid9 .title{font-size:16px;font-weight:400;text-transform:capitalize;margin:0 0 3px;transition:all .3s ease 0s}
.product-grid9 .title a{color:rgba(0,0,0,.5)}
.product-grid9 .title a:hover{color:#c0392b}
.product-grid9 .price{color:#000;font-size:17px;margin:0;display:block;transition:all .5s ease 0s}
.product-grid9:hover .price{opacity:0}
.product-grid9 .add-to-cart{display:block;color:#c0392b;font-weight:600;font-size:14px;opacity:0;position:absolute;left:10px;bottom:-20px;transition:all .5s ease 0s}
.product-grid9:hover .add-to-cart{opacity:1;bottom:0}
@media only screen and (max-width:990px){.product-grid9{margin-bottom:30px}
}

</style>
