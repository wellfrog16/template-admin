<template>
    <div style="position: relative;">
        <div class="fiter-form">
            <el-checkbox v-model="checked" @change="handleCheckedOverWarehouseChange">只显示超仓账户组</el-checkbox>
        </div>
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import _ from 'lodash';
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
        },
        sceneType: {
            type: [Number, String],
            default: 1
        },
        tabIndex: {
            type: [String, Number],
            default: '0'
        },
        propsChartHeight: {
            type: [String, Number],
            default: 300
        }
    },
    data() {
        /* let symbolSize = data => {
            let len = data.split(',').length;
            return len > 5 ? 35 : len < 1 ? 8 : len * 7;
        }; */
        return {
            loading: false,
            chartOptions: {
                color: String(this.sceneType) === '3' ? ['#ce20ff', '#e7b0ea'] : ['#00ff55', '#a3fbed'],
                legend: {
                    data: [],
                    itemGap: 20,
                    left: 'left',
                    top: 'middle',
                    orient: 'vertical',
                    tooltip: {
                        show: true,
                        formatter: params => {
                            if (params.name === '重要信息') {
                                if (String(this.sceneType) === '3') {
                                    return '（联系地址相同）或（联系电话相同）或（身份证相同）';
                                } else if (String(this.sceneType) === '4') {
                                    return '（同一投资经理）或（同一投资顾问）或（同一权益持有人）';
                                }
                            }
                        }
                    }
                },
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '客户编号交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            return '持仓量排名：' + params.data.value + '<br>客户编号: ' + params.data.custIds || '';
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:200px; white-space:pre-wrap; word-break: break-all',
                },
                animation: false,
                series: [
                    {
                        name: '关系图谱',
                        type: 'graph',
                        layout: 'force',
                        data: [],
                        links: [],
                        categories: [],
                        draggable: true,
                        // symbolSize: symbolSize,
                        focusNodeAdjacency: true,
                        roam: true,
                        label: {
                            normal: {
                                position: 'right'
                            }
                        },
                        force: {
                            repulsion: 100
                        }
                    }
                ],
                visualMap: {
                    left: 'right',
                    inverse: true,
                    textGap: 25,
                    itemHeight: 240,
                    itemWidth: 10,
                    bottom: '5%',
                    // dimension: 4, // 注意：对应映射索引
                    type: 'continuous',
                    min: 1,
                    max: 50,
                    text: ['', '持仓量排名'],
                    realtime: false,
                    calculable: true,
                    // color: ['orangered', 'yellow', 'lightskyblue'],
                    textStyle: {
                        color: '#fb7171'
                    },
                    inRange: {
                        symbol: 'circle'
                    },
                    outOfRange: {
                        symbol: 'circle',
                        color: ['rgba(255,255,255,.2)']
                    },
                    controller: {
                        inRange: {
                            color: ['#f30808', '#fff']
                        }
                    }
                }
            },
            maxIndex: 50,
            computedMaxOverWarehouseIndex: 20,
            checked: false
        };
    },
    methods: {
        handleCheckedOverWarehouseChange(val) {
            this.setMaxVisualMap(val);
        },
        setMaxVisualMap(val) {
            if (val) {
                let range = [];
                let id = this.tabIndex || this.$store.getters.tabIndex;
                let sessionIndex = sessionStorage.getItem(`computedMaxOverWarehouseIndex${id}`) || this.computedMaxOverWarehouseIndex;
                if (sessionIndex) {
                    range = [1, sessionIndex];
                } else {
                    range = [0, 0];
                }
                this.$refs['chart0'].setVisualMapDataRange(range);
            } else {
                this.$refs['chart0'].setVisualMapDataRange([1, this.maxIndex]);
            }
        },
        getData(chartData, id) {
            if (!chartData.nodes) {
                return;
            }
            // 过滤超仓
            this.maxIndex = _.maxBy(chartData['nodes'], v => {
                return Number(v.value);
            })['value'];
            this.chartOptions.visualMap.max = this.maxIndex;
            // 计算超仓的排名最大值
            let minData = _.minBy(chartData['nodes'], v => {
                if (v.acctQttyMax > 100000) {
                    return v.acctQttyMax;
                }
            });
            this.computedMaxOverWarehouseIndex = minData ? minData['value'] : null;
            // 切换明细后index丢失
            sessionStorage.setItem(`computedMaxOverWarehouseIndex${id || this.tabIndex || this.$store.getters.tabIndex}`, this.computedMaxOverWarehouseIndex);
            this.setMaxVisualMap(this.checked);
            chartData.nodes.forEach(v => {
                let len = v.custIds.split(',').length;
                v.symbolSize = len > 5 ? 35 : len < 1 ? 8 : len * 7;
            });
            // 设置连线样式
            let lineColor = '#959595';
            chartData.links.forEach(v => {
                if (v.tip.split(',').length > 5) {
                    v.lineStyle = {normal: {color: lineColor, width: 10}};
                } else if (v.tip.split(',').length > 3) {
                    v.lineStyle = {normal: {color: lineColor, width: 5}};
                } else {
                    v.lineStyle = {normal: {color: lineColor, width: 1}};
                }
            });
            // 关系图数据处理
            this.chartOptions['series'][0]['links'] = chartData['links'];
            this.chartOptions['series'][0]['data'] = chartData['nodes'];
            this.chartOptions.legend.data = ['重要信息', '次要信息'];
            this.chartOptions['series'][0]['categories'] = this.chartOptions.legend.data.map(v => {
                return {name: v};
            });
            this.$store.commit('savechart1', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.tabIndex});
            // select max
            this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['custIds'].split(','));
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
        },
        sortDataByAcctIdCommon(data) {
            return _.sortBy(data, [item => { return item.acctId; }]);
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
            this.getAssoCharts(flag);
        },
        getAssoCharts(flag) {
            if (!flag) {
                this.$emit('getBlock2Data');
                this.$emit('getBlock3Data');
            }
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
    }
};
</script>
<style lang="less" scoped>
    .fiter-form {
        position: absolute;
        left: 10px;
        top: 10px;
    }
</style>
