<template>
  <div class="parkingposition-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/parking-position' }">车位管理</el-breadcrumb-item>
      <el-breadcrumb-item>车位管理详情</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div>
      <div>
        <el-row>
          <el-button type="primary" @click="handleEdit($event)" size="small">编辑</el-button>
          <el-button type="primary" @click="open2" size="small">删除</el-button>
        </el-row>
        <!-- 车位信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">车位信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">所属停车场:</label>
              <span>{{detailDatas.parkingLotName}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">车位编号:</label>
              <span>{{detailDatas.number}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">充电桩:</label>
              <span>{{detailDatas.isChargingPile==1?"有":detailDatas.isChargingPile==0?"无":''}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">开放状态:</label>
              <span>{{detailDatas.openStatus==1?"开放":detailDatas.openStatus==0?"隐藏":''}}</span>
            </div>
          </div>
        </div>
        <!-- 业主信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">业主信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">是否绑定业主:</label>
              <span>{{detailDatas.isBindUser==1?"绑定":detailDatas.isBindUser==0?"未绑定":''}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">业主姓名:</label>
              <span>{{detailDatas.userParkingSpace.userName}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">业主手机号:</label>
              <span>{{detailDatas.userParkingSpace.phone}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">有效期限:</label>
              <span>{{detailDatas.userParkingSpace.startTime | formatTime('YMD')}} -- {{detailDatas.userParkingSpace.endTime | formatTime('YMD')}}</span>
            </div>
          </div>
        </div>
        <!-- 共享信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">共享信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">是否共享:</label>
              <span>{{detailDatas.shareType==1?"已共享":detailDatas.shareType==0?"未共享":''}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">共享时段:</label>
              <!-- <span>{{detailDatas.shareParkingSpace.startTime}} -- {{detailDatas.shareParkingSpace.endTime}}</span>  -->
              <span>{{detailDatas.shareParkingSpace==null?"":detailDatas.shareParkingSpace.startTime}}</span> --
              <span>{{detailDatas.shareParkingSpace==null?"":detailDatas.shareParkingSpace.endTime}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">重复周期:</label>
              <span>{{detailDatas.repeatCycle}}</span>
            </div>
          </div>
        </div>
        <!-- 状态信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">状态信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">当前状态:</label>
              <span>{{detailDatas.useStatus==1?"已占用":detailDatas.useStatus==0?"未占用":''}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">预订手机号:</label>
              <span></span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">预订时间:</label>
              <span></span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">停车时长:</label>
              <span></span>
            </div>
          </div>
        </div>
        <!-- 地锁信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">地锁信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">是否绑定地锁:</label>
              <span>{{detailDatas.isBindLock==1?"已绑定":detailDatas.isBindLock==0?"未绑定":''}}</span>
            </div>
            <div class="form-inline" v-if='detailDatas.isBindLock==1'>
              <label for="area" class="control-label">设备编号:</label>
              <span>{{detailDatas.parkingLockName}}</span>
              <!-- <span v-if="detailDatas.isBindLock==0">
                <a
                  href="javascript:;"
                  style="margin-left:20px;"
                  :parkingLockId="detailDatas.parkingLockId"
                  :id='detailDatas.id'
                   @click="bind($event)"
                >绑定</a>
              </span> -->
              <span >
                <a href="javascript:;" style="margin-left:20px;"  :parkingLockId="detailDatas.parkingLockId"
                  :id='detailDatas.id'  @click="unbind($event)">解绑</a>
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
              <span>{{detailDatas.createUser}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">账号:</label>
              <span>{{detailDatas.createLoginName}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">创建日期:</label>
              <span>{{detailDatas.createTime | formatTime('YMDHMS')}}</span>
              <!-- <span>{{new Date(parseInt(detailDatas.createTime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ')}}</span> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 编辑弹出框 -->
   <el-dialog title="编辑车位" :visible.sync="dialogFormeditVisible" width="35%" id="add">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">填写车位信息>>></p>
      <el-form :model="editForm"  :rules="rules">
        <el-form-item label="*所属停车场:" :label-width="formLabelWidth" style="color:#000" >
          <select @change="handleUserList(1)" class="myselect" v-model="editForm.parkingLotId">
            <option value>选择所属停车场(全部)</option>
            <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
          </select>
        </el-form-item>
        <el-form-item label="*车位编号:" :label-width="formLabelWidth" style="color:#000" >
          <el-input autocomplete="off" style="width:43%" v-model="editForm.number" placeholder="输入车位编号"></el-input>
          <br>
          <span>参考样式：A-001，字母代表所在区域，数字代表车位编号</span>
        </el-form-item>

        <el-form-item label="*充电桩:" :label-width="formLabelWidth" style="color:#000" >
          <select v-model="editForm.isChargingPile" class="myselect">
            <option value="">选择充电桩</option>
            <option value="1">有</option>
            <option value="0">无</option>
          </select>
        </el-form-item>
        <el-form-item label="*开放状态:" :label-width="formLabelWidth" style="color:#000" >
          <select v-model="editForm.openStatus"  class="myselect">
            <option value="">选择开放状态</option>
            <option value="1">开放</option>
            <option value="0">隐藏</option>
          </select>
          <br>
          <span>开放状态的停车场才会在平台上显示</span>
        </el-form-item>
        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">编辑写业主信息 >>></p>

        <el-form-item label="*绑定业主:" :label-width="formLabelWidth" style="color:#000" >
          <select v-model="editForm.isBindUser"  class="myselect">
            <option value="">选择是否绑定业主</option>
            <option value="1">绑定</option>
            <option value="0">不绑定</option>
          </select>
        </el-form-item>
        <el-form-item label="*业主姓名:" :label-width="formLabelWidth" style="color:#000" >
          <el-input autocomplete="off" style="width:43%" v-model="editForm.userName" placeholder="输入业主姓名"></el-input>
        </el-form-item>
        <el-form-item label="*业主手机号:" :label-width="formLabelWidth" style="color:#000" >
          <el-input autocomplete="off" style="width:43%" v-model="editForm.phone" placeholder="输入业主手机号"></el-input>
        </el-form-item>
        <el-form-item label="*有效期限:" :label-width="formLabelWidth" style="color:#000" >
          <el-date-picker
            v-model="editTime"
            type="daterange"
            align="right"
            unlink-panels
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormeditVisible = false">取 消</el-button>
        <el-button type="primary"  @click="saveEdit()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data"; //TextToCode数字转成汉字
import parkingPosition from "./parking-position.vue";
export default {
  name: "parkingpositionDetail",
  data() {
    return {
      dialogFormeditVisible: false,
      formLabelWidth: "105px",

      dialogVisible: false,
      startTime: "",
      endTime: "",
     
      detailId: "",
      //详情数据
      detailDatas: "",
      //编辑数据
      editForm: {},
      //查询所有停车场
      queryParkingLotdata: "",
      //开始至结束日期
       editTime:[],
    };
  },
  methods: {
    //详情页数据
    getDetail() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingSpace/parkingSpaceInfo",
          {
            id: this.detailId
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.detailDatas = res.data.dataArray;
          //this.editForm=res.data.dataArray;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //删除弹出框
    open2() {
      var id=this.detailId;
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }) .then(() => {
        this.$http
      .post(
        this.GLOBAL.xgurl + "/park-api/park/parkingSpace/deleteParkingSpace",
        {
          id:id
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
          message: res.data.errorMsg,
        });
         this.handleUserList(this.currentPage)
      })
      .catch(res => {
        console.log("err");
      });
      })
    },
     //解绑
    unbind(event) {
      alert(111);
       var id = $(event.currentTarget).attr("id");
       var parkingLockId= $(event.parkingLockId).attr("parkingLockId");
      this.$confirm('确定要删除与停车场的绑定吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(()=>{
           this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingSpace/bindParkingLock",
          { id:id, parkingLockId: parkingLockId, isBindLock: 0 },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          this.getDetailData();
          console.log(res.data.errorMsg);
          this.$message({
            message: res.data.errorMsg
          });
        
        })
        .catch(res => {
          console.log("err");
        });
      })
    

     
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
     //编辑回显数据
    handleEdit(event) {
      this.dialogFormeditVisible=true;
      var id=this.detailId;
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingSpace/findParkingSpace",
          {id:id},
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.editForm = res.data.dataArray;
          this.editTime=[];
          this.editTime.push(new Date(res.data.dataArray.userParkingSpace.startTime));
          this.editTime.push(new Date(res.data.dataArray.userParkingSpace.endTime));
         
        })
        .catch(res => {
          console.log("err");
        });
    },
     //编辑保存
    saveEdit(){
        
        console.log(this.editForm);
        this.editForm.userParkingSpace.startTime=new Date(this.editTime[0]).getTime();
         this.editForm.userParkingSpace.endTime=new Date(this.editTime[1]).getTime();
         this.dialogFormeditVisible=false;
         this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingSpace/updatePakingSpace",
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
          this.getDetail();
        })
        .catch(res => {
          console.log("err");
        });
    },
  },
  created() {
     this.detailId=sessionStorage.getItem('id');
    this.detailId = this.$route.params.id;
    console.log(this.detailId);
    this.getDetail();
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

