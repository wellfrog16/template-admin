<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {getChart2Data} from '@/api/dataAnsis/assoAccountGroupMerge';
// import {resData2} from './constants';

export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '1'
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
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: []
                },
                grid: {
                    left: 30,
                    right: 45,
                    top: 30,
                    bottom: 35,
                    containLabel: true
                },
                xAxis: [
                    {
                        name: '日期',
                        type: 'category',
                        data: [],
                    }
                ],
                yAxis: [
                    {
                        name: '持仓量',
                        type: 'value',
                    }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        bottom: 0
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0]
                    }
                ],
                series: []

            }
        };
    },
    methods: {
        getData() {
            this.loading = true;
            // this.initChart(resData2);
            let params = this.commonReqParams;
            getChart2Data(params).then(resp => {
                this.loading = false;
                console.log(resp);
                this.initChart(resp);
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        initChart(resData) {
            let {qtty, mainData, tableData} = resData;
            // set datazoom
            let dataZoomStartValue = mainData[mainData.length > 20 ? mainData.length - 20 : 0]['date'];
            let dataZoomEndValue = mainData[mainData.length - 1]['date'];
            this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            let series = [];
            let date = [];
            Object.keys(mainData).forEach(v => {
                series.push({
                    name: v,
                    type: 'bar',
                    barMaxWidth: '45',
                    stack: '总量',
                    markLine: { // 标记线设置
                        lineStyle: {
                            normal: {
                                type: 'dashed',
                                color: '#ec0000'
                            }
                        },
                        label: {
                            position: 'middle',
                            formatter: params => {
                                return `超仓线：${params.value}`;
                            }
                        },
                        symbolSize: 0, // 控制箭头和原点的大小、官方默认的标准线会带远点和箭头
                        data: [ // 设置条标准线——x=10
                            {yAxis: qtty || ''}
                        ]
                    },
                    data: mainData[v].map(m => { return m.value; })
                });
                date = mainData[v].map(m => { return m.date; });
            });
            this.chartOptions['legend']['data'] = series.map(m => { return m.name; });
            this.chartOptions['series'] = series;
            this.chartOptions['xAxis'][0]['data'] = date;
            console.log(this.chartOptions);
            this.$refs['chart1'] && this.$refs['chart1'].initChart();
            this.$emit('updateTableData', tableData.slice(0, 100), this.index);
            this.$nextTick(() => {
                this.$emit('drewChart4');
            });
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
