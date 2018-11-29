<!--客户交易信息查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="customerID" label="客户编码：" label-width="100px">
                            <el-input clearable size="small" v-model="ruleForm.customerID"
                                      style="width: 100%;"  class="custom-width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="selectDateRange" label="统计区间" label-width="100px">
                        <s-date-picker
                        :value="ruleForm.selectDateRange"
                        :isRange="true"
                        @change="handleSdatePickerDateRangeChange"
                        ></s-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button type="primary"
                                       @click="customerTransactionsClick('ruleForm')">生成报告</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`客户交易信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-tabs v-model="activeName" type="card">
                    <el-tab-pane
                        v-for="active in activeNameList"
                        :label="active.label"
                        :key="active.name"
                        :name="active.name">
                        <!--<s-table :columns="active.columnsCTrI2" :tableData="active.tableData2">-->
                        <!--</s-table>-->
                        <el-table
                            size="small"
                            ref="multipleTable"
                            height="450"
                            highlight-current-row
                            tooltip-effect="dark"
                            :data="active.tableDataList"
                            border
                            style="width: 100%;">
                            <el-table-column
                                v-for="(item,index) in active.tableColumns"
                                :key="item.field"
                                :prop="item.field"
                                :label="item.label"
                                :align="item.align"
                                :min-width="item.width">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </s-card>
    </div>
</template>

<script>

    import {
        postCustomerTransactions,     // 客户交易信息查询(生成报告接口)
    } from '@/api/dataAnsis/customerInformationInquiry';

    import {
        activeNameList,
        columnsCTrI2,    // 客户交易信息查询 (假数据)
        tableData2,    // 客户交易信息查询(列表头)
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
                activeName: activeNameList[0].name,
                activeNameList: activeNameList,
                tableData2: [],                // 客户交易信息查询
                columnsCTrI2: columnsCTrI2,    // 客户交易信息查询(列表头)
                resultList: [{label: '结果集1', value: '1'}],
                // form 表单绑定值
                ruleForm: {
                    customerID: 'cu1712',        // 合约代码
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
            handleSdatePickerDateRangeChange(val) {
                this.ruleForm.selectDateRange = val;
            },


            // 客户交易信息查询(生成报告)
            customerTransactionsClick(){
                this.$refs['ruleForm'].validate(valid => {
                    if(valid){
                        let params = {
                            "custId": this.ruleForm.customerID,       // 客户编码
                            "timeBegin": this.ruleForm.selectDateRange[0],   // 统计区间(开始)
                            "timeEnd": this.ruleForm.selectDateRange[1],   // 统计区间(结束)
                        }
                        postCustomerTransactions(params).then(resp => {
                            this.tableData2 = tableData2;
                        })
                    }
                })
            },
        },
        // 初始化数据
        mounted() {
            // this.customerTransactionsClick();
        },
    }
</script>

<style lang="less" module>
</style>
