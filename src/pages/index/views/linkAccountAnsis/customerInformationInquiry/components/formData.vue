<template>
    <el-card :class="$style.form_data">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
            <el-row>
                <el-col :xl="10" :lg="10" :md="10" :sm="24">
                    <!--<el-form-item prop="resultId" label="导入结果集" label-width="140px"-->
                    <!--style="display:inline-block; padding: 5px 0;">-->
                    <!--<el-select class="custom-width" clearable size="small"-->
                    <!--v-model="ruleForm.resultId">-->
                    <!--<el-option-->
                    <!--v-for="item in resultList"-->
                    <!--:key="item.resultId"-->
                    <!--:label="item.resultName"-->
                    <!--:value="item.resultId">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--<el-form-item prop="selectDateRange" label="统计区间" label-width="140px">-->
                    <!--<s-date-picker-->
                    <!--:value="ruleForm.selectDateRange"-->
                    <!--:isRange="true"-->
                    <!--@change="handleSdatePickerDateRangeChange"-->
                    <!--&gt;</s-date-picker>-->
                    <!--</el-form-item>-->
                    <el-form-item prop="contractCode" label="客户编码" label-width="100px">
                        <el-input clearable size="small" v-model="ruleForm.contractCode"
                                  class="custom-width"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xl="5" :lg="5" :md="5" :sm="24">
                    <el-form-item label-width="160px">
                        <el-button type="primary" @click="generateReportsClick('ruleForm')">生成报告</el-button>
                    </el-form-item>
                </el-col>
                <el-col :xl="5" :lg="5" :md="5" :sm="24">
                    <el-form-item label-width="60px">
                        <el-button type="primary" @click="generateReportsClick('ruleForm')">清除数据</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </el-card>
</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue';

    export default {
        name: "formData",
        // 父传子！
        props: {},

        components: {
            SDatePicker: () => import('@/components/index/common/SDatePicker')   // 时间区间
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                resultList: [{label: '结果集1', value: '1'}],
                // form 表单绑定值
                ruleForm: {
                    fileList: [],          // 导入CSV
                    exportType: '',       // 导入结果集按钮
                    contractCode: 'cu1712',        // 合约代码
                    resultId: '',         // 导入结果集
                    selectDateRange: ['2017-02-20', '2018-11-25']   // 统计区间
                },
                rules: {
                    contractCode: {
                        required: true,
                        message: '请输入合约代码'
                    },
                    selectDateRange: {
                        required: true,
                        message: '请选择统计区间'
                    }
                }
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            generateReportsClick() {
            },
            handleSdatePickerDateRangeChange() {
            },
        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .form_data {
        color: #13ce66;
    }

</style>
