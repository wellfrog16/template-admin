<!--客户交易信息查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="customerID" label="客户编码：" label-width="100px">
                            <el-input clearable size="small" v-model="ruleForm.customerID"
                                      style="width: 100%;" class="custom-width"></el-input>
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
                                       @click="customerTransactionsClick('ruleForm')">生成报告
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`客户交易信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane
                        v-for="active in activeNameList"
                        :label="active.label"
                        :key="active.name"
                        :name="active.name">
                        <s-table
                            :loading="loadingCustomerAddress"
                            :columns="active.tableColumns"
                            :tableData="active.tableData">
                        </s-table>
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
                loadingCustomerAddress: false,
                activeName: 'first',

                // 客户交易信息查询
                activeNameList: [
                    {
                        name: 'first',
                        label: '客户持仓明细',                   // overStoreAnalysis
                        tableColumns: [
                            {field: "tradingDay", label: "交易日", width: '', align: ''},
                            {field: "custName", label: "客户名称", width: '', align: ''},
                            {field: "orgrumentId", label: "合约代码", width: '', align: ''},
                            {field: "clientId", label: "客户代码", width: '', align: ''},
                            {field: "posMultiQtty", label: "持多单量", width: '', align: ''},
                            {field: "posBillQtty", label: "持空单量", width: '', align: ''},
                            {field: "hedgeflag", label: "投机套保标志", width: '', align: ''},
                            {field: "positionsum", label: "当前持仓金额", width: '', align: ''},
                            {field: "openprofit", label: "浮动盈亏", width: '', align: ''},
                            {field: "margin", label: "保证金", width: '', align: ''},
                            {field: "duemargin", label: "应收保证金", width: '', align: ''},
                        ],
                        tableData: [],
                    },
                    {
                        label: '客户报单明细',
                        name: 'second',
                        tableColumns: [
                            {field: "custCode", label: "客户编号", width: '', align: ''},
                            {field: "custName", label: "客户名称", width: '', align: ''},
                            {field: "tradingDay", label: "交易日", width: '', align: ''},
                            {field: "declDay", label: "报单日期", width: '', align: ''},
                            {field: "reportid", label: "报单编号", width: '', align: ''},
                            {field: "contrCode", label: "合约代码", width: '', align: ''},
                            {field: "declPriceCond", label: "报单价格条件", width: '', align: ''},
                            {field: "buySell", label: "买卖方向", width: '', align: ''},
                            {field: "comHedgeflag", label: "组合投机套保标志", width: '', align: ''},
                            {field: "price", label: "价格", width: '', align: ''},
                            {field: "quantity", label: "数量", width: '', align: ''},
                            {field: "volType", label: "成交量类型", width: '', align: ''},
                            {field: "declType", label: "报单类型", width: '', align: ''},
                            {field: "todayVolQuantity", label: "今成交数量", width: '', align: ''},
                            {field: "residueQuantity", label: "剩余数量", width: '', align: ''},
                            {field: "changeTime", label: "最后修改时间", width: '', align: ''},
                            {field: "cancelTime", label: "撤销时间", width: '', align: ''},
                        ],
                        tableData: [],
                    }, {
                        label: '客户成交明细',
                        name: 'third',
                        tableColumns: [
                            {field: "custCode", label: "客户编号", width: '', align: ''},
                            {field: "custName", label: "客户名称", width: '', align: ''},
                            {field: "tranId", label: "成交编号", width: '', align: ''},
                            {field: "buySell", label: "买卖方向", width: '', align: ''},
                            {field: "hedgeFlag", label: "组合投机套保标志", width: '', align: ''},
                            {field: "reportId", label: "报单编号", width: '', align: ''},
                            {field: "tradeRole", label: "交易角色", width: '', align: ''},
                            {field: "contrCode", label: "合约代码", width: '', align: ''},
                            {field: "kaipingFlag", label: "开平标志", width: '', align: ''},
                            {field: "price", label: "价格", width: '', align: ''},
                            {field: "quantity", label: "数量", width: '', align: ''},
                            {field: "tranday", label: "成交时间", width: '', align: ''},
                        ],
                        tableData: [],
                    }
                ],

                // form 表单绑定值
                ruleForm: {
                    customerID: '',        // 合约代码   20180000025
                    selectDateRange: []   // 统计区间    '2017-02-01', '2018-12-31'
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
            handleClick(val){
                // console.log(this.activeName);
            },

            // 客户交易信息查询(生成报告)
            customerTransactionsClick() {
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        let params = {
                            "custId": this.ruleForm.customerID,       // 客户编码
                            "timeBegin": this.ruleForm.selectDateRange[0],   // 统计区间(开始)
                            "timeEnd": this.ruleForm.selectDateRange[1],   // 统计区间(结束)
                        }
                        this.loadingCustomerAddress = true;
                        postCustomerTransactions(params).then(resp => {
                            this.loadingCustomerAddress = false;
                            this.activeNameList[0].tableData = resp.tradeInfoList;
                            this.activeNameList[1].tableData = resp.tradeInfoDeal;
                            this.activeNameList[2].tableData = resp.tradeInfoFormList;
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
