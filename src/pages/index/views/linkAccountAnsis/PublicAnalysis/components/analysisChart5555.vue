<template>
    <div :class="$style.analys4">
        <s-card :title="`国际环境`" :icon="`fa fa-chart-line`">
            <div slot="content">
                <el-collapse v-model="activeNames" @change="handleChange">
                    <el-collapse-item title="OPEC" name="1">
                        <s-table
                            ref="selfTables1"
                            :height="200"
                            :loading="loadingAR"
                            :columns="columnsList"
                            :tableData="tableData1"
                            @selection-change="handleSelectionChange1">
                        </s-table>
                    </el-collapse-item>
                    <el-collapse-item title="非OPEC" name="2">
                        <s-table
                            ref="selfTables1"
                            :height="200"
                            :loading="loadingAR"
                            :columns="columnsList"
                            :tableData="tableData1"
                            @selection-change="handleSelectionChange1">
                        </s-table>
                    </el-collapse-item>
                </el-collapse>
                <echarts-common
                    :loading="loading5"
                    ref="echartsDemo5"
                    domId="echartsId5"
                    :noClearFlag="false"
                    :defaultOption="chartOptions5"
                    :propsChartHeight="390">
                </echarts-common>
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
                legend: {
                    top: '5%',
                    data: ['INE原油库存', 'EIA原油库存'],
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
                        type: 'inside'
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%'
                    }
                ],
                xAxis: {
                    name: '',
                    type: 'category',
                    data: [
                        '2019-01-01',
                        '2019-01-02',
                        '2019-01-03',
                        '2019-01-04',
                        '2019-01-05',

                    ],
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            type: 'dashed',
                            color: '#fff',
                            width: 1,
                        },
                    },
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name: 'INE原油库存',
                        type: 'line',
                        stack: '总量',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    width: 2,
                                    type: 'dotted'
                                }
                            }
                        },
                        data: [
                            120, 132, 101, 134, 90, 230, 210,
                            220, 182, 191, 234, 290, 330, 310,
                            220, 182, 191, 234, 290, 330, 310,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
                        ]
                    },
                    {
                        name: 'EIA原油库存',
                        type: 'line',
                        stack: '总量',
                        data: [
                            120, 132, 101, 134, 90, 230, 210,
                            220, 182, 191, 234, 290, 330, 310,
                            220, 182, 191, 234, 290, 330, 310,
                            120, 132, 101, 134, 90, 230, 210,
                            120, 132, 101, 134, 90, 230, 210,
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
    .analys2 {
        width: 100%;
    }
</style>
