<template>
    <div class="scene-xg">
        <el-row :gutter="10">
            <el-col :xl="12" :lg="12" :md="24" :sm="24" v-for="(item, index) in charts" :key="index">
                <s-card :title="item.title" :icon="item.icon" class="self-card-css" :loading="item.loading">
                    <div slot="right">
                        <el-button type="text" @click="toggleDetail(item, index)">
                            <span v-if="!item['toggleDetailFlags']">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></span>
                            <span v-else>图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i></span>
                        </el-button>
                    </div>
                    <div slot="content">
                        <div v-if="item['toggleDetailFlags']">
                            <div v-if="index===2">
                                <el-select class="custom-width" clearable size="small" v-model="table3CurrentType">
                                    <el-option v-for="(o, oi) in table3Options" :key="oi" :label="o.label" :value="o.field"></el-option>
                                </el-select>
                            </div>
                            <s-table :height="index === 2 ? 268 : 300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                        </div>
                        <div v-else>
                            <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0" :tabIndex="tabIndex" :sceneType="1" :childrenMap="childrenMap" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateAccountGroupAndCustIds="updateAccountGroupAndCustIds" @getBlock2Data="getBlock2Data" @getBlock3Data="getBlock3Data"></chart1>
                            <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1" :tabIndex="tabIndex" :sceneType="1" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @getBlock4Data="getBlock4Data"></chart2>
                            <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 2" :tabIndex="tabIndex" :sceneType="1" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @getBlock4Data="getBlock4Data"></chart3>
                            <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 3" :tabIndex="tabIndex" :sceneType="1" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData"></chart4>
                        </div>
                        <!-- <echarts-common v-else :loading="chartLoading[index]" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions[index]" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common> -->
                    </div>
                </s-card>
            </el-col>
        </el-row>
        <!-- <s-card title="test分页" icon="el-edit" class="self-card-css">
                <s-table slot="content" :showPagination="true" :totalNum="chartTableData[0].length" :columns="chartTableColumns[0]" :tableData="testTableData" @handlePaginationChange="handlePaginationChange"></s-table>
            </s-card> -->
        <div class="main-table">
            <s-card title="账户组信息" icon="fa fa-layer-group" :minHeight="300">
                <div slot="right">
                    <el-input clearable class="search-input" size="mini" placeholder="请输入账户组号或客户编号" v-model="searchText">
                        <i class="el-icon-search" slot="prefix" style="margin-left:4px; cursor: pointer;"></i>
                    </el-input>
                </div>
                <div slot="content">
                    <el-row :gutter="20">
                        <el-col :span="21">
                            <div>
                                <tree-table ref="self-tree-table" :filterText="searchText" :columns="mainTableColumns" :tableData="mainTableData" :clearAllSelected="true" @updateCheckedList="updateCheckedList" @handleClearAll="handleClearAll"></tree-table>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div class="operate-button-group">
                                <el-button type="danger" size="small" @click="handleDelete" class="self-width">删除</el-button>
                                <br>
                                <el-button type="warning" size="small" @click="handleSplit" class="self-width">拆分</el-button>
                                <br>
                                <el-button type="warning" size="small" @click="handleMerge" class="self-width">合并</el-button>
                                <br>
                                <el-button type="primary" size="small" @click="handleExportResult('1', tabIndex)">导出到结果集</el-button>
                                <br>
                                <el-button type="primary" size="small" class="self-width" @click="handleExportCsv('账户组信息', mainTableColumns)">导出到csv</el-button>
                                <br>
                                <el-button type="primary" size="small" @click="createNewData('1', tabIndex)">重新生成数据</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </s-card>
        </div>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import TreeTable from '@/components/index/common/TreeTableOld';
