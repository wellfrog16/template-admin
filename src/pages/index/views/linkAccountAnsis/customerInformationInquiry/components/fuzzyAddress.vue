<!--模糊地址查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="8" :lg="8" :md="8" :sm="24">
                        <el-form-item prop="nationy" label="国家：" label-width="70px">
                            <el-select style="width: 100%;"
                                v-model="ruleForm.nationy"
                                class="custom-width" clearable size="small"
                                placeholder="指标选择">
                                <el-option
                                    v-for="item in nationyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="8" :lg="8" :md="8" :sm="24">
                        <el-form-item prop="nationy" label="省：" label-width="50px">
                            <el-select style="width: 100%;"
                                v-model="ruleForm.nationy"
                                class="custom-width" clearable size="small"
                                placeholder="指标选择">
                                <el-option
                                    v-for="item in nationyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="8" :lg="8" :md="8" :sm="24">
                        <el-form-item prop="nationy" label="市：" label-width="50px">
                            <el-select style="width: 100%;"
                                v-model="ruleForm.nationy"
                                class="custom-width" clearable size="small"
                                placeholder="指标选择">
                                <el-option
                                    v-for="item in nationyOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="8" :lg="8" :md="8" :sm="8">
                        <el-form-item prop="contractCode" label="地址" label-width="70px">
                            <el-input clearable size="small" v-model="ruleForm.contractCode"
                                      style="width: 100%;" class="custom-width">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="50px">
                            <el-button type="primary" @click="fuzzyAddressClick('ruleForm')">生成报告</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="50px">
                            <el-button type="primary" @click="fuzzyClearClick('ruleForm')">清除数据</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`模糊地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table :columns="this.columnsCTrI4" :tableData="tableData4">
                </s-table>
            </div>
        </s-card>
    </div>
</template>

<script>

    import {
        postFuzzyAddress,           // 模糊地址查询(生成报告接口)
    } from '@/api/dataAnsis/customerInformationInquiry';
    import {
        columnsCTrI4,     // 模糊地址查询数据  (假数据)
        tableData4,    // 模糊地址查询(列表头)
        indexSelectionOptions  // 指标选择
    } from '../../customerInformationInquiry/components/constants';

    export default {
        name: "customerAddress",
        // 父传子！
        props: {},
        components: {
            SCard: () => import('@/components/index/common/SCard'),               // 边框
            SDatePicker: () => import('@/components/index/common/SDatePicker'),   // 时间区间
            STable: () => import('@/components/index/common/STable'),             // 列表
        },
        // 存储数据
        data() {
            return {
                tableData4: [],                // 模糊地址查询数据
                columnsCTrI4: columnsCTrI4,    // 模糊地址查询(列表头)
                resultList: [{label: '结果集1', value: '1'}],
                // form 表单绑定值
                nationyOptions: [],
                ruleForm: {
                    nationy: '',       // 导入结果集按钮
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
            }

        },
        //    数据交互  127662
        methods: {
            // 时间
            handleSdatePickerDateRangeChange() {
            },

            // 模糊地址查询清除数据
            fuzzyClearClick() {
            },

            // 模糊地址查询(生成报告)
            fuzzyAddressClick(){
                this.tableData4 = tableData4;
            },
        },
        // 初始化数据
        mounted() {
            this.fuzzyAddressClick();
        },
    }
</script>

<style lang="less" module>
</style>
