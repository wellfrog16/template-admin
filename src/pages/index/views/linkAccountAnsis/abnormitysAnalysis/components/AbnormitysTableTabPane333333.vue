<template>
    <div :class="$style.card_table">
        <div :class="$style.a_form_table_bar">
            <el-card :class="$style.a_form_box_shadow">
                <el-tabs v-model="activeName" type="card" :class="$style.pane_titles">
                    <el-tab-pane label="超仓分析" name="first"></el-tab-pane>
                    <el-tab-pane label="频繁报撤销单分析" name="second"></el-tab-pane>
                    <el-tab-pane label="自成交分析" name="thirdly"></el-tab-pane>
                </el-tabs>
                <el-table
                    size="small"
                    ref="multipleTable" s
                    height="450"
                    highlight-current-row
                    tooltip-effect="dark"
                    @row-click = "tableRowClick"
                    :data="tablePaneData.overStoreAnalysis"
                    v-if="activeName == 'first'"
                    border
                    @select="handleRowSelect"
                    @selection-change="handleSelectionChange"
                    style="width: 100%;">
                    <el-table-column
                        v-for="(item,index) in tableColumns1"
                        :key="item.field"
                        :prop="item.field"
                        :label="item.title"
                        :align="item.align"
                        :min-width="item.width">
                    </el-table-column>
                </el-table>
                <el-table
                    size="small"
                    ref="multipleTable" s
                    height="450"
                    highlight-current-row
                    tooltip-effect="dark"
                    :data="tablePaneData.frequentTrade"
                    @row-click = "tableRowClick"
                    v-if="activeName == 'second'"
                    border
                    @select="handleRowSelect"
                    @selection-change="handleSelectionChange"
                    style="width: 100%;">
                    <el-table-column
                        v-for="(item,index) in tableColumns2"
                        :key="item.field"
                        :prop="item.field"
                        :label="item.title"
                        :align="item.align"
                        :min-width="item.width">
                    </el-table-column>
                </el-table>
                <el-table
                    size="small"
                    ref="multipleTable" s
                    height="450"
                    highlight-current-row
                    tooltip-effect="dark"
                    @row-click = "tableRowClick"
                    :data="tablePaneData.autoTrade"
                    v-if="activeName == 'thirdly'"
                    border
                    @select="handleRowSelect"
                    @selection-change="handleSelectionChange"
                    style="width: 100%;">
                    <el-table-column
                        v-for="(item,index) in tableColumns3"
                        :key="item.field"
                        :prop="item.field"
                        :label="item.title"
                        :align="item.align"
                        :min-width="item.width">
                    </el-table-column>
                </el-table>
            </el-card>
            <div :class="$style.export_button">
                <el-button :class="$style.export_bt" type="primary" @click="exportClick">导出CSV</el-button>
            </div>
        </div>
        <div :class="$style.a_form_table_bar">
            <div :class="$style.bar_echarts" id="AbarEcharts"></div>
        </div>
    </div>
