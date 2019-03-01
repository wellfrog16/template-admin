<template>
    <div :class="$style.graph_chart">
        <s-card :title="`账户组关系筛选`" :icon="`fa fa-filter`">
            <div slot="right">
                <el-button size="small" type="primary" :loading="loading" @click="createData">生成关系图谱</el-button>
            </div>
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="140" :inline="true">
                    <el-row>
                        <!-- <el-col :xl="12" :lg="12" :md="12" :sm="24" style="border-right:1px solid rgba(4, 58, 127, 0.92);">
                            <el-form-item prop="sceneTypes" label="场景类型选择：">
                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                <el-checkbox-group v-model="ruleForm.sceneTypes" @change="handleSelectChange" style="padding-left: 110px;">
                                    <el-checkbox v-for="(item, index) in checkboxes" :key="index" :label="String(item.value)">
                                        {{ item.label }}
                                    </el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col> -->
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="padding-left: 20px;">
                            <el-form-item prop="showAccountCount" label="显示账户组数按持仓量排名：">
                                前&nbsp;&nbsp;<el-input clearable size="small" v-model="ruleForm.showAccountCount" style="width: 100px;"></el-input>
                            </el-form-item>

                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="padding-left: 20px;">
                            <el-form-item prop="checkedOverWarehouse" label="">
                                <el-checkbox v-model="ruleForm.checkedOverWarehouse" @change="handleCheckedOverWarehouseChange">仅显示超仓的账户组</el-checkbox>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </s-card>
        <s-card :title="`关系图谱`" :icon="`fa fa-share-alt`">
            <!-- <div slot="right">
                <el-button size="small" type="primary" :loading="loading" @click="createData">生成关系图谱</el-button>
            </div> -->
            <div slot="content">
                <echarts-common
                    ref="chartRef"
                    :loading="loading"
                    loadingText="数据加载时间较长，请耐心等待..."
                    domId="chartId"
                    :defaultOption="chartOptions"
                    :propsChartHeight="550"
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
import _ from 'lodash';
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
        },
        mainTableData: {
            type: Array,
            default() {
                return [];
            }
        },
        selectAccountGroupList: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        // let symbolSize = data => {
        //     let len = data.split(',').length;
        //     return len > 5 ? 35 : len < 1 ? 8 : len * 7;
        // };
        return {
            loading: false,
            childrenMap: {},
            ruleForm: {
                sceneTypes: ['1', '2', '3', '4', '5'],
                showAccountCount: '50',
                checkedOverWarehouse: false // 仅显示超仓账户组
            },
            rules: {
                showAccountCount: [
                    {pattern: /^[0-9]+$/, message: '只能输入数字'}
                ]
            },
            checkboxes: [
                {label: '相关系数', value: 1},
                {label: '聚类', value: 2},
                {label: '基本信息', value: 3},
                {label: '实控关系', value: 4},
                {label: '其他', value: 5},
            ],
            isIndeterminate: false,
            checkAll: true,
            chartOptions: {
                color: [
                    '',
                    '#f8f400',
                    '#40f3d6',
                    '#ce20ff',
                    '#00ff55',
                    '#e4d1bb',
                    '#ff8a00',
                    '#b69913',
                    '#00709e',
                    '#b69913',
                    '#1929b3',
                    '#006624'],
                legend: {
                    data: [],
                    itemGap: 20,
                    left: 'left',
                    top: 'middle',
                    orient: 'vertical'
                },
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '客户编号交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            return '持仓量排名：' + params.data.value + '<br>客户编号: ' + params.data.custIds || '';
                        } else {
                            return '';
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
                visualMap: {
                    left: 'right',
                    inverse: true,
                    textGap: 25,
                    itemHeight: 420,
                    itemWidth: 15,
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
                },
                series: [
                    {
                        name: '关系图谱',
                        type: 'graph',
                        layout: 'force',
                        // symbol: 'path://M30.9,53.2C16.8,53.2,5.3,41.7,5.3,27.6S16.8,2,30.9,2C45,2,56.4,13.5,56.4,27.6S45,53.2,30.9,53.2z M30.9,3.5C17.6,3.5,6.8,14.4,6.8,27.6c0,13.3,10.8,24.1,24.101,24.1C44.2,51.7,55,40.9,55,27.6C54.9,14.4,44.1,3.5,30.9,3.5z M36.9,35.8c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H36c0.5,0,0.9,0.4,0.9,1V35.8z M27.8,35.8 c0,0.601-0.4,1-0.9,1h-1.3c-0.5,0-0.9-0.399-0.9-1V19.5c0-0.6,0.4-1,0.9-1H27c0.5,0,0.9,0.4,0.9,1L27.8,35.8L27.8,35.8z',
                        // symbolSize: symbolSize,
                        focusNodeAdjacency: true,
                        roam: true,
                        data: [],
                        links: [],
                        categories: [],
                        force: {
                            repulsion: 100,
                            edgeLength: [10, 100]
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
            echartsData: [],
            maxIndex: 50,
            computedMaxOverWarehouseIndex: 20
        };
    },
    methods: {
        handleCheckedOverWarehouseChange(val) {
            this.setMaxVisualMap(val);
        },
        setMaxVisualMap(val) {
            if (val) {
                let range = [0, 0];
                if (String(this.computedMaxOverWarehouseIndex) !== '0') {
                    range = [1, this.computedMaxOverWarehouseIndex];
                }
                this.$refs['chartRef'].setVisualMapDataRange(range);
                // this.chartOptions.visualMap.max = this.computedMaxOverWarehouseIndex;
            } else {
                this.$refs['chartRef'].setVisualMapDataRange([1, this.maxIndex]);
            }
        },
        setChartOptions(val) {
            // 增加uid字段
            let allLeaf = [];
            if (this.mainTableData) {
                this.mainTableData.forEach(v => {
                    if (v.children && v.children.length) {
                        let custIds = v.children.map(v => {
                            return v.custId;
                        });
                        custIds = [...new Set(custIds)];
                        let childIds = v.children.map(v => {
                            return v.id;
                        });
                        allLeaf.push({
                            acctId: v.acctId,
                            custIds: custIds,
                            id: v.id
                        });
                        this.childrenMap[v.id] = childIds;
                    }
                });
            }
            if (val && val.nodes) {
                val.nodes.forEach(v => {
                    let index = allLeaf.findIndex(i => {
                        return i.acctId === v.name;
                    });
                    v.custIds = index > -1 ? allLeaf[index]['custIds'].join(',') : '';
                    v.uid = index > -1 ? allLeaf[index]['id'] : '';
                });
                val.nodes.forEach(v => {
                    let len = v.custIds.split(',').length;
                    v.symbolSize = len > 5 ? 35 : len < 1 ? 8 : len * 7;
                });
                this.maxIndex = _.maxBy(val.nodes, v => {
                    return Number(v.value);
                })['value'];
                this.chartOptions.visualMap.max = this.maxIndex;
                this.chartOptions.series[0]['data'] = val.nodes;
                // 计算超仓的排名最大值
                let minData = _.minBy(val.nodes, v => {
                    if (v.acctQttyMax > 100000) {
                        return v.acctQttyMax;
                    }
                });
                this.computedMaxOverWarehouseIndex = minData ? minData['value'] : 0;
            }
            this.chartOptions.legend.data = this.checkboxes.map(v => {
                return v.label;
            });
            this.chartOptions.legend.data.unshift('');
            this.chartOptions.series[0]['categories'] = this.checkboxes.map(v => {
                return {name: v.label};
            });
            this.chartOptions.series[0]['categories'].unshift({name: ''}); // 处理checkbox的code从1开始的问题。
            let lineColor = '#959595';
            if (val && val.links) {
                val.links.forEach(v => {
                    if (v.intersectionRatio <= 0.5) {
                        v.lineStyle = {normal: {color: lineColor, width: 2, type: 'dashed'}};
                    } else if (v.intersectionRatio <= 0.6) {
                        v.lineStyle = {normal: {color: lineColor, width: 4, type: 'solid'}};
                    } else if (v.intersectionRatio <= 0.7) {
                        v.lineStyle = {normal: {color: lineColor, width: 6, type: 'solid'}};
                    } else if (v.intersectionRatio <= 0.8) {
                        v.lineStyle = {normal: {color: lineColor, width: 8, type: 'solid'}};
                    } else if (v.intersectionRatio <= 0.9) {
                        v.lineStyle = {normal: {color: lineColor, width: 10, type: 'solid'}};
                    } else {
                        v.lineStyle = {normal: {color: lineColor, width: 12, type: 'solid'}};
                    }
                });
                this.chartOptions.series[0]['links'] = val.links;
            }
            this.$refs['chartRef'].initChart();
            setTimeout(() => {
                this.setMaxVisualMap(this.ruleForm.checkedOverWarehouse);
            });
        },
        initChart(options) {
            this.chartOptions = options;
            this.$refs['chartRef'].initChart();
        },
        handleEchartClickEvent(params) {
            // 增加勾选标志
            let currentId = params['data']['uid'];
            if (this.selectAccountGroupList.indexOf(currentId) > -1) { // 取消选中
                // mark 样式
                let data = this.chartOptions['series'][0]['data'];
                data.forEach(v => {
                    if (v.uid === currentId) {
                        v.itemStyle = {borderColor: 'transparent', borderWidth: 1};
                    }
                });
                this.chartOptions['series'][0]['data'] = data;
                // table勾选状态
                let selectAccountGroupList = this.selectAccountGroupList.filter(v => {
                    return v !== currentId && this.childrenMap[currentId].indexOf(v) === -1;
                });
                this.$emit('updateSelectAccountGroupList', selectAccountGroupList);
            } else { // 选中
                // mark 样式
                let data = this.chartOptions['series'][0]['data'];
                data.forEach(v => {
                    if (v.uid === currentId) {
                        v.itemStyle = {borderColor: '#fff', borderWidth: 2};
                    }
                });
                this.chartOptions['series'][0]['data'] = data;
                // table勾选状态
                let selectAccountGroupList = JSON.parse(JSON.stringify(this.selectAccountGroupList));
                selectAccountGroupList.push(currentId);
                this.$emit('updateSelectAccountGroupList', selectAccountGroupList);
            }
            this.$refs['chartRef'].initChart();
        },
        handleEchartDblClickEvent(item) {
            if (item.dataType === 'node') {
                let params = {
                    acctId: item.name,
                    accNumList: item.data['custIds'], // 客户编号（逗号分隔）
                    relativeTable: this.relativeTable, // 相关性临时表名
                    resultTable: this.resultTable // 结果集临时表名
                };
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
                    this.loading = true;
                    createRelationChart(params).then(resp => {
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
        /* let value = {nodes: [{'id': 'XG000005', 'name': 'XG000005', 'value': 23, 'category': 1, 'custIds': '11,22,33'}, {'id': 'XG000002', 'name': 'XG000002', 'value': 23, 'category': 2, 'custIds': '11,22,33'}, {'id': 'XG000003', 'name': 'XG000003', 'value': 77, 'category': 3, 'custIds': '22,44,55,66,77'}], links: [{target: 'XG000002', source: 'XG000003', tip: '787', intersectionRatio: 0.6}]};
        for (let i = 6; i < 30; i++) {
            value.nodes.push({
                id: 'XG00000' + i,
                name: 'XG00000' + i,
                value: i,
                category: i % 5,
                custIds: '9, 99, 7'
            });
            value.links.push({
                target: 'XG00000' + i, source: 'XG00000' + (i - 1), tip: '787', intersectionRatio: 0.6
            });
        }
        this.setChartOptions(value); */
    }
};
</script>
<style lang='less' module>
</style>
