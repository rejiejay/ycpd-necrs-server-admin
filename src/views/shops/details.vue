<!-- 单位管理详情 -->
<template>
<div class="shops-details">
    <!-- 顶部操作按钮 -->
    <div class="shops-details-operate flex-start-center">
        <div class="shops-operate-left flex-rest">
        </div>

        <div class="shops-operate-right  flex-start">
            <el-button 
                v-if="pageStatus === 'add'"
                type="primary"
                icon="el-icon-plus" 
                style="margin-right: 15px;"
            >添加</el-button>
            <el-button 
                v-else
                type="primary"
                icon="el-icon-edit" 
                style="margin-right: 15px;"
            >编辑</el-button>
            <el-button @click="$router.go(-1)">返回</el-button>
        </div>
    </div>
        
    <!-- 输入表单部分 -->
    <div class="shops-details-form">
        <el-row class="details-form-row">
            <el-col :span="11">
                <label class="details-form-tip">*</label>
                <span>单位名称</span>
                <div class="details-form-input">
                    <el-input
                        placeholder="请输入单位名称(必填)"
                        v-model="name"
                    ></el-input>
                </div>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
                <span>单位类型</span>
                <div class="details-form-input">
                    <el-select v-model="shopsType" placeholder="单位类型">
                        <el-option value="" label="请选择单位类型"></el-option>
                        <el-option
                            v-for="item in shopsTypeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>

        <el-row class="details-form-row">
            <el-col :span="11">
                <span>联系人</span>
                <div class="details-form-input">
                    <el-input
                        placeholder="请输入联系人"
                        v-model="linkman"
                    ></el-input>
                </div>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">
                <span>联系电话</span>
                <div class="details-form-input">
                    <el-input
                        placeholder="请输入联系电话"
                        v-model="phone"
                    ></el-input>
                </div>
            </el-col>
        </el-row>

        <el-row class="details-form-row">
            <el-col :span="11">
                <span>品牌</span>
                <div class="details-form-input">
                    <el-select v-model="brandList" multiple placeholder="请选择品牌">
                        <el-option
                            v-for="item in brandOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="11">&nbsp;</el-col>
        </el-row>
    </div>
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
            linkman: '',
            phone: '',

            // 单位类型下拉列表
            shopsType: '',
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

            // 品牌列表
            brandList: [],
            brandOptions: [
                {
                    value: 1, // 下拉对应数据库值
                    label: '品牌一', // 下拉描述
                }, {
                    value: 2,
                    label: '品牌二',
                }, {
                    value: '北汽',
                    label: '北汽',
                },
            ]
        } 
    },

	mounted: function mounted() {
        this.initBrandList(); // 初始化品牌列表

        // 是否存在id （上个页面传过来的）
        if (this.$route.query.id) {
            // 存在id, 页面设置为 编辑状态
            this.pageStatus = 'edit';
            this.id = this.$route.query.id;
            this.initPageData(this.$route.query.id); // 根据 id 初始化页面信息
        }
    },

	methods: {
        /**
         * 初始化品牌列表
         */
        initBrandList: function initBrandList() {
        },
        
        /**
         * 根据id初始化页面信息
         */
        initPageData: function initPageData(id) {
            this.name = 'xxxxxx新能源专业维修';
            this.shopsType = '维修单位';
            this.brandList = ['北汽'];
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
.shops-details-operate {
    padding: 15px;
}

// 
.shops-details-form {
    padding: 15px;

    .details-form-tip {
        color: #F56C6C;
    }

    .details-form-row {
        padding-bottom: 25px;
    }

    .details-form-input {
        padding-top: 5px;
        
        .el-select {
            width: 100%;
        }
    }
}

</style>
