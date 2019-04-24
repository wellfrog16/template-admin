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
                        left: '3%',
                        right: '15%',
                        bottom: '15%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
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
                        data: ['2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16', '2019-04-17']
                    },
                    yAxis: {
                        type: 'value',
                        name: '数量'
                    },
                    series: [
                        {
                            name: '正面',
                            type: 'line',
                            data: [120, 22, 101, 134, 490, 230, 210],
                            markArea: {
                                label: {
                                    color: '#d92e20'
                                },
                                itemStyle: {
                                    color: '#592749'
                                },
                                data: this.$attrs.unusualMarkAreaData
                            }
                        },
                        {
                            name: '中性',
                            type: 'line',
                            data: [220, 182, 191, 234, 290, 330, 310],
                            markArea: {
                                label: {
                                    color: '#d92e20'
                                },
                                itemStyle: {
                                    color: '#592749'
                                },
                                data: this.$attrs.unusualMarkAreaData
                            }
                        },
                        {
                            name: '负面',
                            type: 'line',
                            data: [150, 232, 201, 154, 190, 330, 410],
                            markArea: {
                                label: {
                                    color: '#d92e20'
                                },
                                itemStyle: {
                                    color: '#592749'
                                },
                                data: this.$attrs.unusualMarkAreaData
                            }
                        }
                    ]
                };
            }
        }
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        }
    }
};
</script>
