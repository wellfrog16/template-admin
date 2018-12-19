<template>
    <div class="asso-account-group-merge">
        <div class="top-nav">
            <el-tabs type="card" v-model="activeTab" @tab-click="handleTabClick" v-if="sceneNameList.length">
                <el-tab-pane v-for="(item, index) in sceneNameList" :key="index" :name="String(index)" :label="item">
                </el-tab-pane>
            </el-tabs>
            <div class="tabs-button">
                <el-row>
                    <span style="margin-right: 10px;">导入结果集：</span>
                    <resultSelectComponent ref="resultSelectComponent" :resultIdProps="resultIds" @selectResultId="selectResultId" @getResultList="getResultList"></resultSelectComponent>
                    <el-button size="mini" type="primary" style="margin-left:5px;" @click="handleImport" :loading="fullLoading">确定</el-button>
                </el-row>
            </div>
        </div>
        <div v-if="activeTab==='0' || !sceneNameList.length" v-loading.lock="fullLoading">
            <el-row :gutter="10">
                <el-col :xl="12" :lg="12" :md="24" :sm="24" v-for="(item, index) in charts" :key="index">
                    <s-card :title="item.title" :icon="item.icon" class="self-card-css" :loading="item.loading">
                        <div slot="right">
                            <el-button type="text" @click="toggleDetail(item, index)">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></el-button>
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
                                <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0" :childrenMap="childrenMap" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData" @updateMainTableData="updateMainTableData" @updateAccountGroupAndCustIds="updateAccountGroupAndCustIds" @getBlock2Data="getBlock2Data"  @getBlock3Data="getBlock3Data"></chart1>
                                <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData" @getBlock4Data="getBlock4Data"></chart2>
                                <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 2" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData" @getBlock4Data="getBlock4Data"></chart3>
                                <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 3" :commonReqParams="computedCommonReqParams" :currentAccountGroupId="currentAccountGroupId" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData"></chart4>
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
                        <el-input class="search-input" size="mini" placeholder="请输入账户组号或客户编号" v-model="searchText">
                            <i class="el-icon-search" slot="prefix" style="margin-left:4px; cursor: pointer;"></i>
                        </el-input>
                    </div>
                    <div slot="content">
                        <el-row :gutter="20">
                            <el-col :span="21">
                                <div>
                                    <tree-table ref="self-tree-table" :filterText="searchText" :columns="mainTableColumns" :tableData="mainTableData" @updateCheckedList="updateCheckedList"></tree-table>
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
                                    <el-button type="primary" size="small" @click="handleExportResult('1')">导出到结果集</el-button>
                                    <br>
                                    <el-button type="primary" size="small" class="self-width" @click="handleExportCsv('账户组信息', mainTableColumns)">导出到csv</el-button>
                                    <br>
                                    <el-button type="primary" size="small" @click="createNewData">重新生成数据</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </s-card>
                <div style="text-align:center; margin: 20px 0;">
                    <el-button size="small" type="primary" style="width: 100px;" @click="nextStep">下一步</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// import EchartsCommon from '@/components/index/common/EchartsCommon';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import TreeTable from '@/components/index/common/TreeTable';
import ResultSelectComponent from '@/components/index/common/ResultSelectComponent';
import treeTableMixin from '@/pages/index/common/treeTableMixin';

