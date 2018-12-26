<template>
  <div class="feedback-detail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/feedback-management' }">意见反馈管理 </el-breadcrumb-item>
      <el-breadcrumb-item>详情</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
    <div>
      <div>
       
        <!-- 反馈信息 -->
        <div id="space_details" class="panel panel-default">
          <div class="panel-heading">反馈信息</div>
          <div class="panel-body">
            <div class="form-inline">
              <label for="place-name" class="control-label">反馈途径:</label>
              <span>{{detailDatas.feed_back_path}}</span>
            </div>
            <div class="form-inline">
              <label for="area" class="control-label">反馈内容:</label>
              <span>{{detailDatas.content}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">联系方式:</label>
              <span>{{detailDatas.contact}}</span>
            </div>
            <div class="form-inline">
              <label for="totalNum" class="control-label">反馈时间:</label>
              <span>{{detailDatas.create_time}}</span>
            </div>
          </div>
        </div>
       
       
       
       
      
      </div>
    </div>

  
  </div>
</template>
<script>

import parkingPosition from "./feedback-management.vue";
export default {
  name: "feedbackDetail",
  data() {
    return {
     
      formLabelWidth: "105px",

      dialogVisible: false,
     
     
      detailId: "",
      //详情数据
      detailDatas: "",
      
    };
  },
  methods: {
    //详情页数据
    getDetail() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/feedback/feedBackInfo",
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
    
   
     
  },
  created() {
     this.detailId=sessionStorage.getItem('id');
    this.detailId = this.$route.params.id;
    console.log(this.detailId);
    this.getDetail();
   
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

