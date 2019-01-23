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
            <div style="cursor: pointer; padding: 10px; color: #f5ff00; text-align: right; font-size: 18px;" class="blink" @click="showSelectList = !showSelectList">
                <i v-if="showSelectList" class="el-icon-d-arrow-right"></i>
                <i v-else class="el-icon-d-arrow-left"></i>
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
            {name: 'name', index: 0},
            {name: 'group', index: 1},
            {name: 'protein', index: 2},
            {name: 'calcium', index: 3},
            {name: 'sodium', index: 4},
            {name: 'id', index: 5}
        ];
        let fieldIndices = schema.reduce(function(obj, item) {
            obj[item.name] = item.index;
            return obj;
        }, {});
        let fieldNames = schema.map(item => {
            return item.name;
        });
        fieldNames = fieldNames.slice(2, fieldNames.length - 1);
        console.log(fieldIndices);
        let config = {
            xAxis3D: 'protein',
            yAxis3D: 'calcium',
            zAxis3D: 'sodium'
        };
        let configParameters = {};
        ['xAxis3D', 'yAxis3D', 'zAxis3D'].forEach(function(fieldName) {
            configParameters[fieldName] = fieldNames;
        });
        let data = [['name1', 'g1', 1, 3, 4, 0], ['name2', 'g2', 4, 5, 11, 1]];

        return {
            config,
            fieldIndices,
            data,
            loading: false,
            showSelectList: true,
            selectModes: ['protein', 'calcium', 'sodium'],
            options: configParameters,
            chartOptions: {
                tooltip: {},
                xAxis3D: {
                    name: config.xAxis3D,
                    type: 'value'
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
                    environment: 'rgba(0, 0, 0, 0.2)',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    axisPointer: {
                        lineStyle: {
                            color: '#ffbd67'
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
                    data: data.map(function(item, idx) {
                        return [
                            item[fieldIndices[config.xAxis3D]],
                            item[fieldIndices[config.yAxis3D]],
                            item[fieldIndices[config.zAxis3D]],
                            idx
                        ];
                    }),
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
            let value = this.selectModes[index];
            let data = this.data.map((item, idx) => {
                return [
                    item[this.fieldIndices[this.selectModes[0]]],
                    item[this.fieldIndices[this.selectModes[1]]],
                    item[this.fieldIndices[this.selectModes[2]]],
                    idx
                ];
            });
            this.chartOptions[key] = {name: value};
            this.chartOptions.series[0].data = data;
            console.log(this.chartOptions);
            this.$refs['chart0'].initChart();
        },
        getData(chartData, id) {
            console.log(this.chartOptions);
            // this.$store.commit('savechart1', {data: this.chartOptions, index: id || this.tabIndex || this.$store.getters.tabIndex});
            // select max
            // this.$emit('updateAccountGroupAndCustIds', chartData['nodes'][0]['name'], chartData['nodes'][0]['value'].split(','));
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
        this.getData();
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

        @keyframes blink {
            from {
                opacity: 1;
            }
            to {
                opacity: 0.3;
            }
        }
        .blink {
            animation: blink 1.5s infinite;
        }
    }
</style>
