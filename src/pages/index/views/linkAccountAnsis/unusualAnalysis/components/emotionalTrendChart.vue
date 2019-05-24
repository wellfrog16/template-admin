/* 情感走势 */
<template>
    <div class="emotional-trend-chart">
        <echarts-common :loading="loading" ref="emotionalTrendRef" domId="emotionalTrendDom" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    components: {
        EchartsCommon
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        propsChartHeight: {
            type: [Number, String],
            default: 360
        },
        chartOptions: {
            type: Object,
            default() {
                return {
                    title: {
                        // text: '折线图堆叠'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['正面', '中性', '负面']
                    },
                    grid: {
                        top: '12%',
                        left: '10%',
                        right: '12%',
                        bottom: '15%',
                        // containLabel: true
                    },
                    // toolbox: {
                    //     feature: {
                    //         saveAsImage: {}
                    //     }
                    // },
                    dataZoom: [
                        {
                            show: true,
                            realtime: true,
                            bottom: 0
                        },
                        {
                            type: 'inside',
                            realtime: true
                        }
                    ],
                    xAxis: {
                        name: '日期',
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量'
                    },
                    series: [
                        {
                            name: '正面',
                            type: 'line',
                            data: [],
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
                            name: '中性',
                            type: 'line',
                            data: [],
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
                            name: '负面',
                            type: 'line',
                            data: [],
                            markArea: {
                                label: {
                                    color: '#d92e20'
                                },
                                itemStyle: {
                                    color: '#592749'
                                },
                                data: []// this.$attrs.unusualMarkAreaData
                            }
                        }
                    ]
                };
            }
        },
        chartData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    watch: {
        chartData: {
            handler(val) {
                this.updateChartData(val);
            }
        },
        deep: true
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        },
        updateChartData(val) {
            if (!Object.keys(val).length) {
                return;
            }
            let date = [];
            let data1 = [];
            let data2 = [];
            let data3 = [];
            let data4 = [];
            val.mtExtHotwordTrendImputList.forEach(v => {
                data1.push(v.positiveValue);
                data2.push(v.negativeValue);
                data3.push(v.neutralValue);
                date.push(v.tradingdayString);
            });
            this.chartOptions.xAxis['data'] = date;
            this.chartOptions.series[0]['data'] = data1;
            this.chartOptions.series[1]['data'] = data2;
            this.chartOptions.series[2]['data'] = data3;
            data4 = val.mtExpeventInfoOutEmotionList.map(v => {
                return [{xAxis: v.expstartTmString}, {xAxis: v.expendTmString}];
            });
            this.chartOptions.series[0]['markArea']['data'] = data4;
            this.chartOptions.series[1]['markArea']['data'] = data4;
            this.chartOptions.series[2]['markArea']['data'] = data4;
        }
    }
};
</script>
