// 异常交易分析 Bar 堆叠柱状图

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
                // color: ['#00709e', '#007520', '#a7a400', '#ef9c00', '#e8641b', '#df0024', '#009f3c', '#f8f400', '#004e49', '#004e49'],
                color: ['#00709e', '#f8f400', '#ac10ce', '#ff0000', '#00a8ec', '#ff8a00', '#006624', '#e3007b', '#1929b3', '#b69913'],
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
                        type: 'slider',   // 图表下方的伸缩条
                        show: true,       // 是否显示
                        xAxisIndex: [0],
                        bottom: 0
                    },
                    {
                        type: 'inside',    // 鼠标滚轮
                        xAxisIndex: [0],
                        left: '93%'
                    }
                ],
            }
        };
    },
    create() {
    },
    methods: {
        clearChartData() {
            this.barEcharts = this.$echarts.init(document.getElementById('AbarEcharts'));
            this.barEcharts.clear();
        },

        barEchartsDete(val) {
            if (val) {
                let mainData = [];
                let temp = [];
                mainData = val.mainData;
                // set datazoom
                let dataZoomStartValue = val.dateList.length > 20 ? val.dateList[val.dateList.length - 20] : 0;
                let dataZoomEndValue = val.dateList[val.dateList.length - 1];
                this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
                this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
                this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
                this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
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
                                data: mainData[v].map(m => {
                                    // 超仓分析
                                    // 频繁报撤销单分析
                                    // 自成交分析
                                    return m.netMarkPosQtty || m.acctBillCnt || m.bargainCnt || 0;
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
