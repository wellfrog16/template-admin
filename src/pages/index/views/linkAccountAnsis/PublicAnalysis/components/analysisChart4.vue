<template>
    <div :class="$style.analys4">
        <s-card :title="`库存数据`" :icon="`fa fa-chart-line`">
            <div slot="content">
                <s-table
                    ref="selfTables1"
                    :height="230"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData1"
                    @selection-change="handleSelectionChange1"
                >
                </s-table>
                <div style="text-align:center; margin: 10px; width: 100%;">
                    <el-button size="small" type="primary" @click="exporstClick('库存数据', columnsList)">导出CSV</el-button>
                </div>
            </div>
        </s-card>
    </div>
</template>

<script>
// 原油库数据  原油库存-下载
import {postCrudeDownDetail} from '@/api/dataAnsis/PublicAnalysis';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsListAR4} from './constants';
export default {
    name: 'analysisChart1',
    components: {SCard, STable},
    props: {},
    minis: [],
    data() {
        return {
            loadingAR: false,
            columnsList: columnsListAR4,
            tableData1: [],
        };
    },
    computed: {},
    comments: {},
    mounted() {
        this.lienEchartsDete();
    },
    methods: {
        // 下载
        exporstClick(fileName, columnsList) {
            if (this.tableData1 && !this.tableData1.length) {
                this.$message.error('协查报告暂无数据!');
                return;
            }
            let params = {
                'fileName': fileName || '测试',
                'tableColumns': columnsList,
                'tableData': this.tableData1,
            };
            this.gfnExportFileWithForm(params, 'crudeDown', 1);
        },
        handleSelectionChange1() {},
        fullscreenChange() {},
        toggleFullScreen() {
            console.log(22);
        },
        lienEchartsDete() {
            let params = {
                'timeOfDay': '2019-02-18'
            };
            this.loadingAR = true;
            this.tableData1 = [];
            // 原油舆情情感分析
            postCrudeDownDetail(params).then(resp => {
                this.loadingAR = false;
                this.tableData1 = resp;
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
