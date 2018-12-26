<template>
  <div class="version-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/version-management' }">版本管理</el-breadcrumb-item>
       <el-breadcrumb-item >版本管理详情</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>网关管理详情</el-breadcrumb-item> -->
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div>
      <div>
        <el-row>
          <el-button type="primary" @click="dialogFormeditVisible = true" size="small">编辑</el-button>
          <el-button type="primary" @click="open2" size="small">删除</el-button>
        </el-row>
        <!-- 版本信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">版本信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">软件系统:</label>
              <span>{{detailDatas.appType}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">版本号:</label>
              <span>{{detailDatas.versionNo}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">apk安装包:</label>
              <span>
                  <a href="javascript:;">下载</a>
              </span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">apk地址:</label>
              <span>{{detailDatas.apkUrl}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">更新类型:</label>
              <span>{{detailDatas.type}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">版本描述:</label>
              <span>{{detailDatas.remark}}</span>
            </div>
           
          </div>
        </div>
      
        <!-- 创建信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">创建信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">创建人:</label>
              <span>{{detailDatas.createUserName}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">账号:</label>
              <span>{{detailDatas.createLoginName}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">创建日期:</label>
              <span>{{detailDatas.createTime | formatTime('YMDHMS')}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
 

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
          <select v-model="editForm.type"  class="myselect">
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

import version from "./version-management.vue";
export default {
  name: "versionDetail",
  data() {
    return {
      dialogFormeditVisible: false,
      formLabelWidth: "105px",

      
      dialogVisible: false,
      dialogBind: false, //绑定弹出框
      parkingLotId:'',//停车场id
      detailId: "", //详情ID,
      detailDatas: {}, //详情数据
     
      editForm:'',//编辑回显数据
      server:'',//服务器网卡数据
    };
  },
  methods: {
    //详情数据
    getDetailData() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/version/queryVersionInfo",
          { id: this.detailId },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.detailDatas = res.data.dataArray;
          this.editForm=res.data.dataArray;
          
        })
        .catch(res => {
          console.log("err");
        });
    },
    //删除弹出框
   open2() {
      var id = this.detailId;
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
        //    this.getDetailData();
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
         
        })
        .catch(res => {
          console.log("err");
        });
    },
   
   
    //编辑保存
    saveEdit(){
        let _this = this;
        console.log(this.editForm);
       
         this.dialogFormeditVisible=false;
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
            message: res.data.errorMsg,
           
          });
          _this.getDetailData();
        })
        .catch(res => {
          console.log("err");
        });
    },
    
  },
  created() {
     this.detailId=sessionStorage.getItem('id');
    this.detailId = this.$route.params.id;
    this.getDetailData();
 
   
  }
};
</script>
<style scoped>
.el-row {
  text-align: left;
  margin-left: 18px;
  margin-top: 15px;
}
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
  margin-bottom: 10px !important;
}
.el-dialog__wrapper {
  text-align: left !important;
}
.el-input-group {
  width: 19% !important;
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
.el-input {
  float: left;
  width: 80%;
}
.el-form-item__label {
  width: 100px;
}
</style>

