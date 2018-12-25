<!-- 侧边栏 以及 顶部 -->

<template>
<div :class="classObj" class="app-wrapper">
    <!-- 侧边栏的遮罩, 手机端的时候会用到 -->
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    
    <sidebar class="sidebar-container"></sidebar>

    <div class="main-container">
        <navbar></navbar>
        <app-main></app-main>
    </div>
</div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
    name: 'Layout',
    components: {
        Navbar,
        Sidebar,
        AppMain
    },

    mixins: [ResizeMixin],

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
