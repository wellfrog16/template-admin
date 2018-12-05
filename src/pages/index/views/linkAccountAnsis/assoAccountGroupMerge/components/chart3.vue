<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {chart3ScatterData} from './constants';
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
        currentCustIds: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        let upColor = '#ec0000';
        let upBorderColor = '#8A0000';
        let downColor = '#00da3c';
        let downBorderColor = '#008F28';
        let chart3SymbolSize = 15;
        let itemStyleArray = [{
            normal: {
                color: 'green',
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }, {
            normal: {
                color: 'red',
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
            {name: 'lowest', index: 4, text: '最低价'}
        ];
        return {
            loading: false,
            chartOptions: {
                animation: false,
                // color: ['transparent', '#8A0000'],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'item',
                    axisPointer: {
                        type: 'cross'
                    },
                    formatter: param => {
                        if (param.seriesIndex === 0) {
                            return schema.map((v, i) => {
                                return v.text + ': ' + param.value[i === 0 ? 5 : i];
                            }).join('<br>');
                        } else if (param.seriesIndex === 1) {
                            return param.value[4].map(v => {
                                return `
                        客户编号： ${param.value[4]}<br>
                        ${param.value[3]}笔数： ${param.value[2]}<br>
                        ${param.value[3]}数量 ${param.value[2]}<br>
                    `;
                            }).join('<br>');
                        } else if (param.seriesIndex === 2) {

                        }
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
                    data: ['日K', '卖出', '买入'],
                    textStyle: {
                        color: '#eee'
                    }
                },
                grid: {
                    x: 40,
                    x2: 60,
                    y: 35,
                    y2: 60
                },
                xAxis: {
                    name: '日期',
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
                yAxis: {
                    name: '成交价',
                    scale: true,
                    splitArea: {
                        show: true,
                        areaStyle: {
                            color: ['transparent', 'rgba(4, 58, 127, 0.92)']
                        }
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 50,
                        end: 100,
                    }
                ],
                visualMap: [
                    {
                        left: 'right',
                        top: '3%',
                        dimension: 2,
                        min: 0,
                        max: 50,
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
                            color: ['green'],
                            colorLightness: [1, 0.5]
                        },
                        outOfRange: {
                            // symbolSize: [10, 45],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['green']
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
                        bottom: '24%',
                        dimension: 2,
                        min: 0,
                        max: 50,
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
                            color: ['red'],
                            colorLightness: [1, 0.5]
                        },
                        outOfRange: {
                            // symbolSize: [10, 45],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['red']
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
                        barMaxWidth: 20,
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
                    }
                ]

            }
        };
    },
    methods: {
        getData() {
            this.loading = true;
            this.loading = false;
            let tableData = [
                {date: '2012-01-01', 20180000005: {a: 1, b: 2}}
            ];
            let scatterData = chart3ScatterData;
            let seriesData = [];
            let scatterData1 = [];
            let scatterData2 = [];
            let date = [];
            chart3ScatterData.forEach(v => {
                date.push(v.date);
                seriesData.push(
                    [v.open, v.close, v.lowest, v.highest, v.date]
                );
            });
            scatterData.forEach(v => {
                scatterData1.push([v.date, v.highest, v.count1, '卖出', this.currentCustIds]);
                scatterData2.push([v.date, v.lowest, v.count2, '买入', this.currentCustIds]);
            });
            this.chartOptions['series'][0]['data'] = seriesData;
            this.chartOptions['series'][1]['data'] = scatterData1;
            this.chartOptions['series'][2]['data'] = scatterData2;
            this.chartOptions['xAxis']['data'] = date;
            console.log(this.chartOptions);
            this.initChart();
            this.$emit('updateTableData', tableData, this.index);
            this.$emit('drewChart4');
        },
        initChart() {
            this.$refs['chart2'].initChart();
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    }
};
</script>
