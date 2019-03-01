<template>
    <div style="position: relative;">
        <div v-if="txDt" style="position: absolute; padding-left: 10px; font-size: 14px; color: #f8f400;">日期：{{ txDt }}</div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {respData4} from './constants';
// import {getChart4Data} from '@/api/dataAnsis/assoAccountGroupMerge';
import _ from 'lodash';
import {echartsDefault} from '@/assets/style/common/theme/echart';
// import {a} from './test';

export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '3'
        },
        commonReqParams: {
            type: Object,
            default() {
                return {};
            }
        },
        currentAccountGroupId: {
            type: [Number, String],
            default: ''
        },
        currentCustIds: {
            type: Array,
            default() {
                return [];
            }
        },
        sceneType: {
            type: [Number, String],
            default: 1
        },
        tabIndex: {
            type: [String, Number],
            default: '0'
        },
        propsChartHeight: {
            type: [String, Number],
            default: 300
        }
    },
    data() {
        return {
            loading: false,
            txDt: '', // 选择的日期
            chartOptions: {
                grid: {
                    x: 40,
                    x2: 70,
                    y: 70,
                    y2: 50
                },
                legend: {
                    type: 'scroll',
                    top: 17,
                    data: []
                },
                tooltip: {
                    trigger: 'item',
                    enterable: true, // 鼠标进入浮层
                    formatter: param => {
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
                    }
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
                        bottom: 0
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
    methods: {
        getData(resData) {
            if (!Object.keys(resData).length) {
                return;
            }
            let {mainData, buysail, id} = resData;
            this.txDt = buysail[0].declBillTm2.slice(0, 10);
            sessionStorage.setItem(`txDt${this.tabIndex || this.$store.getters.getTabIndex}`, this.txDt);
            let lineData = [];
            let timeData = [];
            let colors = echartsDefault;
            let buy = {};
            let sail = {};
            let buyArray = buysail.filter(v => {
                return v.bizDir === '买';
            });
            let sailArray = buysail.filter(v => {
                return v.bizDir === '卖';
            });
            buyArray.forEach(v => {
                if (!buy[v.custId]) {
                    buy[v.custId] = [];
                }
                buy[v.custId].push(v);
            });
            sailArray.forEach(v => {
                if (!sail[v.custId]) {
                    sail[v.custId] = [];
                }
                sail[v.custId].push(v);
            });
            mainData.forEach(v => {
                timeData.push(v.txTm.slice(0, 5));
                lineData.push(v.currPrice);
            });
            // set datazoom
            // let dataZoomStartValue = timeData[timeData.length > 50 ? timeData.length - 50 : 0];
            // let dataZoomEndValue = timeData[timeData.length - 1];
            // console.log(dataZoomStartValue);
            // console.log(dataZoomEndValue);
            // this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            // this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            // this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            // this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            this.chartOptions['series'] = [
                {
                    name: '分时报单图',
                    data: lineData,
                    type: 'line'
                }
            ];
            let series = this.chartOptions['series'];
            let maxPrice = _.max(lineData);
            let minPrice = _.min(lineData);
            let gap = (maxPrice - minPrice) * 0.03;
            // let hPrice = maxPrice + (maxPrice - minPrice) * 0.2;
            // let lPrice = minPrice - (maxPrice - minPrice) * 0.2;
            // console.log(hPrice);
            // console.log(lPrice);
            // let data1 = [];
            // let data2 = [];
            // mainData.forEach(v => {
            //     for (let i = 0; i < 5; i++) {
            //         if (v[`buyCustQuantity${i + 1}`] && v[`buyCustId${i + 1}`]) {
            //             data1.push([
            //                 v.txTm.slice(0, 5), v.currPrice - (i + 1) * 4, v[`buyCustQuantity${i + 1}`], '买入', v[`buyCustId${i + 1}`]
            //             ]);
            //         }
            //         if (v[`sellCustQuantity${i + 1}`] && v[`sellCustId${i + 1}`]) {
            //             data2.push([
            //                 v.txTm.slice(0, 5), v.currPrice + (i + 1) * 4, v[`sellCustQuantity${i + 1}`], '卖出', v[`sellCustId${i + 1}`]
            //             ]);
            //         }
            //     }
            // });
            // console.log(data1);
            // console.log(data2);
            // for (let i = 0; i < 5; i++) {
            //     series.push({
            //         name: '',
            //         type: 'scatter',
            //         symbol: 'triangle',
            //         symbolSize: 10,
            //         itemStyle: itemStyleCommon(i),
            //         data: data1,
            //         large: true,
            //         smooth: true,
            //         lineStyle: {
            //             normal: {opacity: 0.5}
            //         }
            //     });
            //     series.push({
            //         name: '',
            //         type: 'scatter',
            //         symbol: 'triangle',
            //         symbolRotate: 180,
            //         symbolSize: 10,
            //         itemStyle: itemStyleCommon(i),
            //         data: data2,
            //         large: true,
            //         smooth: true,
            //         lineStyle: {
            //             normal: {opacity: 0.5}
            //         }
            //     });
            // }
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
            this.chartOptions['xAxis']['data'] = timeData;
            this.chartOptions['series'] = series;
            this.chartOptions['legend']['data'] = series.map(v => {
                return v.name;
            });
            this.$store.commit('savechart4', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            this.$refs['chart3'] && this.$refs['chart3'].initChart();
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs['chart3'] && this.$refs['chart3'].initChart();
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
        this.txDt = sessionStorage.getItem(`txDt${this.tabIndex || this.$store.getters.getTabIndex}`) || this.txDt;
        // this.getData(a.resData);
    }
};
</script>
