<template>
    <div :class="$style.analys2">
        <s-card :title="`国际市场原油相关性分析`" :icon="`fa fa-chart-line`">
            <div slot="right" :class="$style.box">
                <div :class="$style.top">
                    <el-tooltip class="item" effect="dark" placement="right-end">
                        <div slot="content">
                            说明：<br/>
                            该图为每日的原油日k图，即上海期货交易所的原油日k图，纽约商业交易所<br/>
                            的轻质低硫原油日k图和伦敦国际石油交易所的布伦特原油期货日k图。
                        </div>
                        <el-button type="text">?</el-button>
                    </el-tooltip>
                </div>
            </div>
            <echarts-common
                slot="content"
                :loading="loading2"
                ref="echartsDemos2"
                domId="echartsId2"
                :noClearFlag="false"
                :defaultOption="chartOptions2"
                :propsChartHeight="390">
            </echarts-common>
        </s-card>
    </div>
</template>

<script>
import moment from 'moment';
// 国际市场原油相关性分析
import {postOilDayKList} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'analysisChart1',
    components: {SCard, EchartsCommon},
    props: {},
    minis: [],
    data() {
        let schema = [
            // 0 dates     2018-04-03  日期
            // 1 opens     402.5   开盘价
            // 2 closes    414.3  收盘价
            // 3 lows      414.3   最低价
            // 4 highs     400.5   最高价
            // 5 volumes   52826  成交量
            // 6 swings    13.8   振幅
            // 7 rises    -14.1  涨跌
            // 8 riseRates    -14.1  涨跌率
            // 9 swingRates    -14.1  振幅率
            // {name: 'dates', index: 0, text: '日期'},
            {name: '开盘价', index: 1, text: '开盘价(￥)'},
            {name: 'closes', index: 2, text: '收盘价(￥)'},
            {name: 'lows', index: 3, text: '最低价(￥)'},
            {name: 'highs', index: 4, text: '最高价(￥)'},
            {name: 'volumes', index: 5, text: '成交量'},
            {name: 'swings', index: 6, text: '振幅'},
            {name: 'rises', index: 7, text: '涨跌'}
        ];
        let schema1 = [
            {name: 'opens', index: 1, text: '开盘价(￥)'},
            {name: 'closes', index: 2, text: '收盘价(￥)'},
            {name: 'lows', index: 3, text: '最低价(￥)'},
            {name: 'highs', index: 4, text: '最高价(￥)'},
            {name: 'volumes', index: 5, text: '成交量'},
            {name: 'rises', index: 6, text: '振幅'},
            {name: 'rises', index: 7, text: '涨跌'}
        ];
        let schema2 = [
            {name: 'opens', index: 1, text: '开盘价(￥)'},
            {name: 'closes', index: 2, text: '收盘价(￥)'},
            {name: 'lows', index: 3, text: '最低价(￥)'},
            {name: 'highs', index: 4, text: '最高价(￥)'},
            {name: 'volumes', index: 5, text: '成交量'},
            {name: 'rises', index: 6, text: '振幅'},
            {name: 'rises', index: 7, text: '涨跌'}
        ];
        return {
            timer: null,
            loading2: false,
            dialogVisible: false,
            chartOptions2: {
                title: [
                    {
                        text: '', // 动态数据
                        // subtext: '副标题',
                        // left: 'center',
                        left: 'left',
                        itemGap: 10,
                        // left: '20%',
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
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
                        // type: 'cross'
                        // type: 'line'
                    },
                    textStyle: {
                        fontSize: 12
                    },
                    // position(pos, params, el, elRect, size) {
                    //     var obj = {top: 10};
                    //     obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                    //     return obj;
                    // },
                    formatter: param => {
                        let dateStr = '交易日：' + param[0].value[8];
                        let str1 = schema.map((v, i) => {
                            return v.text + ': ' + param[0].value[i + 1];
                        }).join('；');
                        let str2 = schema1.map((v, i) => {
                            return v.text + '： ' + param[1].value[i + 1];
                        }).join('；');
                        let str3 = schema2.map((v, i) => {
                            return v.text + '： ' + param[2].value[i + 1];
                        }).join('；');
                        return dateStr + '<br>' + '原油日K:' + '<br>' + str1 + '<br>' + '纽约日K:' + '<br>' + str2 + '<br>' + '布伦特日K:' + '<br>' + str3;
                    }
                },
                legend: {
                    top: '5%',
                    data: ['原油日K', '纽约日K', '布伦特日K'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                grid: {
                    x: 30, // 左
                    x2: 20, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 100,
                        end: 10
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 100,
                        end: 10
                    }
                ],
                xAxis: {
                    name: '',
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#1fc0ff',
                            margin: 10,
                            width: 1,
                            fontSize: 10 // 字体
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    data: []
                },
                yAxis: [
                    {
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
                    {
                        name: '',
                        scale: true,
                        show: false,
                        offset: 0,
                        position: 'right',
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
                    {
                        name: '',
                        scale: true,
                        show: false,
                        offset: 0,
                        position: 'right',
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
                ],
                series: [
                    {
                        type: 'candlestick',
                        name: '原油日K',
                        barMaxWidth: 50,
                        yAxisIndex: 0,
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
                        type: 'candlestick',
                        name: '纽约日K',
                        yAxisIndex: 0,
                        barMaxWidth: 50,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: '#a54305',
                                color0: 'none',
                                borderColor: '#a54305',
                                borderColor0: '#a54305'
                            }
                        }
                    },
                    {
                        type: 'candlestick',
                        name: '布伦特日K',
                        barMaxWidth: 50,
                        yAxisIndex: 0,
                        data: [
                            // [15512.58, 14633.11, 14434.27, 14642.81],
                            // [14652.36, 14716.66, 14652.36, 14790.11]
                        ],
                        itemStyle: {
                            normal: {
                                color: '#93a206de',
                                color0: 'none',
                                borderColor: '#93a206de',
                                borderColor0: '#93a206de'
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
        this.lienEchartsDete();
    },
    methods: {
        lienEchartsDete() {
            var now = new Date(); // 当前日期
            let timeDay = moment(now).format('YYYY-MM-DD');
            let params = {
                'startDate': timeDay, // '2018-03-26',
                'endDate': '2019-01-10',
                'frequentnes': '5'
            };
            let mainData = {};
            this.loading2 = true;
            // 原油舆情情感分析
            postOilDayKList(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loading2 = false;
                    let bltDate1 = []; // 日期
                    let bltDate2 = []; // 日期
                    let bltDate3 = []; // 日期
                    let bltOData1 = [];
                    let bltOData2 = [];
                    let bltOData3 = [];
                    mainData = resp;
                    let titleText = '';
                    // 原油日K
                    mainData.yyOilDay.forEach(v => {
                        bltDate1.push(v.date);
                        // 开盘价 - 收盘价 - 最低价 - 最高价 - 交易日 - 成交量 - 振幅 - 涨跌
                        bltOData1.push(
                            [v.open, v.close, v.low, v.high, v.volume, v.swing, v.riseRate, v.date]
                            // [v.open, v.close, v.low, v.high]
                        );
                    });
                    // 纽约日K
                    mainData.nyOilDay.forEach(v => {
                        bltDate2.push(v.date);
                        let formatFunc = (value) => {
                            let cnys = value * 6;
                            return cnys.toFixed(3);
                        }
                        // 开盘价 - 收盘价 - 最低价 - 最高价 - 交易日 - 成交量 - 振幅 - 涨跌
                        bltOData2.push(
                            [formatFunc(v.open), formatFunc(v.close), formatFunc(v.low), formatFunc(v.high), v.volume, v.swing, v.riseRate, v.date]
                        );
                        titleText = v.date;
                    });
                    // 布伦特日K
                    mainData.bltOilDay.forEach(v => {
                        bltDate3.push(v.date);
                        let formatFunc = (value) => {
                            let cnys = value * 6;
                            return cnys.toFixed(3);
                        }
                        bltOData3.push(
                            // 开盘价 - 收盘价 -最低价-最高价 / 交易日 -成交量 //振幅//涨跌
                            [formatFunc(v.open), formatFunc(v.close), formatFunc(v.low), formatFunc(v.high), v.volume, v.swing, v.riseRate, v.date]
                        );
                    });
                    this.chartOptions2['title'][0]['text'] = titleText; // 标题
                    this.chartOptions2['xAxis']['data'] = bltDate3; // 日期
                    this.chartOptions2['series'][0]['data'] = bltOData1; // 成交价
                    this.chartOptions2['series'][1]['data'] = bltOData2; // 成交价
                    this.chartOptions2['series'][2]['data'] = bltOData3; // 成交价
                    this.$refs['echartsDemos2'] && this.$refs['echartsDemos2v'].initChart();
                }
            }).catch(e => {
                this.loading2 = false;
            });
        }
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys2 {
        width: 100%;
        .box {
            .top {
                text-align: center;
            }
            .item {
                margin: 4px;
            }
        }
    }
</style>
