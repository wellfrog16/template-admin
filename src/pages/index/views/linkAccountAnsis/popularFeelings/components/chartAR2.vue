<template>
    <s-card :title="`美油分时图`" :icon="`fa fa-chart-line`">
        <el-button slot="right" type="text" @click="dialogClick">配置<i class="fa fa-undo-alt"></i></el-button>
        <el-dialog
            width="65%"
            slot="content"
            :before-close="closeData"
            title=""
            :visible.sync="dialogVisible"
            :class="$style.dia_name2">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                :class="$style.demo_rule_form">
                <el-form-item label="请选择时间窗口" prop="timeWindow" label-width="160px">
                    <el-select
                        style="width: 80%;"
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
                            :value="times.name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <dialog-a-r2
                :visi="dialogVisible"
                :tableData2="tableData2"
                @celclickEmit="celclickEmit"></dialog-a-r2>
            <div slot="footer" :class="$style.dialog_footer">
                <el-button @click="dialogCancelClick">取 消</el-button>
                <el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
            </div>
        </el-dialog>
        <echarts-common
            slot="content"
            :loading="loading2"
            ref="echartsDemo2"
            domId="echartsId2"
            :defaultOption="chartOptions2"
            :propsChartHeight="430">
        </echarts-common>
    </s-card>
</template>

