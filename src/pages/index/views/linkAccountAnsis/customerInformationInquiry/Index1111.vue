<template>
    <div :class="$style.card_table">
        <div>
            <s-form></s-form>
        </div>
        <s-card :title="`客户地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table :columns="this.columnsCTrI1" :tableData="tableData1">
                </s-table>
            </div>
        </s-card>
        <s-card :title="`客户交易信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table :columns="this.columnsCTrI2" :tableData="tableData2">
                </s-table>
            </div>
        </s-card>
        <s-card :title="`精确信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table :columns="this.columnsCTrI3" :tableData="tableData3">
                </s-table>
            </div>
        </s-card>
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
        columnsCTrI1,    // 客户地址查询  (假数据)
        columnsCTrI2,    // 客户交易信息查询
        columnsCTrI3,    // 精确信息查询
        columnsCTrI4     // 模糊地址查询
    } from '../customerInformationInquiry/components/constants';

    import {
        postCustomerAddress,          // 客户地址查询(生成报告接口)
        postCustomerTransactions,     // 客户交易信息查询(生成报告接口)
        postPreciseInformation,      // 精确信息查询(生成报告接口)
        postFuzzyAddress,           // 模糊地址查询(生成报告接口)
    } from '@/api/dataAnsis/customerInformationInquiry'
    import {
        tableData1,    // 客户地址查询(列表头)
        tableData2,    // 客户交易信息查询(列表头)
        tableData3,    // 精确信息查询(列表头)
        tableData4,    // 模糊地址查询(列表头)
        indexSelectionOptions  // 指标选择
    } from '../customerInformationInquiry/components/constants';
    export default {
        name: "Index",
        // 父传子！
        props: {},
        components: {
            SCard: () => import('@/components/index/common/SCard'),    // 边框
            STable: () => import('@/components/index/common/STable'),  // 列表
            SForm: () => import('../customerInformationInquiry/components/formData'),  // 表单
        },
        // 存储数据
        data() {
            return {
                tableData1: [],   // 客户地址查询
                columnsCTrI1: columnsCTrI1,
                tableData2: [],   // 客户交易信息查询
                columnsCTrI2: columnsCTrI2,
                tableData3: [],   // 精确信息查询
                columnsCTrI3: columnsCTrI3,
                tableData4: [],   // 模糊地址查询
                columnsCTrI4: columnsCTrI4,
            }

        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            // 客户地址查询
            customerAddressClick(){
                this.tableData1 = tableData1;
            },
            // 客户交易信息查询
            customerTransactionsClick(){
                this.tableData2 = tableData2;
            },
            // 精确信息查询
            preciseInformationClick(){
                this.tableData3 = tableData3;
            },
            // 模糊地址查询
            fuzzyAddressClick(){
                this.tableData4 = tableData4;
            }
        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
            this.customerAddressClick();
            this.customerTransactionsClick();
            this.preciseInformationClick();
            this.fuzzyAddressClick();
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .card_table {
        width: 100%;
    }
</style>
