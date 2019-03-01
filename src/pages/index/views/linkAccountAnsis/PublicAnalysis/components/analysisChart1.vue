<template>
    <div :class="$style.analys1">
        <s-card :title="`原油舆情情感分析`" :icon="`fa fa-chart-line`">
            <echarts-common
                slot="content"
                :loading="loading1"
                ref="echartsDemo1"
                domId="echartsId1"
                :noClearFlag="false"
                :defaultOption="chartOptions1"
                :propsChartHeight="390">
            </echarts-common>
        </s-card>
    </div>
</template>

<script>
// 原油舆情情感分析
import {postpAnalysis} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'analysisChart1',
    components: {SCard, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            timer: null,
            loading1: false,
            dialogVisible: false,
            chartOptions1: {
                title: {
                    text: '堆叠区域图',
                    x: '4%',
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
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        backgroundColor: '#6a7985'
                        // type: 'cross'
                        // type: 'line'
                    },
                    // trigger: 'axis',
                    // axisPointer: {
                    //     type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                    //     label: {
                    //         backgroundColor: '#6a7985'
                    //     }
                    // }
                },
                legend: {
                    top: '3%',
                    data: ['正面', '负面', '中性', '热度'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                calculable: true,
                grid: {
                    x: 20, // 左
                    x2: 30, // 右
                    y: 60, // 上
                    // y2: 160 // 下
                    y2: 90, // 下
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: [
                    {
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
                        // data: []
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
                            '2019-01-14'
                        ]
                    }
                ],
                yAxis: [
                    {
                        name: '正面',
                        type: 'value',
                        position: 'left',
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
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        }
                    },
                    {
                        name: '热度',
                        // show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
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
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        },
                    },
                    {
                        name: '中性',
                        show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#999']
                                // width: 0
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        },
                    },
                    {
                        name: '负面',
                        show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#999']
                                // width: 0
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        },
                    }
                ],
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
                series: [
                    {
                        name: '正面',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 30,
                        barCategoryGap: 10,
                        yAxisIndex: 0,
                        barGap: '10%',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}%'
                            }
                        },
                        data: []
                    },
                    {
                        name: '负面',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}%'
                            }
                        },
                        data: []
                    },
                    {
                        name: '中性',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}%'
                            }
                        },
                        data: []
                    },
                    {
                        name: '热度',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1,
                        barGap: '10%',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}'
                            }
                        },
                        data: []
                    },
                ]
            },
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.lienEchartsDete();
    },
    methods: {
        lienEchartsDete() {
            let params = {
                'timeOfDay': '2019-02-18'
            };
            this.loading1 = true;
            let mainData = [];
            // 日期
            let timeDate = [];
            // 正面
            let heatData = [];
            // 热度
            let frontData = [];
            // 中性
            let neutralData = [];
            // 负面
            let negativeData = [];
            // 原油舆情情感分析
            postpAnalysis(params).then(resp => {
                this.loading1 = false;
                if (resp && resp.length !== 0) {
                    mainData = resp;
                    mainData.forEach(v => {
                        timeDate.push(v.publicDate); // 日期
                        heatData.push(v.justCount); // 正面
                        frontData.push(parseInt(v.weixinHeat) + parseInt(v.baiduHeat)); // 热度
                        neutralData.push(v.centreCount); // 中性
                        negativeData.push(v.loseCount); // 负面
                    });
                    this.chartOptions1['xAxis']['data'] = timeDate;
                    this.chartOptions1['series'][0]['data'] = heatData;
                    this.chartOptions1['series'][3]['data'] = frontData;
                    this.chartOptions1['series'][2]['data'] = neutralData;
                    this.chartOptions1['series'][1]['data'] = negativeData;
                    this.$refs['echartsDemos'] && this.$refs['echartsDemos'].initChart();
                }
            }).catch(e => {
                this.loading1 = false;
            });
        }
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys1 {
        width: 100%;
    }
</style>
