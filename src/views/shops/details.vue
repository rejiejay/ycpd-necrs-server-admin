<!-- 单位管理详情 -->
<template>
<div class="shops-details">
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'shops-details',

	data: function data() { 
        return {
            /**
             * 页面状态
             * @param {string} add 新增状态
             * @param {string} edit 编辑状态
             */
            pageStatus: 'add', // 默认新增状态

            id: '', // 数据唯一标识
            name: '',
            type: '',
            brand: '',
            linkman: '',
            phone: '',
        } 
    },

	mounted: function mounted() {
        // 是否存在id （上个页面传过来的）
        if (this.$route.query.id) {
            // 存在id, 页面设置为 编辑状态
            this.pageStatus = 'edit';
            this.initPageData(this.$route.query.id); // 根据 id 初始化页面信息
        }
    },

	methods: {
        /**
         * 根据id初始化页面信息
         */
        initPageData: function initPageData(id) {
            this.name = 'xxxxxx新能源专业维修';
            this.type = '维修单位';
            this.brand = '北汽';
            this.linkman = '卢佩';
            this.phone = '18927403415';
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

            this.$router.push(routerConfig);
        },
    },

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
$black1: #303133;
$black2: #606266;
$black3: #909399;
$black4: #C0C4CC;

// 顶部操作按钮
.shops-operate {
    padding: 15px;
}

// 表单部分
.shops-table {
    padding: 15px;
}

// 分页部分
.shops-pagination {
    padding: 15px;
}

</style>
