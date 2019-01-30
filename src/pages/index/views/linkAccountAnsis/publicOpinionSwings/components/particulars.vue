<template>
    <s-card :title="`详情`" :icon="`fa fa-chart-line`">
        <s-table
            slot="content"
            :height="300"
            :showSelectionColumn="false"
            :showIndexColumn="false"
            tooltip-effect="dark"
            :loading="loadingTable"
            :columns="tableColumns"
            :tableData="tableData"
        ></s-table>
    </s-card>
</template>

<script>
import {columnsList, tableData} from './constants';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
export default {
    name: 'undulate',
    components: {SCard, STable},
    data() {
        return {
            loadingTable: false,
            tableColumns: columnsList,
            tableData: tableData,
        };
    },
    computed: {},
    mounted() {
        this.barEchartsDete();
    },
    methods: {
        barEchartsDete() {}
    },
};
</script>

<style lang="less" module>

</style>
