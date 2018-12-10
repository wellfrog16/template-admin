<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {respData4} from './constants';
import {getChart4Data} from '@/api/dataAnsis/assoAccountGroupMerge';

export default {
    components: {EchartsCommon},
    props: {
        index: {
            type: [String, Number],
            default: '3'
        },
        commonReqParams: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            loading: false,
            chartOptions: {
                grid: {
                    x: 40,
                    x2: 60,
                    y: 60,
                    y2: 60
                },
                legend: {
                    data: []
                },
                tooltip: {
                    trigger: 'item',
                    formatter: param => {
                        if (param.seriesIndex === 0) {
                            console.log(param);
                            return `
                                时间点： ${param.name}<br>
                                价格： ${param.value}<br>
                            `;
                        } else {
                            return `
                                时间点： ${param.value[0]}<br>
                                账户号： ${param.value[4]}<br>
                                ${param.value[3]}交易量： ${param.value[2]}<br>
                            `;
                        }
                    }
                },
                xAxis: {
                    name: '时间点',
                    type: 'category',
                    data: []
                },
                yAxis: {
                    name: '价格',
                    type: 'value'
                },
                dataZoom: [
                    {
                        type: 'inside'
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%'
                    }
                ],
                series: [
                    {
                        name: '分时图',
                        data: [],
                        type: 'line'
                    }
                ]

            }
        };
    },
    methods: {
        getData() {
            this.loading = true;
            // let params = this.commonReqParams;
            let params = {
                contrCode: 'cu1712',
                statTimeBegin: '2017-02-20',
                statTimeEnd: '2017-10-09',
                accountTeamNo: 'XG00001',
                custId: '80006298, 80003998, 80003172'
            };
            params.txDt = '2017-03-16';
            getChart4Data(params).then(resp => {
                this.loading = false;
                this.initChart(resp);
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        initChart(resp) {
            let {mainData, buysail} = resp;
            let lineData = [];
            let timeData = [];
            let colors = [];
            let buy = {};
            let sail = {};
            let buyArray = buysail.filter(v => {
                return v.bizDir === '买';
            });
            let sailArray = buysail.filter(v => {
                return v.bizDir === '卖';
            });
            buyArray.forEach(v => {
                if (!buy[v.custId]) {
                    buy[v.custId] = [];
                }
                buy[v.custId].push(v);
            });
            sailArray.forEach(v => {
                if (!sail[v.custId]) {
                    sail[v.custId] = [];
                }
                sail[v.custId].push(v);
            });
            let itemStyleCommon = i => {
                return {
                    normal: {
                        color: colors[i],
                        opacity: 0.8,
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                };
            };
            mainData.forEach(v => {
                timeData.push(v.time.slice(-5));
                lineData.push(v.price);
            });
            // set datazoom
            // let dataZoomStartValue = mainData[mainData.length > 50 ? mainData.length - 50 : 0]['time'];
            // let dataZoomEndValue = mainData[mainData.length - 1]['time'];
            // this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            // this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            // this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            // this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            this.chartOptions['series'][0]['data'] = lineData;
            let series = this.chartOptions['series'];
            Object.keys(buy).forEach((v, i) => {
                let data = buy[v].map(m => {
                    return [m.declBillTm2.slice(-5), m.declBillPrice - (i + 1) * 2, m.declBillQtty, '买入', v];
                });
                series.push({
                    name: `${v}`,
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolSize: 10,
                    itemStyle: itemStyleCommon(i),
                    data: data,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
            });
            Object.keys(sail).forEach((v, i) => {
                let data = sail[v].map(m => {
                    return [m.declBillTm2.slice(-5), m.declBillPrice + (i + 1) * 2, m.declBillQtty, '卖出', v];
                });
                series.push({
                    name: `${v}`,
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolRotate: 180,
                    symbolSize: 10,
                    itemStyle: itemStyleCommon(i),
                    data: data,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
            });
            this.chartOptions['xAxis']['data'] = timeData;
            this.chartOptions['series'] = series;
            // console.log(this.chartOptions);
            // this.$emit('updateTableData', tableData, this.index);
            this.chartOptions['legend']['data'] = series.map(v => {
                return v.name;
            });
            this.$refs['chart3'] && this.$refs['chart3'].initChart();
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
