<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
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
        },
        propsChartHeight: {
            type: [String, Number],
            default: 300
        }
    },
    data() {
        return {
            loading: false,
            chartOptions: {
                color: ['#ce20ff'],
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '账户组号：' + params.data.point + '<br>客户交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            // return '客户编号: ' + params.value || '';
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:240px; white-space:pre-wrap; word-break: break-all',
                },
                animation: false,
                series: [
                    {
                        name: '客户地址信息识别',
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
                // 转换v.source、v.target为唯一标识对应值
                v.point = `${v.source} > ${v.target}`;
                chartData.nodes.forEach(n => {
                    if (n.name === v.source) {
                        v.source = n.id;
                    }
                    if (n.name === v.target) {
                        v.target = n.id;
                    }
                });
                if (v.tip.split(',').length > 5) {
                    v.lineStyle = {normal: {color: lineColor, width: 10}};
                } else if (v.tip.split(',').length > 3) {
                    v.lineStyle = {normal: {color: lineColor, width: 5}};
                } else {
                    v.lineStyle = {normal: {color: lineColor, width: 1}};
                }
            });
            console.log(chartData.links);
            this.chartOptions['series'][0]['links'] = chartData['links'];
            this.chartOptions['series'][0]['data'] = chartData['nodes'];
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
