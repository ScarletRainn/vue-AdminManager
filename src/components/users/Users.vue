<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入姓名"
            clearable
            @clear="getUserList"
            v-model="queryInfo.query"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
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
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="employeeName" label="姓名"></el-table-column>
        <el-table-column prop="employeeWord" label="电话"></el-table-column>
        <el-table-column prop="gender" label="性别"></el-table-column>
        <el-table-column prop="departmentName" label="职业"></el-table-column>
        <el-table-column label="操作">
          <!-- 编辑用户 -->
          <template v-slot="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              @click="showEditDialog"
              size="mini"
            ></el-button>
            <!-- 删除用户 -->
            <el-button
              type="danger"
              @click="deleteUser"
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
        <el-form-item label="电话" prop="employeeWord">
          <el-input v-model="addUserForm.employeeWord"></el-input>
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
        <el-form-item label="姓名">
          <el-input v-model="editUserForm.employeeName"></el-input>
        </el-form-item>
        <el-form-item label="电话" >
          <el-input v-model="editUserForm.employeeWord"></el-input>
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
        query: ""
      },
      userlist: [],
      dialogVisible: false,
      editDialogVisible: false,
      addUserForm: {
        employeeName:'',
        employeeWord:'',
        gender:'',
        departmentName:''
      },
      editUserForm: {},
      userInfo: "",
      rolesList: [],
      selectRoleId:''
    };
  },
  methods: {
    //初始用户列表渲染
    async getUserList() {
      const { data } = await this.$http.get("/admin/Users");
      console.log(data)
      this.userlist = data.data;
    },
    addDialogClosed() {
      this.$refs.addUserFormRef.resetFields();
    },

    //增加用户事件
    async addUser() {
        console.log(this.addUserForm)
        const { data } = await this.$http.post("/admin/Users", this.addUserForm);
        this.$message.success("添加用户成功！");
        this.dialogVisible = false;
        this.getUserList();
      },

    //查询用户事件
    async showEditDialog(id) {
      const { data } = await this.$http.get(`users/${id}`);
      if (data.meta.status !== 200) {
        this.$message.error("查询用户失败！");
      }
      this.editUserForm = data.data;
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.editUserFormRef.resetFields();
    },

    //编辑用户事件
    editUser() {
      this.$refs.editUserFormRef.validate(async valid => {
        if (!valid) return;
        const { data } = await this.$http.put(`users/${this.editUserForm.id}`, {
          email: this.editUserForm.email,
          mobile: this.editUserForm.mobile
        });
        if (data.meta.status !== 200) {
          this.$message.error("修改用户信息失败！");
        }
        this.$message.success("修改成功！");
        this.editDialogVisible = false;
        this.getUserList();
      });
    },


    //删除用户事件
    deleteUser(id) {
      this.$confirm("该操作将删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const { data } = await this.$http.delete(`users/${id}`);
          if (data.meta.status !== 200) {
            this.$message({
              type: "failure",
              message: "删除失败!"
            });
          } else {
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
