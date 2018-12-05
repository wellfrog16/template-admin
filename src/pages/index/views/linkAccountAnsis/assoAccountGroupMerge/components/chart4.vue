<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {chart4Data} from './constants';
export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '3'
        },
        commonReqParams: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            loading: false,
            chartOptions: {
                grid: {
                    x: 40,
                    x2: 60,
                    y: 35,
                    y2: 60
                },
                tooltip: {
                    trigger: 'item',
                    formatter: param => {
                        if (param.seriesIndex === 0) {
                            console.log(param);
                            return `
                                时间点： ${param.name}<br>
                                价格： ${param.value}<br>
                            `;
                        } else {
                            return `
                                时间点： ${param.value[0]}<br>
                                账户号： ${param.value[4]}<br>
                                ${param.value[3]}交易量： ${param.value[2]}<br>
                            `;
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: []
                },
                yAxis: {
                    type: 'value',
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 50,
                        end: 100,
                    }
                ],
                series: [
                    {
                        name: '分时图',
                        data: [],
                        type: 'line'
                    }
                ]

            }
        };
    },
    methods: {
        getData() {
            this.loading = true;
            this.loading = false;
            let tableData = [];
            let data = chart4Data;
            let lineData = [];
            let timeData = [];
            let itemStyleArray = [{
                normal: {
                    color: 'green',
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }, {
                normal: {
                    color: 'red',
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }];
            data.forEach(v => {
                timeData.push(v.time);
                lineData.push(v.price);
            });
            this.chartOptions['series'][0]['data'] = lineData;
            itemStyleArray.forEach((f, i) => {
                this.chartOptions['series'].push({
                    name: `账户号${i}`,
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolSize: 10,
                    itemStyle: f,
                    data: data.map(d => {
                        return [d.time, d.price + (i + 1) * 8, d.count, d.type, i];
                    }),
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
            });
            this.chartOptions['xAxis']['data'] = timeData;
            console.log(this.chartOptions);
            this.initChart();
            this.$emit('updateTableData', tableData, this.index);
        },
        initChart() {
            this.$refs['chart3'].initChart();
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    }
};
</script>
