<template>
    <div :class="$style.multiple_scenes_merge">
        <!-- <el-tabs v-model="activeTab" type="card">
            <el-tab-pane
                v-for="item in tabList"
                :label="item.label"
                :key="item.name"
                :name="item.name"
            ></el-tab-pane>
        </el-tabs> -->
        <!--导入树形table-->
        <account-group-table ref="accountGroupTableRef" @updateLoading="updateLoading" @updateTableInfo="updateTableInfo" @updateMainTableData="updateMainTableData" @requestParams="requestParams" @updateSelectAccountGroupList="updateSelectAccountGroupList" @handleClearAll="handleClearAll"></account-group-table>
        <!-- 关系图谱 -->
        <graph-chart ref="graphChartRef" :relativeTable="relativeTable" :resultTable="resultTable" :mainTableData="mainTableData" :selectAccountGroupList="selectAccountGroupList" @getBlockData="getBlockData" @updateSelectAccountGroupList="updateSelectAccountGroupList"></graph-chart>
        <!-- 账户组钻取 -->
        <div>
            <el-row :gutter="10">
                <el-col :xl="12" :lg="12" :md="24" :sm="24" v-for="(item, index) in blocks" :key="index">
                    <s-card :title="item.title" :icon="item.icon" class="self-card-css" :loading="item.loading">
                        <div slot="right">
                            <el-button type="text" @click="toggleDetail(item, index)">
                                <span v-if="!item['toggleDetailFlags']">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></span>
                                <span v-else>图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i></span>
                            </el-button>
                        </div>
                        <div slot="content" style="min-height: 300px;">
                            <s-full-screen class="self-fullscreen-wrap" ref="fullscreen" :fullscreen.sync="fullscreen" @change="fullscreenChange" background="#00255c">
                                <div v-if="item['toggleDetailFlags']">
                                    <div v-if="index===5">
                                        <el-select class="custom-width" clearable size="small" v-model="table3CurrentType" placeholder="请选择一个维度">
                                            <el-option v-for="(o, oi) in table3Options" :key="oi" :label="o.label" :value="o.field"></el-option>
                                        </el-select>
                                    </div>
                                    <s-table :height="index === 5 ? 268 : 300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                                </div>
                                <div v-else class="chart-container">
                                    <block1 ref="block1" v-if="index === 0" :propsChartHeight="propsChartHeight" :index="index" :tableData="block1TableData"></block1>
                                    <block2 ref="block2" v-if="index === 1" :propsChartHeight="propsChartHeight" :index="index"></block2>
                                    <block3 ref="block3" v-if="index === 2" :propsChartHeight="propsChartHeight" :index="index"></block3>
                                    <block4 ref="block4" v-if="index === 3" :propsChartHeight="propsChartHeight" :index="index"></block4>
                                    <block5 ref="block5" domRef="combine5" v-if="index === 4" :propsChartHeight="propsChartHeight" :index="index" @handleEchartDblClickEvent="getDetailByDate"></block5>
                                    <block6 ref="block6" domRef="combine6" v-if="index === 5" :propsChartHeight="propsChartHeight" :index="index" :currentCustIds="commonParams.custId ? commonParams.custId.split(',') : []" @handleEchartDblClickEvent="getDetailByDate"></block6>
                                    <block7 ref="block7" domRef="combine7" v-if="index === 6" :propsChartHeight="propsChartHeight" :index="index"></block7>
                                </div>
                                <button v-show="!item['toggleDetailFlags'] && index !== 0" type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen(index)">
                                    <i class="fa" :class="[fullscreen ? 'fa-compress' : 'fa-expand-arrows-alt']"></i>
                                </button>
                            </s-full-screen>
                        </div>
                    </s-card>
                </el-col>
            </el-row>
        </div>
        <div style="text-align:center; margin: 20px 0;">
            <el-button size="small" type="warning" style="width: 100px;" @click="nextStep">下一步</el-button>
        </div>
    </div>
