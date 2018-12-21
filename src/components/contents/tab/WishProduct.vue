<template>
    <div>
        <div v-if="data1.length == 0" class="cart-empty">
            <Icon size="100" type="ios-cart-outline" />
            <p>
                Your Favorite List is empty	Start <a href="#/">shopping now</a>!
                And click the wish button to add product or shop in your wish list.
            </p>
        </div>
        <div class="cart-record">
            <div class="list-group">
                <a v-for="item in data1" :key="item.id" class="list-group-item list-group-item-action flex-column align-items-start">
                  <div class="d-flex w-100 justify-content-between">
                      <div style="width:12%;"><img style="height:100px;width:100%;" :src="item.entity.image"/></div>
                      <div style="width:84%;">
                          <div class="d-flex w-100 justify-content-between">
                            <h3 class="mb-1">{{item.entity.name}}</h3>
                            <p>${{item.entity.price}}</p>
                          </div>
                          <p class="mb-1">{{item.entity.info}}</p>
                          <p class="mb-1" style="color:red;">{{item.entity.number}} left in stock</p>
                          <div class="d-flex w-100 justify-content-between">
                              <p class="mb-1"><Tag type="border" color="success">{{item.entity.shop.name}}</Tag></p>
                              <p style="text-align:right;">
                                  <Button @click="addToCart(item)" size="small" type="primary">add to cart</Button>
                                  <Button @click="remove(item)" size="small" type="error">delete</Button>
                              </p>
                          </div>
                      </div>
                  </div>
                </a>
              </div>
          </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            data1: []
        }
    },
    mounted: function() {
        this.list()
    },
    methods: {
        list() {
            this.axios.get('/customer/favorite/list/product').then((response) => {
                this.data1 = response.data.data
            }).catch((err) => {
                this.data1 = []
                console.error(err.response)
            })
        },
        addToCart(item) {
            this.axios.post('/customer/cart/add', {id:item.entity.id, number:1})
            .then((response) => {this.$Notice.success({
                title: 'Successful', desc: 'Add one product in your cart'
            })})
            .catch((err) => {this.$Notice.error({
                title: 'Failed', desc: 'Please login this system'
            })})
        },
        remove(item) {
            this.axios.delete('/customer/favorite/delete', {params: {id:item.id}})
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
</style>
