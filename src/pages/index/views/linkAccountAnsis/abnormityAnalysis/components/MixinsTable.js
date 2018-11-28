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
                barWidth: 50,   // 柱状图的宽度
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
                series: []
            }
        };
    },
    create() {
    },
    methods: {
        barEchartsDete(val, cra) {
            if (val) {
                console.log(val.mainData);
                let ss = {
                    mainData: {
                        '1000': [
                            {custId: "2018000001", netMarkPosQtty: 300, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 300, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 300, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 300, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 300, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"}
                        ],
                        '1001': [
                            {custId: "2018000001", netMarkPosQtty: 400, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 400, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 400, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 400, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 400, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"}
                        ],
                        '1002': [
                            {custId: "2018000001", netMarkPosQtty: 130, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 130, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 130, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 130, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 130, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"}
                        ],
                        '1003': [
                            {custId: "2018000001", netMarkPosQtty: 3600, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 3600, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 3600, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 3600, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"},
                            {custId: "2018000001", netMarkPosQtty: 3600, qtty: 10000, xDay: "2017-06-04T16:00:00.000+0000"}
                        ]
                    }
                };
                console.log(ss.mainData);
                let mainData = ss.mainData;
                // let mainData = val.mainData;
                let temp = [];
                // console.log(Object.keys(mainData))
                Object.keys(mainData).forEach(v => {
                    console.log(v);
                    temp.push(
                        {
                            name: v,
                            type: 'bar',
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
                                            yAxis: val.qtty,
                                            symbol: 'none',
                                            x: '7%'
                                        },
                                        {
                                            yAxis: val.qtty,
                                            symbol: 'none',
                                            x: '93%'
                                        }
                                    ]
                                ]
                            },
                            data: mainData[v].map(m => {
                                console.log(m.netMarkPosQtty);
                                return m.netMarkPosQtty;
                            })
                        }
                    )
                })
                this.chartOptions.series = temp;
                let barEcharts = barEchartsA.init(document.getElementById('AbarEcharts'));
                barEcharts.setOption(this.chartOptions);
            }
            }
        ,
        }
    };
