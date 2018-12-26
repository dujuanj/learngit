<template>
  <div class="index-parking login_bg" :style="objHeight">
    <div class="login_wrap">
      <div class="login_text"></div>
      <p class="Subtitle">停车有位，让城市生活更美好</p>
      <div class="login_form">
        <!-- <h3 style="font-size:26px;">后台登陆系统</h3> -->
        <!-- 表单 -->
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 用户名 -->
          <el-form-item label="用户名" prop="name" id="user">
            <el-input v-model="ruleForm.loginName"></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item label="密码" prop="pwd" id="pwd">
            <el-input v-model="ruleForm.password"></el-input>
          </el-form-item>
          <!-- 验证码 -->
          <!-- <el-form-item label="验证码" prop="code" style="text-align:left;" id="code">
            <el-input v-model="ruleForm.code" style="width:55%"></el-input>
            <a href="javascript:void(0);" title="点击更换验证码">
              <img
                id="imgVerify"
                src
                alt="更换验证码"
                onclick="getVerify(this)"
                style="width: 32%;height:49px;float:right"
              >
            </a>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" style="width:100%;">登陆</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loginParking",
  data() {
    return {
      objHeight: {
        height: window.innerHeight + "px"
      },
      ruleForm: {
        loginName: "",
        password: ""
        //code: "",
      },
      rules: {
        loginName: [
          { required: true, message: "请输入用户名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入用户密码", trigger: "blur" }
        ],

        code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
          //登陆接口
          var datas = this.$refs[formName].model;
          console.log(datas);
          this.$http
            .post(
              this.GLOBAL.xgurl + "/park-api/park/sys/loginManager",
              datas,
              {
                headers: {
                  "Content-Type": "application/json;charset=UTF-8"
                }
              }
            )
            .then(res => {
              console.log(res.data);
              if (res.data.isSuccess == "success") {
                this.$router.push("/index-parking");
               
              } else {
                this.$message({
                  type: "success",
                  message: res.data.errorMsg
                });
              }
            })
            .catch(res => {
              console.log("err");
              this.$router.push("/index-parking");
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>


<style scoped>
.login_bg {
  background: url(../assets/img/login_bg.jpg) no-repeat;
  background-size: 100%;
  width: 100%;
}
.login_wrap {
  width: 572px;
  margin: 0 auto;
  padding-top: 210px;
  color: #fff;
}
.Subtitle {
  color: #fff;
  font-size: 24px;
  margin: 0 auto;
  text-align: center;
  margin-top: 19px;
}
.login_text {
  width: 120%;
  height: 77px;
  background: url(../assets/img/text.png) no-repeat;
  background-size: 100% 100%;
  margin-left: -8%;
}
.login_form {
  width: 400px;
  border: 1px solid #529fd8;
  color: #fff;
  margin: 62px auto;
  text-align: center;
  padding: 15px 30px 30px 0;
}
h3 {
  font-weight: normal;
  font-size: 26px;
  margin-bottom: 18px;
  margin-left: 32px;
}
</style>
