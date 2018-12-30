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

    <!-- 人机验证模态框 -->
    <ModalByZindex 
        class="machine-verify-modal"
        :isShow="isMachineModalShow" 
        :zindex="3" 
        @clickShade="isMachineModalShow = false"
    >
        <div class="modal-main-content">

            <!-- 拼图 -->
            <div class="main-content-jigsaw">
                <div class="content-jigsaw-refresh" id="slider-refresh" @click="getToken">
                    <svg width="23" height="23" t="1530243424799" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6039" xmlns:xlink="http://www.w3.org/1999/xlink" >
                        <path d="M55.935033 264.48948c0 0 85.897017-132.548409 221.81443-203.673173 135.916406-71.121743 303.368504-50.646859 413.187968 18.319527 109.819465 68.970415 146.791894 127.160016 146.791894 127.160016l94.59499-53.879895c0 0 19.576483-9.697092 19.576483 12.932142l0 338.379961c0 0 0 30.17399-22.837719 19.395191-19.210878-9.062571-226.959086-127.198289-292.424528-164.466828-35.950145-16.035251-4.365101-29.062068-4.365101-29.062068l91.284402-52.173738c0 0-52.068992-65.209619-128.278989-99.744682-81.576231-42.501826-157.948384-47.541735-251.497925-12.224097-61.002644 23.025054-132.823368 81.988166-184.553949 169.082716L55.935033 264.48948 55.935033 264.48948 55.935033 264.48948zM904.056909 711.697844c0 0-85.897017 132.550423-221.816444 203.671159-135.917413 71.12275-303.366489 50.651895-413.186961-18.315498-109.825508-68.972429-146.790886-127.165052-146.790886-127.165052L27.662591 823.768348c0 0-19.572454 9.703135-19.572454-12.932142L8.090137 472.459267c0 0 0-30.170968 22.831676-19.397205 19.211885 9.067607 226.965129 127.198289 292.430571 164.470856 35.950145 16.035251 4.366109 29.058039 4.366109 29.058039l-91.285409 52.175753c0 0 52.071006 65.206598 128.279996 99.744682 81.57321 42.498804 157.942341 47.540728 251.496918 12.222082 60.998616-23.026061 132.820346-81.983131 184.546898-169.082716L904.056909 711.697844 904.056909 711.697844 904.056909 711.697844zM904.056909 711.697844" p-id="6040" ></path>
                    </svg>
                </div>
                <img class="content-jigsaw-bg" :src="jigsawBgPicture ? ('data:image/jpg;base64,' + jigsawBgPicture) : ''" />
                <img class="content-jigsaw-front" :style="`left: ${jigsawMovepx}px; top: ${jigsawHeighty}px;`" :src="jigsawFrontPicture ? ('data:image/jpg;base64,' + jigsawFrontPicture) : ''" />
            </div>

            <!-- 滑块 -->
            <div class="main-content-slider">
                <div class="captcha-slider-drag" :class="sliderClassStatus">
                    <div class="slider-drag-mask" :style="'width: ' + jigsawMovepx  + 'px;'">
                        <div class="slider-drag-handle flex-center" ref="slider-drag-handle" :style="'left: ' + jigsawMovepx  + 'px;'">
                            <svg v-if="jigsawStatus === 'succeed'" width="24" height="24" t="1530238678016" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3369" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="#fff" d="M378.410667 850.450963C364.491852 850.450963 350.610963 845.293037 340.02963 834.939259L20.920889 523.529481C-0.279704 502.821926-0.279704 469.295407 20.920889 448.587852 42.121481 427.880296 76.48237 427.880296 97.682963 448.587852L378.410667 722.526815 925.75763 188.491852C946.958222 167.784296 981.319111 167.784296 1002.519704 188.491852 1023.720296 209.161481 1023.720296 242.688 1002.519704 263.395556L416.791704 834.939259C406.172444 845.293037 392.291556 850.450963 378.410667 850.450963L378.410667 850.450963Z" p-id="3370"></path>
                            </svg>
                            <svg v-else-if="jigsawStatus === 'failure'" width="32" height="32" t="1530238694639" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4162" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path fill="#fff" d="M733.952 336.333l-46.285-46.285L512 465.664 336.333 290.048l-46.285 46.285L465.664 512 290.048 687.667l46.285 46.285L512 558.336l175.667 175.616 46.285-46.285L558.336 512z" p-id="4163" ></path>
                            </svg>
                            <svg v-else width="23" height="23" t="1530238656201" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2557" xmlns:xlink="http://www.w3.org/1999/xlink">
                                <path d="M244.363636 556.939636h469.248l-184.762181 170.565819a34.909091 34.909091 0 1 0 47.36 51.29309l250.391272-231.121454a34.955636 34.955636 0 0 0 0-51.293091l-250.391272-231.121455a34.862545 34.862545 0 0 0-49.338182 1.95491 34.909091 34.909091 0 0 0 1.978182 49.338181l184.762181 170.565819H244.363636a34.909091 34.909091 0 1 0 0 69.818181" p-id="2558"></path>
                            </svg>
                        </div>
                    </div>
                    <div v-if="jigsawStatus === 'natural' || 'activate'" class="slider-drag-text" id="drag-text">向右滑动滑块验证</div>
                </div> 
            </div>
        </div>
    </ModalByZindex>
