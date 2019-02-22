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
                                :loading="loadingAR"
                                :columns="columnsList"
                                :tableData="tableData1"
                                @selection-change="handleSelectionChange1">
                            </s-table>
                        </el-collapse-item>
                        <el-collapse-item title="非OPEC" name="2">
                            <s-table
                                ref="selfTables1"
                                :height="150"
                                :loading="loadingAR"
                                :columns="columnsList"
                                :tableData="tableData1"
                                @selection-change="handleSelectionChange1">
                            </s-table>
                        </el-collapse-item>
                    </el-collapse>
                </div>
                <div :class="$style.environment_box">
                    <echarts-common
                        :loading="loading5"
                        ref="echartsDemo5"
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
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {columnsListAR5, tableData5} from './constants';
export default {
    name: 'analysisChart1',
    components: {SCard, STable, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            activeNames: ['1'],
            loadingAR: false,
            columnsList: columnsListAR5,
            tableData1: tableData5,
            timer: null,
            fullscreen: false,
            loading5: false,
            chartOptions5: {
                title: {
                    left: 'left',
                    text: '折线图堆叠',
                    x: '1%',
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
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
                    data: ['中性', '热度'],
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
                            '2019-01-01',
                            '2019-01-02',
                            '2019-01-03',
                            '2019-01-04',
                            '2019-01-05',
                            '2019-01-06'
                        ]
                    }
                ],
                yAxis: [
                    {
                        name: '正面',
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
                        name: '热度',
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
                        // yAxisIndex: 0,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dotted'
                                }
                            }
                        },
                        data: [
                            '1111',
                            '211',
                            '311',
                            '203',
                            '204',
                            '205',
                            '204',
                            '1207',
                            '204',
                            '209',
                            '210',
                            '211',
                            '214'
                        ]
                    },
                    {
                        name: '中性',
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
                        yAxisIndex: 1,
                        data: [
                            '200',
                            '201',
                            '202',
                            '203',
                            '204',
                            '205',
                            '206',
                            '207',
                            '208',
                            '209'
                        ]
                    }
                ]
            }
        };
    },
    computed: {},
    comments: {},
    mounted() {
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
        handleSelectionChange1() {},
        fullscreenChange() {},
        toggleFullScreen() {
            console.log(22);
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
