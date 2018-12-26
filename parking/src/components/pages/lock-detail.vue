<template>
  <div class="lock-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/ground-lock' }">地锁管理</el-breadcrumb-item>
      <el-breadcrumb-item>地锁管理详情</el-breadcrumb-item>
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
          <div class="panel-heading">地锁信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">地锁名称:</label>
              <span>{{detailDatas.name}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">地锁编号:</label>
              <span>{{detailDatas.devEui}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">所属组:</label>
              <span>{{detailDatas.appEui}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">AppKey:</label>
              <span>{{detailDatas.appKey}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">验证码:</label>
              <span>{{detailDatas.authCode}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">CLASSC模式:</label>
              <span>{{detailDatas.isClassc==1?"是":detailDatas.isOnline==0?"不是":''}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">忽略重复包:</label>
              <span>{{detailDatas.relaxFCnt}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">ADR间隔:</label>
              <span>{{detailDatas.adrInterval}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">ADR补充:</label>
              <span>{{detailDatas.installationMargin}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">经度:</label>
              <span>{{detailDatas.latitude}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">Rx1DR:</label>
              <span>{{detailDatas.rx1dr}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">Rx2DR:</label>
              <span>{{detailDatas.rx2dr}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">RxDelay:</label>
              <span>{{detailDatas.rxdelay}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">RxWindow:</label>
              <span>{{detailDatas.rxwindows}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">节点描述:</label>
              <span>{{detailDatas.description}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">网关连接:</label>
              <span>{{}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">通讯地址:</label>
              <span>{{detailDatas.devAddress}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">车锁状态:</label>
              <span>{{}}</span>
            </div>
              <div class="form-inline">
              <label for="totalNum" class="control-label">网络状态:</label>
              <span>{{}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">电量状态:</label>
              <span>{{}}</span>
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
              <label for="area" class="control-label">绑定的车位:</label>
              <span>{{detailDatas.parkingSpaceName}}</span>
              <span v-if="detailDatas.isBindParkingLot==1">
                <a
                  href="javascript:;"
                  style="margin-left:20px;"
                  @click="unbind($event)"
                  :id="detailDatas.id"
                  :parkingLotId="detailDatas.parkingLotId"
                  :parkingLockId='detailDatas.parkingLockId'
                >解绑</a>
              </span>
              <span v-else>
                <a
                  href="javascript:;"
                  style="margin-left:20px;"
                  :id="detailDatas.id"
                  :parkingLotId="detailDatas.parkingLotId"
                   :parkingLockId='detailDatas.parkingLockId'
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
    <el-dialog title="绑定停车场" :visible.sync="dialogBind" width="30%" :before-close="handleClose">
       <select  class="myselect" v-model="parkingLotId" @change="getLot($event)">
            <option value>选择所属停车场(全部)</option>
            <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
          </select>
           <select class="myselect" v-model="parkingLockId" >
          <option value=''>选择要绑定的车位</option>
          <option :value="item.parkingSpaceId" v-for="item in positions">{{item.parkingSpaceName}}</option>
        </select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogBind = false">取 消</el-button>
        <el-button type="primary" @click='bindsure'>确 定</el-button>
      </span>
    </el-dialog>

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
  name: "lockDetail",
  data() {
    return {
      dialogFormeditVisible: false,
      formLabelWidth: "105px",

      dialogVisible: false,
      dialogBind: false, //绑定弹出框
      parkingLotId:'',//停车场id
      detailId: "", //详情ID,
      parkingLockId:'',//车位id
      detailDatas: {}, //详情数据
      positions:'',//车位列表
       //查询所有停车场
      queryParkingLotdata: "",
      editForm:''
    };
  },
  methods: {
    //详情数据
    getDetailData() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/findParkingLock",
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
       var parkingLockId = $(event.currentTarget).attr("parkingLockId");
      this.$confirm('确定要删除与停车场的绑定吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
           this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/bindOrUnbindParkingLock",
          { id: id, parkingLotId: parkingLotId, isBindParkingLot: 0 ,parkingSpaceId:parkingLockId},
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
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/bindOrUnbindParkingLock",
          { id: this.id, parkingLotId: this.parkingLotId, isBindParkingLot: 1,parkingSpaceId:this.parkingLockId },
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
     //获取车位根据停车场
   getLot(event){
   
      var id=$(event.currentTarget).val();
       this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/findParkingSpaceByParkingLotId",
          {parkingLotId:id},
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.positions = res.data.dataArray;
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

