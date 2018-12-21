<template>
<div>
    <!-- <Menu mode="horizontal" style="background:rgb(245, 247, 249);" active-name="1">
        <MenuItem v-for="item in category" :key="item.id" :name="item.id">
            {{item.name}}
        </MenuItem>
    </Menu> -->
    <div>
        <div>
          <Carousel style="width: 60%;margin: 1% auto;background:#506b9e;" autoplay v-model="value" loop>
            <CarouselItem>
                <div class="demo-carousel">
                  <img height="312" width="253" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                  <img height="312" width="253" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                  <img height="312" width="253" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                  <img height="312" width="253" src="http://fenlan96.com/images/1503813706.png" alt="跟阿铭学Linux(第三版) by 李世明" class="grid-product__image">
                </div>
            </CarouselItem>
          </Carousel>
        </div>
        <Divider />
        <Product></Product>
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
        value: 0
    }
  },
  components: {
      'Product': Product
  }
}
</script>

<style scoped>

</style>
