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
                title: {
                    left: 'center',
                    text: '国际市场原油相关性分析',
                    x: '4%',
                    textStyle: {
                        color: '#fff',
                        fontSize: '22'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '16',

                    }
                },
                legend: {
                    top: '10%',
                    data: ['国油日K', '美油日K', '布伦特原油日K'],
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
                xAxis: {
                    name: '日期',
                    type: 'category',
                    data: ['2015/1/5'],
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            type: 'dashed',
                            color: '#fff',
                            width: 1,
                        },
                    },
                    // scale: true,
                    // boundaryGap: false,
                    // // axisLine: {onZero: false},
                    // splitLine: {show: false},
                    // splitNumber: 20,
                    // min: 'dataMin',
                    // max: 'dataMax',
                },
                yAxis: {
                    name: '成交价',
                    scale: true,
                    splitLine: {
                        show: true,
                        //  改变轴线颜色
                        lineStyle: {
                            type: 'dashed',
                            // 使用深浅的间隔色
                            color: ['#1f416e']
                        }
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#6ab2ec',
                            // width: 0
                            fontSize: 9 // 字体
                        }
                    },
                    axisTick: { // y轴刻度线
                        show: true,
                    },
                },
                series: [
                    {
                        type: 'candlestick',
                        name: '国油日K',
                        barMaxWidth: 50,
                        data: [
                            [17512.58, 17633.11, 17434.27, 17642.81, 86160000],
                            [17652.36, 17716.66, 17652.36, 17790.11, 79330000],
                            [17716.05, 17685.09, 17669.72, 17755.7, 102600000],
                            [17661.74, 17792.75, 17568.02, 17811.48, 104890000],
                            [17799.39, 17737, 17710.67, 17806.38, 85230000],
                            [17718.03, 17603.32, 17579.56, 17718.03, 115230000],
                            [17605.45, 17716.05, 17542.54, 17723.55, 99410000],
                            [17687.28, 17541.96, 17484.23, 17687.28, 90120000],
                            [17555.39, 17576.96, 17528.16, 17694.51, 79990000],
                            [17586.48, 17556.41, 17555.9, 17731.63, 107100000],
                            [17571.34, 17721.25, 17553.57, 17744.43, 81020000],
                            [17741.66, 17908.28, 17741.66, 17918.35, 91710000],
                            [17912.25, 17926.43, 17885.44, 17962.14, 84510000],
                            [17925.95, 17897.46, 17867.41, 17937.65, 118160000],
                            [17890.2, 18004.16, 17848.22, 18009.53, 89390000],
                            [18012.1, 18053.6, 17984.43, 18103.46, 89820000],
                            [18059.49, 18096.27, 18031.21, 18167.63, 100210000],
                            [18092.84, 17982.52, 17963.89, 18107.29, 102720000],
                            [17985.05, 18003.75, 17909.89, 18026.85, 134120000],
                            [17990.94, 17977.24, 17855.55, 17990.94, 83770000],
                            [17987.38, 17990.32, 17934.17, 18043.77, 92570000],
                            [17996.14, 18041.55, 17920.26, 18084.66, 109090000],
                            [18023.88, 17830.76, 17796.55, 18035.73, 100920000],
                            [17813.09, 17773.64, 17651.98, 17814.83, 136670000],
                            [17783.78, 17891.16, 17773.71, 17912.35, 80100000],
                            [17870.75, 17750.91, 17670.88, 17870.75, 97060000],
                            [17735.02, 17651.26, 17609.01, 17738.06, 95020000],
                            [17664.48, 17660.71, 17615.82, 17736.11, 81530000],
                            [17650.3, 17740.63, 17580.38, 17744.54, 80020000],
                            [17743.85, 17705.91, 17668.38, 17783.16, 85590000],
                            [17726.66, 17928.35, 17726.66, 17934.61, 75790000],
                            [17919.03, 17711.12, 17711.05, 17919.03, 87390000]
                        ],
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '美油日K',
                        barMaxWidth: 50,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: '布伦特原油日K',
                        barMaxWidth: 50,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    },
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
    },
    methods: {
        da() {
            let upColor = '#ec0000';
            let upBorderColor = '#8A0000';
            let downColor = '#00da3c';
            let downBorderColor = '#008F28';
            let dataCount = 2e5;
        }
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
