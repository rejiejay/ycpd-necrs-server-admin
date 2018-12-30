<template>
    <el-menu class="navbar" mode="horizontal">
    
        <div class="hamburger-container">
            <svg t="1492500959545" class="hamburger" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1691"
                :class="{ 'is-active': sidebar.opened }"
                width="64"
                height="64"
                @click="toggleSideBar"
            >
                <path d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z" p-id="1692" />
                <path d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z" p-id="1693" />
                <path d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z" p-id="1694" />
            </svg>
        </div>

        <!-- 面包屑 用于定位自己在哪 -->
        <el-breadcrumb class="app-breadcrumb" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item,index) in levelList" v-if="item.meta.title" :key="item.path">
                    <span v-if="item.redirect === 'noredirect' || index == (levelList.length - 1) " class="no-redirect">
                        {{ item.meta.title }}
                    </span>
                    
                    <a v-else @click.prevent="handleLink(item)">
                        {{ item.meta.title }}
                    </a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>

        <el-dropdown class="avatar-container" trigger="click">
            <!-- 头像部分 -->
            <div class="avatar-wrapper">
                <svg width="40" height="40" class="user-avatar" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="图片" transform="translate(-412.000000, -158.000000)"><g id="默认头像" transform="translate(412.000000, 158.000000)"><rect id="Rectangle-13" fill="#E6EAF0" x="0" y="0" width="256" height="256"></rect><circle id="Oval-10" fill="#B8C5D1" cx="128" cy="85" r="45"></circle><path d="M128,140 L128,140 C177.705627,140 218,180.294373 218,230 L218,256 L38,256 L38,230 C38,180.294373 78.2943725,140 128,140 Z" id="Rectangle" fill="#FFFFFF"></path></g></g></g></svg>
                <span v-if="username">{{username}}</span>
                <i class="el-icon-caret-bottom"></i>
            </div>

            <!-- 下拉部分 -->
            <el-dropdown-menu slot="dropdown" class="user-dropdown">

                <router-link class="inlineBlock" to="/">
                    <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                
                <el-dropdown-item divided>
                    <span style="display:block;" @click="logout">退出</span>
                </el-dropdown-item>
                
            </el-dropdown-menu>
        </el-dropdown>
    </el-menu>
</template>

<script>
// 框架类
import pathToRegexp from 'path-to-regexp';
// 组件类
import { mapGetters } from 'vuex';
// 请求类
import { logout } from '@/api/user';

export default {
    data() {
        return {
            /**
             * 面包屑的层级
             */
            levelList: null,

            username: window.localStorage.necrsusername ? window.localStorage.necrsusername : '',
        }
    },

    computed: {
        ...mapGetters([
            'sidebar'
        ]),
    },

    watch: {
        /**
         * 监听路由发生改变
         */
        $route() {
            this.getBreadcrumb();
        }
    },

    created() {
        this.getBreadcrumb();
    },

    methods: {
        /**
         * 切换侧边栏的方法
         */
        toggleSideBar() {
            this.$store.dispatch('ToggleSideBar')
        },
        
        /**
         * 登出的方法
         */
        logout() {
            logout()
            .then(res => {
                window.sessionStorage.removeItem('necrstoken');
                this.$router.push('/login');
                location.reload(); // 为了重新实例化vue-router对象 避免bug

            }).catch(error => console.error(error)); // 一般都不会报错
        },
        
        /**
         * 获取面包屑
         */
        getBreadcrumb() {
            // 获取
            let matched = this.$route.matched.filter(item => {
                if (item.name) {
                    return true;
                }
            });

            const first = matched[0];
            if (first && first.name !== '') {
                matched = [
                    { 
                        path: '/', 
                        meta: { title: '新能源洗车维修管理平台' }
                    },
                ].concat(matched);
            }

            this.levelList = matched;
        },
        
        /**
         * 处理面包屑点击跳转
         */
        handleLink(item) {
            const _this = this;
            const { redirect, path } = item;

            if (redirect) {
                this.$router.push(redirect)
                return
            }
        
            /**
             * 处理跳转路径
             */
            function pathCompile(path) {
                // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
                const params = _this.$route.params;
                var toPath = pathToRegexp.compile(path);

                return toPath(params);
            }

            this.$router.push(pathCompile(path))
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;

    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }

    .hamburger {
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        transform: rotate(90deg);
        transition: .38s;
        transform-origin: 50% 50%;
    }

    .hamburger.is-active {
        transform: rotate(0deg);
    }

    .screenfull {
        position: absolute;
        right: 90px;
        top: 16px;
        color: red;
    }

    .app-breadcrumb.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;

        .no-redirect {
            color: #97a8be;
            cursor: text;
        }
    }

    .avatar-container {
        height: 50px;
        display: inline-block;
        position: absolute;
        right: 35px;

        .avatar-wrapper {
            cursor: pointer;
            margin-top: 5px;
            position: relative;
            line-height: initial;

            .user-avatar {
                width: 40px;
                height: 40px;
                border-radius: 10px;
            }

            span {
                padding-left: 10px;
                position: relative;
                bottom: 5px;
            }

            .el-icon-caret-bottom {
                position: absolute;
                right: -20px;
                top: 25px;
                font-size: 12px;
            }
        }
    }
}
</style>

