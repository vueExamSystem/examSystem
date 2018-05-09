<template>
  <div class="login-page">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="left" label-width="0px" class="login-container">
      <div class="title"><img src="/static/images/logo.png"></div>
      <el-form-item prop="account">
        <el-input type="text" v-model="loginForm.account" auto-complete="off" placeholder="请输入账号"></el-input>
        <div class="el-input-myprepend"><i class="iconfont icon-user-larger"></i></div>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" v-model="loginForm.checkPass" auto-complete="off" placeholder="请输入密码" @keyup.enter.native="handleSubmit"></el-input>
        <div class="el-input-myprepend"><i class="iconfont icon-lock-larger"></i></div>
      </el-form-item>
      <el-form-item style="margin-top:40px;">
        <el-button type="primary" style="width:100%;" :loading="logining" @click.native.prevent="handleSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { requestLogin } from '../api/api';
  export default {
    data() {
      return {
        loginForm: {
          account: '',
          checkPass: ''
        },
        rules: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        },
        logining: false
      };
    },
    methods: {
      handleSubmit(ev) {
        var _this = this;
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = { username: this.loginForm.account, password: this.loginForm.checkPass };
            requestLogin(loginParams).then(res => {
              this.logining = false;
              let { msg, code, data } = res;
              if (code !=0) {
                this.$message({
                  message: msg,
                  type: 'error'
                });
              } else {
                this.$message({
                  type: 'success',
                  message: '登录成功',
                })
                
                let token = data.token;
                this.$store.dispatch('SetToken', { token });
                //如果用户手动输入"/"那么会跳转到这里来，即this.$route.query.redirect有参数
                let redirectUrl = decodeURIComponent(this.$route.query.redirect || '/');
                //跳转到指定的路由
                this.$router.push({
                    path: redirectUrl
                });
                /*var Days = 30;
                var exp = new Date();
                exp.setTime(exp.getTime() + Days*24*60*60*1000);
                document.cookie = "token" + "="+data.userId+"_"+ data.token + ";expires=" + exp.toGMTString();*/
                sessionStorage.setItem('user', JSON.stringify(data));
                this.$router.push({ path: '/index' });
              }
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
    min-height: 100%;
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