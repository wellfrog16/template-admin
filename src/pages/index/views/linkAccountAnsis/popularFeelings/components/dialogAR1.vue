<template>
    <el-row :gutter="20">
        <el-col>
            <s-card class="" :title="`异常指标配置`" :icon="`fa fa-chart-line`">
                <s-table
                    ref="selfTables1"
                    slot="content"
                    :showSelectionColumn="true"
                    :showIndexColumn="false"
                    :height="230"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData1"
                    @selection-change="handleSelectionChange1"
                >
                </s-table>
            </s-card>
        </el-col>
        <!--<el-col :span="12">-->
        <!--<s-card class="" :title="`舆情`" :icon="`fa fa-chart-line`">-->
        <!--<s-table-->
        <!--ref="selfTables2"-->
        <!--slot="content"-->
        <!--:showSelectionColumn="true"-->
        <!--:showIndexColumn="false"-->
        <!--:height="230"-->
        <!--:loading="loadingAR"-->
        <!--:columns="columnsListPF"-->
        <!--:tableData="tableData1PF"-->
        <!--@selection-change="handleSelectionChange2"-->
        <!--&gt;-->
        <!--</s-table>-->
        <!--</s-card>-->
        <!--</el-col>-->
    </el-row>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList1} from './constants';

export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visi: {
            type: Boolean,
            default: false
        },
        tableData1: {
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
                    this.$refs.selfTables1.$refs.selfTable.clearSelection(); // 取消异常指标多选
                    // this.$refs.selfTables2.$refs.selfTable.clearSelection(); // 取消舆情多选
                    // this.checkboxTableColumn1 = [];
                    // this.checkboxTableColumn2 = [];
                }
            }
        }
    },
    data() {
        return {
            loadingAR: false,
            checkboxTableColumn1: [],
            // checkboxTableColumn2: [],
            // 异常指标
            columnsList: columnsList1,
            // tableData1: tableData1,
            // 舆情
            // columnsListPF: columnsListPF1,
            // tableData1PF: tableDatalPF1,
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        // 异常指标多选
        handleSelectionChange1(val) {
            this.checkboxTableColumn1 = val || [];
            this.$emit('checkboxEmit1', this.checkboxTableColumn1);
        },
        // 舆情多选
        // handleSelectionChange2(val) {
        //     this.checkboxTableColumn2 = val || [];
        //     this.$emit('checkboxEmit2', this.checkboxTableColumn2);
        // },
    },
};
</script>

<style lang="less" module>

</style>
