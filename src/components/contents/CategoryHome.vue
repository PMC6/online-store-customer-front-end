<template>
  <div class="category-bar">
      <Breadcrumb>
        <BreadcrumbItem to="/">
            <Icon type="ios-home-outline"></Icon> Index
        </BreadcrumbItem>
        <BreadcrumbItem>
            <Icon type="logo-buffer"></Icon> Category
        </BreadcrumbItem>
        <BreadcrumbItem v-if="category.length != 0">
            <Icon type="ios-cafe"></Icon> {{category[categoryId-1].name}}
        </BreadcrumbItem>
    </Breadcrumb>
    <Product></Product>
  </div>
</template>
<script>
import Product from './Product'

export default {
    data() {
        return {
            category:[]
        }
    },
    components: {
        'Product': Product
    },
    computed: {
        categoryId() {
            return this.$route.query.id
        }
    },
    mounted: function() {
        this.getCategory()
    },
    methods: {
        getCategory() {
            this.axios.get('/category')
            .then((response) => {this.category = response.data.data})
            .catch((err) => {console.error(err.response)})
        }
    }
}
</script>

<style scoped>
.category-bar {

}
</style>
