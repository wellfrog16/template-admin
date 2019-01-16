<template>
    <div>
        <s-card class="" :title="`他比证券`">
            <s-table
                slot="content"
                :height="230"
                :loading="loadingAR"
                :columns="columnsList"
                :tableData="tableData1"
            >
                <el-table-column
                    align="center"
                    :width="140"
                    slot="tableColumnsPush"
                    label="阈值设置11"
                    show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-input
                            size="mini"
                            placeholder="请输入阈值设置"
                            @change="handleInsertChange(scope.row.a6)"
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
            columnsList: [
                {field: 'a1', label: '指标名称', width: '100'},
                {field: 'a2', label: '历史参考值', width: '100'},
                {field: 'a3', label: '相关性', width: '100'},
                {field: 'a4', label: '影响权重', width: '100'},
                {field: 'a5', label: '阈值设置', width: '100'},
            ],
            tableData1: [
                {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '0.5',
                    a5: '上海市普1518 弄',
                    a6: 0
                }, {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '0.5',
                    a5: '上海市普1518 弄',
                    a6: 0
                }, {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '0.5',
                    a5: '上海市普1518 弄',
                    a6: 0
                }, {
                    a1: '买总量',
                    a2: '2000-5000',
                    a3: '0.4',
                    a4: '0.5',
                    a5: '上海市普1518 弄',
                    a6: 0
                }
            ],
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        handleSelectionChange(val) {
        },
        // 输入阈值设
        handleInsertChange(val) {
            console.log(val);
        }
    },
};
</script>

<style lang="less" module>

</style>
