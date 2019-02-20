<template>
    <div :class="$style.card_table">
        <echarts-common
            ref="myChart"
            :loading="loading1"
            loadingText="数据加载时间较长，请耐心等待..."
            domId="AbarEcharts1"
            :defaultOption="chartOptions"
            :propsChartHeight="420"
        ></echarts-common>
    </div>
</template>

<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {echartsDefault} from '@/assets/style/common/theme/echart';
export default {
    name: 'Atable1',
    props: {
        loading1: {
            type: Boolean
        }
    },
    components: {EchartsCommon},
    watch: {},
    data() {
        return {
            Echarts1Loading1: false, // bar 加载
            barEcharts: null,
            markLingOping: {
                markLine: {
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                type: 'solid',
                                color: '#fff'
                            }
                        }
                    },
                    label: {
                        position: 'middle',
                        show: true,
                        formatter: function() {
                            return '超仓线';
                        }
                    },
                    data: [
                        {
                            yAxis: '',
                            symbol: 'none',
                            x: '10%'
                        }
                    ]
                }
            },
            chartOptions: {
                // backgroundColor: ['rgba(7, 39, 89)'],
                // color: [
                //     '#f8f400',
                //     '#ff0000',
                //     '#00709e',
                //     '#ac10ce',
                //     '#00a8ec',
                //     '#ff8a00',
                //     '#006624',
                //     '#e3007b',
                //     '#1929b3',
                //     '#b69913'
                // ],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'
                    }
                },
                legend: {
                    type: 'scroll',
                    inactiveColor: '#455579',
                    width: '80%',
                    top: '5',
                    textStyle: {
                        color: '#ffffff',
                        fontSize: 12
                    }
                },
                // 柱状图高度
                grid: {
                    x: 40,
                    x2: 60,
                    y: 60,
                    y2: 60
                },
                yAxis: {
                    type: 'value',
                    name: '持仓量', // 持仓量
                    splitLine: {
                        lineStyle: {
                            color: ['rgb(20, 53, 98)'] // 网格线颜色
                        }
                    },
                    // nameTextStyle: {
                    //     color: ['#ffffff'], // 字体颜色（y轴标题‘持仓量’）
                    //     fontSize: 12,
                    //     fontWeight: 'normal'
                    // },
                    // axisLine: {
                    //     lineStyle: {
                    //         color: '#ffffff', // 金额字体色（Y轴金额）
                    //         width: 1 // 这里是为了突出显示加上的
                    //     }
                    // }
                },
                xAxis: {
                    name: '日期',
                    type: 'category',
                    data: [],
                    left: 'left',
                    axisTick: {show: false},
                    // boundaryGap: true,
                    splitLine: {show: false}, // 去除网格线
                    /* axisLabel: {
                        // 字体选择
                        show: true,
                        rotate: 30, // 字体倾斜角度
                        interval: 0, // 间距
                        // x 轴线条颜色
                        axisLine: {
                            lineStyle: {color: 'rgba(255, 330, 86)'}
                        },
                        textStyle: {
                            margin: '10px',
                            color: '#ffffff', // 字体颜色（y轴日期）
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
                            width: 1 // 这里是为了突出显示加上的
                        }
                    } */
                },
                series: [],
                // 横向滚动条
                dataZoom: [
                    {
                        type: 'slider', // 图表下方的伸缩条
                        show: true, // 是否显示
                        xAxisIndex: [0],
                        bottom: 0
                    },
                    {
                        type: 'inside', // 鼠标滚轮
                        xAxisIndex: [0]
                    }
                ]
            }
        };
    },
    methods: {
        initChart() {
            // this.clearChartData();
            this.barEchartsDete();
        },
        clearChartData() {
            /*  this.barEcharts = this.$echarts.init(
                document.getElementById('AbarEcharts1')
            );
            this.barEcharts.clear(); */
            this.$refs['myChart'].clearChart();
        },
        barEchartsDete(val, actiName) {
            let over = val;
            if (!val) {
                val = this.$store.getters.overStoreGetters;
            } else {
                val = over;
            }
            if (Object.keys(val).length !== 0) {
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
                    barMaxWidth: '45',
                    stack: '总量'
                };
                if (val && val.qtty) {
                    this.markLingOping.markLine.data[0].yAxis = val.qtty;
                    basicOptions = {...basicOptions, ...this.markLingOping};
                }
                Object.keys(mainData).forEach((v, i) => {
                    temp.push({
                        ...{
                            itemStyle: {
                                color: echartsDefault[i],
                            },
                            name: v,
                            data: mainData[v].map(m => {
                                // 超仓分析
                                return (m.multiBillMakePosQtty || 0);
                            }),
                        },
                        ...basicOptions,
                    });
                    temp.push({
                        ...{
                            itemStyle: {
                                color: echartsDefault[i],
                            },
                            name: v,
                            data: mainData[v].map(m => {
                                // 超仓分析
                                return (-m.billMakePosQtty || 0);
                            }),
                        },
                        ...basicOptions,
                    });
                });
                this.chartOptions.series = temp;
                this.chartOptions.xAxis.data = val ? val.dateList : [];
                // this.barEcharts.setOption(this.chartOptions);
                this.$refs['myChart'].initChart();
            }
        },
    },
    mounted() {
    },
};
</script>

<style lang='less' module></style>
