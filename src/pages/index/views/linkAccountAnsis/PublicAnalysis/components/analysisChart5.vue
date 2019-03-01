<template>
    <div :class="$style.analys4">
        <s-card :title="`国际环境`" :icon="`fa fa-chart-line`">
            <div slot="content" :class="$style.environment">
                <div :class="$style.environment_box" style="margin-right: 20px;">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <el-collapse-item title="OPEC" name="1">
                            <s-table
                                ref="selfTables1"
                                :height="150"
                                :loading="loadingAR1"
                                :columns="columnsLists1"
                                :tableData="tableDatas1"
                                @selection-change="handleSelectionChange1">
                            </s-table>
                        </el-collapse-item>
                        <el-collapse-item title="非OPEC" name="2">
                            <s-table
                                ref="selfTables1"
                                :height="150"
                                :loading="loadingAR2"
                                :columns="columnsLists2"
                                :tableData="tableDatas2"
                                @selection-change="handleSelectionChange2">
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
import {
    postOrpeListMap1,
    postOrpeListMapTerm,
    postOrpeListMap5
} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {columnsListAR5} from './constants';
export default {
    name: 'analysisChart1',
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
                // title: {
                //     left: 'left',
                //     text: '折线图堆叠',
                //     x: '1%',
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: '14'
                //     }
                // },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
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
                xAxis: [
                    {
                        type: 'category',
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#fff',
                                margin: 10,
                                width: 1,
                                fontSize: 10 // 字体
                            }
                        },
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        splitArea: {
                            show: false
                        },
                        axisLabel: {
                            interval: 0,
                        },
                        data: [
                            '2019-03-01',
                            '2019-02-28',
                            '2019-02-27',
                            '2019-02-26',
                            '2019-02-25'
                        ]
                    }
                ],
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
                            formatter: '{value}%'
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
                            formatter: '{value}%'
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
        this.lienEchartsDete();
    },
    methods: {
        handleChange(val) {
            console.log(val);
        },
        toggleDetail() {
            if (this.detail) {
                this.detail = !this.detail;
            } else {
                this.detail = !this.detail;
            }
        },
        exporstClick() {},
        handleSelectionChange1() {
            let params5 = {
                'timeOfDay': '2019-03-1',
                'yesAndNoOpec': '1'
            };
            postOrpeListMap5(params5).then(resp => {
                console.log(resp);
            });
        },
        handleSelectionChange2() {
            let params5 = {
                'timeOfDay': '2019-03-1',
                'yesAndNoOpec': '1'
            };
            postOrpeListMap5(params5).then(resp => {
                console.log(resp);
            });
        },
        fullscreenChange() {},
        toggleFullScreen() {
            console.log(22);
        },
        lienEchartsDete() {
            this.loading5 = true;
            this.loadingAR1 = true;
            this.loadingAR2 = true;
            this.tableDatas1 = [];
            this.tableDatas2 = [];
            let mainData = [];
            let timeDate = []; // 公布日期
            let opeCcount = []; // 公布值
            let params0 = {
                'timeOfDay': '2019-03-1',
                'yesAndNoOpec': 0
            };
            postOrpeListMap1(params0).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR1 = false;
                    this.tableDatas1 = resp;
                }
            }).catch(e => {
                this.loadingAR1 = false;
            });
            let params1 = {
                'timeOfDay': '2019-03-1',
                'yesAndNoOpec': '1'
            };
            postOrpeListMap1(params1).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR2 = false;
                    this.tableDatas2 = resp;
                }
            }).catch(e => {
                this.loadingAR2 = false;
            });
            // let params = {
            //     'timeOfDay': '2019-03-1',
            //     'yesAndNoOpec': '1',
            //     'hotTopic': '中东局势'
            // };
            // postOrpeListMapTerm(params).then(resp => {
            //     if (resp && resp.length !== 0) {
            //         this.loading5 = false;
            //         console.log(resp);
            //         resp.forEach(v => {
            //             timeDate.push(v.OPECpublished_time); // 公布日期
            //             opeCcount.push(v.OPECcount); // 公布值
            //         });
            //         this.chartOptions5['xAxis']['data'] = timeDate;
            //         this.chartOptions5['series'][0]['data'] = opeCcount;
            //         this.chartOptions5['series'][1]['data'] = [];
            //         this.chartOptions5['series'][2]['data'] = [];
            //         this.$refs['selfTablesa5'] && this.$refs['selfTablesa5'].initChart();
            //     }
            // }).catch(e => {
            //     this.loading5 = false;
            // });
            let params5 = {
                'timeOfDay': '2019-03-1',
                'yesAndNoOpec': '1'
            };
            let timeDate5 = [];
            let commentsNums5 = [];
            let pageHits5 = [];
            postOrpeListMap5(params5).then(resp => {
                console.log(resp);
                if (resp && resp.length !== 0) {
                    this.loading5 = false;
                    resp.forEach(v => {
                        timeDate5.push(v.OPECpublished_time); // 公布日期
                        commentsNums5.push(v.comments_num); // 公布值
                        pageHits5.push(v.page_hits); // 公布值
                    });
                    this.chartOptions5['xAxis']['data'] = timeDate;
                    this.chartOptions5['series'][0]['data'] = pageHits5; // 报道量
                    this.chartOptions5['series'][1]['data'] = commentsNums5;
                    // this.chartOptions5['series'][0]['data'] = ['33', '422', '312', '423', '33']; // 评论量
                    this.$refs['selfTablesa5'] && this.$refs['selfTablesa5'].initChart();
                }
            }).catch(e => {
                this.loading5 = false;
            });
        }
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
    .analys4 {
        width: 100%;
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