</div>
</template>

<script>
// 框架类
import axios from 'axios';
// 组件类
import ModalByZindex from '@/components/ModalByZindex';
import isMobiler from "@/utils/isMobiler";
// 配置类
import config from '@/config';

export default {
    name: 'Login',

    components: { ModalByZindex },

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
            baseToken: '', // 登录的token （登录之前的 token 都是用到这个，例如：滑动图片的高度）
            checkoutToken: '', // 获取 验证图片滑动距离 使用的 token
            loginToken: '', // 验证图片滑动距离成功 使用的 token

            loginForm: {
                username: '',
                password: ''
            },

            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },

            loading: false, // 登录加载
            pwdType: 'password',
            redirect: undefined, // 这个是重定向页面

            isMachineModalShow: false, // 是否显示人机验证码模态框

            /**
             * 滑动拼图状态
             * @param {String} natural 正常状态
             * @param {String} activate 激活
             * @param {String} succeed 成功
             * @param {String} failure 失败
             */
            jigsawStatus: 'natural',
            jigsawBgPicture: '', // 滑动拼图 背景
            jigsawFrontPicture: '', // 滑动拼图 滑块图
            jigsawHeighty: 0, // 滑动拼图 滑块图 距离图片顶部的距离
            jigsawMovepx: 0, // 滑动验证码移动的距离
        }
    },

    computed: {
        // 滑块 ClassName 计算属性
        sliderClassStatus: function () {
            let keyValue = {
                natural: 'slider-drag-natural',
                activate: 'slider-drag-activate',
                succeed: 'slider-drag-succeed',
                failure: 'slider-drag-failure',
            }
            
            return keyValue[this.jigsawStatus];
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

    mounted: function () {
        this.getToken(); // 获取登录用的token
    },

    methods: {
        /**
         * 获取登录用的token
         */
        getToken: function getToken() {
            const _this = this;

            axios({
                url: `${config.url.origin}/necrs/server/index`,
                method: 'get',
            })
            .then(res => {
                _this.baseToken = res.data.data.token;
                _this.getMachinePicture(); // 获取人机验证码图片
                _this.initSliderDrag(); // 初始化滑块拖动

            }).catch(error => console.error(error)); // 一般都不会报错
        },

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
                    _this.isMachineModalShow = true; // 数据校验成功, 打开人机验证码

                } else {
                    console.log('error submit!!');
                    return false

                }
            });
        },
        
		/**
		 * 初始化滑块拖动
		 */
        initSliderDrag: function initSliderDrag() {
            const _this = this;
            /**
             * 滑块 DOM
             */
            let dragHandle = this.$refs['slider-drag-handle'];
            let originX = 0; // 原始坐标 X轴

            /**
             * 验证滑动拼图（人机验证）成功, 请求登录
             */
            let loginByPC = () => {
                _this.loading = true; // 将按钮 设置为 登录中 防止重复提交
                console.log('请求登录', _this.loginToken)
                axios({
                    url: `${config.url.origin}/necrs/server/loginByPC`,
                    method: 'post',
                    headers: {'Content-Type': 'application/json'},
                    data: {
                        name: _this.loginForm.username,
                        password: _this.loginForm.password,
                        token: _this.loginToken,
                    }
                })
                .then(res => {
                    _this.loading = false; // 将按钮 设置为 已经登录

                    if (res.data.code === 1000) {
                        // 验证通过!
                        console.log(res.data.data)

                        window.sessionStorage.setItem('necrstoken', res.data.data.token);
                        window.localStorage.setItem('necrsusername', res.data.data.name);

                        // 初始化登录用户的权限
                        if (res.data.data.type === 1) { // 表示 平台用户
                            window.sessionStorage.setItem('necrsroles', 'platformer');

                        } else if (res.data.data.type === 2) { // 表示 修理厂用户 (维修单位)
                            window.sessionStorage.setItem('necrsroles', 'repaier');

                        } else if (res.data.data.type === 3) { // 表示 品牌厂家
                            window.sessionStorage.setItem('necrsroles', 'brander');

                        } else if (res.data.data.type === 4) { // 表示 租赁公司 (客户归属公司)
                            window.sessionStorage.setItem('necrsroles', 'renter');

                        } else {
                            return alert('此用户无任何权限.');
                        }

                        // 页面页面跳转， 如果存在 重定向页面优先跳转到重定向页面
                        _this.$router.push({ path: _this.redirect || '/' });

                    } else if (res.data.code === 1001) {
                        alert('非法请求，跳转到登陆页!');
                        _this.getToken(); // 重新获取图片

                    } else if (res.data.code === 1002) {
                        alert('用户名不能为空!!');
                        _this.getToken(); // 重新获取图片

                    } else if (res.data.code === 1003) {
                        alert('密码不能为空!');
                        _this.getToken(); // 重新获取图片

                    } else if (res.data.code === 1004) {
                        alert('登陆异常,请重新登陆!');
                        _this.getToken(); // 重新获取图片

                    } else if (res.data.code === 1005) {
                        alert('该用户不是系统用户!');
                        _this.getToken(); // 重新获取图片

                    } else if (res.data.code === 1006) {
                        alert('登陆异常,请重新登陆!');
                        _this.getToken(); // 重新获取图片

                    } else {
                        alert(res.data.msg);
                        _this.getToken(); // 重新获取验证码图片

                    }
                })
                .catch(error => {
                    _this.loading = false; // 将按钮 设置为 已经登录
                    _this.getToken(); // 获取登录用的token
                    alert(`请求登录失败, 原因：${JSON.stringify(error)}`);
                });
            }

            /**
             * 校验滑动图片距离是否正确
             */
            let checkoutDistance = () => {
                axios({
                    url: `${config.url.origin}/necrs/server/checkImage?token=${this.checkoutToken}&xWidth=${Math.floor(_this.jigsawMovepx)}`,
                    method: 'get',
                })
                .then(res => {
                    
                    if (res.data.code === 1000) { // 校验成功
                        _this.jigsawStatus = 'succeed'; // 将 滑动拼图状态 设置为 成功状态
                        _this.loginToken = res.data.data.token;

                        _this.isMachineModalShow = false; // 是否显示人机验证码模态框
                        loginByPC(); // 验证滑动拼图（人机验证）成功, 请求登录

                        setTimeout(function () {
                            _this.jigsawStatus = 'natural'; // 将 滑动拼图状态 设置为 正常状态
                            _this.jigsawMovepx = 0;

                        }, 2000);

                    } else { // 校验失败
                        _this.jigsawStatus = 'failure'; // 将 滑动拼图状态 设置为 失败
                        setTimeout(function () {
                            _this.jigsawStatus = 'natural'; // 将 滑动拼图状态 设置为 正常状态
                            _this.jigsawMovepx = 0;
                            _this.getToken(); // 重新获取验证码图片

                        }, 2000);
                    }
                })
                .catch(error => alert('向服务器请求验证图片失败'));
            }

            /**
             * 注册 触摸移动事件
             */
            let handleMouseMove = function handleMouseMove(event) {
                // 位移量
                if (isMobiler) { // 解决兼容问题
                    var mouseOffset = event.changedTouches[0].clientX - originX;
                } else {
                    // 兼容PC端
                    var mouseOffset = event.x - originX;
                }

                /**
                 * 判断是否在移动的范围内
                 */
                if (
                    mouseOffset > 0 &&  // 不能负数 范围内
                    mouseOffset < (360 - 60) // 不能超过 范围内
                ) {
                    _this.jigsawMovepx = mouseOffset;
                }
            }

            /**
             * 注册 触摸移动结束事件
             */
            let handleMouseEnd = function handleMouseEnd(event) {

                checkoutDistance(); // 校验滑动图片距离是否正确

                if (isMobiler) { // 解决兼容问题
                    window.removeEventListener('touchmove', handleMouseMove);
                    window.removeEventListener('touchend', handleMouseEnd);
                } else {
                    window.removeEventListener('mousemove', handleMouseMove);
                    window.removeEventListener('mouseup', handleMouseEnd);
                }
            }

            // 添加触摸事件
            if (isMobiler) { // 解决兼容问题
                dragHandle.addEventListener('touchstart', function (event) {
                    _this.jigsawStatus = 'activate'; // 将 滑动拼图状态 设置为 激活状态

                    originX = event.changedTouches[0].clientX; // 设置 X轴 原始坐标
    
                    window.addEventListener('touchmove', handleMouseMove);
                    window.addEventListener('touchend', handleMouseEnd);
                });
            } else {
                // 兼容PC端
                dragHandle.addEventListener('mousedown', function (event) {
                    _this.jigsawStatus = 'activate'; // 将 滑动拼图状态 设置为 激活状态

                    originX = event.x; // 设置 X轴 原始坐标
    
                    window.addEventListener('mousemove', handleMouseMove);
                    window.addEventListener('mouseup', handleMouseEnd);
                });
            }
        },
        
		/**
		 * 获取人机验证码图片
		 */
		getMachinePicture: function getMachinePicture() {
            const _this = this;

            axios({
                url: `${config.url.origin}/necrs/server/reqCheckImage?token=${this.baseToken}&width=360&height=160`,
                method: 'get',
            })
            .then(res => {
                _this.jigsawBgPicture = res.data.data.oriImagBase64; // 设置 滑动拼图 背景
                _this.jigsawFrontPicture = res.data.data.cutImagBase64; // 设置 滑动拼图 滑块图
                _this.jigsawHeighty = res.data.data.yHeight; // 设置 滑动拼图 滑块图 距离图片顶部的距离
                _this.checkoutToken = res.data.data.token; // 设置 获取 短信验证码 使用的 token

            }).catch(error => {

                _this.$confirm('获取人机验证码失败, 是否重新获取?')
                .then(action => {
                    _this.getToken();
                }, error => {});
            });
        },
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
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

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

