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
            {name: 'avgBargainQtty', index: 0},
            {name: 'avgBillCnt', index: 1},
            {name: 'avgBargainRate', index: 2},
            {name: 'avgCancelBillRate', index: 3},
            {name: 'avgOperTmMargin', index: 4},
            {name: 'makePosQtty', index: 5},
            {name: 'acctId', index: 6},
            {name: 'custId', index: 7},
            {name: 'id', index: 8}, // 树形table的id
        ];
        let fieldIndices = schema.reduce(function(obj, item) {
            obj[item.name] = item.index;
            return obj;
        }, {});
        let fieldNames = schema.map(item => {
            return item.name;
        });
        fieldNames = fieldNames.slice(0, 6);
        let config = {
            xAxis3D: '日均成交量',
            yAxis3D: '日均报单次数',
            zAxis3D: '日均成交率'
        };
        let configParameters = {};
        Object.keys(config).forEach(fieldName => {
            configParameters[fieldName] = fieldNames;
        });
        return {
            config,
            fieldIndices,
            loading: false,
            showSelectList: true,
            selectModes: ['avgBargainQtty', 'avgBillCnt', 'avgBargainRate', 'avgCancelBillRate', 'avgOperTmMargin', 'markPosQtty'],
            mapArray: {
                avgBargainQtty: '日均成交量',
                avgBillCnt: '日均报单次数',
                avgBargainRate: '日均成交率',
                avgCancelBillRate: '日均撤单率',
                avgOperTmMargin: '日均操作时间差',
                makePosQtty: '持仓量'
            },
            configParameters: configParameters,
            chartData: [],
            commonSeries: {
                name: '',
                type: 'scatter3D',
                data: [],
                symbolSize: 12,
                // symbol: 'triangle',
                itemStyle: {
                    borderWidth: 1,
                    borderColor: 'rgba(255,255,255,0.8)'
                },
                emphasis: {
                    itemStyle: {
                        color: '#fff'
                    },
                    label: {
                        show: false, // 控制白色悬浮框隐藏
                        textStyle: {
                            color: '#000',
                        }
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
                        let selectModes = this.selectModes;
                        if (JSON.parse(sessionStorage.getItem('LAST_SELECT_3D'))) {
                            selectModes = JSON.parse(sessionStorage.getItem('LAST_SELECT_3D'));
                        }
                        if (data.componentType === 'markLine' || data.componentType === 'markPoint') {
                            return '';
                        }
                        let {value} = data;
                        let str = '';
                        str += `账户组号：${value[3]} \n`;
                        str += `客户号：${value[4]} \n`;
                        str += `${this.mapArray[selectModes[0]]}：${value[0]} \n`;
                        str += `${this.mapArray[selectModes[1]]}：${value[1]} \n`;
                        str += `${this.mapArray[selectModes[2]]}：${value[2]} \n`;
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
            sessionStorage.setItem('LAST_SELECT_3D_ZH', JSON.stringify(this.selectModes));
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
                this.chartData = JSON.parse(sessionStorage.getItem('3D_scatter_chartData_ZH')) || [];
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
                                        item['id']
                                    ],
                                    name: item.custId
                                };
                            })
                        }
                    }
                );
            });
            console.log(this.chartOptions);
            this.$refs['chart2'].initChart();
        },
        drewChart(chartData, id) {
            if (!this.chartOptions) {
                return;
            }
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
                                    value: [v.avgBargainQtty, v.avgBillCnt, v.avgBargainRate, v.acctId, v.custId, v.id],
                                    name: v.custId
                                };
                            })
                        }
                    }
                );
            });
            this.chartData = chartData;
            sessionStorage.setItem('3D_scatter_chartData_ZH', JSON.stringify(chartData));
        },
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val, this.index);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val, this.index);
        }
    },
    mounted() {
        if (JSON.parse(sessionStorage.getItem('LAST_SELECT_3D_ZH'))) {
            this.selectModes = JSON.parse(sessionStorage.getItem('LAST_SELECT_3D_ZH'));
        }
        /* let data = [
            {
                acctId: 'ZH000033',
                custId: '80000039',
                avgBargainQtty: 121,
                avgBillCnt: 33,
                avgBargainRate: 12,
                avgCancelBillRate: 54,
                avgOperTmMargin: 112
            },
            {
                acctId: 'ZH000033',
                custId: '80000033',
                avgBargainQtty: 100,
                avgBillCnt: 12,
                avgBargainRate: 14,
                avgCancelBillRate: 34,
                avgOperTmMargin: 322
            }
        ];
        this.drewChart(data); */
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
