<template>
    <div>
        <div class="background">
            <img src="../assets/login/loginBg.jpg">
        </div>
        <div class="head_1">用户管理系统Demo</div>
        <div class="container">
            <login-top middletop="管理员登录窗口" class="top"></login-top>
            <login-text label="账号" placeholder="请输入账号" @inputChange="res=>model.employeeName=res"></login-text>
            <login-text label="密码" placeholder="请输入密码" type="password" @inputChange="res=>model.password=res"></login-text>
            <login-btn value="登录" @registerSubmit="registerSubmit"></login-btn>
        </div>
    </div>
</template>

<script>
    import LoginTop from '../components/login/LoginTop'
    import LoginText from '../components/login/LoginText'
    import LoginBtn from '../components/login/LoginBtn'
    export default {
        name: "Login",
        data(){
            return{
                model:{
                    employeeName:'',
                    password:''
                }
            }
        },
        components:{
            LoginTop,
            LoginText,
            LoginBtn
        },
        methods:{
            async registerSubmit(){
                   const {data: res}=await this.$http.post('/login',this.model)
                   console.log(res)
                   if(res.message==='登录成功'){
                       this.$message.success("登录成功！")
                       sessionStorage.setItem('token',res.data.token)
                       setTimeout(()=>{this.$router.push('/UserManager')},1000)
                   }else{
                       this.$message.error("帐号密码错误！")
                   }
            }
        }
    }
</script>

<style scoped>
.head_1{
    font-size: 50px;
    position: absolute;
    left: 730px;
    top:100px;
}
.top{
    position: relative;
    top:10px
}
.background{
    width:100%;
    height:100%;
    z-index:-1;
    position: absolute;
}
.container{
    position: relative;
    width: 500px;
    height:250px;
    left: 700px;
    top: 250px;
    background: white;
    border-radius: 10px;
}
</style>