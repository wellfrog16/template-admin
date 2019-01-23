<template>
    <s-card :title="`原油分时图`" :icon="`fa fa-chart-line`">
        <el-button slot="right" type="text" @click="dialogClick">配置<i class="fa fa-undo-alt"></i></el-button>
        <div slot="content" :class="$style.echarts_box">
            <el-dialog
                width="55%"
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
                                :value="times.idName"
                            ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <dialog-a-r1 :visi="dialogVisible" @checkboxEmit2="checkboxEmit2" @checkboxEmit1="checkboxEmit1"></dialog-a-r1>
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
                :noClearFlag="true"
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
import moment from 'moment';
import MiniIndex from './miniIndex';
import {echartsData1} from './constants';
import {postCrudeOilPrices} from '@/api/popularFeelings/anomalyRecognition';
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
            s1: '',
            s2: '',
            loading1: false,
            dialogVisible: false,
            // form 表单绑定值
            ruleForm: {
                timeWindow: '', // 时间窗口
            },
            checkboTableColumn1: [],
            checkboTableColumn2: [],
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
                    }
                ],
                grid: {
                    x: 30, // 左
                    x2: 40, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                // title: [
                //     {
                //         text: '', // 动态数据
                //         // subtext: '副标题',
                //         // left: 'center',
                //         left: 'left',
                //         itemGap: 10,
                //         // left: '20%',
                //         textStyle: {
                //             // 文字颜色
                //             color: '#fff',
                //             // 字体风格,'normal','italic','oblique'
                //             fontStyle: 'normal',
                //             // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                //             fontWeight: '100',
                //             // 字体系列
                //             fontFamily: 'sans-serif',
                //             // 字体大小
                //             fontSize: 12,
                //             // padding: 45,
                //             // margin: 40,
                //             // left: 'center', // left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
                //             // top: 'center', // left 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比，也可以是 'left', 'center', 'right',如果 left 的值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
                //             // right: 'center', // right 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比。
                //             // bottom: 'center', // bottom 的值可以是像 20 这样的具体像素值，可以是像 '20%' 这样相对于容器高宽的百分比
                //         }
                //     },
                //     {
                //         text: '5月8日，特朗普\n宣布美国正式退 \n出伊朗核协议',
                //         borderColor: '#fff',
                //         borderWidth: 1,
                //         textStyle: {
                //             color: '#fff',
                //             fontSize: 12
                //         },
                //         left: 'left',
                //         top: '70%'
                //     },
                //     {
                //         text: '10月16日，中东独立 \n媒体(中东跟)报道 \n披露了沙特记者哈苏 \n吉事件被杀的内幕',
                //         borderColor: '#fff',
                //         borderWidth: 1,
                //         textStyle: {
                //             color: '#fff',
                //             fontSize: 12
                //         },
                //         left: '22%',
                //         top: '70%'
                //     },
                //     {
                //         text: '10月8日，特朗普\n宣布美国正式退 \n出伊朗核协议',
                //         borderColor: '#fff',
                //         borderWidth: 1,
                //         textStyle: {
                //             color: '#fff',
                //             fontSize: 12
                //         },
                //         left: '50%',
                //         top: '70%'
                //     },
                //     {
                //         text: '9月8日，特朗普\n宣布美国正式退 \n出伊朗核协议',
                //         borderColor: '#fff',
                //         borderWidth: 1,
                //         textStyle: {
                //             color: '#fff',
                //             fontSize: 12
                //         },
                //         left: '74%',
                //         top: '70%'
                //     }
                // ],
                // grid: {
                //     x: 30, // 左
                //     x2: 20, // 右
                //     y: 60, // 上
                //     y2: 160 // 下
                // },
                tooltip: {
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            color: '#f8f400',
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
                            return v.text + ': ' + filterItem[v.name];
                        }).join('<br>');
                    }
                },
                xAxis: {
                    type: 'category',
                    // data: (function() {
                    //     let now = new Date();
                    //     let res = [];
                    //     let len = 10;
                    //     while (len--) {
                    //         res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                    //         now = new Date(now - 1000);
                    //     }
                    //     return res;
                    // })(),
                    data: [],
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#6ab2ec',
                            width: 1,
                        },
                    },
                    // 调整x轴的lable
                    axisLabel: {
                        textStyle: {
                            fontSize: 12 // 让字体变小
                        }
                    }
                },
                yAxis: [
                    {
                        name: '价格',
                        type: 'value',
                        position: 'left',
                        // min: value => {
                        //     return value.min;
                        // },
                        // max: value => {
                        //     return value.max;
                        // },
                        // 控制网格线是否显示
                        splitLine: {
                            show: false,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e']
                            }
                        },
                        // 设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#6ab2ec',
                            }
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
                        // 控制网格线是否显示
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                // 使用深浅的间隔色
                                color: ['#132a6e']
                            }
                        },
                        // 设置轴线的属性
                        axisLine: {
                            lineStyle: {
                                color: '#6ab2ec',
                            }
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    },
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
                        name: '分时',
                        // data: (function() {
                        //     var res = [];
                        //     var len = 10;
                        //     while (len--) {
                        //         res.push(Math.round(Math.random() * 1000));
                        //     }
                        //     return res; // 价格
                        // })(),
                        data: [],
                        markPoint: {
                            // 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                            symbol: 'circle',
                            // 设置符号大小
                            symbolSize: 30,
                            data: [
                                // 'min' 最大值-- 'max' 最大值 --'average' 平均值
                                {
                                    type: 'max',
                                    name: '最大值',
                                    value: '',
                                    itemStyle: {
                                        normal: {
                                            label: {
                                                show: true,
                                                color: '#222'
                                            },
                                            lineStyle: {
                                                color: '#222'
                                            },
                                            borderWidth: 1,
                                            // lineStyle: {
                                            //     type: 'dash',
                                            //     color: '#222 ',
                                            //     width: 2,
                                            // },
                                            borderColor: 'red'
                                        }
                                    }
                                },
                                {
                                    type: 'min',
                                    name: '最小值',
                                    value: 2300,
                                    // itemStyle: {
                                    //     normal: {color: '#222'}
                                    // }
                                }
                            ]
                        },
                        // markLine: {
                        //     data: [
                        //         {type: 'average', name: '平均值'}
                        //     ]
                        // },
                        // yAxisIndex: 0,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                color: 'red',
                                lineStyle: {
                                    color: '#f8f400'
                                }
                            }
                        },
                        // itemStyle: {
                        //     normal: {
                        //         lineStyle: {
                        //             color: '#f8f400'
                        //         }
                        //     }
                        // }
                    },
                    {
                        name: '分时图',
                        // data: (function() {
                        //     var res = [];
                        //     var len = 0;
                        //     while (len < 10) {
                        //         res.push((Math.random() * 10 + 5).toFixed(1) - 0);
                        //         len++;
                        //     }
                        //     return res; // 预购量
                        // })(),
                        data: [],
                        type: 'line',
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#ff0000'
                                }
                            }
                        },
                        symbol: 'circle',
                        // // 设置折点大小
                        symbolSize: 0,
                        // // 设置为光滑曲线
                        smooth: true
                        // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        // markLine: {
                        //     itemStyle: {
                        //         normal: {
                        //             lineStyle: {type: 'solid', color: 'red'},
                        //             label: {show: true, position: 'left'}
                        //         }
                        //     },
                        //     data: [
                        //         {
                        //             name: '平均线',
                        //             // 支持 'average', 'min', 'max'
                        //             type: 'average',
                        //             // lineStyle: {
                        //             //     normal: {
                        //             //         color: 'red',
                        //             //         width: '1',
                        //             //         // 'solid','dashed','dotted'
                        //             //         type: 'solid',
                        //             //     }
                        //             // },
                        //         }
                        //     ],
                        //     // 起点标记的图形- 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
                        //     symbol: 'none'
                        // }
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
            this.checkboTableColumn1 = [];
            this.checkboTableColumn2 = [];
        },
        // 多选
        checkboxEmit1(tableColumn) {
            this.checkboTableColumn1 = tableColumn;
        },
        // 多选
        checkboxEmit2(tableColumn) {
            this.checkboTableColumn2 = tableColumn;
        },
        // 关闭弹框
        closeData(done) {
            done();
            this.dialogVisible = false;
            this.checkboTableColumn1 = [];
            this.checkboTableColumn2 = [];
            this.ruleForm.timeWindow = '';
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
            this.checkboTableColumn1 = [];
            this.checkboTableColumn2 = [];
            this.ruleForm.timeWindow = '';
        },
        // 确 定
        dialogConfirmClick() {
            if (this.ruleForm.timeWindow !== '' && this.checkboTableColumn1.length !== 0 && this.checkboTableColumn2.length !== 0) {
                this.dialogVisible = false;
                // console.log(this.ruleForm.timeWindow); // 时间窗口
                // console.log(this.radioTableColumn); // 舆情
                // console.log(this.checkboTableColumn); // 他比证券
                this.barEchartsDete();
                this.$message.success('成功');
                this.ruleForm.timeWindow = '';
                this.checkboTableColumn1 = [];
                this.checkboTableColumn2 = [];
                this.ruleForm.timeWindow = '';
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
            // this.loading1 = true;
            // let params = {
            //     'timeOfDay': moment(new Date()).format('YYYY-MM-DD'),
            // };
            //  舆情-K线图
            // setInterval(() => {
            //     postCrudeOilPrices(params).then(resp => {
            //         // if (resp && resp.length !== 0) {
            //         //     // console.log(resp);
            //         //     this.loading1 = false;
            //         //     // let {mainData} = echartsData1;
            //         //     let {mainData} = resp;
            //         //     if (mainData && !mainData.length) {
            //         //         return;
            //         //     }
            //         //     let lineData = [];
            //         //     let timeData = [];
            //         //     let colors = [
            //         //         '#00709e',
            //         //         '#ac10ce',
            //         //         '#ff0000',
            //         //         '#13ce34',
            //         //         '#ff8a00',
            //         //         '#006624',
            //         //         '#e3007b',
            //         //         '#1929b3',
            //         //         '#b69913',
            //         //         '#f8f400'
            //         //     ];
            //         //     let buy = {};
            //         //     let sail = {};
            //         //     // console.log(mainData);
            //         //     mainData.forEach(v => {
            //         //         /**
            //         //          * 原油代码 crudeCode                 crudeCode: "t1nf_SC0"
            //         //          * 产品成交时间  crudeDealTime         crudeDealTime: "2019-01-15"
            //         //          * 产品名称  crudeName                crudeName: "原油"
            //         //          * ..........................         quantity: 415  ?
            //         //          * 实时交易均价  realAveragePrice      realAveragePrice: 413.6
            //         //          * 实时交易成交  realMakeBargain       realMakeBargain: 50026
            //         //          * 实时交易价格  realPrice             realPrice: 413.6
            //         //          * 实时交易时间 realTime               realTime: "2019-01-15 08:59:00.0"
            //         //          * 实时交易涨跌  realUpsAndDowns       realUpsAndDowns: 1398
            //         //          */
            //         //         timeData.push(v.realTime);
            //         //         lineData.push(
            //         //             [
            //         //                 v.crudeCode,
            //         //                 v.crudeDealTime,
            //         //                 v.crudeName,
            //         //                 v.realAveragePrice,
            //         //                 v.realMakeBargain,
            //         //                 v.realPrice,
            //         //                 v.realUpsAndDowns
            //         //             ]
            //         //         );
            //         //     });
            //         //     this.chartOptions1['series'] = [
            //         //         {
            //         //             name: '分时报单图',
            //         //             data: lineData,
            //         //             type: 'line'
            //         //         }
            //         //     ];
            //         //     let series = this.chartOptions1['series'];
            //         //     let maxPrice = _.max(lineData);
            //         //     let minPrice = _.min(lineData);
            //         //     let gap = (maxPrice - minPrice) * 0.03;
            //         //     Object.keys(buy).forEach((v, i) => {
            //         //         let data = buy[v].map(m => {
            //         //             return [m.declBillTm2.slice(-5), m.closingPrice - (i + 1) * gap, m.declBillQtty, '买入', v];
            //         //             // return [m.declBillTm2.slice(-5), lPrice + i * 2, m.declBillQtty, '买入', v];
            //         //         });
            //         //         series.push({
            //         //             name: `${v}买入`,
            //         //             type: 'scatter',
            //         //             symbol: 'triangle',
            //         //             symbolSize: 10,
            //         //             itemStyle: {
            //         //                 normal: {
            //         //                     color: colors[i],
            //         //                     opacity: 0.8,
            //         //                     shadowBlur: 10,
            //         //                     shadowOffsetX: 0,
            //         //                     shadowOffsetY: 0,
            //         //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //         //                 }
            //         //             },
            //         //             data: data,
            //         //             smooth: true,
            //         //             lineStyle: {
            //         //                 normal: {opacity: 0.5}
            //         //             }
            //         //         });
            //         //     });
            //         //     Object.keys(sail).forEach((v, i) => {
            //         //         let data = sail[v].map(m => {
            //         //             return [m.declBillTm2.slice(-5), m.closingPrice + (i + 1) * gap, m.declBillQtty, '卖出', v];
            //         //             // return [m.declBillTm2.slice(-5), hPrice - i * 2, m.declBillQtty, '卖出', v];
            //         //         });
            //         //         series.push({
            //         //             name: `${v}卖出`,
            //         //             type: 'scatter',
            //         //             symbol: 'triangle',
            //         //             symbolRotate: 180,
            //         //             symbolSize: 10,
            //         //             itemStyle: {
            //         //                 normal: {
            //         //                     color: colors[i + 5],
            //         //                     opacity: 0.8,
            //         //                     shadowBlur: 10,
            //         //                     shadowOffsetX: 0,
            //         //                     shadowOffsetY: 0,
            //         //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //         //                 }
            //         //             },
            //         //             data: data,
            //         //             smooth: true,
            //         //             lineStyle: {
            //         //                 normal: {opacity: 0.5}
            //         //             }
            //         //         });
            //         //     });
            //         //     this.chartOptions1['xAxis']['data'] = timeData;
            //         //     this.chartOptions1['series'] = series;
            //         //     this.chartOptions1['legend']['data'] = series.map(v => {
            //         //         return v.name;
            //         //     });
            //         //     // this.$store.commit('savechart4', {data: this.chartOptions1, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            //         //     this.$refs['echartsDemo1'] && this.$refs['echartsDemo1'].initChart();
            //         // }
            //     }).catch(e => {
            //         this.loading1 = false;
            //     });
            // }, 210000);
            setInterval(v => {
                if (echartsData1 && echartsData1.length !== 0) {
                    // console.log(resp);
                    this.loading1 = false;
                    let {mainData} = echartsData1;
                    // let {mainData} = resp;
                    if (mainData && !mainData.length) {
                        return;
                    }
                    let lineData = [];
                    let lineDatas = [];
                    let timeData = [];
                    let titleText = '';
                    let crudeDealTimes = '';
                    let realTimes = '';
                    let realAveragePrices = '';
                    let realMakeBargains = '';
                    let realUpsAndDownss = '';
                    var now = new Date(); // 当前日期
                    var dateWeek = now.getDay(); // 今天本周的第几天
                    // let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, ''); // 分钟
                    // let data0 = Math.round(Math.random() * 1000); // 分钟
                    // let data1 = (Math.random() * 10 + 5).toFixed(1) - 0; // 分钟
                    this.mainData = mainData;
                    mainData.forEach(v => {
                        // timeData.shift();
                        timeData.push(v.realTime);
                        lineData.push(v.realPrice);
                        // lineDatas.push((v.realAveragePrice * 0.010).toFixed(2));
                        lineDatas.push(v.realAveragePrice);
                        // lineDatas.push((v.realPrice / v.realMakeBargain).toFixed(2));
                        // console.log((v.realPrice / v.realMakeBargain).toFixed(2));
                        // 产品成交时间+星期几+实时交易时间+实时交易均价+实时交易成交数量+实时交易涨跌
                        // titleText += v.crudeDealTime + '/' + dateWeek + '/' + v.realTime + ' 均 ' + v.realAveragePrice + ' 量 ' + v.realMakeBargain + ' 幅 ' + v.realUpsAndDowns;
                        crudeDealTimes = v.crudeDealTime;
                        realTimes = v.realTime;
                        realAveragePrices = v.realAveragePrice;
                        realMakeBargains = v.realMakeBargain;
                        realUpsAndDownss = v.realUpsAndDowns;
                    });
                    titleText = crudeDealTimes + '/' + dateWeek + '/' + realTimes + ' 均 ' + realAveragePrices + ' 量 ' + realMakeBargains + ' 幅 ' + realUpsAndDownss * 0.010 + '%';
                    this.chartOptions1['title'][0]['text'] = titleText;
                    this.chartOptions1['series'][0]['data'] = lineData;
                    this.chartOptions1['series'][1]['data'] = lineDatas;
                    // this.chartOptions1['series'][0]['data'].push(data0);
                    // this.chartOptions1['series'][1]['data'].push(data1);
                    this.chartOptions1['xAxis']['data'] = timeData;
                    // this.chartOptions1['xAxis']['data'].push(axisData);
                    this.$refs['echartsDemo1'] && this.$refs['echartsDemo1'].initChart();
                }
            }, 2000);
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
