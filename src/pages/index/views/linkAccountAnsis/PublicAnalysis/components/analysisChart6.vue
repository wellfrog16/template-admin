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
import {postOrpeList} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR6} from './constants';
export default {
    name: 'analysisChart1',
    components: {SCard, STable},
    props: {},
    minis: [],
    data() {
        return {
            loadingAR: false,
            columnsList: columnsListAR6,
            tableData6: []
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.lienEchartsDete();
    },
    methods: {
        handleSelectionChange6() {},
        lienEchartsDete() {
            let params = {
                'timeOfDay': '2019-02-18'
            };
            this.loadingAR = true;
            this.tableData6 = [];
            // 原油舆情情感分析
            postOrpeList(params).then(resp => {
                this.loadingAR = false;
                resp.yes.forEach(v => {
                    if (v.pageHits) {
                        v.pageHits = parseInt(v.pageHits) + parseInt(v.commentsNum);
                    }
                });
                resp.deny.forEach(v => {
                    if (v.pageHits) {
                        v.pageHits = parseInt(v.pageHits) + parseInt(v.commentsNum);
                    }
                });
                let respYes = resp.yes;
                let respDeny = resp.deny;
                this.tableData6 = [...respYes, ...respDeny];
            }).catch(e => {
                this.loadingAR = false;
            });
        }
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
