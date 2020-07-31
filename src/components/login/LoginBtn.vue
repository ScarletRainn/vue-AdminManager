<template>
    <div class="Ploginbtn" @click="registerClick">
        <div class="loginbtn">{{value}}</div>
    </div>
</template>

<script>
    export default {
        name: "LoginBtn",
        props:['value'],
        methods:{
            registerClick(){
                this.$emit('registerSubmit')
            }
        }
    }
</script>

<style scoped>
.Ploginbtn{
    padding: 30px 10px;
    display: flex;
    justify-content: center;
}
.loginbtn{
    width: 200px;
    height:45px;
    background-color: cornflowerblue;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;

}
</style>