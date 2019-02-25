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
                ref="selfTables1"
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
// 原油库存 -- // 原油库存明细
// import {postCrudeTable} from '@/api/PublicAnalysis/popularFeelings';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR3, tableData3} from './constants';
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
            tableData1: tableData3,
            timer: null,
            fullscreen: false,
            detail: true,
            details: true,
            loading3: false,
            dialogVisible: false,
            chartOptions3: {
                title: {
                    left: 'left',
                    text: '折线图堆叠',
                    x: '1%',
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                legend: {
                    top: '5%',
                    data: ['INE原油库存', 'EIA原油库存', 'API原油库存'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                grid: {
                    x: 30, // 左
                    x2: 20, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                dataZoom: [
                    {
                        type: 'inside'
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%'
                    }
                ],
                xAxis: {
                    name: '',
                    type: 'category',
                    data: [
                        '2019-01-01',
                        '2019-01-02',
                        '2019-01-03',
                        '2019-01-04',
                        '2019-01-05',
                        '2019-01-06',
                        '2019-01-07',
                        '2019-01-08',
                        '2019-01-09',
                        '2019-01-10',
                        '2019-01-11',
                        '2019-01-12',
                        '2019-01-13',
                        '2019-01-14',
                        '2019-01-15',
                        '2019-01-16',
                        '2019-01-17',
                        '2019-01-18',
                        '2019-01-19',
                        '2019-01-20',
                        '2019-01-20',
                        '2019-01-21',
                        '2019-01-22',
                        '2019-01-23',
                        '2019-01-24',
                        '2019-01-25',
                        '2019-01-26',
                        '2019-01-27',
                        '2019-01-28',
                        '2019-01-29',
                        '2019-01-30',
                        '2019-01-31',
                        '2019-02-01',
                        '2019-02-02',
                        '2019-02-03',
                        '2019-02-04',
                        '2019-02-05',
                        '2019-02-06',
                        '2019-02-07',
                        '2019-02-08',
                        '2019-02-09',
                        '2019-02-10',
                        '2019-02-11',
                        '2019-02-12',
                        '2019-02-13',
                        '2019-02-14',
                        '2019-02-15',
                        '2019-02-16',
                        '2019-02-17',
                        '2019-02-18',
                        '2019-02-19',
                        '2019-02-20',
                        '2019-02-21',
                        '2019-02-22',
                        '2019-02-23',
                        '2019-02-24',
                        '2019-02-25',
                        '2019-02-26',
                        '2019-02-27',
                        '2019-02-28',

                    ],
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            type: 'dashed',
                            color: '#fff',
                            width: 1,
                        },
                    },
                },
                yAxis: {
                    type: 'value'
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
                        name: 'INE原油库存',
                        type: 'line',
                        stack: '总量',
                        data: [
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                        ]
                    },
                    {
                        name: 'EIA原油库存',
                        type: 'line',
                        stack: '总量',
                        data: [
                            220, 182, 191, 234, 290, 330, 310,
                            220, 182, 191, 234, 290, 330, 310,
                            220, 182, 191, 234, 290, 330, 310,
                            220, 182, 191, 234, 290, 330, 310,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                        ]
                    },
                    {
                        name: 'API原油库存',
                        type: 'line',
                        stack: '总量',
                        data: [
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            150, 232, 201, 154, 190, 330, 410,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                        ]
                    }
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
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
        // lienEchartsDete() {
        //     let params = {
        //         'timeOfDay': '2019-02-18'
        //     };
        //     this.loading1 = true;
        //     // 原油舆情情感分析
        //     postpAnalysis(params).then(resp => {
        //         this.loading1 = false;
        //     }).catch(e => {
        //         this.loading1 = false;
        //     });
        // }
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
