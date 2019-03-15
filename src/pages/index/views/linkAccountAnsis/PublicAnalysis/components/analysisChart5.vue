<template>
    <div :class="$style.analys5">
        <s-card :title="`国际环境`" :icon="`fa fa-chart-line`">
            <div slot="right" :class="$style.box">
                <div :class="$style.top">
                    <el-tooltip class="item" effect="dark" placement="right-end">
                        <div slot="content">
                            热点：即为机器"总结出的"近期的热度较高的新闻事件，例如"特朗普制裁"事件等；<br/>
                            <p style="padding: 0; margin: 0; text-indent:35px;">
                                此模块主要是指OPEC组织成员国与非opec国家的热点事件，
                            </p>
                            <p style="padding: 0; margin: 0; text-indent:35px;">
                                主要是热点事件的跟踪，报道量，点击量等情况；
                            </p>
                            下面是对“报道量”和“评论量”的解释。<br/>
                            <!--热点：“热点”为机器判断的热点，即最近发生的新闻经NLP技术自动产生的主题词<br/>-->
                            报道量：此处的“报道量”为页面点击量的简单加权值；<br/>
                            评论量：即每个热点的网友的评论数量，望文生义即可；
                        </div>
                        <el-button type="text">说明 ?</el-button>
                    </el-tooltip>
                </div>
            </div>
            <div slot="content" :class="$style.environment">
                <div :class="$style.environment_box" style="margin-right: 20px;">
                    <el-collapse v-model="activeNames">
                        <el-collapse-item title="OPEC" name="1">
                            <s-table
                                ref="selfTables1"
                                :height="150"
                                :loading="loadingAR1"
                                :columns="columnsLists1"
                                :tableData="tableDatas1"
                                @rowClick="rowClick0">
                            </s-table>
                        </el-collapse-item>
                        <el-collapse-item title="非OPEC" name="2">
                            <s-table
                                ref="selfTables1"
                                :height="150"
                                :loading="loadingAR2"
                                :columns="columnsLists2"
                                :tableData="tableDatas2"
                                @rowClick="rowClick1">
                            </s-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div :class="$style.environment_box">
                    <echarts-common
                        :loading="loading5"
                        ref="selfTablesa5"
                        domId="echartsId5"
                        :noClearFlag="false"
                        :defaultOption="chartOptions5"
                        :propsChartHeight="390">
                    </echarts-common>
                </div>
            </div>
        </s-card>
    </div>
</template>

