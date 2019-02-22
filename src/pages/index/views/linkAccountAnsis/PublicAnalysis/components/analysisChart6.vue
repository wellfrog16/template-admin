<template>
    <div :class="$style.analys4">
        <s-card :title="`舆情列表`" :icon="`fa fa-chart-line`">
            <div slot="content">
                <s-table
                    ref="selfTables1"
                    :height="300"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData6"
                    @selection-change="handleSelectionChange6"
                >
                </s-table>
            </div>
        </s-card>
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR6, tableData6} from './constants';
export default {
    name: 'analysisChart1',
    components: {SCard, STable},
    props: {},
    minis: [],
    data() {
        return {
            loadingAR: false,
            columnsList: columnsListAR6,
            tableData6: tableData6
        };
    },
    computed: {},
    comments: {},
    mounted() {
    },
    methods: {
        handleSelectionChange6() {}
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" module>
    .analys2 {
        width: 100%;
    }
</style>
