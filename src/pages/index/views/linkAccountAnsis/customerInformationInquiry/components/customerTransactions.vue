<!--客户交易信息查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="customerID" label="客户编码：" label-width="100px">
                            <el-input
                                clearable
                                size="small"
                                v-model="ruleForm.customerID"
                                style="width: 100%;"
                                class="custom-width"
                            ></el-input>
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
                        <el-form-item label-width="200px">
                            <el-button
                                type="primary"
                                size="small"
                                @click="customerTransactionsClick('ruleForm')"
                            >生成报告</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`客户交易信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane
                        v-for="(active, i) in activeNameList"
                        :label="active.label"
                        :key="active.name"
                        :name="active.name"
                    >
                        <s-table
                            :height="320"
                            :loading="loadingCustomerAddress"
                            :columns="active.tableColumns"
                            :tableData="active.tableData"
                            :showPagination="true"
                            @handlePaginationChange="getPagination"
                            :pagination="pagination[i]"
                            :totalNum="totalNum[i]"
                        ></s-table>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </s-card>
    </div>
</template>
<script>
import {
    postCustomerTransactions // 客户交易信息查询(生成报告接口)
} from '@/api/dataAnsis/customerInformationInquiry';
import {activeNameList} from '../components/constants';
import moment from 'moment';
export default {
    name: 'customerAddress',
    // 父传子！
    props: {},
    components: {
        SCard: () => import('@/components/index/common/SCard'),
        SDatePicker: () => import('@/components/index/common/SDatePicker'),
        STable: () => import('@/components/index/common/STable')
    },
    // 存储数据
    data() {
        return {
            loadingCustomerAddress: false,
            activeName: '1',
            showPagination: true,
            pagination: [
                {pageIndex: 1, pageRows: 20},
                {pageIndex: 1, pageRows: 20},
                {pageIndex: 1, pageRows: 20}
            ],
            totalNum: [0, 0, 0],
            // 客户交易信息查询
            activeNameList: activeNameList,
            // form 表单绑定值
            ruleForm: {
                customerID: '', // 客户编号   20180000025 // 80000012
                selectDateRange: [
                    new Date(moment().subtract(1, 'months').format('YYYY-MM-DD')),
                    new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))
                ]
            },
            rules: {
                customerID: {
                    required: true,
                    message: '请输入客户编号'
                },
                selectDateRange: {
                    required: true,
                    message: '请选择统计区间'
                }
            }
        };
    },
    //    数据交互  127662
    methods: {
        // 时间
        handleSdatePickerDateRangeChange(val) {
            this.ruleForm.selectDateRange = val;
        },
        handleClick(val) {},
        // 客户交易信息查询(生成报告)
        customerTransactionsClick() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.activeNameList[0].tableData = [];
                    this.activeNameList[1].tableData = [];
                    this.activeNameList[2].tableData = [];
                    this.totalNum[0] = 0;
                    this.totalNum[1] = 0;
                    this.totalNum[2] = 0;
                    let params = {
                        'custId': this.ruleForm.customerID, // 客户编码
                        'timeBegin': moment(this.ruleForm.selectDateRange[0]).format('YYYY-MM-DD'), // 统计区间(开始)
                        'timeEnd': moment(this.ruleForm.selectDateRange[1]).format('YYYY-MM-DD'), // 统计区间(结束)
                        'tabId': '0', // （"0":全部，"1":持仓，"2":报单，"3":成交）
                        'pageSize': 20, // 每页查询条数
                        'pageNo': 1
                    };
                    this.loadingCustomerAddress = true;
                    postCustomerTransactions(params).then(resp => {
                        this.loadingCustomerAddress = false;
                        this.activeNameList[0].tableData = resp.tradeInfoList;
                        this.activeNameList[1].tableData = resp.tradeInfoFormList;
                        this.activeNameList[2].tableData = resp.tradeInfoDeal;
                        this.totalNum[0] = resp.tradeInfoVOListTotal; // 持仓明细记录总数
                        this.totalNum[1] = resp.tradeInfoFormVOSTotal; // 报单明细记录总数
                        this.totalNum[2] = resp.tradeInfoDealTotal; // 成交明细记录总数
                    }).catch(e => {
                        this.loadingCustomerAddress = false;
                    });
                }
            });
        },
        // 分页
        getPagination(val) {
            this.pagination[this.activeName - 1] = val;
            let params = {
                'custId': this.ruleForm.customerID, // 客户编码
                'timeBegin': moment(this.ruleForm.selectDateRange[0]).format('YYYY-MM-DD'), // 统计区间(开始)
                'timeEnd': moment(this.ruleForm.selectDateRange[1]).format('YYYY-MM-DD'), // 统计区间(结束)
                'tabId': this.activeName, // （"0":全部，"1":持仓，"2":报单，"3":成交）
                'pageSize': val.pageRows, // 每页查询条数
                // 页码
                'pageNo': val.pageIndex
            };
            this.loadingCustomerAddress = true;
            postCustomerTransactions(params).then(resp => {
                this.loadingCustomerAddress = false;
                if (this.activeName === '1') {
                    this.activeNameList[0].tableData = resp.tradeInfoList ? resp.tradeInfoList : this.activeNameList[0].tableData;
                    this.totalNum[0] = resp.tradeInfoVOListTotal ? resp.tradeInfoVOListTotal : this.totalNum[0]; // 持仓明细记录总数
                } else if (this.activeName === '2') {
                    this.activeNameList[1].tableData = resp.tradeInfoFormList ? resp.tradeInfoFormList : this.activeNameList[1].tableData;
                    this.totalNum[1] = resp.tradeInfoFormVOSTotal ? resp.tradeInfoFormVOSTotal : this.totalNum[1]; // 报单明细记录总数
                } else {
                    this.activeNameList[2].tableData = resp.tradeInfoDeal ? resp.tradeInfoDeal : this.activeNameList[2].tableData;
                    this.totalNum[2] = resp.tradeInfoDealTotal ? resp.tradeInfoDealTotal : this.totalNum[2]; // 成交明细记录总数
                }
            }).catch(e => {
                this.loadingCustomerAddress = false;
            });
        }
    },
    // 初始化数据
    mounted() {
        this.ruleForm.customerID = this.$route.query.custId ? this.$route.query.custId : '';
    }
};
</script>
<style lang='less' module></style>
