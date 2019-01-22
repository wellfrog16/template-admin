<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '0'
        }
    },
    data() {
        return {
            loading: false,
            chartOptions: {
                color: ['#00ff55'],
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '客户交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            // return '客户编号: ' + params.value || '';
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:200px; white-space:pre-wrap; word-break: break-all',
                },
                animation: false,
                series: [
                    {
                        name: '实控关系识别',
                        type: 'graph',
                        layout: 'force',
                        data: [],
                        links: [],
                        categories: [],
                        focusNodeAdjacency: true,
                        roam: true,
                        draggable: true,
                        label: {
                            normal: {
                                position: 'right'
                            }
                        },
                        force: {
                            repulsion: 100
                        }
                    }
                ]
            }
        };
    },
    methods: {
        drewChart(chartData) {
            let lineColor = '#959595';
            chartData.links.forEach(v => {
                if (v.tip.split(',').length > 5) {
                    v.lineStyle = {normal: {color: lineColor, width: 10}};
                } else if (v.tip.split(',').length > 3) {
                    v.lineStyle = {normal: {color: lineColor, width: 5}};
                } else {
                    v.lineStyle = {normal: {color: lineColor, width: 1}};
                }
            });
            this.chartOptions['series'][0]['links'] = chartData['links'];
            this.chartOptions['series'][0]['data'] = chartData['nodes'];
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
    }
};
</script>
