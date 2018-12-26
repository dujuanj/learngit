<template>
  <div class="banner">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>广告管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <!-- <el-input placeholder="输入网关名称或编号查询" class="input-with-select" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input> -->
        <select class="myselect" v-model="parkingLotId" @change="handleUserList(1)">
          <option value>选择应用场景(全部)</option>
          <option :value="item.id" v-for="item in queryParkingLotdata">{{item.name}}</option>
        </select>
         <select v-model="effectiveRange" @change="handleUserList(1)" class="myselect">
          <option value>选择应用位置(全部)</option>
          
        </select>
        <select v-model="isBindParkingLot" @change="handleUserList(1)" class="myselect">
          <option value>选择启用状态</option>
          <option value="1">启用</option>
          <option value="0">禁用</option>
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
              <th>应用场景</th>
              <th>应用位置</th>
              <th>广告性质</th>
              <th>位置序号</th>
              <th>预览</th>
              <th>开始日期</th>
              <th>结束日期</th>
              <th>广告状态</th>
              <th>启用状态</th>
              <th>跳转链接</th>
              <th>广告描述</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.Used_scene}}</td>
              <!-- 应用位置 -->
              <td>{{}}</td>
              <td>{{item.type}}</td>
                <td>{{}}</td>
              <td>{{item.view}}</td>
              <td>{{item.Start_time}}</td>
              <td style="width:15%">{{item.End_time}}</td>
              <!-- 广告状态 -->
              <td>{{}}</td>
              <td>{{item.status==1?"关闭":item.isOnline==0?"启用":item.isOnline==2?"已过期":''}}</td>
              <td>{{item.Jump_url}}</td>
              <td>{{item.content}}</td>
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
    <el-dialog title="添加广告" :visible.sync="dialogFormVisible" width="35%" id="add">
     
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="应用场景:" :label-width="formLabelWidth" style="color:#000" >
          <select v-model="ruleForm.usedScene"  class="myselect">
            <option value="">选择应用场景(全部)</option>
            <option value="HISS停车APP">HISS停车APP</option>
            
          </select>
        </el-form-item>
        <el-form-item
          label="应用位置:"
          :label-width="formLabelWidth"
          style="color:#000"
       
        >
          <select v-model="ruleForm.serverId"  class="myselect">
            <option value="">选择应用位置(全部)</option>
            <option value="APP启动页">APP启动页</option>
            <option value="APP首页轮播">APP首页轮播</option>
            
          </select>
        </el-form-item>
        <el-form-item
          label="广告性质:"
          :label-width="formLabelWidth"
          style="color:#000"
        
        >
          <select v-model="ruleForm.type"  class="myselect">
            <option value="">选择广告性质</option>
            <option value="默认">默认</option>
            <option value="活动">活动</option>
            
          </select>
        </el-form-item>

        <el-form-item
          label="位置序号"
          :label-width="formLabelWidth"
          style="color:#000"
          
        >
          <el-input autocomplete="off" v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item
          label="广告图片:"
          :label-width="formLabelWidth"
          style="color:#000"
         
        >
          <el-upload
            action
            accept="image/*"
            :multiple="true"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
           
            name="uploadFile"
            
            :http-request="httpRequest"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <el-form-item
          label="有效期限:"
          :label-width="formLabelWidth"
          style="color:#000"
         
        >
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
         <el-form-item
          label="启用状态:"
          :label-width="formLabelWidth"
          style="color:#000"
       
        >
          <select v-model="ruleForm.status"  class="myselect">
            <option value="">选择启用状态</option>
            <option value="1">启用</option>
            <option value="0">禁用</option>
            
          </select>
        </el-form-item>
          <el-form-item
          label="跳转链接"
          :label-width="formLabelWidth"
          style="color:#000"
        
        >
          <el-input autocomplete="off" v-model="ruleForm.jump_url"></el-input>
        </el-form-item>
         <el-form-item
          label="广告描述"
          :label-width="formLabelWidth"
          style="color:#000"
          
        >
          <el-input autocomplete="off" v-model="ruleForm.content"></el-input>
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
        <el-form-item label="*服务器网卡:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="editForm.serverId" placeholder="选择服务器网卡">
            <el-option value="有">有</el-option>
            <el-option value="无">无</el-option>
          </el-select>
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
  name: "banner",
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

      editTime:'',//开始结束日期
      tableData: "", //列表数据
      //添加数据
      ruleForm: {
        number: "",
        status: "",
        usedScene: "",
        content: "",
        start_time: "",
        end_time: "",
        jump_url:'',
        view:'',
      },
      //编辑数据
      editForm: {
        id: "",
        name: "",
        gatewayMac: "",
        license: "",
        serverId: "",
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
        serverId: [
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
          this.GLOBAL.xgurl + "/park-api/park/advertising/listBannerManager",
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
          datas.start_time=new Date(this.editTime[0]).getTime();
           datas.end_time=new Date(this.editTime[1]).getTime();
          console.log(datas);
          this.$http
            .post(this.GLOBAL.xgurl + "/park-api/park/advertising/addBanner", datas, {
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


    handleChange(value) {
      console.log(value);
      console.log(value.length);
      var len = value.length;

      for (var i = 0; i < len; i++) {
        this.cityOptions.push(CodeToText[value[i]]);
      }
      console.log(this.cityOptions); // ["北京市", "市辖区", "朝阳区", __ob__: Observer]
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
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
      this.$router.push({
        name: "gatewayDetail",
        params: {
          id: id
        }
      });
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
      this.ruleForm.view = a;
      this.editForm.view=a;
    
    },
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
