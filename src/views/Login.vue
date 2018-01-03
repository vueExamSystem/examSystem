<template>
  <div class="login-page">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
      <div class="title"><img src="/static/images/logo.png"></div>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
        <div class="el-input-myprepend"><i class="iconfont icon-user-larger"></i></div>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="请输入密码"></el-input>
        <div class="el-input-myprepend"><i class="iconfont icon-lock-larger"></i></div>
      </el-form-item>
      <el-form-item style="margin-top:40px;">
        <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        loginForm: {
          account: 'admin',
          checkPass: '123456'
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        checked: true
      };
    },
    methods: {
      handleSubmit(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            var loginParams = { username: this.loginForm.account, password: this.loginForm.checkPass };
            this.systemPost('login',loginParams,data => {
              let {user} = data;
              sessionStorage.setItem('user', JSON.stringify(user));
              this.$router.push({ path: '/' });
            });
          } else {
            return false;
          }
        });
      }
    }
  }

</script>

<style lang="scss">
  .login-page{
    padding-top: 180px;
    height: 100%;
    background-image: linear-gradient(-135deg, #C6ADD1 0%, #9DAFD0 50%, #ABA9CE 100%);
    .login-container {
      width: 300px;
      margin: 0 auto;
      .title {
        margin: 0px auto 40px auto;
        text-align: center;
        color: #505458;
      }
      .el-form-item{
        position:relative;
        margin-bottom: 20px;
        .el-input-myprepend{
          position:absolute;
          top:0;
          left:0;
          width:50px;
          height:28px;
          margin-top: 11px;
          line-height: 28px;
          padding: 0 20px;
          color: #8684BC;
          border-right: 1px solid #B5B5CD;
        }
        .el-input{
          width: 100%;
          height: 50px;
          .el-input__inner{
              height: 100%;
              border-radius: 50px;
              padding-left: 65px;
          }
        }
      }
      .el-button{
        height: 40px;
        background-image: linear-gradient(-90deg, #AA84BC 0%, #8684BC 100%);
        border-radius: 25px;
      }
    }
}
</style>