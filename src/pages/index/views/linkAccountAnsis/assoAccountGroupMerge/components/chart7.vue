<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {getChart2Data} from '@/api/dataAnsis/assoAccountGroupMerge';
// import {resData2} from './constants';
import _ from 'lodash';

export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '2'
        },
        commonReqParams: {
            type: Object,
            default() {
                return {};
            }
        },
        currentAccountGroupId: {
            type: [Number, String],
            default: ''
        },
        currentCustIds: {
            type: Array,
            default() {
                return [];
            }
        },
        sceneType: {
            type: [Number, String],
            default: 1
        },
        tabIndex: {
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
            init: true,
            chartOptions: {
                tooltip: {
                    trigger: 'axis',
                    enterable: true,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    x: 40,
                    x2: 60,
                    y: 60,
                    y2: 60
                },
                legend: {
                    type: 'scroll',
                    data: []
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
                        name: '客户数',
                        minInterval: 1,
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
                        xAxisIndex: [0],
                    }
                ],
                series: []

            }
        };
    },
    methods: {
        getData(resp) {
            let {mainData, id} = resp;
            if (!mainData.length) {
                return;
            }
            let date = [];
            date = _.uniq(mainData.map(v => {
                return v.txDt;
            }));
            mainData = _.groupBy(mainData, 'custId');
            let series = [];
            Object.keys(mainData).forEach(v => {
                if (v !== 'null' && v !== '') {
                    series.push({
                        name: v,
                        type: 'bar',
                        barMaxWidth: '45',
                        stack: '总量',
                        data: date.map(d => {
                            let index = mainData[v].findIndex(f => {
                                return f.txDt === d;
                            });
                            return index > -1 ? mainData[v][index]['custCnt'] : '0';
                        })
                    });
                }
            });
            this.chartOptions['legend']['data'] = series.map(m => { return m.name; });
            this.chartOptions['series'] = series;
            this.chartOptions['xAxis'][0]['data'] = date;
            // set datazoom
            let dataZoomStartValue = date[date.length > 20 ? date.length - 20 : 0];
            let dataZoomEndValue = date[date.length - 1];
            this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            this.$store.commit('savechart3', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            this.$refs['chart2'] && this.$refs['chart2'].initChart();
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs['chart2'] && this.$refs['chart2'].initChart();
        },
        handleEchartClickEvent(val) {
            if (String(this.sceneType) === '2') { // 聚类
                return;
            }
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            if (String(this.sceneType) === '2') {
                return;
            }
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
    }
};
</script>
