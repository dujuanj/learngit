<template>
  <div class="feedback">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>意见反馈管理 </el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <!-- <el-input placeholder="输入网关名称或编号查询" class="input-with-select" v-model="name">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input> -->
        <select class="myselect" v-model="feedbackPath" @change="handleUserList(1)">
          <option value>选择反馈途径(全部)</option>
          <option value="HISS停车APP">HISS停车APP</option>
          <option value="其它">其它</option>
        </select>
         <select v-model="feedbackType" @change="handleUserList(1)" class="myselect">
          <option value>选择反馈类型(全部)</option>
          <option value="APP建议">APP建议</option>
           <option value="地锁故障">地锁故障</option>
            <option value="产品建议">产品建议</option>
          
        </select>
       
       
       

        <el-button type="info" size="small" @click="reset">重置</el-button>
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
              <th>反馈途径</th>
              <th>反馈内容</th>
              <th>联系方式</th>
              <th>反馈时间</th>
              

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.feed_back_path}}</td>
              <td>{{item.content}}</td>
              <td>{{item.contact}}</td>

           

              <td style="width:15%">{{item.create_time}}</td>

              <td style="width:18%">
                <el-button size="mini" @click="getDescribe($event)" :detail-id="item.id">详情</el-button>
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
   
   
   
   
  </div>
</template>

<script>
export default {
  name: "feedback",
  data() {
    return {
      //筛选
      feedbackType: "",
      feedbackPath: "",
      

      // 分页数据
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      tableData:'',
      formLabelWidth: "100px",
    
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
          this.GLOBAL.xgurl + "/park-api/park/feedback/listFeedBack",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            feedbackPath:this.feedbackPath,
            feedbackType:this.feedbackType
           
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data);
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
      this.feedbackType='';
      this.feedbackPath='';
    },

 
   //详情
    getDescribe(event) {
      var id = $(event.currentTarget).attr("detail-id");
       sessionStorage.setItem('id',id);
      this.$router.push({
        name: "feedbackDetail",
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
