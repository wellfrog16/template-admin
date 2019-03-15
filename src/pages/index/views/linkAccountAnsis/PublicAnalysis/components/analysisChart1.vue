<template>
    <div :class="$style.analys1">
        <s-card :title="`原油舆情情感分析`" :icon="`fa fa-chart-line`">
            <div slot="right" :class="$style.box">
                <div :class="$style.top">
                    <el-tooltip class="item" effect="dark" placement="right-end">
                        <div slot="content">
                            智能机器人“总结的”每日新闻分别应属于利多、利空、中性的条数。<br/>
                            即每日新闻经自然语言处理技术判断生成的利多还是利空（或者中性）的分析结论，即<br/>
                            热度即当前新闻报道数量等加权和。
                            <!--每日新闻的利多、利空、中性(可理解为既不利多又不利空的消息)情况，<br/>-->
                            <!--即每天利多、利空、中性的发布条数。热度即当前新闻报道数量等加权和。-->
                        </div>
                        <el-button type="text">说明 ?</el-button>
                    </el-tooltip>
                </div>
            </div>
            <echarts-common
                slot="content"
                :loading="loading1"
                ref="echartsDemos1"
                domId="echartsId1"
                :noClearFlag="false"
                :defaultOption="chartOptions1"
                :propsChartHeight="390">
            </echarts-common>
        </s-card>
    </div>
</template>

<script>
import _ from 'lodash';
import moment from 'moment';
// 原油舆情情感分析
import {
    postpAnalysis, // 舆情情感
} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'analysisChart1',
    components: {SCard, EchartsCommon},
    props: {},
    minis: [],
    data() {
        // let schema = [
        //     {name: 'publicDate', index: 0, text: '日期'},
        //     {name: 'justCount', index: 1, text: '利好'},
        //     {name: 'loseCount', index: 2, text: '利空'},
        //     {name: 'centreCount', index: 3, text: '中性'},
        //     {name: 'weixinBaiduHeat', index: 4, text: '热度'},
        // ];
        return {
            timer: null,
            loading1: false,
            dialogVisible: false,
            chartOptions1: {
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
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'axis',
                    textStyle: {
                        fontSize: 12
                    },
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#fff',
                            backgroundColor: '#222'
                        }
                    }
                    // formatter: '{a0}：{c0}' + '<br/>' + '{a1}：{c1}' + '<br/>' + '{a2}：{c2}' + '<br/>' + '{a3}：{c3}'
                },
                legend: {
                    top: '3%',
                    // data: ['正面', '负面', '中性', '热度'],
                    data: ['利多', '利空', '中性', '热度'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                calculable: true,
                grid: {
                    x: 20, // 左
                    x2: 30, // 右
                    y: 60, // 上
                    // y2: 160 // 下
                    y2: 90, // 下
                    textStyle: {
                        color: '#fff'
                    }
                },
                xAxis: [
                    {
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
                    }
                ],
                yAxis: [
                    {
                        name: '利多',
                        type: 'value',
                        position: 'left',
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
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}'
                        }
                    },
                    {
                        name: '热度',
                        // show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
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
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                    },
                    {
                        name: '中性',
                        show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#999']
                                // width: 0
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                    },
                    {
                        name: '利空',
                        show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#999']
                                // width: 0
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}'
                        },
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        start: 100,
                        end: 30
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 100,
                        end: 30
                    }
                ],
                series: [
                    {
                        name: '利多',
                        type: 'bar',
                        stack: '总量',
                        barWidth: 30,
                        barCategoryGap: 10,
                        yAxisIndex: 0,
                        barGap: '10%',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}'
                            }
                        },
                        data: []
                    },
                    {
                        name: '利空',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}'
                            }
                        },
                        data: []
                    },
                    {
                        name: '中性',
                        type: 'bar',
                        stack: '总量',
                        yAxisIndex: 0,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}'
                            }
                        },
                        data: []
                    },
                    {
                        name: '热度',
                        type: 'line',
                        stack: '总量',
                        yAxisIndex: 1,
                        barGap: '10%',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}'
                            }
                        },
                        data: []
                    },
                ]
            },
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
                'timeOfDay': timeDay // '2019-02-18'
                // 'timeOfDay': '2019-03-08' // '2019-02-18'
            };
            this.loading1 = true;
            let mainData = [];
            let timeDate = []; // 日期
            let heatData = []; // 利多
            let frontData = []; // 热度
            let neutralData = []; // 中性
            let negativeData = []; // 利空
            let varietys1 = ''; // 原油舆情情感仪表盘
            let varietys2 = '';// 原油舆情热度仪表盘
            // 原油舆情情感分析
            postpAnalysis(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loading1 = false;
                    let titleText = '';
                    mainData = resp;
                    this.$store.commit('analysisMut1', mainData);
                    mainData.forEach(v => {
                        let times = moment(v.date).format('YYYY-MM-DD');
                        timeDate.push(times); // 日期
                        heatData.push(v.just_count); // 利多justCount
                        neutralData.push(v.centre_count); // 中性centreCount
                        negativeData.push(v.lose_count); // 利空loseCount
                        frontData.push(parseInt(v.wx_INDEX) + parseInt(v.baidu_INDEX)); // 热度
                        // 日期 - 利多 - 利空  - 中性 - 热度
                        titleText = v.date + ' 利多' + v.just_count + ' 利空' + v.lose_count + ' 中性' + v.centre_count + ' 热度' + (parseInt(v.wx_INDEX) + parseInt(v.baidu_INDEX));
                    });
                    this.chartOptions1['title'][0]['text'] = titleText; // 标题
                    this.chartOptions1['xAxis'][0]['data'] = timeDate;
                    this.chartOptions1['series'][0]['data'] = heatData;
                    this.chartOptions1['series'][1]['data'] = negativeData;
                    this.chartOptions1['series'][2]['data'] = neutralData;
                    this.chartOptions1['series'][3]['data'] = frontData;
                    // ...................................
                    let titleTexts = '';
                    let munDatas = [];
                    if (resp[resp.length - 1]) {
                        let varietys = resp[resp.length - 1];
                        titleTexts = varietys.date;
                        munDatas.push(parseFloat(varietys.just_count), parseFloat(varietys.centre_count), parseFloat(varietys.lose_count));
                        let maxData1 = _.max(munDatas); // 最大值
                        varietys1 = maxData1 / (parseFloat(varietys.just_count) + parseFloat(varietys.centre_count) + parseFloat(varietys.lose_count));
                        varietys2 = parseFloat(varietys.wx_INDEX) + parseFloat(varietys.baidu_INDEX);
                    }
                    let mathFloor1 = Math.floor(varietys1 * 100);
                    let mathFloor2 = varietys2;
                    let mainObj = {
                        'titleText': titleTexts, // 日期
                        'front1': mathFloor1, // 原油舆情情感仪表盘
                        'front2': mathFloor2 // 原油舆情热度仪表盘
                    };
                    this.$emit('evetClick1', this.loading1, mainObj);
                    // ...................................
                    this.$refs['echartsDemos1'] && this.$refs['echartsDemos1'].initChart();
                }
            }).catch(e => {
                this.loading1 = false;
            });
        }
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys1 {
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
