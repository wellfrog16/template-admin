<template>
    <div :class="$style.analys3">
        <s-card :title="`原油库存`" :icon="`fa fa-chart-line`">
            <div slot="right">
                <el-button type="text" @click="toggleDetail">
                    <span v-if="detail">
                        明细<i class="el-icon-plus" style="margign-left: 5px;"></i>
                    </span>
                    <span v-else>
                        图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i>
                    </span>
                </el-button>
            </div>
            <echarts-common
                v-if="details"
                slot="content"
                :loading="loading3"
                ref="echartsDemo3"
                domId="echartsId3"
                :noClearFlag="false"
                :defaultOption="chartOptions3"
                :propsChartHeight="390">
            </echarts-common>
            <s-table
                v-else
                ref="selfTablesa"
                slot="content"
                :height="230"
                :loading="loadingAR"
                :columns="columnsList"
                :tableData="tableData1"
                @selection-change="handleSelectionChange1"
            >
            </s-table>
        </s-card>
    </div>
</template>

<script>
// 原油库存3 // 原油库存明细3
import {postCrudeTable} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR3} from './constants';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'analysisChart1',
    components: {SCard, STable, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            loadingAR: false,
            checkboxTableColumn1: [],
            columnsList: columnsListAR3,
            tableData1: [],
            timer: null,
            fullscreen: false,
            detail: true,
            details: true,
            loading3: false,
            dialogVisible: false,
            chartOptions3: {
                title: {
                    left: 'left',
                    text: 'EIA原油库存数据',
                    x: '1%',
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    // trigger: 'item',
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
                        // type: 'cross'
                        // type: 'line'
                    },
                },
                legend: {
                    top: '5%',
                    data: ['公布值', '预测值', '前值'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                calculable: true,
                grid: {
                    x: 30, // 左
                    x2: 0, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 100,
                        end: 30
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 100,
                        end: 30
                    }
                ],
                xAxis: {
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#1fc0ff',
                            margin: 10,
                            width: 1,
                            fontSize: 10 // 字体
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 万桶'
                    },
                    splitLine: {
                        show: true,
                        //  改变轴线颜色
                        lineStyle: {
                            type: 'dashed',
                            // 使用深浅的间隔色
                            color: ['#1f416e']
                        }
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#6ab2ec',
                            // width: 0
                            fontSize: 10 // 字体
                        }
                    },
                    axisTick: { // y轴刻度线
                        show: true,
                    },
                },
                // yAxis: [
                //     // {
                //     //     name: '成交价',
                //     //     scale: true,
                //     //     splitLine: {
                //     //         show: true,
                //     //         //  改变轴线颜色
                //     //         lineStyle: {
                //     //             type: 'dashed',
                //     //             // 使用深浅的间隔色
                //     //             color: ['#1f416e']
                //     //         }
                //     //     },
                //     //     axisLine: { // y轴
                //     //         lineStyle: {
                //     //             color: '#6ab2ec',
                //     //             // width: 0
                //     //             fontSize: 9 // 字体
                //     //         }
                //     //     },
                //     //     axisTick: { // y轴刻度线
                //     //         show: true,
                //     //     },
                //     // },
                //     // {
                //     //     name: '',
                //     //     scale: true,
                //     //     show: false,
                //     //     offset: 0,
                //     //     position: 'right',
                //     //     splitLine: {
                //     //         show: true,
                //     //         //  改变轴线颜色
                //     //         lineStyle: {
                //     //             type: 'dashed',
                //     //             // 使用深浅的间隔色
                //     //             color: ['#1f416e']
                //     //         }
                //     //     },
                //     //     axisLine: { // y轴
                //     //         lineStyle: {
                //     //             color: '#6ab2ec',
                //     //             // width: 0
                //     //             fontSize: 9 // 字体
                //     //         }
                //     //     },
                //     //     axisTick: { // y轴刻度线
                //     //         show: true,
                //     //     },
                //     // },
                //     // {
                //     //     name: '',
                //     //     scale: true,
                //     //     show: false,
                //     //     offset: 0,
                //     //     position: 'right',
                //     //     splitLine: {
                //     //         show: true,
                //     //         //  改变轴线颜色
                //     //         lineStyle: {
                //     //             type: 'dashed',
                //     //             // 使用深浅的间隔色
                //     //             color: ['#1f416e']
                //     //         }
                //     //     },
                //     //     axisLine: { // y轴
                //     //         lineStyle: {
                //     //             color: '#6ab2ec',
                //     //             // width: 0
                //     //             fontSize: 9 // 字体
                //     //         }
                //     //     },
                //     //     axisTick: { // y轴刻度线
                //     //         show: true,
                //     //     },
                //     // },
                // ],
                series: [
                    {
                        name: '公布值',
                        type: 'line',
                        stack: '总量',
                        // yAxisIndex: 0,
                        barGap: '10%',
                        data: [],
                    },
                    {
                        name: '预测值',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '前值',
                        type: 'line',
                        stack: '总量',
                        data: []
                    }
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.lienEchartsDete();
        this.tabalisa();
    },
    methods: {
        toggleDetail() {
            if (this.detail && this.details) {
                this.detail = !this.detail;
                this.details = !this.details;
            } else {
                this.detail = !this.detail;
                this.details = !this.details;
            }
        },
        handleSelectionChange1() {},
        fullscreenChange() {},
        toggleFullScreen() {
            console.log(22);
        },
        tabalisa() {
            this.loadingAR = true;
            this.tableData1 = [];
            let params = {
                'timeOfDay': '2019-02-18'
            };
            postCrudeTable(params).then(resp => {
                this.loadingAR = false;
                if (resp && resp.length !== 0) {
                    this.tableData1 = resp.ela;
                }
            }).catch(e => {
                this.loadingAR = false;
            });
        },
        lienEchartsDete() {
            let params = {
                'timeOfDay': '2019-02-18'
            };
            this.loading3 = true;
            let mainData = [];
            let timeDate = []; // 公布日期
            let elaData = []; // 公布值
            let apiData = []; // 预测值
            let ineData = []; // 前值
            postCrudeTable(params).then(resp => {
                this.loading3 = false;
                if (resp && resp.length !== 0) {
                    mainData = resp.ela;
                    mainData.forEach(v => {
                        timeDate.push(v.time); // 公布日期
                        elaData.push(v.publish); // 公布值
                        apiData.push(v.forecance); // 预测值
                        ineData.push(v.befores); // 前值
                    });
                    this.chartOptions3['xAxis']['data'] = timeDate;
                    this.chartOptions3['series'][0]['data'] = elaData;
                    this.chartOptions3['series'][1]['data'] = apiData;
                    this.chartOptions3['series'][2]['data'] = ineData;
                    this.$refs['selfTablesa'] && this.$refs['selfTablesa'].initChart();
                }
            }).catch(e => {
                this.loading3 = false;
            });
        }
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys2 {
        width: 100%;
    }
</style>
