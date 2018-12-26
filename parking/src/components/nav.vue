<template>
  <div class="nav">
    <el-menu
      :style="bodyH"
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fff"
      unique-opened="true"
    >
      <el-submenu index="1" style="border-bottom:1px solid #37414c">
        <template slot="title">首页</template>
        <el-menu-item index="1-1">首页信息</el-menu-item>
      </el-submenu>
      <el-submenu index="2" style="border-bottom:1px solid #37414c">
        <template slot="title">空间管理</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
      <el-submenu index="3" style="border-bottom:1px solid #37414c">
        <template slot="title">设备管理</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "nav",
  bodyH: {
    height: window.innerHeight - 61 + "px"
  },
  methods: {
    goSpace: function() {
      this.$router.push({ path: "/space" });
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>
<style scoped>
 .el-menu-item.is-active{
    background:#2a6ed3!important;
  }
	.index-smart{
    text-align:left!important;
    font-size:18px;
    position: relative;
    }
	.el-menu{
    width:10.6%;
    padding-top:1px;
  }
  .el-menu-item-group__title{
    padding:0!important;
  }
  .el-submenu__title i{
    color:#fff!important;
  }
  .outerWrap{
    position: absolute;
    top: 60px;
    left:10.6%;
    padding:15px;
  }
</style>