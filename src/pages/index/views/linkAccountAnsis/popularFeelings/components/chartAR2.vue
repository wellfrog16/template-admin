<template>
    <s-card :title="`美油分时图`" :icon="`fa fa-chart-line`">
        <el-button slot="right" type="text" @click="dialogClick">配置<i class="fa fa-undo-alt"></i></el-button>
        <el-dialog
            width="55%"
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
                            :value="times.idName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <dialog-a-r2 :visi="dialogVisible" @celclickEmit="celclickEmit" @checkboxEmit="checkboxEmit"></dialog-a-r2>
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
// import moment from 'moment';
import MiniIndex from './miniIndex';
import {echartsData2} from './constants';
// import {postPetroleumAR2} from '@/api/dataAnsis/popularFeelings';
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
                timeWindow: '', // 时间窗口
            },
            flagVal: '',
            radioTableColumn: {},
            checkboTableColumn: [],
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
                    x: 25, // 左
                    x2: 25, // 右
                    y: 60, // 上
                    // y2: 160 // 下
                    y2: 70 // 下
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
                            if (v.index === 7) { // 涨跌幅
                                textObj = v.text + ': ' + filterItem[v.name] + '(' + filterItem.percentageAmplitude + ')';
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
                            fontSize: 12 // 字体
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
                                color: '#6ab2ec'
                                // width: 0
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
                        min: 1.79,
                        max: 0,
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e']
                                // width: 0
                            }
                        },
                        axisLine: { // 设置y轴线的属性
                            lineStyle: {
                                color: '#6ab2ec'
                            },
                        },
                        axisTick: { // y轴刻度线
                            show: false,
                        },
                        axisLabel: {
                            formatter: '{value} %'
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
                                color: '#999',
                                borderColor: 'rgba(0, 0, 0, 0.5)',
                                borderWidth: '1',
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 3,
                                opacity: 0.9,
                                shadowOffsetX: 2,
                                shadowOffsetY: 3

                            },
                            data: [],
                        },
                    },
                    {
                        name: '均价',
                        data: [],
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#222'
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
                        name: '涨跌',
                        data: [],
                        type: 'line',
                        yAxisIndex: 2,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: 'red'
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
        this.barEchartsDete();
    },
    methods: {
        // 配置按钮
        dialogClick() {
            this.dialogVisible = true;
            this.radioTableColumn = {};
            this.checkboTableColumn = [];
        },
        // 单选
        celclickEmit(tableColumn, flagVal) {
            this.radioTableColumn = tableColumn;
            this.flagVal = flagVal;
        },
        // 多选
        checkboxEmit(tableColumn) {
            this.checkboTableColumn = tableColumn;
        },
        // 关闭弹框
        closeData(done) {
            done();
            this.dialogVisible = false;
            this.flagVal = '';
            this.radioTableColumn = {};
            this.checkboTableColumn = [];
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
            this.flagVal = '';
            this.radioTableColumn = {};
            this.checkboTableColumn = [];
        },
        // 确 定
        dialogConfirmClick() {
            // console.log(String(this.flagVal));
            if (this.flagVal !== '' && this.ruleForm.timeWindow !== '' && this.checkboTableColumn.length !== 0) {
                this.dialogVisible = false;
                // console.log(this.ruleForm.timeWindow); // 时间窗口
                // console.log(this.radioTableColumn); // 舆情
                // console.log(this.checkboTableColumn); // 他比证券
                this.barEchartsDete();
                this.$message.success('成功');
                this.flagVal = '';
                this.radioTableColumn = {};
                this.checkboTableColumn = [];
                this.ruleForm.timeWindow = '';
            } else {
                this.$message.error('请选择条件');
                this.dialogVisible = true;
            }
        },
        barEchartsDete() {
            // let params = {
            //     'timeOfDay': '2019-01-24'
            // };
            // this.loading2 = true;
            // setInterval(() => {
            //     postPetroleumAR2(params).then(resp => {
            //         this.loading2 = false;
            //     }).catch(e => {
            //         this.loading2 = false;
            //     });
            // }, 50000);
            if (echartsData2 && echartsData2.length !== 0) {
                // console.log(resp);
                this.loading2 = false;
                let {mainData} = echartsData2;
                // let {mainData} = resp;
                if (mainData && !mainData.length) {
                    return;
                }
                let exceptionDatas = echartsData2.exceptionData; // 异常数据
                let timeData = []; // 实时交易时间
                let priceData = []; // 实时交易价格
                let averagePriceData = []; // 实时交易均价
                let titleText = '';
                var now = new Date(); // 当前日期
                var dateWeek = now.getDay(); // 今天本周的第几天
                this.mainData = mainData;
                mainData.forEach(v => {
                    timeData.push(v.realTime); // 实时交易时间
                    priceData.push(v.realPrice); // 实时交易价格
                    averagePriceData.push(v.realAveragePrice * 0.010); // 实时交易均价
                    // 产品成交时间--星期几---实时交易时间---实时交易均价---实时交易成交数量----实时交易涨跌
                    titleText = v.crudeDealTime + '/' + dateWeek + '/' + v.realTime + ' 均 ' + v.realAveragePrice + ' 量 ' + v.realMakeBargain + ' 幅 ' + v.realUpsAndDowns + '%';
                });
                let markAreaData = [
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
                this.chartOptions2['title'][0]['text'] = titleText; // 标题
                this.chartOptions2['xAxis']['data'] = timeData; // 实时交易时间
                this.chartOptions2['series'][0]['data'] = priceData; // 实时交易价格
                this.chartOptions2['series'][2]['data'] = averagePriceData; // 实时交易均价
                this.chartOptions2['series'][0]['markArea']['data'] = markAreaData; // 异常
                this.$refs['echartsDemo2'] && this.$refs['echartsDemo2'].initChart();
            }
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
