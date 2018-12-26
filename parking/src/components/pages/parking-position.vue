<template>
  <div class="parkingPosition">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>车位管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item> -->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入车位编号查询" class="input-with-select" v-model="number">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>
        <select v-model="parkingLotId" @change="handleUserList(1)" class="myselect">
          <option value>选择所属停车场(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>
        <select v-model="isBindUser" @change="handleUserList(1)" class="myselect">
          <option value>选择是否绑定业主</option>
          <option value="1">已绑定</option>
          <option value="0">未绑定</option>
        </select>
        <select v-model="isBindLock" @change="handleUserList(1)" class="myselect">
          <option value>选择是否绑定地锁</option>
          <option value="1">已绑定</option>
          <option value="0">未绑定</option>
        </select>
        <select v-model="shareType" @change="handleUserList(1)" class="myselect">
          <option value>选择是否共享</option>
          <option value="1">已共享</option>
          <option value="0">未共享</option>
        </select>
        <select v-model="useStatus" @change="handleUserList(1)" class="myselect">
          <option value>选择当前状态</option>
          <option value="1">已占用</option>
          <option value="0">空闲中</option>
        </select>
        <select v-model="openStatus" @change="handleUserList(1)" class="myselect">
          <option value>选择开放状态</option>
          <option value="1">开放</option>
          <option value="0">隐藏</option>
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
              <th>所属停车场</th>
              <th>车位编号</th>
              <th>是否绑定业主</th>
              <th>是否绑定地锁</th>
              <th>是否共享</th>
              <th>共享时段</th>
              <th>重复</th>
              <th>当前状态</th>
              <th>开放状态</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.name}}</td>
              <td>{{item.number}}</td>
              <td>{{item.isBindUser==1?"已绑定":item.isBindUser==0?"未绑定":''}}</td>

              <td>{{item.isBindLock==1?"已绑定":item.isBindLock==0?"未绑定":''}}</td>
              <td>{{item.shareType==1?"已共享":item.shareType==0?"未共享":''}}</td>
              <td>{{item.startTime}}--{{item.endTime}}</td>
              <td>{{item.repeatCycle}}</td>
              <td>{{item.useStatus==1?"已占用":item.useStatus==0?"空闲中":''}}</td>
              <td>{{item.openStatus==1?"开放":item.openStatus==0?"隐藏":""}}</td>

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
    <el-dialog title="添加车位" :visible.sync="dialogFormVisible" width="35%" id="add">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">填写车位信息>>></p>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="*所属停车场:" :label-width="formLabelWidth" style="color:#000" prop="parkingLotId">
          <select @change="handleUserList(1)" class="myselect" v-model="ruleForm.parkingLotId">
            <option value>选择所属停车场(全部)</option>
            <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
          </select>
        </el-form-item>
        <el-form-item label="*车位编号:" :label-width="formLabelWidth" style="color:#000" prop="number">
          <el-input autocomplete="off" style="width:43%" v-model="ruleForm.number" placeholder="输入车位编号"></el-input>
          <br>
          <span>参考样式：A-001，字母代表所在区域，数字代表车位编号</span>
        </el-form-item>

        <el-form-item label="*充电桩:" :label-width="formLabelWidth" style="color:#000" prop='isChargingPile'>
          <select v-model="ruleForm.isChargingPile" class="myselect">
            <option value="">选择充电桩</option>
            <option value="1">有</option>
            <option value="0">无</option>
          </select>
        </el-form-item>
        <el-form-item label="*开放状态:" :label-width="formLabelWidth" style="color:#000" prop='openStatus'>
          <select v-model="ruleForm.openStatus"  class="myselect">
            <option value="">选择开放状态</option>
            <option value="1">开放</option>
            <option value="0">隐藏</option>
          </select>
          <br>
          <span>开放状态的停车场才会在平台上显示</span>
        </el-form-item>
        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">填写业主信息 >>></p>

        <el-form-item label="*绑定业主:" :label-width="formLabelWidth" style="color:#000" prop='isBindUser'>
          <select v-model="ruleForm.isBindUser"  class="myselect">
            <option value="">选择是否绑定业主</option>
            <option value="1">绑定</option>
            <option value="0">不绑定</option>
          </select>
        </el-form-item>
        <el-form-item label="*业主姓名:" :label-width="formLabelWidth" style="color:#000" prop='userName'>
          <el-input autocomplete="off" style="width:43%" v-model="ruleForm.userName" placeholder="输入业主姓名"></el-input>
        </el-form-item>
        <el-form-item label="*业主手机号:" :label-width="formLabelWidth" style="color:#000" prop='phone'>
          <el-input autocomplete="off" style="width:43%" v-model="ruleForm.phone" placeholder="输入业主手机号"></el-input>
        </el-form-item>
        <el-form-item label="*有效期限:" :label-width="formLabelWidth" style="color:#000" >
          <el-date-picker
            v-model="time"
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
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

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
export default {
  name: "parkingPosition",
  data() {
    return {
      //筛选
      isBindUser: "",
      parkingLotId: "",
      isBindUser: "",
      isBindLock: "",
      shareType: "",
      useStatus: "",
      openStatus: "",
      number: "",
      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据

      formLabelWidth: "105px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormeditVisible: false,
      value7: "",
      dialogVisible: false,
      editTime:[],
      //列表数据
      tableData: "",
      //查询所有停车场
      queryParkingLotdata: "",
      //添加数据
      ruleForm: {
        parkingLotId: "",
        number: "",
        isChargingPile: "",
        openStatus: "",
        isBindUser: "",
        userName: "",
        phone: "",
        createTime: "",
        isBindLock: "",
        userParkingSpace: {
          startTime: "",
          endTime: ""
        }
      },
      //编辑数据
       editForm: {
        parkingLotId: "",
        number: "",
        isChargingPile: "",
        openStatus: "",
        isBindUser: "",
        userName: "",
        phone: "",
        createTime: "",
        isBindLock: "",
        userParkingSpace: {
          startTime: "",
          endTime: ""
        }
      },
      time:'',//添加的时间段
      //添加数据验证
      rules:{
       parkingLotId: [
          {
            required: true,
            message: "请输入停车场名称，不能为空",
            trigger: 'change'
          }
        ],
         number: [
          {
            required: true,
            message: "请输入车位编号，不能为空",
            trigger: "blur"
          }
        ],
         isChargingPile: [
          {
            required: true,
            message: "请选择充电桩，不能为空",
           trigger: 'change'
          }
        ],
         openStatus: [
          {
            required: true,
            message: "请选择开放状态，不能为空",
           trigger: 'change'
          }
        ],
         isBindUser: [
          {
            required: true,
            message: "请选择绑定业主，不能为空",
            trigger: "change"
          }
        ],
         userName: [
          {
            required: true,
            message: "请输入业主姓名，不能为空",
            trigger: "blur"
          }
        ],
          phone: [
          {
            required: true,
            message: "请输入业主手机号，不能为空",
            trigger: "blur"
          }
        ],
          time: [
          {
            required: true,
            message: "请输入有效期限，不能为空",
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
    //列表数据
    handleUserList(currentpage) {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingSpace/queryParkingSpaces",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            openStatus: this.openStatus,
            parkingLotId: this.parkingLotId,
            isBindUser: this.isBindUser,
            isBindLock: this.isBindLock,
            shareType: this.shareType,
            useStatus: this.useStatus,
            number: this.number
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
    //重置
    reset() {
      (this.isBindUser = ""),
        (this.parkingLotId = ""),
        (this.isBindUser = ""),
        (this.isBindLock = ""),
        (this.shareType = ""),
        (this.useStatus = ""),
        (this.openStatus = ""),
        (this.number = "");
      this.handleUserList(1);
    },
    //添加车位
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;
          datas.createUser = 1;
          console.log(this.time);
          console.log(datas);
          datas.userParkingSpace.startTime=new Date(this.time[0]).getTime() ;
          datas.userParkingSpace.endTime=new Date(this.time[1]).getTime();
          this.$http
            .post(
              this.GLOBAL.xgurl + "/park-api/park/parkingSpace/savePakingSpace",
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
    handleChange(value) {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  //编辑回显数据
    handleEdit(event) {
      this.dialogFormeditVisible=true;
      var id=$(event.currentTarget).attr('id');
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
          this.handleUserList(this.currentPage);
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

    //删除弹出框
    open2() {
      var id=$(event.currentTarget).prev().attr('id');
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
    //详情
    getDescribe(event) {

      var id=$(event.currentTarget).attr('detail-id');
       sessionStorage.setItem('id',id);
      this.$router.push({
        name: "parkingpositionDetail",
        params: {
          id: id
        }
      });
    }
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
  width: 13% !important;
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
