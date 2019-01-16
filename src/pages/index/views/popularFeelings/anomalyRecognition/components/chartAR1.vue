<template>
    <s-card :title="`原油实时分析`" :icon="`fa fa-search`">
        <el-button slot="right" type="text" @click="dialogClick">异常指标</el-button>
        <el-dialog
            width="86%"
            slot="content"
            :before-close="closeData"
            title=""
            :visible.sync="dialogVisible"
            :class="$style.dia_name">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                :class="$style.demo_rule_form">
                <el-form-item label="时间窗口" prop="timeWindow" label-width="100px">
                    <el-select
                        style="width: 45%;"
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
                    <dialog-a-r1></dialog-a-r1>
                </el-col>
                <el-col :span="12">
                    <dialog-a-r2></dialog-a-r2>
                </el-col>
            </el-row>
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
            :defaultOption="chartOptions1"
            :propsChartHeight="420">
        </echarts-common>
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
import DialogAR2 from './dialogAR2';
export default {
    name: 'chartAR2',
    components: {SCard, EchartsCommon, DialogAR1, DialogAR2},
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
            loading1: false,
            dialogVisible: false,
            chartOptions1: {
                grid: {
                    x: 40,
                    x2: 50,
                    y: 60,
                    y2: 60
                },
                legend: {
                    type: 'scroll',
                    data: []
                },
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
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
                    data: []
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
                        axisLine: {
                            lineStyle: {
                                color: '#5793f3'
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
                        min: 0,
                        max: value => {
                            return value.max.toFixed(2);
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#d14a61'
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
                        data: [],
                        type: 'line',
                    },
                    {
                        name: '分时图',
                        data: [],
                        yAxisIndex: 1,
                        type: 'line'
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
        // 取 消
        dialogCancelClick() {
            // this.dialogVisible = !this.dialogVisible;
            // console.log('取 消');
            // this.$emit('eventClick', this.dialogVisible);
        },
        // 确 定
        dialogConfirmClick() {
            this.dialogVisible = false;
            console.log(this.dialogVisible);
            // console.log('确 定');
            // this.$emit('eventClick', this.dialogVisible);
        },
        dialogClick() {
            this.dialogVisible = true;
        },
        // setInterval() {},
        // setTimeout(() => {
        // }, 5000);
        // setInterval(() {
        //
        // });
        barEchartsDete() {
            this.loading1 = true;
            let params = {
                'timeOfDay': moment(new Date()).format('YYYY-MM-DD'),
            };
            //  舆情-K线图
            setInterval(() => {
                postCrudeOilPrices(params).then(resp => {
                    // if (resp && resp.length !== 0) {
                    //     // console.log(resp);
                    //     this.loading1 = false;
                    //     // let {mainData} = echartsData1;
                    //     let {mainData} = resp;
                    //     if (mainData && !mainData.length) {
                    //         return;
                    //     }
                    //     let lineData = [];
                    //     let timeData = [];
                    //     let colors = [
                    //         '#00709e',
                    //         '#ac10ce',
                    //         '#ff0000',
                    //         '#13ce34',
                    //         '#ff8a00',
                    //         '#006624',
                    //         '#e3007b',
                    //         '#1929b3',
                    //         '#b69913',
                    //         '#f8f400'
                    //     ];
                    //     let buy = {};
                    //     let sail = {};
                    //     // console.log(mainData);
                    //     mainData.forEach(v => {
                    //         /**
                    //          * 原油代码 crudeCode                 crudeCode: "t1nf_SC0"
                    //          * 产品成交时间  crudeDealTime         crudeDealTime: "2019-01-15"
                    //          * 产品名称  crudeName                crudeName: "原油"
                    //          * ..........................         quantity: 415  ?
                    //          * 实时交易均价  realAveragePrice      realAveragePrice: 413.6
                    //          * 实时交易成交  realMakeBargain       realMakeBargain: 50026
                    //          * 实时交易价格  realPrice             realPrice: 413.6
                    //          * 实时交易时间 realTime               realTime: "2019-01-15 08:59:00.0"
                    //          * 实时交易涨跌  realUpsAndDowns       realUpsAndDowns: 1398
                    //          */
                    //         timeData.push(v.realTime);
                    //         lineData.push(
                    //             [
                    //                 v.crudeCode,
                    //                 v.crudeDealTime,
                    //                 v.crudeName,
                    //                 v.realAveragePrice,
                    //                 v.realMakeBargain,
                    //                 v.realPrice,
                    //                 v.realUpsAndDowns
                    //             ]
                    //         );
                    //     });
                    //     this.chartOptions1['series'] = [
                    //         {
                    //             name: '分时报单图',
                    //             data: lineData,
                    //             type: 'line'
                    //         }
                    //     ];
                    //     let series = this.chartOptions1['series'];
                    //     let maxPrice = _.max(lineData);
                    //     let minPrice = _.min(lineData);
                    //     let gap = (maxPrice - minPrice) * 0.03;
                    //     Object.keys(buy).forEach((v, i) => {
                    //         let data = buy[v].map(m => {
                    //             return [m.declBillTm2.slice(-5), m.closingPrice - (i + 1) * gap, m.declBillQtty, '买入', v];
                    //             // return [m.declBillTm2.slice(-5), lPrice + i * 2, m.declBillQtty, '买入', v];
                    //         });
                    //         series.push({
                    //             name: `${v}买入`,
                    //             type: 'scatter',
                    //             symbol: 'triangle',
                    //             symbolSize: 10,
                    //             itemStyle: {
                    //                 normal: {
                    //                     color: colors[i],
                    //                     opacity: 0.8,
                    //                     shadowBlur: 10,
                    //                     shadowOffsetX: 0,
                    //                     shadowOffsetY: 0,
                    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //                 }
                    //             },
                    //             data: data,
                    //             smooth: true,
                    //             lineStyle: {
                    //                 normal: {opacity: 0.5}
                    //             }
                    //         });
                    //     });
                    //     Object.keys(sail).forEach((v, i) => {
                    //         let data = sail[v].map(m => {
                    //             return [m.declBillTm2.slice(-5), m.closingPrice + (i + 1) * gap, m.declBillQtty, '卖出', v];
                    //             // return [m.declBillTm2.slice(-5), hPrice - i * 2, m.declBillQtty, '卖出', v];
                    //         });
                    //         series.push({
                    //             name: `${v}卖出`,
                    //             type: 'scatter',
                    //             symbol: 'triangle',
                    //             symbolRotate: 180,
                    //             symbolSize: 10,
                    //             itemStyle: {
                    //                 normal: {
                    //                     color: colors[i + 5],
                    //                     opacity: 0.8,
                    //                     shadowBlur: 10,
                    //                     shadowOffsetX: 0,
                    //                     shadowOffsetY: 0,
                    //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
                    //                 }
                    //             },
                    //             data: data,
                    //             smooth: true,
                    //             lineStyle: {
                    //                 normal: {opacity: 0.5}
                    //             }
                    //         });
                    //     });
                    //     this.chartOptions1['xAxis']['data'] = timeData;
                    //     this.chartOptions1['series'] = series;
                    //     this.chartOptions1['legend']['data'] = series.map(v => {
                    //         return v.name;
                    //     });
                    //     // this.$store.commit('savechart4', {data: this.chartOptions1, index: id || this.tabIndex || this.$store.getters.getTabIndex});
                    //     this.$refs['echartsDemo1'] && this.$refs['echartsDemo1'].initChart();
                    // }
                }).catch(e => {
                    this.loading1 = false;
                });
            }, 210000);
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
                // console.log(mainData);
                this.mainData = mainData;
                mainData.forEach(v => {
                    timeData.push(v.realTime);
                    lineData.push(v.realPrice);
                    lineDatas.push(v.realPrice);
                });
                this.chartOptions1['series'][0]['data'] = lineData;
                this.chartOptions1['series'][1]['data'] = lineDatas;
                this.chartOptions1['xAxis']['data'] = timeData;
                this.$refs['echartsDemo1'] && this.$refs['echartsDemo1'].initChart();
            }
        }
    }
};
</script>

<style lang="less" module>
    .dia_name {
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
