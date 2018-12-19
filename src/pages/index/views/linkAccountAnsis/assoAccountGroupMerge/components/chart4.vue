<template>
    <div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {respData4} from './constants';
// import {getChart4Data} from '@/api/dataAnsis/assoAccountGroupMerge';
// import _ from 'lodash';

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
        },
        currentAccountGroupId: {
            type: [Number, String],
            default: ''
        },
        currentCustIds: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            loading: false,
            txDt: '', // 选择的日期
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
                    enterable: true, // 鼠标进入浮层
                    formatter: param => {
                        if (param.seriesIndex === 0) {
                            console.log(param);
                            // let url = 'https://www.baidu.com';
                            // <a href="${url}" target="_blank" style="cursor:pointer;">百度</a>;
                            return `
                                报单时间： ${param.name}<br>
                                价格： ${param.value}<br>
                            `;
                        } else {
                            return `
                                报单时间： ${param.value[0]}<br>
                                账户号： ${param.value[4]}<br>
                                ${param.value[3]}报单数量： ${param.value[2]}<br>
                            `;
                        }
                    }
                },
                xAxis: {
                    name: '报单时间', // 报单时间
                    type: 'category',
                    data: []
                },
                yAxis: {
                    name: '价格',
                    type: 'value',
                    min: value => {
                        return value.min;
                    },
                    max: value => {
                        return value.max;
                    },
                    splitNumber: 2
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
                        name: '分时报单图',
                        data: [],
                        type: 'line'
                    }
                ]
            }
        };
    },
    methods: {
        getData(resData) {
            this.$store.commit('saveXGchart4', this.chartOptions);
            if (!Object.keys(resData).length) {
                return;
            }
            let {mainData, buysail} = resData;
            // mainData = [{
            //     txTm: '09:01',
            //     currPrice: 5444,
            //     buyCustId1: null,
            //     buyCustId2: null,
            //     buyCustId3: null,
            //     buyCustId4: null,
            //     buyCustId5: null,
            //     buyCustQuantity1: null,
            //     buyCustQuantity2: null,
            //     buyCustQuantity3: null,
            //     buyCustQuantity4: null,
            //     buyCustQuantity5: null,
            //     sellCustId1: null,
            //     sellCustId2: null,
            //     sellCustId3: null,
            //     sellCustId4: null,
            //     sellCustId5: null,
            //     sellCustQuantity1: 1,
            //     sellCustQuantity2: 1,
            //     sellCustQuantity3: 1,
            //     sellCustQuantity4: 1,
            //     sellCustQuantity5: 1,
            // }];
            let lineData = [];
            let timeData = [];
            let colors = [];
            let tableData = JSON.parse(JSON.stringify(buysail));
            // let buy = {};
            // let sail = {};
            // let buyArray = buysail.filter(v => {
            //     return v.bizDir === '买';
            // });
            // let sailArray = buysail.filter(v => {
            //     return v.bizDir === '卖';
            // });
            // buyArray.forEach(v => {
            //     if (!buy[v.custId]) {
            //         buy[v.custId] = [];
            //     }
            //     buy[v.custId].push(v);
            // });
            // sailArray.forEach(v => {
            //     if (!sail[v.custId]) {
            //         sail[v.custId] = [];
            //     }
            //     sail[v.custId].push(v);
            // });
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
                timeData.push(v.txTm.slice(0, 5));
                lineData.push(v.currPrice);
            });
            // set datazoom
            // let dataZoomStartValue = timeData[timeData.length > 50 ? timeData.length - 50 : 0];
            // let dataZoomEndValue = timeData[timeData.length - 1];
            // console.log(dataZoomStartValue);
            // console.log(dataZoomEndValue);
            // this.chartOptions['dataZoom'][0]['startValue'] = dataZoomStartValue;
            // this.chartOptions['dataZoom'][1]['startValue'] = dataZoomStartValue;
            // this.chartOptions['dataZoom'][0]['endValue'] = dataZoomEndValue;
            // this.chartOptions['dataZoom'][1]['endValue'] = dataZoomEndValue;
            this.chartOptions['series'][0]['data'] = lineData;
            let series = this.chartOptions['series'];
            // let maxPrice = _.max(lineData);
            // let minPrice = _.min(lineData);
            // let hPrice = maxPrice + (maxPrice - minPrice) * 0.2;
            // let lPrice = minPrice - (maxPrice - minPrice) * 0.2;
            // console.log(lineData);
            // console.log(maxPrice);
            // console.log(minPrice);
            // console.log(hPrice);
            // console.log(lPrice);
            let data1 = [];
            let data2 = [];
            mainData.forEach(v => {
                for (let i = 0; i < 5; i++) {
                    if (v[`buyCustQuantity${i + 1}`] && v[`buyCustId${i + 1}`]) {
                        data1.push([
                            v.txTm.slice(0, 5), v.currPrice - (i + 1) * 4, v[`buyCustQuantity${i + 1}`], '买入', v[`buyCustId${i + 1}`]
                        ]);
                    }
                    if (v[`sellCustQuantity${i + 1}`] && v[`sellCustId${i + 1}`]) {
                        data2.push([
                            v.txTm.slice(0, 5), v.currPrice + (i + 1) * 4, v[`sellCustQuantity${i + 1}`], '卖出', v[`sellCustId${i + 1}`]
                        ]);
                    }
                }
            });
            console.log(data1);
            console.log(data2);
            for (let i = 0; i < 5; i++) {
                series.push({
                    name: '',
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolSize: 10,
                    itemStyle: itemStyleCommon(i),
                    data: data1,
                    large: true,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
                series.push({
                    name: '',
                    type: 'scatter',
                    symbol: 'triangle',
                    symbolRotate: 180,
                    symbolSize: 10,
                    itemStyle: itemStyleCommon(i),
                    data: data2,
                    large: true,
                    smooth: true,
                    lineStyle: {
                        normal: {opacity: 0.5}
                    }
                });
            }
            this.chartOptions['xAxis']['data'] = timeData;
            this.chartOptions['series'] = series;
            console.log(this.chartOptions);
            this.$emit('updateTableData', tableData, this.index);
            this.chartOptions['legend']['data'] = series.map(v => {
                return v.name;
            });
            this.$store.commit('saveXGchart4', this.chartOptions);
            this.$store.commit('saveChartTableData', tableData, this.index);
            this.initChart();
        },
        initChart(flag, data) {
            if (data) {
                this.chartOptions = data;
            }
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
        let storeData = this.$store.getters.getXGchart4;
        if (storeData && Object.keys(storeData).length) {
            this.initChart(true, storeData);
        }
    }
};
</script>
