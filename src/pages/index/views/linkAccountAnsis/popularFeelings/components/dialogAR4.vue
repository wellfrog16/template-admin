<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="24">
                <s-card class="" :title="`他比证券`" :icon="`el-icon-setting`">
                    <s-table
                        slot="content"
                        :height="200"
                        :showSelectionColumn="false"
                        :showIndexColumn="false"
                        tooltip-effect="dark"
                        :loading="loadingAR"
                        :columns="columnsList"
                        :tableData="tableData4"
                    >
                        <el-table-column
                            align="center"
                            type="index"
                            slot="tableColumnsUnshift"
                            width="50">
                            <template slot-scope="scope">
                                <el-radio
                                    class="radio"
                                    v-model="flagValue"
                                    :label="scope.$index"
                                    @change="getTemplateRow(scope.row)"><br>
                                </el-radio>
                            </template>
                        </el-table-column>
                    </s-table>
                </s-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="24">
                <s-card class="" :title="`指标配置`" :icon="`fa fa-chart-line`">
                    <s-table
                        ref="selfTables"
                        slot="content"
                        :showSelectionColumn="true"
                        :showIndexColumn="false"
                        :height="230"
                        :loading="loadingAR"
                        :columns="columnsList3"
                        :tableData="tableData3"
                        @selection-change="handleSelectionChange2">
                    </s-table>
                </s-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList4, columnsList3} from './constants';
export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
        visi: {
            type: Boolean,
            default: false
        },
        tableData4: {
            type: Array,
            default() {
                return [];
            }
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
                    this.celclickTableColumn = {};
                    this.flagValue = '';
                }
            }
        }
    },
    data() {
        return {
            loadingAR: false,
            flagValue: '',
            celclickTableColumn: {},
            checkboxTableColumn1: [],
            // 他比证券
            columnsList: columnsList4,
            columnsList3: columnsList3
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        // 输入阈值设
        handleInsertChange(val) {},
        handleSelectionChange2() {},
        // 单选按钮
        getTemplateRow() {
            this.tableData4.forEach((v, i) => {
                if (this.flagValue === i) {
                    this.flagValue = i;
                    this.celclickTableColumn = v || {};
                    this.$emit('celclickEmit', this.celclickTableColumn, this.flagValue);
                }
            });
        },
    }
};
</script>

<style lang="less" module>

</style>
