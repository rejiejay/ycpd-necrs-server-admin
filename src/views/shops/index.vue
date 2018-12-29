<!-- 单位管理列表 -->
<template>
<div class="shops-container">
    <!-- 顶部操作按钮 -->
    <div class="shops-operate flex-start-center">
        <div class="shops-operate-left flex-rest">
            <el-button type="danger" icon="el-icon-plus" @click="jumpToRouter('/shops/details')">添加</el-button>
        </div>

        <div class="shops-operate-right  flex-start">
            
            <el-select v-model="shopsType" placeholder="单位类型" style="margin-right: 15px;">
                <el-option value="" label="请选择单位类型"></el-option>
                <el-option
                    v-for="item in shopsTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>

            <el-input
                placeholder="关键字搜索"
                prefix-icon="el-icon-search"
                v-model="search">
            </el-input>
        </div>
    </div>

    <!-- 表单部分 -->
    <div class="shops-table">
        <el-table :data="shopslist" border>
            <el-table-column
                prop="name"
                label="单位名称"
            ></el-table-column>
            <el-table-column
                prop="type"
                label="单位类型"
            ></el-table-column>
            <el-table-column
                prop="brand"
                label="品牌"
            ></el-table-column>
            <el-table-column
                prop="linkman"
                label="联系人"
            ></el-table-column>
            <el-table-column
                prop="phone"
                label="联系电话"
            ></el-table-column>
            <el-table-column fixed="right" label="操作">
                <template slot-scope="scope">
                    <div class="flex-start-center">
                        <el-button @click="editHandle(scope.row)" type="primary" icon="el-icon-edit" size="small">编辑</el-button>
                        <el-button @click="deleteHandle(scope.row)" type="danger" icon="el-icon-delete" size="small">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>

    <!-- 分页部分 -->
    <div class="shops-pagination flex-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :total="pageTotal"
            @current-change="pageChangeHandle"
            layout="sizes, prev, pager, next, jumper"
        ></el-pagination>
    </div>

</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'shops',

	data: function data() { 
        return {
            // 单位类型
            shopsType: '',

            // 单位类型下拉列表
            shopsTypeOptions: [
                {
                    value: 1, // 下拉对应数据库值
                    label: '品牌厂家', // 下拉描述
                }, {
                    value: 2,
                    label: '维修单位',
                }, {
                    value: 3,
                    label: '租赁公司',
                },
            ],

            // 关键字搜索
            search: '',

            // 列表数据
            shopslist: [
                {
                    id: '1', // 数据唯一标识
                    name: 'xxxxxx新能源专业维修',
                    type: '维修单位',
                    brand: '北汽',
                    linkman: '卢佩',
                    phone: '18927403415',
                },
            ],

            /**
             * 分页相关
             */
            currentPage: 1, // 当前页码
            pageSize: 20, // 一个页面多少数据
            pageTotal: 1, // 一共多少条数据 
        } 
    },

	mounted: function mounted() {},

	methods: {
        /**
         * 编辑一个项
         */
        editHandle: function editHandle(item) {
            this.jumpToRouter('/shops/details', {id: item.id});
        },

        /**
         * 删除一个项
         */
        deleteHandle: function deleteHandle(item) {
            console.log(item);
        },

        /**
         * 分页改变的时候处理函数
         */
        pageChangeHandle: function pageChangeHandle(item) {
            console.log(item);
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
