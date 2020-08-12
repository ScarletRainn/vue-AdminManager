<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入用户姓名"
            clearable
            @clear="queryUser"
            v-model="queryInfo.name"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="queryUser"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="dialogVisible = true"
            >添加用户</el-button
          >
        </el-col>
      </el-row>
      <el-table :data="userlist" height="680" border stripe style="width: 100%">
        <el-table-column prop="employeeId" label="id"></el-table-column>
        <el-table-column prop="employeeName" label="姓名"></el-table-column>
        <el-table-column prop="password" label="密码"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="departmentName" label="职业"></el-table-column>
        <el-table-column label="操作">
          <!-- 编辑用户 -->
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog(scope.row.employeeId)"
              size="mini"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              @click="deleteUser(scope.row.employeeId)"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <el-form
        :model="addUserForm"
        ref="addUserFormRef"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="employeeName">
          <el-input v-model="addUserForm.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-input v-model="addUserForm.gender"></el-input>
        </el-form-item>
        <el-form-item label="职业" prop="departmentName">
          <el-input v-model="addUserForm.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
            title="修改用户"
            :visible.sync="editDialogVisible"
            width="50%"
            @close="editDialogClosed"
    >
      <el-form
              :model="editUserForm"
              ref="editUserFormRef"
              label-width="70px"
              class="demo-ruleForm"
      >
        <el-form-item label="id">
              <el-input v-model="editUserForm.employeeId" disabled=""></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editUserForm.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input v-model="editUserForm.password"></el-input>
        </el-form-item>
        <el-form-item label="性别" >
          <el-input v-model="editUserForm.gender"></el-input>
        </el-form-item>
        <el-form-item label="职业" >
          <el-input v-model="editUserForm.departmentName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        name: ''
      },
      userlist: [],
      a:0,
      dialogVisible: false,
      editDialogVisible: false,
      addUserForm: {
        employeeName:'',
        password:'',
        gender:'',
        departmentName:'',
        admin:'0'
      },
      editUserForm: {
        employeeId:'',
        employeeName:'',
        password:'',
        gender:'',
        departmentName:'',
        admin:'0'
      },
      userInfo: "",
      rolesList: [],
      selectRoleId:''
    };
  },
  methods: {
    //初始用户列表渲染
    async getUserList() {
      const { data } = await this.$http.get("/getAllEmployee");
      this.userlist = data.data;
      for(let i=0;i<this.userlist.length;i++){
            if(this.userlist[i].gender==='0'){
                this.userlist[i].gender='女'
            }else{
                this.userlist[i].gender='男'
            }
      }
    },
    //查询用户事件
    async queryUser(){
     for(let i=0;i<this.userlist.length;i++){
       if(this.queryInfo.name===this.userlist[i].employeeName){
         this.a=this.userlist[i].employeeId
       }
     }
     const { data } = await this.$http.get("/getEmployeeById", {
        params:{
          id: this.a
        }
      });
      this.a=0
      if(data.message==='查询失败'){
        this.$message.error("未查到此人！")
        this.userlist=[]
      }else{
        this.$message.success("查询成功！")
        this.userlist = []
        this.userlist.push(data.data)
        console.log(this.userlist)
        if(this.userlist[0].gender==='0'){
          this.userlist[0].gender='女'
        }else{
          this.userlist[0].gender='男'
        }
      }
    },
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },

    //增加用户事件
    async addUser() {
        if(this.addUserForm.gender==='男'){
          this.addUserForm.gender='1'
        }else{
        this.addUserForm.gender='0'
        }
        const { data } = await this.$http.post("/createEmployee", this.addUserForm);
        this.$message.success("添加用户成功！");
        this.dialogVisible = false;
        this.getUserList();
      },
    //点击编辑窗口显示
    async showEditDialog(id) {
        const { data } = await this.$http.get("/getEmployeeById", {
            params:{
                id:id
            }
        });
        this.editUserForm = data.data;
        if(this.editUserForm.gender==='0'){
            this.editUserForm.gender='女'
        }else{
            this.editUserForm.gender='男'
        }
        this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields();
    },

    //编辑用户事件
    async editUser() {
       if(this.editUserForm.gender==='男'){
           this.editUserForm.gender='1'
       }else{
           this.editUserForm.gender='0'
       }
       const { data } = await this.$http.post("updateEmployeeById",this.editUserForm);
       console.log(data)
       this.$message.success("修改信息成功！");
       this.editDialogVisible = false;
       this.getUserList();

},


    //删除用户事件
    deleteUser(id) {
      this.$confirm("该操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data } = await this.$http.post("deleteEmployeeById?id="+id);
          console.log(data)
          if (data.code === 200) {
            this.$message({
                type: "success",
                message: "删除成功!"
            });
            this.getUserList();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="less" scoped>
.el-card{
  margin: 10px 0px;
}
.el-table{
  margin: 10px 0px;
}
.el-pagination{
  margin: 20px 0px 0px 0px;
}
</style>
