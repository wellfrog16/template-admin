<template>
    <div>
        <s-card class="" :title="`他比证券`">
            <s-table
                slot="content"
                :height="230"
                :showSelectionColumn="false"
                :showIndexColumn="false"
                tooltip-effect="dark"
                :loading="loadingAR"
                :columns="columnsList"
                :tableData="tableData2"
                @celCick="celCickShowRow"
            >
                <el-table-column
                    align="center"
                    type="index"
                    slot="tableColumnsUnshift"
                    width="55">
                    <template slot-scope="scope">
                        <el-radio
                            class="radio"
                            v-model="flagValue"
                            :label="scope.$index"
                            @change="getTemplateRow(scope.row)"><br></el-radio>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    :width="140"
                    slot="tableColumnsPush"
                    label="阈值设置"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input
                            size="mini"
                            placeholder="请输入阈值设置"
                            @change="handleInsertChange(scope.row.a4)"
                        ></el-input>
                    </template>
                </el-table-column>
            </s-table>
        </s-card>
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
export default {
    name: 'dialogAR',
    components: {SCard, STable},
    props: {
    },
    watch: {
    },
    data() {
        return {
            loadingAR: false,
            flagValue: '',
            columnsList: [
                {field: 'a1', label: '指标名称', width: '100'},
                {field: 'a2', label: '历史参考值', width: '100'},
                {field: 'a3', label: '相关性', width: '100'},
                {field: 'a4', label: '影响权重', width: '100'},
            ],
            tableData2: [
                {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '上海市普1518 弄',
                    index: 0
                }, {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '上海市普1518 弄',
                    index: 1
                }, {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '上海市普1518 弄',
                    index: 2
                }, {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '上海市普1518 弄',
                    index: 3
                }
            ],
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        // 点击某行
        celCickShowRow(row) {
        },
        // 输入阈值设
        handleInsertChange(val) {
            console.log(val);
        },
        // 单选按钮
        getTemplateRow(row) {
            this.flagValue = this.flagValue ? this.flagValue : row.index;
        },
    },
};
</script>

<style lang="less" module>

</style>
