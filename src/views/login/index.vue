<template>
  <div class="login-container" style="background-image: url(../../images/login_background.png);">
    <el-form v-if="isLoginFormFlag" ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form"
      auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">商家后台管理系统</h3>
      </div>

      <!-- ======================= 使用账号密码登入 =========================  -->
      <transition name="el-fade-in-linear">
        <div v-if="isShowUPLogin">
          <el-form-item prop="username">
            <span class="svg-container">
              <svg-icon icon-class="user" />
            </span>
            <el-input ref="username" v-model="loginForm.username" placeholder="请输入用户名" name="username" type="text"
              tabindex="1" auto-complete="on" />
          </el-form-item>

          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入密码"
              name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </div>
      </transition>
      <!-- ======================= 使用账号密码登入(结束) =========================  -->

      <!-- ======================= 使用验证码登入 =========================  -->
      <div v-if="isShowCodeLogin">
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="phone" style="font-size: 18px;" />
          </span>
          <el-input ref="username" v-model="loginCodeForm.phone" placeholder="请输入你的手机号" name="phone" type="text"
            tabindex="1" auto-complete="on" />
        </el-form-item>

        <el-form-item prop="username" style="position: relative;">
          <span class="svg-container">
            <svg-icon icon-class="code" style="font-size: 18px;" />
          </span>
          <el-input ref="username" v-model="loginCodeForm.code" placeholder="请输入验证码" name="phone" type="text" tabindex="1"
            auto-complete="on" />

          <el-button :loading="sendLoading" type="info" plain style="opacity: 0.5; position: absolute; top: 5px;right: 10px;;"
            @click="sendCode">{{sendCodeBtn}}</el-button>
        </el-form-item>
      </div>
      <!-- ======================= 使用验证码登入(结束) =========================  -->
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登入</el-button>
      <transition name="el-fade-in-linear">
        <div class="tips">
          <span v-if="isShowUPLogin">
            <el-link type="primary" @click="isUseCodeOrUpByState(false)">验证码登入</el-link>
          </span>
          <span v-if="isShowCodeLogin">
            <el-link type="primary" @click="isUseCodeOrUpByState(true)">账号登入</el-link>
          </span>
          <span style="margin-right:20px;">
            <el-link type="primary">忘记密码</el-link>
          </span>
        </div>
      </transition>

    </el-form>

    <!-- ======================= 加载框 =========================  -->
    <div v-if="loginLoadingFLag">
      <div>
        <div class="loader">
          <div class="face">
            <div class="circle"></div>
          </div>
          <div class="face">
            <div class="circle"></div>
          </div>
        </div>
      </div>

      <div style="text-align:center;clear:both; font-size: 20px;">
        认证中,请稍后{{dian}}
      </div>
    </div>
    <!-- ======================= 加载框(结束) =========================  -->
  </div>
</template>

<script>
  import {
    validUsername
  } from '@/utils/validate'

  export default {
    name: 'Login',
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        // 登入的加载flag
        loginLoadingFLag: false,
        // 登入的显示flag
        isLoginFormFlag: true,
        // 加载参数
        dianSize: 1,
        dian: '.',
        sendLoading: false,
        // 验证码倒计时定时器
        isSendInterVal: '',
        // 发送验证码倒数秒
        isSendLastInt: 60,
        // 是否可以发送验证码
        isSendFlagCode: true,
        // 发送验证码的按钮名字
        sendCodeBtn: '发送验证码',
        // 验证码登入Form
        loginCodeForm: {
          phone: '',
          code: ''
        },
        // 是否使用验证码登入
        isShowCodeLogin: false,
        // 是否使用用户名登入
        isShowUPLogin: true,
        loginForm: {
          username: 'admin',
          password: '111111'
        },
        loginRules: {
          username: [{
            required: true,
            trigger: 'blur',
            validator: validateUsername
          }],
          password: [{
            required: true,
            trigger: 'blur',
            validator: validatePassword
          }]
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined
      }
    },
    watch: {
      $route: {
        handler: function(route) {
          this.redirect = route.query && route.query.redirect
        },
        immediate: true
      }
    },
    methods: {
      // 发送验证码
      sendCode() {
        if (this.isSendFlagCode) {
          this.sendLoading = true;
          this.sendCodeBtn = "";
          this.isSendFlagCode = false;
          this.$message({
            showClose: true,
            message: '发送成功,请查看手机短信。',
            type: 'success'
          });

          // 发送短信业务逻辑


          // 调用倒计时函数
          this.lastInt();
        }
      },
      // 验证码倒计时函数
      lastInt() {
        this.isSendInterVal = setInterval(() => {
          this.sendLoading = false;
          this.isSendLastInt = this.isSendLastInt - 1;
          this.sendCodeBtn = "剩余" + this.isSendLastInt + "秒";
          if (this.isSendLastInt <= 0) {
            clearInterval(this.isSendInterVal);
            this.isSendLastInt = 120;
            // 打开重新发送的Flag
            this.isSendFlagCode = true;
            this.sendCodeBtn = "发送验证码";
          }
        }, 1000)
      },
      // 使用验证码或账号登入
      // state == true 使用账号 state == false 使用验证码
      isUseCodeOrUpByState(state) {
        if (state) {
          this.isShowUPLogin = true;
          this.isShowCodeLogin = false;
        } else {
          this.isShowUPLogin = false;
          this.isShowCodeLogin = true;
        }
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.isLoginFormFlag = false;
        this.loginLoadingFLag = true;

        setInterval(() => {
          this.dianSize++;
          if (this.dianSize == 1) {
            this.dian = ".";
          } else if (this.dianSize == 2) {
            this.dian = "..";
          } else if (this.dianSize == 3) {
            this.dian = "...";
            this.dianSize = 0;
          }
        }, 500);

          this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.$router.push({
                path: this.redirect || '/'
              })
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })

      }
    },
    created() {

    }
  }
</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#fff;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
</style>

<style lang="scss" scoped>
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  body {
    margin: 0;
    height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: black;
  }

  .loader {
    width: 20em;
    height: 20em;
    font-size: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px auto;
  }

  .loader .face {
    position: absolute;
    border-radius: 50%;
    border-style: solid;
    animation: animate 3s linear infinite;
  }

  .loader .face:nth-child(1) {
    width: 100%;
    height: 100%;
    color: gold;
    border-color: currentColor transparent transparent currentColor;
    border-width: 0.2em 0.2em 0em 0em;
    --deg: -45deg;
    animation-direction: normal;
  }

  .loader .face:nth-child(2) {
    width: 70%;
    height: 70%;
    color: lime;
    border-color: currentColor currentColor transparent transparent;
    border-width: 0.2em 0em 0em 0.2em;
    --deg: -135deg;
    animation-direction: reverse;
  }

  .loader .face .circle {
    position: absolute;
    width: 50%;
    height: 0.1em;
    top: 50%;
    left: 50%;
    background-color: transparent;
    transform: rotate(var(--deg));
    transform-origin: left;
  }

  .loader .face .circle::before {
    position: absolute;
    top: -0.5em;
    right: -0.5em;
    content: '';
    width: 1em;
    height: 1em;
    background-color: currentColor;
    border-radius: 50%;
    box-shadow: 0 0 2em,
      0 0 4em,
      0 0 6em,
      0 0 8em,
      0 0 10em,
      0 0 0 0.5em rgba(255, 255, 0, 0.1);
  }

  @keyframes animate {
    to {
      transform: rotate(1turn);
    }
  }


  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;

      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
