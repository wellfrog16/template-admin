<template>
    <div :class="$style.dashboard">
        <s-card :title="`舆情分析结论`" :icon="`fa fa-chart-line`">
            <div slot="right" :class="$style.box">
                <div :class="$style.top">
                    <el-tooltip class="item" effect="dark" placement="right-end">
                        <div slot="content">
                            原油舆情情感：智能机器人"总结出"的最近一个交易日的新闻利多或是利空(或中性)的占比情况，
                            <p style="padding: 0; margin: 0; text-indent:85px;">
                                例如"利多63%"，即机器认为当天有63%的新闻消息属于利多消息；
                            </p>
                            原油舆情热度：新闻报道量、点击量等加权之和，反映新闻事件的热度；<br>
                            EIA原油库存：由美国能源信息署统计公布的美国当周原油库存数量;<br>
                            原油国际环境新闻报道：近期机器"总结出的"新闻热点事件，例如"特朗普制裁"事件，
                            <p style="padding: 0; margin: 0; text-indent:132px;">
                                仪表盘的值为该事件最近一个交易日的报道量；
                            </p>
                        </div>
                        <el-button type="text">说明 ?</el-button>
                    </el-tooltip>
                </div>
            </div>
            <div :class="$style.dashboards" slot="content">
                <div :class="$style.dashboard_box">
                    <el-popover trigger="hover"
                                width="200">
                        <echarts-common
                            slot="reference"
                            ref="echartsDemoa1"
                            domId="echartsIds1"
                            :noClearFlag="false"
                            :defaultOption="chartOptionso1"
                            :propsChartHeight="300">
                        </echarts-common>
                        <div>
                            <!--机器“总结出”的最近一个交易日的新闻利多或是利空(或中性)的占比情况， 例如“利空63%”，即机器认为当天有63%的新闻消息属于利空消息。-->
                            智能机器人计算出的最近一个交易日的新闻利多或是利空(或中性)的占比情况， 例如"利多63%"，即机器认为当天有63%的新闻消息属于利多消息。
                        </div>
                    </el-popover>
                </div>
                <div :class="$style.dashboard_box">
                    <el-popover
                        width="200"
                        trigger="hover">
                        <echarts-common
                            slot="reference"
                            ref="echartsDemoa2"
                            domId="echartsIds2"
                            :noClearFlag="false"
                            :defaultOption="chartOptionso2"
                            :propsChartHeight="300">
                        </echarts-common>
                        <div>
                            当日新闻报道量、点击量等加权之和；结果为一稳定值，特别是新闻数量。
                        </div>
                    </el-popover>
                </div>
                <div :class="$style.dashboard_box">
                    <el-popover
                        width="200"
                        trigger="hover">
                        <echarts-common
                            slot="reference"
                            ref="echartsDemoa3"
                            domId="echartsIds3"
                            :noClearFlag="false"
                            :defaultOption="chartOptionso3"
                            :propsChartHeight="300">
                        </echarts-common>
                        <div>
                            即由美国能源信息署统计公布（该数据不包括战略石油储备），该数据每周公布一次，其主要显示了美国当周原油库存数量。
                        </div>
                    </el-popover>
                </div>
                <div :class="$style.dashboard_box">
                    <el-popover
                        width="200"
                        trigger="hover">
                        <echarts-common
                            slot="reference"
                            ref="echartsDemoa4"
                            domId="echartsIds4"
                            :noClearFlag="false"
                            :defaultOption="chartOptionso4"
                            :propsChartHeight="300">
                        </echarts-common>
                        <div>
                            国际舆情模块主要是指OPEC大区与非OPEC大区报道量，点击量等加权之和对热度的度量。
                        </div>
                    </el-popover>
                </div>
            </div>
        </s-card>
        <div>
            <AnalysisChart1 @evetClick1="evetClick1" ref="chart1"></AnalysisChart1>
            <AnalysisChart2></AnalysisChart2>
            <AnalysisChart3 @evetClick3="evetClick3"></AnalysisChart3>
            <AnalysisChart4></AnalysisChart4>
            <AnalysisChart5 @evetClick5="evetClick5"></AnalysisChart5>
            <AnalysisChart6></AnalysisChart6>
        </div>
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import AnalysisChart1 from '../components/analysisChart1';
import AnalysisChart2 from '../components/analysisChart2';
import AnalysisChart3 from '../components/analysisChart3';
import AnalysisChart4 from '../components/analysisChart4';
import AnalysisChart5 from '../components/analysisChart5';
import AnalysisChart6 from '../components/analysisChart6';
export default {
    name: 'dashboard',
    components: {
        SCard,
        EchartsCommon,
        AnalysisChart1,
        AnalysisChart2,
        AnalysisChart3,
        AnalysisChart4,
        AnalysisChart5,
        AnalysisChart6,
    },
    props: {},
    minis: [],
    data() {
        return {
            timer: null,
            chartOptionso1: {
                title: [
                    {
                        text: '', // 动态数据
                        // subtext: '副标题',
                        // left: 'center',
                        bottom: 10,
                        itemGap: 10,
                        padding: [
                            0, // 上
                            0, // 右
                            0, // 下
                            20, // 左
                        ],
                        textStyle: {
                            // 文字颜色
                            color: '#fff',
                            // 字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: '100',
                            // 字体系列
                            fontFamily: 'sans-serif',
                            // 字体大小
                            fontSize: 12,
                        }
                    },
                ],
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
                    borderColor: '#777',
                    borderWidth: 1,
                    textStyle: {
                        fontSize: 12
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#fff',
                            backgroundColor: '#222'
                        }
                    },
                    formatter: '{a}{b} : {c}%'
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
                    min: -100,
                    max: 100,
                    axisLine: { // 坐标轴线
                        lineStyle: { // 属性lineStyle控制线条样式
                            color: [
                                [0.5, '#37a2da'],
                                // [0.1, '#FFCA4B'],
                                [1, '#fd666d']
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
                            case '-60':
                                return '-60 利空';
                            case '0':
                                return '中性';
                            case '60':
                                return '60 利多';
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
                        // formatter: params => {
                        //     console.log(params);
                        // },
                        // formatter: '利空' + '分析结果：{value}%'} + '利好',
                        formatter: '属于利多的比例：{value}%'
                    },
                    data: [{value: '0'}]
                }]
            },
            chartOptionso2: {
                title: [
                    {
                        text: '', // 动态数据
                        // subtext: '副标题',
                        // left: 'center',
                        bottom: 10,
                        itemGap: 10,
                        padding: [
                            0, // 上
                            0, // 右
                            0, // 下
                            20, // 左
                        ],
                        textStyle: {
                            // 文字颜色
                            color: '#fff',
                            // 字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: '100',
                            // 字体系列
                            fontFamily: 'sans-serif',
                            // 字体大小
                            fontSize: 12,
                        }
                    },
                ],
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
                    borderColor: '#777',
                    borderWidth: 1,
                    textStyle: {
                        fontSize: 12
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#fff',
                            backgroundColor: '#222'
                        }
                    },
                    formatter: '{a}{b} : {c}'
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
                                [0.3, '#0cda47'],
                                [0.7, '#FFCA4B'],
                                [1, '#fd0e10']
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
                        formatter: '热度：{value}'},
                    data: [{value: '0'}]
                }]
            },
            chartOptionso3: {
                title: [
                    {
                        text: '', // 动态数据
                        // subtext: '副标题',
                        // left: 'center',
                        bottom: 10,
                        itemGap: 10,
                        padding: [
                            0, // 上
                            0, // 右
                            0, // 下
                            20, // 左
                        ],
                        textStyle: {
                            // 文字颜色
                            color: '#fff',
                            // 字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: '100',
                            // 字体系列
                            fontFamily: 'sans-serif',
                            // 字体大小
                            fontSize: 12,
                        }
                    },
                ],
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
                    borderColor: '#777',
                    borderWidth: 1,
                    textStyle: {
                        fontSize: 12
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#fff',
                            backgroundColor: '#222'
                        }
                    },
                    formatter: '{a}{b} : {c}'
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
                            // color: '#63869e',
                            color: [
                                [0.3, '#017cda'],
                                [0.7, '#FFCA4B'],
                                [1, '#fd666d']
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
                        formatter: '公布值：{value}(万桶)'},
                    data: [{value: '0'}]
                }]
            },
            chartOptionso4: {
                title: [
                    {
                        text: '', // 动态数据
                        // subtext: '副标题',
                        // left: 'center',
                        bottom: 10,
                        itemGap: 10,
                        padding: [
                            0, // 上
                            0, // 右
                            0, // 下
                            20, // 左
                        ],
                        textStyle: {
                            // 文字颜色
                            color: '#fff',
                            // 字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: '100',
                            // 字体系列
                            fontFamily: 'sans-serif',
                            // 字体大小
                            fontSize: 12,
                        }
                    },
                ],
                legend: {
                    top: '5%',
                    data: ['原油国际环境新闻报道'],
                },
                color: [
                    '#37A2DA',
                    '#32C5E9',
                    '#67E0E3'
                ],
                tooltip: {
                    borderColor: '#777',
                    borderWidth: 1,
                    textStyle: {
                        fontSize: 12
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#fff',
                            backgroundColor: '#222'
                        }
                    },
                    formatter: '{a}{b} : {c}%'
                },
                series: [{
                    name: '原油国际环境新闻报道',
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
                                [0.3, '#03c6f7'],
                                [0.7, '#FFCA4B'],
                                [1, '#f77309']
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
                        formatter: '报道量：{value}'},
                    data: [{value: '0'}]
                }]
            }
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.lienEchartsDete();
    },
    methods: {
        evetClick1(val, obj) {
            if (!val) {
                this.chartOptionso1['title'][0]['text'] = obj.titleText; // 标题
                this.chartOptionso2['title'][0]['text'] = obj.titleText; // 标题
                this.chartOptionso1.series[0].data[0].value = obj.front1;
                this.chartOptionso2.series[0].data[0].value = obj.front2;
            }
        },
        evetClick3(val, obj) {
            if (!val) {
                this.chartOptionso3['title'][0]['text'] = obj.titleText; // 标题
                this.chartOptionso3.series[0].data[0].value = obj.front3;
            }
        },
        evetClick5(val, obj) {
            if (!val) {
                this.chartOptionso4['title'][0]['text'] = obj.titleText; // 标题
                this.chartOptionso4.series[0].data[0].value = obj.front5;
            }
        },
        lienEchartsDete() {
            clearInterval(this.timer);
            this.timer = setInterval(v => {
                this.evetClick1();
                this.evetClick3();
                this.evetClick5();
            }, 30000);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer);
    }
};
</script>
<style>
    .el-popover__title {
        color: #fff;
        font-size: 14px;
    }
    .el-popover {
        background: #444242;
        border: 1px solid #444242;
        z-index: 2000;
        color: #fff;
        font-size: 12px;
    }
</style>
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
