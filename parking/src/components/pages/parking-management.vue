<template>
  <div class="parkingManagement">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/index-parking' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>停车场管理</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>

    <div class="rightWrap">
      <!-- 搜索区 -->
      <div style="margin-top: 15px;text-align:left;">
        <el-input placeholder="输入停车场名称查询" v-model="name" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleUserList(1)"></el-button>
        </el-input>
        <select v-model="city" @change="getArea(city)" class="myselect">
          <option value>选择所在市(全部)</option>
          <option :value="item" v-for="item in citys">{{item}}</option>
        </select>
        <select v-model="area" @change="handleUserList(1)" class="myselect">
          <option value>选择所在区(全部)</option>
          <option :value="item" v-for="item in areas">{{item}}</option>
        </select>
        <select v-model="openStatus" @change="handleUserList(1)" class="myselect">
          <option value>选择开放状态</option>
          <option value="1">开放</option>
          <option value="0">隐藏</option>
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
        <table id="space" class="table table-striped" style="width: 97%;margin-top:10px;" v-cloak>
          <thead>
            <tr>
              <!--   <th>
                                            <input type="checkbox"  id="all_checked"/>
              全选</th>-->
              <th>序号</th>
              <th>停车场名称</th>
              <th>面积</th>
              <th>车位总数</th>
              <th>空闲车位数</th>
              <th>所在市</th>
              <th>所在区</th>
              <th>详细地址</th>
              <th>开放状态</th>

              <th style="width:170px;">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData2">
              <!-- 	<td><input type="checkbox" :value='item.id' v-model='ids'/></td> -->
              <td style="width:5%">{{(currentPage-1)*10+(index+1)}}</td>
              <td>{{item.name}}</td>
              <td>{{item.acreage}}</td>
              <td>{{item.totalNum}}</td>
              <td>{{item.remainingNum}}</td>
              <td>{{item.city}}</td>
              <td>{{item.area}}</td>
              <td>{{item.street}}</td>
              <td>{{item.openStatus==1?"开放":item.openStatus==0?"隐藏":""}}</td>

              <td style="width:15%">
                <el-button size="mini" @click="getDescribe($event)" :detail-id="item.id">详情</el-button>
                <el-button size="mini" v-bind:id="item.id" @click="getDetail($event)">编辑</el-button>
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
    <el-dialog title="添加停车场" :visible.sync="dialogFormVisible" width="35%" id="add" height="700px;">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">填写停车场基本信息>>></p>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item label="停车场名称:" :label-width="formLabelWidth" style="color:#000" prop="name">
          <el-input v-model="ruleForm.name" placeholder></el-input>
        </el-form-item>
        <el-form-item
          label="*总面积数:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="acreage"
        >
          <el-input v-model="ruleForm.acreage" style="width:41%"></el-input>m²
        </el-form-item>
        <el-form-item label="*省市区:" :label-width="formLabelWidth">
          <!-- <el-cascader size="large" :options="options" @change="handleChange"></el-cascader> -->
          <select id="province1" name="province" v-model="prov" style="height:40px;width:100px;">
            <option v-for="option in arr" :value="option.name">{{option.name }}</option>
          </select>
          
          <select id="city1" name="city" v-model="dcity" style="height:40px;width:100px">
            <option v-for="option in cityArr" :value="option.name">{{ option.name }}</option>
          </select>
          
          <select
            id="district1"
            name="ruleForm.area"
            v-model="ddistrict"
            style="height:40px;width:100px;"
          >
            <option v-for="option in districtArr" :value="option.name">{{ option.name }}</option>
          </select>
        </el-form-item>
        <el-form-item label="*详细地址:" :label-width="formLabelWidth" style="color:#000" prop="street">
          <el-input autocomplete="off" v-model="ruleForm.street"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="平面图:" :label-width="formLabelWidth" style="color:#000" prop="picture">
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
        <!-- 营业时段 -->
        <el-form-item
          label="*营业时段:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="startTime"
        >
          <el-time-select
            placeholder="起始时间"
            v-model="ruleForm.startTime"
            :picker-options="{
      start: '06:30',
      step: '00:15',
      end: '23:30'
    }"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="ruleForm.stopTime"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '23:59',
      minTime: startTime
    }"
          ></el-time-select>
        </el-form-item>
        <!-- b出入方式 -->
        <el-form-item
          label="出入方式:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isFreeAccess"
        >
          <select v-model="ruleForm.isFreeAccess" placeholder="选择出入方式" class="form-control">
            <option value="1">自由出入</option>
            <option value="0">先预定</option>
          </select>
        </el-form-item>
        <el-form-item label="位置:" :label-width="formLabelWidth" style="color:#000" prop="position">
          <select v-model="ruleForm.position" placeholder="选择位置" class="form-control">
            <option value="1">地上</option>
            <option value="0">地下</option>
            <option value="2">地上+地下</option>
          </select>
        </el-form-item>
        <el-form-item
          label="充电桩:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isChargingPile"
        >
          <select v-model="ruleForm.isChargingPile" placeholder="选择充电桩" class="form-control">
            <option value="1">有</option>
            <option value="0">无</option>
          </select>
        </el-form-item>
        <el-form-item
          label="*大型车:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="isSupportLargeVehicles"
        >
          <select
            v-model="ruleForm.isSupportLargeVehicles"
            placeholder="选择大型车"
            class="form-control"
          >
            <option value="1">支持</option>
            <option value="0">不支持</option>
          </select>
        </el-form-item>
        <el-form-item
          label="*开放状态:"
          :label-width="formLabelWidth"
          style="color:#000"
          prop="openStatus"
        >
          <select v-model="ruleForm.openStatus" placeholder="选择开放状态" class="form-control">
            <option value="1">开放</option>
            <option value="0">隐藏</option>
          </select>
          <span>开放状态的停车场才会在平台上显示</span>
        </el-form-item>
        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">填写停车场基本信息>>></p>
        <!-- 白天收费时段 -->
        <el-form-item label="*收费时段:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="ruleForm.chargeGroup.chargeManagement[0].management">
            <el-option value="白天 7:00-21:00">白天 7:00-21:00</el-option>
            <!-- <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="*免费时长:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="ruleForm.chargeGroup.chargeManagement[0].freeTime"
          ></el-input>分钟
        </el-form-item>
        <el-form-item label="*价格:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="ruleForm.chargeGroup.chargeManagement[0].money"
          ></el-input>元
          <select
            name
            id
            style="height: 36px;border-radius: 3px;border-color: #ccc;"
            v-model="ruleForm.chargeGroup.chargeManagement[0].chargeFrequency"
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
          </select>
        </el-form-item>

        <!-- 晚上收费时段 -->
        <el-form-item label="*收费时段:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="ruleForm.chargeGroup.chargeManagement[1].management">
            <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option>
            <!-- <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="*免费时长:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="ruleForm.chargeGroup.chargeManagement[1].freeTime"
          ></el-input>分钟
        </el-form-item>
        <el-form-item label="*价格:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="ruleForm.chargeGroup.chargeManagement[1].money"
          ></el-input>元
          <select
            name
            id
            style="height: 36px;border-radius: 3px;border-color: #ccc;"
            v-model="ruleForm.chargeGroup.chargeManagement[1].chargeFrequency"
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
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
    <el-dialog title="编辑停车场" :visible.sync="dialogFormeditVisible" width="35%" id="edit">
      <p style="width:100%;color: #67c23a;margin-top: -25px;margin-bottom: 17px">编辑停车场基本信息>>></p>
      <el-form>
        <el-form-item label="*停车场名称:" :label-width="formLabelWidth" style="color:#000">
          <el-input v-model="editForm.name" placeholder></el-input>
        </el-form-item>
        <el-form-item label="*总面积数:" :label-width="formLabelWidth" style="color:#000">
          <el-input v-model="editForm.acreage" style="width:41%"></el-input>m²
        </el-form-item>
        <el-form-item label="*省市区:" :label-width="formLabelWidth">
          <select id="province1" name="province" v-model="prov" style="height:40px;width:100px;">
            <option v-for="option in arr" :value="option.name">{{option.name }}</option>
          </select>
          
          <select id="city1" name="city" v-model="dcity" style="height:40px;width:100px">
            <option v-for="option in cityArr" :value="option.name">{{ option.name }}</option>
          </select>
          
          <select
            id="district1"
            name="area"
            v-model="ddistrict"
            style="height:40px;width:100px;"
          >
            <option v-for="option in districtArr" :value="option.name">{{ option.name }}</option>
          </select>
        </el-form-item>
        <el-form-item label="*详细地址:" :label-width="formLabelWidth" style="color:#000">
          <el-input v-model="editForm.street"></el-input>
        </el-form-item>
        <!-- 图片上传 -->
        <el-form-item label="平面图:" :label-width="formLabelWidth" style="color:#000" prop="picture">
          <el-upload
            action
            accept="image/*"
            :multiple="false"
            list-type="picture-card"
            
           
            name="uploadFile"
            
            :file-list="picList"
            :http-request="httpRequest"
            :show-file-list=true
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt>
          </el-dialog>
        </el-form-item>
        <!-- 营业时段 -->
        <el-form-item label="*营业时段:" :label-width="formLabelWidth" style="color:#000">
          <el-time-select
            placeholder="起始时间"
            v-model="editForm.startTime"
            :picker-options="{
      start: '06:30',
      step: '00:15',
      end: '23:30'
    }"
          ></el-time-select>
          <el-time-select
            placeholder="结束时间"
            v-model="editForm.stopTime"
            :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '23:59',
      minTime: startTime
    }"
          ></el-time-select>
        </el-form-item>
        <!-- b出入方式 -->
        <el-form-item label="*出入方式:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.isFreeAccess" placeholder="选择出入方式" class="form-control">
            <option value="1">自由出入</option>
            <option value="0">先预定</option>
          </select>
        </el-form-item>
        <el-form-item label="*位置:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.position" placeholder="选择位置" class="form-control">
            <option value="1">地上</option>
            <option value="0">地下</option>
            <option value="2">地上+地下</option>
          </select>
        </el-form-item>
        <el-form-item label="*充电桩:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.isChargingPile" placeholder="选择充电桩" class="form-control">
            <option value="1">有</option>
            <option value="0">无</option>
          </select>
        </el-form-item>
        <el-form-item label="*大型车:" :label-width="formLabelWidth" style="color:#000">
          <select
            v-model="editForm.isSupportLargeVehicles"
            placeholder="选择大型车"
            class="form-control"
          >
            <option value="1">支持</option>
            <option value="0">不支持</option>
          </select>
        </el-form-item>
        <el-form-item label="*开放状态:" :label-width="formLabelWidth" style="color:#000">
          <select v-model="editForm.openStatus" placeholder="选择开放状态" class="form-control">
            <option value="1">开放</option>
            <option value="0">隐藏</option>
          </select>
          <span>开放状态的停车场才会在平台上显示</span>
        </el-form-item>
        <p style="width:100%;color: #67c23a;margin-top:0;margin-bottom: 17px">填写停车场基本信息>>></p>
        <!-- 收费时段 -->
        <!-- 白天收费时段 -->
        <el-form-item label="白天收费时段:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="editForm.chargeGroup.chargeManagement[0].management">
            <el-option value="白天 7:00-21:00">白天 7:00-21:00</el-option>
            <!-- <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="*免费时长:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[0].freeTime"
          ></el-input>分钟
        </el-form-item>
        <el-form-item label="*价格:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[0].money"
          ></el-input>元
          <select
            name
            id
            style="height: 36px;border-radius: 3px;border-color: #ccc;"
            v-model="editForm.chargeGroup.chargeManagement[0].chargeFrequency"
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
          </select>
        </el-form-item>
        <!-- 晚上收费时段 -->
        <el-form-item label="晚上收费时段:" :label-width="formLabelWidth" style="color:#000">
          <el-select v-model="editForm.chargeGroup.chargeManagement[1].management">
            <el-option value="晚上 21:00-7:00">晚上 21:00-7:00</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="*免费时长:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[1].freeTime"
          ></el-input>分钟
        </el-form-item>
        <el-form-item label="*价格:" :label-width="formLabelWidth" style="color:#000">
          <el-input
            autocomplete="off"
            style="width:41%"
            v-model="editForm.chargeGroup.chargeManagement[1].money"
          ></el-input>元
          <select
            name
            id
            style="height: 36px;border-radius: 3px;border-color: #ccc;"
            v-model="editForm.chargeGroup.chargeManagement[1].chargeFrequency"
          >
            <option value="15">15分钟</option>
            <option value="30">30分钟</option>
            <option value="60">1小时</option>
          </select>
        </el-form-item>
      </el-form>
      <!-- 提交按扭 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormeditVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit()" @close="dialogFormeditVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data"; //TextToCode数字转成汉字

