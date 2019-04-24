<template>
    <div>
        <echarts-common :loading="loading" :ref="echartRef" :domId="echartRef" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import _ from 'lodash';
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
        }
    },
    watch: {
        propsChartHeight(val) {
            this.chartOptions.grid[0]['height'] = val === 300 ? 140 : 500;
            this.chartOptions.grid[1]['height'] = val === 300 ? 40 : 100;
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
                        data: ['2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16', '2019-04-17'],
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
                        data: ['2019-04-11', '2019-04-12', '2019-04-13', '2019-04-14', '2019-04-15', '2019-04-16', '2019-04-17'],
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
                        data: [[1122, 1342, 1735, 2111], [1983, 2311, 1873, 1442], [1983, 1811, 1101, 999], [1113, 2133, 1998, 1134, 2876], [3711, 1234, 1441, 3211], [1283, 3111, 2944, 1343], [1422, 1932, 1917, 1327]],
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
                            data: this.$attrs.unusualMarkAreaData
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
                        data: [1233, 4444, 5225, 1166, 7111, 7117, 2254],
                    }
                ]

            }
        };
    },
    methods: {
        getData(resp) {
            let {mainData} = resp;
            if (mainData && !mainData.length) {
                return;
            }
            mainData = _.sortBy(mainData, [item => {
                return item.txDt;
            }]);
            // set datazoom
            let dataZoomStartValue = mainData[mainData.length > 20 ? mainData.length - 20 : 0]['txDt'];
            let dataZoomEndValue = mainData[mainData.length - 1]['txDt'];
            this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            let seriesData = [];
            let date = [];
            mainData.forEach(v => {
                date.push(v.txDt);
                seriesData.push(
                    [v.openQuotPrice, v.closeQuotPrice, v.lowestPrice, v.highestPrice, v.txDt, v.bargainQuantity]
                );
            });
            this.chartOptions['series'][0]['data'] = seriesData;
            this.chartOptions['series'][1]['data'] = mainData.map(v => { return v.bargainQuantity; });
            this.chartOptions['xAxis'][0]['data'] = date;
            this.chartOptions['xAxis'][1]['data'] = date;
            this.$refs[this.echartRef] && this.$refs[this.echartRef].initChart();
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs[this.echartRef] && this.$refs[this.echartRef].initChart();
        },

        clearChart() {
            this.$refs[this.echartRef] && this.$refs[this.echartRef].clearChart();
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        }
    },
    mounted() {
    }
};
</script>
