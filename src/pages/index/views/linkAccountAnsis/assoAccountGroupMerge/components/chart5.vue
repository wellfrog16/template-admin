<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {resData5} from './constants.js';
import _ from 'lodash';
export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '0'
        },
        childrenMap: {
            type: Object,
            default() {
                return {};
            }
        },
        sceneType: {
            type: [Number, String],
            default: 1
        },
        tabIndex: {
            type: [String, Number],
            default: '0'
        }
    },
    data() {
        return {
            resData5,
            loading: false,
            chartOptions: {
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '客户编号交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            return '客户编号: ' + params.value || '';
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:200px; white-space:pre-wrap;',
                },
                animation: false,
                series: [
                    {
                        name: '关系图谱',
                        type: 'graph',
                        layout: 'force',
                        data: [],
                        links: [],
                        categories: [],
                        roam: true,
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
        getData(resData) {
            let {chartData} = resData;
            // 散点图sort
            this.chartOptions['series'][0]['links'] = chartData['links'];
            console.log(this.chartOptions);
            this.$store.commit('savechart1', {data: this.chartOptions, index: this.tabIndex || this.$store.getters.tabIndex});
            // select max
            // this.$emit('updateAccountGroupAndCustIds', selectMax ? selectMax.acctId : '', selectMax ? selectMax.custIds.split(',') : []);
            this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['value'].split(','));
            this.initChart();
        },
        sortDataByAcctIdCommon(data) {
            return _.sortBy(data, [item => { return item.acctId; }]);
        },
        initChart(flag, data) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
            this.getAssoCharts(flag);
        },
        getAssoCharts(flag) {
            if (!flag) {
                this.$emit('getBlock2Data');
                this.$emit('getBlock3Data');
            }
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
