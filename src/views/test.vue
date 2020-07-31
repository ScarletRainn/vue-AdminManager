<template>
    <div>
        <button @click="getData">接受数据</button>
    </div>
</template>

<script>
    export default {
        name: "test",
        methods: {
            async getData() {
                    const {data: res} = await this.$http.get('/api/user_data')
                    console.log(res.data[1])
                }
            }
    }
</script>

<style scoped>
button{
    margin: 50px;
}
</style>