import {
    getExportResultSet,
    getChart2Data,
    getChart3Data,
    getChart4Data,
} from '@/api/dataAnsis/assoAccountGroupMerge';
import {getInfoByResultId} from '@/api/common';
import chart1 from './components/chart1';
import chart2 from './components/chart2';
import chart3 from './components/chart3';
import chart4 from './components/chart4';
import {charts, mainTableColumns, chartTableColumns1, chartTableColumns2, chartTableColumns4, table3Options} from './components/constants';
export default {
    components: {chart1, chart2, chart3, chart4, SCard, STable, TreeTable, ResultSelectComponent},
    mixins: [treeTableMixin],
    watch: {
        currentCustIds: {
            handler(val) {
                this.createChart3Columnn(val);
            },
            deep: true
        },
        currentAccountGroupId() {
            this.computedCommonReqParams = this.commonReqParams();
            console.log(this.computedCommonReqParams);
        }
    },
    data() {
        return {
            table3Options,
            mainTableColumns,
            fullLoading: false,
            sceneCommitParams: {},
            accountIdPre: 'XG',
            charts: charts,
            chartTableColumns: [chartTableColumns1, chartTableColumns2, [], chartTableColumns4],
            activeTab: '0',
            tabs: ['场景名称1', '场景名称2'],
            chartTableData: [[], [], [], []],
            resultIds: '',
            searchText: '',
            currentAccountGroupId: '',
            currentCustIds: [], // 当前账户组下的客户号
            table3CurrentType: 'buyCnt',
            testTableData: [],
            pagination: {pageIndex: 1, pageRows: 10},
            computedCommonReqParams: {}
        };
    },
    computed: {
        sceneNameList() {
            return this.sceneCommitParams.sceneNames ? this.sceneCommitParams.sceneNames.split(',') : [];
        }
    },
    methods: {
        updateResultList() {
            this.$refs['resultSelectComponent'].getResultList();
        },
        selectResultId(val) {
            this.resultIds = val;
        },
        getResultList(list) {
            setTimeout(() => {
                let sceneCommitParams = this.$store.getters.sceneCommitParams;
                this.resultIds = sceneCommitParams.resultIds || '';
            });
        },
        handleImport() {
            // 导入结果集
            this.fullLoading = true;
            getInfoByResultId(this.resultIds).then(resp => {
                this.computedCommonReqParams = {
                    acctId: this.currentAccountGroupId, // || 'XG00001',
                    custId: this.currentCustIds.join(','), // || '80001716,80000025,80001461',
                    statStartDt: resp.statStartDt, // || '2017-02-20',
                    statStopDay: resp.statStopDay, // || '2017-10-09',
                    contrCd: resp.contrCd, // || 'cu1712'
                };
                this.$store.commit('saveSceneCommitParams', {
                    resultIds: this.resultIds,
                    statStartDt: resp.statStartDt,
                    statStopDay: resp.statStopDay,
                    contrCd: resp.contrCd,
                    statFreq: resp.statFreq
                });
                getExportResultSet({resultIds: this.resultIds}).then(resp => {
                    this.fullLoading = false;
                    this.$store.commit('saveSceneCommitResp', resp);
                    this.$nextTick(() => {
                        this.drewChart1();
                    });
                });
            });
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
        updateTableData(value, index) {
            if (index === 2) {
                this.createChart3Columnn(this.currentCustIds);
            }
            this.chartTableData[index] = value;
            // test
            localStorage.setItem('CHART_TABLE_DATA', JSON.stringify(this.chartTableData));
        },
        handleTabClick(tab) {
            this.activeTab = tab.name;
        },
        toggleDetail(item, index) {
            this.charts[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
            if (!item.toggleDetailFlags) {
                this.$nextTick(() => {
                    let dataMap = [this.$store.getters.getXGchart1, this.$store.getters.getXGchart2, this.$store.getters.getXGchart3, this.$store.getters.getXGchart4];
                    (this.getChart()[index])(1, dataMap[index]);
                });
            }
        },
        getBlock2Data() {
            this.charts[1]['loading'] = true;
            let params = this.commonReqParams();
            getChart2Data(params).then(resp => {
                this.charts[1]['loading'] = false;
                this.drewChart2(resp);
            });
        },
        getBlock3Data() {
            this.charts[2]['loading'] = true;
            let params = this.commonReqParams();
            getChart3Data(params).then(resp => {
                this.charts[2]['loading'] = false;
                this.drewChart3(resp);
            });
        },
        getBlock4Data(date) {
            this.charts[3]['loading'] = true;
            let params = this.commonReqParams();
            params.txDt = date;
            getChart4Data(params).then(resp => {
                this.charts[3]['loading'] = false;
                this.drewChart4(resp);
            });
        },
        handleEchartDblClickEvent(params, index) {
            console.log(params);
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
                    this.$store.commit('saveXGchart1', this.$refs['chartComponent1'][0].chartOptions);
                    // table勾选状态
                    this.selectAccountGroupList = this.selectAccountGroupList.filter(v => {
                        return v !== currentId && this.childrenMap[currentId].indexOf(v) === -1;
                    });
                } else { // 选中
                    // markPoint 样式
                    this.$refs['chartComponent1'][0].chartOptions['series'][0]['markPoint']['data'].push({
                        coord: [params['data'][0], params['data'][1]]
                    });
                    console.log(this.$refs['chartComponent1'][0].chartOptions['series'][0]['markPoint']);
                    this.$store.commit('saveXGchart1', this.$refs['chartComponent1'][0].chartOptions);
                    // table勾选状态
                    this.selectAccountGroupList.push(currentId);
                }
                this.getChart1(1, this.$refs['chartComponent1'][0].chartOptions);
                console.log(this.selectAccountGroupList);
                this.$refs['self-tree-table'].$refs['tree-table'].setCheckedKeys(this.selectAccountGroupList);
                break;
            }
        },
        handleEchartClickEvent(params, index) {
            console.log(params);
            switch (String(index)) {
            case '0':
                this.currentAccountGroupId = params['data'][3];
                this.currentCustIds = params.data[5].split(',');
                console.log(this.currentAccountGroupId);
                console.log(this.currentCustIds);
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
                this.getBlock4Data(params['data'][5]);
                // get chart4
                break;
            }
        },
        commonReqParams() {
            this.sceneCommitParams = this.$store.getters.sceneCommitParams;
            return {
                acctId: this.currentAccountGroupId, // || 'XG00001',
                custId: this.currentCustIds.join(','), // || '80001716,80000025,80001461',
                statStartDt: this.sceneCommitParams.statStartDt, // || '2017-02-20',
                statStopDay: this.sceneCommitParams.statStopDay, // || '2017-10-09',
                contrCd: this.sceneCommitParams.contrCd, // || 'cu1712'
                // resultIds: this.resultIds || ''
            };
        },
        getChart() {
            return [this.getChart1, this.getChart2, this.getChart3, this.getChart4];
        },
        drewChart1() {
            this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData();
        },
        getChart1(flag, data) {
            this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].initChart(flag, data);
        },
        drewChart2(resp) {
            this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].getData(resp);
        },
        getChart2(flag, data) {
            this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].initChart(flag, data);
        },
        drewChart3(resp) {
            this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].getData(resp);
        },
        getChart3(flag, data) {
            this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].initChart(flag, data);
        },
        drewChart4(resp) {
            this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].getData(resp);
        },
        getChart4(flag, data) {
            this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].initChart(flag, data);
        },
        createChart3Columnn(val) {
            if (!val) {
                return;
            }
            let chart3Column = val.map(v => {
                return {
                    'label': v,
                    'field': v,
                    'minWdith': 120,
                    'formatter': item => {
                        item = item.map;
                        return item[v] ? item[v][this.table3CurrentType] : '';
                    }
                };
            });
            chart3Column.unshift({
                'label': '交易日',
                'field': 'date',
                'minWdith': 120
            });
            this.chartTableColumns.splice(2, 1, chart3Column);
        },
        nextStep() {
            this.$router.push({name: 'abnormity'});
        },
        resetDetailFlag() {
            this.charts.forEach(v => {
                v.toggleDetailFlags = false;
            });
        }
    },
    mounted() {
        if (sessionStorage.getItem('CURRENT_CUST_IDS')) {
            this.currentCustIds = JSON.parse(sessionStorage.getItem('CURRENT_CUST_IDS'));
        }
        if (sessionStorage.getItem('CURRENT_GROUP_ID')) {
            this.currentAccountGroupId = JSON.parse(sessionStorage.getItem('CURRENT_GROUP_ID'));
        }
        this.createChart3Columnn(this.currentCustIds);
        // this.resetDetailFlag();
        this.sceneCommitParams = this.$store.getters.sceneCommitParams;
        this.chartTableData = this.$store.getters.getChartTableData;
        this.mainTableData = this.$store.getters.getMainTableData;
        // this.getTableData();
        // test
        // this.drewChart1();
    }
};
</script>
<style lang="less" scoped>
    .asso-account-group-merge {
        background: transparent;
        .top-nav {
            position: relative;
            min-height: 56px;
        }
        .tabs-button {
            position: absolute;
            right: 0;
            top: 0;
        }
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
            padding-top: 40px;
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
        .self-width {
            width: 104px;
        }
    }
</style>
