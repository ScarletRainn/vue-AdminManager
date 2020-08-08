<template>
    <div id="app">
        <button @click="getGoodsList">获取</button>
        <button @click="addGoods">添加</button>
    </div>
</template>

<script>
    export default {
        methods: {
            async getGoodsList () {
                const { data: res } = await this.$http.get('/admin/Users')
                console.log(res)
            },
            async addGoods () {
                const { data: res } = await this.$http.post('/admin/Users', {
                    employeeName:'杨冀东',
                    employeeWord:'123456',
                    gender:'男',
                    departmentName:'学生'
                })
                console.log(res)
            },
        }
    }
</script>

<style>

</style>