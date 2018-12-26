<template>
  <div class="appuser-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/appuser-management' }">App用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>App用户详情</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div>
      <div>
        <!-- <el-row>
          <el-button type="primary" @click="dialogFormeditVisible = true" size="small">编辑</el-button>
          <el-button type="primary" @click="open2" size="small">删除</el-button>
        </el-row>-->
        <!-- 用户信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">用户信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">手机号:</label>
              <span>{{detailDatas.phoneNo}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">昵称:</label>
              <span>{{detailDatas.nickName}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">绑定微信:</label>
              <span>{{}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">状态</label>
              <span>{{detailDatas.enable==1?"启用":detailDatas.enable==0?'禁用':''}}</span>
            </div>
          </div>
        </div>
        <!-- 基本信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">基本信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="totalNum" class="control-label">性别</label>
              <span>{{detailDatas.sex}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">生日</label>
              <span>{{detailDatas.birthday}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">学历</label>
              <span>{{detailDatas.education}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">所在地区</label>
              <span>{{detailDatas.street}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">婚姻状况</label>
              <span>{{detailDatas.maritalStatus}}</span>
            </div>
          </div>
        </div>

        <!-- 会员信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">会员信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">会员等级:</label>
              <span>{{detailDatas.grade}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">消费金额:</label>
              <span>{{}}</span>
            </div>
          </div>
        </div>
        <!-- H币信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">H币信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">历史获取:</label>
              <span>{{}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">历史消费:</label>
              <span>{{}}</span>
            </div>
              <div class="form-inline">
              <label for="area" class="control-label">当前可用:</label>
              <span>{{}}</span>
            </div>
          </div>
        </div>
        <!-- 车位信息 -->
         <div id="space_details" class="panel panel-default">
          <div class="panel-heading">车位信息</div>
          <div class="panel-body">
              <!-- 多个循环得到 -->
            <div class="form-inline">
              <label for="place-name" class="control-label">所属停车场:</label>
              <span>{{}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">停车位:</label>
              <span>{{}}</span>
            </div>
            
          </div>
        </div>
        <!-- 车辆信息 -->
         <div id="space_details" class="panel panel-default">
          <div class="panel-heading">车辆信息</div>
          <div class="panel-body">
              <!-- 多个循环得到 -->
            <div class="form-inline">
              <label for="place-name" class="control-label">车辆类型:</label>
              <span>{{}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">车牌号:</label>
              <span>{{}}</span>
            </div>
            
          </div>
        </div>
        <!-- 余额信息 -->
         <div id="space_details" class="panel panel-default">
          <div class="panel-heading">余额信息</div>
          <div class="panel-body">
              <!-- 多个循环得到 -->
            <div class="form-inline">
              <label for="place-name" class="control-label">账户余额:</label>
              <span>{{detailDatas.balance}}</span>
            </div>
           
            
          </div>
        </div>
        <!-- 优惠券信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">优惠券信息</div>
          <div class="panel-body">
              <!-- 多个循环得到 -->
            <div class="form-inline">
              <label for="place-name" class="control-label">优惠券:</label>
              <span>{{}}</span>
            </div>
           
            
          </div>
        </div>
      </div>
    </div>
   

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑网关" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">编辑网关信息>>></p>
      <el-form>
        <el-form-item label="*网关名称:" :label-width="formLabelWidth" style="color:#000">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*网关编号:" :label-width="formLabelWidth" style="color:#000">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="*服务器网卡:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="value" placeholder="选择服务器网卡">
            <el-option value="有">有</el-option>
            <el-option value="无">无</el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="*授权license" :label-width="formLabelWidth" style="color:#000">
          <el-input autocomplete="off"></el-input>
        </el-form-item>

        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">编辑绑定信息 >>></p>

        <el-form-item label="*绑定停车场:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="value" placeholder="选择是否绑定停车场">
            <el-option value="绑定">绑定</el-option>
            <el-option value="不绑定">不绑定</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*选择停车场:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="value" placeholder="选择要绑定的停车场">
            <el-option value="绑定">停车场1</el-option>
            <el-option value="不绑定">停车场2</el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormeditVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data"; //TextToCode数字转成汉字
import gateway from "./gateway-management.vue";
export default {
  name: "appuserDetail",
  data() {
    return {
      dialogFormeditVisible: false,
      formLabelWidth: "105px",

      //上传图片
    
      dialogVisible: false,
     
      parkingLotId: "", //停车场id
      detailId: "", //详情ID,
      detailDatas: {}, //详情数据
      //查询所有停车场
      queryParkingLotdata: ""
    };
  },
  methods: {
    //详情数据
    getDetailData() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/user/userInfo",
          { userId: this.detailId },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.detailDatas = res.data.dataArray;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //删除弹出框
    open2() {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //解绑
    unbind(event) {
      var id = $(event.currentTarget).attr("id");
      var parkingLotId = $(event.currentTarget).attr("parkingLotId");
      this.$confirm("确定要删除与停车场的绑定吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http
          .post(
            this.GLOBAL.xgurl + "/park-api/park/gateway/bindOrUnBindParkingLot",
            { id: id, parkingLotId: parkingLotId, isBindParkingLot: 0 },
            {
              headers: {
                "Content-Type": "application/json;charset=UTF-8"
              }
            }
          )
          .then(res => {
            this.getDetailData();
            console.log(res.data.dataArray);
            this.$message({
              message: res.data.errorMsg
            });
          })
          .catch(res => {
            console.log("err");
          });
      });
    },
    //绑定弹出框
    bind() {
      this.id = $(event.currentTarget).attr("id");
      this.dialogBind = true;
    },
    //绑定功能
    bindsure() {
      this.dialogBind = false;
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/gateway/bindOrUnBindParkingLot",
          { id: this.id, parkingLotId: this.parkingLotId, isBindParkingLot: 1 },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          this.getDetailData();
          console.log(res.data.dataArray);
          this.$message({
            message: res.data.errorMsg
          });
        })
        .catch(res => {
          console.log("err");
        });
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
    }
  },
  created() {
     this.detailId=sessionStorage.getItem('id');
    this.detailId = this.$route.params.id;
    this.getDetailData();
    this.queryParkingSpace();
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

