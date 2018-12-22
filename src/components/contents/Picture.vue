<template>
    <div>
        <Upload
            style="width:50%;margin: 0 auto;"
            type="drag"
            name="name"
            :on-success="handleSuccess"
            action="http://39.98.165.19:8080/advertisement/upload">
            <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>Click or drag files here to upload</p>
            </div>
        </Upload>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        methods: {
            handleSuccess (res, file) {
                console.log(res, file)
            }
        }
    }
</script>

<style scoped>
</style>
