<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {respData4} from './constants';
// import {getChart4Data} from '@/api/dataAnsis/assoAccountGroupMerge';

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
            chartOptions: {
                color: ['#40f3d6'],
                legend: {
                    type: 'scroll',
                    data: []
                },
                tooltip: {
                    // trigger: 'axis',
                    enterable: true,
                    // axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    //     type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
                    // }
                },
                grid: {
                    right: 70
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
                xAxis: [
                    {
                        name: '客户编号',
                        type: 'category',
                        data: [],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        name: '出现次数',
                        minInterval: 1,
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '账户组稳态分析-按客户',
                        type: 'bar',
                        barMaxWidth: '35',
                        data: []
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
            let {mainData, id} = resData;
            if (!mainData.length) {
                return;
            }
            this.chartOptions['xAxis'][0]['data'] = mainData.map(v => {
                return v.custId;
            });
            this.chartOptions['series'][0]['data'] = mainData.map(v => {
                return v.appearCnt;
            });
            this.$store.commit('savechart4', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            this.$refs['chart3'] && this.$refs['chart3'].initChart();
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs['chart3'] && this.$refs['chart3'].initChart();
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
