<template>
    <el-row :gutter="20">
        <el-col :span="24">
            <s-card class="" :title="`异常指标`" :icon="`fa fa-chart-line`">
                <s-table
                    ref="selfTables1"
                    slot="content"
                    :showSelectionColumn="true"
                    :showIndexColumn="false"
                    :height="230"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData3"
                    @selection-change="handleSelectionChange1"
                >
                </s-table>
            </s-card>
        </el-col>
    </el-row>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList3} from './constants';
export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visi: {
            type: Boolean,
            default: false
        },
        tableData3: {
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
                }
            }
        },
    },
    data() {
        return {
            threshold: '',
            loadingAR: false,
            checkboxTableColumn1: [],
            // 异常指标
            columnsList: columnsList3
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
    },
};
</script>

<style lang="less" module>

</style>
