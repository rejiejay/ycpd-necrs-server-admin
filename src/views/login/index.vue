<!-- 登录 -->
<template>
<div class="login-container">

    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

        <h3 class="title">新能源洗车维修管理平台</h3>

        <!-- 账号 -->
        <el-form-item prop="username">
            <span class="svg-container">
                <svg-icon icon-class="user" />
            </span>
            <el-input 
                v-model="loginForm.username" 
                name="username" 
                type="text" 
                auto-complete="on" 
                placeholder="请输入手机号" 
            ></el-input>
        </el-form-item>

        <!-- 密码 -->
        <el-form-item prop="password">
            <span class="svg-container">
                <svg-icon icon-class="password" />
            </span>
            <el-input
                :type="pwdType"
                v-model="loginForm.password"
                name="password"
                auto-complete="on"
                placeholder="请输入密码"
                @keyup.enter.native="handleLogin" 
            ></el-input>
            <span class="show-pwd" @click="showPwd">
                <svg-icon icon-class="eye" />
            </span>
        </el-form-item>
        

        <!-- 登录按钮 -->
        <el-form-item>
            <el-button :loading="loading" type="primary" style="width:100%;" @click.native.prevent="handleLogin">
                登录
            </el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import { login } from '@/api/user';

export default {
    name: 'Login',

	data: function data() { 
        /**
         * 用户名校验的方法
         */
        const validateUsername = (rule, value, callback) => {
            callback(); // 暂时无校验规则
        }

        /**
         * 密码校验的方法
         */
        const validatePass = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位'));

            } else {
                callback();

            }
        }

        return {
            loginForm: {
                username: '',
                password: ''
            },

            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },

            loading: false,
            pwdType: 'password',
            redirect: undefined, // 这个是重定向页面
        }
    },

    watch: {
        /**
         * 监听路由改变
         */
        $route: {
            handler: function handler(route) {
                // 如果路由发生改变则赋值到重定向页面
                this.redirect = route.query && route.query.redirect;
            },

            immediate: true,
        }
    },

    methods: {
        /**
         * 显示密码的方法
         */
        showPwd: function showPwd() {
            if (this.pwdType === 'password') {
                this.pwdType = '';

            } else {
                this.pwdType = 'password';

            }
        },

        /**
         * 点击登录
         */
        handleLogin() {
            const _this = this;

            this.$refs.loginForm.validate(valid => {
                // 判断校验是否成功
                if (valid) {
                    this.loading = true; // 将按钮 设置为 登录中 防止重复提交

                    login(_this.loginForm.username, _this.loginForm.username)
                    .then(res => {
                        // 将按钮 设置为 已经登录
                        this.loading = false;

                        window.sessionStorage.setItem('necrstoken', res.data.token);
                        window.localStorage.setItem('necrsusername', res.data.username);
                        window.sessionStorage.setItem('necrsroles', res.data.roles);

                        // 页面页面跳转
                        this.$router.push({ path: this.redirect || '/' });

                    }).catch(error => {
                        console.log(error)
                        this.loading = false
                    });

                } else {
                    console.log('error submit!!');
                    return false

                }
            });
        }
    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#eee;

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
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #fff !important;
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

<style rel="stylesheet/scss" lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 520px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
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
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
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
