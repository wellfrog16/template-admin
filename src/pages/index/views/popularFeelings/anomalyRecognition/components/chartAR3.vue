<template>
    <s-card :title="`国油实时图`" :icon="`fa fa-search`">
        <el-button slot="right" type="text" @click="dialogClick">布伦特原油</el-button>
        <el-dialog
            width="86%"
            slot="content"
            :before-close="closeData"
            title=""
            :visible.sync="dialogVisible"
            :class="$style.dia_name">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="时间窗口" prop="timeWindow">
                    <el-select
                        style="width: 100%;"
                        v-model="ruleForm.timeWindow"
                        class="custom-width"
                        size="small"
                        clearable
                        @change="nationyChenge"
                        placeholder="请选择时间窗口"
                    >
                        <el-option
                            v-for="times in timeWindowOptions"
                            :key="times.idName"
                            :label="times.name"
                            :value="times.idName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="12">
                    <dialog-a-r5></dialog-a-r5>
                </el-col>
                <el-col :span="12">
                    <dialog-a-r6></dialog-a-r6>
                </el-col>
            </el-row>
            <div slot="footer" :class="$style.dialog_footer">
                <el-button @click="dialogCancelClick">取 消</el-button>
                <el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
            </div>
        </el-dialog>
        <echarts-common
            slot="content"
            :loading="loading3"
            ref="echartsDemo3"
            domId="echartsId3"
            :defaultOption="chartOptions3"
            :propsChartHeight="420">
        </echarts-common>
    </s-card>
</template>

