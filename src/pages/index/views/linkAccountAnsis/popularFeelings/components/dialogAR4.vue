<template>
    <el-row :gutter="20">
        <el-col :span="24">
            <s-card class="" :title="`他比证券`" :icon="`el-icon-setting`">
                <s-table
                    slot="content"
                    :height="230"
                    :showSelectionColumn="false"
                    :showIndexColumn="false"
                    tooltip-effect="dark"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData4"
                >
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
                    <el-table-column
                        align="center"
                        :width="140"
                        slot="tableColumnsPush"
                        label="阈值设置"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-input
                                size="mini"
                                placeholder="请输入阈值设置"
                                @change="handleInsertChange(scope.row.a4)"
                            ></el-input>
                        </template>
                    </el-table-column>
                </s-table>
            </s-card>
        </el-col>
        <!--<el-col :span="12">-->
            <!--<s-card class="" :title="`舆情`" :icon="`fa fa-chart-line`">-->
                <!--<s-table-->
                    <!--ref="selfTables"-->
                    <!--slot="content"-->
                    <!--:showSelectionColumn="true"-->
                    <!--:showIndexColumn="false"-->
                    <!--:height="230"-->
                    <!--:loading="loadingAR"-->
                    <!--:columns="columnsListPF"-->
                    <!--:tableData="tableData1PF"-->
                    <!--@selection-change="handleSelectionChange"-->
                <!--&gt;-->
                <!--</s-table>-->
            <!--</s-card>-->
        <!--</el-col>-->
    </el-row>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList4, tableData4, tableDatalPF4, columnsListPF4} from './constants';
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
                    // this.$refs.selfTables.$refs.selfTable.clearSelection(); // 取消复选框
                    // this.checkboxTableColumn = [];
                    this.celclickTableColumn = {};
                    this.flagValue = '';
                }
            }
        }
    },
    data() {
        return {
            loadingAR: false,
            flagValue: '',
            celclickTableColumn: {},
            checkboxTableColumn: [],
            // 他比证券
            columnsList: columnsList4,
            tableData4: tableData4,
            // 舆情
            columnsListPF: columnsListPF4,
            tableData1PF: tableDatalPF4
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        // 输入阈值设
        handleInsertChange(val) {},
        // 单选按钮
        getTemplateRow(row) {
            this.flagValue = row.index;
            this.tableData4.forEach((v, i) => {
                if (this.flagValue === i) {
                    this.celclickTableColumn = v || {};
                    this.$emit('celclickEmit', this.celclickTableColumn, this.flagValue);
                }
            });
        },
        // 舆情多选
        handleSelectionChange(val) {
            this.checkboxTableColumn = val || [];
            this.$emit('checkboxEmit', this.checkboxTableColumn);
        }
    }
};
</script>

<style lang="less" module>

</style>
