<template>
  <div class="notice">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>系统通知</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入广告标题查询" class="input-with-select" v-model="title">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>
        <select class="myselect" v-model="usedScene" @change="handleUserList(1)">
          <option value>选择应用场景(全部)</option>
           <option value="HISS AIR APP">HISS AIR APP</option>
        </select>
        <select v-model="noticeType" @change="handleUserList(1)" class="myselect">
          <option value>选择绑通知类型</option>
          <option value="新品推荐">新品推荐</option>
          <option value="优惠活动">优惠活动</option>
          <option value="行业资讯">行业资讯</option>
        </select>
        
        <el-date-picker
        @change="searchTime"
      v-model="stime"
      type="datetimerange"
      align="right"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      value-format="timestamp"
      :default-time="['00:00:00', '23:59:00']">
      
    </el-date-picker>

        <el-button type="info" size="small" @click="reset">重置</el-button>
      </div>
      <!-- 添加删除按扭功能 -->
      <div>
        <el-row style="text-align:left;margin-top:15px;">
         

          <el-button type="primary" @click="dialogFormVisible = true" size="small">发布</el-button>
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
              <th>标题</th>
              <th>图片</th>
              <th>正文</th>
              <th>推送群体</th>
              <th>发布人</th>
              <th>发布日期</th>
              <th>跳转链接</th>
             

            
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.usedScene}}</td>
              <td>{{item.noticeType}}</td>
               <td>{{item.imageUrl}}</td>
              <td>{{item.title}}</td>
             

              <td>{{item.text}}</td>
              <td>{{item.pushGroup}}</td>
             
              <td>{{item.publishTime}}</td>
              
              <td>{{item.jumpUrl}}</td>

              
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
    <el-dialog title="发布系统通知" :visible.sync="dialogFormVisible" width="35%" id="add">
    
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <el-form-item label="应用场景:" :label-width="formLabelWidth" style="color:#000" prop="name">
           <select class="myselect" v-model="ruleForm.usedScene" >
          <option value>选择应用场景(全部)</option>
           <option value="HISS AIR APP">HISS AIR APP</option>
        </select>
        </el-form-item>
        <el-form-item
          label="通知类型:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <select v-model="ruleForm.noticeType"  class="myselect">
          <option value>选择绑通知类型</option>
          <option value="新品推荐">新品推荐</option>
          <option value="优惠活动">优惠活动</option>
          <option value="行业资讯">行业资讯</option>
        </select>
        </el-form-item>
        <el-form-item
          label="标题:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="serverId"
        >
         <el-input autocomplete="off" v-model="ruleForm.title"></el-input>
        </el-form-item>

        <el-form-item
          label="图片"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="license"
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
          label="内容:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isBindParkingLot"
        >
          <el-input type="textarea" v-model="ruleForm.text"></el-input>
        </el-form-item>
        <el-form-item
          label="跳转链接:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="parkingLotId"
        >
         <el-input v-model="ruleForm.jumpUrl"></el-input>
        </el-form-item>
        <el-form-item
          label="推送群体:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="gatewayMac"
        >
          <select v-model="ruleForm.pushGroup"  class="myselect">
          <option value>请选择绑推送群体</option>
          <option value="系统全部用户">系统全部用户</option>
          
        </select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>

   
  </div>
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: "notice",
  data() {
    return {
      //筛选
      usedScene: "",
      noticeType: "",
      startTime: "",
      endTime:'',
      title: "",
      //时间转换
      stime:'',

      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      //
      formLabelWidth: "105px",
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormeditVisible: false,
     
      dialogVisible: false,
     dialogImageUrl:'',
    
      tableData: "", //列表数据
    
      //添加数据
      ruleForm: {
        usedScene: "",
        noticeType: "",
        title: "",
        imageUrl: "",
        text: "",
        jumpUrl: "",
        pushGroup:''
      },
      
      //添加验证规则
      rules: {
        // name: [
        //   {
        //     required: true,
        //     message: "请输入网关名称，不能为空",
        //     trigger: "blur"
        //   }
        // ],
       
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
    searchTime:function(){
        console.log(this.stime);
       
        this.startTime=this.stime[0];
        this.endTime=this.stime[1];
        this.handleUserList(1);
    },
    //列表数据
    handleUserList(currentpage) {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/system/listSystemNotice",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
           usedScene:this.usedScene,
           noticeType:this.noticeType,
           startTime:this.startTime,
           endTime:this.endTime,
           title:this.title
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
        this.usedScene='',
        this.noticeType='',
        this.startTime='',
        this.title='',
        this.endTime='',
        this.stime='',
        this.handleUserList(1)
        
    },
    //发布
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;

          console.log(datas);
          this.$http
            .post(this.GLOBAL.xgurl + "/park-api/park/system/publish", datas, {
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
    //图片显示
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
      console.log(file);
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
      this.ruleForm.imageUrl = a;
     
    
    },
  },

  mounted: function() {},
  components: {},
  created() {
    this.handleUserList(this.currentPage);
  
   
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
