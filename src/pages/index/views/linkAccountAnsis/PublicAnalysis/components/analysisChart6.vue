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
// 舆情列表
// import {postPublicList} from '@/api/PublicAnalysis/popularFeelings';
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
        handleSelectionChange6() {},
        // lienEchartsDete() {
        //     let params = {
        //         'timeOfDay': '2019-02-18'
        //     };
        //     this.loading1 = true;
        //     // 原油舆情情感分析
        //     postPublicList(params).then(resp => {
        //         this.loading1 = false;
        //     }).catch(e => {
        //         this.loading1 = false;
        //     });
        // }
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