<script>
import moment from 'moment';
import MiniIndex from './miniIndex';
import {echartsData2} from './constants';
import {postPetroleumAR2} from '@/api/dataAnsis/popularFeelings';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR2 from './dialogAR2';
export default {
    name: 'chartAR2',
    components: {SCard, EchartsCommon, DialogAR2},
    props: {
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    mixins: [MiniIndex],
    data() {
        let schema = [
            /**
             * 原油代码 crudeCode                 crudeCode: "t1nf_SC0"
             * 产品成交时间  crudeDealTime         crudeDealTime: "2019-01-15"
             * 产品名称  crudeName                crudeName: "原油"
             * ..........................         quantity: 415  ?
             * 实时交易均价  realAveragePrice      realAveragePrice: 413.6
             * 实时交易成交  realMakeBargain       realMakeBargain: 50026
             * 实时交易价格  realPrice             realPrice: 413.6
             * 实时交易时间 realTime               realTime: "2019-01-15 08:59:00.0"
             * 实时交易涨跌  realUpsAndDowns       realUpsAndDowns: 1398
             */
            {name: 'crudeCode', index: 0, text: '原油代码'},
            {name: 'crudeDealTime', index: 1, text: '产品成交时间'},
            {name: 'crudeName', index: 2, text: '产品名称'},
            {name: 'realAveragePrice', index: 3, text: '实时交易均价'},
            {name: 'realMakeBargain', index: 4, text: '实时交易成交'},
            {name: 'realPrice', index: 5, text: '实时交易价格'},
            {name: 'realTime', index: 6, text: '实时交易时间'},
            {name: 'realUpsAndDowns', index: 7, text: '实时交易涨跌'},
        ];
        return {
            loading2: false,
            dialogVisible: false,
            // form 表单绑定值
            ruleForm: {
                timeWindow: '5 分钟', // 时间窗口
            },
            multipleSelection: [],
            flagVal: '',
            radioTableColumn: {},
            // checkboTableColumn: [],
            tableData2: [],
            chartOptions2: {
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
                            fontSize: 12
                        }
                    }
                ],
                grid: {
                    x: 20, // 左
                    x2: 0, // 右
                    y: 60, // 上
                    // y2: 160 // 下
                    y2: 60, // 下
                },
                calculable: true,
                tooltip: {
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#fff',
                            backgroundColor: '#222'
                        }
                    },
                    position(pos, params, el, elRect, size) {
                        var obj = {top: 10};
                        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        return obj;
                    },
                    formatter: param => {
                        let filterItem = this.mainData.filter(v => {
                            return v.realTime === param[0]['name'];
                        })[0];
                        return schema.map((v, i) => {
                            let textObj = {};
                            textObj = v.text + ': ' + filterItem[v.name];
                            if (v.text === '实时交易涨跌') {
                                textObj = v.text + ': ' + filterItem[v.name] + '(' + filterItem.percentageAmplitude + ')';
                            } else {
                                textObj = v.text + ': ' + filterItem[v.name];
                            }
                            return textObj;
                        }).join('<br>');
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    // 调整x轴的lable
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    data: [],
                    axisTick: { // y轴刻度线
                        show: false
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            type: 'dashed',
                            color: '#fff',
                            width: 1
                        }
                    }
                },
                yAxis: [
                    {
                        name: '价格',
                        type: 'value',
                        position: 'left',
                        min: value => {
                            return value.min;
                        },
                        max: value => {
                            return value.max;
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
                        name: '涨跌',
                        type: 'value',
                        position: 'right',
                        min: value => {
                            return value.min;
                        },
                        max: value => {
                            return value.max;
                        },
                        offset: 15,
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e'],
                                width: 0
                            }
                        },
                        axisLine: { // 设置y轴线的属性
                            lineStyle: {
                                color: '#6ab2ec',
                                fontSize: 10 // 字体
                            },
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                        axisLabel: {
                            formatter: '{value}%'
                        },
                    },
                    {
                        name: '均价',
                        show: false,
                        offset: 0,
                        type: 'value',
                        position: 'right',
                        min: value => {
                            return value.min;
                        },
                        max: value => {
                            return value.max;
                        },
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#fff']
                                // width: 0
                            }
                        },
                        axisLine: { // 设置y轴线的属性
                            lineStyle: {
                                color: 'red',
                            },
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
                        name: '价格',
                        data: [],
                        yAxisIndex: 0,
                        type: 'line',
                        symbolSize: 5,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#f8f400'
                                }
                            }
                        },
                        markArea: {
                            silent: false,
                            itemStyle: {
                                color: 'none',
                                borderColor: '#ff0000', // 001943
                                borderWidth: '1',
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 3,
                                opacity: 0.9
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 3

                            },
                            data: [],
                        },
                    },
                    {
                        name: '涨跌',
                        data: [],
                        type: 'line',
                        yAxisIndex: 2,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: 'none'
                                }
                            }
                        },
                        symbol: 'circle',
                        // // 设置折点大小
                        symbolSize: 0,
                        // // 设置为光滑曲线
                        smooth: true
                    },
                    {
                        name: '均价',
                        data: [],
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#e8e4d2'
                                }
                            }
                        },
                        symbol: 'circle',
                        // // 设置折点大小
                        symbolSize: 0,
                        // // 设置为光滑曲线
                        smooth: true
                    }
                ]
            }
        };
    },
    computed: {},
    mounted() {
        // 原油日K图--配置表
        this.tableData1List();
        this.barEchartsDete();
    },
    methods: {
        // 配置按钮
        dialogClick() {
            this.dialogVisible = true;
            this.radioTableColumn = {};
            // this.checkboTableColumn = [];
        },
        // 日K图--时间窗口
        nationyChenge(val) {
            this.multipleSelection = val;
        },
        // 单选
        celclickEmit(tableColumn, flagVal) {
            this.radioTableColumn = tableColumn;
            this.flagVal = flagVal;
        },
        // 多选
        // checkboxEmit(tableColumn) {
        //     this.checkboTableColumn = tableColumn;
        // },
        // 关闭弹框
        closeData(done) {
            done();
            this.dialogVisible = false;
            this.flagVal = '';
            this.radioTableColumn = {};
            this.ruleForm.timeWindow = '5 分钟';
            // this.checkboTableColumn = [];
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
            this.flagVal = '';
            this.radioTableColumn = {};
            this.ruleForm.timeWindow = '5 分钟';
            // this.checkboTableColumn = [];
        },
        // 确 定
        dialogConfirmClick() {
            if (this.flagVal !== '' && this.ruleForm.timeWindow !== '' && this.radioTableColumn.length !== 0) {
                this.dialogVisible = false;
                let radioTable = [];
                if (this.radioTableColumn.frequentness) {
                    this.radioTableColumn.frequentness = this.ruleForm.timeWindow;
                }
                radioTable.push(this.radioTableColumn);
                this.flagVal = '';
                let params = {...radioTable};
                this.tableUpdateData(params);
                this.ruleForm.timeWindow = '5 分钟';
            } else {
                this.$message.error('请选择条件');
                this.dialogVisible = true;
            }
        },
        barEchartsDete() {
            setInterval(v => {
                let now = new Date();
                let dateWeek = now.getDay(); // 今天本周的第几天
                let params = {
                    // 'timeOfDay': now.getFullYear() + '-' + now.getMonth() + 1 + '-' + now.getDate()
                    'timeOfDay': '2019-01-28'
                };
                this.loading2 = true;
                let mainData = [];
                let exceptionDatas = [];
                let markAreaData = [];
                postPetroleumAR2(params).then(resp => {
                    // let {mainData, exceptionData} = resp;
                    // console.log(mainData, exceptionData);
                    if (resp && resp.length !== 0) {
                        this.loading2 = false;
                        if (resp.exceptionData.length !== 0) {
                            exceptionDatas = resp.exceptionData; // 异常数据
                        }
                        mainData = resp.mainData;
                        if (mainData && !mainData.length) {
                            return;
                        }
                        let timeData = []; // 实时交易时间
                        let priceData = []; // 实时交易价格
                        let averagePriceData = []; // 实时交易均价
                        let realUpsAndData = []; // 实时交易涨跌
                        let titleText = '';
                        this.mainData = mainData;
                        mainData.forEach(v => {
                            timeData.push(v.realTime); // 实时交易时间
                            priceData.push(v.realPrice); // 实时交易价格
                            averagePriceData.push(v.realAveragePrice * 0.010); // 实时交易均价
                            realUpsAndData.push(v.realUpsAndDowns); // 实时交易涨跌
                            // 产品成交时间--星期几---实时交易时间---实时交易均价---实时交易成交数量----实时交易涨跌
                            titleText = v.crudeDealTime + '/' + dateWeek + '/' + v.realTime + ' 均 ' + v.realAveragePrice + ' 量 ' + v.realMakeBargain + ' 幅 ' + v.realUpsAndDowns + '%';
                        });
                        if (exceptionDatas.length !== 0) {
                            markAreaData = [
                                [
                                    {
                                        'name': '异常数据',
                                        'xAxis': mainData[mainData.length - 1].realTime, // 异常时间
                                        'yAxis': mainData[mainData.length - 1].realPrice, // 异常价格
                                    },
                                    {
                                        'xAxis': exceptionDatas[0].realTime, // 前五分钟异常时间
                                        'yAxis': exceptionDatas[0].realPrice, // 前五分钟异常价格
                                    }
                                ],
                                [
                                    {
                                        'xAxis': mainData[mainData.length - 1].realTime, // 异常时间
                                    },
                                    {
                                        'xAxis': exceptionDatas[0].realTime, // 前五分钟异常时间
                                    }
                                ]
                            ];
                        }
                        this.chartOptions2['title'][0]['text'] = titleText; // 标题
                        this.chartOptions2['xAxis']['data'] = timeData; // 实时交易时间
                        this.chartOptions2['series'][0]['data'] = priceData; // 实时交易价格
                        this.chartOptions2['series'][1]['data'] = realUpsAndData; // 实时交易涨跌
                        this.chartOptions2['series'][2]['data'] = averagePriceData; // 实时交易均价
                        this.chartOptions2['series'][0]['markArea']['data'] = markAreaData; // 异常
                        this.$refs['echartsDemo2'] && this.$refs['echartsDemo2'].initChart();
                    }
                }).catch(e => {
                    this.loading2 = false;
                });
            }, 1000000);
        }
    },
};
</script>

<style lang="less" module>
    .dia_name2 {
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
</style>
