<template>
    <div class="tags-statistics">
        <el-row :gutter="10">
            <el-col :span="12" v-for="(item, index) in charts" :key="index" style="margin-bottom: 20px;">
                <s-card :title="item">
                    <echarts-common slot="content" :loading="loading" :ref="`tagsStatistics${index}`" :domId="`tagsStatisticsDom${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent(index)" @handleEchartDblClickEvent="handleEchartDblClickEvent(index)"></echarts-common>
                </s-card>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import SCard from '@/components/index/common/SCard';

export default {
    components: {
        EchartsCommon,
        SCard
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        propsChartHeight: {
            type: [Number, String],
            default: 360
        },
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    watch: {
        data: {
            handler(val) {
                // tradingday   userCnt  labelName
                // let date;
                // this.chartOptions['xAxis'][0]['data'] = date;
                // this.chartOptions['series'][0]['data'] = val[0];
                // this.chartOptions['series'][1]['data'] = val[1];
                // this.chartOptions['series'][2]['data'] = val[2];
                // this.chartOptions['series'][3]['data'] = val[3];
            },
            deep: true
        }
    },
    data() {
        return {
            charts: ['事件标签', '交易风格标签', '模型标签', '外部标签'],
            chartOptions: {
                tooltip: {
                    trigger: 'axis',
                    enterable: true,
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    },
                    extraCssText: 'max-height: 240px; overflow: auto;'
                },
                grid: {
                    top: '13%',
                    left: '3%',
                    right: '5%',
                    containLabel: true
                },
                legend: {
                    type: 'scroll',
                    data: ['标签1', '标签2', '标签3', '标签4']
                },
                xAxis: [
                    {
                        name: '日期',
                        type: 'category',
                        axisTick: {
                            alignWithLabel: true
                        },
                        data: ['2019-03-03', '2019-03-04', '2019-03-05', '2019-03-06', '2019-03-07', '2019-03-08', '2019-03-09'],
                    }
                ],
                yAxis: [
                    {
                        name: '用户数',
                        type: 'value',
                    }
                ],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        bottom: 0
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                    }
                ],
                series: [
                    {
                        name: '标签1',
                        type: 'bar',
                        stack: '总数',
                        barMaxWidth: 45,
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '标签2',
                        type: 'bar',
                        stack: '总数',
                        barMaxWidth: 45,
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '标签3',
                        type: 'bar',
                        stack: '总数',
                        barMaxWidth: 45,
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '标签4',
                        type: 'bar',
                        barMaxWidth: 45,
                        stack: '总数',
                        data: [620, 732, 701, 734, 1090, 1130, 1120]
                    },
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