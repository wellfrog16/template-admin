<template>
    <div :class="$style.card_table">
        <s-card :class="$style.a_form_table_bar">
            <div slot="content">
                <s-table
                    sortable
                    :height="450"
                    :loading="loadingTable"
                    :columns="tableColumns"
                    :tableData="tableData"
                    @cellDblClick="tableellDblClick"
                ></s-table>
            </div>
        </s-card>
        <s-card :title="`频繁报撤单分析图`" :icon="`fa fa-user-md`" :class="$style.a_form_table_bar">
            <div slot="content">
                <echarts-common
                    :loading="fullScreenLoading1"
                    domId="AbarEcharts2"
                    :defaultOption="chartOptions"
                    :propsChartHeight="350"
                ></echarts-common>
            </div>
        </s-card>
    </div>
</template>

<script>
    // Bar 柱状图接口
    import {postImportAccounBar} from '@/api/dataAnsis/abnormityAnalysis';
    import EchartsCommon from '@/components/index/common/EchartsCommon';
    import {tableColumns2} from '../components/constants';
    import SCard from '@/components/index/common/SCard';
    import STable from '@/components/index/common/STable';

    export default {
        name: 'Atable2',
        props: {
            tableData2: {
                type: Array,
                required: true
            },
            // 加载
            loadingTable: {
                ttype: Boolean,
                default() {
                    return {};
                }
            }
        },
        components: {
            SCard,
            STable,
            EchartsCommon
        },
        watch: {
            tableData2: {
                handler(val) {
                    if (val) {
                        this.tableData = val;
                    }
                }
            }
        },
        data() {
            return {
                fullScreenLoading1: false, // bar 加载
                aLoading: false,
                tableColumns: tableColumns2,
                tableData: [],
                barEcharts: null,
                chartOptions: {
                    backgroundColor: ['rgba(7, 39, 89)'],
                    // color: ['#00709e', '#007520', '#a7a400', '#ef9c00', '#e8641b', '#df0024', '#009f3c', '#f8f400', '#004e49', '#004e49'],
                    color: [
                        '#00709e',
                        '#f8f400',
                        '#ac10ce',
                        '#ff0000',
                        '#00a8ec',
                        '#ff8a00',
                        '#006624',
                        '#e3007b',
                        '#1929b3',
                        '#b69913'
                    ],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
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
                        left: '4%',
                        right: '5%',
                        bottom: '9%',
                        width: 'auto',
                        height: 'auto',
                        containLabel: true
                    },
                    yAxis: {
                        type: 'value',
                        name: '', // 持仓量
                        splitLine: {
                            lineStyle: {
                                color: ['rgb(20, 53, 98)'] // 网格线颜色
                            }
                        },
                        nameTextStyle: {
                            color: ['#ffffff'], // 字体颜色（y轴标题‘持仓量’）
                            fontSize: 12,
                            fontWeight: 'normal'
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#ffffff', // 金额字体色（Y轴金额）
                                width: 1 // 这里是为了突出显示加上的
                            }
                        }
                    },
                    xAxis: {
                        type: 'category',
                        data: [],
                        left: 'left',
                        axisTick: { show: false },
                        boundaryGap: true,
                        splitLine: { show: false }, //去除网格线
                        axisLabel: {
                            // 字体选择
                            show: true,
                            rotate: 30, // 字体倾斜角度
                            interval: 0, // 间距
                            // x 轴线条颜色
                            axisLine: {
                                lineStyle: { color: 'rgba(255, 330, 86)' }
                            },
                            textStyle: {
                                margin: '10px',
                                color: 'rgba(255, 255, 255)', // 字体颜色（y轴日期）
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
                        }
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
                            xAxisIndex: [0],
                            left: '93%'
                        }
                    ]
                }

            };
        },
        methods: {
            // Bar 柱状图(双击)
            tableellDblClick (row) {
                let rowCustId = [];
                this.clearChartData();
                if (this.tableData2 && this.tableData2.length !== 0) {
                    for (let i = 0; i < this.tableData2.length; i++) {
                        if (this.tableData2[i].acctNum === row.acctNum) {
                            rowCustId.push(this.tableData2[i].custId);
                        }
                    }
                };
                let params = {
                    'accountTeamNo': row.acctNum, // 账户组号
                    'arrCustId': rowCustId, // 客户编号
                    'statTimeBegin': this.$store.getters.momentGetters.statTimeBegin, // 统计起始日
                    'statTimeEnd': this.$store.getters.momentGetters.statTimeEnd, // 统计截止日
                    'contrCode': row.contrCd, // 合约代码
                    'type': '1', // 取值 '1':超仓分析
                };
                this.fullScreenLoading1 = true;
                // Bar 柱状图接口
                postImportAccounBar(params).then(resp => {
                    this.fullScreenLoading1 = false;
                    console.log(resp);
                    this.$store.commit('frequentMut', resp);
                    this.barEchartsDete(resp, '1');
                }).catch(e => {
                    this.fullScreenLoading1 = false;
                });
            },
            clearChartData() {
                this.barEcharts = this.$echarts.init(
                    document.getElementById('AbarEcharts2')
                );
                this.barEcharts.clear();
            },
            barEchartsDete(val, actiName) {
                if (val) {
                    let mainData = [];
                    let temp = [];
                    mainData = val.mainData;
                    // set datazoom
                    let dataZoomStartValue =
                        val.dateList.length > 20
                            ? val.dateList[val.dateList.length - 20]
                            : 0;
                    let dataZoomEndValue = val.dateList[val.dateList.length - 1];
                    this.chartOptions['dataZoom'][0][
                        'startValue'
                        ] = dataZoomStartValue;
                    this.chartOptions['dataZoom'][1][
                        'startValue'
                        ] = dataZoomStartValue;
                    this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
                    this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
                    let basicOptions = {
                        type: 'bar',
                        barMaxWidth: '30',
                        stack: '总量'
                    };
                    let pinName = '';
                    if (actiName == '1') {
                        pinName = '撤单次数';
                    }
                    this.chartOptions.yAxis.name = pinName;
                    Object.keys(mainData).forEach(v => {
                        temp.push({
                            ...{
                                name: v,
                                data: mainData[v].map(m => {
                                    // 频繁报撤销单分析
                                    return (m.acctBillCnt  || 0);
                                })
                            },
                            ...basicOptions
                        });
                    });
                    this.chartOptions.series = temp;
                    this.chartOptions.xAxis.data = val ? val.dateList : [];
                    this.clearChartData();
                    this.barEcharts.setOption(this.chartOptions);
                }
            }
        },
        mounted() {
            this.barEchartsDete();
        }
    }
</script>
<style lang='less' module>
    .card_table {
        margin-top: 5px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        position: relative;
        .a_form_table_bar {
            padding: 0;
            width: 49.3%;
            margin-bottom: 20px;
        }
    }
</style>