</template>
<script>
import _ from 'lodash';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import graphChart from './components/graphChart'; // 全量关系图谱组件
import accountGroupTable from './components/accountGroupTable'; // 账户组信息table组件
import block1 from './components/block1'; // 钻取
import block2 from './components/block2';
import block3 from './components/block3';
import block4 from './components/block4';
import block5 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart2';
import block6 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart3';
import block7 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart4';
import {chartTableColumns2, chartTableColumns4, table3Options} from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/constants';
import {combineChartTableColumns1, combineChartTableColumns2, combineChartTableColumns3, combineChartTableColumns4, blocks} from './components/constants';
import {fetchBlockData1, fetchBlockData2, fetchBlockData4} from '@/api/dataAnsis/multipleScenesMerge';
import {
    getChart2Data,
    getChart3Data,
    getChart4Data,
} from '@/api/dataAnsis/assoAccountGroupMerge';
export default {
    name: 'Index',
    components: {
        graphChart,
        accountGroupTable,
        SCard,
        STable,
        block1,
        block2,
        block3,
        block4,
        block5,
        block6,
        block7,
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    // 存储数据

    data() {
        return {
            blocks,
            table3Options,
            table3CurrentType: 'buyCnt',
            mainTableData: [],
            selectAccountGroupList: [],
            chartTableColumns: [combineChartTableColumns1, combineChartTableColumns2, combineChartTableColumns3, combineChartTableColumns4, chartTableColumns2, [], chartTableColumns4],
            chartTableData: [[], [], [], [], [], [], []],
            chartData: [[], [], [], [], [], [], []],
            activeTab: '0',
            tabList: [{name: '0', label: '手工合并'}],
            loading: false,
            block1TableData: [], // 矩阵数据
            relativeTable: '',
            resultTable: '',
            currentFullScreenIndex: 0,
            fullscreen: false,
            propsChartHeight: 300,
            proCommonParams: {},
            commonParams: {}
        };
    },
    computed: {},
    watch: {},
    methods: {
        getDetailByDate(params, index) {
            this.getBlockData7(params['name']);
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
            this.chartTableColumns.splice(5, 1, chart3Column);
        },
        updateLoading(flag) {
            this.loading = flag;
        },
        updateTableInfo(val) {
            const {relativeTable, resultTable} = val;
            this.relativeTable = relativeTable;
            this.resultTable = resultTable;
        },
        requestParams(params) {
            this.proCommonParams = params;
        },
        updateMainTableData(val) {
            this.mainTableData = val;
        },
        updateSelectAccountGroupList(val) {
            this.selectAccountGroupList = val;
            this.$refs['accountGroupTableRef'].selectAccountGroupList = val;
            this.$refs['accountGroupTableRef'].$refs['self-tree-table'].$refs['tree-table'].setCheckedKeys(val);
            setTimeout(() => {
                this.$refs['accountGroupTableRef'].$refs['self-tree-table'].handleChecked(val);
            }, 500);
        },
        handleClearAll() {
            // mark 样式
            let data = this.$refs['graphChartRef'].chartOptions['series'][0]['data'];
            data.forEach(v => {
                v.itemStyle = {borderColor: 'transparent', borderWidth: 1};
            });
            this.$refs['graphChartRef'].chartOptions['series'][0]['data'] = data;
            // table勾选状态
            this.updateSelectAccountGroupList([]);
            this.$refs['graphChartRef'].initChart(this.$refs['graphChartRef'].chartOptions);
        },
        toggleDetail(item, index) {
            this.blocks[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
            if (!item.toggleDetailFlags) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        (this.getChart()[index])(this.chartData[index], 1);
                    });
                });
            }
        },
        getChart() {
            return [() => {}, this.getChart2, this.getChart3, this.getChart4, this.getChart5, this.getChart6, this.getChart7];
        },
        getChart2(data) {
            setTimeout(() => {
                this.$refs['block2'] && this.$refs['block2'][0] && this.$refs['block2'][0].drewChart(data);
            });
        },
        getChart3(data) {
            setTimeout(() => {
                this.$refs['block3'] && this.$refs['block3'][0] && this.$refs['block3'][0].drewChart(data);
            });
        },
        getChart4(data) {
            setTimeout(() => {
                this.$refs['block4'] && this.$refs['block4'][0] && this.$refs['block4'][0].drewChart(data);
            });
        },
        getChart5(data) {
            setTimeout(() => {
                this.$refs['block5'] && this.$refs['block5'][0] && this.$refs['block5'][0].getData(data);
            });
        },
        getChart6(data) {
            setTimeout(() => {
                this.$refs['block6'] && this.$refs['block6'][0] && this.$refs['block6'][0].getData(data);
            });
        },
        getChart7(data) {
            setTimeout(() => {
                this.$refs['block7'] && this.$refs['block7'][0] && this.$refs['block7'][0].getData(data);
            });
        },
        getBlockData(propsParams) {
            // test
            // propsParams = {
            //     accNumList: propsParams.accNumList || '80000455,80000501',
            //     contrCd: this.proCommonParams.contractCode || 'cu1712',
            //     custId: propsParams.accNumList || '80000455,80000501',
            //     acctId: propsParams.acctId || 'ZH000002',
            //     taskId: this.proCommonParams.taskId || '719966',
            //     relativeTable: 'ts_dm.tls_combine_1552289017354_relative',
            //     resultTable: 'ts_dm.tls_combine_1552289017354_result',
            //     statStartDt: this.proCommonParams.statStartDt || '2016-01-31',
            //     statStopDay: this.proCommonParams.statStopDay || '2019-02-26'
            // };
            propsParams.custId = propsParams.accNumList; // 字段不一致
            propsParams.contrCd = this.proCommonParams.contractCode;
            propsParams.taskId = this.proCommonParams.taskId;
            propsParams.statStartDt = this.proCommonParams.startDate;
            propsParams.statStopDay = this.proCommonParams.endDate;
            this.commonParams = propsParams;
            this.getBlockData1(propsParams);
            this.getBlockData2(propsParams);
            this.getBlockData3(propsParams);
            this.getBlockData4(propsParams);
            this.getBlockData5(propsParams);
            this.getBlockData6(propsParams);
        },
        getBlockData1(propsParams) {
            let params = propsParams;
            this.blocks[0]['loading'] = true;
            fetchBlockData1(params).then(resp => {
                this.blocks[0]['loading'] = false;
                const {mainData, tableData} = resp;
                this.chartTableData[0] = tableData;
                this.block1TableData = mainData;
            }).catch(e => {
                this.blocks[0]['loading'] = false;
            });
        },
        getBlockData2(propsParams) {
            let params = propsParams;
            this.blocks[1]['loading'] = true;
            fetchBlockData2(params).then(resp => {
                this.blocks[1]['loading'] = false;
                const {tableData, nodes, links} = resp;
                this.chartTableData[1] = tableData;
                this.chartData[1] = {nodes, links};
                this.getChart2({nodes, links});
            }).catch(e => {
                this.blocks[1]['loading'] = false;
            });
        },
        getBlockData3(propsParams) {
            // 根据acctId获取
            let filterItem = this.mainTableData.filter(v => {
                return v.acctId === propsParams.acctId;
            });
            this.chartTableData[2] = filterItem[0]['children'];
            this.chartData[2] = filterItem[0]['children'];
            this.getChart3(this.chartData[2]);
        },
        getBlockData4(propsParams) {
            let params = propsParams;
            this.blocks[3]['loading'] = true;
            fetchBlockData4(params).then(resp => {
                this.blocks[3]['loading'] = false;
                const {tableData, nodes, links} = resp;
                this.chartTableData[3] = tableData;
                this.chartData[3] = {nodes, links};
                this.getChart4({nodes, links});
            }).catch(e => {
                this.blocks[3]['loading'] = false;
            });
        },
        getBlockData5(propsParams) {
            let params = propsParams;
            this.blocks[4]['loading'] = true;
            getChart2Data(params).then(resp => {
                this.blocks[4]['loading'] = false;
                this.chartTableData[4] = resp.tableData;
                this.chartData[4] = resp;
                this.getChart5(resp);
            }).catch(e => {
                this.blocks[4]['loading'] = false;
            });
        },
        getBlockData6(propsParams) {
            let params = propsParams;
            this.blocks[5]['loading'] = true;
            getChart3Data(params).then(resp => {
                this.blocks[5]['loading'] = false;
                this.createChart3Columnn(propsParams.accNumList.split(','));
                const {tableData} = resp;
                this.chartTableData[5] = tableData;
                this.chartData[5] = resp;
                this.getChart6(resp);
                // 最近交易日，包含买入或卖出
                let selectMax = _.maxBy(resp.mainData, v => {
                    if (!!v.sellAcctCnt || !!v.buyAcctCnt) {
                        return v.txDt;
                    }
                });
                setTimeout(() => {
                    // 钻取分时图
                    this.getBlockData7(selectMax ? selectMax.txDt : resp.mainData[0]['txDt']);
                });
            }).catch(e => {
                this.blocks[5]['loading'] = false;
            });
        },
        getBlockData7(txDt) {
            let params = this.commonParams;
            params.txDt = txDt;
            this.blocks[6]['loading'] = true;
            getChart4Data(params).then(resp => {
                this.blocks[6]['loading'] = false;
                const {buysail} = resp;
                resp.txDt = txDt;
                this.chartTableData[6] = buysail;
                this.chartData[6] = resp;
                this.getChart7(resp);
            }).catch(e => {
                this.blocks[6]['loading'] = false;
            });
        },
        nextStep() {
            this.$confirm('离开本页面信息将丢失，是否确定离开?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$router.push({name: 'abnormity'});
                });
        },
        toggleFullScreen(index) {
            this.$refs['fullscreen'][index].toggle();
            this.currentFullScreenIndex = index;
        },
        fullscreenChange(fullscreen) {
            this.fullscreen = fullscreen;
            this.$nextTick(() => {
                if (fullscreen) {
                    let wh = window.innerHeight * 0.9;
                    this.propsChartHeight = wh;
                } else {
                    this.propsChartHeight = 300;
                }
                this.$refs[`block${this.currentFullScreenIndex + 1}`][0].$refs[`chart${this.currentFullScreenIndex}`].echart.resize();
            });
        },
    },
    mounted() {
    },
    beforeDestroy() {
        sessionStorage.removeItem('txDt0');
    }
};
</script>
<style lang='less' module>
    .multiple_scenes_merge {
        .self-card-css {
            /deep/.el-card__body {
                padding: 10px;
            }
        }
    }

</style>
