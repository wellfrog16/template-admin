/* 树形table */
<template>
    <el-container class="tree-table-component">
        <div class="tree-table-component">
            <div class="table-header-container">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkedAll" @change="handleCheckAll"></el-checkbox>
                <span class="table-header">
                    <div v-for="(item, index) in columns" :key="index">
                        {{ item.label }}
                    </div>
                </span>
            </div>
            <el-tree
                ref="tree-table"
                class="tree-table"
                show-checkbox
                node-key="id"
                :data="tableData"
                :filter-node-method="filterMethods"
                @check-change="handleTreeCheckedChange"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <div v-for="(item, index) in columns" :key="index" style="text-align: center;">
                        {{ (data[item.field] === null || data[item.field] === undefined) ?  '' :  data[item.field] }}
                    </div>
                </span>
            </el-tree>
        </div>
    </el-container>
</template>
<script>
export default {
    data() {
        return {
            isIndeterminate: false,
            checkedAll: false
        };
    },
    props: {
        columns: {
            type: Array,
            default() {
                return [];
            }
        },
        tableData: {
            type: Array,
            default() {
                return [];
            }
        },
        filterText: {
            type: String,
            default: ''
        }
    },
    watch: {
        filterText(val) {
            this.$refs['tree-table'].filter(val);
        }
    },
    computed: {
        allArray() {
            let allArray = [];
            this.tableData.forEach(v => {
                if (v.children) {
                    allArray = allArray.concat(v.children);
                }
            });
            return allArray;
        }
    },
    methods: {
        handleCheckAll(val) {
            if (val) {
                this.$refs['tree-table'].setCheckedNodes(this.allArray);
            } else {
                this.$refs['tree-table'].setCheckedNodes([]);
            }
            this.isIndeterminate = false;
        },
        handleTreeCheckedChange() {
            this.$emit('updateCheckedList', this.$refs['tree-table'].getCheckedNodes(), this.$refs['tree-table'].getCheckedKeys());
            let checkedCount = this.$refs['tree-table'].getCheckedNodes(true).length;
            this.isIndeterminate =
                checkedCount > 0 && checkedCount < this.allArray.length;
        },
        filterMethods(value, data) {
            if (!value) return true;
            return (data['acctId'] && data['acctId'].indexOf(value) !== -1) || (data['custId'] && data['custId'].indexOf(value) !== -1);
        }
    },
    mounted() {
    }
};
</script>
<style lang="less" scoped>
    .tree-table-component {
        .el-tree {
            background: transparent;
        }
        .el-tree-node {
            &:hover {
                background: transparent;
            }
            &:visited {
                background: transparent;
            }
            &:focus {
                background: transparent;
            }
            &:active {
                background: transparent;
            }
        }
        /deep/ .el-tree-node__content {
            background: transparent;
            &:hover {
                background: transparent;
            }
            &:visited {
                background: transparent;
            }
            &:focus {
                background: transparent;
            }
            &:active {
                background: transparent;
            }
        }

        .tree-table {
            color: #fff;
            width: 2300px;
            overflow: auto;
            .custom-tree-node {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                padding-right: 8px;

                > div {
                    flex: 1;
                    padding: 0 10px;
                }
            }

            /deep/ .el-tree-node__content {
                padding: 10px;
                border-radius: 3px;
                border-bottom: 1px solid #21446a;
            }
        }

        .table-header-container {
            line-height: 55px;
            background: transparent !important;
            border-top: 1px solid #21446a;
            border-bottom: 1px solid #21446a;
            padding-left: 12px;
            &:focus {
                outline: none;
            }

            .el-checkbox {
                display: inline-block;
                position: relative;
                float: left;
                margin-right: 20px;
            }

            .table-header {
                display: flex;
                flex: 1;
                align-items: center;
                justify-content: space-between;
                font-size: 14px;
                text-align: center;
                margin-left: 50px;

                > div {
                    flex: 1;
                    padding: 0 10px;
                    color: #fff;
                }
            }
        }
    }
</style>
