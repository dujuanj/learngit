<template>
  <div class="parkingMange-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/parking-management' }">停车场管理</el-breadcrumb-item>
      <el-breadcrumb-item>停车场管理详情</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div>
      <div>
        <el-row>
          <el-button type="primary" @click="dialogFormeditVisible = true" size="small">编辑</el-button>
          <el-button type="primary" @click="open2" size="small">删除</el-button>
        </el-row>
        <!-- 基本详情 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">基本信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">停车场名称:</label>
              <span>{{detailDatas.name}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">总面积数:</label>
              <span>{{detailDatas.acreage}}</span> m²
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">车位总数:</label>
              <span>{{detailDatas.totalNum}}</span> 个
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">空闲车位数:</label>
              <span>{{detailDatas.remainingNum}}</span> 个
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">所在省:</label>
              <span>{{detailDatas.province}}</span> 
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">所在市:</label>
              <span>{{detailDatas.city}}</span> 
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">所在区:</label>
              <span>{{detailDatas.area}}</span> 
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">详细地址:</label>
              <span>{{detailDatas.street}}</span> 
            </div>
            <div class="form-inline">
              <label for="place-image" class="control-label">平面图:</label>
              <span style="display: inline-block; width: 150px; height: 120px; margin-right: 10px;">
                <img
                  :src="detailDatas.picture"
                  style="width: 100%; height: 100%;"
                >
              </span>
            </div>

            <div id="spaceType" class="form-inline">
              <label for="place-type" class="control-label">营业时段:</label>
              <span>{{detailDatas.startTime}}</span>--<span>{{detailDatas.stopTime}}</span>
            </div>
            <div class="form-inline">
              <label for="place-city" class="control-label">出入方式:</label>
              <span>{{detailDatas.isFreeAccess==1?"自由":detailDatas.isFreeAccess==0?"先预订":''}}</span>
            </div>
            <div class="form-inline">
              <label for="place-distric" class="control-label">位置:</label>
              <span>{{detailDatas.position==0?"地下":detailDatas.position==1?"地上":detailDatas.position==2?"地上+地下":""}}</span>
            </div>
            <div class="form-inline">
              <label for="ple-address" class="control-label">充电桩:</label>
              <span>{{detailDatas.isChargingPile==0?"无":detailDatas.isChargingPile==1?"有":''}}</span>
            </div>
            <div class="form-inline">
              <label for="place-subway" class="control-label">大型车:</label>
              <span>{{detailDatas.isSupportLargeVehicles==1?"支持":detailDatas.isSupportLargeVehicles==0?"不支持":''}}</span>
            </div>
            <div class="form-inline">
              <label for="place-bus" class="control-label">开放状态:</label>
              <span>{{detailDatas.openStatus==1?"开放":detailDatas.openStatus==0?"隐藏":""}}</span>
            </div>
          </div>
        </div>
        <!-- 收费信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">收费信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">白天:</label>
              <span>{{detailDatas.chargeGroup.chargeManagement[0].management}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">免费时长:</label>
              <span>{{detailDatas.chargeGroup.chargeManagement[0].freeTime}}</span> 分钟
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">价格:</label>
              <span>{{detailDatas.chargeGroup.chargeManagement[0].money}}</span> 元
            </div>
           <div class="form-inline">
              <label for="totalNum" class="control-label">晚上:</label>
              <span>{{detailDatas.chargeGroup.chargeManagement[1].management}}</span> 
            </div>
           <div class="form-inline">
              <label for="totalNum" class="control-label">免费时长:</label>
              <span>{{detailDatas.chargeGroup.chargeManagement[1].freeTime}}</span> 分钟
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">价格:</label>
              <span>{{detailDatas.chargeGroup.chargeManagement[0].money}}</span> 元
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
    <el-dialog title="编辑停车场" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">编辑停车场基本信息>>></p>
      <el-form>
        <el-form-item label="*停车场名称:" :label-width="formLabelWidth" style="color:#000">
          <el-input v-model="editForm.name" placeholder></el-input>
        </el-form-item>
        <el-form-item label="*总面积数:" :label-width="formLabelWidth" style="color:#000">
          <el-input v-model="editForm.acreage" style="width:41%"></el-input>m²
        </el-form-item>
        <el-form-item label="*省市区:" :label-width="formLabelWidth">
          <select id="province1" name="province" v-model="prov" style="height:40px;width:100px;">
            <option v-for="option in arr" :value="option.name">{{option.name }}</option>
          </select>
          
          <select id="city1" name="city" v-model="dcity" style="height:40px;width:100px">
            <option v-for="option in cityArr" :value="option.name">{{ option.name }}</option>
          </select>
          
          <select
            id="district1"
            name="area"
            v-model="ddistrict"
            style="height:40px;width:100px;"
          >
            <option v-for="option in districtArr" :value="option.name">{{ option.name }}</option>
          </select>
        </el-form-item>
        <el-form-item label="*详细地址:" :label-width="formLabelWidth" style="color:#000">
          <el-input v-model="editForm.street"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="平面图:" :label-width="formLabelWidth" style="color:#000" prop="picture">
          <el-upload
            action
            accept="image/*"
            :multiple="false"
            list-type="picture-card"
            
           
            name="uploadFile"
            
            :file-list="picList"
            :http-request="httpRequest"
            :show-file-list=true
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <!-- 营业时段 -->
        <el-form-item label="*营业时段:" :label-width="formLabelWidth" style="color:#000">
          <el-time-select
            placeholder="起始时间"
            v-model="editForm.startTime"
            :picker-options="{
      start: '06:30',
      step: '00:15',
      end: '23:30'
    }"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="editForm.stopTime"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '23:59',
      minTime: startTime
    }"
          ></el-time-select>
        </el-form-item>
        <!-- b出入方式 -->
        <el-form-item label="*出入方式:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.isFreeAccess" placeholder="选择出入方式" class="form-control">
            <option value="1">自由出入</option>
            <option value="0">先预定</option>
          </select>
        </el-form-item>
        <el-form-item label="*位置:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.position" placeholder="选择位置" class="form-control">
            <option value="1">地上</option>
            <option value="0">地下</option>
            <option value="2">地上+地下</option>
          </select>
        </el-form-item>
        <el-form-item label="*充电桩:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.isChargingPile" placeholder="选择充电桩" class="form-control">
            <option value="1">有</option>
            <option value="0">无</option>
          </select>
        </el-form-item>
        <el-form-item label="*大型车:" :label-width="formLabelWidth" style="color:#000">
          <select
            v-model="editForm.isSupportLargeVehicles"
            placeholder="选择大型车"
            class="form-control"
          >
            <option value="1">支持</option>
            <option value="0">不支持</option>
          </select>
        </el-form-item>
        <el-form-item label="*开放状态:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.openStatus" placeholder="选择开放状态" class="form-control">
            <option value="1">开放</option>
            <option value="0">隐藏</option>
          </select>
          <span>开放状态的停车场才会在平台上显示</span>
        </el-form-item>
        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">填写停车场基本信息>>></p>
        <!-- 收费时段 -->
        <!-- 白天收费时段 -->
        <el-form-item label="白天收费时段:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="editForm.chargeGroup.chargeManagement[0].management">
            <el-option value="白天 7:00-21:00">白天 7:00-21:00</el-option>
            <!-- <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="*免费时长:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[0].freeTime"
          ></el-input>分钟
        </el-form-item>
        <el-form-item label="*价格:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[0].money"
          ></el-input>元
          <select
            name
            id
            style="height: 36px;border-radius: 3px;border-color: #ccc;"
            v-model="editForm.chargeGroup.chargeManagement[0].chargeFrequency"
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
          </select>
        </el-form-item>
        <!-- 晚上收费时段 -->
        <el-form-item label="晚上收费时段:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="editForm.chargeGroup.chargeManagement[1].management">
            <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*免费时长:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[1].freeTime"
          ></el-input>分钟
        </el-form-item>
        <el-form-item label="*价格:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[1].money"
          ></el-input>元
          <select
            name
            id
            style="height: 36px;border-radius: 3px;border-color: #ccc;"
            v-model="editForm.chargeGroup.chargeManagement[1].chargeFrequency"
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
          </select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()" @close="dialogFormeditVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data"; //TextToCode数字转成汉字
