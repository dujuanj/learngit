<template>
  <div class="lock">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item >地锁管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入地锁名称或编号查询" class="input-with-select" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>
        <select class="myselect" v-model="parkingLotId" @change="handleUserList(1)">
          <option value>选择绑定的停车场(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>
        <select v-model="isBindParkingLot" @change="handleUserList(1)" class="myselect">
          <option value>选择绑定状态</option>
          <option value="1">已绑定</option>
          <option value="0">未绑定</option>
        </select>
        <select v-model="isBindParkingLot" @change="handleUserList(1)" class="myselect">
          <option value>选择是否连接网关(全部)</option>
          <option value="1">已联接</option>
          <option value="0">未联接</option>
        </select>
         <select v-model="isBindParkingLot" @change="handleUserList(1)" class="myselect">
          <option value>选择车锁状态</option>
          <option value="1">直立</option>
          <option value="0">水平</option>
           <option value="0">斜立</option>
        </select>
        <select
          v-model="isOnline"
          placeholder="选择网络状态"
          @change="handleUserList(1)"
          class="myselect"
        >
          <option value>选择网络状态</option>
          <option value="1">在线</option>
          <option value="0">离线</option>
        </select>
         <select
          v-model="isOnline"
        
          @change="handleUserList(1)"
          class="myselect"
        >
          <option value>选择电量状态</option>
          <option value="1">51%以上</option>
          <option value="0">21%-50%</option>
            <option value="0">11%-20%</option>
             <option value="0">小于10%</option>
        </select>
        <el-button type="info" size="small" @click="reset">重置</el-button>
      </div>
      <!-- 添加删除按扭功能 -->
      <div>
        <el-row style="text-align:left;margin-top:15px;">
          <el-upload
            style="display: inline; margin-left: 10px;margin-right: 10px;"
            action="#"
            ref="fileupload"
            :show-file-list="false"
         
            :before-upload="beforeUpload"
          >
            <el-button size="small" type="primary">上传文件
              <i class="el-icon-upload el-icon--right"></i>
            </el-button>
          </el-upload>

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
              <th>地锁名称</th>
              <th>地锁编号</th>
              <th>绑定状态</th>
              <th>绑定的停车场</th>
              <th>绑定的车位</th>
              <th>网关连接</th>
              <th>通讯地址</th>
              <th>所属组</th>
              <th>车锁状态</th>
              <th>网络状态</th>
               <th>电量状态</th>
              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.name}}</td>
              <td>{{item.devEui}}</td>
              <td>{{item.isBindParkingSpace==1?"已绑定":item.isBindParkingLot==0?"未绑定":''}}</td>

              <td>{{item.parkingLotName}}</td>
              <td>{{item.parkingSpaceNumber}}</td>
              <td>{{item.devAddress}}</td>
              <td>{{item.exprieDate}}</td>
              <td>{{item.appEui}}</td>
              <td></td>
              <td>{{item.isOnline==1?"在线":item.isOnline==0?"离线":''}}</td>
              <td>{{item.nodeNum}}</td>
             
             
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
    <el-dialog title="添加地锁" :visible.sync="dialogFormVisible" width="35%" id="add">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">填写地锁信息>>></p>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="地锁名称:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <el-input autocomplete="off" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="地锁编号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <el-input autocomplete="off" v-model="ruleForm.devEui"></el-input>
        </el-form-item>
        <el-form-item
          label="*所属组:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
          <select v-model="ruleForm.appEui"  class="myselect">
            <option value="">选择所属组</option>
            <option :value="item.id" v-for='item in groups'>{{item.name}}</option>
          </select>
        </el-form-item>

        <el-form-item
          label="AppKey"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="license"
        >
          <el-input autocomplete="off" v-model="ruleForm.appKey"></el-input>
        </el-form-item>

      

        <el-form-item
          label="*验证码:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.authCode"></el-input>
        </el-form-item>
        <el-form-item
          label="CLASSC模式:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select @change="handleUserList(1)" class="myselect" v-model="ruleForm.isClassc">
            <option value="false">否</option>
            <option value="true">是</option>
            
          </select>
        </el-form-item>
        <el-form-item
          label="忽略重复包:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select @change="handleUserList(1)" class="myselect" v-model="ruleForm.relaxFCnt">
           
            <option value="true">是</option>
            <option value="false">否</option>
          </select>
        </el-form-item>
          <el-form-item
          label="ADR间隔:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.adrInterval"></el-input>
        </el-form-item>
         <el-form-item
          label="ADR补充:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.installationMargin"></el-input>
        </el-form-item>
          <el-form-item
          label="经度:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.latitude"></el-input>
        </el-form-item>
         <el-form-item
          label="纬度:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.longitude"></el-input>
        </el-form-item>
        <el-form-item
          label="Rx1drOffset:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.Rx1drOffset"></el-input>
        </el-form-item>
         <el-form-item
          label="Rx2DR:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.rx2dr"></el-input>
        </el-form-item>
         <el-form-item
          label="RxDelay:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.rxdelay"></el-input>
        </el-form-item>
          <el-form-item
          label="RxWindow:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select  class="myselect" v-model="ruleForm.rxwindows">
           
            <option value="rx1">rx1</option>
            <option value="rx2">rx2</option>
          </select>
        </el-form-item>
         <el-form-item
          label="节点描述:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <p>填写绑定信息 >></p>
       
          <el-form-item
          label="绑定车位:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select  class="myselect" v-model="ruleForm.isBindParkingLock">
            <option value=''>选择是否绑定车位</option>
            <option value="1">绑定</option>
            <option value="0">不绑定</option>
          </select>
        </el-form-item>
         <el-form-item
          label="选择停车场:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select class="myselect" v-model="ruleForm.parkingLotId" @change="getLot($event)">
          <option value>选择绑定的停车场(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>
        </el-form-item>
         <el-form-item
          label="选择车位:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select class="myselect" v-model="ruleForm.parkingSpaceId" >
          <option value=''>选择要绑定的车位</option>
          <option :value="item.parkingSpaceId" v-for="item in positions">{{item.parkingSpaceName}}</option>
        </select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑地锁" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">编辑地锁信息>>></p>
       <el-form :model="editForm">
        <el-form-item label="地锁名称:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <el-input autocomplete="off" v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="地锁编号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <el-input autocomplete="off" v-model="editForm.devEui"></el-input>
        </el-form-item>
        <el-form-item
          label="*所属组:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
          <select v-model="editForm.appEui"  class="myselect">
            <option value="">选择所属组</option>
            <option :value="item.id" v-for='item in groups'>{{item.name}}</option>
          </select>
        </el-form-item>

        <el-form-item
          label="AppKey"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="license"
        >
          <el-input autocomplete="off" v-model="editForm.appKey"></el-input>
        </el-form-item>

      

        <el-form-item
          label="*验证码:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.authCode"></el-input>
        </el-form-item>
        <el-form-item
          label="CLASSC模式:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select @change="handleUserList(1)" class="myselect" v-model="editForm.isClassc">
            <option value>选择是否为*CLASSC模式</option>
            <option value="true">是</option>
            <option value="false">否</option>
          </select>
        </el-form-item>
        <el-form-item
          label="忽略重复包:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select @change="handleUserList(1)" class="myselect" v-model="editForm.relaxFCnt">
            
            <option value="true">是</option>
            <option value="false">否</option>
          </select>
        </el-form-item>
          <el-form-item
          label="ADR间隔:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.adrInterval"></el-input>
        </el-form-item>
         <el-form-item
          label="ADR补充:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.installationMargin"></el-input>
        </el-form-item>
          <el-form-item
          label="经度:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.latitude"></el-input>
        </el-form-item>
         <el-form-item
          label="纬度:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.longitude"></el-input>
        </el-form-item>
        <el-form-item
          label="Rx1drOffset:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.Rx1drOffset"></el-input>
        </el-form-item>
         <el-form-item
          label="Rx2DR:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.rx2dr"></el-input>
        </el-form-item>
         <el-form-item
          label="RxDelay:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.rxdelay"></el-input>
        </el-form-item>
          <el-form-item
          label="RxWindow:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select  class="myselect" v-model="editForm.rxwindows">
            <option value=''>选择RxWindow</option>
            <option value="rx1">rx1</option>
            <option value="rx2">rx2</option>
          </select>
        </el-form-item>
         <el-form-item
          label="节点描述:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input autocomplete="off" v-model="editForm.description"></el-input>
        </el-form-item>
        <p>填写绑定信息 >></p>
       
          <el-form-item
          label="绑定车位:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select  class="myselect" v-model="editForm.isBindParkingLock">
            <option value=''>选择是否绑定车位</option>
            <option value="1">绑定</option>
            <option value="0">不绑定</option>
          </select>
        </el-form-item>
         <el-form-item
          label="选择停车场:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select class="myselect" v-model="editForm.parkingLotId" @change="getLot($event)">
          <option value>选择绑定的停车场(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>
        </el-form-item>
         <el-form-item
          label="选择车位:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select class="myselect" v-model="editForm.parkingSpaceId" >
          <option value=''>选择要绑定的车位</option>
          <option :value="item.parkingSpaceId" v-for="item in positions">{{item.parkingSpaceName}}</option>
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
import XLSX from 'xlsx'
export default {
  name: "lock",
  data() {
    return {
      //筛选
      parkingLotId: "",
      isBindParkingLot: "",
      
      isOnline: "",
      name: "",
      //查询所有停车场
      queryParkingLotdata: "",
      //所有组
      groups:'', 
      //车位
      positions:'',
      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      //
      formLabelWidth: "120px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormeditVisible: false,
      value7: "",
      dialogVisible: false,

      currentPage1: 5,
      tableData: "", //列表数据
      //添加数据
      ruleForm: {
        name: "",
        devEui: "",
        appEui: "",
        appKey: "",
        authCode: "",
        isClassc: "false",
        latitude:'string', //经度
        longitude:'string', //纬度
        Rx1drOffset:'0',
        rx2dr:'0',
        rxdelay:'0',
        rxwindows:'rx1',
        description:'string',
        relaxFCnt:'false',
        adrInterval:'0',
        installationMargin:'0',
        isBindParkingLock:'',
        parkingLotId:'',
        parkingLockId:'',
        parkingSpaceId:'',
      },
      //编辑数据
      editForm: {
        id: "",
        name: "",
        devEui: "",
        appEui: "",
        appKey: "",
        authCode: "",
        isClassc: "",
        latitude:'',
        longitude:'',
        rx1dr:'',
        rx2dr:'',
        rxdelay:'',
        rxwindows:'',
        description:'',
        relaxFCnt:'',
        adrInterval:'',
        installationMargin:'',
        isBindParkingLock:'',
        parkingLotId:'',
        parkingLockId:'',
        parkingSpaceId:'',
      },
      //添加验证规则
      rules: {
        name: [
          {
            required: true,
            message: "请输入网关名称，不能为空",
            trigger: "blur"
          }
        ],
       
        
      
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
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/queryParkingLock",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            parkingLotId: this.parkingLotId,
            isBindParkingLot: this.isBindParkingLot,
            
            
            isOnline: this.isOnline,
            name: this.name,
            devEui: this.name
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
      (this.parkingLotId = ""),
        (this.isBindParkingLot = ""),
        (this.effectiveRange = ""),
        (this.isOnline = ""),
        (this.name = ""),
        this.handleUserList(1);
    },
    //添加网关
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;

          console.log(datas);
          this.$http
            .post(this.GLOBAL.xgurl + "/park-api/park/parkingLock/addParkingLock", datas, {
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
            this.GLOBAL.xgurl + "/park-api/park/parkingLock/deleteParkingLock",
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
       var formdata = new FormData();//创建一个表单
       formdata.append("fileUrl",file);
       formdata.append("className",'TGateway'); 
     let _this = this;
      //调用接口传文件
           _this.$http
          .post(
            _this.GLOBAL.xgurl + "/park-api/park/file/upload",
            formdata,
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
   
  },


    //编辑回显数据
    handleEdit(event) {
      this.dialogFormeditVisible = true;
      var id = $(event.currentTarget).attr("id");
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/findParkingLock",
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
     //编辑保存
    saveEdit(){
        
        console.log(this.editForm);
        //this.editForm.picture=this.picture;
        //this.editForm.createUser=1;
         this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/addParkingLock",
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
        })
        .catch(res => {
          console.log("err");
        });
    },

    //详情
    getDescribe(event) {
      var id = $(event.currentTarget).attr("detail-id");
      sessionStorage.setItem('id',id);
      this.$router.push({
        name: "lockDetail",
        params: {
          id: id
        }
      });
    },
    //查询所有组列表
   getGroup(){
     this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLock/findAllGroup",
       
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.groups = res.data.dataArray;
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

  mounted: function() {},
  components: {},
  created() {
    this.handleUserList(this.currentPage);
    this.queryParkingSpace();
    this.getGroup();
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