<script>
import MiniIndex from './miniIndex';
import {postKLineChart} from '@/api/popularFeelings/anomalyRecognition';
// import {echartsData3} from './constants';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR5 from './dialogAR1';
import DialogAR6 from './dialogAR2';
export default {
    name: 'chartAR3',
    components: {SCard, EchartsCommon, DialogAR5, DialogAR6},
    props: {
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    mixins: [MiniIndex],
    data() {
        let chart3SymbolSize = data => {
            return data[3] ? 8 : 0;
        };
        let upColor = '#ec0000';
        let upBorderColor = '#8A0000';
        let downColor = '#00da3c';
        let downBorderColor = '#008F28';
        let itemStyleArray = [{
            normal: {
                color: '#095209',
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }, {
            normal: {
                color: '#7d0d14',
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }];
        let schema = [
            // 0 highestPrice   2018-04-03  日期
            // 1 111111111                      188
            // 1-openingPrice   414.3  收盘价
            // 2 closingPrice  402.5   开盘价
            // 3 lowestPrice   400.5   最高价
            // 4 highestPrice  414.3   最低价
            // 5 volume        52826  成交量
            // 6 amplitude     13.8   振幅
            // 7 chg           -14.1  涨跌
            {name: 'tradeDay', index: 0, text: '交易日'},
            {name: 'openingPrice', index: 1, text: '开盘价'},
            {name: 'closingPrice', index: 2, text: '收盘价'},
            {name: 'lowestPrice', index: 3, text: '最低价'},
            {name: 'highestPrice', index: 4, text: '最高价'},
            {name: 'volume', index: 5, text: '成交量'},
            {name: 'amplitude', index: 6, text: '振 幅'},
            {name: 'chg', index: 7, text: '涨跌'}
        ];
        return {
            loading3: false,
            dialogVisible: false,
            init: true,
            selectMax: {},
            chartOptions3: {
                animation: false,
                // color: ['transparent', '#8A0000'],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    // trigger: 'item',
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'scroll' // 默认为直线，可选为：'line' | 'shadow'
                        // type: 'cross'
                        // type: 'line'
                    },
                    position(pos, params, el, elRect, size) {
                        var obj = {top: 10};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    },
                    formatter: param => {
                        return schema.map((v, i) => {
                            // param[0].value.forEach((j, f) => {
                            //     console.log(j, f);
                            // });
                            console.log(param[0].value);
                            return v.text + ': ' + param[0].value[i === 0 ? 8 : i];
                        }).join('<br>');
                    }
                },
                axisPointer: {
                    link: {xAxisIndex: 'all'},
                    label: {
                        backgroundColor: '#222',
                        borderColor: '#777'
                    }
                },
                legend: {
                    // data: ['日K', '卖出', '买入']
                    data: []
                },
                xAxis: {
                    name: '',
                    type: 'category',
                    data: [],
                    scale: true,
                    boundaryGap: false,
                    axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax',
                },
                yAxis: {
                    name: '成交价',
                    scale: true,
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['transparent', 'rgba(4, 58, 127, 0.92)']
                        }
                    }
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
                series: [
                    {
                        name: '日K',
                        type: 'candlestick',
                        barMaxWidth: 50,
                        data: [],
                        itemStyle: {
                            normal: {
                                color: upColor,
                                color0: downColor,
                                borderColor: upBorderColor,
                                borderColor0: downBorderColor
                            }
                        },
                        markPoint: {
                            data: [],
                            tooltip: {
                                backgroundColor: '#222',
                                borderColor: '#777',
                                borderWidth: 1,
                                formatter: param => {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        markLine: {},
                    },
                    {
                        name: '卖出',
                        type: 'scatter',
                        symbol: 'triangle',
                        symbolSize: chart3SymbolSize,
                        symbolRotate: 180,
                        itemStyle: itemStyleArray[0],
                        data: [],
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    },
                    {
                        name: '买入',
                        type: 'scatter',
                        symbol: 'triangle',
                        symbolSize: chart3SymbolSize,
                        itemStyle: itemStyleArray[1],
                        data: [],
                        smooth: true,
                        lineStyle: {
                            normal: {opacity: 0.5}
                        }
                    }
                ]

            }
        };
    },
    computed: {},
    mounted() {
        this.barEchartsDete();
    },
    methods: {
        closeData(done) {
            done();
            this.dialogVisible = false;
        },
        dialogCancelClick() {
            // this.dialogVisible = !this.dialogVisible;
            // console.log('取 消');
            // this.$emit('eventClick', this.dialogVisible);
        },
        dialogConfirmClick() {
            this.dialogVisible = false;
            console.log(this.dialogVisible);
            // console.log('确 定');
            // this.$emit('eventClick', this.dialogVisible);
        },
        dialogClick() {
            this.dialogVisible = true;
        },
        barEchartsDete() {
            this.loading3 = true;
            let params = {
                'startDate': '2018-03-26',
                'endDate': '2019-01-10'
            };
            //  舆情-K线图
            postKLineChart(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loading3 = false;
                    // let {mainData} = echartsData3;
                    let {mainData} = resp;
                    if (mainData && !mainData.length) {
                        return;
                    }
                    mainData = _.sortBy(mainData, [axis => {
                        return axis.tradeDay;
                    }]);
                    let dataZoomStartValue = mainData[mainData.length > 20 ? mainData.length - 20 : 0]['tradeDay'];
                    let dataZoomEndValue = mainData[mainData.length - 1]['tradeDay'];
                    this.chartOptions3['dataZoom'][0]['startValue'] = dataZoomStartValue;
                    this.chartOptions3['dataZoom'][1]['startValue'] = dataZoomStartValue;
                    this.chartOptions3['dataZoom'][0]['endValue'] = dataZoomEndValue;
                    this.chartOptions3['dataZoom'][1]['endValue'] = dataZoomEndValue;
                    let seriesData = [];
                    let date = [];
                    mainData.forEach(v => {
                        date.push(v.tradeDay);
                        seriesData.push(
                            // 开盘价 - 收盘价 -最低价-最高价 / 交易日 -成交量  // amplitude;//振幅
                            // chg;//涨跌
                            [v.openingPrice, v.closingPrice, v.lowestPrice, v.highestPrice, v.volume, v.amplitude, v.chg, v.tradeDay]
                        );
                    });
                    this.chartOptions3['series'][0]['data'] = seriesData;
                    this.chartOptions3['xAxis']['data'] = date;
                    this.$refs['echartsDemo3'] && this.$refs['echartsDemo3'].initChart();
                }
            }).catch(e => {
                this.loading3 = false;
            });
        }
    },
};
</script>

<style lang="less" module>
    .dia_name {
        :global(.el-dialog__body) {
            padding: 10px 20px;
        }
        :global(.el-dialog__footer) {
            background: #0e274f;
            color: #fff;
            padding: 0 20px 20px;
            text-align: center;
        }
    }
</style>