import parkingManagement from "./parking-management.vue";
export default {
  name: "parkingmanageDetail",
  components: {
    parkingManagement
  },
  
  data() {
    return {
      dialogFormeditVisible: false,
      formLabelWidth: "100px",
      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      imgurlbase: "", //图片base64位码
      //回显的图片
      picList: [],
      dialogVisible: false,
      startTime: "",
      endTime: "",
      value: "",
      detailId:'',
      detailDatas:{},
      editForm:{},
      //省市区
      arr: this.GLOBAL.arrAll,
      prov: "",
      dcity: "",
      ddistrict: "",
      citys: "",
      districtDatas: "",
      cityArr: [],
      districtArr: [],
      
    };
  },
  methods: {
    //删除弹出框
   open2(event) {
      var id=this.detailId;
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      
        .then(() => {
          this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/deleteParkingLot",
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
           this.handleUserList(1)
        })
        .catch(res => {
          console.log("err");
        });
         
        })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除"
        //   });
        // });
    },
    getDetailData(){
       this.picList=[]; //回显的图片
       this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/parkingLotInfo",
          {
            id:this.detailId
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
        
          this.detailDatas=res.data.dataArray;
          this.editForm=res.data.dataArray;
          var obj=new Object();
          obj.url=res.data.dataArray.picture;
          this.picList.push(obj);;
          console.log(this.picList);
          this.prov=res.data.dataArray.province;
          this.dcity=res.data.dataArray.city;
          this.ddistrict=res.data.dataArray.area;
        })
        .catch(res => {
          console.log("err");
        });

    },
    updateCity: function() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        };
      
      }
     
    },
     updateDistrict: function() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.dcity) {
          this.districtArr = obj.sub;
          break;
        };
        
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        //this.ddistrict = this.districtArr[1].name;
      
      } else {
        this.ddistrict = "";
      
      }
    },
    //图片上传
     imgAdd(imgUrl) {
      this.imgurlbase = imgUrl;

      var a;
      $.ajax({
        type: "POST",
        url: this.GLOBAL.imgUrl + "/air-api/space/upPic",
        data: { uploadFile: imgUrl },
        dataType: "json",
        async: false,
        success: function(data) {
          console.log(data);
          a = data.dataArray;

          return a;
        },
        error: function(json) {
          console.log(json);
        }
      });

      console.log(a);
     
      this.editForm.picture=a;
    
    },
     //图片上传转流
    httpRequest(file) {
      //alert(999);

      console.log(file.file);

      var reader = new FileReader();
      reader.readAsDataURL(file.file);
  
      reader.onload = e => {
        var imgurlbase = e.target.result.split(",");
        imgurlbase.shift();
        imgurlbase = imgurlbase.toString();
        console.log(imgurlbase);
        this.imgAdd(imgurlbase);
      };
    },
     //编辑保存
    saveEdit(){
        
        console.log(this.editForm);
        //this.editForm.picture=this.picture;
        this.editForm.createUser=1;
         this.editForm.province=this.prov;
        this.editForm.city=this.dcity;
        this.editForm.area=this.ddistrict;
         this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/saveOrUpdateParkingLot",
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
            this.dialogFormeditVisible=false;
          this.getDetailData();
        })
        .catch(res => {
          console.log("err");
        });
    },
   
  },
  created(){
     this.detailId=sessionStorage.getItem('id');
    this.detailId=this.$route.params.id;
    console.log(this.detailId);
    this.getDetailData();
  },
   beforeMount: function() {
    this.updateCity();
    this.updateDistrict();
  },
  watch: {
    prov: function() {
      this.updateCity();
      this.updateDistrict();
    },
    dcity: function() {
      this.updateDistrict();
    },
    // province:function(){
    //     this.updateCity();
    //     this.updateDistrict();
    // },
     city: function() {
      this.updateDistrict();
    },
    
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

