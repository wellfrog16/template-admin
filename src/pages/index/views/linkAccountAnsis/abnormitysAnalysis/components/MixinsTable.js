// 异常交易分析 Bar 堆叠柱状图
import barEchartsA from 'echarts';
export default {
    name: 'mixin.js',
    props: [],
    components: {},
    mixins: [],
    data() {
        return {};
    },
    create() {
        // this.getForm();
    },
    methods: {
        barEchartsDete(val, CustId) {
            // console.log(CustId);
            let valData = [];     // 日期
            let valName = [];     // 账户
            let valDataArr = [];  // 数据
           if(val){
               for (let i = 0; i < val.length; i++){
                   if(val[i].custId){
                       console.log(val)
                       console.log(CustId)
                       // console.log(valData.push(val[i].txDay));
                       // console.log(valName.push(val[i].qtty));
                       // console.log(valDataArr.push(val[i].custId));

                       // console.log(val[i].netMarkPosQtty);
                       // console.log(val[i].qtty);
                       // console.log(val[i].txDay);
                   }else {
                       console.log(222);
                   }
               }
           }else {
               console.log('无结果');
           }



            let barEcharts = barEchartsA.init(document.getElementById('AbarEcharts'));
            let option = {
                backgroundColor:['rgba(7, 39, 89)'],
                color: ['rgba(239, 156, 0)', 'rgba(16, 148, 119)', '#4162ff'],
                barWidth:50,   // 柱状图的宽度
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
                series: [
                    {
                        name: '账户1',
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
                                formatter: function() {
                                    return '限仓线';
                                }
                            },
                            data: [
                                [
                                    {
                                        yAxis: '300',
                                        symbol: 'none',
                                        x: '7%'
                                    },
                                    {
                                        yAxis: '300',
                                        symbol: 'none',
                                        x: '93%'
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
