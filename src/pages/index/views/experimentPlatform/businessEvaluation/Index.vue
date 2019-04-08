<template>
    <div>
        <el-row style="padding: 10px 0; text-align: right;">
            <span style="margin-right: 10px;">导入结果集：</span>
            <resultSelectComponent ref="resultSelectComponent" resultUrl="evaluation/queryresultlist" deleteUrl="evaluation/deleteresult" :resultIdProps="resultId" @selectResultId="selectResultId"></resultSelectComponent>
            <el-button size="mini" type="primary" style="margin-left:5px;" @click="handleImport" :loading="loading">确定</el-button>
        </el-row>
        <s-card class="table-container" :title="`静态信息验证`" :icon="`fa fa-address-card`">
            <div slot="content">
                <s-table
                    :height="300"
                    :loading="loadingCustomerAddress"
                    :columns="columns"
                    :tableData="tableData"
                    @handleRowDblClick="handleRowDblclick"
                ></s-table>
                <!-- <tree-table v-loading="loadingCustomerAddress" ref="self-tree-table" :columns="columns" :tableData="tableData" :showCheckbox="false"></tree-table> -->
            </div>
        </s-card>
        <el-row :gutter="10">
            <el-col :xl="12" :lg="12" :md="24" :sm="24" v-for="(item, index) in currentCharts" :key="index">
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
                                <div v-if="String(resultType) === '1' && index === 0">
                                    <el-select class="custom-width" clearable size="small" v-model="table3CurrentType" placeholder="请选择一个维度">
                                        <el-option v-for="(o, oi) in table3Options" :key="oi" :label="o.label" :value="o.field"></el-option>
                                    </el-select>
                                </div>
                                <s-table :height="String(resultType) === '1' && index === 0 ? 268 : 300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <div v-else class="chart-container">
                                <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0 && String(resultType) === '2'" :index="index" :tabIndex="resultId" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart1>
                                <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1 && String(resultType) === '2'" :index="index" :tabIndex="resultId" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart2>
                                <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 0 && String(resultType) === '1'" :index="index" :tabIndex="resultId" :propsChartHeight="propsChartHeight" :currentCustIds="currentCustIds" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart3>
                                <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 1 && String(resultType) === '1'" :index="index" :tabIndex="resultId" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart4>
                            </div>
                            <button v-show="!item['toggleDetailFlags']" type="button" class="btn btn-default btn-map-fullscreen" @click="toggleFullScreen(index)">
                                <i class="fa" :class="[fullscreen ? 'fa-compress' : 'fa-expand-arrows-alt']"></i>
                            </button>
                        </s-full-screen>
                    </div>
                </s-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard.vue';
import STable from '@/components/index/common/STable.vue';
import resultSelectComponent from '@/components/index/common/ResultSelectComponent.vue';
// import treeTable from '@/components/index/common/TreeTableOld.vue';
import {chartTableColumns4, chartTableColumns8, chartTableColumns9} from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/constants';
import {columns, charts, table3Options} from '../components/constants';
// import {custInfo, data1, data3, data4} from '../components/testJson';
import chart1 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart7';
import chart2 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart8';
import chart3 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart3';
import chart4 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart4';
import {getCustomList, getEvaluationHistoryDeal, getEvaluationHistoryDealDetail, getEvaluationSteadyStateAnalysis} from '@/api/platform';
import _ from 'lodash';

