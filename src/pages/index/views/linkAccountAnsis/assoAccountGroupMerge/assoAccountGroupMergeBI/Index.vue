<template>
    <div class="scene-bi">
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
                                <div v-if="index===2">
                                    <el-select class="custom-width" clearable size="small" v-model="table3CurrentType">
                                        <el-option v-for="(o, oi) in table3Options" :key="oi" :label="o.label" :value="o.field"></el-option>
                                    </el-select>
                                </div>
                                <s-table :height="index === 2 ? 268 : 300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <div v-else class="chart-container">
                                <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0" :index="index" :propsChartHeight="propsChartHeight" :tabIndex="tabIndex" :sceneType="currentSceneType" :childrenMap="childrenMap" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateAccountGroupAndCustIds="updateAccountGroupAndCustIds" @getBlock2Data="getBlock2Data" @getBlock3Data="getBlock3Data"></chart1>
                                <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1" :index="index" :propsChartHeight="propsChartHeight" :tabIndex="tabIndex" :sceneType="currentSceneType" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @getBlock4Data="getBlock4Data"></chart2>
                                <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 2" :index="index" :propsChartHeight="propsChartHeight" :tabIndex="tabIndex" :sceneType="currentSceneType" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @getBlock4Data="getBlock4Data"></chart3>
                                <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 3" :index="index" :propsChartHeight="propsChartHeight" :tabIndex="tabIndex" :sceneType="currentSceneType" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData"></chart4>
                            </div>
                            <button v-show="!item['toggleDetailFlags']" type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen(index)">
                                <i class="fa" :class="[fullscreen ? 'fa-compress' : 'fa-expand-arrows-alt']"></i>
                            </button>
                        </s-full-screen>
                    </div>
                </s-card>
            </el-col>
        </el-row>
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
                                <tree-table ref="self-tree-table" :filterText="searchText" :columns="mainTableColumnsBI" :tableData="mainTableData" :clearAllSelected="true" @updateCheckedList="updateCheckedList" @handleClearAll="handleClearAll"></tree-table>
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
                                <el-button type="primary" size="small" @click="handleExportResult('3', tabIndex)">导出到结果集</el-button>
                                <br>
                                <el-button type="primary" size="small" class="self-width" @click="handleExportCsv('账户组信息-基本信息', mainTableColumnsBI)">导出到csv</el-button>
                                <br>
                                <el-button type="primary" size="small" @click="createNewData('3', tabIndex)">重新生成数据</el-button>
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
} from '@/api/dataAnsis/assoAccountGroupMerge';
import chart1 from '../components/chart5';
import chart2 from '../components/chart2';
import chart3 from '../components/chart3';
import chart4 from '../components/chart4';
import _ from 'lodash';
import {chartsBI, mainTableColumnsBI, chartTableColumns5, chartTableColumns2, chartTableColumns4, table3Options} from '../components/constants';
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
        currentCustIds: {
            handler(val) {
                this.createChart3Columnn(val);
            },
            deep: true
        },
        currentAccountGroupId() {
            this.computedCommonReqParams = this.commonReqParams();
        }
    },
    data() {
        return {
            table3Options,
            mainTableColumnsBI,
            taskId: null,
            sceneCommitParams: {},
            accountIdPre: 'DZ',
            charts: chartsBI,
            chartTableColumns: [chartTableColumns5, chartTableColumns2, [], chartTableColumns4],
            chartTableData: [[], [], [], []],
            resultIds: '',
            searchText: '',
            currentAccountGroupId: '',
            currentCustIds: [], // 当前账户组下的客户号
            table3CurrentType: 'buyCnt',
            computedCommonReqParams: {},
            mainTableData: [],
            currentSceneType: '3'
        };
    },
    methods: {
        handleClearAll() {
            // mark 样式
            let data = this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'];
            data.forEach(v => {
                v.itemStyle = {borderColor: 'transparent', borderWidth: 1};
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
        updateTableData(value, index, id) {
            if (index === 2) {
                this.createChart3Columnn(this.currentCustIds);
            }
            this.chartTableData[index] = value;
            this.$store.commit('saveChartTableData', {data: this.chartTableData, index: id || this.tabIndex || this.$store.getters.getTabIndex});
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
                // this.chartTableData = this.$store.getters.getChartTableData;
                let chartData = this.$store.getters.getchart2;
                this.getChart2(chartData);
            } else {
                this.charts[1]['loading'] = true;
                let params = this.commonReqParams();
                getChart2Data(params).then(resp => {
                    this.charts[1]['loading'] = false;
                    this.updateTableData(resp.tableData, 1);
                    this.drewChart2(resp);
                }).catch(e => {
                    console.error(e);
                    this.charts[1]['loading'] = false;
                });
            }
        },
        getBlock3Data() {
            let flag = this.$store.getters.getClickTab;
            if (flag && this.$store.getters.getchart3) {
                // this.chartTableData = this.$store.getters.getChartTableData;
                let chartData = this.$store.getters.getchart3;
                this.getChart3(chartData);
            } else {
                let params = this.commonReqParams();
                this.charts[2]['loading'] = true;
                getChart3Data(params).then(resp => {
                    this.charts[2]['loading'] = false;
                    this.updateTableData(resp.tableData, 2);
                    this.drewChart3(resp);
                }).catch(e => {
                    console.error(e);
                    this.charts[2]['loading'] = false;
                });
            }
        },
        getBlock4Data(date) {
            let flag = this.$store.getters.getClickTab;
            if (flag && this.$store.getters.getchart4) {
                this.$store.commit('saveClickTab', false);
                // this.chartTableData = this.$store.getters.getChartTableData;
                let chartData = this.$store.getters.getchart4;
                this.getChart4(chartData);
            } else {
                let params = this.commonReqParams();
                this.charts[3]['loading'] = true;
                params.txDt = date;
                getChart4Data(params).then(resp => {
                    this.charts[3]['loading'] = false;
                    this.updateTableData(resp.buysail, 3);
                    this.drewChart4(resp);
                }).catch(e => {
                    console.error(e);
                    this.charts[3]['loading'] = false;
                });
            }
        },
        handleEchartClickEvent(params, index) {
            switch (String(index)) {
            case '0':
                let currentId = params['data']['uid'];
                if (this.selectAccountGroupList.indexOf(currentId) > -1) { // 取消选中
                    // mark 样式
                    let data = this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'];
                    data.forEach(v => {
                        if (v.uid === currentId) {
                            v.itemStyle = {borderColor: 'transparent', borderWidth: 1};
                        }
                    });
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'] = data;
                    this.$store.commit('savechart1', {data: this.$refs['chartComponent1'][0].chartOptions, index: params.id || this.tabIndex || this.$store.getters.getTabIndex});
                    // table勾选状态
                    this.selectAccountGroupList = this.selectAccountGroupList.filter(v => {
                        return v !== currentId && this.childrenMap[currentId].indexOf(v) === -1;
                    });
                } else { // 选中
                    // mark 样式
                    let data = this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'];
                    data.forEach(v => {
                        if (v.uid === currentId) {
                            v.itemStyle = {borderColor: '#ffff00', borderWidth: 2};
                        }
                    });
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['data'] = data;
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
                this.currentAccountGroupId = params.name;
                this.currentCustIds = params.data.custIds.split(','); // params.custIds
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
                taskId: this.taskId
                // resultIds: this.resultIds || ''
            };
        },
        sortDataByAcctIdCommon(data) {
            return _.sortBy(data, [item => { return item.acctId; }]);
        },
        dealChart1AndMainTableData() {
            if (!this.tabIndex) {
                return {
                    chartData: {},
                    mainTableData: [],
                    chartDataList: []
                };
            }
            let resData = this.$store.getters.sceneCommitResp[this.tabIndex] || {};
            let {resultSetList, kmap, chartDataList, id, taskId} = resData;
            this.taskId = taskId;
            if (resultSetList && !resultSetList.length) {
                return {
                    chartData: {},
                    mainTableData: [],
                    chartDataList: []
                };
            }
            this.mainTableData = this.sortDataByAcctIdCommon(resultSetList);
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
            if (kmap && kmap.nodes) {
                kmap.nodes.forEach(v => {
                    let index = allLeaf.findIndex(i => {
                        return i.acctId === v.name;
                    });
                    v.custIds = index > -1 ? allLeaf[index]['custIds'].join(',') : '';
                    v.uid = index > -1 ? allLeaf[index]['id'] : '';
                });
            }
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
            this.$store.commit('saveMainTableData', {data: resultSetList, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            return {
                mainTableData: resultSetList,
                chartData: kmap,
                chartDataList: chartDataList
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
                'minWidth': 140
            });
            this.chartTableColumns.splice(2, 1, chart3Column);
        },
        nextStep() {
            this.$router.push({name: 'abnormity'});
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
            this.drewChart1();
        }
    }
};
</script>
<style lang="less" scoped>
    .scene-bi {
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
