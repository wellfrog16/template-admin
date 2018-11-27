<template>
    <div :class="$style.card_table">
        <div :class="$style.a_form_table_bar">
            <el-card :class="$style.a_form_box_shadow">
                <el-tabs v-model="activeName" type="card" :class="$style.pane_titles">
                    <el-tab-pane
                        v-for="active in activeNameList"
                        :label="active.label"
                        :key="active.name"
                        :name="active.name">
                        <el-table
                            size="small"
                            ref="multipleTable" s
                            height="450"
                            highlight-current-row
                            :span-method="arraySpanMethod"
                            tooltip-effect="dark"
                            :data="active.tableDataList"
                            @row-click = "tableRowClick"
                            border
                            @select="handleRowSelect"
                            @selection-change="handleSelectionChange"
                            style="width: 100%;">
                            <el-table-column
                                v-for="(item,index) in active.tableColumns"
                                :key="item.field"
                                :prop="item.field"
                                :label="item.title"
                                :align="item.align"
                                :min-width="item.width">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </div>
    </div>
</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)

    export default {
        name: "AbnormitysTableTabPane",
        // 父传子！
        props: {
        },

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                tabPosition: 'top',
                //  tab页
                activeName: 'first',
                //初始化表格信息
                activeNameList: [
                    {
                        name: 'first',
                        label: '超仓分析',   // overStoreAnalysis
                        tableColumns: [
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
                        tableDataList:[
                            {
                                "acctNum": "2222",
                                "custId": "日期2",
                                "custName": "日期",
                                "contrCd": "日期",
                                "acctCurrNetMake": "日期",
                                "acctCurrNetPos": "日期",
                                "multiBillMakePosQtty": "日期",
                                "billMakePosQtty": "日期",
                                "statBosomDays": "日期",
                            },
                            {
                                "acctNum": "22223",
                                "custId": "日期3",
                                "custName": "日期",
                                "contrCd": "日期",
                                "acctCurrNetMake": "日期",
                                "acctCurrNetPos": "日期",
                                "multiBillMakePosQtty": "日期",
                                "billMakePosQtty": "日期",
                                "statBosomDays": "日期",
                            },
                            {
                                "acctNum": "22223",
                                "custId": "日期4",
                                "custName": "日期",
                                "contrCd": "日期",
                                "acctCurrNetMake": "日期",
                                "acctCurrNetPos": "日期",
                                "multiBillMakePosQtty": "日期",
                                "billMakePosQtty": "日期",
                                "statBosomDays": "日期",
                            },
                            {
                                "acctNum": "2222",
                                "custId": "日期5",
                                "custName": "日期",
                                "contrCd": "日期",
                                "acctCurrNetMake": "日期",
                                "acctCurrNetPos": "日期",
                                "multiBillMakePosQtty": "日期",
                                "billMakePosQtty": "日期",
                                "statBosomDays": "日期",
                            },
                            {
                                "acctNum": "2222",
                                "custId": "日期6",
                                "custName": "日期",
                                "contrCd": "日期",
                                "acctCurrNetMake": "日期",
                                "acctCurrNetPos": "日期",
                                "multiBillMakePosQtty": "日期",
                                "billMakePosQtty": "日期",
                                "statBosomDays": "日期",
                            },
                            {
                                "acctNum": "2222",
                                "custId": "日期1",
                                "custName": "日期",
                                "contrCd": "日期",
                                "acctCurrNetMake": "日期",
                                "acctCurrNetPos": "日期",
                                "multiBillMakePosQtty": "日期",
                                "billMakePosQtty": "日期",
                                "statBosomDays": "日期",
                            },
                        ],
                    }, {
                        label: '频繁报撤销单分析',  // frequentTrade
                        name: 'second',
                        tableColumns: [
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
                        tableDataList: [],
                    }, {
                        label: '自成交分析',   // autoTrade
                        name: 'third',
                        tableColumns: [
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
                        tableDataList: [],
                    }
                ]
            }

        },
        // 计算属性
        computed: {
        },
        watch: {

        },
        //    数据交互  127662
        methods: {
            handleRowSelect(selection, row) {
            },
            handleSelectionChange(selection, row) {
            },
            exportClick1(selection, row) {
            },
            tableRowClick(row, event, column){
                // console.log(this.activeNameList[0].tableDataList);
                for(let i = 0; i < this.activeNameList[0].tableDataList.length; i++){
                    if(this.activeNameList[0].tableDataList[i].acctNum == row.acctNum){
                        console.log(this.activeNameList[0].tableDataList[i].custId);
                        console.log(row.acctNum);
                    }


                }
            },
            arraySpanMethod({row, column, rowIndex, columnIndex}){
                // let rowCustId = [];
                // if (this.activeName === 'first') {
                //     for (let i = 0; i < this.activeNameList[0].tableDataList.length; i++) {
                //         if (this.activeNameList[0].tableDataList[i].acctNum == row.acctNum) {
                //             rowCustId.push(this.activeNameList[0].tableDataList[i].custId)
                //         }
                //     }
                // } else if (this.activeName === 'second') {
                //     for (let i = 0; i < this.activeNameList[1].tableDataList.length; i++) {
                //         if (this.activeNameList[1].tableDataList[i].acctNum == row.acctNum) {
                //             rowCustId.push(this.activeNameList[1].tableDataList[i].custId)
                //         }
                //
                //
                //     }
                // } else {
                //     for (let i = 0; i < this.activeNameList[2].tableDataList.length; i++) {
                //         if (this.activeNameList[2].tableDataList[i].acctNum == row.acctNum) {
                //             rowCustId.push(this.activeNameList[2].tableDataList[i].custId)
                //         }
                //     }
                // }

                // 用于设置要合并的列
                    if (columnIndex === 0) {
                        //用于设置合并开始的行号
                        if (rowIndex % 2 === 0) {
                            return {
                                rowspan: 3,    // 合并的行数
                                colspan: 2     // 合并的列数，设为０则直接不显示
                            };
                        } else {
                            return {
                                rowspan: 0,
                                colspan: 0
                            };
                        }
                    }
            }
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
    .card_table {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 17px;
        position: relative;
    }
</style>
