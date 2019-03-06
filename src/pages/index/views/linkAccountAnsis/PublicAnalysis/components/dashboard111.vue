<template>
    <s-card :title="`舆情分析结论`" :icon="`fa fa-chart-line`">
        <div slot="right" :class="$style.box">
            <div :class="$style.top">
                <el-tooltip class="item" effect="dark" placement="right-end">
                    <div slot="content">
                        该模块为舆情分析得到的结论，即：<br/>
                        原油舆情情感：最近一日的舆情偏向度，例如62%地偏向利空；<br/>
                        原油舆情热度：新闻报道量、点击量等加权之和，反映新闻热度；<br/>
                        EIA原油库存：由美国能源信息署统计公布的美国当周原油库存数量；<br/>
                        原油国际环境新闻报道：近期大事件的跟踪和事件的发酵值；<br/>
                    </div>
                    <el-button type="text">?</el-button>
                </el-tooltip>
            </div>
        </div>
        <div :class="$style.dashboards" slot="content">
            <div :class="$style.dashboard_box">
                <echarts-common
                    ref="echartsDemoa1"
                    domId="echartsIds1"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso1"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
            <div :class="$style.dashboard_box">
                <echarts-common
                    ref="echartsDemoa2"
                    domId="echartsIds2"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso2"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
            <div :class="$style.dashboard_box">
                <echarts-common
                    ref="echartsDemoa3"
                    domId="echartsIds3"
                    :noClearFlag="false"
                    :defaultOption="chartOptionso3"
                    :propsChartHeight="300">
                </echarts-common>
            </div>
            <div :class="$style.dashboard_box">
                <echarts-common
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
import moment from 'moment';
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
            chartOptionso1: {
                legend: {
                    top: '5%',
                    data: ['舆情偏向'],
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
                    name: '舆情偏向',
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
                        formatter: '机器分析置信度：利空{value}%'},
                    data: [{value: ''}]
                }]
            },
            chartOptionso2: {
                legend: {
                    top: '5%',
                    data: ['当日新闻度量'],
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
                    name: '当日新闻度量',
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
                        formatter: '估算值：{value}'},
                    data: [{value: ''}]
                }]
            },
            chartOptionso3: {
                legend: {
                    top: '5%',
                    data: ['EIA数据公布情况'],
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
                    name: 'EIA数据公布情况',
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
                        formatter: '当日库存：{value}'},
                    data: [{value: ''}]
                }]
            },
            chartOptionso4: {
                legend: {
                    top: '5%',
                    data: ['当前热点跟踪'],
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
                    name: '当前热点跟踪',
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
                        formatter: '当前热度估算：{value}'},
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
            var now = new Date(); // 当前日期
            let timeDay = moment(now).format('YYYY-MM-DD');
            let params = {
                'timeOfDay': timeDay, // '2019-02-18'
            };
            let varietys1 = '';
            let varietys2 = '';
            // 舆情情感 -- // 热度 chartOptionso1 && chartOptionso2
            postpAnalysis(params).then(resp => {
                if (resp && resp.length !== 0) {
                    // 最近一天的数据  假设是  16 20 2
                    // 最大的就是20/(16+20+2)
                    // 20/(16+20+2) = 52.63%
                    let munData = [];

                    if (resp[resp.length - 1]) {
                        let varietys = resp[resp.length - 1];
                        munData.push(parseFloat(varietys.justCount), parseFloat(varietys.centreCount), parseFloat(varietys.loseCount));
                        let maxData = _.max(munData); // 最大值
                        varietys1 = maxData / (parseFloat(varietys.justCount) + parseFloat(varietys.centreCount) + parseFloat(varietys.loseCount));
                        varietys2 = parseFloat(varietys.weixinHeat) + parseFloat(varietys.baiduHeat);
                    }
                    // 求平均值
                    let mathFloor = Math.floor(varietys1 * 100);
                    let mathFloor2 = varietys2;
                    this.chartOptionso1.series[0].data[0].value = mathFloor;
                    this.chartOptionso2.series[0].data[0].value = mathFloor2;
                }
            });
            // 原油库存 chartOptionso3
            postCrudeTable(params).then(resp => {
                if (resp && resp.length !== 0) {
                    let munData = '';
                    if (resp.ela[resp.ela.length - 1]) {
                        let varietys = resp.ela[resp.ela.length - 1];
                        munData = parseFloat(varietys.publish);
                    }
                    this.chartOptionso3.series[0].data[0].value = munData; // 平均值
                }
            });
            // 国际环境 chartOptionso4
            let params5 = {
                'timeOfDay': timeDay, // '2019-03-1',
                'yesAndNoOpec': '1'
            };
            postOrpeListMap5(params5).then(resp => {
                if (resp && resp.length !== 0) {
                    let munData = '';
                    if (resp[resp.length - 1]) {
                        let varietys = resp[resp.length - 1];
                        munData = parseFloat(varietys.page_hits);
                    }
                    this.chartOptionso4.series[0].data[0].value = munData;
                }
            });
        },
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .box {
        .top {
            text-align: center;
        }
        .item {
            margin: 4px;
        }
    }
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
