<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>后台用户管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入用户姓名或账号查询" class="input-with-select" v-model="username">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>
        <select v-model="roleId" @change="handleUserList(1)" class="myselect">
          <option value>选择角色类型(全部)</option>
          <!-- <option :value="item" v-for="item in areas">{{item}}</option> -->
        </select>
        <el-button type="info" size="small" @click="reset">重置</el-button>
      </div>
      <!-- 添加删除按扭功能 -->
      <div>
        <el-row style="text-align:left;margin-top:15px;">
          <el-button type="primary" @click="dialogFormVisible = true" size="small">添加</el-button>
        </el-row>
      </div>
      <!-- 表单 -->
      <div>
        <table class="table table-striped" style="width: 97%;margin-top:10px;" v-cloak>
          <thead>
            <tr>
              <!--   <th>
                                            <input type="checkbox"  id="all_checked"/>
              全选</th>-->
              <th>序号</th>
              <th>姓名</th>
              <th>账号</th>
              <th>角色类型</th>
              <th>状态</th>
              <th>创建人</th>
              <th>创建日期</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.username}}</td>
              <td>{{item.loginName}}</td>
              <td>{{item.roleId}}</td>

              <td :class="{red:item.enable==0}">{{item.enable==1?"启用":item.enable==0?"禁用":''}}</td>

              <td style="width:15%">{{item.createUser}}</td>

              <td >{{item.createTime|formatTime('YMDHMS')}}</td>

              <td style="width:18%">
               
                 <el-button size="mini" v-bind:id="item.managerId" @click="edit($event)">编辑</el-button>
                <el-button
                  size="mini"
                  v-bind:id="item.managerId"
                  :enable="1"
                  v-if="item.enable==0"
                  @click="enable($event)"
                >启用</el-button>
                <el-button
                  size="mini"
                  v-bind:id="item.managerId"
                  v-else
                  @click="enable($event)"
                  :enable="0"
                >禁用</el-button>
               
                <el-button size="mini" @click="handleEdit($event)" :userId="item.managerId">重置密码</el-button>
                 <el-button size="mini" @click="open2($event)">删除</el-button>
              </td>
            </tr>
          </tbody>
        </table>

        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible" width="35%" id="add">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item
          label="用户姓名:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="username"
        >
          <el-input autocomplete="off" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="登录账号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="loginName"
        >
          <el-input autocomplete="off" v-model="ruleForm.loginName"></el-input>
        </el-form-item>
        <el-form-item
          label="*登录密码:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="password"
        >
          <el-input autocomplete="off" v-model="ruleForm.password"></el-input>
        </el-form-item>

        <el-form-item
          label="角色类型"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="roleId"
        >
          <select v-model="ruleForm.roleId" class="myselect">
            <option value>选择角色类型(全部)</option>
          </select>
        </el-form-item>

        <el-form-item label="启用状态:" :label-width="formLabelWidth" style="color:#000" prop="enable">
          <select v-model="ruleForm.enable" class="myselect">
            <option value>选择启用状态</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
          </select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 密码弹出框 -->
    <el-dialog title="重置密码" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item
          label="重置密码:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="password"
        >
          <el-input autocomplete="off" v-model="ruleForm.password"></el-input>
          <span>请设置6-20位字母+数字组成的新密码</span>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹出框 -->
     <el-dialog title="添加用户" :visible.sync="dialogeditVisible" width="35%" id="add">
      <el-form :model="editForm" >
        <el-form-item
          label="用户姓名:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="username"
        >
          <el-input autocomplete="off" v-model="editForm.username"></el-input>
        </el-form-item>
        <el-form-item
          label="登录账号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="loginName"
        >
          <el-input autocomplete="off" v-model="editForm.loginName"></el-input>
        </el-form-item>
        <el-form-item
          label="*登录密码:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="password"
        >
          <el-input autocomplete="off" v-model="editForm.password"></el-input>
        </el-form-item>

        <el-form-item
          label="角色类型"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="roleId"
        >
          <select v-model="editForm.roleId" class="myselect">
            <option value>选择角色类型(全部)</option>
          </select>
        </el-form-item>

        <el-form-item label="启用状态:" :label-width="formLabelWidth" style="color:#000" prop="enable">
          <select v-model="editForm.enable" class="myselect">
            <option value>选择启用状态</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
          </select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      //筛选
      roleId: "",
      loginName: "",
      username: "",
      //查询所有停车场
      queryParkingLotdata: "",

      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      //
      formLabelWidth: "100px",
      dialogTableVisible: false,
      dialogFormVisible: false,//添加弹出框
      dialogFormeditVisible: false,//密码弹出框
      dialogeditVisible:false,//编辑弹出框
      userId: "", //用户id
      dialogVisible: false,

      currentPage1: 5,
      tableData: "", //列表数据
      //添加数据
      ruleForm: {
        username: "",
        loginName: "",
        password: "",
        enable: "",
        roleId: "",
        createUser: ""
      },
      //编辑数据
      editForm: {
        username: "",
        loginName: "",
        password: "",
        enable: "",
        roleId: "",
        createUser: "",
        managerId:'',
      },
      //添加验证规则
      rules: {
        password: [
          {
            required: true,
            message: "请输入网关名称，不能为空",
            trigger: "blur"
          },
          { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      this.handleUserList(this.currentPage);
    },
    //查询所有停车场
    queryParkingSpace() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/queryAllParkingLot",

          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.queryParkingLotdata = res.data.dataArray;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //列表数据
    handleUserList(currentpage) {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/sys/querySysManager",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            username: this.username,
            loginName: this.username,
            roleId: this.roleId
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.total = res.data.dataArray.totalCount;
          console.log(this.total);
          this.tableData = res.data.dataArray.datas;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //重置
    reset() {
      (this.username = ""), this.handleUserList(1);
    },

    //
    //删除弹出框
    open2() {
      var id = $(event.currentTarget)
        .prev()
        .attr("userId");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post(
            this.GLOBAL.xgurl + "/park-api/park/sys/deleteSysManager",
            {
              managerId: id
            },
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          )
          .then(res => {
            console.log(res.data);
            this.$message({
              type: "success",
              message: res.data.errorMsg
            });
            this.handleUserList(this.currentPage);
          })
          .catch(res => {
            console.log("err");
          });
      });
    },

    //编辑保存
    saveEdit() {
      let _this = this;
      console.log(this.editForm);

      this.dialogeditVisible = false;
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/sys/saveOrUpdateSysManager",
          this.editForm,
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data);
          this.$message({
            type: "success",
            message: res.data.errorMsg
          });
          _this.handleUserList(this.currentPage);
        })
        .catch(res => {
          console.log("err");
        });
    },

    //重置密码对话框
    handleEdit(event) {
      this.dialogFormeditVisible = true;
      this.userId = $(event.currentTarget).attr("userId");
    },
    //重置密码
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;
          datas.userId = this.userId;
          console.log(datas);
          this.$http
            .post(
              this.GLOBAL.xgurl + "/park-api/park/sys/resetPassword",
              datas,
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              }
            )
            .then(res => {
              console.log(res.data);

              //$("#add").hide();
              this.$message.error(res.data.errorMsg);
              this.handleUserList(this.currentPage);
              this.dialogFormeditVisible = false;
            })
            .catch(res => {
              console.log("err");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //详情
    getDescribe(event) {
      var id = $(event.currentTarget).attr("detail-id");
      this.$router.push({
        name: "appuserDetail",
        params: {
          id: id
        }
      });
    },
   
    //启用
    enable(event) {
      var managerId = $(event.currentTarget).attr("id");
      var enable = $(event.currentTarget).attr("enable");
      if (enable == 1) {
        var msg = "确定要启用该用户吗？";
      } else {
        var msg = "确定要禁用该用户吗？";
      }
      this.$confirm(msg, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post(
            this.GLOBAL.xgurl + "/park-api/park/sys/enableSysManager",
            { managerId: managerId, enable: enable },
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          )
          .then(res => {
            console.log(res.data.dataArray);
            this.$message({
              type: "success",
              message: res.data.errorMsg
            });
            this.handleUserList(this.currentPage);
          })
          .catch(res => {
            console.log("err");
          });
      });
    },
    //添加功能
    addsubmitForm(formName){
        this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;

          console.log(datas);
          this.$http
            .post(this.GLOBAL.xgurl + "/park-api/park/sys/saveOrUpdateSysManager", datas, {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            })
            .then(res => {
              console.log(res.data);

              //$("#add").hide();
              this.$message.error(res.data.errorMsg);
              this.handleUserList(1);
              this.dialogFormVisible = false;
            })
            .catch(res => {
              console.log("err");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
     //编辑回显数据
    edit(event) {
      this.dialogeditVisible = true;
      var id = $(event.currentTarget).attr("id");
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/sys/findSysManager",
          { managerId: id },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.editForm = res.data.dataArray;
        })
        .catch(res => {
          console.log("err");
        });
    },
  },

  mounted: function() {},
  components: {},
  created() {
    this.handleUserList(this.currentPage);
    this.queryParkingSpace();
    this.findAllServer();
  }
};
</script>