export default {
    components: {SCard, STable, resultSelectComponent, chart1, chart2, chart3, chart4},
    data() {
        return {
            columns,
            table3Options,
            chartTableColumns: [[], chartTableColumns4],
            currentCharts: charts.slice(2),
            loading: false,
            fullscreen: false,
            selectedResultType: '', // 只选择结果集，没有导入
            selectedResultId: '', // 只选择结果集，没有导入
            resultId: '', // 导入的结果集id
            resultType: '1', // 导入的结果集type
            currentCustIds: [],
            selectedAccountGroup: {},
            currentFullScreenIndex: 0,
            propsChartHeight: 300,
            table3CurrentType: 'buyCnt',
            loadingCustomerAddress: false,
            tableData: [],
            taskId: '',
            spanArr: [], // 合并单元格
            currentItem: {}, // 当前选择的客户信息
            chartTableData: [[], []],
            chartData: [{}, {}],
            // chartTableData: [data1.resData.clusterStateAnalByTime, data1.resData.clusterStateAnalByCust, data3.resData.tableData, data4.resData.buysail]
        };
    },
    watch: {
        resultType(val) {
            this.currentCharts = String(val) === '1' ? charts.slice(2) : charts.slice(0, 2);
            this.chartTableColumns = String(val) === '1' ? [[], chartTableColumns4] : [chartTableColumns8, chartTableColumns9];
        }
    },
    methods: {
        commonReqParams() {
            return {
                // id: '',
                acctId: this.currentItem.acctId, // || 'JL000000',
                custId: this.currentItem.custGroId, // || '80000366,80000777,80000562',
                statStartDt: this.currentItem.startDtString.slice(0, 10), // || '2017-02-20',
                statStopDay: this.currentItem.endDtString.slice(0, 10), // || '2017-10-09',
                contrCd: this.currentItem.contrCd, // || 'cu1712',
                // taskId: this.taskId
                resultIds: this.resultId || ''
            };
        },
        handleRowDblclick(row) {
            this.currentCustIds = row.custGroId.split(',');
            this.currentItem = row;
            if (String(this.resultType) === '1') {
                // 钻取历史成交图
                this.getHistoryInfo();
            } else {
                // 钻取稳态图
                this.getJLInfo();
            }
        },
        getJLInfo() {
            let params = this.commonReqParams();
            this.currentCharts[0]['loading'] = true;
            this.currentCharts[1]['loading'] = true;
            getEvaluationSteadyStateAnalysis(params).then(resp => {
                this.currentCharts[0]['loading'] = false;
                this.currentCharts[1]['loading'] = false;
                let {timeList, customerList} = resp;
                timeList.forEach(v => {
                    v.txDt = v.txDtString.slice(0, 10);
                });
                timeList = _.sortBy(timeList, [item => { return item.txDt; }]);
                this.updateTableData(timeList, 0);
                this.updateTableData(customerList, 1);
                this.drewChart1({mainData: timeList, id: resp.id || this.resultId});
                this.drewChart2({mainData: customerList, id: resp.id || this.resultId});
                this.chartData = [{mainData: timeList, id: this.resultId}, {mainData: customerList, id: this.resultId}];
            }).catch(e => {
                console.error(e);
                this.currentCharts[0]['loading'] = false;
                this.currentCharts[1]['loading'] = false;
            });
        },
        getHistoryInfo() {
            this.currentCharts[0]['loading'] = true;
            let params = this.commonReqParams();
            getEvaluationHistoryDeal(params).then(resp => {
                this.currentCharts[0]['loading'] = false;
                this.updateTableData(resp.tableData, 0);
                this.drewChart3(resp);
                this.chartData = [resp, {}];
            }).catch(e => {
                console.error(e);
                this.currentCharts[0]['loading'] = false;
            });
        },
        getTimeSharingInfo(date) {
            this.currentCharts[1]['loading'] = true;
            let params = this.commonReqParams();
            params.txDt = date;
            getEvaluationHistoryDealDetail(params).then(resp => {
                resp.txDt = date;
                this.currentCharts[1]['loading'] = false;
                this.updateTableData(resp.buysail, 1);
                this.drewChart4(resp);
                this.chartData[1] = resp;
            }).catch(e => {
                console.error(e);
                this.currentCharts[1]['loading'] = false;
            });
        },
        resetData() {
            this.chartData = [{}, {}];
            this.chartTableData = [[], []];
            this.$refs['chartComponent1'][0].clearChart();
            this.$refs['chartComponent2'][0].clearChart();
        },
        handleImport() {
            if (!this.selectedResultId) {
                this.$message.error('请先选择一个结果集');
            }
            let params = {
                resultId: this.selectedResultId,
                resultType: this.selectedResultType
            };
            this.loadingCustomerAddress = true;
            // clear
            this.resetData();
            getCustomList(params).then(resp => {
                this.resultId = this.selectedResultId;
                this.resultType = this.selectedResultType;
                this.loadingCustomerAddress = false;
                this.tableData = _.sortBy(resp, [item => { return item.acctId; }]);
            }).catch(e => {
                this.loadingCustomerAddress = false;
                console.error(e);
            });
        },
        selectResultId(val, name, type) {
            this.selectedResultId = val;
            this.selectedResultType = type;
        },
        handleEchartClickEvent() {

        },
        handleEchartDblClickEvent(params, index) {
            // 钻取分时图
            if (String(this.resultType) === '1') {
                this.getTimeSharingInfo(params['name']);
                // this.$refs['chartComponent2'][0].getData(data4.resData);
            }
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
            this.chartTableColumns[0] = chart3Column;
        },
        toggleDetail(item, index) {
            this.currentCharts[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
            let data = this.chartData[index];
            // let dataMap = [{mainData: data1.resData.clusterStateAnalByTime, id: data1.resData.id}, {mainData: data1.resData.clusterStateAnalByCust, id: data1.resData.id}, data3.resData, data4.resData];
            if (!item.toggleDetailFlags) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs[`chartComponent${index + 1}`][0].getData(data);
                    });
                });
            } else {
                if (String(this.resultType) === '1' && String(index) === '0') { // 历史成交
                    this.createChart3Columnn(this.currentCustIds);
                }
            }
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
                this.$refs[`chartComponent${this.currentFullScreenIndex + 1}`][0].$refs[`chart${this.currentFullScreenIndex}`].echart.resize();
            });
        },
        updateTableData(value, index, id) {
            if (String(this.resultType) === '1' && String(index) === '0') {
                this.createChart3Columnn(this.currentCustIds);
            }
            this.chartTableData[index] = value;
            this.$store.commit('saveChartTableData', {data: this.chartTableData, index: id || this.resultId});
        },
        drewChart1(resp) {
            setTimeout(() => {
                this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData(resp);
            });
        },
        drewChart2(resp) {
            setTimeout(() => {
                this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].getData(resp);
            });
        },
        drewChart3(resp) {
            setTimeout(() => {
                // 最近交易日，包含买入或卖出
                let selectMax = _.maxBy(resp.mainData, v => {
                    if (!!v.sellAcctCnt || !!v.buyAcctCnt) {
                        return v.txDt;
                    }
                });
                setTimeout(() => {
                    this.getTimeSharingInfo(selectMax ? selectMax.txDt : resp.mainData[0]['txDt']);
                });
                this.$refs['chartComponent1'] && this.$refs['chartComponent1'][0] && this.$refs['chartComponent1'][0].getData(resp);
            });
        },
        drewChart4(resp) {
            setTimeout(() => {
                this.$refs['chartComponent2'] && this.$refs['chartComponent2'][0] && this.$refs['chartComponent2'][0].getData(resp);
            });
        },
        getSpanArr(data) {
            let pos = 0;
            for (var i = 0; i < data.length; i++) {
                if (i === 0) {
                    this.spanArr.push(1);
                    pos = 0;
                } else {
                    // 判断当前元素与上一个元素是否相同
                    if (data[i].acctId === data[i - 1].acctId) {
                        this.spanArr[pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        pos = i;
                    }
                }
            }
        },
        spanMethod({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                };
            }
        }
    },
    mounted() {
        // this.$refs['chartComponent1'][0].getData({mainData: data1.resData.clusterStateAnalByTime, id: data1.resData.id});
        // this.$refs['chartComponent2'][0].getData({mainData: data1.resData.clusterStateAnalByCust, id: data1.resData.id});
        // this.$refs['chartComponent3'][0].getData(data3.resData);
        // this.$refs['chartComponent4'][0].getData(data4.resData);
    }
};
</script>
