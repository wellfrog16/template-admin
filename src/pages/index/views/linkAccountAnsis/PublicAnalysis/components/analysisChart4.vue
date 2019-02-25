<template>
    <div :class="$style.analys4">
        <s-card :title="`库存数据`" :icon="`fa fa-chart-line`">
            <div slot="content">
                <s-table
                    ref="selfTables1"
                    :height="230"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData1"
                    @selection-change="handleSelectionChange1"
                >
                </s-table>
                <div style="text-align:center; margin: 10px; width: 100%;">
                    <el-button size="small" type="primary" @click="exporstClick">导出CSV</el-button>
                </div>
            </div>
        </s-card>
    </div>
</template>

<script>
// 原油库数据  原油库存-下载
// import {postCrudeDownDetail, postCrudeDown} from '@/api/PublicAnalysis/popularFeelings';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR4, tableData4} from './constants';
export default {
    name: 'analysisChart1',
    components: {SCard, STable},
    props: {},
    minis: [],
    data() {
        return {
            loadingAR: false,
            columnsList: columnsListAR4,
            tableData1: tableData4,
            timer: null,
            fullscreen: false,
            detail: true,
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
            if (this.detail) {
                this.detail = !this.detail;
            } else {
                this.detail = !this.detail;
            }
        },
        exporstClick() {},
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
