<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {resData1} from './constants';
export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '0'
        },
        childrenMap: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        let itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };
        let symbolSize = data => {
            return data[2] > 40 ? 40 : data[2];
        };
        return {
            loading: false,
            chartOptions: {
                // legend: {
                //     y: 'top',
                //     data: ['北京', '上海', '广州'],
                //     textStyle: {
                //         color: '#fff',
                //         fontSize: 16
                //     }
                // },
                grid: {
                    x: 40,
                    x2: 60,
                    y: 35,
                    y2: 60
                },
                tooltip: {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:150px; white-space:pre-wrap;',
                    formatter: data => {
                        if (data.componentType === 'markLine' || data.componentType === 'markPoint') {
                            return '';
                        }
                        let {value} = data;
                        let str = '';
                        str += `账户组号：${value[3]} \n`;
                        str += `持仓量：${value[0]} \n`;
                        str += `相关系数：${value[1]} \n`;
                        str += `子账户数：${value[2]} \n`;
                        str += `合约代码：${value[4]} \n`;
                        // str += `子账户号：${value[5].replace(',', \n')} \n`;
                        return str;
                    }
                },
                xAxis: {
                    type: 'value',
                    name: '持仓量',
                    nameGap: 16,
                    minInterval: 1,
                    splitLine: {
                        show: false
                    },
                    axisLabel: {
                        show: true,
                        verticalAlign: 'middle'
                    }
                },
                yAxis: [{
                    type: 'value',
                    name: '相关系数',
                    minInterval: 0.1,
                    nameLocation: 'end',
                    nameGap: 20,
                    splitLine: {
                        show: false
                    }
                }],
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        xAxisIndex: [0],
                        bottom: 0,
                        start: 50,
                        end: 100
                    },
                    // {
                    //     type: 'slider',
                    //     show: true,
                    //     yAxisIndex: [0],
                    //     right: 0,
                    //     // start: 29,
                    //     // end: 36
                    // },
                    {
                        type: 'inside',
                        xAxisIndex: [0],
                        start: 50,
                        end: 100
                    },
                    // {
                    //     type: 'inside',
                    //     yAxisIndex: [0],
                    //     // start: 29,
                    //     // end: 36
                    // }
                ],
                series: [
                    {
                        name: '账户组持仓量相关系数',
                        type: 'effectScatter',
                        showEffectOn: 'hover',
                        rippleEffect: {
                            scale: 2
                        },
                        itemStyle: itemStyle,
                        symbolSize: symbolSize,
                        data: [],
                        markLine: { // 标记线设置
                            lineStyle: {
                                normal: {
                                    type: 'dashed',
                                    color: '#ec0000'
                                }
                            },
                            label: {
                                formatter: params => {
                                    return `超仓线：${params.value}`;
                                }
                            },
                            symbolSize: 0, // 控制箭头和原点的大小、官方默认的标准线会带远点和箭头
                            data: [ // 设置条标准线——x=10
                                {xAxis: 5000}
                            ]
                        },
                        markPoint: {
                            symbol: 'arrow',
                            symbolSize: 10,
                            data: [],
                            itemStyle: {
                                color: '#fff'
                            }
                        }
                    }
                ]

            }
        };
    },
    methods: {
        getData() {
            let resData = this.$store.getters.sceneCommitResp;
            // let resData = resData1;
            this.initChart(resData);
        },
        initChart(resData) {
            let {mainTableData, chartData} = resData;
            this.mainTableData = mainTableData;
            let allLeaf = [];
            mainTableData.forEach(v => {
                if (v.children && v.children.length) {
                    let custIds = v.children.map(v => {
                        return v.custId;
                    });
                    let childIds = v.children.map(v => {
                        return v.id;
                    });
                    allLeaf.push({
                        acctId: v.acctId,
                        custIds: custIds,
                        id: v.id
                    });
                    this.childrenMap[v.id] = childIds;
                }
            });
            chartData.forEach(v => {
                let index = allLeaf.findIndex(i => {
                    return i.acctId === v.acctId;
                });
                v.custIds = index > -1 ? allLeaf[index]['custIds'].join(',') : '';
                v.id = index > -1 ? allLeaf[index]['id'] : '';
            });
            // let selectMax = _.max(chartData, v => {
            //     return v.custQtty
            // })
            this.chartOptions['series'][0]['data'] = chartData.map(v => {
                return [v.acctGroOpenInt, v.acctGroAvgRela, v.custQtty, v.acctId, v.contrCd, v.custIds, v.id];
            });
            console.log(this.chartOptions);
            this.$emit('updateTableData', chartData, this.index);
            this.$emit('updateMainTableData', mainTableData, this.index);
            // select max
            this.$emit('updateAccountGroupAndCustIds', 'XG000001', ['80001716', '80000025', '80001461']);
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
            this.$nextTick(() => {
                this.$emit('drewChart2');
                this.$emit('drewChart3');
            });
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
        this.getData();
    }
};
</script>
