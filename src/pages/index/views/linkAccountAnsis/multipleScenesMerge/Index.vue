<template>
    <div :class="$style.multiple_scenes_merge">
        <el-tabs v-model="activeTab" type="card">
            <el-tab-pane
                v-for="item in tabList"
                :label="item.label"
                :key="item.name"
                :name="item.name"
            ></el-tab-pane>
        </el-tabs>
        <!--导入树形table-->
        <account-group-table ref="accountGroupTableRef" @updateLoading="updateLoading" @updateTableInfo="updateTableInfo" @updateMainTableData="updateMainTableData" @updateSelectAccountGroupList="updateSelectAccountGroupList" @handleClearAll="handleClearAll"></account-group-table>
        <!-- 关系图谱 -->
        <graph-chart ref="graphChartRef" :relativeTable="relativeTable" :resultTable="resultTable" :mainTableData="mainTableData" :selectAccountGroupList="selectAccountGroupList" @getBlockData="getBlockData" @updateSelectAccountGroupList="updateSelectAccountGroupList"></graph-chart>
        <!-- 账户组钻取 -->
        <div>
            <el-row :gutter="10">
                <el-col :xl="12" :lg="12" :md="24" :sm="24" v-for="(item, index) in blocks" :key="index">
                    <s-card :title="item.title" :icon="item.icon" class="self-card-css" :loading="item.loading">
                        <div slot="right">
                            <el-button type="text" @click="toggleDetail(item, index)" v-if="index !== 2">
                                <span v-if="!item['toggleDetailFlags']">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></span>
                                <span v-else>图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i></span>
                            </el-button>
                        </div>
                        <div slot="content" style="min-height: 300px;">
                            <div v-if="item['toggleDetailFlags']">
                                <s-table :height="300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <div v-else>
                                <block1 ref="block1" v-if="index === 0" :index="index" :tableData="block1TableData"></block1>
                                <block2 ref="block2" v-if="index === 1" :index="index"></block2>
                                <block3 ref="block3" v-if="index === 2" :index="index"></block3>
                                <block4 ref="block4" v-if="index === 3" :index="index"></block4>
                            </div>
                        </div>
                    </s-card>
                </el-col>
            </el-row>
        </div>
        <div style="text-align:center; margin: 20px 0;">
            <el-button size="small" type="primary" style="width: 100px;" @click="nextStep">下一步</el-button>
        </div>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import graphChart from './components/graphChart'; // 全量关系图谱组件
import accountGroupTable from './components/accountGroupTable'; // 账户组信息table组件
import block1 from './components/block1'; // 钻取
import block2 from './components/block2';
import block3 from './components/block3';
import block4 from './components/block4';
import {chartTableColumns1, chartTableColumns2, chartTableColumns3, chartTableColumns4, blocks} from './components/constants';
import {fetchBlockData1, fetchBlockData2, fetchBlockData4} from '@/api/dataAnsis/multipleScenesMerge';
export default {
    name: 'Index',
    components: {
        graphChart,
        accountGroupTable,
        SCard,
        STable,
        block1,
        block2,
        block3,
        block4
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    mixins: [],
    // 存储数据
    data() {
        return {
            blocks,
            mainTableData: [],
            selectAccountGroupList: [],
            chartTableColumns: [chartTableColumns1, chartTableColumns2, chartTableColumns3, chartTableColumns4],
            chartTableData: [[], [], [], []],
            chartData: [[], [], [], []],
            activeTab: '0',
            tabList: [{name: '0', label: '手工合并'}],
            loading: false,
            block1TableData: [], // 矩阵数据
            relativeTable: '',
            resultTable: ''
        };
    },
    computed: {},
    watch: {},
    methods: {
        updateLoading(flag) {
            this.loading = flag;
        },
        updateTableInfo(val) {
            const {relativeTable, resultTable} = val;
            this.relativeTable = relativeTable;
            this.resultTable = resultTable;
        },
        updateMainTableData(val) {
            this.mainTableData = val;
        },
        updateSelectAccountGroupList(val) {
            this.selectAccountGroupList = val;
            this.$refs['accountGroupTableRef'].selectAccountGroupList = val;
        },
        handleClearAll() {
            // mark 样式
            let data = this.$refs['graphChartRef'].chartOptions['series'][0]['data'];
            data.forEach(v => {
                v.itemStyle = {borderColor: 'transparent', borderWidth: 1};
            });
            this.$refs['graphChartRef'].chartOptions['series'][0]['data'] = data;
            // table勾选状态
            this.updateSelectAccountGroupList([]);
            this.$refs['graphChartRef'].initChart(this.$refs['graphChartRef'].chartOptions);
        },
        toggleDetail(item, index) {
            this.blocks[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
            if (!item.toggleDetailFlags) {
                this.$nextTick(() => {
                    setTimeout(() => {
                        (this.getChart()[index])(this.chartData[index], 1);
                    });
                });
            }
        },
        getChart() {
            return [() => {}, this.getChart2, () => {}, this.getChart4];
        },
        getChart2(data) {
            setTimeout(() => {
                this.$refs['block2'] && this.$refs['block2'][0] && this.$refs['block2'][0].drewChart(data);
            });
        },
        getChart4(data) {
            setTimeout(() => {
                this.$refs['block4'] && this.$refs['block4'][0] && this.$refs['block4'][0].drewChart(data);
            });
        },
        getBlockData(propsParams) {
            this.commonParams = propsParams;
            this.getBlockData1(propsParams);
            this.getBlockData2(propsParams);
            // this.getBlockData3(propsParams);
            this.getBlockData4(propsParams);
        },
        getBlockData1(propsParams) {
            let params = propsParams;
            this.blocks[0]['loading'] = true;
            fetchBlockData1(params).then(resp => {
                this.blocks[0]['loading'] = false;
                const {mainData, tableData} = resp;
                this.chartTableData[0] = tableData;
                this.block1TableData = mainData;
            }).catch(e => {
                this.blocks[0]['loading'] = false;
            });
        },
        getBlockData2(propsParams) {
            let params = propsParams;
            this.blocks[1]['loading'] = true;
            fetchBlockData2(params).then(resp => {
                this.blocks[1]['loading'] = false;
                const {tableData, nodes, links} = resp;
                this.chartTableData[1] = tableData;
                this.chartData[1] = {nodes, links};
                this.getChart2({nodes, links});
            }).catch(e => {
                this.blocks[1]['loading'] = false;
            });
        },
        getBlockData4(propsParams) {
            let params = propsParams;
            this.blocks[3]['loading'] = true;
            fetchBlockData4(params).then(resp => {
                this.blocks[3]['loading'] = false;
                const {tableData, nodes, links} = resp;
                this.chartTableData[3] = tableData;
                this.chartData[3] = {nodes, links};
                this.getChart4({nodes, links});
            }).catch(e => {
                this.blocks[3]['loading'] = false;
            });
        },
        nextStep() {
            this.$confirm('离开本页面信息将丢失，是否确定离开?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$router.push({name: 'abnormity'});
                });
        }
    }
};
</script>
<style lang='less' module>
    .multiple_scenes_merge {
        .self-card-css {
            /deep/.el-card__body {
                padding: 10px;
            }
        }
    }

</style>
