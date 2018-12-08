<template>
<div class="layout">
    <Layout>
        <Header id="header">Header</Header>
        <Layout id="layout">
          <Content>Content</Content>
        </Layout>
        <Footer class="layout-footer-center">2018-2019 &copy; PARKnSHOP.com</Footer>
    </Layout>
</div>
</template>
<script>
import Header from './Header'
import Content from './Content'

export default {
  components: {
    'Header': Header,
    'Content': Content
  }
}
</script>

<style scope>
#header {
  position: fixed;
  width: 100%;
  z-index: 9;
}
#layout {
  margin-top: 5%;
  z-index: 1;
  display: inline-block;
  min-height: 82vh;
}
.layout-footer-center{
    text-align: center;
    background: #2a2730;
}
</style>
