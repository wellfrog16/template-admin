<template>
    <div :class="$style.graph_chart">
        <s-card :title="`账户组关系筛选`" :icon="`fa fa-filter`">
            <div slot="right">
                <el-button size="small" type="primary" @click="createData">生成数据</el-button>
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
                                前&nbsp;&nbsp;<el-input v-model="ruleForm.showAccountCount" style="width: 150px;"></el-input>
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
            return len > 5 ? 40 : len < 1 ? 9 : len * 8;
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
                {label: '相关系数', value: '1'},
                // {label: '聚类', value: '2'},
                {label: '基本信息', value: '3'},
                {label: '关系人', value: '4'},
                {label: '其他', value: '5'},
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
                series: [
                    {
                        name: '关系图谱',
                        type: 'graph',
                        layout: 'force',
                        symbolSize: symbolSize,
                        focusNodeAdjacency: true,
                        roam: true,
                        data: [],
                        links: [],
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
            this.chartOptions.series[0]['categories'] = this.checkboxes.map(v => {
                return {name: v.label};
            });
            this.chartOptions.series[0]['categories'].unshift({name: ''}); // 处理checkbox的code从1开始的问题。
            this.chartOptions.series[0]['data'] = val.nodes;
            val.links.forEach(v => {
                if (v.tip.split(',').length > 5) {
                    v.lineStyle = {normal: {color: 'rgba(239, 156, 0)', width: 10}};
                } else if (v.tip.split(',').length > 3) {
                    v.lineStyle = {normal: {color: 'rgba(239, 156, 0)', width: 5}};
                } else {
                    v.lineStyle = {normal: {color: 'rgba(239, 156, 0)', width: 1}};
                }
            });
            this.chartOptions.series[0]['links'] = val.links;
            console.log('******');
            console.log(this.chartOptions);
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
        // test
        let data = {links: [{'source': 'XG000003', 'target': 'XG000002', 'tip': '80001730', 'id': '0', 'lineStyle': {normal: {}}}, {'source': 'XG000003', 'target': 'XG000004', 'tip': '80002861, 002, 003, 0034', 'id': '1'}], nodes: [{'id': 'XG000003', 'name': 'XG000003', 'value': '80002294,80000025', 'category': 1}, {'id': 'XG000002', 'name': 'XG000002', 'value': '80002294,80000025,800000028', 'category': 1}, {'id': 'XG000004', 'name': 'XG000004', 'value': '80010237,80000025', 'category': 2}]};
        this.setChartOptions(data);
    }
};
</script>
<style lang='less' module>
</style>
