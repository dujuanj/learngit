<template>
  <div class="home">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <div style="height:120px;">
        <ul>
          <li class="count">
            <span class="posi">2</span>
            <span class="num_style">停车场数量</span>
          </li>
          <li class="count" style="background:#67c23a">
            <span class="posi">2</span>
            <span class="num_style">车位数量</span>
          </li>
          <li class="count" style="background:#909399">
            <span class="posi">2</span>
            <span class="num_style">设备数量</span>
          </li>
          <li class="count" style="background:#e6a23c">
            <span class="posi">2</span>
            <span class="num_style">APP用户数量</span>
          </li>
          <li class="count" style="background:#f56c6c">
            <span class="posi">2</span>
            <span class="num_style">预订次数</span>
          </li>
        </ul>
      </div>
      <div class="index_img">
        <img src="../../assets/img/index_img.jpg" alt>
      </div>
      <div class="stat-container">
        <div class="stat-holder">
          <div class="stat">
            <span>故障报修80 条</span>
            立即处理
          </div>
        </div>
        <div class="stat-holder">
          <div class="stat">
            <span>异常报警 200条</span>
            立即处理
          </div>
        </div>
        <div class="stat-holder">
          <div class="stat">
            <span>车场信息反馈</span>
            立即处理
          </div>
        </div>
        <div class="stat-holder">
          <div class="stat">
            <span>意见反馈</span>
           立即处理
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {},
  components: {}
};
</script>


<style scoped>
.stat-container {
    display: table;
    margin-bottom: 1.5em;
    width: 100%;
    margin-top:30px;
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
    text-shadow: 1px 1px 2px rgba(255,255,255,.5);
    
}
.stat:hover{
    cursor:pointer;
    color:#909399;
}
.stat span {
    display: block;
    margin-bottom: .4em;
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
.el-breadcrumb {
  background: #f5f5f5;
  height: 40px;
  vertical-align: mi;
  line-height: 40px;
  padding-left: 15px;
}
.num_style{
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
