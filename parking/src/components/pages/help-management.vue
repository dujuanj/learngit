<template>
  <div class="help">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>APP使用帮助管理 </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <!-- <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入用户姓名或账号查询" class="input-with-select" v-model="username">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>

        <el-button type="info" size="small" @click="reset">重置</el-button>
      </div> -->
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
              <th>问题名称</th>
              <th>跳转链接</th>
              <th>位置序号</th>
              <th>创建人</th>
              <th>创建日期</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.helpName}}</td>
              <td>{{item.jumpUrl}}</td>
              <td>{{item.num}}</td>

              <td>{{item.createUser}}</td>

              <td style="width:15%">{{item.createTime|formatTime('YMDHMS')}}</td>

              <td style="width:18%">
                <el-button size="mini" v-bind:id="item.id" @click="handleEdit($event)">编辑</el-button>

                <el-button size="mini" @click="open2($event)">删除</el-button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
        ></el-pagination>-->
      </div>
    </div>
    <!-- 添加弹框 -->
    <el-dialog title="添加APP使用帮助" :visible.sync="dialogFormVisible" width="35%" id="add">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="问题名称:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <el-input autocomplete="off" v-model="ruleForm.helpName"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接:" :label-width="formLabelWidth" style="color:#000" prop="appEui">
          <el-input autocomplete="off" v-model="ruleForm.jumpUrl"></el-input>
        </el-form-item>
        <el-form-item
          label="序号:"
          :label-width="formLabelWidth"
          style="color:#000"
         
        >
          <el-input autocomplete="off" v-model="ruleForm.num" placeholder="请填写位置序号（1-99）"></el-input>
        </el-form-item>
         <el-form-item
          label="创建人:"
          :label-width="formLabelWidth"
          style="color:#000"
        
        >
          <el-input autocomplete="off" v-model="ruleForm.createUser"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addsubmitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑弹框 -->
    <el-dialog title="添加组" :visible.sync="dialogeditFormVisible" width="35%" id="add">
      <el-form :model="editForm">
       <el-form-item label="问题名称:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <el-input autocomplete="off" v-model="editForm.helpName"></el-input>
        </el-form-item>
        <el-form-item label="跳转链接:" :label-width="formLabelWidth" style="color:#000" prop="appEui">
          <el-input autocomplete="off" v-model="editForm.jumpUrl"></el-input>
        </el-form-item>
        <el-form-item
          label="序号:"
          :label-width="formLabelWidth"
          style="color:#000"
         
        >
          <el-input autocomplete="off" v-model="editForm.num" placeholder="请填写位置序号（1-99）"></el-input>
        </el-form-item>
        
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogeditFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()">确 定</el-button>
      </div>
    </el-dialog>
   
    <!--  -->
  </div>
</template>

<script>
export default {
  name: "help",
  data() {
    return {
      //筛选
      roleId: "",
      loginName: "",
      username: "",

      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      //
      formLabelWidth: "100px",
      dialogTableVisible: false,
      dialogFormVisible: false,

      dialogeditFormVisible: false, //编辑弹框
      userId: "", //用户id
      dialogVisible: false,

      currentPage1: 5,
      tableData: "", //列表数据
      //添加数据
      ruleForm: {
        helpName: "",
        jumpUrl: "",
        num:'',
        createUser: ""
      },
      //编辑数据
      editForm: {
        helpName: "",
        jumpUrl: "",
        num:'',
        createUser: "",
        id:''
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

    //列表数据
    handleUserList(currentpage) {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/help/listHelp",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
           
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data);
          //this.total = res.data.dataArray.totalCount;
          //console.log(this.total);
          this.tableData = res.data.dataArray;
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
        .attr("id");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post(
            this.GLOBAL.xgurl + "/park-api/park/help/deleteHelp",
            {
              id: id
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

      this.dialogeditFormVisible = false;
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/help/updateHelp",
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

    //添加功能
    addsubmitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;

          console.log(datas);
          this.$http
            .post(
              this.GLOBAL.xgurl + "/park-api/park/help/addHelp",
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
    handleEdit(event) {
      this.dialogeditFormVisible = true;
      var id = $(event.currentTarget).attr("id");
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/help/getHelp",
          { id: id },
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
    }
  },

  mounted: function() {},
  components: {},
  created() {
    this.handleUserList(this.currentPage);
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
