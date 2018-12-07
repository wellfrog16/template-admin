<template>
    <div :class="$style.card_table">
        <div :class="$style.a_form_table_bar">
            <el-card :class="$style.a_form_box_shadow">
                <el-tabs
                    size="small"
                    @tab-click="handleTabClick"
                    v-model="activeName"
                    type="card" :class="$style.pane_titles">
                    <el-tab-pane
                        v-for="active in activeNameList"
                        :label="active.label"
                        :key="active.name"
                        :name="active.name">
                        <s-table
                            sortable
                            :height="450"
                            :loading="dealWithIsLoading"
                            :columns="active.tableColumns"
                            :tableData="active.tableDataList"
                            @celCick="tableCellClick">
                        </s-table>
                    </el-tab-pane>
                </el-tabs>
            </el-card>
            <div :class="$style.export_button">
                <el-button :class="$style.export_bt" type="primary" size="small" @click="exporstClick">导出CSV</el-button>
            </div>
        </div>
        <div :class="$style.a_form_table_bar">
            <div :class="$style.bar_echarts"
                 v-loading="fullScreenLoading1"
                 element-loading-text="数据加载中，请耐心等待..."
                 element-loading-background="rgba(0,0,0,0.3)"
                 id="AbarEcharts"></div>
        </div>
    </div>
</template>
<script>
    import { activeNameList } from '../components/constants';
    import MixinVue from "../components/MixinsTable";
    import {
        postImportAccounBar,     // Bar 柱状图
        postExportAnalysis      // 导出 CSV
    } from '@/api/dataAnsis/abnormityAnalysis';

    export default {
        name: "AbnormitysTableTabPane",
        // 父传子！
        props: {
            // tab 表格数据
            tablePaneData: {
                type: Object,
                default: true
            },
            // 生成协查报告的参数
            formData: {
                type: Object,
                default: true
            },
            // 加载
            dealWithIsLoading: {
                ttype: Boolean,
                default: false
            }
        },

        components: {
            STable: () => import('@/components/index/common/STable'), // 列表
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [MixinVue],
        // 存储数据
        data() {
            return {
                fullScreenLoading1: false,  // bar 加载
                //  tab页
                activeName: '0',
                activeNameList: activeNameList,
                statTimeBegin: '',  // 统计起始日
                statTimeEnd: ''    // 统计截止日
            }
        },
        // 计算属性
        computed: {},
        watch: {
            // 表格数据
            tablePaneData: {
                handler(val) {
                    if (val) {
                        this.activeNameList[0].tableDataList = val.overStoreAnalysis;
                        this.activeNameList[1].tableDataList = val.frequentTrade;
                        this.activeNameList[2].tableDataList = val.autoTrade;
                        if(Object.keys(this.tablePaneData).length !== 0){
                            this.tabsData()
                        }
                    }
                },
                deep: true
            },
            formData: {
                handler(val){
                    if(val){
                        this.statTimeBegin = val.statTimeBegin;
                        this.statTimeEnd = val.statTimeEnd;
                    }
                },
                deep: true
            },
        },
        //    数据交互
        methods: {
            // 柱状图
            tabsData(){
                    this.clearChartData();
                    let accountTeamNo = '';   // 账户组号
                    let arrCustId = [];  // 客户编号
                    let contrCd = '';  // 合约代码

                    let tableDataListData = this.activeNameList[this.activeName].tableDataList;
                    for (let i = 0; i < tableDataListData.length; i++) {
                        accountTeamNo = this.activeNameList[this.activeName].tableDataList[i].acctNum;          // 账户组号
                        let a_acctNum = tableDataListData = this.activeNameList[this.activeName].tableDataList;  // 合约代码
                        if (accountTeamNo ==  a_acctNum[this.activeName].acctNum ) {
                            contrCd =  a_acctNum[this.activeName].contrCd;
                            arrCustId.push(this.activeNameList[this.activeName].tableDataList[i].custId)
                        }
                    }
                    let params = {
                        "accountTeamNo": accountTeamNo,                     // 账户组号
                        "arrCustId": arrCustId,                           // 客户编号
                        "contrCode": contrCd,                         // 合约代码
                        "statTimeBegin": this.statTimeBegin ,     // 统计起始日
                        // "statTimeBegin": '2017-10-01',     // 统计起始日
                        // "statTimeEnd": '2017-12-31',         // 统计截止日
                        "statTimeEnd": this.statTimeEnd,         // 统计截止日
                        "type": this.activeName,                     // 取值 '1':超仓分析
                    };
                    this.fullScreenLoading1 = true;
                    // Bar 柱状图接口
                    postImportAccounBar(params).then(resp => {
                        this.fullScreenLoading1 = false;
                        this.barEchartsDete(resp);

                    })
            },

            // tab 切换
            handleTabClick(){
                if(Object.keys(this.tablePaneData).length !== 0){
                    this.tabsData()
                }
            },
            // // Bar 柱状图
            tableCellClick(row) {
                if(Object.keys(row).length !== 0) {
                    this.clearChartData();
                    let rowCustId = [];
                    for (let i = 0; i < this.activeNameList[this.activeName].tableDataList.length; i++) {
                        if (this.activeNameList[this.activeName].tableDataList[i].acctNum == row.acctNum) {
                            rowCustId.push(this.activeNameList[this.activeName].tableDataList[i].custId)
                        }
                    }
                    let params = {
                        "accountTeamNo": row.acctNum,                     // 账户组号
                        "arrCustId": rowCustId,                           // 客户编号
                        // "statTimeBegin": '2017-10-01',     // 统计起始日
                        // "statTimeEnd": '2017-12-31',         // 统计截止日
                        "statTimeBegin": this.statTimeBegin,     // 统计起始日
                        "statTimeEnd": this.statTimeEnd,         // 统计截止日
                        "contrCode": row.contrCd,                         // 合约代码
                        "type": this.activeName,                           // 取值 '1':超仓分析
                    };

                    this.fullScreenLoading1 = true;
                    // Bar 柱状图接口
                    postImportAccounBar(params).then(resp => {
                        this.fullScreenLoading1 = false;
                        this.barEchartsDete(resp);

                    })
                }
            },

            // 导出CSV
            exporstClick() {
                console.log(111);
                let params = {
                    "downloadType": "",
                    "assistReportVOList": []
                }
                postExportAnalysis(params).then(resp => {
                    console.log(resp);
                })

            }
            ,
        },
        // 初始化数据
        mounted() {
            console.log(this.dealWithIsLoading);
        },
    };
</script>
<style lang="less" module>
    .card_table {
        margin-top: 80px;
        width: 100%;
        display: flex;
        justify-content: space-between;
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
        .button_span {
            text-decoration: underline;
            color: #4d9df0;
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
            width: 100%;
            height: 450px;
        }
    }
</style>