<style scoped>
.el-pagination {
  text-align: right;
  margin-top: 15px;
  margin-right: 36px;
}
.el-table .success-row {
  background: #f0f9eb;
}
.el-button + .el-button {
  margin-left: 0 !important;
}
.el-form-item {
  margin-bottom: 22px !important;
}
.el-dialog__wrapper {
  text-align: left !important;
}
.el-input-group {
  width: 16% !important;
}
.stat-container {
  display: table;
  margin-bottom: 1.5em;
  width: 100%;
  margin-top: 30px;
}
.stat-holder {
  display: table-cell;
  width: 25%;
}
.stat {
  height: 50px;
  padding: 15px;
  margin-right: 1em;
  font-size: 12px;
  font-style: italic;
  text-align: center;
  color: #888;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}
.stat:hover {
  cursor: pointer;
  color: #909399;
}
.stat span {
  display: block;
  margin-bottom: 0.4em;
  font-size: 26px;
  font-weight: 600;
  font-style: normal;
  color: #4a515b;
}
.index_img img {
  width: 95%;
  margin-top: 42px;
  height: 430px;
}

.num_style[data-v-1ac62fda] {
  color: #fff;
  font-size: 23px;
  border-bottom: 1px solid #fff;
  width: 200px;
  display: inline-block;
  text-align: center;
  margin-top: 33%;
}
.posi {
  position: absolute;
  top: 17%;
  left: 39%;
  color: #fff;
  font-size: 36px;
}
.count {
  width: 200px;
  height: 120px;
  background: #409eff;
  float: left;
  position: relative;
  margin-right: 15px;
  margin-left: 6%;
  margin-top: 2%;
  border-radius: 3px;
}
.home {
  font-size: 28px;
}
.rightWrap {
  margin-left: 20px !important;
}
</style>
