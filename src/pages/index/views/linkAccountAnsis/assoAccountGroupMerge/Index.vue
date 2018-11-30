<template>
    <div class="asso-account-group-merge">
        <div class="top-nav">
            <el-tabs type="card" v-model="activeTab" @tab-click="handleTabClick">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name" :label="item.label">
                </el-tab-pane>
            </el-tabs>
            <div class="tabs-button">
                <el-row>
                    <span style="margin-right: 10px;">导入结果集：</span>
                    <el-select class="custom-width" clearable size="small" v-model="resultIds">
                        <el-option
                            v-for="item in resultList"
                            :key="item.resultId"
                            :label="item.resultName"
                            :value="item.resultId">
                        </el-option>
                    </el-select>
                </el-row>
            </div>
        </div>
        <div v-if="activeTab==='0'">
            <el-row :gutter="10">
                <el-col :span="12" v-for="(item, index) in charts" :key="index">
                    <s-card :title="item.title" :icon="item.icon" class="self-card-css">
                        <div slot="right">
                            <el-button type="text" @click="toggleDetail(item)">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></el-button>
                        </div>
                        <div slot="content">
                            <div v-if="item['toggleDetailFlags']">
                                <s-table :height="300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <echarts-common v-else :loading="chartLoading[index]" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions[index]" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
                        </div>
                    </s-card>
                </el-col>
            </el-row>
            <div class="main-table">
                <s-card title="账户组信息" icon="el-icon-edit">
                    <div slot="right">
                        <el-input class="search-input" size="mini" placeholder="请输入账户组或客户编号" v-model="searchText" @keyup.enter.native="handleSearch">
                            <i class="el-icon-search" slot="prefix" @click="handleSearch" style="margin-left:4px; cursor: pointer;"></i>
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
import EchartsCommon from '@/components/index/common/EchartsCommon';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import TreeTable from '@/components/index/common/TreeTable';
import _ from 'lodash';
import {chartOption1, chartOption2, chartOption3, chartOption4, charts, mainTableColumns, chartTableColumns1, chartTableColumns2, chartTableColumns3, chartTableColumns4, resData1, resData2} from './components/constants';
export default {
    components: {EchartsCommon, SCard, STable, TreeTable},
    data() {
        return {
            resData1,
            resData2,
            mainTableColumns,
            accountIdPre: 'XG',
            charts: charts,
            chartLoading: [false, false, false, false],
            chartTableColumns: [chartTableColumns1, chartTableColumns2, chartTableColumns3, chartTableColumns4],
            chartOptions: [chartOption1, chartOption2, chartOption3, chartOption4],
            activeTab: '0',
            tabs: [
                {name: '0', label: '场景名称1'},
                {name: '1', label: '场景名称2'},
            ],
            chartTableData: [[], [], [], []],
            resultIds: '',
            resultList: [],
            searchText: '',
            selectAccountGroupList: [],
            mainTableData: [],
            childrenMap: {} // 账户组id和子客户号id的maping
        };
    },
    methods: {
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
        handleSearch() {

        },
        handleEchartClickEvent(params, domId) {
            console.log(params);
            switch (domId) {
            case 'chart0':
                // get chart2
                let currentId = params['data'][6];
                if (this.selectAccountGroupList.indexOf(currentId) > -1) { // 取消选中
                    // markPoint 样式
                    this.chartOptions[0]['series'][0]['markPoint']['data'] = this.chartOptions[0]['series'][0]['markPoint']['data'].filter(v => {
                        return v.coord[0] !== params['data'][0] && v.coord[1] !== params['data'][1];
                    });
                    // table勾选状态
                    this.selectAccountGroupList = this.selectAccountGroupList.filter(v => {
                        return v !== currentId && this.childrenMap[currentId].indexOf(v) === -1;
                    });
                    console.log(this.chartOptions[0]);
                } else { // 选中
                    // markPoint 样式
                    this.chartOptions[0]['series'][0]['markPoint']['data'].push({
                        coord: [params['data'][0], params['data'][1]]
                    });
                    // table勾选状态
                    this.selectAccountGroupList.push(currentId);
                }
                this.$refs['chart0'][0].initChart();
                console.log(this.selectAccountGroupList);
                this.$refs['self-tree-table'].$refs['tree-table'].setCheckedKeys(this.selectAccountGroupList);
                break;
            }
        },
        handleEchartDblClickEvent(params, domId) {
            console.log(params);
            console.log(domId);
            switch (domId) {
            case 'chart0':
                // get chart2
                break;
            case 'chart1':
                // get chart3
                break;
            case 'chart2':
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
        initPage() {
            this.drewChart1();
            this.drewChart2();
        },
        drewChart1() {
            let {mainTableData, chartData} = resData1;
            this.mainTableData = mainTableData;
            let allLeaf = [];
            mainTableData.forEach(v => {
                if (v.children && v.children.length) {
                    let custIds = v.children.map(v => {
                        return v.custId;
                    });
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
            this.chartOptions[0]['series'][0]['data'] = chartData.map(v => {
                return [v.acctGroOpenInt, v.acctGroAvgRela, v.custQtty, v.acctId, v.contrCd, v.custIds, v.id];
            });
            this.chartTableData[0] = chartData;
            console.log(this.chartOptions[0]);
        },
        drewChart2() {
            let {qtty, mainData} = resData2;
            this.chartOptions[1]['markLine']['data']['yAxis'] = qtty;
            let series = [];
            let date = [];
            Object.keys(mainData).forEach(v => {
                series.push({
                    name: v,
                    type: 'bar',
                    barMaxWidth: '45',
                    stack: '总量',
                    data: mainData[v].map(m => { return m.value; })
                });
                date = mainData[v].map(m => { return m.date; });
            });
            this.chartOptions[1]['series'] = series;
            this.chartOptions[1]['xAxis'][0]['data'] = date;
            console.log(this.chartOptions[1]);
        },
    },
    mounted() {
        this.initPage();
    }
};
</script>
<style lang="less" scoped>
    .asso-account-group-merge {
        background: transparent;
        .top-nav {
            position: relative;
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
