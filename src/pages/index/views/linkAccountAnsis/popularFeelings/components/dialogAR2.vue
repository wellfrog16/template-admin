<template>
    <el-row :gutter="20">
        <el-col>
            <s-card class="" :title="`他比证券`" :icon="`el-icon-setting`">
                <s-table
                    slot="content"
                    :height="230"
                    :showSelectionColumn="false"
                    :showIndexColumn="false"
                    tooltip-effect="dark"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData2"
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
import {columnsList2} from './constants';
export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visi: {
            type: Boolean,
            default: false
        },
        tableData2: {
            type: Array,
            default() {
                return [];
            }
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
            // checkboxTableColumn: [],
            // 他比证券
            columnsList: columnsList2,
            // tableData2: tableData2,
            // 舆情
            // columnsListPF: columnsListPF2,
            // tableData1PF: tableDatalPF2
        };
    },
    computed: {},
    mounted() {
        console.log(this.tableData2);
    },
    methods: {
        // 输入阈值设
        handleInsertChange(val) {},
        // 单选按钮
        getTemplateRow() {
            this.tableData2.forEach((v, i) => {
                if (this.flagValue === i) {
                    this.flagValue = i;
                    this.celclickTableColumn = v || {};
                    this.$emit('celclickEmit', this.celclickTableColumn, this.flagValue);
                }
            });
        },
        // 舆情多选
        // handleSelectionChange(val) {
        //     this.checkboxTableColumn = val || [];
        //     this.$emit('checkboxEmit', this.checkboxTableColumn);
        // }
    }
};
</script>

<style lang="less" module>

</style>
