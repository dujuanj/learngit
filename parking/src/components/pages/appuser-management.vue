<template>
  <div class="appuser">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>app用户管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入用户姓名查询" class="input-with-select" v-model="username">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>

        <el-button type="info" size="small" @click="reset">重置</el-button>
      </div>
      <!-- 添加删除按扭功能 -->
      <!-- 表单 -->
      <div>
        <table class="table table-striped" style="width: 97%;margin-top:10px;" v-cloak>
          <thead>
            <tr>
              <!--   <th>
                                            <input type="checkbox"  id="all_checked"/>
              全选</th>-->
              <th>序号</th>
              <th>手机号</th>
              <th>昵称</th>
              <th>绑定车位</th>
              <th>绑定车辆</th>
              <th>是否绑定微信</th>
              <th>会员等级</th>
              <th>账户余额</th>
              <th>可用H币</th>
              <th>优惠券</th>
              <th>状态</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.phoneNo}}</td>
              <td>{{item.nickName}}</td>
              <td>{{item.bindParkingSpaceNum}}</td>

              <td>{{item.bindLicensetPlateNum}}</td>
              <!-- 是否绑定微信 -->
              <td>{{}}</td>
              <td style="width:15%">{{item.grade}}</td>
              <td>{{item.balance}}元</td>
              <!-- 可用H币 -->
              <td>{{}}</td>
              <!-- 优惠券 -->
              <td>{{}}</td>
              <td :class='{red:item.enable==0}'>{{item.enable==1?"启用":item.enable==0?"禁用":''}}</td>

              <td style="width:18%">
                <el-button size="mini" @click="getDescribe($event)" :detail-id="item.id">详情</el-button>
                <el-button
                  size="mini"
                  v-bind:id="item.id"
                  :enable='1'
                  v-if="item.enable==0"
                  @click="enable($event)"
                >启用</el-button>
                <el-button size="mini" v-bind:id="item.id" v-else  @click="enable($event)" :enable='0' >禁用</el-button>
                <!-- <el-button size="mini" @click="open2($event)">重置密码</el-button> -->
                <el-button size="mini" @click="handleEdit($event)" :userId="item.id">重置密码</el-button>
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
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "appuser",
  data() {
    return {
      //筛选

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
      dialogFormVisible: false,
      dialogFormeditVisible: false,
      userId: "", //用户id
      dialogVisible: false,

      currentPage1: 5,
      tableData: "", //列表数据
      //添加数据
      ruleForm: {
        password: ""
      },
      //编辑数据
      editForm: {
        id: "",
        name: "",
        gatewayMac: "",
        license: "",
        serverId: "",
        isBindParkingLot: "",
        parkingLotId: ""
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
          this.GLOBAL.xgurl + "/park-api/park/user/queryUser",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            username: this.username
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
        .attr("id");
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post(
            this.GLOBAL.xgurl + "/park-api/park/gateway/deleteGateway",
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

      this.dialogFormeditVisible = false;
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/gateway/addGateway",
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

    handleChange(value) {
      console.log(value);
      console.log(value.length);
      var len = value.length;

      for (var i = 0; i < len; i++) {
        this.cityOptions.push(CodeToText[value[i]]);
      }
      console.log(this.cityOptions); // ["北京市", "市辖区", "朝阳区", __ob__: Observer]
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
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
              this.GLOBAL.xgurl + "/park-api/park/user/changePassword",
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
       sessionStorage.setItem('id',id);
      this.$router.push({
        name: "appuserDetail",
        params: {
          id: id
        }
      });
    },
    //获取所有服务器网卡
    findAllServer() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/gateway/findAllServer",

          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.server = res.data.dataArray;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //启用
    enable(event) {
      var userId = $(event.currentTarget).attr("id");
      var enable = $(event.currentTarget).attr("enable");
      if(enable==1){
        var msg='确定要启用该用户吗？'
      }else{
        var msg='确定要禁用该用户吗？'
      }
      this.$confirm(msg,'提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
          this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/user/resetEnable",
          { userId: userId, enable: enable },
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
      })
      
    }
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
