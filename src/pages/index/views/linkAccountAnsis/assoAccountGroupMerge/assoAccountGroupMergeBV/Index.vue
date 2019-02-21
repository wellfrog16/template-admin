<template>
    <div class="scene-bv">
        <el-row :gutter="10">
            <el-col :xl="12" :lg="12" :md="24" :sm="24" v-for="(item, index) in charts" :key="index">
                <s-card :title="item.title" :icon="item.icon" class="self-card-css"
                        loadingText="数据加载时间较长，请耐心等待..."
                        :loading="item.loading">
                    <div slot="right">
                        <el-button type="text" @click="toggleDetail(item, index)">
                            <span v-if="!item['toggleDetailFlags']">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></span>
                            <span v-else>图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i></span>
                        </el-button>
                    </div>
                    <div slot="content">
                        <s-full-screen class="self-fullscreen-wrap" ref="fullscreen" :fullscreen.sync="fullscreen" @change="fullscreenChange" background="#00255c">
                            <div v-if="item['toggleDetailFlags']">
                                <s-table :columns="chartTableColumns[index]" :tableData="chartTableData[index]" :height="300" ></s-table>
                            </div>
                            <div v-else class="chart-container">
                                <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0" :index="index" :tabIndex="tabIndex" :fullscreen="fullscreen" :sceneType="1" :propsChartHeight="propsChartHeight" :childrenMap="childrenMap" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateAccountGroupAndCustIds="updateAccountGroupAndCustIds" @getDetailBy3D="getDetailBy3D"></chart1>
                                <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1" :index="index" :tabIndex="tabIndex" :sceneType="1" :propsChartHeight="propsChartHeight" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart2>
                                <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 2" :index="index" :tabIndex="tabIndex" :sceneType="1" :propsChartHeight="propsChartHeight" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart3>
                                <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 3" :index="index" :tabIndex="tabIndex" :sceneType="1" :propsChartHeight="propsChartHeight" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData"></chart4>
                            </div>
                            <button v-show="!item['toggleDetailFlags']" type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen(index)">
                                <i class="fa" :class="[fullscreen ? 'fa-compress' : 'fa-expand-arrows-alt']"></i>
                            </button>
                        </s-full-screen>
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
                                <tree-table ref="self-tree-table" :filterText="searchText" :columns="mainTableColumns" :tableData="mainTableData" :clearAllSelected="true" @updateCheckedList="updateCheckedList" @handleClearAll="handleClearAll" :currentSceneType="currentSceneType"></tree-table>
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
                                <el-button type="primary" size="small" @click="handleExportResult('2', tabIndex)">导出到结果集</el-button>
                                <br>
                                <el-button type="primary" size="small" class="self-width" @click="handleExportCsv('账户组信息-聚类', mainTableColumns)">导出到csv</el-button>
                                <!-- <br>
                                <el-button type="primary" size="small" @click="createNewData('1', tabIndex)">重新生成数据</el-button> -->
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
    getDetailBy3D
} from '@/api/dataAnsis/assoAccountGroupMerge';
import chart1 from '../components/chart6';
import chart2 from '../components/chart2';
import chart3 from '../components/chart7';
import chart4 from '../components/chart8';
import _ from 'lodash';
// import {getBlockData2, getBlockData3, getBlockData4} from './testJson';
import {chartsBV, mainTableColumnsBV, chartTableColumns10, chartTableColumns7, chartTableColumns8, chartTableColumns9, table3Options} from '../components/constants';
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
        currentAccountGroupId(val) {
            console.log('watchgroupid:' + val);
            this.computedCommonReqParams = this.commonReqParams();
        }
    },
    data() {
        return {
            table3Options,
            mainTableColumns: mainTableColumnsBV,
            sceneCommitParams: {},
            taskId: null,
            accountIdPre: 'XG',
            charts: chartsBV,
            chartTableColumns: [chartTableColumns7, chartTableColumns10, chartTableColumns8, chartTableColumns9],
            chartTableData: [[], [], [], []],
            searchText: '',
            currentAccountGroupId: '',
            currentCustIds: [], // 当前账户组下的客户号
            table3CurrentType: 'buyCnt',
            testTableData: [],
            pagination: {pageIndex: 1, pageRows: 10},
            computedCommonReqParams: {},
            currentSceneType: '2'
        };
    },
    methods: {
        handleClearAll() {
            // mark 样式
            let data = this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'];
            data.forEach(v => {
                v.itemStyle = {...{borderColor: 'transparent', borderWidth: 1}, ...v.itemStyle};
            });
            this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'] = data;
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
            let {resultList, chartDataList, id, taskId} = resData;
            this.taskId = taskId; // 后端使用
            if (chartDataList && !chartDataList.length) {
                return {
                    chartData: [],
                    mainTableData: []
                };
            }
            // 散点图sort
            chartDataList = this.sortDataByAcctIdCommon(chartDataList);
            this.mainTableData = this.sortDataByAcctIdCommon(resultList);
            let allLeaf = [];
            this.mainTableData.forEach(v => {
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
            chartDataList.forEach(v => {
                let index = allLeaf.findIndex(i => {
                    return i.acctId === v.acctId;
                });
                v.custIds = index > -1 ? allLeaf[index]['custIds'].join(',') : '';
            });
            let tabId = this.tabIndex || this.$store.getters.getTabIndex;
            if (tabId) {
                let storeData = this.$store.getters.getBlockData[tabId] || {};
                if (Object.keys(storeData).length) {
                    let chartTableData = storeData['chartTableData'];
                    if (chartTableData && chartTableData.length) {
                        this.chartTableData = chartTableData;
                    }
                }
            }
            this.chartTableData[0] = chartDataList;
            this.$store.commit('saveChartTableData', {data: this.chartTableData, index: id || this.tabIndex || this.$store.getters.getTabIndex});

            this.$store.commit('saveMainTableData', {data: this.mainTableData, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            return {
                chartData: chartDataList,
                mainTableData: this.mainTableColumns
            };
        },
        updateTableData(value, index, id) {
            if (index === 2) {
                var tb = [];
                var narr = [];
                for (var i = 0; i < value.length; i++) {
                    var n = tb.indexOf(value[i].txDt);
                    if (n === -1) {
                        tb.push(value[i].txDt);
                        narr.push({custId: [value[i].custId], txDt: value[i].txDt, custCnt: value[i]['custCnt']});
                    } else {
                        narr[n].custId.push(value[i].custId);
                        narr[n].custId = narr[n].custId.sort((a, b) => {
                            return a - b;
                        });
                        narr[n].custCnt = narr[n].custId.length;
                        narr[n].custId = narr[n].custId.join(',');
                    }
                }
                value = narr;
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
                    setTimeout(() => {
                        (this.getChart()[index])(data, 1);
                    });
                });
            }
        },
        getDetailBy3D() {
            let flag = this.$store.getters.getClickTab;
            if (flag && this.$store.getters.getchart2) {
                let chartData2 = this.$store.getters.getchart2;
                let chartData3 = this.$store.getters.getchart3;
                let chartData4 = this.$store.getters.getchart4;
                this.getChart2(chartData2);
                this.getChart3(chartData3);
                this.getChart4(chartData4);
            } else {
                if (this.currentAccountGroupId) {
                    let params = this.commonReqParams();
                    this.charts[1]['loading'] = true;
                    this.charts[2]['loading'] = true;
                    this.charts[3]['loading'] = true;
                    getDetailBy3D(params).then(resp => {
                        this.charts[1]['loading'] = false;
                        this.charts[2]['loading'] = false;
                        this.charts[3]['loading'] = false;
                        let {clusterNetQtty, clusterStateAnalByTime, clusterStateAnalByCust} = resp;
                        this.updateTableData(clusterNetQtty.tableData, 1);
                        this.updateTableData(clusterStateAnalByTime, 2);
                        this.updateTableData(clusterStateAnalByCust, 3);
                        this.drewChart2({mainData: clusterNetQtty.mainData, id: resp.id});
                        this.drewChart3({mainData: clusterStateAnalByTime, id: resp.id});
                        this.drewChart4({mainData: clusterStateAnalByCust, id: resp.id});
                    }).catch(e => {
                        console.error(e);
                        this.charts[1]['loading'] = false;
                        this.charts[2]['loading'] = false;
                        this.charts[3]['loading'] = false;
                    });
                }
            }
        },
        handleEchartClickEvent(params, index) {
            switch (String(index)) {
            case '0':
                // get chart2
                let currentId = params['value'][6];
                if (this.selectAccountGroupList.indexOf(currentId) > -1) { // 取消选中
                    // mark 样式
                    /* let data = this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'];
                    data.forEach(v => {
                        if (v['value'][6] === currentId) {
                            v.itemStyle = {...{borderColor: 'transparent', borderWidth: 1}, ...v.itemStyle};
                        }
                    });
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'] = data;
                    this.$store.commit('savechart1', {data: this.$refs['chartComponent1'][0].chartOptions, index: params.id || this.tabIndex || this.$store.getters.getTabIndex}); */
                    // table勾选状态
                    this.selectAccountGroupList = this.selectAccountGroupList.filter(v => {
                        return v !== currentId && this.childrenMap[currentId].indexOf(v) === -1;
                    });
                } else { // 选中
                    // mark 样式
                    /* let data = this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'];
                    data.forEach(v => {
                        if (v['value'][6] === currentId) {
                            v.itemStyle = {...{borderColor: '#fff', borderWidth: 3}, ...v.itemStyle};
                        }
                    });
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'] = data;
                    this.$store.commit('savechart1', {data: this.$refs['chartComponent1'][0].chartOptions, index: params.id || this.tabIndex || this.$store.getters.getTabIndex}); */
                    // table勾选状态
                    this.selectAccountGroupList.push(currentId);
                }
                // console.log(this.$refs['chartComponent1'][0].chartOptions);
                // this.getChart1(this.$refs['chartComponent1'][0].chartOptions, 1);
                this.$refs['self-tree-table'].$refs['tree-table'].setCheckedKeys(this.selectAccountGroupList);
                // test
                this.$store.commit('saveClickTab', false);
                this.currentAccountGroupId = params['value'][3];
                this.currentCustIds = params.value[5].split(',');
                this.$nextTick(() => {
                    this.getDetailBy3D();
                });
            }
        },
        handleEchartDblClickEvent(params, index) {
            console.log('dbdbdbdbdbdbdbdbdbdbdbdb');
            this.$store.commit('saveClickTab', false);
            switch (String(index)) {
            case '0':
                this.currentAccountGroupId = params['data'][4];
                this.currentCustIds = params.data[5].split(',');
                this.$nextTick(() => {
                    // this.getBlock2Data();
                    // this.getBlock3Data();
                    // this.getBlock4Data();
                    this.getDetailBy3D();
                });
                break;
            }
        },
        commonReqParams() {
            this.sceneCommitParams = this.$store.getters.sceneCommitParams[this.tabIndex || this.$store.getters.getTabIndex];
            return {
                id: this.sceneCommitParams.sceneIds,
                acctId: this.currentAccountGroupId, // || 'JL000000',
                custId: this.currentCustIds.join(','), // || '80000366,80000777,80000562',
                statStartDt: this.sceneCommitParams.statStartDt, // || '2017-02-20',
                statStopDay: this.sceneCommitParams.statStopDay, // || '2017-10-09',
                contrCd: this.sceneCommitParams.contrCd, // || 'cu1712',
                taskId: this.taskId
                // resultIds: this.resultIds || ''
            };
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
        this.resetToggleDetailFlag();
        this.sceneCommitParams = this.$store.getters.sceneCommitParams;
        if (Object.keys(this.sceneCommitParams).length) {
            this.drewChart1(1);
        }
    },
    beforeDestroy() {
        sessionStorage.removeItem('LAST_SELECT_3D');
        sessionStorage.removeItem('3D_scatter_chartData');
    }
};
</script>
<style lang="less" scoped>
    .scene-bv {
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
            padding-top: 135px;
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
