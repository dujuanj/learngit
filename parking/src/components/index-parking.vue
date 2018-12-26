<template>
  <div>
    <v-header></v-header>
    <!-- 左侧导航菜单 -->
    <el-menu
      :style="bodyH"
      :default-active="this.$route.path"
       router
       
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#fff"
      unique-opened
      style='text-align:left'
     
    >
      <el-submenu v-for='(item,index) in routes' :index="++index"  style="border-bottom:1px solid #37414c;" >
        <template slot="title" >{{item.munuName}}</template>
        <el-menu-item v-for='subitem in item.menuLevel' v-bind:index="subitem.menuUrl"    @click='active($event)' >{{subitem.menuName}}</el-menu-item>
      </el-submenu>
      <!-- <el-submenu index="2" style="border-bottom:1px solid #37414c">
        <template slot="title">停车场管理</template>
        <el-menu-item index="parking-management" @click='active()' > 停车场管理信息</el-menu-item>
       
      </el-submenu>
      <el-submenu index="3" style="border-bottom:1px solid #37414c">
        <template slot="title">设备管理</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
      </el-submenu> -->
    </el-menu>

     <!-- 右侧切换内容 -->
		<div class="outerWrap"  :style="bodyH">
			 <router-view></router-view>
		</div>
  </div>
</template>

<script>
import header from "@/components/header";

export default {
  name: "App",
  data() {
    return {
      bodyH: {
        height: window.innerHeight - 61 + "px"
      },
      activeCol:false,
      currentPath:'',
      routes:[
          {menuId:'17',munuName:'首页',menuLevel:[
            {menuUrl: "/index-parking", menuName: "首页信息", parentId: "235"}
            ]},
          {menuId:'12',munuName:'停车场管理',menuLevel:[
              {menuUrl: "/parking-management", menuName: "停车场管理信息", menu: Array(5), parentId: "200"},
             
          ]},
           {menuId:'2',munuName:'车位管理',menuLevel:[
              {menuUrl: "/parking-position", menuName: "车位管理信息", menu: Array(5), parentId: "200"},
             
          ]},
          {menuId:'3',munuName:'网关管理',menuLevel:[
              {menuUrl: "/gateway", menuName: "网关管理信息", menu: Array(5), parentId: "200"},
             
          ]},
           {menuId:'4',munuName:'地锁管理',menuLevel:[
              {menuUrl: "/ground-lock", menuName: "地锁管理信息", menu: Array(5), parentId: "200"},
             
          ]},
          //   {menuId:'4',munuName:'报表统计',menuLevel:[
          //     {menuUrl: "report-form", menuName: "统计信息", menu: Array(5), parentId: "200"},
             
          // ]},
           {menuId:'4',munuName:'App用户管理',menuLevel:[
              {menuUrl: "/appuser-management", menuName: "app用户信息", menu: Array(5), parentId: "200"},
             
          ]},
           {menuId:'4',munuName:'后台用户管理',menuLevel:[
              {menuUrl: "/user-management", menuName: "后台用户信息", menu: Array(5), parentId: "200"},
              // {menuUrl: "/role-management", menuName: "角色管理", menu: Array(5), parentId: "200"},
          ]},
           {menuId:'4',munuName:'系统设置',menuLevel:[
              {menuUrl: "/group-management", menuName: "节点组管理", menu: Array(5), parentId: "200"},
              {menuUrl: "/banner-management", menuName: "广告管理", menu: Array(5), parentId: "200"},
              {menuUrl: "/help-management", menuName: "APP使用帮助管理", menu: Array(5), parentId: "200"},
              {menuUrl: "/feedback-management", menuName: "意见反馈管理", menu: Array(5), parentId: "200"},
              {menuUrl: "/version-management", menuName: "版本管理", menu: Array(5), parentId: "200"},
               {menuUrl: "/notice-management", menuName: "系统通知", menu: Array(5), parentId: "200"},//系统通知
          ]},
           {menuId:'4',munuName:'报表统计',menuLevel:[
              {menuUrl: "/report-management", menuName: "报表统计信息", menu: Array(5), parentId: "200"},
              // {menuUrl: "/role-management", menuName: "角色管理", menu: Array(5), parentId: "200"},
          ]},
      ]
      
    };
  },
  methods: {
      active:function(){
      
        this.activeCol=true
      },
    // goSpace: function() {
    //   this.$router.push({ path: "/space" });
    // },
    handleOpen(key, keyPath) {
      console.log(key);
      this.openeds=key;
      console.log(keyPath);
     
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
    mounted:function(){     
      this.currentPath=this.$route.path;
      console.log(this.currentPath);
      console.log(this.$route.index);
     
  },
  components: {
    "v-header": header
  }
};
</script>
<style scoped>
.el-menu-item.is-active {
  background: #2a6ed3 !important;
}
.active{
     background: #2a6ed3 !important;
}
.index-smart {
  text-align: left !important;
  font-size: 18px;
  position: relative;
}
.el-menu {
  width: 10.6%;
  padding-top: 1px;
}
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-submenu__title i {
  color: #fff !important;
}
.outerWrap {
  position: absolute;
  top: 60px;
  left: 10.6%;
 
  width:89.4%;
}
</style>