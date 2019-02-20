<template>
    <s-card :title="`舆情分析结论`" :icon="`fa fa-chart-line`">
        <div :class="$style.dashboards" slot="content">
            <div :class="$style.dashboard_box">
                <echarts-common
                    :loading="loading1"
                    ref="echartsDemoa1"
                    domId="echartsIds1"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso1"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
            <div :class="$style.dashboard_box">
                <echarts-common
                    :loading="loading2"
                    ref="echartsDemoa2"
                    domId="echartsIds2"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso2"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
            <div :class="$style.dashboard_box">
                <echarts-common
                    :loading="loading3"
                    ref="echartsDemoa3"
                    domId="echartsIds3"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso3"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
            <div :class="$style.dashboard_box">
                <echarts-common
                    :loading="loading4"
                    ref="echartsDemoa4"
                    domId="echartsIds4"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso4"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
        </div>
    </s-card>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'dashboard',
    components: {SCard, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            loading1: false,
            chartOptionso1: {
                // title: {
                //     left: 'left',
                //     text: '国际市场原油相关性分析',
                //     x: '1%',
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: '14'
                //     }
                // },
                legend: {
                    top: '5%',
                    data: ['舆情情感'],
                },
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: '舆情情感',
                        type: 'gauge',
                        detail: {formatter: '{value}%'},
                        data: [{value: 50, name: '完成率'}]
                    }
                ]
            },
            loading2: false,
            chartOptionso2: {
                legend: {
                    top: '5%',
                    data: ['供求关系'],
                },
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: '供求关系',
                        type: 'gauge',
                        detail: {formatter: '{value}%'},
                        data: [{value: 50, name: '完成率'}]
                    }
                ]
            },
            loading3: false,
            chartOptionso3: {
                legend: {
                    top: '5%',
                    data: ['国际环境'],
                },
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: '国际环境',
                        type: 'gauge',
                        detail: {formatter: '{value}%'},
                        data: [{value: 50, name: '完成率'}]
                    }
                ]
            },
            loading4: false,
            chartOptionso4: {
                legend: {
                    top: '5%',
                    data: ['政策影响'],
                },
                tooltip: {
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [
                    {
                        name: '政策影响',
                        type: 'gauge',
                        detail: {formatter: '{value}%'},
                        data: [{value: 50, name: '完成率'}]
                    }
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.da();
    },
    methods: {
        da() {
            setInterval(function() {
                // option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                // myChart.setOption(option, true);
                this.chartOptionso1.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                this.chartOptionso2.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                this.chartOptionso3.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                this.chartOptionso4.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
            }, 20000000);
        }
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .dashboards {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .dashboard_box {
            padding: 0;
            border-radius: 12px;
            border: 1px solid #00a0ea;
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>
