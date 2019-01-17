<template>
    <div class="block1Table">
        <s-table :height="300" :columns="columns" :tableData="tableData" :cellClassName="selfCellCssMethods"></s-table>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';

export default {
    components: {STable},
    props: {
        tableData: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        columns() {
            let columns = this.tableData.map(v => {
                return {
                    field: v.name,
                    label: v.name,
                    minWidth: 140
                };
            });
            columns.unshift({field: 'name', label: '', minWidth: 140});
            return columns;
        }
    },
    data() {
        return {

        };
    },
    methods: {
        selfCellCssMethods({row, column, rowIndex, columnIndex}) {
            if (column.label && column.label !== '序号') {
                if (row[column.label] > 0.9) {
                    return 'level3';
                } else if (row[column.label] > 0.5) {
                    return 'level2';
                } else {
                    return 'level1';
                }
            }
        }
    }
};
</script>
<style lang="less">
    .level1 {
        color: #69ec2c;
    }
    .level2 {
        color: #f1f115;
    }
    .level3 {
        color: #ff4e11;
    }
</style>
