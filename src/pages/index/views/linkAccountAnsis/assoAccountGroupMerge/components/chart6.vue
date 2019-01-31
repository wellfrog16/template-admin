<template>
    <div class="scene2-1">
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
        <div class="select-container">
            <div v-if="showSelectList">
                <div v-for="(item, key, index) in configParameters" :key="index">
                    <span>{{ key.slice(0, 1) }}：</span> <!-- xyz -->
                    <el-select v-model="selectModes[index]" @change="handleSelectChange(key, index)" :popper-append-to-body="!fullscreen">
                        <el-option v-for="(it, i) in item" :key="i" :label="mapArray[it]" :value="it">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div style="cursor: pointer; padding: 10px; color: #f5ff00; font-size: 18px; text-align: right; margin-left: 15px;" @click="showSelectList = !showSelectList">
                <i v-if="showSelectList" class="el-icon-d-arrow-right to-right" style="position: relative;"></i>
                <i v-else class="el-icon-d-arrow-left to-left" style="position: relative;"></i>
            </div>
        </div>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {echartsDefault} from '@/assets/style/common/theme/echart';
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
        },
        fullscreen: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        fullscreen(val) {
            // 清除select-down位置
            this.showSelectList = false;
            setTimeout(() => {
                this.showSelectList = true;
            }, 500);
        }
    },
    data() {
        let schema = [
            {name: 'bargainQtty', index: 0},
            {name: 'billCnt', index: 1},
            {name: 'bargainRate', index: 2},
            {name: 'billRate', index: 3},
            {name: 'avgOperTmMargin', index: 4},
            {name: 'acctQttyMax', index: 5},
            {name: 'acctId', index: 6},
            {name: 'custId', index: 7},
            {name: 'custIds', index: 8},
            {name: 'id', index: 9}, // 树形table的id
        ];
        let fieldIndices = schema.reduce(function(obj, item) {
            obj[item.name] = item.index;
            return obj;
        }, {});
        let fieldNames = schema.map(item => {
            return item.name;
        });
        fieldNames = fieldNames.slice(0, fieldNames.length - 4);
        let config = {
            xAxis3D: '日均成交量',
            yAxis3D: '日均报单次数',
            zAxis3D: '日均成交率'
        };
        let configParameters = {};
        Object.keys(config).forEach(function(fieldName) {
            configParameters[fieldName] = fieldNames;
        });
        return {
            config,
            fieldIndices,
            loading: false,
            showSelectList: true,
            selectModes: ['bargainQtty', 'billCnt', 'bargainRate', 'billRate', 'avgOperTmMargin', 'acctQttyMax'],
            mapArray: {
                bargainQtty: '日均成交量',
                billCnt: '日均报单次数',
                bargainRate: '日均成交率',
                billRate: '日均撤单率',
                avgOperTmMargin: '日均操作时间差',
                acctQttyMax: '持仓量'
            },
            configParameters: configParameters,
            chartData: [],
            commonSeries: {
                name: '',
                type: 'scatter3D',
                data: [],
                symbolSize: 16,
                // symbol: 'triangle',
                // itemStyle: {
                //     color: '#40f3d6',
                //     borderWidth: 1,
                //     borderColor: 'rgba(255,255,255,0.8)'
                // },
                emphasis: {
                    itemStyle: {
                        color: '#fff'
                    },
                    label: {
                        show: false, // 控制白色悬浮框隐藏
                        // textStyle: {
                        //     color: '#000',
                        // }
                    }
                }
            },
            chartOptions: {
                legend: {
                    type: 'scroll',
                    itemGap: 20,
                    left: 10,
                    top: 'middle',
                    orient: 'vertical',
                    data: []
                },
                tooltip: {
                    enterable: true,
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
                        str += `客户号：${value[4]} \n`;
                        str += `${this.mapArray[this.selectModes[0]]}：${value[0]} \n`;
                        str += `${this.mapArray[this.selectModes[1]]}：${value[1]} \n`;
                        str += `${this.mapArray[this.selectModes[2]]}：${value[2]} \n`;
                        return str;
                    }
                },
                xAxis3D: {
                    name: config.xAxis3D,
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 14,
                        fontWeight: 600
                    }
                },
                yAxis3D: {
                    name: config.yAxis3D,
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 14,
                        fontWeight: 600
                    }
                },
                zAxis3D: {
                    name: config.zAxis3D,
                    type: 'value',
                    nameTextStyle: {
                        fontSize: 14,
                        fontWeight: 600
                    }
                },
                grid3D: {
                    environment: '#000',
                    boxWidth: 100,
                    boxHeight: 80,
                    // postEffect: {
                    //     enable: true,
                    //     // depthOfField: {
                    //     //     enable: true
                    //     // },
                    //     screenSpaceAmbientOcclusion: {
                    //         enable: true
                    //     }
                    // },
                    axisLine: {
                        lineStyle: {
                            color: '#00f9ff'
                        }
                    },
                    axisPointer: {
                        lineStyle: {
                            color: '#ffbd67'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#3a3636'
                        }
                    },
                    viewControl: {
                        // autoRotate: true
                        // projection: 'orthographic'
                    }
                },
                series: []
            }
        };
    },
    methods: {
        handleSelectChange(key, index) {
            let value = this.selectModes[index];
            // let xyz = ['xAxis3D', 'yAxis3D', 'zAxis3D'];
            // if (this.selectModes[index] === 'custId') {
            //     this.chartOptions[xyz[index]]['type'] = 'category';
            // } else {
            //     this.chartOptions[xyz[index]]['type'] = 'value';
            // }
            this.chartOptions[key]['name'] = this.mapArray[value];
            this.chartOptions.series = [];
            if (this.chartData && !this.chartData.length) {
                this.chartData = JSON.parse(sessionStorage.getItem('3D_scatter_chartData')) || [];
            }
            Object.keys(this.chartData).forEach((key, index) => {
                this.chartOptions['series'].push(
                    {
                        ...this.commonSeries,
                        ...{
                            name: key,
                            data: this.chartData[key].map(item => {
                                return {
                                    value: [
                                        item[this.selectModes[0]],
                                        item[this.selectModes[1]],
                                        item[this.selectModes[2]],
                                        item['acctId'],
                                        item['custId'],
                                        item['custIds'],
                                        item['id']
                                    ],
                                    name: item.custId
                                };
                            })
                        }
                    }
                );
            });
            this.$refs['chart0'].initChart();
        },
        getData(chartData, id) {
            if (!this.chartOptions) {
                return;
            }
            // select max;
            let maxItem = _.maxBy(chartData, 'acctQttyMax');
            this.$emit('updateAccountGroupAndCustIds', maxItem['acctId'], maxItem['custIds'].split(','));
            chartData = _.groupBy(chartData, 'acctId');
            Object.keys(chartData).forEach((key, index) => {
                this.chartOptions['legend']['data'].push(key);
                this.chartOptions['series'].push(
                    {
                        ...this.commonSeries,
                        ...{
                            name: key,
                            data: chartData[key].map(v => {
                                return {
                                    value: [v.bargainQtty, v.billCnt, v.bargainRate, v.acctId, v.custId, v.custIds, v.id],
                                    name: v.custId
                                };
                            })
                        }
                    }
                );
            });
            console.log(this.chartOptions);
            this.chartData = chartData;
            sessionStorage.setItem('3D_scatter_chartData', JSON.stringify(chartData));
            this.$store.commit('savechart1', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.tabIndex});

            this.$refs['chart0'] && this.$refs['chart0'].initChart();
        },
        initChart(data, flag) {
            if (data) {
                this.chartOptions = data;
            }
            console.log(this.chartOptions);
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
            this.getAssoCharts(flag);
        },
        getAssoCharts(flag) {
            if (!flag) {
                this.$emit('getDetailBy3D');
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
    .scene2-1 {
        position: relative;
        .select-container {
            position: absolute;
            right: 0;
            top: 0;
        }

        @keyframes to-right {
            from {
                opacity: 1;
                right: 15px;
            }
            to {
                opacity: 0.3;
                right: 0;
            }
        }

        @keyframes to-left {
            from {
                opacity: 0.3;
                right: 0;
            }
            to {
                opacity: 1;
                right: 15px;
            }
        }
        .to-right {
            animation: to-right 1.5s infinite;
        }
        .to-left {
            animation: to-left 1.5s infinite;
        }
    }
</style>
