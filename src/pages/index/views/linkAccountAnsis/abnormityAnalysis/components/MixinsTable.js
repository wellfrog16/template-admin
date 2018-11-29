// 异常交易分析 Bar 堆叠柱状图
import barEchartsA from 'echarts';

export default {
    name: 'mixin.js',
    props: [],
    components: {},
    mixins: [],
    data() {
        return {
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
                    bottom: '8%',
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
                    name: '日期',
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
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        bottom: 0
                    },
                    {
                        type: 'inside',
                        xAxisIndex: [0]
                    }
                ]
            }
        };
    },
    create() {
    },
    methods: {
        barEchartsDete(val, cra) {
            if (!val) {
                // console.log(val);
                // console.log(val.dateList); // 日期
                // console.log(val.qtty);  // 限仓线

                // netMarkPosQtty;//净持仓数量  111
                // qtty;//限仓数量




                // cy:
                //     acctBillCnt;// 账户撤单次数
                // acctMajorAmtBill;//账户大额撤单次数

                // acctBillCnt: 0
                // acctMajorAmtBill: 0
                // custId: "20180000012"
                // txDay: "2017-04-17T16:00:00.000+0000"
                //
                // cy:
                //     bargainCnt;//自成交次数
                // bargainQtty;//账户自成交数量

                // bargainCnt: 0
                // bargainQtty: 0
                // custId: "20180000175"
                // txDay: "2017-08-20T16:00:00.000+0000"


                // let mainData = ss.mainData;
                let mainData = val.mainData;
                let temp = [];
                Object.keys(mainData).forEach(v => {
                    console.log(v.txDay);
                    this.chartOptions.xAxis.data.push(v.txDay);
                    temp.push(
                        {
                            name: v,
                            type: 'bar',
                            barMaxWidth: '30',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
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
                                    [
                                        {
                                            yAxis: val ? val.qtty : '2000',
                                            symbol: 'none',
                                            x: '7%'
                                        },
                                        {
                                            yAxis: val ? val.qtty : '2000',
                                            symbol: 'none',
                                            x: '93%'
                                        }
                                    ]
                                ]
                            },
                            data: mainData[v].map(m => {
                                return m.netMarkPosQtty;
                            })
                        }
                    )
                })
                this.chartOptions.series = temp;
                this.chartOptions.xAxis.data = val ? val.dataList : [];

                let barEcharts = barEchartsA.init(document.getElementById('AbarEcharts'));
                barEcharts.clear();
                barEcharts.setOption(this.chartOptions);
            }
        }
        ,
    }
};
