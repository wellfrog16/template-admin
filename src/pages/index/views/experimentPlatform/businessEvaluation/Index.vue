<template>
    <div>
        <el-row style="padding: 10px 0; text-align: right;">
            <span style="margin-right: 10px;">导入结果集：</span>
            <resultSelectComponent ref="resultSelectComponent" :resultIdProps="resultId" @selectResultId="selectResultId"></resultSelectComponent>
            <el-button size="mini" type="primary" style="margin-left:5px;" @click="handleImport" :loading="loading">确定</el-button>
        </el-row>
        <s-card class="table-container" :title="`静态信息验证`" :icon="`fa fa-address-card`">
            <div slot="content">
                <s-table
                    :height="300"
                    :loading="loadingCustomerAddress"
                    :columns="columns"
                    :tableData="tableData"
                ></s-table>
            </div>
        </s-card>
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
                                    <el-select class="custom-width" clearable size="small" v-model="table3CurrentType" placeholder="请选择一个维度">
                                        <el-option v-for="(o, oi) in table3Options" :key="oi" :label="o.label" :value="o.field"></el-option>
                                    </el-select>
                                </div>
                                <s-table :height="index === 2 ? 268 : 300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <div v-else class="chart-container">
                                <chart1 :ref="`chartComponent${index + 1}`" v-if="index === 0" :index="index" :tabIndex="111" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart1>
                                <chart2 :ref="`chartComponent${index + 1}`" v-if="index === 1" :index="index" :tabIndex="111" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart2>
                                <chart3 :ref="`chartComponent${index + 1}`" v-if="index === 2" :index="index" :tabIndex="111" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart3>
                                <chart4 :ref="`chartComponent${index + 1}`" v-if="index === 3" :index="index" :tabIndex="111" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></chart4>
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
import {columns, charts, table3Options, chartTableColumns} from '../components/constants';

import chart1 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart7';
import chart2 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart8';
import chart3 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart3';
import chart4 from '@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/components/chart4';

export default {
    components: {SCard, STable, resultSelectComponent, chart1, chart2, chart3, chart4},
    data() {
        return {
            columns,
            charts,
            table3Options,
            chartTableColumns,
            loading: false,
            fullscreen: false,
            resultId: '',
            currentFullScreenIndex: 0,
            propsChartHeight: 300,
            table3CurrentType: '',
            loadingCustomerAddress: false,
            tableData: [],
            chartTableData: [[], [], [], []]
        };
    },
    methods: {
        handleImport() {
            // 导入结果集
        },
        selectResultId(id) {
            // select
        },
        handleEchartClickEvent() {

        },
        handleEchartDblClickEvent() {

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
            console.log(data);
            if (!item.toggleDetailFlags) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        // (this.getChart()[index])(data, 1);
                    });
                });
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
    }
};
</script>
