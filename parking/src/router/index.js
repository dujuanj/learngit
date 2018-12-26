import Vue from 'vue'
import Router from 'vue-router'
import loginParking from '@/components/login-parking'
import indexParking from '@/components/index-parking'
import home from '@/components/pages/index-content'
import parkingManagement from '@/components/pages/parking-management'
import parkingmanageDetail from '@/components/pages/parkingMange-detail'
import parkingPosition from '@/components/pages/parking-position' //车位管理
import parkingpositionDetail from '@/components/pages/parkingpositon-detail' //车位详情
import gateway from '@/components/pages/gateway-management' //网关
import gatewayDetail from '@/components/pages/gateway-detail' //网关详情
import lock from '@/components/pages/lock-management'  //地锁管理
import lockDetail from '@/components/pages/lock-detail' //地锁详情
import appuser from '@/components/pages/appuser-management' //app用户管理
import appuserDetail from '@/components/pages/appuser-detail' //app用户详情
import user from '@/components/pages/user-management' //后台用户管理
import group from '@/components/pages/group-management'  //系统设置，节点组管理
import banner from '@/components/pages/banner-management'  //系统设置，广告管理
import help from '@/components/pages/help-management'  //系统设置，APP帮助管理
import feedback from '@/components/pages/feedback-management'  //系统设置，意见反鐀
import feedbackDetail from '@/components/pages/feedback-detail' //意见反馈详情
import version from '@/components/pages/version-management'  //系统设置，版本控制
import versionDetail from '@/components/pages/version-detail' //版本详情
import notice from '@/components/pages/notice-management'  //系统通知
import report from '@/components/pages/report-management'  //报表统计

import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  base:'/parking/',
  routes: [
    {
      path: '/',
      name: 'loginParking',
      component: loginParking
    },
    {
      path: '/index-parking',
      name: 'indexParking',
      component: indexParking,
      children:[
        {
          path:'/index-parking',//首页
          name:'home',
          component: home
        },
        {
          path:'/parking-management', //停车场管理
          name:'parkingManagement',
          component:parkingManagement
        },
        {
          path:'/parking-management-detail', //停车场管理详情
          name:'parkingmanageDetail',
          component:parkingmanageDetail,
         
        },
        {
          path:'/parking-position', //车位管理
          name:'parkingPosition',
          component:parkingPosition
        },
        {
          path:'/parking-position-detail', //车位管理详情
          name:'parkingpositionDetail',
          component:parkingpositionDetail
        },
        {
          path:'/gateway', //网关管理
          name:'gateway',
          component:gateway
        },
        {
          path:'/gateway-detail', //网关管理详情
          name:'gatewayDetail',
          component:gatewayDetail
        },
        {
          path:'/ground-lock', //地锁管理
          name:'lock',
          component:lock
        },
        {
          path:'/ground-lockdetail', //地锁管理
          name:'lockDetail',
          component:lockDetail
        },
        {
          path:'/appuser-management', //APP用户管理
          name:'appuser',
          component:appuser
        },
        {
          path:'/appuser-detail', //APP用户管理详情
          name:'appuserDetail',
          component:appuserDetail
        },
        {
          path:'/user-management', //后台用户管理
          name:'user',
          component:user
        },
        {
          path:'/group-management', //系统设置-节点组管理
          name:'group',
          component:group
        },
        {
          path:'/banner-management', //系统设置-广告管理
          name:'banner',
          component:banner
        },
        {
          path:'/help-management', //系统设置-APP帮助管理
          name:'help',
          component:help
        },
        {
          path:'/feedback-management', //系统设置-意见反鐀
          name:'feedback',
          component:feedback
        },
        {
          path:'/feedback-detail', //系统设置-意见反鐀详情
          name:'feedbackDetail',
          component:feedbackDetail
        },
        {
          path:'/version-management', //系统设置-版本控制
          name:'version',
          component:version
        },
        {
          path:'/version-detail', //系统设置-版本控制详情
          name:'versionDetail',
          component:versionDetail
        },
        {
          path:'/notice-management', //系统设置-系统通知
          name:'notice',
          component:notice
        },
        {
          path:'/report-management', //报表统计
          name:'report',
          component:report
        },
      ]
    },
  ],
  // linkActiveClass : 'active'
})
