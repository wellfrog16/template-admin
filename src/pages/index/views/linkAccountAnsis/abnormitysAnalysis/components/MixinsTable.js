// 异常交易分析 Bar1 图
import barEchartsA from 'echarts';
export default {
    name: 'mixin.js',
    props: [],
    components: {},
    mixins: [],
    data() {
        return {
            option: {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        };
    },
    create() {
        // this.getForm();
    },
    methods: {
        barEchartsDete() {
            let barEcharts = barEchartsA.init(document.getElementById('AbarEcharts'));
            let option = {
                backgroundColor:['rgba(7, 39, 89)'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['账户1', '账户2', '账户3'],
                    textStyle: {
                        fontWeight: 'normal',
                        color: '#ffffff',
                        fontSize: 12,
                    },
                },
                // 柱状图高度
                grid: {
                    // left: '3%',
                    // right: '4%',
                    // bottom: '3%',
                    // containLabel: true,
                    left: '4%',
                    right: '5%',
                    bottom: '8%',
                    width: 'auto',
                    height: 'auto',
                    containLabel: true,
                },
                yAxis: {
                    type: 'value',
                    name:'持仓量',
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
                            width:1,  // 这里是为了突出显示加上的
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    data: ['9月01号', '02号', '03号', '04号', '05号', '06号', '07号'],
                    name: '日期',
                    left: 'left',
                    axisTick: {show: false},
                    boundaryGap: true,
                    splitLine: { show: false },//去除网格线
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
                    axisLine: {
                        lineStyle: {
                            color: '#0087ED',
                            width: 1,  // 这里是为了突出显示加上的
                        }
                    }
                },
                series: [
                    {
                        name: '账户1',
                        type: 'bar',
                        stack: '总量',
                        barWidth:50,   // 柱状图的宽度
                        itemStyle:{
                            normal:{
                                color:'rgba(239, 156, 0)',  // 柱状图颜色 黄色
                            }
                        },
                        label: {
                            show: true,
                            name: '限仓线',
                            position: 'right',
                            formatter: function() {
                                return '限仓线';
                            },
                            normal: {
                                show: true,
                                position: 'insideRight'
                            },
                            data: [
                                [
                                    {
                                        yAxis: '700',
                                        symbol: 'none',
                                        x: '5%'
                                    },
                                    {
                                        yAxis: '700',
                                        symbol: 'none',
                                        x: '96%'
                                    }
                                ]
                            ]
                        },
                        data: [320, 302, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '账户2',
                        type: 'bar',
                        stack: '总量',
                        barWidth:50,   // 柱状图的宽度
                        itemStyle:{
                            normal:{
                                color:'rgba(4, 109, 154)',  // 柱状图颜色 蓝色
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '账户3',
                        type: 'bar',
                        stack: '总量',
                        barWidth:50,   // 柱状图的宽度
                        itemStyle:{
                            normal:{
                                color:'rgba(16, 148, 119)',  // 柱状图颜色 绿色
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },

                ]
            };
            barEcharts.setOption(option);
        },
    }
};
