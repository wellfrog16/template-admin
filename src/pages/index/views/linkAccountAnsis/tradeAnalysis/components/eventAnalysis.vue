<template>
    <div class="event-analysis">
        <div class="event-main-info" v-loading="loadingBasicInfo">
            <el-row>
                <el-col :span="4" class="self-line">
                    品种：{{ eventBasicInfo.breed }}
                </el-col>
                <el-col :span="4" class="self-line">
                    合约代码：{{ eventBasicInfo.contrCd }}
                </el-col>
                <el-col :span="4" class="self-line">
                    识别标的：{{ eventBasicInfo.idtfySubjMatter === '0' ? '内因' : eventBasicInfo.idtfySubjMatter === '1' ? '外因' : '' }}
                </el-col>
                <el-col :span="6" class="self-line">
                    关键词：{{ eventBasicInfo.keyword }}
                </el-col>
                <el-col :span="6" class="self-line">用户范围： {{ eventBasicInfo.userRange }}</el-col>
                <el-col :span="24" class="self-line">
                    时间范围：{{ eventBasicInfo.dateRange }}
                </el-col>
                <el-col :span="24" class="self-line">事件描述：{{ eventBasicInfo.eventDesc }}</el-col>
                <el-col :span="24" class="self-line">
                    <setting-tags labelText="事件标签" :showTagType="true" :showBorder="false" :propsSelectTags="eventBasicInfo.eventLabel" @handleConfirmSelectTags="handleConfirmSelectTags" @handleCancelSelectTags="handleCancelSelectTags"></setting-tags>
                </el-col>
            </el-row>
        </div>
        <div>
            <echarts-common :loading="loadingEventChartData" ref="eventAnalysisChart" domId="eventAnalysisChartDom" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
        </div>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import settingTags from '../../unusualAnalysis/components/settingTags';
