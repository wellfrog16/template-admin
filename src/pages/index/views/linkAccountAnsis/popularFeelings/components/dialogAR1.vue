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
                    :columns="columnsLists"
                    :tableData="tableData1"
                    @selection-change="handleSelectionChange1"
                >
                </s-table>
            </s-card>
        </el-col>
    </el-row>
</template>

<script>
import {postConfigurationQuery1} from '@/api/dataAnsis/popularFeelings';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList} from './constants';

export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visi: {
            type: Boolean,
            default: false
        },
    },
    watch: {
        visi: {
            handler(val) {
                if (val || !val) {
                    this.$refs.selfTables1.$refs.selfTable.clearSelection(); // 取消异常指标多选
                }
            }
        }
    },
    data() {
        return {
            loadingAR: false,
            checkboxTableColumn1: [],
            columnsLists: columnsList,
            tableData1: []
        };
    },
    computed: {},
    mounted() {
        this.tableDatas1();
    },
    methods: {
        // 原油日分时图1--异常指标配置表
        tableDatas1() {
            // let now = new Date(); // 当前日期
            // let timeDay = moment(now).format('YYYY-MM-DD');
            let params = {
                // 'timeOfDay': timeDay,
                // 'timeOfDay': '2019-01-11',
            };
            this.loadingAR = true;
            postConfigurationQuery1(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR = false;
                    this.tableData1 = resp;
                }
            }).catch(e => {
                this.loadingAR = false;
            });
        },
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