</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)
    import MixinVue from "../components/MixinsTable";
    import {
        postImportAccounBar     // Bar 柱状图
    } from '@/api/dataAnsis/abnormityAnalysis';

    export default {
        name: "AbnormitysTableTabPane",
        // 父传子！
        props: {
            tablePaneData: {
                type: Object,
                default: true
            },
            formData: {
                type: Object,
                default: true
            }
        },

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [MixinVue],
        // 存储数据
        data() {
            return {
                //  tab页
                activeName: 'first',
                //初始化表格信息  超仓分析
                // overStoreAnalysis
                tableColumns1: [
                    {field: "acctNum", title: "账户组号", width: 150, align: 'center'},
                    {field: "custId", title: "客户编号", width: 150, align: 'center'},
                    {field: "custName", title: "客户名称", width: 150, align: 'center'},
                    {field: "contrCd", title: "合约代码", width: 150, align: 'center'},
                    {field: "acctCurrNetMake", title: "账户组当前净持仓", width: 150, align: 'center'},
                    {field: "acctCurrNetPos", title: "账户当前净持仓", width: 150, align: 'center'},
                    {field: "multiBillMakePosQtty", title: "多单持仓量", width: 150, align: 'center'},
                    {field: "billMakePosQtty", title: "空单持仓量", width: 150, align: 'center'},
                    {field: "statBosomDays", title: "统计区间超仓天数", width: 150, align: 'center'}
                ],
                // frequentTrade  频繁报撤销单分析
                tableColumns2: [
                    {field: "acctNum", title: "账户组号", width: 150, align: 'center'},
                    {field: "custId", title: "客户编号", width: 150, align: 'center'},
                    {field: "custName", title: "客户名称", width: 150, align: 'center'},
                    {field: "contrCd", title: "合约代码", width: 150, align: 'center'},
                    {field: "txDt", title: "交易日期", width: 150, align: 'center'},
                    {field: "mergeBillCnt", title: "合并撤单次数", width: 150, align: 'center'},
                    {field: "acctBillCnt", title: "账户撤单次数", width: 150, align: 'center'},
                    {field: "mergeMaAmtBillCnt", title: "合并大额撤单次数", width: 150, align: 'center'},
                    {field: "acctMaAmtBillCnt", title: "账户大额撤单次数", width: 150, align: 'center'},
                ],
                // autoTrade  自成交分析
                tableColumns3: [
                    {field: "acctNum", title: "账户组号", width: 150, align: 'center'},
                    {field: "custId", title: "客户编号", width: 150, align: 'center'},
                    {field: "custName", title: "客户名称", width: 150, align: 'center'},
                    {field: "contrCd", title: "合约代码", width: 150, align: 'center'},
                    {field: "txDt", title: "交易日期", width: 150, align: 'center'},
                    {field: "mergeBargainCnt", title: "合并自成交次数", width: 150, align: 'center'},
                    {field: "acctBargainCnt", title: "账户自成交次数", width: 150, align: 'center'},
                    {field: "mergeBargainQtty", title: "合并自成交数量", width: 150, align: 'center'},
                    {field: "acctBargainQtty", title: "账户自成交数量", width: 150, align: 'center'},
                ],
                barEchartsDeteList: []
            }

        },
        // 计算属性
        computed: {}
        ,
        watch: {
            tablePaneData: {
                handler(val) {
                    console.log(val);
                    this.tableDataList = val;
                },
                deep: true
            }
        }
        ,
        //    数据交互  127662
        methods: {
            // tap 类型
            tabPane(){
                let tabPaneActiveName = '';
                if(this.activeName === 'first'){
                    tabPaneActiveName = '1';
                }else if(this.activeName === 'second'){
                    tabPaneActiveName = '2';
                }else {
                    tabPaneActiveName = '3';
                }
                return tabPaneActiveName;
            },
            // Bar 柱状图
            tableRowClick(row){
                let params = {
                    "accountTeamNo": row.acctNum,    // 账户组号
                    "custId": row.custId,           // 客户编号
                    "statTimeBegin": this.formData.statTimeBegin,    // 统计起始日
                    "statTimeEnd": this.formData.statTimeEnd,      // 统计截止日
                    "contrCode": row.contrCd,        // 合约代码
                    "type": this.tabPane(),            // ---取值 '1':超仓分析
                }
                postImportAccounBar(params).then(resp => {
                    this.barEchartsDeteList = resp;
                    this.barEchartsDete(this.barEchartsDeteList);
                })
            },
            handleRowSelect(selection, row) {
                console.log(row);
            }
            ,
            handleSelectionChange(selection, row) {
                console.log(row);
            }
            ,
            exportClick1(selection, row) {
                console.log(row);
            }
            ,
            // 导出CSV
            exportClick() {
                console.log(this.tablePaneData);
                console.log(this.tablePaneData.autoTrade);
            }
            ,
            tabHandleClick(){}
        }
        ,
        // 在一个实例被创建之后执行代码
        created() {
        }
        ,
        // 初始化数据
        mounted() {
            this.barEchartsDete();
        }
        ,
        beforeDestroy() {
        }
    }
    ;
</script>
<style lang="less" module>
    .card_table {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 17px;
        position: relative;
        .a_form_table_bar {
            padding: 0;
            width: 49.3%;
            margin-bottom: 20px;
            .a_form_box_shadow {
                box-shadow: 0 0 10px #326fcb !important;
            }
            :global(.el-card__body) {
                padding: 0;
                .el-tabs__item .is-active {
                    color: #fff;
                }
                :global(.el-tabs__header) {
                    border-bottom: 1px solid #0740a2ad;
                    position: absolute;
                    top: -60px;
                }
                :global(.el-tabs__item) {
                    border-bottom: 0 solid #0740a2ad;
                    border-left: 1px solid #0740a2ad;
                    color: #fff;
                }
                :global(.el-tabs__nav) {
                    color: #fff;
                    border: 1px solid #0740a2ad;
                }
            }
        }
        .export_button {
            display: flex;
            justify-content: flex-end;
            margin-top: 17px;
            .export_bt {
                color: #fff;
                background-color: rgb(7, 39, 89);
                border: 1px solid rgb(0, 157, 224);
                font-size: 13px;
                padding: 10px 30px;
            }
        }
        .select_option {
            width: 82%;
        }
        .bar_echarts {
            box-shadow: 0 0 10px #326fcb !important;
            height: 450px;
            color: #13ce66;
        }
    }
</style>
