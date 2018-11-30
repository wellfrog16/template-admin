// 异常交易分析 Bar 堆叠柱状图
import barEchartsA from 'echarts';

export default {
    name: 'mixin.js',
    props: [],
    components: {},
    mixins: [],
    data() {
        return {
            barEcharts: null,
            markLingOping: {
                markLine: {
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid', color: 'red'
                            }
                        }
                    },
                    label: {
                        show: true,
                        formatter: function () {
                            return '限仓线';
                        }
                    },
                    data: [

                        {
                            yAxis: '',
                            symbol: 'none',
                            x: '7%'
                        },
                        {
                            yAxis: '',
                            symbol: 'none',
                            x: '93%'
                        }

                    ]
                },
            },
            chartOptions: {
                backgroundColor: ['rgba(7, 39, 89)'],
                color: ['rgba(239, 156, 0)', 'rgba(16, 148, 119)', '#4162ff'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    inactiveColor: '#455579',
                    width: '80%',
                    top: '5',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12,
                    }
                },

                // 柱状图高度
                grid: {
                    left: '4%',
                    right: '5%',
                    bottom: '9%',
                    width: 'auto',
                    height: 'auto',
                    containLabel: true,
                },
                yAxis: {
                    type: 'value',
                    name: '持仓量',
                    splitLine: {
                        lineStyle: {
                            color: ['rgb(20, 53, 98)']   // 网格线颜色
                        }
                    },
                    nameTextStyle: {
                        color: ['#ffffff'],  // 字体颜色（y轴标题‘持仓量’）
                        fontSize: 12,
                        fontWeight: 'normal',
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ffffff',   // 金额字体色（Y轴金额）
                            width: 1,  // 这里是为了突出显示加上的
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: [],
                    left: 'left',
                    axisTick: {show: false},
                    boundaryGap: true,
                    splitLine: {show: false},//去除网格线
                    axisLabel: {   // 字体选择
                        show: true,
                        rotate: 30,    // 字体倾斜角度
                        interval: 0,   // 间距
                        // x 轴线条颜色
                        axisLine: {
                            lineStyle: {color: "rgba(255, 330, 86)"}
                        },
                        textStyle: {
                            margin: '10px',
                            color: 'rgba(255, 255, 255)',  // 字体颜色（y轴日期）
                            fontSize: 12
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#0087ED',
                            width: 1,  // 这里是为了突出显示加上的
                        }
                    }
                },
                series: [],
                // 横向滚动条
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        bottom: 0,
                        start: 1,
                        end: 10
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        left: '93%',
                        start: 29,
                        end: 36
                    }
                ],
            }
        };
    },
    create() {
    },
    methods: {
        clearChartData() {
            this.barEcharts = barEchartsA.init(document.getElementById('AbarEcharts'));
            this.barEcharts.clear();
        },

        barEchartsDete(val) {
            if (val) {
                let mainData = [];
                let temp = [];
                mainData = val.mainData;
                let basicOptions = {
                    type: 'bar',
                    barMaxWidth: '30',
                    stack: '总量'
                }
                if (val && val.qtty) {
                    this.markLingOping.markLine.data[0].yAxis = val.qtty;
                    this.markLingOping.markLine.data[1].yAxis = val.qtty;
                    basicOptions = {...basicOptions, ...this.markLingOping};
                }
                Object.keys(mainData).forEach(v => {
                    temp.push(
                        {
                            ...{
                                name: v,
                                //
                                data: mainData[v].map(m => {
                                    // 超仓分析
                                    // 频繁报撤销单分析
                                    // 自成交分析
                                    return m.netMarkPosQtty || m.acctBillCnt || m.bargainCnt;
                                })
                            }, ...basicOptions
                        }
                    )
                });
                this.chartOptions.series = temp;
                this.chartOptions.xAxis.data = val ? val.dateList : [];
                this.barEcharts.setOption(this.chartOptions);
            }
        }
        ,
    }
};