<template>
    <div class="scene2-1">
        <echarts-common :loading="loading" :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
        <div class="select-container">
            <div v-for="(item, key, index) in options" :key="index" v-show="showSelectList">
                <span>{{ key }}:</span>
                <el-select v-model="selectModes[index]" @change="handleSelectChange(key, index)">
                    <el-option v-for="(it, i) in item" :key="i" :label="it" :value="it">
                    </el-option>
                </el-select>
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
        }
    },
    data() {
        let schema = [
            {name: 'custId', index: 0},
            {name: 'data1', index: 1},
            {name: 'data2', index: 2},
            {name: 'data3', index: 3},
            {name: 'acctId', index: 4}
        ];
        let fieldIndices = schema.reduce(function(obj, item) {
            obj[item.name] = item.index;
            return obj;
        }, {});
        let fieldNames = schema.map(item => {
            return item.name;
        });
        fieldNames = fieldNames.slice(0, fieldNames.length - 1);
        console.log(fieldIndices);
        let config = {
            xAxis3D: 'custId',
            yAxis3D: 'data1',
            zAxis3D: 'data2'
        };
        let configParameters = {};
        ['xAxis3D', 'yAxis3D', 'zAxis3D'].forEach(function(fieldName) {
            configParameters[fieldName] = fieldNames;
        });
        return {
            config,
            fieldIndices,
            loading: false,
            showSelectList: true,
            selectModes: ['custId', 'data1', 'data2', 'data3'],
            options: configParameters,
            chartOptions: {
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
                        str += `账户组号：${value[4]} \n`;
                        str += `客户号：${value[0]} \n`;
                        str += `data1：${value[1]} \n`;
                        str += `data2：${value[2]} \n`;
                        str += `data3：${value[3]} \n`;
                        return str;
                    }
                },
                xAxis3D: {
                    name: config.xAxis3D,
                    type: 'category'
                },
                yAxis3D: {
                    name: config.yAxis3D,
                    type: 'value'
                },
                zAxis3D: {
                    name: config.zAxis3D,
                    type: 'value'
                },
                grid3D: {
                    environment: 'rgba(0, 0, 0)',
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
                            color: '#959595'
                        }
                    },
                    viewControl: {
                        // autoRotate: true
                        // projection: 'orthographic'
                    }
                },
                series: [{
                    name: '聚类',
                    type: 'scatter3D',
                    data: [],
                    symbolSize: 12,
                    // symbol: 'triangle',
                    itemStyle: {
                        color: '#40f3d6',
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.8)'
                    },
                    emphasis: {
                        itemStyle: {
                            color: '#fff'
                        }
                    }
                }]
            }
        };
    },
    methods: {
        handleSelectChange(key, index) {
            let xyz = ['xAxis3D', 'yAxis3D', 'zAxis3D'];
            let value = this.selectModes[index];
            if (this.selectModes[index] === 'custId') {
                this.chartOptions[xyz[index]]['type'] = 'category';
            } else {
                this.chartOptions[xyz[index]]['type'] = 'value';
            }
            console.log(this.selectModes);
            let data = this.data.map((item, idx) => {
                return [
                    item[this.fieldIndices[this.selectModes[0]]],
                    item[this.fieldIndices[this.selectModes[1]]],
                    item[this.fieldIndices[this.selectModes[2]]]
                ];
            });
            this.chartOptions[key]['name'] = value;
            this.chartOptions.series[0].data = data;
            this.$refs['chart0'].initChart();
        },
        getData(chartData, id) {
            console.log(chartData);
            if (!this.chartOptions) {
                return;
            }
            this.chartOptions['series'][0]['data'] = this.data = chartData.map(v => {
                return [v.custId, v.data1, v.data2, v.data3, v.acctId];
            });
            this.$store.commit('savechart1', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.tabIndex});
            // select max
            // this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['value'].split(','));
            this.$emit('updateAccountGroupAndCustIds', 'JL2018090903', ['2018888888']);
            this.$refs['chart0'] && this.$refs['chart0'].initChart();
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
                this.$emit('getBlock4Data');
            }
        },
        handleEchartClickEvent(val) {
            console.log(val);
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
                opacity: 1;
                right: 0;
            }
            to {
                opacity: 0.3;
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