// 人机验证模态框
.machine-verify-modal {
    // 内容 整体框架部分
    .modal-main-content {
        padding: 15px;
    }

    // 拼图部分
    .main-content-jigsaw {
        position: relative;

        // 刷新
        .content-jigsaw-refresh {
            position: absolute;
            top: 15px;
            right: 15px;
            cursor: pointer;

            svg {
                fill: #fff;
            }
        }

        .content-jigsaw-refresh:active {
            svg {
                fill: #F56C6C;
            }
        }

        .content-jigsaw-bg {
            display: block;
            height: 100%;
            width: 100%;
        }

        .content-jigsaw-front {
            position: absolute;
            top: 0px;
            display: block;
            outline: rgb(255, 255, 255);
            box-shadow: rgba(0, 0, 0, 0.36) 0px 2px 4px, rgba(0, 0, 0, 0.24) 0px 2px 4px;
        }
    }

    // 滑块
    .main-content-slider {
        
        // 滑块
        .captcha-slider-drag {
            position: relative;
            text-align: center;
            height: 40px;
            line-height: 40px;
            margin-top: 15px;
            background: #f7f9fa;
            color: #45494c;
            border: 1px solid #e4e7eb;

            .slider-drag-mask {
                position: absolute;
                left: 0;
                top: 0;
                height: 40px;
                border: 0 solid #1991FA;
                background: #D1E9FE;

                .slider-drag-handle {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 40px;
                    height: 40px;
                    background: #fff;
                    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
                    cursor: pointer;
                    transition: background 0.2s linear;
                    
                    svg {
                        fill: #606266;
                        transition: fill 0.2s linear;
                    }
                }

                .slider-drag-handle:hover {
                    background: #1991FA;
                    
                    svg {
                        fill: #fff;
                    }
                }
            }

            .slider-drag-text {
                color: $black2;
                font-size: 16px;
                text-align: center;
                line-height: 40px;
                user-select: none;
                -webkit-user-select: none;
            }
        }

        // 滑块激活
        .slider-drag-activate .slider-drag-mask {
            height: 38px;
            border: 1px solid #1991FA;

            .slider-drag-handle {
                height: 38px;
                top: -1px;
                background: #1991FA;
                border: 1px solid #1991FA;

                svg {
                    fill: #fff;
                }
            }
        }

        // 滑块成功
        .slider-drag-succeed .slider-drag-mask {
            height: 38px;
            border: 1px solid #52CCBA;
            background: #D2F4EF;

            .slider-drag-handle {
                height: 38px;
                top: -1px;
                background: #52CCBA;
                border: 1px solid #52CCBA;

                svg {
                    fill: #fff;
                }
            }

            .slider-drag-handle:hover {
                background: #52CCBA;
            }
        }
        
        // 滑块失败
        .slider-drag-failure .slider-drag-mask {
            height: 38px;
            border: 1px solid #f57a7a;
            background: #fce1e1;

            .slider-drag-handle {
                height: 38px;
                top: -1px;
                background: #f57a7a;
                border: 1px solid #f57a7a;

                svg {
                    fill: #fff;
                }
            }

            .slider-drag-handle:hover {
                background: #f57a7a;
            }
        }
    }
}
</style>
