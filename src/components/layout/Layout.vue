<!-- 侧边栏 以及 顶部 -->
<template>
<div :class="classObj" class="app-wrapper">
    <!-- 侧边栏的遮罩, 手机端的时候会用到 -->
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    
    <!-- 侧边栏 -->
    <sidebar class="sidebar-container"></sidebar>

    <div class="main-container">
        <!-- 顶部栏 -->
        <navbar></navbar>

        <!-- 内容区域 -->
        <app-main></app-main>
    </div>
</div>
</template>

<script>
// 框架类
import store from '@/store';
// 组件类
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import AppMain from './AppMain';
// 初始化
const { body } = document;
const WIDTH = 1024;
const RATIO = 3;

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },

    watch: {
        $route(route) {
            if (this.device === 'mobile' && this.sidebar.opened) {
                store.dispatch('CloseSideBar', { withoutAnimation: false })
            }
        }
    },

    beforeMount() {
        window.addEventListener('resize', this.resizeHandler);
    },

    mounted() {
        const isMobile = this.isMobile();
        if (isMobile) {
            store.dispatch('ToggleDevice', 'mobile');
            store.dispatch('CloseSideBar', { withoutAnimation: true });
        }
    },

    computed: {
        sidebar() {
            return this.$store.state.app.sidebar
        },

        device() {
            return this.$store.state.app.device
        },

        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
                mobile: this.device === 'mobile'
            }
        }
    },

    methods: {
        /**
         * 判断是否手机端
         */
        isMobile() {
            const rect = body.getBoundingClientRect();
            return rect.width - RATIO < WIDTH;
        },

        /**
         * 
         */
        resizeHandler() {
            if (!document.hidden) {
                const isMobile = this.isMobile();
                store.dispatch('ToggleDevice', isMobile ? 'mobile' : 'desktop');

                if (isMobile) {
                    store.dispatch('CloseSideBar', { withoutAnimation: true });
                }
            }
        },

        /**
         * 关闭侧边栏的方法
         */
        handleClickOutside() {
            this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
        },
    }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;

        &.mobile.openSidebar{
            position: fixed;
            top: 0;
        }
    }

    .drawer-bg {
        background: #000;
        opacity: 0.3;
        width: 100%;
        top: 0;
        height: 100%;
        position: absolute;
        z-index: 999;
    }
</style>
