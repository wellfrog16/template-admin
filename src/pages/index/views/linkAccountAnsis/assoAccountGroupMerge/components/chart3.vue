<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {getChart3Data} from '@/api/dataAnsis/assoAccountGroupMerge';
import api from '@/api/mock/demo';
import _ from 'lodash';
// import {respData3} from './constants';
export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '2'
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
    watch: {
        propsChartHeight(val) {
            this.chartOptions.grid[0]['height'] = val === 300 ? 140 : 500;
            this.chartOptions.grid[1]['height'] = val === 300 ? 40 : 100;
        }
    },
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
            {name: 'date', index: 0, text: '交易日'},
            {name: 'open', index: 1, text: '开盘价'},
            {name: 'close', index: 2, text: '收盘价'},
            {name: 'highest', index: 3, text: '最高价'},
            {name: 'lowest', index: 4, text: '最低价'},
            {name: 'bargainQuantity', index: 5, text: '成交量'},
        ];
        return {
            loading: false,
            init: true,
            selectMax: {},
            chartOptions: {
                animation: false,
                // color: ['transparent', '#8A0000'],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    enterable: true,
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: param => {
                        if (param.seriesIndex === 1 || param.seriesIndex === 2) {
                            return `交易日: ${param.value[0]} ${param.value[2]}账户数: ${param.value[3]}<br>` + param.value[4].map((v, i) => {
                                return `
                                    客户编号: ${v}<br>
                                `;
                            }).join('');
                        } else if (param.seriesIndex === 3) { // bar
                            return `
                            成交量: ${param.value}<br>
                            `;
                        } else {
                            return schema.map((v, i) => {
                                return v.text + ': ' + param.value[i === 0 ? 5 : i === 5 ? 6 : i];
                            }).join('<br>');
                        }
                    }
                },
                axisPointer: {
                    link: [{
                        xAxisIndex: [0, 1]
                    }],
                    label: {
                        backgroundColor: '#222',
                        borderColor: '#777'
                    }
                },
                legend: {
                    data: ['日K', '卖出', '买入', '成交量']
                },
                grid: [{
                    left: 60,
                    right: 60,
                    top: 40,
                    height: 140,
                    containLabel: false
                }, {
                    left: 60,
                    right: 60,
                    height: 40,
                    bottom: 40,
                    containLabel: false
                }],
                xAxis: [
                    {
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
                    {
                        type: 'category',
                        gridIndex: 1,
                        data: [],
                        scale: true,
                        boundaryGap: false,
                        splitLine: {show: false},
                        axisLabel: {show: false},
                        axisTick: {
                            show: false,
                        },
                        splitNumber: 20,
                        min: 'dataMin',
                        max: 'dataMax',
                        axisPointer: {
                            type: 'shadow',
                            snap: true,
                            label: {show: false},
                            triggerTooltip: true,
                            handle: {
                                show: true,
                                margin: 15,
                                size: 25,
                                color: '#f3ec6cf2'
                            }
                        }
                    }],
                yAxis: [
                    {
                        name: '成交价',
                        scale: true,
                        splitArea: {
                            show: true,
                            areaStyle: {
                                color: ['transparent', 'rgba(4, 58, 127, 0.92)']
                            }
                        }
                    },
                    {
                        name: '成交量',
                        scale: true,
                        gridIndex: 1,
                        splitNumber: 2,
                        // axisLabel: {show: false},
                        // axisLine: {show: false},
                        // axisTick: {show: false},
                        splitLine: {show: false}
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        xAxisIndex: [0, 1]
                    },
                    {
                        show: true,
                        type: 'slider',
                        xAxisIndex: [0, 1],
                        bottom: 0
                    }
                ],
                visualMap: [
                    {
                        left: 'right',
                        top: '3%',
                        dimension: 3,
                        min: 0,
                        max: 20,
                        itemHeight: 80,
                        itemWidth: 10,
                        calculable: true,
                        precision: 0.1,
                        text: ['卖出'],
                        textGap: 5,
                        textStyle: {
                            color: '#fff'
                        },
                        seriesIndex: 1,
                        inRange: {
                            color: ['#095209'],
                            colorLightness: [1, 0.3]
                        },
                        outOfRange: {
                            // symbolSize: [10, 45],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#095209']
                            },
                            outOfRange: {
                                color: '#444'
                            }
                        }
                    },
                    {
                        left: 'right',
                        inverse: true,
                        textGap: 5,
                        bottom: '22%',
                        dimension: 3, // 注意：对应映射索引
                        min: 0,
                        max: 20,
                        seriesIndex: 2,
                        itemHeight: 80,
                        itemWidth: 10,
                        calculable: true,
                        precision: 0.1,
                        text: ['买入'],
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            color: ['#7d0d14'],
                            colorLightness: [1, 0.3]
                        },
                        outOfRange: {
                            // symbolSize: [10, 45],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#7d0d14']
                            },
                            outOfRange: {
                                color: '#444'
                            }
                        }
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
                            // label: {
                            //     normal: {
                            //         formatter: param => {
                            //             return param != null ? Math.round(param.value) : '';
                            //         }
                            //     }
                            // },
                            data: [
                                // {
                                //     name: 'XX标点',
                                //     coord: ['2013/01/02', 2300],
                                //     value: 2300,
                                //     itemStyle: {
                                //         normal: {color: 'rgb(41,60,85)'}
                                //     }
                                // },
                                // {
                                //     name: 'highest value',
                                //     type: 'max',
                                //     valueDim: 'highest'
                                // },
                                // {
                                //     name: 'lowest value',
                                //     type: 'min',
                                //     valueDim: 'lowest'
                                // },
                                // {
                                //     name: 'average value on close',
                                //     type: 'average',
                                //     valueDim: 'close'
                                // }
                            ],
                            tooltip: {
                                backgroundColor: '#222',
                                borderColor: '#777',
                                borderWidth: 1,
                                formatter: param => {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        markLine: {
                            //     symbol: ['none', 'none'],
                            //     data: [
                            //         [
                            //             {
                            //                 name: 'from lowest to highest',
                            //                 type: 'min',
                            //                 valueDim: 'lowest',
                            //                 symbol: 'circle',
                            //                 symbolSize: 10,
                            //                 label: {
                            //                     normal: {show: false},
                            //                     emphasis: {show: false}
                            //                 }
                            //             },
                            //             {
                            //                 type: 'max',
                            //                 valueDim: 'highest',
                            //                 symbol: 'circle',
                            //                 symbolSize: 10,
                            //                 label: {
                            //                     normal: {show: false},
                            //                     emphasis: {show: false}
                            //                 }
                            //             }
                            //         ],
                            //         {
                            //             name: 'min line on close',
                            //             type: 'min',
                            //             valueDim: 'close'
                            //         },
                            //         {
                            //             name: 'max line on close',
                            //             type: 'max',
                            //             valueDim: 'close'
                            //         }
                            //     ]
                        },
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
                    },
                    {
                        name: '成交量',
                        type: 'bar',
                        barMaxWidth: 35,
                        xAxisIndex: 1,
                        yAxisIndex: 1,
                        itemStyle: {
                            normal: {
                                // color: '#7fbe9e'
                            },
                            emphasis: {
                                // color: '#140'
                            }
                        },
                        data: []
                    }
                ]

            }
        };
    },
    methods: {
        async test() {
            let resp = await api.test();
            let {mainData} = resp;
            if (mainData && !mainData.length) {
                return;
            }
            mainData = _.sortBy(mainData, [item => {
                return item.txDt;
            }]);
            // set datazoom
            let dataZoomStartValue = mainData[mainData.length > 20 ? mainData.length - 20 : 0]['txDt'];
            let dataZoomEndValue = mainData[mainData.length - 1]['txDt'];
            this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            let seriesData = [];
            let scatterData1 = [];
            let scatterData2 = [];
            let date = [];
            mainData.forEach(v => {
                date.push(v.txDt);
                seriesData.push(
                    [v.openQuotPrice, v.closeQuotPrice, v.lowestPrice, v.highestPrice, v.txDt, v.bargainQuantity]
                );
            });
            mainData.forEach(v => {
                scatterData1.push([v.txDt, (v.highestPrice + 100), '卖出', v.sellQtty, this.currentCustIds]);
                scatterData2.push([v.txDt, (v.lowestPrice - 100), '买入', v.buyQtty, this.currentCustIds]);
            });
            this.chartOptions['series'][0]['data'] = seriesData;
            this.chartOptions['series'][1]['data'] = scatterData1;
            this.chartOptions['series'][2]['data'] = scatterData2;
            this.chartOptions['series'][3]['data'] = mainData.map(v => { return v.bargainQuantity; });
            this.chartOptions['xAxis'][0]['data'] = date;
            this.chartOptions['xAxis'][1]['data'] = date;
            // set cust count
            this.chartOptions['visualMap'][0]['max'] = this.currentCustIds.length;
            this.chartOptions['visualMap'][1]['max'] = this.currentCustIds.length;
            this.$store.commit('saveXGchart3', {data: this.chartOptions, index: this.tabIndex || this.$store.getters.getTabIndex});
            this.initChart();
            // 最近交易日，包含买入或卖出
            this.selectMax = _.maxBy(mainData, v => {
                if (!!v.sellAcctCnt || !!v.buyAcctCnt) {
                    return v.txDt;
                }
            });
            this.initChart();
        },
        getData(resp) {
            // this.test();
            let {mainData, id} = resp;
            if (mainData && !mainData.length) {
                return;
            }
            mainData = _.sortBy(mainData, [item => {
                return item.txDt;
            }]);
            // set datazoom
            let dataZoomStartValue = mainData[mainData.length > 20 ? mainData.length - 20 : 0]['txDt'];
            let dataZoomEndValue = mainData[mainData.length - 1]['txDt'];
            this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            let seriesData = [];
            let scatterData1 = [];
            let scatterData2 = [];
            let date = [];
            mainData.forEach(v => {
                date.push(v.txDt);
                seriesData.push(
                    [v.openQuotPrice, v.closeQuotPrice, v.lowestPrice, v.highestPrice, v.txDt, v.bargainQuantity]
                );
            });
            mainData.forEach(v => {
                scatterData1.push([v.txDt, (v.highestPrice * 1.005), '卖出', v.sellAcctCnt, this.currentCustIds]);
                scatterData2.push([v.txDt, (v.lowestPrice * 0.995), '买入', v.buyAcctCnt, this.currentCustIds]);
            });
            this.chartOptions['series'][0]['data'] = seriesData;
            this.chartOptions['series'][1]['data'] = scatterData1;
            this.chartOptions['series'][2]['data'] = scatterData2;
            this.chartOptions['series'][3]['data'] = mainData.map(v => { return v.bargainQuantity; });
            this.chartOptions['xAxis'][0]['data'] = date;
            this.chartOptions['xAxis'][1]['data'] = date;
            // set cust count
            this.chartOptions['visualMap'][0]['max'] = this.currentCustIds.length;
            this.chartOptions['visualMap'][1]['max'] = this.currentCustIds.length;
            this.$store.commit('savechart3', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.getTabIndex});
            this.$refs['chart2'] && this.$refs['chart2'].initChart();
            // 最近交易日，包含买入或卖出
            this.selectMax = _.maxBy(mainData, v => {
                if (!!v.sellAcctCnt || !!v.buyAcctCnt) {
                    return v.txDt;
                }
            });
            sessionStorage.setItem('MAX_DATE', this.selectMax.txDt);
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs['chart2'] && this.$refs['chart2'].initChart();
            this.getAssoCharts(flag);
        },
        getAssoCharts(flag) {
            if (!flag) {
                this.$nextTick(() => {
                    let date = '';
                    if (this.selectMax) {
                        if (this.selectMax.txDt) {
                            date = this.selectMax.txDt;
                        } else {
                            date = sessionStorage.getItem('MAX_DATE');
                        }
                    }
                    console.log('date:', date);
                    this.$emit('getBlock4Data', date);
                });
            }
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
        // let storeData = this.$store.getters.getXGchart3;
        // if (storeData && Object.keys(storeData).length) {
        //     this.initChart(true, storeData);
        // }
    }
};
</script>
