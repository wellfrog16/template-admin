<template>
    <div :class="$style.graph_chart">
        <s-card :title="`账户组关系筛选`" :icon="`fa fa-filter`">
            <div slot="right">
                <el-button size="small" type="primary" @click="createData">生成关系图谱</el-button>
            </div>
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="border-right:1px solid rgba(4, 58, 127, 0.92);">
                            <el-form-item prop="sceneTypes" label="场景类型选择：">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                <el-checkbox-group v-model="ruleForm.sceneTypes" @change="handleSelectChange" style="padding-left: 110px;">
                                    <el-checkbox v-for="(item, index) in checkboxes" :key="index" :label="item.value">
                                        {{ item.label }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="padding-left: 20px;">
                            <el-form-item prop="showAccountCount" label="显示账户组数：">
                                前&nbsp;&nbsp;<el-input clearable size="small" v-model="ruleForm.showAccountCount" style="width: 150px;"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </s-card>
        <s-card :title="`关系图谱`" :icon="`fa fa-share-alt`">
            <div slot="content">
                <echarts-common
                    ref="chartRef"
                    :loading="loading"
                    domId="chartId"
                    :defaultOption="chartOptions"
                    :propsChartHeight="350"
                    @handleEchartClickEvent="handleEchartClickEvent"
                    @handleEchartDblClickEvent="handleEchartDblClickEvent"
                ></echarts-common>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {createRelationChart} from '@/api/dataAnsis/multipleScenesMerge';
export default {
    name: 'graphChart',
    components: {
        SCard,
        EchartsCommon
    },
    props: {
        relativeTable: {
            type: String,
            default: ''
        },
        resultTable: {
            type: String,
            default: ''
        }
    },
    data() {
        let symbolSize = data => {
            let len = data.split(',').length;
            return len > 5 ? 35 : len < 1 ? 8 : len * 7;
        };
        return {
            loading: false,
            ruleForm: {
                sceneTypes: ['1', '3', '4', '5'],
                showAccountCount: '50'
            },
            rules: {
                showAccountCount: [
                    {pattern: /^[0-9]+$/, message: '只能输入数字'}
                ]
            },
            checkboxes: [
                {label: '相关系数', value: 1},
                {label: '聚类', value: '2'},
                {label: '基本信息', value: 3},
                {label: '关系人', value: 4},
                {label: '其他', value: 5},
            ],
            isIndeterminate: false,
            checkAll: true,
            chartOptions: {
                legend: {data: []},
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '客户编号交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            return '客户编号: ' + params.value || '';
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:300px; white-space:pre-wrap; word-break: break-all;'
                },
                animationEasingUpdate: 'quinticInOut',
                animation: false,
                // visualMap: {
                //     left: 'right',
                //     textGap: 10,
                //     itemHeight: 200,
                //     itemWidth: 10,
                //     bottom: '22%',
                //     // dimension: 4, // 注意：对应映射索引
                //     type: 'continuous',
                //     min: 0,
                //     max: 1000,
                //     text: ['持仓量', ''],
                //     realtime: false,
                //     calculable: true,
                //     // color: ['orangered', 'yellow', 'lightskyblue'],
                //     textStyle: {
                //         color: 'yellow'
                //     }
                // },
                series: [
                    {
                        name: '关系图谱',
                        type: 'graph',
                        layout: 'force',
                        // symbol: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                        symbolSize: symbolSize,
                        focusNodeAdjacency: true,
                        roam: true,
                        data: [],
                        links: [{source: 'XG000002', target: 'XG000003', tip: '11'}],
                        categories: [],
                        force: {
                            repulsion: 200,
                            edgeLength: [100, 200]
                        },
                        draggable: true,
                        label: {
                            normal: {
                                position: 'right',
                                textStyle: {
                                    fontSize: 12
                                }
                            }
                        }
                    }
                ]
            },
            echartsData: []
        };
    },
    methods: {
        setChartOptions(val) {
            this.chartOptions.legend.data = this.checkboxes.map(v => {
                return v.label;
            });
            this.chartOptions.legend.data.unshift('');
            this.chartOptions.series[0]['categories'] = this.checkboxes.map(v => {
                return {name: v.label};
            });
            this.chartOptions.series[0]['categories'].unshift({name: ''}); // 处理checkbox的code从1开始的问题。
            this.chartOptions.series[0]['data'] = val.nodes;
            console.log(this.chartOptions);
            let lineColor = 'rgba(255, 68, 68, 1)';
            val.links.forEach(v => {
                if (v.tip.split(',').length > 5) {
                    v.lineStyle = {normal: {color: lineColor, width: 10}};
                } else if (v.tip.split(',').length > 3) {
                    v.lineStyle = {normal: {color: lineColor, width: 5}};
                } else {
                    v.lineStyle = {normal: {color: lineColor, width: 1}};
                }
            });
            this.chartOptions.series[0]['links'] = val.links;
            this.$refs['chartRef'].initChart();
        },
        handleEchartClickEvent() {},
        handleEchartDblClickEvent(item) {
            console.log(item);
            if (item.dataType === 'node') {
                let params = {
                    accNumList: item.data['value'], // 客户编号（逗号分隔）
                    relativeTable: this.relativeTable, // 相关性临时表名
                    resultTable: this.resultTable // 结果集临时表名
                };
                console.log(params);
                this.$emit('getBlockData', params);
            }
        },
        handleSelectChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.checkboxes.length;
            this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkboxes.length;
        },
        handleCheckAllChange(value) {
            this.ruleForm.sceneTypes = value ? this.checkboxes.map(v => { return v.value; }) : [];
            this.isIndeterminate = false;
        },
        createData() {
            if (!this.relativeTable) {
                this.$message.error('请先生成结果集后再生成关系图谱');
                return;
            }
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    let params = {
                        accRelations: this.ruleForm.sceneTypes.join(','),
                        resultNum: this.ruleForm.showAccountCount.trim() || '50',
                        relativeTable: this.relativeTable,
                        resultTable: this.resultTable,
                    };
                    console.log(params);
                    this.loading = true;
                    createRelationChart(params).then(resp => {
                        console.log(resp);
                        this.loading = false;
                        this.echartsData = resp;
                        this.setChartOptions(resp);
                    }).catch(e => {
                        console.error(e);
                        this.loading = false;
                    });
                }
            });
        }
    },
    mounted() {
        // let value = {nodes: [{'id': 'XG000002', 'name': 'XG000002', 'value': '99', 'category': 2, 'qt': 33}, {'id': 'XG000003', 'name': 'XG000003', 'value': '999', 'category': 3, 'qt': 999}], links: []};
        // this.setChartOptions(value);
    }
};
</script>
<style lang='less' module>
</style>