import {updateEventTags} from '@/api/tradeAnalysis';
export default {
    components: {EchartsCommon, settingTags},
    props: {
        propsEventBasicInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        propsEventChartData: {
            type: Object,
            default() {
                return {};
            }
        },
        loadingBasicInfo: {
            type: Boolean,
            default: false
        },
        loadingEventChartData: {
            type: Boolean,
            default: false
        },
        unusualMarkArea: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    watch: {
        propsEventBasicInfo: {
            handler(val) {
                this.eventBasicInfo = JSON.parse(JSON.stringify(val));
            },
            deep: true
        },
        propsEventChartData: {
            handler(val) {
                this.eventChartData = JSON.parse(JSON.stringify(val));
                let date = [];
                let data1 = [];
                let data2 = [];
                let data3 = [];
                let data4 = [];
                let data5 = [];
                this.eventChartData.forEach(v => {
                    date.push(v.date);
                    data1.push(v.closeQuot);
                    data2.push(v.bargainQtty);
                    data3.push(v.multiUserCnt);
                    data4.push(v.oversellUserCnt);
                    data5.push(v.prftStat);
                });
                this.chartOptions['xAxis'][4]['data'] = date;
                this.chartOptions['series'][0]['data'] = data1;
                this.chartOptions['series'][1]['data'] = data2;
                this.chartOptions['series'][2]['data'] = data3;
                this.chartOptions['series'][3]['data'] = data4;
                this.chartOptions['series'][4]['data'] = data5;
            },
            deep: true
        },
        unusualMarkArea: {
            handler(val) {
                this.chartOptions.series[0]['markArea']['data'] = val;
                this.chartOptions.series[1]['markArea']['data'] = val;
                this.chartOptions.series[2]['markArea']['data'] = val;
                this.chartOptions.series[3]['markArea']['data'] = val;
                this.chartOptions.series[4]['markArea']['data'] = val;
            },
            deep: true
        }
    },
    data() {
        let date = ['08:30', '09:31', '09:32', '09:33', '09:34', '09:35', '10:36'];
        return {
            propsChartHeight: 780,
            extraPrv: 1, // 前置30分钟
            extraNext: 1, // 后置40分钟
            eventBasicInfo: {},
            eventChartData: {},
            chartOptions: {
                grid: [
                    {
                        left: 60,
                        right: 80,
                        height: 280,
                        top: 45,
                        containLabel: false
                    },
                    {
                        left: 60,
                        right: 80,
                        height: 60,
                        top: 380,
                        containLabel: false
                    },
                    {
                        left: 60,
                        right: 80,
                        height: 120,
                        top: 470,
                        containLabel: false
                    },
                    {
                        left: 60,
                        right: 80,
                        height: 80,
                        bottom: 60,
                        containLabel: false
                    }
                ],
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 3]
                    }],
                    label: {
                        backgroundColor: '#222',
                        borderColor: '#777'
                    }
                },
                legend: {
                    type: 'scroll',
                    data: ['分时图', '成交量', '交易用户数多头', '交易用户数空头', '盈利盘']
                },
                tooltip: {
                    trigger: 'item',
                    enterable: true, // 鼠标进入浮层
                },
                xAxis: [
                    {
                        name: '时间',
                        type: 'category',
                        boundaryGap: false,
                        data: date,
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: date,
                        scale: true,
                        boundaryGap: false,
                        splitLine: {show: false},
                        axisLabel: {show: false},
                        axisTick: {
                            show: false,
                        },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            type: 'shadow',
                            snap: true,
                            label: {show: false},
                            triggerTooltip: true,
                            handle: {
                                show: true,
                                margin: 15,
                                size: 25,
                                color: '#f3ec6cf2'
                            }
                        }
                    },
                    {
                        type: 'category',
                        name: '时间',
                        gridIndex: 2,
                        scale: true,
                        data: date,
                        boundaryGap: false,
                    },
                    {
                        type: 'category',
                        name: '时间',
                        gridIndex: 3,
                        data: date,
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        name: '价格',
                        type: 'value',
                        min: value => {
                            return value.min;
                        },
                        max: value => {
                            return value.max;
                        },
                    },
                    {
                        name: '成交量',
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        splitLine: {show: false}
                    },
                    {
                        name: '交易用户数',
                        scale: true,
                        gridIndex: 2,
                        splitNumber: 2,
                        splitLine: {show: false}
                    },
                    {
                        name: '数量',
                        type: 'value',
                        gridIndex: 3,
                        min: value => {
                            return value.min;
                        },
                        max: value => {
                            return value.max;
                        },
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 3]
                    },
                    {
                        show: true,
                        type: 'slider',
                        xAxisIndex: [0, 3],
                        bottom: 0
                    }
                ],
                series: [
                    {
                        name: '分时图',
                        data: [1532, 1542, 1478, 1653, 1233, 1444, 1422],
                        type: 'line',
                        markArea: {
                            label: {
                                color: '#d92e20'
                            },
                            itemStyle: {
                                color: '#592749'
                            },
                            data: [
                                [{name: '异常区域', xAxis: '09:31'}, {xAxis: '09:33'}],
                                [{name: '观察窗口', xAxis: '09:30', itemStyle: {color: 'transparent', borderColor: '#ccc', borderWidth: 1, borderType: 'dashed'}, label: {color: '#ccc', position: 'insideTopRight'}}, {xAxis: '09:34'}],
                            ]
                        }
                    },
                    {
                        name: '成交量',
                        type: 'bar',
                        barMaxWidth: 35,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                // color: '#7fbe9e'
                            },
                            emphasis: {
                                // color: '#140'
                            }
                        },
                        markArea: {
                            label: {
                                color: '#d92e20'
                            },
                            itemStyle: {
                                color: '#592749'
                            },
                            data: [
                                [{name: '异常区域', xAxis: '09:31'}, {xAxis: '09:33'}],
                                [{name: '观察窗口', xAxis: '09:30', itemStyle: {color: 'transparent', borderColor: '#ccc', borderWidth: 1, borderType: 'dashed'}, label: {color: '#ccc', position: 'insideTopRight'}}, {xAxis: '09:34'}],
                            ]
                        },
                        data: [1233, 4444, 5225, 1166, 7111, 7117, 2254],
                    }, {
                        name: '交易用户数多头',
                        type: 'line',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        markArea: {
                            label: {
                                color: '#d92e20'
                            },
                            itemStyle: {
                                color: '#592749'
                            },
                            data: [
                                [{name: '异常区域', xAxis: '09:31'}, {xAxis: '09:33'}],
                                [{name: '观察窗口', xAxis: '09:30', itemStyle: {color: 'transparent', borderColor: '#ccc', borderWidth: 1, borderType: 'dashed'}, label: {color: '#ccc', position: 'insideTopRight'}}, {xAxis: '09:34'}],
                            ]
                        },
                        areaStyle: {},
                        data: [1233, 4444, 5225, 1166, 7111, 7117, 2254],
                    },
                    {
                        name: '交易用户数空头',
                        type: 'line',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        markArea: {
                            label: {
                                color: '#d92e20'
                            },
                            itemStyle: {
                                color: '#592749'
                            },
                            data: [
                                [{name: '异常区域', xAxis: '09:31'}, {xAxis: '09:33'}],
                                [{name: '观察窗口', xAxis: '09:30', itemStyle: {color: 'transparent', borderColor: '#ccc', borderWidth: 1, borderType: 'dashed'}, label: {color: '#ccc', position: 'insideTopRight'}}, {xAxis: '09:34'}],
                            ]
                        },
                        areaStyle: {},
                        data: [-1233, -4444, -5225, -1166, -7111, -7117, -2254],
                    },
                    {
                        name: '盈利盘',
                        data: [3221, 3112, 3156, 3887, 3044, 3000, 3082],
                        type: 'line',
                        xAxisIndex: 3,
                        yAxisIndex: 3,
                        markArea: {
                            label: {
                                color: '#d92e20'
                            },
                            itemStyle: {
                                color: '#592749'
                            },
                            data: [
                                [{name: '异常区域', xAxis: '09:31'}, {xAxis: '09:33'}],
                                [{name: '观察窗口', xAxis: '09:30', itemStyle: {color: 'transparent', borderColor: '#ccc', borderWidth: 1, borderType: 'dashed'}, label: {color: '#ccc', position: 'insideTopRight'}}, {xAxis: '09:34'}],
                            ]
                        }
                    }
                ]
            }
        };
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        },
        handleConfirmSelectTags(tags) {
            // confirm select tags
            let params = {
                expEventId: this.eventBasicInfo.expReportid,
                eventLabel: tags.map(v => { return v.tagName; }).join(',')
            };
            updateEventTags(params).then(resp => {
                this.$emit('updateEventBasicInfo');
            });
        },
        handleCancelSelectTags() {
            // cancel select tags
            this.$emit('updateEventBasicInfo');
        }
    },
    mounted() {
    }
};
</script>

<style lang="less" scoped>
    .event-analysis {
        .event-main-info {
            border: 1px dashed #ccc;
            border-radius: 5px;
            padding: 10px 20px;
        }
        .self-line {
            line-height: 35px;
        }
    }
</style>
