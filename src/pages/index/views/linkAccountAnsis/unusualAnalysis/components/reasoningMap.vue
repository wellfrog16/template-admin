/* 推理图谱 */
<template>
    <div class="reasoning-map-chart">
        <echarts-common :loading="loading" ref="reasoningMapRef" domId="reasoningMapRef" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {getKnowledgeMap} from '@/api/unusualAnalysis';
export default {
    components: {
        EchartsCommon
    },
    data() {
        return {
            chartOptions: {
                color: [
                    '#f8f400',
                    '#40f3d6',
                    '#ce20ff',
                    '#00ff55',
                    '#e4d1bb',
                    '#ff8a00',
                    '#b69913',
                    '#00709e',
                    '#b69913',
                    '#1929b3',
                    '#006624'],
                legend: {
                    data: ['类目1', '类目2', '类目3'],
                    itemGap: 20,
                    left: 'left',
                    top: 'middle',
                    orient: 'vertical'
                },
                // grid: {
                //     left: '3%',
                //     right: '15%',
                //     bottom: '15%',
                //     containLabel: true
                // },
                // toolbox: {
                //     feature: {
                //         saveAsImage: {}
                //     }
                // },
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            console.log(params.data);
                            return '关系名称：' + (params.data.relationName || '上游') + '<br>权重：' + (params.data.impactWeight || '0.8');
                        } else if (params.dataType === 'node') {
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width: 150px; white-space: pre-wrap; word-break: break-all',
                },
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                series: [
                    {
                        type: 'graph',
                        layout: 'force', // 'circular',
                        force: {
                            repulsion: 500,
                            edgeLength: [10, 200]
                        },
                        categories: [
                            {name: '类目1'},
                            {name: '类目2'},
                            {name: '类目3'},
                        ],
                        draggable: true,
                        focusNodeAdjacency: true,
                        // symbolSize: [80, 30],
                        // symbolSize: 60,
                        symbol: 'circle',
                        roam: true,
                        // itemStyle: {
                        //     normal: {
                        //         color: '#4b565b'
                        //     }
                        // },
                        label: {
                            normal: {
                                show: true,
                                fontSize: 12,
                                position: 'top',
                                color: 'auto'
                            }
                        },
                        // edgeSymbol: ['circle', 'arrow'],
                        // edgeSymbolSize: [2, 10],
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
                            category: 0,
                            categoryName: '类目1',

                        }, {
                            name: '原油价格',
                            category: 1,
                            categoryName: '类目2',

                        }, {
                            name: '汇率',
                            category: 2,
                            categoryName: '类目3',

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
            }
        };
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
        chartData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        },
        getData() {
            getKnowledgeMap().then(resp => {
                let {objects, links} = resp;
                this.chartOptions.series[0]['data'] = objects;
                this.chartOptions.series[0]['links'] = links;
                this.chartOptions.legend.data = objects.map(v => {
                    return v.categoryName || '其它';
                });
                this.chartOptions.series[0]['categories'] = objects.map(v => {
                    return {name: v.categoryName || ''};
                });
            });
        }
    },
    mounted() {

    }
};
</script>
