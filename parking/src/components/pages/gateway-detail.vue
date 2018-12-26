<template>
  <div class="gateway-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/gateway' }">网关管理</el-breadcrumb-item>
      <el-breadcrumb-item>网关管理详情</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div>
      <div>
        <el-row>
          <el-button type="primary" @click="dialogFormeditVisible = true" size="small">编辑</el-button>
          <el-button type="primary" @click="open2" size="small">删除</el-button>
        </el-row>
        <!-- 网关信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">网关信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">网关名称:</label>
              <span>{{detailDatas.name}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">网关编号:</label>
              <span>{{detailDatas.gatewayMac}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">服务器网卡:</label>
              <span>{{detailDatas.macName}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">授权license:</label>
              <span>{{detailDatas.license}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">剩余有效期:</label>
              <span>{{detailDatas.exprieDate}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">网络状态:</label>
              <span>{{detailDatas.isOnline==1?"在线":detailDatas.isOnline==0?"离线":''}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">节点数量:</label>
              <span>{{detailDatas.nodeNum}}</span>
            </div>
          </div>
        </div>
        <!-- 绑定信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">绑定信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">绑定状态:</label>
              <span>{{detailDatas.isBindParkingLot==1?"已绑定":detailDatas.isBindParkingLot==0?"未绑定":''}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">绑定的停车场:</label>
              <span>{{detailDatas.parkingLotName}}</span>
              <span v-if="detailDatas.isBindParkingLot==1">
                <a
                  href="javascript:;"
                  style="margin-left:20px;"
                  @click="unbind($event)"
                  :id="detailDatas.id"
                  :parkingLotId="detailDatas.parkingLotId"
                >解绑</a>
              </span>
              <span v-else>
                <a
                  href="javascript:;"
                  style="margin-left:20px;"
                  :id="detailDatas.id"
                  :parkingLotId="detailDatas.parkingLotId"
                  @click="bind($event)"
                >绑定</a>
              </span>
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
    <!-- 绑定弹出框 -->
    <el-dialog title="绑定停车场" :visible.sync="dialogBind" width="30%" >
       <select  class="myselect" v-model="parkingLotId">
            <option value>选择所属停车场(全部)</option>
            <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
          </select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBind = false">取 消</el-button>
        <el-button type="primary" @click='bindsure'>确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑网关" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">编辑网关信息>>></p>
      <el-form :model="editForm">
        <el-form-item label="*网关名称:" :label-width="formLabelWidth" style="color:#000">
          <el-input autocomplete="off" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="*网关编号:" :label-width="formLabelWidth" style="color:#000">
          <el-input autocomplete="off" v-model="editForm.gatewayMac"></el-input>
        </el-form-item>
         <el-form-item
          label="*服务器网卡:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
          <select v-model="editForm.macName"  class="myselect">
            <option value="">选择服务器网卡</option>
            <option :value="item.id" v-for='item in server'>{{item.name}}</option>
            
          </select>
        </el-form-item>

        <el-form-item label="*授权license" :label-width="formLabelWidth" style="color:#000">
          <el-input autocomplete="off" v-model="editForm.license"></el-input>
        </el-form-item>

        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">编辑绑定信息 >>></p>

        <el-form-item label="*绑定停车场:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.isBindParkingLot" placeholder="选择是否绑定停车场" class="myselect">
            <option value="1">绑定</option>
            <option value="0">不绑定</option>
          </select>
        </el-form-item>
        <el-form-item label="*选择停车场:" :label-width="formLabelWidth" style="color:#000">
          <select @change="handleUserList(1)" class="myselect" v-model="editForm.parkingLotId">
            <option value>选择所属停车场(全部)</option>
            <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
          </select>
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
import { regionData, CodeToText, TextToCode } from "element-china-area-data"; //TextToCode数字转成汉字
import gateway from "./gateway-management.vue";
export default {
  name: "gatewayDetail",
  data() {
    return {
      dialogFormeditVisible: false,
      formLabelWidth: "105px",

      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      dialogBind: false, //绑定弹出框
      parkingLotId:'',//停车场id
      detailId: "", //详情ID,
      detailDatas: {}, //详情数据
       //查询所有停车场
      queryParkingLotdata: "",
      editForm:'',//编辑回显数据
      server:'',//服务器网卡数据
    };
  },
  methods: {
    //详情数据
    getDetailData() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/gateway/findGateway",
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
           this.getDetailData();
          })
          .catch(res => {
            console.log("err");
          });
      });
    },
    //解绑
    unbind(event) {
        var id = $(event.currentTarget).attr("id");
      var parkingLotId = $(event.currentTarget).attr("parkingLotId");
      this.$confirm('确定要删除与停车场的绑定吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
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
      })
    

     
    },
    //绑定弹出框
    bind() {
      this.id = $(event.currentTarget).attr("id");
      this.dialogBind=true;    
    },
    //绑定功能
    bindsure(){
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
    },
    //编辑保存
    saveEdit(){
        let _this = this;
        console.log(this.editForm);
       
         this.dialogFormeditVisible=false;
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
            message: res.data.errorMsg,
           
          });
          _this.getDetailData();
        })
        .catch(res => {
          console.log("err");
        });
    },
     //获取所有服务器网卡
    findAllServer(){
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
    }
  },
  created() {
     this.detailId=sessionStorage.getItem('id');
    this.detailId = this.$route.params.id;
    this.getDetailData();
    this.queryParkingSpace();
    this.findAllServer();
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

