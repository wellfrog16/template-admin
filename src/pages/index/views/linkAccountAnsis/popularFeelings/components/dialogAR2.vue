<template>
    <div>
        <el-row :gutter="20">
            <el-col>
                <s-card class="" :title="`他比证券`" :icon="`el-icon-setting`">
                    <s-table
                        slot="content"
                        :height="200"
                        :showSelectionColumn="false"
                        :showIndexColumn="false"
                        tooltip-effect="dark"
                        :loading="loadingAR"
                        :columns="columnsList2"
                        :tableData="tableDatas2">
                        <el-table-column
                            align="center"
                            type="index"
                            slot="tableColumnsUnshift"
                            width="55">
                            <template slot-scope="scope">
                                <el-radio
                                    class="radio"
                                    v-model="flagValue"
                                    :label="scope.$index"
                                    @change="getTemplateRow(scope.row)"><br></el-radio>
                            </template>
                        </el-table-column>
                    </s-table>
                </s-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <s-card class="" :title="`指标配置`" :icon="`fa fa-chart-line`">
                    <s-table
                        ref="selfTables2"
                        slot="content"
                        :showSelectionColumn="true"
                        :showIndexColumn="false"
                        :height="230"
                        :loading="loadingAR"
                        :columns="columnsLists"
                        :tableData="tableData2"
                        @selection-change="handleSelectionChange2">
                    </s-table>
                </s-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {postThanSec, postConfigurationQuery1} from '@/api/dataAnsis/popularFeelings';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList, columnsLists} from './constants';
export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visi: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        visi: {
            handler(val) {
                if (val || !val) {
                    this.$refs.selfTables2.$refs.selfTable.clearSelection(); // 取消复选框
                    this.checkboxTableColumn2 = [];
                    this.celclickTableColumns2 = {};
                    this.flagValue = '';
                }
            }
        }
    },
    data() {
        return {
            loadingAR: false,
            flagValue: '',
            celclickTableColumns2: {},
            checkboxTableColumn2: [], // 异常指标配置表
            columnsList2: columnsLists,
            columnsLists: columnsList,
            tableDatas2: [],
            tableData2: []
        };
    },
    computed: {},
    mounted() {
        this.tableDataS2();
        this.tableDatas24();
    },
    methods: {
        // 原油日分时图1--异常指标配置表
        tableDataS2() {
            let params = {};
            this.loadingAR = true;
            postConfigurationQuery1(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR = false;
                    this.tableData2 = resp;
                }
            }).catch(e => {
                this.loadingAR = false;
            });
        },
        // 美油日分时图2--他比证券配置表;  美油日K图4- 他比证券配置表
        tableDatas24() {
            let params = {};
            this.loadingAR = true;
            postThanSec(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR = false;
                    this.tableDatas2 = resp;
                }
            }).catch(e => {
                this.loadingAR = false;
            });
        },
        // 单选按钮
        getTemplateRow() {
            this.tableDatas2.forEach((v, i) => {
                if (this.flagValue === i) {
                    this.flagValue = i;
                    this.celclickTableColumns2 = v || {};
                    this.$emit('celclickEmits2', this.celclickTableColumns2, this.flagValue);
                }
            });
        },
        // 异常指标多选
        handleSelectionChange2(val) {
            this.checkboxTableColumn2 = val || [];
            this.$emit('checkboxEmit2', this.checkboxTableColumn2);
        }
    }
};
</script>

<style lang="less" module>

</style>
