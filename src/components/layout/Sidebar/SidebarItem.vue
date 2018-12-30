<!-- 侧边栏的一个项 -->
<template>
<div v-if="!item.hidden && item.children && rolesHandle(item.roles)" class="menu-wrapper"><!-- 侧边栏存在 children 的时候 并且 不是隐藏的时候才显示 -->

    <!-- 只有一个子列表的情况 -->
    <template v-if="
        hasOneShowingChild(item.children, item) && 
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) && 
        !item.alwaysShow"
    >
        <app-link :to="resolvePath(item.path)">

            <!-- 这个 index 是 饿了么框架 的对应标识 用来 判断是否激活 -->
            <el-menu-item :index="resolvePath(item.path)" :class="{'submenu-title-noDropdown': !isNest}">
                <item v-if="onlyOneChild.meta" :icon="onlyOneChild.meta.icon || item.meta.icon" :title="onlyOneChild.meta.title" />
            </el-menu-item>

        </app-link>
    </template>

    <!-- 有多个列表的情况 -->
    <el-submenu v-else :index="resolvePath(item.path)">
        <template slot="title">
            <item v-if="item.meta" :icon="item.meta.icon" :title="item.meta.title" />
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
            <sidebar-item class="nest-menu" 
                v-if="child.children && child.children.length > 0"
                :is-nest="true"
                :item="child"
                :key="child.path"
                :base-path="resolvePath(child.path)"
            ></sidebar-item>

            <app-link v-else :to="resolvePath(child.path)" :key="child.name">
                <el-menu-item :index="resolvePath(child.path)">
                    <item v-if="child.meta" :icon="child.meta.icon" :title="child.meta.title" />
                </el-menu-item>
            </app-link>
        </template>
    </el-submenu>

</div>
</template>

<script>
import path from 'path';
import Item from './Item';
import AppLink from './Link'; // 封装 点击链接

export default {
    name: 'SidebarItem',

    components: { Item, AppLink },

    props: {
        // route object
        item: {
            type: Object,
            required: true
        },

        isNest: {
            type: Boolean,
            default: false
        },

        basePath: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            onlyOneChild: null
        }
    },

    methods: {
        /**
         * 权限管理 处理函数
         * @param {array} roles 权限列表
         */
        rolesHandle: function rolesHandle(roles) {
            // 先判断是否传进来这个值
            if (!roles) {
                // 如果 没有值, 表示 不做权限这一块, 返回true 表示有权限
                return true
            }

            // 有值的情况表示做权限管理, 此时先判断是否数组
            if (roles instanceof Array === false) {
                alert('路由权限必须为数组'); // 弹出提示即可
                return false
            }

            // 在确认做权限管理的情况下, 进行权限过滤
            let isFilter = false; // 是否过滤到权限(默认未过滤)
            roles.map(val => {
                // 过滤成功
                if (val === window.sessionStorage.necrstoken) {
                    isFilter = true;
                }
            });

            return isFilter
        },

        /**
         * 只有一个子列表的时候的处理函数
         */
        hasOneShowingChild(children, parent) {
            const showingChildren = children.filter(item => {
                if (item.hidden) {
                    return false

                } else {
                    // Temp set(will be used if only has one showing child)
                    this.onlyOneChild = item;
                    return true

                }
            });

            // When there is only one child router, the child router is displayed by default
            // 其实这个判断完全没有必要, 因为 item.children 不存在的时候, 这整个 item 压根就不会渲染
            if (showingChildren.length === 1) {
                return true
            }

            // Show parent if there are no child router to display
            if (showingChildren.length === 0) {
                this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                return true
            }

            return false
        },

        /**
         * 处理路径
         * 这里主要是 过滤一下 https mailto tel
         * 如果未过滤到 https mailto tel， 将顶部的 basePath 加上 传进去的 routePath 算出点击的路径
         * @param {string} routePath 当前路径
         */
        resolvePath(routePath) {
            if (/^(https?:|mailto:|tel:)/.test(routePath)) {
                return routePath;
            }

            return path.resolve(this.basePath, routePath);
        },

        /**
         * 跳转到路由
         * @param {object} query 携带的参数 非必填
         */
        jumpToRouter: function jumpToRouter(url, query) {
            let routerConfig = {
                path: url,
            }

            query ? routerConfig.query = query : null; // 初始化携带的参数 非必填

            this.$router.replace(routerConfig);
        },
    }
}
</script>
