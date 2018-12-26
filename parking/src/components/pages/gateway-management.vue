<template>
  <div class="gateway">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>网关管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入网关名称或编号查询" class="input-with-select" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>
        <select class="myselect" v-model="parkingLotId" @change="handleUserList(1)">
          <option value>选择所属停车场(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>
        <select v-model="isBindParkingLot" @change="handleUserList(1)" class="myselect">
          <option value>选择绑定状态</option>
          <option value="1">已绑定</option>
          <option value="0">未绑定</option>
        </select>
        <select v-model="effectiveRange" @change="handleUserList(1)" class="myselect">
          <option value>选择剩余有效期</option>
          <option value="90">剩余91天以上</option>
          <option value="31-90">剩余31-90天</option>
          <option value="1-30">剩余1-30天</option>
          <option value="0">已到期</option>
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
              <th>网关名称</th>
              <th>网关编号</th>
              <th>绑定状态</th>
              <th>绑定的停车场</th>
              <th>服务器网卡</th>
              <th>授权license</th>
              <th>剩余有效期</th>
              <th>网络状态</th>
              <th>节点数量</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.name}}</td>
              <td>{{item.gatewayMac}}</td>
              <td>{{item.isBindParkingLot==1?"已绑定":item.isBindParkingLot==0?"未绑定":''}}</td>

              <td>{{item.parkingLotName}}</td>
              <td>{{item.macName}}</td>
              <td style="width:15%">{{item.license}}</td>
              <td>{{item.exprieDate}}</td>
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
    <el-dialog title="添加网关" :visible.sync="dialogFormVisible" width="35%" id="add">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">填写网关信息>>></p>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="*网关名称:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <el-input autocomplete="off" v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item
          label="*网关编号:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <el-input autocomplete="off" v-model="ruleForm.gatewayMac"></el-input>
        </el-form-item>
        <el-form-item
          label="*服务器网卡:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
          <select v-model="ruleForm.macName"  class="myselect">
            <option value="">选择服务器网卡</option>
            <option :value="item.id" v-for='item in server'>{{item.name}}</option>
            
          </select>
        </el-form-item>

        <el-form-item
          label="*授权license"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="license"
        >
          <el-input autocomplete="off" v-model="ruleForm.license"></el-input>
        </el-form-item>

        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">填写绑定信息 >>></p>

        <el-form-item
          label="*绑定停车场:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <select v-model="ruleForm.isBindParkingLot" placeholder="选择是否绑定停车场" class="myselect">
            <option value="1">绑定</option>
            <option value="0">不绑定</option>
          </select>
        </el-form-item>
        <el-form-item
          label="*选择停车场:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
          <select  class="myselect" v-model="ruleForm.parkingLotId">
            <option value>选择所属停车场(全部)</option>
            <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
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
import XLSX from 'xlsx'
export default {
  name: "gateway",
  data() {
    return {
      //筛选
      parkingLotId: "",
      isBindParkingLot: "",
      effectiveRange: "",
      isOnline: "",
      name: "",
      //查询所有停车场
      queryParkingLotdata: "",

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
      server:'',//服务器网卡数据
      //添加数据
      ruleForm: {
        name: "",
        gatewayMac: "",
        license: "",
        macName: "",
        isBindParkingLot: "",
        parkingLotId: ""
      },
      //编辑数据
      editForm: {
        id: "",
        name: "",
        gatewayMac: "",
        license: "",
        macName: "",
        isBindParkingLot: "",
        parkingLotId: ""
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
        gatewayMac: [
          {
            required: true,
            message: "请输入网关编号，不能为空",
            trigger: "blur"
          }
        ],
        macName: [
          {
            required: true,
            message: "请输入服务器网卡，不能为空",
            trigger: "change"
          }
        ],
        license: [
          {
            required: true,
            message: "请输入授权license，不能为空",
            trigger: "blur"
          }
        ],
        isBindParkingLot: [
          {
            required: true,
            message: "请选择绑定停车场，不能为空",
            trigger: "change"
          }
        ],
        parkingLotId: [
          {
            required: true,
            message: "请选择停车场，不能为空",
            trigger: "change"
          }
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
          this.GLOBAL.xgurl + "/park-api/park/gateway/quertGatewayList",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            parkingLotId: this.parkingLotId,
            isBindParkingLot: this.isBindParkingLot,
            effectiveRange: this.effectiveRange,
            isBindLock: this.isBindLock,
            isOnline: this.isOnline,
            name: this.name,
            gatewayMac: this.name
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
            .post(this.GLOBAL.xgurl + "/park-api/park/gateway/addGateway", datas, {
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
          this.GLOBAL.xgurl + "/park-api/park/gateway/findGateway",
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
        name: "gatewayDetail",
        params: {
          id: id
        }
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

  mounted: function() {},
  components: {},
  created() {
    this.handleUserList(this.currentPage);
    this.queryParkingSpace();
    this. findAllServer();
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
