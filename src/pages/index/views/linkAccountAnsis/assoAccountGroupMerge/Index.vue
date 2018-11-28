<template>
    <div class="asso-account-group-merge">
        <div class="top-nav">
            <el-tabs type="card" v-model="activeTab" @tab-click="handleTabClick">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name" :label="item.label">
                </el-tab-pane>
            </el-tabs>
            <div class="tabs-button">
                <el-row>
                    <span style="margin-right: 10px;">导入结果集：</span>
                    <el-select class="custom-width" clearable size="small" v-model="resultIds">
                        <el-option
                            v-for="item in resultList"
                            :key="item.resultId"
                            :label="item.resultName"
                            :value="item.resultId">
                        </el-option>
                    </el-select>
                </el-row>
            </div>
        </div>
        <div v-if="activeTab==='0'">
            <el-row :gutter="10">
                <el-col :span="12" v-for="(item, index) in charts" :key="index">
                    <s-card :title="item.title" :icon="item.icon">
                        <div slot="right">
                            <el-button type="text" @click="toggleDetail(item)">明细<i class="el-icon-plus" style="margign-left: 5px;"></i></el-button>
                        </div>
                        <div slot="content">
                            <div v-if="item['toggleDetailFlags']">
                                <s-table :height="300" :columns="chartTableColumns[index]" :tableData="chartTableData[index]"></s-table>
                            </div>
                            <echarts-common v-else :ref="`chart${index}`" :domId="`chart${index}`" :defaultOption="chartOptions[index]" :propsChartHeight="300" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
                        </div>
                    </s-card>
                </el-col>
            </el-row>
            <div class="main-table">
                <s-card title="账户组信息" icon="el-icon-edit">
                    <div slot="right">
                        <el-input class="search-input" size="mini" placeholder="请输入账户组或客户编号" v-model="searchText" @keyup.enter.native="handleSearch">
                            <i class="el-icon-search" slot="prefix" @click="handleSearch" style="margin-left:4px; cursor: pointer;"></i>
                        </el-input>
                    </div>
                    <div slot="content">
                        <el-row :gutter="20">
                            <el-col :span="21">
                                <div style="overflow:auto; max-height:400px;">
                                    <tree-table :filterText="searchText" :columns="mainTableColumns" :tableData="mainTableData"></tree-table>
                                </div>
                            </el-col>
                            <el-col :span="3">
                                <div class="operate-button-group">
                                    <el-button type="danger" size="small">删除</el-button>
                                    <br>
                                    <el-button type="warning" size="small">拆分</el-button>
                                    <br>
                                    <el-button type="warning" size="small">合并</el-button>
                                    <br>
                                    <el-button type="primary" size="small">导出到结果集</el-button>
                                    <br>
                                    <el-button type="primary" size="small">导出到csv</el-button>
                                    <br>
                                    <el-button type="primary" size="small">重新生成数据</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </s-card>
            </div>
        </div>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import TreeTable from '@/components/index/common/TreeTable';
import {chartOption1, chartOption2, chartOption3, chartOption4, charts, mainTableColumns, chartTableColumns1, chartTableColumns2, chartTableColumns3, chartTableColumns4} from './components/constants';
export default {
    components: {EchartsCommon, SCard, STable, TreeTable},
    data() {
        return {
            mainTableColumns,
            charts: charts,
            chartTableColumns: [chartTableColumns1, chartTableColumns2, chartTableColumns3, chartTableColumns4],
            chartOptions: [chartOption1, chartOption2, chartOption3, chartOption4],
            activeTab: '0',
            tabs: [
                {name: '0', label: '场景名称1'},
                {name: '1', label: '场景名称2'},
            ],
            chartTableData: [[], [], [], []],
            resultIds: '',
            resultList: [],
            searchText: '',
            mainTableData: [

                {
                    id: 1,
                    accountId: '1111',
                    children: [
                        {
                            id: 4,
                            accountId: '1111',
                            customId: '11111',
                            customName: '张三11'
                        }
                    ]
                },
                {
                    id: 2,
                    accountId: '2222',
                    children: [
                        {
                            id: 5,
                            accountId: '2222',
                            customId: '22221',
                            customName: '张三21'
                        },
                        {
                            id: 6,
                            accountId: '2222',
                            customId: '22222',
                            customName: '张三22'
                        }
                    ]
                },
                {
                    id: 3,
                    accountId: '3333',
                    children: [
                        {
                            id: 7,
                            accountId: '3333',
                            customId: '33331',
                            customName: '张三31'
                        },
                        {
                            id: 8,
                            accountId: '3333',
                            customId: '33332',
                            customName: '张三32'
                        }
                    ]
                }

            ]
        };
    },
    methods: {
        handleTabClick(tab) {
            this.activeTab = tab.name;
        },
        toggleDetail(item) {
            let index = this.charts.findIndex(v => {
                return v.title === item.title;
            });
            this.charts[index]['toggleDetailFlags'] = !item.toggleDetailFlags;
        },
        handleSearch() {

        },
        handleEchartClickEvent(params, domId) {
            console.log(params)
            console.log(domId)
            switch(domId) {
                case 'chart0':
                    // get chart2
                    break;
            }
        },
        handleEchartDblClickEvent(params, domId) {
            console.log(params)
            console.log(domId)
            switch(domId) {
                case 'chart0':
                    // get chart2
                    break;
                case 'chart1':
                    // get chart3
                    break;
                case 'chart2':
                    // get chart4
                    break;
            }
        }
    }
};
</script>
<style lang="less" scoped>
    .asso-account-group-merge {
        background: transparent;
        .top-nav {
            position: relative;
        }
        .tabs-button {
            position: absolute;
            right: 0;
            top: 0;
        }
        .search-input {
            width: 240px;

            /deep/ input {
                border-radius: 15px;
            }

            /deep/ i {
                color: #3c70a5 !important;
            }
        }
        .custom-width {
            width: 350px;
        }
        .operate-button-group {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    }
</style>
