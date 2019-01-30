<template>
    <s-card :title="`原油分时图`" :icon="`fa fa-chart-line`">
        <el-button slot="right" type="text" @click="dialogClick">配置<i class="fa fa-undo-alt"></i></el-button>
        <div slot="content" :class="$style.echarts_box">
            <el-dialog
                width="75%"
                slot="content"
                :before-close="closeData"
                title=""
                :visible.sync="dialogVisible"
                :class="$style.dia_name1">
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
                <dialog-a-r1
                    :visi="dialogVisible"
                    :tableData1="tableData1"
                    @checkboxEmit1="checkboxEmit1">
                </dialog-a-r1>
                <div slot="footer" :class="$style.dialog_footer">
                    <el-button @click="dialogCancelClick">取 消</el-button>
                    <el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
                </div>
            </el-dialog>
            <echarts-common
                slot="content"
                :loading="loading1"
                ref="echartsDemo1"
                domId="echartsId1"
                :noClearFlag="false"
                :defaultOption="chartOptions1"
                :propsChartHeight="430">
            </echarts-common>
            <!--<div slot="content" :class="$style.step_tag">-->
            <!--<el-steps :active="1" align-center finish-status="success">-->
            <!--<el-stap v-for="stepss in stepsOptions" :title="stepss.title" :description="stepss.name"></el-stap>-->
            <!--&lt;!&ndash;<el-step title="步骤 1" description="这是一段很长很长很长的描述性文字"></el-step>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-step title="步骤 2" description="这是一段很长很长很长的描述性文字"></el-step>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-step title="步骤 3" description="这段就没那么长了"></el-step>&ndash;&gt;-->
            <!--</el-steps>-->
            <!--</div>-->
        </div>
    </s-card>
</template>

