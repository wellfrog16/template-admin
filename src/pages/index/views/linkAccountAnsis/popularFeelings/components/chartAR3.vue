<template>
    <s-card :title="`原油日K图`" :icon="`fa fa-handshake`">
        <el-button slot="right" type="text" @click="dialogClick">配置<i class="fa fa-undo-alt"></i></el-button>
        <el-dialog
            width="65%"
            slot="content"
            :before-close="closeData"
            title=""
            :visible.sync="dialogVisible"
            :class="$style.dia_name3">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                :class="$style.demo_rule_form">
                <el-form-item label="异常监测时间窗口" prop="timeWindow" label-width="160px">
                    <el-select
                        style="width: 80%;"
                        v-model="ruleForm.timeWindow"
                        class="custom-width"
                        size="small"
                        clearable
                        @change="nationyChenge"
                        placeholder="请选择异常监测时间窗口"
                    >
                        <el-option
                            v-for="times in dtaWindowOptions"
                            :key="times.idName"
                            :label="times.name"
                            :value="times.idName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <dialog-a-r3
                :visi="dialogVisible"
                :tableData3="tableData3"
                @checkboxEmit1="checkboxEmit1">
            </dialog-a-r3>
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
            :propsChartHeight="430">
        </echarts-common>
    </s-card>
</template>

