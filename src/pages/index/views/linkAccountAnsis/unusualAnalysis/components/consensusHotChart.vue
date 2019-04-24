/* 舆情热度 */
<template>
    <div class="consensus-hot-chart">
        <echarts-common :loading="loading" ref="consensusHotRef" domId="consensusHotDom" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
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
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['搜索量', '评论量']
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
                            name: '搜索量',
                            type: 'line',
                            data: [120, 132, 101, 134, 90, 230, 210],
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
                            name: '评论量',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 88, 234, 290, 330, 310],
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
