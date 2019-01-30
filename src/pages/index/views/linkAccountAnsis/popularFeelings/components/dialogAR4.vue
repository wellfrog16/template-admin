<template>
    <el-row :gutter="20">
        <el-col :span="24">
            <s-card class="" :title="`他比证券`" :icon="`el-icon-setting`">
                <s-table
                    slot="content"
                    :height="230"
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
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {columnsList4} from './constants';
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
            // 他比证券
            columnsList: columnsList4,
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        // 输入阈值设
        handleInsertChange(val) {},
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
