<template>
    <div :class="$style.analys2">
        <s-card :title="`国际市场原油相关性分析`" :icon="`fa fa-chart-line`">
            <echarts-common
                slot="content"
                :loading="loading2"
                ref="echartsDemo2"
                domId="echartsId2"
                :noClearFlag="false"
                :defaultOption="chartOptions2"
                :propsChartHeight="430">
            </echarts-common>
        </s-card>
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'analysisChart1',
    components: {SCard, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            timer: null,
            loading2: false,
            dialogVisible: false,
            chartOptions2: {
                legend: {
                    data: ['日K'],
                    inactiveColor: '#777',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        animation: false,
                        type: 'cross',
                        lineStyle: {
                            color: '#376df4',
                            width: 2,
                            opacity: 1
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [
                        '2019-01-01',
                        '2019-01-02',
                        '2019-01-03',
                        '2019-01-04',
                        '2019-01-05',
                        '2019-01-06',
                        '2019-01-07',
                        '2019-01-08',
                        '2019-01-09',
                        '2019-01-10',
                        '2019-01-11',
                        '2019-01-12',
                        '2019-01-13',
                        '2019-01-14',
                        '2019-01-15',
                        '2019-01-16',
                        '2019-01-17',
                        '2019-01-18',
                        '2019-01-19',
                        '2019-01-20',
                    ],
                    axisLine: {
                        lineStyle: {
                            color: '#8392A5'
                        }
                    }
                },
                yAxis: {
                    scale: true,
                    axisLine: {
                        lineStyle: {
                            color: '#8392A5'
                        }
                    },
                    splitLine: { show: false }
                },
                grid: {
                    x: 30, // 左
                    x2: 40, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                dataZoom: [
                    {
                        type: 'inside'
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%'
                    }
                ],
                animation: false,
                series: [
                    {
                        type: 'candlestick',
                        name: '日K',
                        data: [
                            [17512.58, 17633.11, 17434.27, 17642.81],
                            [17652.36, 17716.66, 17652.36, 17790.11],
                            [17716.05, 17685.09, 17669.72, 17755.7],
                            [17661.74, 17792.75, 17568.02, 17811.48],
                            [17799.39, 17737, 17710.67, 17806.38],
                            [17718.03, 17603.32, 17579.56, 17718.03],
                            [17605.45, 17716.05, 17542.54, 17723.55],
                            [17687.28, 17541.96, 17484.23, 17687.28],
                            [17555.39, 17576.96, 17528.16, 17694.51],
                            [17586.48, 17556.41, 17555.9, 17731.63],
                            [17571.34, 17721.25, 17553.57, 17744.43],
                            [17741.66, 17908.28, 17741.66, 17918.35],
                            [17912.25, 17926.43, 17885.44, 17962.14],
                            [17925.95, 17897.46, 17867.41, 17937.65],
                            [17890.2, 18004.16, 17848.22, 18009.53],
                            [18012.1, 18053.6, 17984.43, 18103.46],
                            [18059.49, 18096.27, 18031.21, 18167.63],
                            [18092.84, 17982.52, 17963.89, 18107.29],
                            [17985.05, 18003.75, 17909.89, 18026.85],
                            [17990.94, 17977.24, 17855.55, 17990.94],
                            [17987.38, 17990.32, 17934.17, 18043.77],
                            [17996.14, 18041.55, 17920.26, 18084.66],
                            [18023.88, 17830.76, 17796.55, 18035.73],
                            [17813.09, 17773.64, 17651.98, 17814.83],
                            [17783.78, 17891.16, 17773.71, 17912.35],
                            [17870.75, 17750.91, 17670.88, 17870.75],
                            [17735.02, 17651.26, 17609.01, 17738.06],
                            [17664.48, 17660.71, 17615.82, 17736.11],
                            [17650.3, 17740.63, 17580.38, 17744.54],
                            [17743.85, 17705.91, 17668.38, 17783.16],
                            [17726.66, 17928.35, 17726.66, 17934.61],
                            [17919.03, 17711.12, 17711.05, 17919.03]
                        ],
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    }
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
    },
    methods: {
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys2 {
        width: 100%;
    }
</style>
