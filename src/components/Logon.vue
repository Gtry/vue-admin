<template>
  <p class="logon">
    <el-form :model="logonAccount" :rules="rules" ref="logonAccount" label-position="left" label-width="0px" class="demo-ruleForm logon-container">
      <h3 class="title">注册账号</h3>
      <el-form-item prop="account">
        <el-input type="text" v-model="logonAccount.account" auto-complete="off" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="logonAccount.password" auto-complete="off" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input type="email" v-model="logonAccount.email" auto-complete="off" placeholder="邮箱"></el-input>
      </el-form-item>

      <el-row type="flex" class="row-bg" :gutter="0">
        <el-col :span="24">
          <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="logonSubmit" :loading="logoning">注册</el-button>
            <!--<el-button @click="resetForm('logonAccount')">重置</el-button>-->
          </el-form-item>
          <span v-on:click="loginSubmit">已有账号？马上<el-button type="text" abled>登录</el-button></span>
        </el-col>
      </el-row>
    </el-form>
  </p>

</template>

<script>
  import { requestLogon } from '@/axios/api';
  export default {
    data() {
      return {
        logining: false,
        logoning: false,
        note: {
          position:"absolute",
          top:"0px",
          left:"0px",
          width: "100%",
          height:"100%",
          backgroundImage: "url(" + require("@/assets/login.jpg") + ")",
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
        },
        logonAccount: {
          account: '',
          password: '',
          email: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      loginSubmit(event) {
        this.logining = true;
        this.$router.push({ path: '/login' });
      },
      logonSubmit(event) {
        var _this = this;
        this.$refs.logonAccount.validate((valid) => {
          if (valid) {
            this.logoning = true;
            var logonParams = { username: this.logonAccount.account, password: this.logonAccount.password, email: this.logonAccount.email };
            requestLogon(logonParams).then(data => {
              this.logoning = false;
              //NProgress.done();
              let { msg, code, user } = data;
              if (code !== 200) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                sessionStorage.setItem('user', JSON.stringify(user));
                this.$router.push({ path: '/login' });
              }
            });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss" scoped>
.logon-container {
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);
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
