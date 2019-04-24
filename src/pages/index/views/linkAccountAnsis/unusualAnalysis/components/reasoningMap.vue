/* 推理图谱 */
<template>
    <div class="reasoning-map-chart">
        <echarts-common :loading="loading" ref="reasoningMapRef" domId="reasoningMapRef" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
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
                    // color: 'transparent',
                    // grid: {
                    //     left: '3%',
                    //     right: '15%',
                    //     bottom: '15%',
                    //     containLabel: true
                    // },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    animationDurationUpdate: 1500,
                    animationEasingUpdate: 'quinticInOut',
                    series: [
                        {
                            type: 'graph',
                            layout: 'force', // 'circular',
                            force: {
                                repulsion: 2500,
                                edgeLength: [10, 50]
                            },
                            draggable: true,
                            focusNodeAdjacency: true,
                            // symbolSize: [80, 30],
                            symbolSize: 60,
                            symbol: 'circle',
                            // roam: true,
                            itemStyle: {
                                normal: {
                                    color: '#4b565b'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    color: 'yellow',
                                    fontSize: 14,
                                }
                            },
                            edgeSymbol: ['circle', 'arrow'],
                            edgeSymbolSize: [2, 10],
                            edgeLabel: {
                                normal: {
                                    textStyle: {
                                        fontSize: 14,
                                        color: '#ccc'
                                    }
                                }
                            },
                            data: [{
                                name: '美油价格',

                            }, {
                                name: '原油价格',

                            }, {
                                name: '汇率',

                            }, {
                                name: '交易量',

                            }, {
                                name: '现货价格偏离',

                            }, {
                                name: '舆情情感',

                            }],
                            links: [{
                                source: '美油价格',
                                target: '交易量'
                            }, {
                                source: '汇率',
                                target: '交易量'
                            }, {
                                source: '原油价格',
                                target: '汇率'
                            }, {
                                source: '现货价格偏离',
                                target: '交易量'
                            }, {
                                source: '交易量',
                                target: '舆情情感'
                            }, {
                                source: '舆情情感',
                                target: '原油价格'
                            }, {
                                source: '汇率',
                                target: '原油价格'
                            }, {
                                source: '汇率',
                                target: '美油价格'
                            }],
                            lineStyle: {
                                normal: {
                                    opacity: 0.9,
                                    width: 1,
                                    curveness: 0,
                                    color: '#fff'
                                }
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
