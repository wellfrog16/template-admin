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
import {
    postpAnalysis, // 舆情情感 -- // 热度
    postCrudeTable, // 原油库存
    postOrpeListMap5 // 国际环境
} from '@/api/dataAnsis/PublicAnalysis';
import _ from 'lodash';
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
                legend: {
                    top: '5%',
                    data: ['原油舆情情感'],
                },
                color: [
                    '#37A2DA',
                    '#32C5E9',
                    '#67E0E3'
                ],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        backgroundColor: '#6a7985'
                    },
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [{
                    name: '原油舆情情感',
                    textStyle: {
                        color: '#fff'
                    },
                    type: 'gauge',
                    // 仪表盘详情，用于显示数据。
                    // 刻度
                    splitNumber: 10,
                    min: 0,
                    max: 100,
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.3, '#fd666d'],
                                [0.7, '#FFCA4B'],
                                [1, '#37a2da']
                            ],
                            width: 20
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        show: true, // 属性show控制显示与否，默认不显示
                        splitNumber: 5, // 每份split细分多少段
                        length: 6, // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: '#eee',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: { // 分隔线
                        length: 25, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    axisLabel: {
                        formatter: function(e) {
                            switch (e + '') {
                            case '20':
                                return '负面';
                            case '50':
                                return '中性';
                            case '90':
                                return '正面';
                            default:
                                return e;
                            }
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    detail: {
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 16,
                            padding: [113, 4, 5, 6]
                        },
                        formatter: '原油情感分析:{value}%'},
                    data: [{value: ''}]
                }]
            },
            loading2: false,
            chartOptionso2: {
                legend: {
                    top: '5%',
                    data: ['原油舆情热度'],
                },
                color: [
                    '#37A2DA',
                    '#32C5E9',
                    '#67E0E3'
                ],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        backgroundColor: '#6a7985'
                    },
                    formatter: '{a} <br/>{b} : {c}'
                },
                series: [{
                    name: '原油舆情热度',
                    textStyle: {
                        color: '#fff'
                    },
                    type: 'gauge',
                    // 仪表盘详情，用于显示数据。
                    // 刻度
                    splitNumber: 8,
                    min: 0,
                    max: 2000,
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.3, '#fd666d'],
                                [0.7, '#FFCA4B'],
                                [1, '#37a2da']
                            ],
                            width: 20
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        show: true, // 属性show控制显示与否，默认不显示
                        splitNumber: 5, // 每份split细分多少段
                        length: 6, // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: '#eee',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: { // 分隔线
                        length: 25, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    detail: {
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 16,
                            padding: [113, 4, 5, 6]
                        },
                        formatter: '原油热度{value}'},
                    data: [{value: ''}]
                }]
            },
            loading3: false,
            chartOptionso3: {
                legend: {
                    top: '5%',
                    data: ['EIA原油库存'],
                },
                color: [
                    '#37A2DA',
                    '#32C5E9',
                    '#67E0E3'
                ],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        backgroundColor: '#6a7985'
                    },
                    formatter: '{a} <br/>{b} : {c}'
                },
                series: [{
                    name: 'EIA原油库存',
                    textStyle: {
                        color: '#fff'
                    },
                    type: 'gauge',
                    // 仪表盘详情，用于显示数据。
                    // 刻度
                    splitNumber: 8,
                    min: 0,
                    max: 648,
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.3, '#fd666d'],
                                [0.7, '#FFCA4B'],
                                [1, '#37a2da']
                            ],
                            width: 20
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        show: true, // 属性show控制显示与否，默认不显示
                        splitNumber: 5, // 每份split细分多少段
                        length: 6, // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: '#eee',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: { // 分隔线
                        length: 25, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    detail: {
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 16,
                            padding: [113, 4, 5, 6]
                        },
                        formatter: 'EIA原油库存：{value}'},
                    data: [{value: ''}]
                    // detail: {
                    //     show: true,
                    //     offsetCenter: [0, '50%'],
                    //     formatter:'当前重量：{value}g',
                    //     textStyle: {
                    //         fontSize: 16,
                    //         color: '#000',
                    //     }
                    // },
                    // data: 20
                }]
            },
            loading4: false,
            chartOptionso4: {
                legend: {
                    top: '5%',
                    data: ['国际环境新闻报道'],
                },
                color: [
                    '#37A2DA',
                    '#32C5E9',
                    '#67E0E3'
                ],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        backgroundColor: '#6a7985'
                    },
                    formatter: '{a} <br/>{b} : {c}%'
                },
                series: [{
                    name: '国际环境新闻报道',
                    textStyle: {
                        color: '#fff'
                    },
                    type: 'gauge',
                    // 仪表盘详情，用于显示数据。
                    // 刻度
                    splitNumber: 8,
                    min: 0,
                    max: 648,
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                // [0.2, '#3e8bff'],
                                // [0.4, '#00d39f'],
                                // [0.6, '#FFCA4B'],
                                // [0.8, '#FF790D'],
                                // [1.0, '#ff5a00'],
                                // [1.2, '#CC3399'],
                                // [1.4, '#FF6666'],
                                // [1.6, '#6600FF'],
                                // [1.8, '#3e8bff'],
                                // [2.0, '#00d39f'],
                                // [2.2, '#FFCA4B']
                                [0.3, '#fd666d'],
                                [0.7, '#FFCA4B'],
                                [1, '#37a2da']
                            ],
                            width: 20
                        }
                    },
                    axisTick: { // 坐标轴小标记
                        show: true, // 属性show控制显示与否，默认不显示
                        splitNumber: 5, // 每份split细分多少段
                        length: 6, // 属性length控制线长
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: '#eee',
                            width: 1,
                            type: 'solid'
                        }
                    },
                    splitLine: { // 分隔线
                        length: 25, // 属性length控制线长
                        lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                            color: 'auto'
                        }
                    },
                    pointer: {
                        width: 5
                    },
                    detail: {
                        textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                            fontSize: 16,
                            padding: [113, 4, 5, 6]
                        },
                        formatter: '新闻报道量:{value}'},
                    data: [{value: ''}]
                }]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.lienEchartsDete();
    },
    methods: {
        lienEchartsDete() {
            let params = {
                'timeOfDay': '2019-02-18'
            };
            let varietys1 = '';
            let varietys2 = [];
            let publishs1 = [];
            // 舆情情感 -- // 热度
            postpAnalysis(params).then(resp => {
                if (resp && resp.length !== 0) {
                    if (resp[resp.length - 1]) {
                        let varietys = resp[resp.length - 1];
                        varietys1 = (parseInt(varietys.justCount) + parseInt(varietys.centreCount) + parseInt(varietys.loseCount)) / 3;
                    }
                    this.chartOptionso1.series[0].data[0].value = varietys1;
                    resp.forEach(v => {
                        v.variety = parseInt(v.weixinHeat) + parseInt(v.baiduHeat);
                        varietys2.push(v.variety);
                    });
                    // let maxs = _.max(varietys2); // 取最大值
                    // let maxData = parseInt(maxs / 1000) * 1000;
                    // let mens = _.mean(varietys2); // 求平均值
                    let mens = 1674 / 2407 * 2000; // 求平均值
                    this.chartOptionso2.series[0].data[0].value = 1694;
                    // this.chartOptionso2.series[0].max = 124; // 2047 / 1000 = 2.047 取整 * 1000
                    // this.chartOptionso2.series[0].max = maxs;
                }
            });
            // 原油库存
            postCrudeTable(params).then(resp => {
                if (resp && resp.length !== 0) {
                    // resp.ela.forEach(v => {
                    //     publishs1.push(v.publish);
                    // });
                    // console.log(publishs1);
                    // let maxs = _.max(publishs1); // 取最大值
                    // let mens = _.meanBy(publishs1, (item) => {
                    //     console.log(Number(item));
                    //     return Number(item);
                    // }); // 求平均值
                    // console.log(mens);
                    // this.chartOptionso3.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
                    // this.chartOptionso3.series[0].max = maxs;
                    let mens = 486 / 648 * 486; // 求平均值
                    this.chartOptionso3.series[0].data[0].value = 363; // 平均值
                    // this.chartOptionso3.series[0].max = parseInt(maxs); // 刻度
                }
            });
            // 国际环境
            let params5 = {
                'timeOfDay': '2019-03-1',
                'yesAndNoOpec': '1'
            };
            postOrpeListMap5(params5).then(resp => {
                if (resp && resp.length !== 0) {
                    let mens = 180 / 648 * 180; // 求平均值
                    this.chartOptionso4.series[0].data[0].value = 180;
                }
            });
        },
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
