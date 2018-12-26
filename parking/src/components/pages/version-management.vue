<template>
  <div class="version">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>版本管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <!-- <el-input placeholder="输入网关名称或编号查询" class="input-with-select" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>-->
        <!-- <select class="myselect" v-model="parkingLotId" @change="handleUserList(1)">
          <option value>选择所属停车场(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>-->
        <select v-model="appType" @change="handleUserList(1)" class="myselect">
          <option value>选择软件系统（全部）</option>
          <option value="1">HISS停车_iOS</option>
          <option value="0">HISS停车_Android</option>
        </select>
        <select v-model="updateType" @change="handleUserList(1)" class="myselect">
          <option value>选择更新类型</option>
          <option value="0">手动更新</option>
          <option value="1">强制更新</option>
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
              <th>软件系统</th>
              <th>版本号</th>
              <th>apk安装包</th>
              <th>apk地址</th>
              <th>更新类型</th>
              <th>版本描述</th>
              <th>创建人</th>
              <th>创建日期</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.appType==1?"HISS停车_iOS":item.appType==0?"HISS停车_Android":''}}</td>
              <td>{{item.versionNo}}</td>
              <td>
                  <a href="javascript:;">下载</a>
              </td>

              <td>{{item.apkUrl}}</td>
              <td>{{item.type==1?"强制更新":item.type==0?"手动更新":''}}</td>
              <td style="width:15%">{{item.remark}}</td>
              <td>{{item.createUserName}}</td>

              <td>{{item.createTime}}</td>

              <td style="width:15%">
                <el-button size="mini" @click="getDescribe($event)" :detail-id="item.id">详情</el-button>
                <el-button size="mini" v-bind:id="item.id" @click="handleEdit($event)">编辑</el-button>
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
    <el-dialog title="添加版本" :visible.sync="dialogFormVisible" width="35%" id="add">
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="软件系统:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <select v-model="ruleForm.appType" @change="handleUserList(1)" class="myselect">
            <option value>选择软件系统（全部）</option>
            <option value="1">HISS停车_iOS</option>
            <option value="0">HISS停车_Android</option>
          </select>
        </el-form-item>
        <el-form-item
          label="版本号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <el-input autocomplete="off" v-model="ruleForm.versionNo" placeholder="请输入版本号（如V1.0.0）"></el-input>
        </el-form-item>
        <el-form-item
          label="apk安装包:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
          <el-upload
            style="display: inline; margin-left: 10px;margin-right: 10px;"
            action="#"
            ref="fileupload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">
              上传文件
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="apk地址"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="license"
        >
          <el-input autocomplete="off" v-model="ruleForm.apkUrl"></el-input>
        </el-form-item>

        <el-form-item
          label="更新类型:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <select v-model="ruleForm.type" @change="handleUserList(1)" class="myselect">
          <option value>选择更新类型</option>
          <option value="0">手动更新</option>
          <option value="1">强制更新</option>
        </select>
        </el-form-item>
        <el-form-item
          label="版本描述:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
            <el-input autocomplete="off" v-model="ruleForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑网关" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
     
      <el-form :model="editForm">
         <el-form-item label="软件系统:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <select v-model="editForm.appType" @change="handleUserList(1)" class="myselect">
            <option value>选择软件系统（全部）</option>
            <option value="1">HISS停车_iOS</option>
            <option value="0">HISS停车_Android</option>
          </select>
        </el-form-item>
        <el-form-item
          label="版本号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <el-input autocomplete="off" v-model="editForm.versionNo" placeholder="请输入版本号（如V1.0.0）"></el-input>
        </el-form-item>
        <el-form-item
          label="apk安装包:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
          <el-upload
            style="display: inline; margin-left: 10px;margin-right: 10px;"
            action="#"
            ref="fileupload"
            :show-file-list="false"
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">
              上传文件
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>
        </el-form-item>

        <el-form-item
          label="apk地址"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="license"
        >
          <el-input autocomplete="off" v-model="editForm.apkUrl"></el-input>
        </el-form-item>

        <el-form-item
          label="更新类型:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <select v-model="editForm.type" @change="handleUserList(1)" class="myselect">
          <option value>选择更新类型</option>
          <option value="0">手动更新</option>
          <option value="1">强制更新</option>
        </select>
        </el-form-item>
        <el-form-item
          label="版本描述:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
            <el-input autocomplete="off" v-model="editForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import XLSX from "xlsx";
export default {
  name: "version",
  data() {
    return {
      //筛选
      appType: "",
      updateType: "",

      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      //
      formLabelWidth: "150px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormeditVisible: false,
      value7: "",
      dialogVisible: false,

      currentPage1: 5,
      tableData: "", //列表数据
      server: "", //服务器网卡数据
      //添加数据
      ruleForm: {
        appType: "",
        versionNo: "",
        apkUrl: "",
        type: "",
        remark: "",
        versionName: ""
      },
      //编辑数据
      editForm: {
        id: "",
        appType: "",
        versionNo: "",
        apkUrl: "",
        type: "",
        remark: "",
        versionName: ""
      },
      //添加验证规则
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: "请输入网关名称，不能为空",
        //     trigger: "blur"
        //   }
        // ],
       
       
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
          this.GLOBAL.xgurl + "/park-api/park/version/queryVersion",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
           appType:this.appType,
           updateType:this.updateType
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
     this.updateType='',
     this.appType='',
     this.handleUserList(1);
    },
    //添加版本
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;

          console.log(datas);
          this.$http
            .post(
              this.GLOBAL.xgurl + "/park-api/park/version/addOrUpdateVersion",
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
            this.GLOBAL.xgurl + "/park-api/park/version/deleteVersion",
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
    //上传excel
    beforeUpload(file) {
      console.log(file);
      var formdata = new FormData(); //创建一个表单
      formdata.append("fileUrl", file);
    //   formdata.append("className", "TGateway");
      let _this = this;
      //调用接口传文件
      _this.$http
        .post(_this.GLOBAL.xgurl + "/park-api/park/file/getUrl", formdata, {
          headers: {
            "Content-Type": "application/json;charset=UTF-8"
          }
        })
        .then(res => {
          console.log(res.data);
          this.$message({
            type: "success",
            message: res.data.errorMsg
          });
          this.ruleForm.apkUrl=res.data.dataArray;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //编辑保存
    saveEdit() {
      let _this = this;
      console.log(this.editForm);

      this.dialogFormeditVisible = false;
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/version/addOrUpdateVersion",
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

    //编辑回显数据
    handleEdit(event) {
      this.dialogFormeditVisible = true;
      var id = $(event.currentTarget).attr("id");
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/version/queryVersionInfo",
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
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },

    //详情
    getDescribe(event) {
      var id = $(event.currentTarget).attr("detail-id");
       sessionStorage.setItem('id',id);
      this.$router.push({
        name: "versionDetail",
        params: {
          id: id
        }
      });
    },
   
  },

  mounted: function() {},
  components: {},
  created() {
    this.handleUserList(this.currentPage);
    this.queryParkingSpace();
  
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
