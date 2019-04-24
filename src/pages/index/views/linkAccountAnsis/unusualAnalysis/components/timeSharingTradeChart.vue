<template>
    <div style="position: relative;">
        <echarts-common :loading="loading" :ref="echartRef" :domId="echartRef" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
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
    data() {
        return {
            loading: false,
            chartOptions: {
                grid: {
                    left: '3%',
                    right: '10%',
                    bottom: '15%',
                    containLabel: true
                },
                legend: {
                    type: 'scroll',
                    data: ['分时图']
                },
                tooltip: {
                    trigger: 'item',
                    enterable: true, // 鼠标进入浮层
                },
                xAxis: {
                    name: '时间',
                    type: 'category',
                    boundaryGap: false,
                    data: ['09:30', '09:31', '09:32', '09:33', '09:34', '09:35', '09:36']
                },
                yAxis: {
                    name: '价格',
                    type: 'value',
                    min: value => {
                        return value.min;
                    },
                    max: value => {
                        return value.max;
                    },
                },
                dataZoom: [
                    {
                        type: 'inside'
                    },
                    {
                        show: true,
                        type: 'slider',
                        bottom: 0
                    }
                ],
                series: [
                    {
                        name: '分时图',
                        data: [1532, 1987, 1922, 1933, 1932, 1899, 1422],
                        type: 'line'
                    }
                ]
            }
        };
    },
    methods: {
        getData(resData) {
            if (!Object.keys(resData).length) {
                return;
            }
            let {mainData} = resData;
            this.txDt = resData.txDt;
            let lineData = [];
            let timeData = [];
            mainData.forEach(v => {
                timeData.push(v.txTm.slice(0, 5));
                lineData.push(v.currPrice);
            });
            this.chartOptions['series'] = [
                {
                    name: '分时图',
                    data: lineData,
                    type: 'line'
                }
            ];
            let series = this.chartOptions['series'];
            this.chartOptions['xAxis']['data'] = timeData;
            this.chartOptions['series'] = series;
            this.chartOptions['legend']['data'] = series.map(v => {
                return v.name;
            });
            this.$refs[this.echartRef] && this.$refs[this.echartRef].initChart();
        },
        initChart(data) {
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
