// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import global_ from './components/global'//引用文件

import axios from 'axios';
import xlsx from 'xlsx';

Vue.prototype.$http = axios;
Vue.prototype.GLOBAL = global_//挂载到Vue实例上面

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(xlsx);
// Vue.use(axios);
 //元素的补零计算
 function addZero(val){
  if(val < 10){
   return "0" +val;
  }else{
   return val;
  }
 };
//实现vue中的过滤器功能  先定义过滤器 在使用        value是过滤器前面的值，type是过滤器中定义的字段 formatTime('YMDHMS')
Vue.filter("formatTime",function(value,type){
  var dataTime="";
  var data = new Date();  
               data.setTime(value); 
       var year   =  data.getFullYear();  
               var month  =  addZero(data.getMonth() + 1);  
               var day    =  addZero(data.getDate()); 
               var hour   =  addZero(data.getHours());
  var minute =  addZero(data.getMinutes());
  var second =  addZero(data.getSeconds());
  if(type == "YMD"){
  dataTime =  year + "-"+ month + "-" + day;
  }else if(type == "YMDHMS"){
  dataTime = year + "-"+month + "-" + day + " " +hour+ ":"+minute+":" +second;
  }else if(type == "HMS"){
  dataTime = hour+":" + minute+":" + second;
  }else if(type == "YM"){
  dataTime = year + "-" + month;

  }
  return dataTime;//将格式化后的字符串输出到前端显示
  });  

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
