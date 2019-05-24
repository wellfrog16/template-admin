<template>
    <div>
        <echarts-common :loading="loading" :ref="echartRef" :domId="echartRef" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import _ from 'lodash';
export default {
    components: {EchartsCommon},
    props: {
        propsChartHeight: {
            type: [String, Number],
            default: 300
        },
        echartRef: {
            type: String,
            default: 'defaultRef'
        },
        chartData: {
            type: Array,
            default() {
                return [];
            }
        },
        unusualMarkAreaData: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    watch: {
        propsChartHeight(val) {
            this.chartOptions.grid[0]['height'] = val === 300 ? 140 : 500;
            this.chartOptions.grid[1]['height'] = val === 300 ? 40 : 100;
        },
        chartData(val = []) {
            let date = [];
            let data1 = [];
            let data2 = [];
            val.forEach(v => {
                date.push(v.tradingdayString);
                data1.push([v.todayOpenQuot, v.todaycloseQuot, v.lowestPrice, v.highestPrice]);
                data2.push(v.bargainQtty);
            });
            // k 线图
            this.chartOptions.series[0]['data'] = data1;
            // 成交量
            this.chartOptions.series[1]['data'] = data2;
            // 时间
            this.chartOptions.xAxis[0]['data'] = date;
            this.chartOptions.xAxis[1]['data'] = date;
            console.log(this.chartOptions);
        },
        unusualMarkAreaData(val = []) {
            this.chartOptions.series[0]['markArea']['data'] = val.map(v => {
                return [{xAxis: v.expstartTmString}, {xAxis: v.expendTmString}];
            });
        }
    },
    data() {
        let upColor = '#ec0000';
        let upBorderColor = '#8A0000';
        let downColor = '#00da3c';
        let downBorderColor = '#008F28';
        return {
            loading: false,
            chartOptions: {
                animation: false,
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    enterable: true,
                    axisPointer: {
                        type: 'cross'
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }],
                    label: {
                        backgroundColor: '#222',
                        borderColor: '#777'
                    }
                },
                legend: {
                    data: ['日K', '成交量']
                },
                grid: [{
                    left: 60,
                    right: 80,
                    top: 40,
                    height: 140,
                    containLabel: false
                }, {
                    left: 60,
                    right: 80,
                    height: 40,
                    bottom: 40,
                    containLabel: false
                }],
                xAxis: [
                    {
                        name: '',
                        type: 'category',
                        data: [],
                        scale: true,
                        boundaryGap: false,
                        axisLine: {onZero: false},
                        splitLine: {show: false},
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: [],
                        scale: true,
                        boundaryGap: false,
                        splitLine: {show: false},
                        axisLabel: {show: false},
                        axisTick: {
                            show: false,
                        },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            type: 'shadow',
                            snap: true,
                            label: {show: false},
                            triggerTooltip: true,
                            handle: {
                                show: true,
                                margin: 15,
                                size: 25,
                                color: '#f3ec6cf2'
                            }
                        }
                    }],
                yAxis: [
                    {
                        name: '成交价',
                        scale: true,
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['transparent', 'rgba(4, 58, 127, 0.92)']
                            }
                        }
                    },
                    {
                        name: '成交量',
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        splitLine: {show: false}
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1]
                    },
                    {
                        show: true,
                        type: 'slider',
                        xAxisIndex: [0, 1],
                        bottom: 0
                    }
                ],
                series: [
                    {
                        name: '日K',
                        type: 'candlestick',
                        barMaxWidth: 50,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: upColor,
                                color0: downColor,
                                borderColor: upBorderColor,
                                borderColor0: downBorderColor
                            }
                        },
                        markArea: {
                            label: {
                                color: '#d92e20'
                            },
                            itemStyle: {
                                color: '#592749'
                            },
                            data: []
                        }
                    },
                    {
                        name: '成交量',
                        type: 'bar',
                        barMaxWidth: 35,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                // color: '#7fbe9e'
                            },
                            emphasis: {
                                // color: '#140'
                            }
                        },
                        data: [],
                    }
                ]

            }
        };
    },
    methods: {
        clearChart() {
            this.$refs[this.echartRef] && this.$refs[this.echartRef].clearChart();
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        },
    },
    mounted() {

    }
};
</script>
