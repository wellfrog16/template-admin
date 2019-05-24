<template>
    <div class="event-analysis">
        <div class="event-main-info">
            <el-row>
                <el-col :span="6" class="self-line">
                    品种：螺纹钢
                </el-col>
                <el-col :span="6" class="self-line">
                    识别标的：舆情
                </el-col>
                <el-col :span="6" class="self-line">
                    关键词：减产
                </el-col>
                <el-col :span="6" class="self-line">用户范围： 909</el-col>
                <el-col :span="24" class="self-line">
                    时间范围：2017-04-01 09:30:02 -- 2017-04-01 09:32:42
                </el-col>
                <el-col :span="24" class="self-line">事件描述：减产利多</el-col>
                <el-col :span="24" class="self-line">事件标签：<el-tag type="warning" size="small">舆情异常</el-tag></el-col>
            </el-row>
        </div>
        <div>
            <echarts-common :loading="loading" ref="eventAnalysisChart" domId="eventAnalysisChartDom" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
        </div>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    components: {EchartsCommon},
    data() {
        return {
            loading: false,
            propsChartHeight: 780,
            extraPrv: 1, // 前置30分钟
            extraNext: 1, // 后置40分钟
            chartOptions: {
                grid: [
                    {
                        left: 60,
                        right: 80,
                        height: 300,
                        top: 45,
                        containLabel: false
                    },
                    {
                        left: 60,
                        right: 80,
                        height: 40,
                        top: 380,
                        containLabel: false
                    },
                    {
                        left: 60,
                        right: 80,
                        height: 130,
                        top: 440,
                        containLabel: false
                    },
                    {
                        left: 60,
                        right: 80,
                        height: 110,
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
                        data: ['08:30', '09:31', '09:32', '09:33', '09:34', '09:35', '10:36']
                    },
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: ['08:30', '09:31', '09:32', '09:33', '09:34', '09:35', '10:36'],
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
                        data: ['08:30', '09:31', '09:32', '09:33', '09:34', '09:35', '10:36'],
                        scale: true,
                        boundaryGap: false,
                    },
                    {
                        type: 'category',
                        name: '时间',
                        gridIndex: 3,
                        data: ['08:30', '09:31', '09:32', '09:33', '09:34', '09:35', '10:36'],
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
        }
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
