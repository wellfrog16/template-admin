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
import moment from 'moment';
import MiniIndex from './miniIndex';
import {echartsData2} from './constants';
import {postCrudeOilPrices} from '@/api/popularFeelings/anomalyRecognition';
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
                    x: 30, // 左
                    x2: 40, // 右
                    y: 60, // 上
                    // y2: 160 // 下
                    y2: 70 // 下
                },
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
                            return v.text + ': ' + filterItem[v.name];
                        }).join('<br>');
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#fff',
                            width: 1,
                        },
                    },
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
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#ff0000',
                                width: 0,
                                // color: '#5793f3'
                            },
                        },
                        axisTick: { // y轴刻度线
                            show: false,
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
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#ff0000',
                                width: 0,
                                // color: '#5793f3'
                            },
                        },
                        axisTick: { // y轴刻度线
                            show: false,
                        },
                        axisLabel: {
                            formatter: '{value} %'
                        },
                        splitLine: { // 网格线
                            show: false
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
                        data: [],
                        yAxisIndex: 0,
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#f8f400'
                                }
                            }
                        }
                    },
                    {
                        name: '分时图',
                        data: [],
                        yAxisIndex: 1,
                        type: 'line',
                        symbol: 'none',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#ff0000'
                                }
                            }
                        }
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
            this.loading2 = true;
            // let params = {
            //     'timeOfDay': moment(new Date()).format('YYYY-MM-DD'),
            // };
            //  舆情-K线图
            // setInterval(() => {
            //     postCrudeOilPrices(params).then(resp => {
            //         // if (resp && resp.length !== 0) {
            //         //     // console.log(resp);
            //         //     this.loading1 = false;
            //         //     // let {mainData} = echartsData2;
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
            if (echartsData2 && echartsData2.length !== 0) {
                // console.log(resp);
                this.loading2 = false;
                let {mainData} = echartsData2;
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
                // console.log(mainData);
                this.mainData = mainData;
                mainData.forEach(v => {
                    timeData.push(v.realTime);
                    lineData.push(v.realPrice);
                    lineDatas.push(v.realAveragePrice * 0.010);
                    // 产品成交时间+星期几+实时交易时间+实时交易均价+实时交易成交数量+实时交易涨跌
                    // titleText += v.crudeDealTime + '/' + dateWeek + '/' + v.realTime + ' 均 ' + v.realAveragePrice + ' 量 ' + v.realMakeBargain + ' 幅 ' + v.realUpsAndDowns;
                    crudeDealTimes = v.crudeDealTime;
                    realTimes = v.realTime;
                    realAveragePrices = v.realAveragePrice;
                    realMakeBargains = v.realMakeBargain;
                    realUpsAndDownss = v.realUpsAndDowns;
                });
                titleText = crudeDealTimes + '/' + dateWeek + '/' + realTimes + ' 均 ' + realAveragePrices + ' 量 ' + realMakeBargains + ' 幅 ' + realUpsAndDownss * 0.010 + '%';
                this.s1 = titleText;
                this.s2 = titleText;
                this.chartOptions2['title'][0]['text'] = titleText;
                this.chartOptions2['series'][0]['data'] = lineData;
                this.chartOptions2['series'][1]['data'] = lineDatas;
                this.chartOptions2['xAxis']['data'] = timeData;
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
