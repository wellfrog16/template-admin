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
                    <resultSelectComponent :resultIdProps="resultIds" @selectResultId="selectResultId"></resultSelectComponent>
                </el-row>
            </div>
        </div>
        <div v-if="activeTab==='0' || !sceneNameList.length">
            <el-row :gutter="10">
                <el-col :span="12" v-for="(item, index) in charts" :key="index">
                    <s-card :title="item.title" :icon="item.icon" class="self-card-css">
                        <div slot="right">
                            <el-button type="text" @click="toggleDetail(item)">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></el-button>
                        </div>
                        <div slot="content">
                            <div v-show="item['toggleDetailFlags']">
                                <div v-if="index===2">
                                    <el-select class="custom-width" clearable size="small" v-model="table3CurrentType">
                                        <el-option v-for="(o, oi) in table3Options" :key="oi" :label="o.label" :value="o.field"></el-option>
                                    </el-select>
                                </div>
                                <s-table :height="index === 2 ? 268 : 300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <div v-show="!item['toggleDetailFlags']">
                                <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0" :childrenMap="childrenMap" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData" @updateMainTableData="updateMainTableData" @updateAccountGroupAndCustIds="updateAccountGroupAndCustIds" @drewChart2="drewChart2"  @drewChart3="drewChart3"></chart1>
                                <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1" :commonReqParams="commonReqParams()" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData" @drewChart4="drewChart4"></chart2>
                                <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 2" :commonReqParams="commonReqParams()" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData" @drewChart4="drewChart4"></chart3>
                                <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 3" :commonReqParams="commonReqParams()" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent" @updateTableData="updateTableData"></chart4>
                            </div>
                            <!-- <echarts-common v-else :loading="chartLoading[index]" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions[index]" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common> -->
                        </div>
                    </s-card>
                </el-col>
            </el-row>
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
                                <div style="overflow:auto; max-height:400px;">
                                    <tree-table ref="self-tree-table" :filterText="searchText" :columns="mainTableColumns" :tableData="mainTableData" @updateCheckedList="updateCheckedList"></tree-table>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="operate-button-group">
                                    <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
                                    <br>
                                    <el-button type="warning" size="small" @click="handleSplit">拆分</el-button>
                                    <br>
                                    <el-button type="warning" size="small" @click="handleMerge">合并</el-button>
                                    <br>
                                    <el-button type="primary" size="small" @click="handleExportResult">导出到结果集</el-button>
                                    <br>
                                    <el-button type="primary" size="small" @click="handleExportCsv">导出到csv</el-button>
                                    <br>
                                    <el-button type="primary" size="small" @click="createNewData">重新生成数据</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </s-card>
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
// import {getChart2Data} from '@/api/dataAnsis/assoAccountGroupMerge';
import chart1 from './components/chart1';
import chart2 from './components/chart2';
import chart3 from './components/chart3';
import chart4 from './components/chart4';
import _ from 'lodash';
import {charts, mainTableColumns, chartTableColumns1, chartTableColumns2, chartTableColumns4, table3Options} from './components/constants';
export default {
    components: {chart1, chart2, chart3, chart4, SCard, STable, TreeTable, ResultSelectComponent},
    watch: {
        currentCustIds: {
            handler(val) {
                this.createChart3Columnn(val);
            },
            deep: true
        }
    },
    data() {
        return {
            table3Options,
            mainTableColumns,
            sceneCommitParams: {},
            accountIdPre: 'XG',
            charts: charts,
            chartTableColumns: [chartTableColumns1, chartTableColumns2, [], chartTableColumns4],
            activeTab: '0',
            tabs: ['场景名称1', '场景名称2'],
            chartTableData: [[], [], [], []],
            resultIds: '',
            searchText: '',
            selectAccountGroupList: [],
            mainTableData: [],
            currentAccountGroupId: '',
            currentCustIds: [], // 当前账户组下的客户号
            table3CurrentType: 'buyCnt',
            childrenMap: {} // 账户组id和子客户号id的maping
        };
    },
    computed: {
        sceneNameList() {
            return this.sceneCommitParams.sceneNames ? this.sceneCommitParams.sceneNames.split(',') : [];
        }
    },
    methods: {
        selectResultId(val) {
            this.resultIds = val;
        },
        updateAccountGroupAndCustIds(groupId, custIds) {
            this.currentAccountGroupId = groupId;
            this.currentCustIds = custIds;
        },
        updateMainTableData(val) {
            this.mainTableData = val;
        },
        updateTableData(value, index) {
            if (index === 2) {
                this.createChart3Columnn(this.currentCustIds);
            }
            this.chartTableData[index] = value;
        },
        updateCheckedList(checkedNodes, checkedKeys) {
            this.selectAccountGroupList = checkedKeys;
        },
        handleTabClick(tab) {
            this.activeTab = tab.name;
        },
        toggleDetail(item) {
            let index = this.charts.findIndex(v => {
                return v.title === item.title;
            });
            this.charts[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
        },
        handleEchartClickEvent(params, index) {
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
                    // table勾选状态
                    this.selectAccountGroupList.push(currentId);
                }
                this.drewChart1();
                console.log(this.selectAccountGroupList);
                this.$refs['self-tree-table'].$refs['tree-table'].setCheckedKeys(this.selectAccountGroupList);
                break;
            }
        },
        handleEchartDblClickEvent(params, index) {
            console.log(params);
            switch (String(index)) {
            case '0':
                this.currentAccountGroupId = params['data'][6];
                this.currentCustIds = params.data[5].split(',');
                this.drewChart2();
                this.drewChart3();
                // get chart2
                break;
            case '1':
                this.drewChart4();
                // get chart3
                break;
            case '2':
                this.drewChart4();
                // get chart4
                break;
            }
        },
        deleteMethods(deleteList) {
            let list = JSON.parse(JSON.stringify(this.mainTableData));
            deleteList.forEach(v => {
                if (v.children) {
                    list = list.filter(l => {
                        return l.acctId !== v.acctId;
                    });
                } else {
                    list.forEach(l => {
                        if (l.children && l.acctId === v.acctId) {
                            l.children.splice(l.children.findIndex(f => { return f.custId === v.custId; }), 1);
                        }
                    });
                }
            });
            this.mainTableData = JSON.parse(JSON.stringify(list));
        },
        handleDelete() {
            let checkedNodes = this.getCheckedNodes();
            console.log(checkedNodes);
            this.deleteMethods(checkedNodes);
        },
        getMaxAccountId() {
            let acctIds = [...new Set(this.mainTableData.map(v => {
                return +v.acctId.slice(2);
            }))];
            return _.max(acctIds);
        },
        createAccountId(propsNew) {
            let newId = propsNew || this.getMaxAccountId() + 1;
            return this.accountIdPre + (('0000' + newId).slice(-5));
        },
        createTreeId() {
            return new Date().getTime();
        },
        getCheckedNodes(flag) {
            return this.$refs['self-tree-table'].$refs['tree-table'].getCheckedNodes(flag);
        },
        handleSplit() {
            let checkedNodes = this.getCheckedNodes();
            let acctIds = checkedNodes.map(v => {
                return v.acctId;
            });
            acctIds = [...new Set(acctIds)];
            if (!acctIds.length) {
                this.$message.error('请选择子账户号');
                return;
            }
            console.log(checkedNodes);
            if (acctIds.length > 1) {
                this.$message.error('请选择一个账户组内的子账户号');
                return;
            }
            let checkedChildren = this.getCheckedNodes(true);
            this.deleteMethods(checkedNodes);
            checkedChildren.forEach(v => {
                v.acctId = this.createAccountId();
            });
            this.mainTableData.push({
                id: this.createTreeId(),
                acctId: this.createAccountId(),
                children: checkedChildren
            });
            this.sortByAccountId();
        },
        sortByAccountId() {
            this.mainTableData = _.sortBy(this.mainTableData, item => {
                return item.acctId;
            });
        },
        handleMerge() {
            let checkedNodes = this.getCheckedNodes();
            let checkedChildren = this.getCheckedNodes(true);
            let acctGroups = [];
            let acctIds = [];
            checkedNodes.forEach(v => {
                if (v.acctId && !v.custId) {
                    acctGroups.push(v);
                    acctIds.push(v.acctId);
                }
            });
            if (!(acctGroups.length && acctGroups.length > 1)) {
                this.$message.error('请选择多个账户组');
                return;
            }
            let acctIdsNO = acctIds.map(v => {
                return v.slice(2);
            });
            let minNo = _.min(acctIdsNO);
            this.deleteMethods(checkedNodes);
            checkedChildren.forEach(v => {
                v.acctId = this.createAccountId(minNo);
            });
            this.mainTableData.push({
                id: this.createTreeId(),
                acctId: this.createAccountId(minNo),
                children: checkedChildren
            });
            this.sortByAccountId();
        },
        handleExportResult() {},
        handleExportCsv() {},
        createNewData() {},
        commonReqParams() {
            return {
                accountTeamNo: this.currentAccountGroupId || 'XG00001',
                custId: this.currentCustIds.join(',') || '80001716,80000025,80001461',
                statTimeBegin: this.sceneCommitParams.statStartDt || '2017-02-20',
                statTimeEnd: this.sceneCommitParams.statStopDay || '2017-10-09',
                contrCode: this.sceneCommitParams.contrCd || 'cu1712'
            };
        },
        drewChart1() {
            this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData();
        },
        drewChart2() {
            this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].getData();
        },
        drewChart3() {
            this.$refs['chartComponent3'] && this.$refs['chartComponent3'][0] && this.$refs['chartComponent3'][0].getData();
        },
        drewChart4() {
            this.$refs['chartComponent4'] && this.$refs['chartComponent4'][0] && this.$refs['chartComponent4'][0].getData();
        },
        createChart3Columnn(val) {
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
        }
    },
    mounted() {
        this.sceneCommitParams = this.$store.getters.sceneCommitParams;
        // test
        this.drewChart4();
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