<script>
import moment from 'moment';
import {
    postOrpeListMap1,
    // postOrpeListMapTerm,
    postOrpeListMap5
} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {columnsListAR5} from './constants';
export default {
    name: 'analysisChart5',
    components: {SCard, STable, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            activeNames: ['1'],
            loadingAR1: false,
            loadingAR2: false,
            columnsLists1: columnsListAR5,
            columnsLists2: columnsListAR5,
            tableDatas1: [],
            tableDatas2: [],
            timer: null,
            fullscreen: false,
            loading5: false,
            chartOptions5: {
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
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    textStyle: {
                        fontSize: 12
                    },
                    // formatter: '{a0} ：{c0}' + '<br/>' + '{a1} ：{c1}'
                },
                legend: {
                    top: '3%',
                    data: ['报道量', '评论量'],
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
                xAxis: {
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
                    // data: [
                    //     '2019-02-20',
                    //     '2019-02-21',
                    //     '2019-02-22',
                    //     '2019-02-23',
                    //     '2019-02-24',
                    //     '2019-02-25'
                    // ]
                    data: []
                },
                yAxis: [
                    {
                        name: '报道量',
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
                        name: '评论量',
                        // show: false,
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
                        end: 0
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 100,
                        end: 0
                    }
                ],
                series: [
                    {
                        name: '报道量',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}%'
                            }
                        },
                        yAxisIndex: 0,
                        data: [
                        ]
                    },
                    {
                        name: '评论量',
                        type: 'line',
                        // stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight',
                                fontSize: 9,
                                formatter: '{c}%'
                            }
                        },
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dotted'
                                }
                            }
                        },
                        yAxisIndex: 0,
                        data: []
                    }
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.lienEchart0('2019-03-01', '0');
        this.lienEchart1('2019-03-01', '1');
        this.orpeListMap5('2019-03-01', '0');
    },
    methods: {
        // OPEC 列表
        lienEchart0(timeOfDay, yesAndNoOpec) {
            let params = {
                'timeOfDay': timeOfDay,
                'yesAndNoOpec': yesAndNoOpec
            };
            this.loadingAR1 = true;
            this.tableDatas1 = [];
            postOrpeListMap1(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR1 = false;
                    this.tableDatas1 = resp;
                }
            }).catch(e => {
                this.loadingAR1 = false;
            });
        },
        // 非 OPEC 列表
        lienEchart1(timeOfDay, yesAndNoOpec) {
            let params = {
                'timeOfDay': timeOfDay,
                'yesAndNoOpec': yesAndNoOpec
            };
            this.loadingAR2 = true;
            this.tableDatas2 = [];
            postOrpeListMap1(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR2 = false;
                    this.tableDatas2 = resp;
                }
            }).catch(e => {
                this.loadingAR2 = false;
            });
        },
        // 国际环境 折线图
        orpeListMap5(timeOfDay, yesAndNoOpec) {
            let params5 = {
                'timeOfDay': timeOfDay,
                'yesAndNoOpec': yesAndNoOpec
            };
            this.loading5 = true;
            postOrpeListMap5(params5).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loading5 = false;
                    let timeDate5 = [];
                    let commentsNums5 = [];
                    let pageHits5 = [];
                    let titleText = '';
                    resp.forEach(v => {
                        timeDate5.push(v.OPECpublished_time); // 日期
                        commentsNums5.push(v.comments_num); // 评论量
                        pageHits5.push(v.page_hits); // 报道量
                        titleText = '2019-02-25' + ' 报道量' + v.page_hits + ' 评论量' + v.comments_num;
                    });
                    this.chartOptions5['title'][0]['text'] = titleText; // 标题
                    this.chartOptions5['xAxis']['data'] = timeDate5;
                    this.chartOptions5['series'][0]['data'] = pageHits5; // 报道量
                    this.chartOptions5['series'][1]['data'] = commentsNums5; // 评论量
                    // this.chartOptions5['series'][0]['data'] = ['33', '422', '312', '423', '33']; // 热点

                    // ...................................
                    let titleTexts = '';
                    let munDatas = [];
                    if (resp[resp.length - 1]) {
                        let varietys = resp[resp.length - 1];
                        titleTexts = varietys.OPECpublished_time;
                        munDatas = parseFloat(varietys.page_hits);
                    }
                    let mathFloor5 = munDatas;
                    let mainObj5 = {
                        'titleText': moment(new Date(titleTexts.replace(/[年月]/g, '-').replace(/[日]/g, ''))).format('YYYY-MM-DD'), // 日期
                        'front5': mathFloor5, // 公布值仪表盘
                    };
                    this.$emit('evetClick5', this.loading5, mainObj5);
                    // ...................................
                    this.$refs['selfTablesa5'] && this.$refs['selfTablesa5'].initChart();
                }
            }).catch(e => {
                this.loading5 = false;
            });
        },
        // OPEC 折线图
        rowClick0(row) {
            this.orpeListMap5(row.OPECpublished_time, '0');
        },
        // 非 OPEC 折线图
        rowClick1(row) {
            this.orpeListMap5(row.OPECpublished_time, '1');
        },
    },
    beforeDestroy() {
    }
};
</script>
<style>
    .el-collapse-item__header {
        height: 35px;
        line-height: 35px;
        padding-left: 10px;
        background-color: #0c2255 !important;
        color: #fff;
        border-bottom: 1px solid #091d4c;
    }
    .el-collapse {
        border-top: 0 solid #ebeef5;
        border-bottom: 0 solid #ebeef5;
    }
    .el-carousel__mask, .el-cascader-menu, .el-cascader-menu__item.is-disabled:hover, .el-collapse-item__header, .el-collapse-item__wrap {
        background-color: #0c2255;
    }
    .el-collapse-item__wrap {
        border-bottom: 1px solid #0c2255 !important;
    }
    .el-collapse-item__content {
        padding-bottom: 0;
    }
</style>
<style lang="less" module>
    .analys5 {
        width: 100%;
        .box {
            .top {
                text-align: center;
            }
            .item {
                margin: 4px;
            }
        }
        .environment {
            width: 100%;
            display: flex;
            justify-content: stretch;
            .environment_box {
                padding: 10px;
                width: calc(100% / 2 - 15px);
                box-shadow: 0 0 10px #326fcb !important;
            }
        }
    }
</style>
