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
            chartSeriesCommon: {
                name: '',
                type: 'graph',
                layout: 'force',
                symbolSize: 15,
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
                        show: true,
                        textStyle: {
                            fontSize: 12
                        }
                    }
                }
            },
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
                series: []
            },
            echartsData: []
        };
    },
    methods: {
        setChartOptions(val) {
            this.chartOptions.legend.data = [];
            this.chartOptions.series = [];
            for (let i = 0; i < val.length; i++) {
                this.chartOptions.series.push({
                    ...this.chartSeriesCommon,
                    ...{
                        name: val[i]['name'],
                        data: val[i]['nodes'],
                        links: val[i]['links'],
                    }
                });
                this.chartOptions.legend.data.push(val[i]['name']);
            }
            console.log('******');
            console.log(this.chartOptions.series);
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
        let data = [
            {name: '相关性系数', links: [{'source': 'XG000017', 'target': 'XG000030', 'tip': '80001730'}, {'source': 'XG000006', 'target': 'XG000034', 'tip': '80002861'}], nodes: [{'id': 'XG000002', 'name': 'XG000002', 'value': '80002294,80000025', 'categories': '1'}, {'id': 'XG000004', 'name': 'XG000004', 'value': '80010237,80000025', 'categories': '1'}]},
            {name: '基本信息', links: [{'source': 'XG000017', 'target': 'XG000030', 'tip': '80001730'}, {'source': 'XG000006', 'target': 'XG000034', 'tip': '80002861'}], nodes: [{'id': 'XG000002', 'name': 'XG000002', 'value': '80002294,80000025', 'categories': '3'}, {'id': 'XG000004', 'name': 'XG000004', 'value': '80010237,80000025', 'categories': '3'}]},
            {name: '关系人', links: [], nodes: []},
            {name: '其他', links: [], nodes: []}
        ];
        this.setChartOptions(data);
    }
};
</script>
<style lang='less' module>
</style>
