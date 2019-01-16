<template>
    <s-card :title="`国油分时图`" :icon="`fa fa-search`">
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
        return {
            loading1: false,
            dialogVisible: false,
            txDt: '', // 选择的日期
            chartOptions1: {
                grid: {
                    x: 40,
                    x2: 70,
                    y: 60,
                    y2: 60
                },
                legend: {
                    type: 'scroll',
                    data: []
                },
                tooltip: {
                    trigger: 'item',
                    enterable: true, // 鼠标进入浮层
                    formatter: param => {
                        console.log(param);
                        if (param.seriesIndex === 0) {
                            // let url = 'https://www.baidu.com';
                            // <a href="${url}" target="_blank" style="cursor:pointer;">百度</a>;
                            return `
                                报单时间： ${param.name}<br>
                                价格： ${param.value}<br>
                            `;
                        } else {
                            return `
                                报单时间： ${param.value[0]}<br>
                                账户号： ${param.value[4]}<br>
                                ${param.value[3]}报单数量： ${param.value[2]}<br>
                            `;
                        }
                    },
                },
                xAxis: {
                    name: '报单时间', // 报单时间
                    type: 'category',
                    data: []
                },
                yAxis: {
                    name: '价格',
                    type: 'value',
                    min: value => {
                        return value.min;
                    },
                    max: value => {
                        return value.max;
                    },
                    splitNumber: 2
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
                        name: '分时报单图',
                        data: [],
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
        barEchartsDete() {
            this.loading1 = true;
            let params = {
                'timeOfDay': '2019-01-14',
            };
            //  舆情-K线图
            // postCrudeOilPrices(params).then(resp => {
            //     if (resp && resp.length !== 0) {
            //         console.log(resp);
            this.loading1 = false;
            let {mainData} = echartsData1;
            // let {mainData} = resp;
            if (mainData && !mainData.length) {
                return;
            }
            let lineData = [];
            let timeData = [];
            let colors = [
                '#00709e',
                '#ac10ce',
                '#ff0000',
                '#13ce34',
                '#ff8a00',
                '#006624',
                '#e3007b',
                '#1929b3',
                '#b69913',
                '#f8f400'
            ];
            let buy = {};
            let sail = {};
            // let buyArray = buysail.filter(v => {
            //     return v.bizDir === '买';
            // });
            // let sailArray = buysail.filter(v => {
            //     return v.bizDir === '卖';
            // });
            // buyArray.forEach(v => {
            //     if (!buy[v.custId]) {
            //         buy[v.custId] = [];
            //     }
            //     buy[v.custId].push(v);
            // });
            // sailArray.forEach(v => {
            //     if (!sail[v.custId]) {
            //         sail[v.custId] = [];
            //     }
            //     sail[v.custId].push(v);
            // });
            console.log(mainData);
            mainData.forEach(v => {
                timeData.push(v.txTm.slice(0, 5));
                lineData.push(v.currPrice);
            });
            this.chartOptions1['series'] = [
                {
                    name: '分时报单图',
                    data: lineData,
                    type: 'line'
                }
            ];
            let series = this.chartOptions1['series'];
            let maxPrice = _.max(lineData);
            let minPrice = _.min(lineData);
            let gap = (maxPrice - minPrice) * 0.03;
            Object.keys(buy).forEach((v, i) => {
                let data = buy[v].map(m => {
                    return [m.declBillTm2.slice(-5), m.currPrice - (i + 1) * gap, m.declBillQtty, '买入', v];
                    // return [m.declBillTm2.slice(-5), lPrice + i * 2, m.declBillQtty, '买入', v];
                });
                series.push({
                    name: `${v}买入`,
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: colors[i],
                            opacity: 0.8,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: data,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
            });
            Object.keys(sail).forEach((v, i) => {
                let data = sail[v].map(m => {
                    return [m.declBillTm2.slice(-5), m.currPrice + (i + 1) * gap, m.declBillQtty, '卖出', v];
                    // return [m.declBillTm2.slice(-5), hPrice - i * 2, m.declBillQtty, '卖出', v];
                });
                series.push({
                    name: `${v}卖出`,
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolRotate: 180,
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: colors[i + 5],
                            opacity: 0.8,
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: data,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
            });
            this.chartOptions1['xAxis']['data'] = timeData;
            this.chartOptions1['series'] = series;
            this.chartOptions1['legend']['data'] = series.map(v => {
                return v.name;
            });
            // this.$store.commit('savechart4', {data: this.chartOptions1, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            this.$refs['echartsDemo1'] && this.$refs['echartsDemo1'].initChart();
            // }

            // }).catch(e => {
            //     this.loading1 = false;
            // });
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