import treeTableMixin from '@/pages/index/common/treeTableMixin';
import commonMixin from '@/pages/index/common/commonMixin';
import {
    getChart2Data,
    getChart3Data,
    getChart4Data,
    // getChartTable2ByPage
} from '@/api/dataAnsis/assoAccountGroupMerge';
import chart1 from '../components/chart1';
import chart2 from '../components/chart2';
import chart3 from '../components/chart3';
import chart4 from '../components/chart4';
import _ from 'lodash';
import {charts, mainTableColumns, chartTableColumns1, chartTableColumns2, chartTableColumns4, table3Options} from '../components/constants';
export default {
    components: {chart1, chart2, chart3, chart4, SCard, STable, TreeTable},
    mixins: [treeTableMixin, commonMixin],
    props: {
        tabIndex: {
            type: [Number, String],
            default: 0
        }
    },
    watch: {
        'currentCustIds': {
            handler(val) {
                this.createChart3Columnn(val);
            },
            deep: true
        },
        currentAccountGroupId(val) {
            console.log('watchgroupid:' + val);
            this.computedCommonReqParams = this.commonReqParams();
        },
        // '$store.getters.sceneCommitResp': {
        // handler() {
        //     this.drewChart1();
        // },
        // deep: true
        // }
    },
    data() {
        return {
            table3Options,
            mainTableColumns,
            sceneCommitParams: {},
            accountIdPre: 'XG',
            charts: charts,
            chartTableColumns: [chartTableColumns1, chartTableColumns2, [], chartTableColumns4],
            chartTableData: [[], [], [], []],
            searchText: '',
            currentAccountGroupId: '',
            currentCustIds: [], // 当前账户组下的客户号
            table3CurrentType: 'buyCnt',
            testTableData: [],
            pagination: {pageIndex: 1, pageRows: 10},
            computedCommonReqParams: {}
        };
    },
    methods: {
        handleClearAll() {
            // markPoint 样式
            this.$refs['chartComponent1'][0].chartOptions['series'][0]['markPoint']['data'] = [];
            this.$store.commit('savechart1', {data: this.$refs['chartComponent1'][0].chartOptions, index: this.tabIndex || this.$store.getters.getTabIndex});
            // table勾选状态
            this.selectAccountGroupList = [];
            this.getChart1(this.$refs['chartComponent1'][0].chartOptions, 1);
        },
        updateAccountGroupAndCustIds(groupId, custIds) {
            this.currentAccountGroupId = groupId;
            this.currentCustIds = custIds;
            sessionStorage.setItem('CURRENT_GROUP_ID', JSON.stringify(groupId));
            sessionStorage.setItem('CURRENT_CUST_IDS', JSON.stringify(custIds));
        },
        handlePaginationChange(val) {
            this.pagination = val;
            this.getTableData();
        },
        getTableData() {
            let session = JSON.parse(localStorage.getItem('CHART_TABLE_DATA'));
            this.chartTableData = session;
            this.testTableData = session[0].slice((this.pagination['pageIndex'] - 1) * this.pagination['pageRows'], (this.pagination['pageIndex'] + 1) * (this.pagination['pageRows']));
        },
        sortDataByAcctIdCommon(data) {
            return _.sortBy(data, [item => { return item.acctId; }]);
        },
        dealChart1AndMainTableData() {
            if (!this.tabIndex) {
                return {
                    chartData: [],
                    mainTableData: []
                };
            }
            let resData = this.$store.getters.sceneCommitResp[this.tabIndex] || {};
            if (!Object.keys(resData).length) {
                return {
                    chartData: [],
                    mainTableData: []
                };
            }
            let {mainTableData, chartData, id} = resData;
            if (mainTableData && !mainTableData.length) {
                return {
                    chartData: [],
                    mainTableData: []
                };
            }
            // 散点图sort
            this.mainTableData = this.sortDataByAcctIdCommon(mainTableData);
            // table data sort
            chartData = this.sortDataByAcctIdCommon(chartData);
            let allLeaf = [];
            mainTableData.forEach(v => {
                if (v.children && v.children.length) {
                    let custIds = v.children.map(v => {
                        return v.custId;
                    });
                    custIds = [...new Set(custIds)];
                    let childIds = v.children.map(v => {
                        return v.id;
                    });
                    allLeaf.push({
                        acctId: v.acctId,
                        custIds: custIds,
                        id: v.id
                    });
                    this.childrenMap[v.id] = childIds;
                }
            });
            chartData.forEach(v => {
                let index = allLeaf.findIndex(i => {
                    return i.acctId === v.acctId;
                });
                v.custIds = index > -1 ? allLeaf[index]['custIds'].join(',') : '';
                v.id = index > -1 ? allLeaf[index]['id'] : '';
            });
            this.$store.commit('saveMainTableData', {data: mainTableData, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            this.updateTableData(chartData, 0, id);
            return {
                chartData: chartData,
                mainTableData: mainTableData
            };
        },
        updateTableData(value, index, id) {
            if (index === 2) {
                this.createChart3Columnn(this.currentCustIds);
            }
            this.chartTableData[index] = value;
            this.$store.commit('saveChartTableData', {data: this.chartTableData, index: id || this.tabIndex || this.$store.getters.getTabIndex});
        },
        handleTabClick(tab) {
            this.activeTab = tab.name;
        },
        toggleDetail(item, index) {
            this.charts[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
            let data = {};
            let storeData = this.$store.getters.getBlockData[this.$store.getters.getTabIndex] || {};
            if (storeData && !Object.keys(storeData).length) {
                return;
            }
            if (index === 0) {
                data = storeData['chartData1'];
            } else if (index === 1) {
                data = storeData['chartData2'];
            } else if (index === 2) {
                data = storeData['chartData3'];
            } else if (index === 3) {
                data = storeData['chartData4'];
            }
            if (!item.toggleDetailFlags) {
                this.$nextTick(() => {
                    // let dataMap = [this.$store.getters.getchart1, this.$store.getters.getchart2, this.$store.getters.getchart3, this.$store.getters.getchart4];
                    setTimeout(() => {
                        (this.getChart()[index])(data, 1);
                    });
                });
            }
        },
        getBlock2Data() {
            let flag = this.$store.getters.getClickTab;
            if (flag && this.$store.getters.getchart2) {
                let tableData = this.$store.getters.getChartTableData[1];
                let chartData = this.$store.getters.getchart2;
                this.updateTableData(tableData, 1);
                this.getChart2(chartData);
            } else {
                if (this.currentAccountGroupId) {
                    let params = this.commonReqParams();
                    this.charts[1]['loading'] = true;
                    getChart2Data(params).then(resp => {
                        this.charts[1]['loading'] = false;
                        this.updateTableData(resp.tableData, 1);
                        this.drewChart2(resp);
                    }).catch(e => {
                        console.error(e);
                        this.charts[1]['loading'] = false;
                    });
                }
            }
        },
        getBlock3Data() {
            let flag = this.$store.getters.getClickTab;
            if (flag && this.$store.getters.getchart3) {
                let tableData = this.$store.getters.getChartTableData[2];
                let chartData = this.$store.getters.getchart3;
                this.updateTableData(tableData, 1);
                this.getChart3(chartData);
            } else {
                if (this.currentAccountGroupId) {
                    this.charts[2]['loading'] = true;
                    let params = this.commonReqParams();
                    getChart3Data(params).then(resp => {
                        this.charts[2]['loading'] = false;
                        this.updateTableData(resp.tableData, 2);
                        this.drewChart3(resp);
                    }).catch(e => {
                        console.error(e);
                        this.charts[1]['loading'] = false;
                    });
                }
            }
        },
        getBlock4Data(date) {
            let flag = this.$store.getters.getClickTab;
            if (flag && this.$store.getters.getchart4) {
                this.$store.commit('saveClickTab', false);
                let tableData = this.$store.getters.getChartTableData[3];
                let chartData = this.$store.getters.getchart4;
                this.updateTableData(tableData, 1);
                this.getChart4(chartData);
            } else {
                if (this.currentAccountGroupId) {
                    this.charts[3]['loading'] = true;
                    let params = this.commonReqParams();
                    params.txDt = date;
                    getChart4Data(params).then(resp => {
                        this.charts[3]['loading'] = false;
                        this.updateTableData(resp.buysail, 3);
                        this.drewChart4(resp);
                    }).catch(e => {
                        console.error(e);
                        this.charts[1]['loading'] = false;
                    });
                }
            }
        },
        handleEchartClickEvent(params, index) {
            switch (String(index)) {
            case '0':
                // get chart2
                let currentId = params['data'][6];
                let markPointData = this.$refs['chartComponent1'][0].chartOptions['series'][0]['markPoint']['data'];
                if (this.selectAccountGroupList.indexOf(currentId) > -1) { // 取消选中
                    // markPoint 样式
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['markPoint']['data'] = markPointData.filter(v => {
                        return v.coord[0] !== params['data'][0] && v.coord[1] !== params['data'][1];
                    });
                    this.$store.commit('savechart1', {data: this.$refs['chartComponent1'][0].chartOptions, index: params.id || this.tabIndex || this.$store.getters.getTabIndex});
                    // table勾选状态
                    this.selectAccountGroupList = this.selectAccountGroupList.filter(v => {
                        return v !== currentId && this.childrenMap[currentId].indexOf(v) === -1;
                    });
                } else { // 选中
                    // markPoint 样式
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['markPoint']['data'].push({
                        coord: [params['data'][0], params['data'][1]]
                    });
                    this.$store.commit('savechart1', {data: this.$refs['chartComponent1'][0].chartOptions, index: params.id || this.tabIndex || this.$store.getters.getTabIndex});
                    // table勾选状态
                    this.selectAccountGroupList.push(currentId);
                }
                this.getChart1(this.$refs['chartComponent1'][0].chartOptions, 1);
                this.$refs['self-tree-table'].$refs['tree-table'].setCheckedKeys(this.selectAccountGroupList);
                setTimeout(() => {
                    this.$refs['self-tree-table'].handleChecked(this.selectAccountGroupList);
                }, 500);
                break;
            }
        },
        handleEchartDblClickEvent(params, index) {
            this.$store.commit('saveClickTab', false);
            switch (String(index)) {
            case '0':
                this.currentAccountGroupId = params['data'][3];
                this.currentCustIds = params.data[5].split(',');
                this.$nextTick(() => {
                    this.getBlock2Data();
                    this.getBlock3Data();
                });
                // get chart2 chart3
                break;
            case '1':
                this.getBlock4Data(params['name']);
                // get chart4
                break;
            case '2':
                this.getBlock4Data(params['name']);
                // get chart4
                break;
            }
        },
        commonReqParams() {
            this.sceneCommitParams = this.$store.getters.sceneCommitParams[this.tabIndex || this.$store.getters.getTabIndex];
            return {
                id: this.sceneCommitParams.sceneIds,
                acctId: this.currentAccountGroupId, // || 'XG00001',
                custId: this.currentCustIds.join(','), // || '80001716,80000025,80001461',
                statStartDt: this.sceneCommitParams.statStartDt, // || '2017-02-20',
                statStopDay: this.sceneCommitParams.statStopDay, // || '2017-10-09',
                contrCd: this.sceneCommitParams.contrCd, // || 'cu1712'
                // resultIds: this.resultIds || ''
            };
        },
        createChart3Columnn(val) {
            if (!val) {
                return;
            }
            let chart3Column = val.map(v => {
                return {
                    'label': v,
                    'field': v,
                    'minWidth': 140,
                    'formatter': item => {
                        item = item.map;
                        return item[v] ? item[v][this.table3CurrentType] : '';
                    }
                };
            });
            chart3Column.unshift({
                'label': '交易日',
                'field': 'date',
                'minWidth': 140,
                'fixed': true
            });
            this.chartTableColumns.splice(2, 1, chart3Column);
        },
        getStoreData() {
            let dataMap = [this.$store.getters.getchart1, this.$store.getters.getchart2, this.$store.getters.getchart3, this.$store.getters.getchart4];
            dataMap.forEach((v, index) => {
                (this.getChart()[index])(1, dataMap[index]);
            });
        },
        resetToggleDetailFlag() {
            this.charts.forEach(v => {
                v.toggleDetailFlags = false;
            });
        }
    },
    mounted() {
        // if (sessionStorage.getItem('CURRENT_CUST_IDS')) {
        //     this.currentCustIds = JSON.parse(sessionStorage.getItem('CURRENT_CUST_IDS'));
        // }
        // if (sessionStorage.getItem('CURRENT_GROUP_ID')) {
        //     this.currentAccountGroupId = JSON.parse(sessionStorage.getItem('CURRENT_GROUP_ID'));
        // }
        // this.createChart3Columnn(this.currentCustIds);
        this.resetToggleDetailFlag();
        this.sceneCommitParams = this.$store.getters.sceneCommitParams;
        if (Object.keys(this.sceneCommitParams).length) {
            this.drewChart1(1);
        }
    }
};
</script>
<style lang="less" scoped>
    .scene-xg {
        .search-input {
            width: 240px;

            /deep/ input {
                border-radius: 15px;
            }

            /deep/ i {
                color: #3c70a5 !important;
            }
        }
        .custom-width {
            width: 350px;
        }
        .operate-button-group {
            padding-top: 65px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .self-card-css {
            /deep/.el-card__body {
                padding: 10px;
            }
        }
    }
</style>
