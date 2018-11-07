<template>
  <el-form :model="AccountForm" :rules="rules" ref="AccountForm" label-position="left" label-width="0px" class="demo-ruleForm login-container">
    <h3 class="title">系统登录</h3>
    <el-form-item prop="account">
      <el-input type="text" v-model="AccountForm.account" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="AccountForm.checkPass" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    </el-form-item>
    <el-form-item prop="email">
      <el-input type="email" v-model="ruleForm2.email" auto-complete="off" placeholder="邮箱"></el-input>
    </el-form-item>

    <el-form-item style="width:100%;">
      <el-button type="primary" style="width:100%;" @click.native.prevent="LogonSubmit" :loading="logoning">注册</el-button>
      <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
    </el-form-item>
    <el-row type="flex" class="row-bg" :gutter="20">
      <el-col :span="12">
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="loginSubmit" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item style="width:100%;">
          <el-button type="primary" style="width:100%;" @click.native.prevent="LogonSubmit" :loading="logoning">注册</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { requestLogin, requestRegister } from '@/api/api';
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        note: {
          position:"absolute",
          top:"0px",
          left:"0px",
          width: "100%",
          height:"100%",
          backgroundImage: "url(" + require("@/assets/logo.png") + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        },
        logining: false,
        AccountForm: {
          account: 'admin',
          checkPass: '123456'
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2() {
        this.$refs.AccountForm.resetFields();
      },
      loginSubmit(ev) {
        var _this = this;
        this.$refs.AccountForm.validate((valid) => {
          if (valid) {
            //_this.$router.replace('/table');
            this.logining = true;
            //NProgress.start();
            var loginParams = { username: this.AccountForm.account, password: this.AccountForm.checkPass };
            requestLogin(loginParams).then(data => {
              this.logining = false;
              //NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/table' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      LogonSubmit() {
        this.$router.replace('/Logon');
        //  alert("now this is a test");
      }
    }
  }

</script>

<style lang="scss" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>