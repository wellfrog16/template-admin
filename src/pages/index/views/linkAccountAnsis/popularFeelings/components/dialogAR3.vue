<template>
    <el-row :gutter="20">
        <el-col :span="24">
            <s-card class="" :title="`异常指标`" :icon="`fa fa-chart-line`">
                <s-table
                    ref="selfTables3"
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
import {postConfigurationQuery3} from '@/api/dataAnsis/popularFeelings';
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
        }
    },
    watch: {
        visi: {
            handler(val) {
                if (val || !val) {
                    this.$refs.selfTables3.$refs.selfTable.clearSelection(); // 取消异常指标多选
                }
            }
        },
    },
    data() {
        return {
            threshold: '',
            loadingAR: false,
            checkboxTableColumn3: [],
            // 异常指标
            columnsList: columnsList,
            tableData3: []
        };
    },
    computed: {},
    mounted() {
        this.tableDataS3();
    },
    methods: {
        // 原油日分时图1--异常指标配置表
        tableDataS3() {
            let params = {};
            this.loadingAR = true;
            postConfigurationQuery3(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.loadingAR = false;
                    this.tableData3 = resp;
                }
            }).catch(e => {
                this.loadingAR = false;
            });
        },
        // 异常指标多选
        handleSelectionChange1(val) {
            this.checkboxTableColumn3 = val || [];
            this.$emit('checkboxEmit3', this.checkboxTableColumn3);
        },
    },
};
</script>

<style lang="less" module>

</style>
