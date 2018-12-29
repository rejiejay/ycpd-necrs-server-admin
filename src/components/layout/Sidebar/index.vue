<!-- 侧边栏 -->
<template>
    <!-- 饿了么框架的一层包裹 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
            :show-timeout="200"
            :default-active="$route.path"
            :collapse="isCollapse"
            mode="vertical"
            background-color="#304156"
            text-color="#bfcbd9"
            active-text-color="#409EFF"
        >
            <!-- 这个才是比较核心的 -->
            <sidebar-item 
                v-for="route in routes" 
                :key="route.path" 
                :item="route" 
                :base-path="route.path"
            />
        </el-menu>
    </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';

export default {
    components: { SidebarItem },

    computed: {
        ...mapGetters([
            'sidebar'
        ]),
        
        routes() {
            return this.$router.options.routes
        },

        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>