export default {
  name: "parkingManagement",
  // el:'.parkingManagement',
  data() {
    return {
      //筛选条件
      name: "",
      city: "",
      area: "",
      areas: "",
      citys: "",
      arr: this.GLOBAL.arrAll,
      openStatus: "",
      formLabelWidth: "105px",
      //对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      dialogFormeditVisible: false,
      options: regionData,

      //上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      imgurlbase: "", //图片base64位码
      startTime: "",
      stopTime: "",
      //分页
      currentPage: 1, //当前页
      total: "", //总数
      pagesize: 10, // 每页数据
      tableData2: "",
      //回显图片List
      picList:[],
      //省市区
      prov: "",
      dcity: "",
      ddistrict: "",
      citys: "",
      districtDatas: "",
      cityArr: [],
      districtArr: [],

      ruleForm: {
        name: "",
        acreage: "",
        city: "",
        province: "",
        area: "",
        street: "",
        isFreeAccess: "",
        position: "",
        isChargingPile: "",
        isSupportLargeVehicles: "",
        openStatus: "",
        startTime: "",
        stopTime: "",
        picture: "",
        chargeGroup: {
          name: "第一组",
          chargeManagement: [
            {
              management: "白天 07:00-21:00",
              // endTime: "",
              freeTime: "",
              money: "",
              chargeFrequency: ""
            },
            {
              management: "晚上 21:00-7:00",
              // endTime: "",
              freeTime: "",
              money: "",
              chargeFrequency: ""
            }
          ]
        }
      },
      editForm: {
        name: "",
        acreage: "",
        city: "",
        province: "",
        area: "",
        id: "",
        street: "",
        isFreeAccess: "",
        position: "",
        isChargingPile: "",
        isSupportLargeVehicles: "",
        openStatus: "",
        startTime: "",
        stopTime: "",
        picture: "",
        chargeGroup: {
          id: "",
          name: "第一组",
          chargeManagement: [
            {
              management: "白天 07:00-21:00",
              // endTime: "",
              freeTime: "",
              money: "",
              chargeFrequency: ""
            },
            {
              management: "晚上 21:00-7:00",
              // endTime: "",
              freeTime: "",
              money: "",
              chargeFrequency: ""
            }
          ]
        }
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入停车场名称，不能为空",
            trigger: "blur"
          }
        ],
        acreage: [
          {
            required: true,
            message: "请输入面积，不能为空",
            trigger: "blur"
          }
        ],
        province: [
          {
            required: true,
            message: "请输入省市区，不能为空",
            trigger: "blur"
          }
        ],
        street: [
          {
            required: true,
            message: "请输入详细地址，不能为空",
            trigger: "blur"
          }
        ],
        picture: [
          {
            required: true,
            message: "请上传图片，不能为空",
            trigger: "blur"
          }
        ],
        startTime: [
          {
            required: true,
            message: "请填写开始时间，不能为空",
            trigger: "blur"
          }
        ],
        stopTime: [
          {
            required: true,
            message: "请填写结束时间，不能为空",
            trigger: "blur"
          }
        ],
        isFreeAccess: [
          {
            required: true,
            message: "请填写出入方式，不能为空",
            trigger: "blur"
          }
        ],
        position: [
          {
            required: true,
            message: "请填写位置，不能为空",
            trigger: "blur"
          }
        ],
        isChargingPile: [
          {
            required: true,
            message: "请填写充电桩，不能为空",
            trigger: "blur"
          }
        ],
        isSupportLargeVehicles: [
          {
            required: true,
            message: "请填写大型车，不能为空",
            trigger: "blur"
          }
        ],
        openStatus: [
          {
            required: true,
            message: "请填写开放状态，不能为空",
            trigger: "blur"
          }
        ],
        startTime0: [
          {
            required: true,
            message: "请填写时间，不能为空",
            trigger: "blur"
          }
        ],
        freeTime0: [
          {
            required: true,
            message: "请填写免费时长，不能为空",
            trigger: "blur"
          }
        ],
        money0: [
          {
            required: true,
            message: "请填写价格，不能为空",
            trigger: "blur"
          }
        ],
        chargeFrequency0: [
          {
            required: true,
            message: "请填写收费频率，不能为空",
            trigger: "blur"
          }
        ],
        startTime1: [
          {
            required: true,
            message: "请填写时间，不能为空",
            trigger: "blur"
          }
        ],
        freeTime1: [
          {
            required: true,
            message: "请填写免费时长，不能为空",
            trigger: "blur"
          }
        ],
        money1: [
          {
            required: true,
            message: "请填写价格，不能为空",
            trigger: "blur"
          }
        ],
        chargeFrequency1: [
          {
            required: true,
            message: "请填写收费频率，不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    reset: function() {
      this.name = "";
      this.city = "";
      this.area = "";
      this.openStatus = "";
      this.handleUserList(1);
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      console.log(this.dialogImageUrl);
      console.log(file);
    },
    getDetail(event) {
      var _this=this;
      //编辑回显功能
      //alert($(event.currentTarget).attr("id"));
      var id = $(event.currentTarget).attr("id");
      this.picList=[];
      this.dialogFormeditVisible = true;
      // this.editForm = Object.assign({}, row);
      
       this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/parkingLotInfo",
          {
            id:id
          },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.editForm=res.data.dataArray;
          var obj=new Object();
          obj.url=res.data.dataArray.picture;
          this.picList.push(obj);;
          console.log(this.picList);
          _this.prov=res.data.dataArray.province;
          _this.dcity=res.data.dataArray.city;
          _this.ddistrict=res.data.dataArray.area;
         
        })
        .catch(res => {
          console.log("err");
        });
        console.log(this.prov);
        console.log(_this.prov);
      
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    //编辑保存
    saveEdit(){
        
        console.log(this.editForm);
        //this.editForm.picture=this.picture;
        this.editForm.createUser=1;
        this.editForm.province=this.prov;
        this.editForm.city=this.dcity;
        this.editForm.area=this.ddistrict;
         this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/saveOrUpdateParkingLot",
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
          this.dialogFormeditVisible=false;
          this.handleUserList(this.currentPage);
        })
        .catch(res => {
          console.log("err");
        });
    },

    //删除弹出框
    open2(event) {
      var id=$(event.currentTarget).prev().attr('id');
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      
        .then(() => {
          this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/deleteParkingLot",
          {
            id:id
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
            message: res.data.errorMsg,
           
          });
           this.handleUserList(1)
        })
        .catch(res => {
          console.log("err");
        });
         
        })
        // .catch(() => {
        //   this.$message({
        //     type: "info",
        //     message: "已取消删除"
        //   });
        // });
    },
    //详情
    getDescribe($event) {
      var id = $(event.currentTarget).attr("detail-id");
       sessionStorage.setItem('id',id);
      this.$router.push({
        name: "parkingmanageDetail",
        params: {
          id: id
        }
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      console.log(this.pagesize); //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
       this.handleUserList(this.currentPage)
    },
    handleUserList(currentpage) {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/queryParkingLot",
          {
            pageNumber: currentpage,
            pageSize: this.pagesize,
            openStatus: this.openStatus,
            name: this.name,
            city: this.city,
            area: this.area
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
          this.tableData2 = res.data.dataArray.datas;
        })
        .catch(res => {
          console.log("err");
        });
    },
    //获取市区
    cityData() {
      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/queryCity",

          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);
          this.citys = res.data.dataArray.citys;
        })
        .catch(res => {
          console.log("err");
        });
    },
    getArea(val) {
      //获取区

      this.$http
        .post(
          this.GLOBAL.xgurl + "/park-api/park/parkingLot/queryAreaByCity",
          { city: val },
          {
            headers: {
              "Content-Type": "application/json;charset=UTF-8"
            }
          }
        )
        .then(res => {
          console.log(res.data.dataArray);

          this.areas = res.data.dataArray.areas;
        })
        .catch(res => {
          console.log("err");
        });
    },
    submitForm(formName) {
      //添加提交功能
      this.ruleForm.province = this.prov;
      this.ruleForm.area = this.ddistrict;
      this.ruleForm.city = this.dcity;
      this.$refs[formName].validate(valid => {
        if (valid) {
          //alert("submit!");
          var datas = this.$refs[formName].model;
          datas.createUser = 1;
          // //datas.ruleForm.province=provs;
          // datas.ruleForm.area=areas;
          // datas.ruleForm.city=cit;
          console.log(datas);
          this.$http
            .post(
              this.GLOBAL.xgurl + "/park-api/park/parkingLot/saveOrUpdateParkingLot",
              datas,
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              }
            )
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
      this.ruleForm.picture = a;
      this.editForm.picture=a;
    
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
    updateCity: function() {
      for (var i in this.arr) {
        var obj = this.arr[i];
        if (obj.name == this.prov) {
          this.cityArr = obj.sub;
          break;
        };
      
      }
      this.ruleForm.city = this.cityArr[1].name;
    },
    updateDistrict: function() {
      for (var i in this.cityArr) {
        var obj = this.cityArr[i];
        if (obj.name == this.dcity) {
          this.districtArr = obj.sub;
          break;
        };
        
      }
      if (
        this.districtArr &&
        this.districtArr.length > 0 &&
        this.districtArr[1].name
      ) {
        //this.ddistrict = this.districtArr[1].name;
      
      } else {
        this.ddistrict = "";
      
      }
    }
  },

  components: {},
  created() {
    this.handleUserList(this.currentPage);
    this.cityData();
  },
  beforeMount: function() {
    this.updateCity();
    this.updateDistrict();
  },
  watch: {
    prov: function() {
      this.updateCity();
      this.updateDistrict();
    },
    dcity: function() {
      this.updateDistrict();
    },
    // province:function(){
    //     this.updateCity();
    //     this.updateDistrict();
    // },
     city: function() {
      this.updateDistrict();
    },
    
  }
};
</script>


<style scoped>
.el-dialog__body {
  height: 600px;
  overflow-y: scroll;
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
  margin-bottom: 17px !important;
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
select {
}
</style>
