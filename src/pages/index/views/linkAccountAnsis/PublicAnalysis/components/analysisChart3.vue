<template>
    <div :class="$style.analys3">
        <s-card :title="`EIA原油库存`" :icon="`fa fa-chart-line`">
            <div slot="right">
                <el-button type="text" @click="toggleDetail">
                    <span v-if="detail">
                        明细<i class="el-icon-plus" style="margign-left: 5px;"></i>
                    </span>
                    <span v-else>
                        图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i>
                    </span>
                </el-button>
            </div>
            <div slot="right" :class="$style.box">
                <div :class="$style.top">
                    <el-tooltip class="item" effect="dark" placement="right-end">
                        <div slot="content">
                            说明：<br/>
                            EIA原油库存由美国能源信息署统计公布（该数据不包括战略石油储备），<br/>
                            该数据每周公布一次【周三22：30（冬令时23：30）公布】，此数据主要显示了<br/>
                            美国当周原油库存数量，对于沥青及原油提炼品（燃油、柴油等）有较大影响。<br/>
                            预测值和前值即为EIA发布的预测值和之前的剩余量。
                        </div>
                        <el-button type="text">?</el-button>
                    </el-tooltip>
                </div>
            </div>
            <echarts-common
                v-if="details"
                slot="content"
                :loading="loading3"
                ref="echartsDemos3"
                domId="echartsId3"
                :noClearFlag="false"
                :defaultOption="chartOptions3"
                :propsChartHeight="390">
            </echarts-common>
            <s-table
                v-else
                slot="content"
                :height="230"
                :loading="loadingAR"
                :columns="columnsList"
                :tableData="tableData1"
            >
            </s-table>
        </s-card>
    </div>
</template>

<script>
import moment from 'moment';
// 原油库存3 // 原油库存明细3
import {postCrudeTable} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR3} from './constants';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'analysisChart1',
    components: {SCard, STable, EchartsCommon},
    props: {},
    minis: [],
    data() {
        return {
            loadingAR: false,
            checkboxTableColumn1: [],
            columnsList: columnsListAR3,
            tableData1: [],
            timer: null,
            fullscreen: false,
            detail: true,
            details: true,
            loading3: false,
            dialogVisible: false,
            chartOptions3: {
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
                    // trigger: 'item',
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
                    },
                    // formatter: '{a0} ：{c0}' + '<br/>' + '{a1} ：{c1}'
                },
                legend: {
                    top: '5%',
                    data: ['公布值', '预测值', '前值'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                calculable: true,
                grid: {
                    x: 30, // 左
                    x2: 0, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
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
                    data: []
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} 万桶'
                    },
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
                            fontSize: 10 // 字体
                        }
                    },
                    axisTick: { // y轴刻度线
                        show: true,
                    },
                },
                series: [
                    {
                        name: '公布值',
                        type: 'line',
                        stack: '总量',
                        // yAxisIndex: 0,
                        barGap: '10%',
                        data: [],
                    },
                    {
                        name: '预测值',
                        type: 'line',
                        stack: '总量',
                        data: []
                    },
                    {
                        name: '前值',
                        type: 'line',
                        stack: '总量',
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
        // 明细和图标切换
        toggleDetail() {
            if (this.detail && this.details) {
                this.detail = !this.detail;
                this.details = !this.details;
            } else {
                this.detail = !this.detail;
                this.details = !this.details;
            }
        },
        lienEchartsDete() {
            var now = new Date(); // 当前日期
            let timeDay1 = moment(now).format('YYYY-MM-DD');
            let params = {
                'timeOfDay': timeDay1 // '2019-02-18'
            };
            this.loadingAR = true;
            this.tableData1 = [];
            this.loading3 = true;
            let mainData = [];
            let timeDate = []; // 公布日期
            let elaData = []; // 公布值
            let apiData = []; // 预测值
            let ineData = []; // 前值
            postCrudeTable(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loading3 = false;
                    this.loadingAR = false;
                    this.tableData1 = resp.ela;
                    mainData = resp.ela;
                    let titleText = '';
                    mainData.forEach(v => {
                        let ttDate = v.time.match(/\d{4}.\d{1,2}.\d{1,2}/mg).toString();
                        let times = ttDate.replace(/[^0-9]/mg, '-')
                        timeDate.push(times); // 公布日期
                        elaData.push(v.publish); // 公布值
                        apiData.push(v.forecast); // 预测值
                        ineData.push(v.befores); // 前值
                        titleText = times + ' 公布值' + v.publish + ' 预测值' + v.forecast + ' 前值' + v.befores;
                    });
                    this.chartOptions3['title'][0]['text'] = titleText; // 标题
                    this.chartOptions3['xAxis']['data'] = timeDate;
                    this.chartOptions3['series'][0]['data'] = elaData;
                    this.chartOptions3['series'][1]['data'] = apiData;
                    this.chartOptions3['series'][2]['data'] = ineData;
                    this.$refs['echartsDemos3'] && this.$refs['echartsDemos3'].initChart();
                }
            }).catch(e => {
                this.loading3 = false;
                this.loadingAR = false;
            });
        }
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys3 {
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
