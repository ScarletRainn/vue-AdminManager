<template>
        <el-container style="height:100vh">
        <el-header>
            <div>
                <span>用户后台管理系统</span>
            </div>
            <el-button type="danger" @click="logout">注销</el-button>
        </el-header>
        <el-container>
            <el-aside :width="'250px'">
                <el-menu
                        background-color="#E6E6FA"
                        text-color="black"
                >
                        <el-menu-item >
                            <template slot="title">
                                <span class="span1">用户管理</span>
                            </template>
                        </el-menu-item>
                </el-menu>
            </el-aside>
            <el-main>
                <Users></Users>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Users from '../components/users/Users'
    export default {
        data(){
            return{
                userlist:[]
            }
        },
        components:{
            Users
        },
        methods: {
            logout() {
                window.sessionStorage.removeItem('token');
                this.$router.push("/login");
            },
        },
};
</script>

<style lang="less" scoped>
    .el-header {
        background-color: #B3C0D1;
        display: flex;
        justify-content: space-between;
        padding-left: 0;
        align-items: center;
        color: #fff;
        font-size: 30px;
        > div {
            display: flex;
            align-items: center;
            span {
                margin-left: 15px;
            }
        }
    }

    .el-aside {
        background-color: #D3DCE6;

    }

    .el-main {
        background-color: #eaedf1;
    }

    .iconfont {
        margin-right: 10px;
    }
    .span1{
        font-size: 20px;
        display: flex;
        justify-content: center;
    }

</style>