<script>
import MiniIndex from './miniIndex';
import _ from 'lodash';
import {postPetroleumAR3} from '@/api/dataAnsis/popularFeelings';
// import {echartsData3} from './constants';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR3 from './dialogAR3';
export default {
    name: 'chartAR3',
    components: {SCard, EchartsCommon, DialogAR3},
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
                color: '#743A3A',
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
            // 5 volume        52826  成交量1
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
            // form 表单绑定值
            ruleForm: {
                timeWindow: '1 天', // 时间窗口
            },
            multipleSelection: [],
            tableData3: [],
            checkboTableColumn1: [],
            chartOptions3: {
                animation: false,
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
                    }
                ],
                grid: {
                    x: 30, // 左
                    x2: 40, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    // trigger: 'item',
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
                        // type: 'cross'
                        // type: 'line'
                    },
                    position(pos, params, el, elRect, size) {
                        var obj = {top: 10};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    },
                    formatter: param => {
                        let str = schema.map((v, i) => {
                            return v.text + ': ' + param[0].value[i === 0 ? 8 : i];
                        }).join('<br>');
                        return '原油日K :' + '<br>' + str;
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
                    name: '日期',
                    type: 'category',
                    data: [],
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            type: 'dashed',
                            color: '#1fc0ff',
                            width: 1,
                        },
                    },
                    scale: true,
                    boundaryGap: false,
                    // axisLine: {onZero: false},
                    splitLine: {show: false},
                    splitNumber: 20,
                    min: 'dataMin',
                    max: 'dataMax',
                },
                yAxis: {
                    name: '成交价',
                    scale: true,
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
                            fontSize: 9 // 字体
                        }
                    },
                    axisTick: { // y轴刻度线
                        show: true,
                    },
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
                        markArea: {
                            silent: false,
                            itemStyle: {
                                color: 'none',
                                borderColor: 'red', // 001943
                                borderWidth: '1',
                                // shadowColor: 'rgba(0, 0, 0, 0.5)',
                                // shadowBlur: 3,
                                opacity: 0.9
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 3

                            },
                            data: [],
                        }
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
        // 原油日K图--配置表
        this.tableData3List();
        this.tableData3List1();
        this.barEchartsDete();
    },
    methods: {
        // 配置按钮
        dialogClick() {
            this.dialogVisible = true;
            this.checkboTableColumn1 = [];
        },
        // 日K图--时间窗口
        nationyChenge(val) {
            this.multipleSelection = val;
        },
        // 多选
        checkboxEmit1(tableColumn) {
            this.checkboTableColumn1 = tableColumn;
        },
        // 关闭弹框
        closeData(done) {
            done();
            this.dialogVisible = false;
            this.checkboTableColumn1 = [];
            this.ruleForm.timeWindow = '1 天';
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
            this.checkboTableColumn1 = [];
            this.ruleForm.timeWindow = '1 天';
        },
        // 确 定
        dialogConfirmClick() {
            if (this.ruleForm.timeWindow !== '' && this.checkboTableColumn1.length !== 0) {
                this.dialogVisible = false;
                this.checkboTableColumn1.forEach(v => {
                    if (v.exceptionPeriod) {
                        let exceptionPeriod = {
                            exceptionPeriod: this.ruleForm.timeWindow
                        }
                        v.exceptionPeriod = {...exceptionPeriod};
                    }
                });
                let params = {
                    'daliySettingList': this.checkboTableColumn1
                };
                this.tableUpdateData(params);
                this.ruleForm.timeWindow = '1 天';
            } else {
                this.$message.error('请选择条件');
                this.dialogVisible = true;
            }
        },
        barEchartsDete() {
            // setInterval(v => {
            this.loading3 = true;
            // var now = new Date(); // 当前日期
            // var dateWeek = now.getDay(); // 今天本周的第几天
            let params = {
                'startDate': '2018-03-26',
                'endDate': '2019-01-10',
                'frequentness': '5'
            };
            let mainData = [];
            let exceptionDatas = [];
            let markAreaData = [];
            // 原油日K图
            postPetroleumAR3(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loading3 = false;
                    if (resp.exception.length !== 0) {
                        exceptionDatas = resp.exception; // 异常数据
                    }
                    if (resp.mainData.lenght !== 0) {
                        mainData = resp.mainData;
                    }
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
                    let titleText = '';
                    mainData.forEach(v => {
                        date.push(v.tradeDay);
                        seriesData.push(
                            // 开盘价 - 收盘价 -最低价-最高价 / 交易日 -成交量  // amplitude;//振幅
                            // chg;//涨跌
                            [v.openingPrice, v.closingPrice, v.lowestPrice, v.highestPrice, v.volume, v.amplitude, v.chg, v.tradeDay]
                        );
                        titleText = v.tradeDay + ' 开 ' + v.openingPrice + ' 高 ' + v.lowestPrice + ' 收 ' + v.openingPrice + ' 低 ' + v.highestPrice + ' 量 ' + v.volume + ' 幅 ' + v.amplitude + ' %';
                    });
                    if (exceptionDatas.length !== 0) {
                        markAreaData = [
                            // [
                            //     {
                            //         'name': '异常',
                            //         'xAxis': exceptionDatas[1].startTradeDay, // 异常日期
                            //         // 'yAxis': mainData[mainData.length - 1].openingPrice, // 异常价格
                            //     },
                            //     {
                            //         'xAxis': exceptionDatas[4].endTradeDay, // 前五分钟异常日期
                            //             // 'yAxis': exceptionDatas[4].volume, // 前五分钟异常价格
                            //     }
                            // ],
                            [
                                {
                                    'name': '异常',
                                    'xAxis': exceptionDatas[0].startTradeDay, // 异常日期
                                },
                                {
                                    'xAxis': exceptionDatas[0].endTradeDay, // 前五分钟异常日期
                                }
                            ],
                            [
                                {
                                    'name': '异常',
                                    'xAxis': exceptionDatas[1].startTradeDay, // 异常日期
                                },
                                {
                                    'xAxis': exceptionDatas[1].endTradeDay, // 前五分钟异常日期
                                }
                            ],
                            [
                                {
                                    'name': '异常',
                                    'xAxis': exceptionDatas[2].startTradeDay, // 异常日期
                                },
                                {
                                    'xAxis': exceptionDatas[3].endTradeDay, // 前五分钟异常日期
                                }
                            ],
                            [
                                {
                                    'name': '异常',
                                    'xAxis': exceptionDatas[6].startTradeDay, // 异常日期
                                },
                                {
                                    'xAxis': exceptionDatas[8].endTradeDay, // 前五分钟异常日期
                                }
                            ]
                        ];
                    }
                    this.chartOptions3['title'][0]['text'] = titleText; // 标题
                    this.chartOptions3['xAxis']['data'] = date; // 日期
                    this.chartOptions3['series'][0]['data'] = seriesData; // 成交价
                    this.chartOptions3['series'][0]['markArea']['data'] = markAreaData; // 异常
                    this.$refs['echartsDemo3'] && this.$refs['echartsDemo3'].initChart();
                }
            }).catch(e => {
                this.loading3 = false;
            });
            // }, 6000);
        }
    },
};
</script>

<style lang="less" module>
    .dia_name3 {
        .demo_rule_form {
            width: 65%;
        }
        :global(.el-dialog__header) {
            padding: 0;
        }
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
    .echarts_box {
        position: relative;
        .step_tag {
            position: absolute;
            bottom: 50px;
            left: -4px;
        }
    }
</style>
