<template>
    <el-row :gutter="20">
        <el-col>
            <s-card class="" :title="`舆情波动配置`" :icon="`fa fa-chart-line`">
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
    </el-row>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR, tableData1} from './constants';
export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visible: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        // visible: {
        //     handler(val) {
        //         if (val || !val) {
        //             this.$refs.selfTables1.$refs.selfTable.clearSelection(); // 取消异常指标多选
        //             // this.$refs.selfTables2.$refs.selfTable.clearSelection(); // 取消舆情多选
        //             // this.checkboxTableColumn1 = [];
        //             // this.checkboxTableColumn2 = [];
        //         }
        //     }
        // }
    },
    data() {
        return {
            loadingAR: false,
            checkboxTableColumn1: [],
            columnsList: columnsListAR,
            tableData1: tableData1
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        handleSelectionChange1() {}
    },
};
</script>

<style lang="less" module>

</style>