<script>
// import moment from 'moment';
import MiniIndex from './miniIndex';
import {echartsData1} from './constants';
import {postPetroleumAR1} from '@/api/dataAnsis/popularFeelings';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR1 from './dialogAR1';
export default {
    name: 'chartAR2',
    components: {SCard, EchartsCommon, DialogAR1},
    props: {},
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
             * 实时交易时间 realTime               realTime: "08:59"
             * 实时交易涨跌  realUpsAndDowns       realUpsAndDowns: 1398 +  percentageAmplitude: "-0.79%"  ?
             * crudeCode: "YY_SCO"
             crudeDealTime: "2019-01-24"
             crudeName: "原油"
             percentageAmplitude: "-0.79%"  ?
             quantity: null
             realAveragePrice: "427.300"
             realMakeBargain: "436"
             realPrice: "425.000"
             realTime: "10:13"
             realUpsAndDowns: "-3.4000"
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
            loading1: false,
            dialogVisible: false,
            // form 表单绑定值
            ruleForm: {
                timeWindow: '五分钟', // 时间窗口
            },
            multipleSelection: [],
            tableData1: [],
            checkboTableColumn1: [],
            // checkboTableColumn2: [],
            chartOptions1: {
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
                            // padding: 45,
                            // margin: 40,
                            // left: 'center', // left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
                            // top: 'center', // left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
                            // right: 'center', // right 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
                            // bottom: 'center', // bottom 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比
                        }
                    },
                    // {
                    //     text: '5月8日，特朗普\n宣布美国正式退 \n出伊朗核协议',
                    //     borderColor: '#fff',
                    //     borderWidth: 1,
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 12
                    //     },
                    //     left: 'left',
                    //     top: '70%'
                    // },
                    // {
                    //     text: '10月16日，中东独立 \n媒体(中东跟)报道 \n披露了沙特记者哈苏 \n吉事件被杀的内幕',
                    //     borderColor: '#fff',
                    //     borderWidth: 1,
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 12
                    //     },
                    //     left: '22%',
                    //     top: '70%'
                    // },
                    // {
                    //     text: '10月8日，特朗普\n宣布美国正式退 \n出伊朗核协议',
                    //     borderColor: '#fff',
                    //     borderWidth: 1,
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 12
                    //     },
                    //     left: '50%',
                    //     top: '70%'
                    // },
                    // {
                    //     text: '9月8日，特朗普\n宣布美国正式退 \n出伊朗核协议',
                    //     borderColor: '#fff',
                    //     borderWidth: 1,
                    //     textStyle: {
                    //         color: '#fff',
                    //         fontSize: 12
                    //     },
                    //     left: '74%',
                    //     top: '70%'
                    // }
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
                        let filterItem = this.mainData.filter((v, index) => {
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
                    // 调整x轴的lable
                    // name: '时间',
                    boundaryGap: true,
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    data: [],
                    axisTick: { // y轴刻度线
                        show: false,
                    },
                    axisLine: { // y轴
                        lineStyle: {
                            type: 'dashed',
                            color: '#fff',
                            width: 1,
                        },
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
                                width: 1,
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
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e'],
                                // width: 0
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
                        bottom: 0
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
                                barBorderRadius: 30,
                                lineStyle: {
                                    color: '#f8f400'
                                }
                            }
                        },
                        // itemStyle: {
                        //     normal: {
                        //         color: 'red',
                        //         lineStyle: {
                        //             color: '#f8f400'
                        //         }
                        //     }
                        // },
                        markArea: {
                            silent: false,
                            itemStyle: {
                                color: 'none',
                                borderColor: 'red', // 001943
                                borderWidth: '1',
                                shadowColor: 'rgba(0, 0, 0, 0.5)',
                                shadowBlur: 3,
                                opacity: 0.9
                                // shadowOffsetX: 2,
                                // shadowOffsetY: 3

                            },
                            data: [],
                        }
                    },
                    {
                        name: '涨跌',
                        data: [],
                        type: 'line',
                        yAxisIndex: 1,
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
                        yAxisIndex: 2,
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
        this.tableData3List();
        this.barEchartsDete();
    },
    methods: {
        // 配置按钮
        dialogClick() {
            this.dialogVisible = true;
            this.checkboTableColumn1 = [];
            // this.checkboTableColumn2 = [];
        },
        // 日K图--时间窗口
        nationyChenge(val) {
            this.multipleSelection = val;
        },
        // 多选
        checkboxEmit1(tableColumn) {
            this.checkboTableColumn1 = tableColumn;
        },
        // // 多选
        // checkboxEmit2(tableColumn) {
        //     this.checkboTableColumn2 = tableColumn;
        // },
        // 关闭弹框
        closeData(done) {
            done();
            this.dialogVisible = false;
            this.checkboTableColumn1 = [];
            // this.checkboTableColumn2 = [];
            this.ruleForm.timeWindow = '5 分钟';
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
            this.checkboTableColumn1 = [];
            // this.checkboTableColumn2 = [];
            this.ruleForm.timeWindow = '5 分钟';
        },
        // 确 定
        dialogConfirmClick() {
            if (this.ruleForm.timeWindow !== '' && this.checkboTableColumn1.length !== 0) {
                this.dialogVisible = false;
                let radioTable = [];
                this.checkboTableColumn1.forEach(v => {
                    if (v.frequentness) {
                        v.frequentness = this.ruleForm.timeWindow;
                    }
                });
                radioTable = this.checkboTableColumn1;
                let params = {...radioTable};
                this.tableUpdateData1(params);
                this.checkboTableColumn1 = [];
                this.ruleForm.timeWindow = '5 分钟';
            } else {
                this.$message.error('请选择条件');
                this.dialogVisible = true;
            }
        },
        // setInterval() {},
        // setTimeout(() => {
        // }, 5000);
        // setInterval(() {
        //
        // });

        barEchartsDete() {
            setInterval(v => {
                var now = new Date(); // 当前日期
                var dateWeek = now.getDay(); // 今天本周的第几天
                let params = {
                    // 'timeOfDay': now.getFullYear() + '-' + now.getMonth() + 1 + '-' + now.getDate()
                    'timeOfDay': '2019-01-28'
                };
                this.loading1 = true;
                let mainData = [];
                let exceptionDatas = [];
                let markAreaData = [];
                postPetroleumAR1(params).then(resp => {
                    if (resp && resp.length !== 0) {
                        this.loading1 = false;
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
                        this.chartOptions1['title'][0]['text'] = titleText; // 标题
                        this.chartOptions1['xAxis']['data'] = timeData; // 实时交易时间
                        this.chartOptions1['series'][0]['data'] = priceData; // 实时交易价格
                        this.chartOptions1['series'][1]['data'] = realUpsAndData; // 实时交易涨跌
                        this.chartOptions1['series'][2]['data'] = averagePriceData; // 实时交易均价
                        this.chartOptions1['series'][0]['markArea']['data'] = markAreaData; // 异常
                        this.$refs['echartsDemo1'] && this.$refs['echartsDemo1'].initChart();
                    }
                }).catch(e => {
                    this.loading1 = false;
                });
            }, 10000);
        }
    }
};
</script>

<style lang="less" module>
    .dia_name1 {
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
