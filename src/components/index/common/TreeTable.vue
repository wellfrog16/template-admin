/* 树形table */
<template>
    <el-container class="tree-table-component">
        <!-- <div class="tree-table-component">

        </div> -->
        <template>
            <el-table
                :data="headerData"
                default-expand-all
                style="width: 100%;">
                <el-table-column type="expand" class="expanded">
                    <template>
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
                                    <el-popover placement="top-end" trigger="hover" :disabled="index < 5" width="200">
                                        <div>
                                            <p v-if="data.acctId" style="margin:0;">账户组号：{{ data.acctId }}</p>
                                            <p v-if="data.custId" style="margin:0;">客户编号：{{ data.custId }}</p>
                                            <p v-if="data.custId" style="margin:0; white-space:normal; word-break:break-all;">{{ columns[index]['label'] }}：{{ (data[item.field] === null || data[item.field] === undefined) ?  '' :  data[item.field] }}</p>
                                        </div>
                                        <span slot="reference">
                                            <span v-if="item.field !== 'custId'" style="width: 135px; text-overflow: ellipsis; overflow: hidden; display: inline-block; margin: 0;">{{ (data[item.field] === null || data[item.field] === undefined) ?  '' :  data[item.field] }}</span>
                                            <custIdColumn v-else :scope="{row: data}" style="text-align:center;"></custIdColumn>
                                        </span>
                                    </el-popover>
                                </div>
                            </span>
                        </el-tree>
                    </template>
                </el-table-column>
                <el-table-column
                    v-for="(item, index) in columns"
                    :key="index"
                    :width="item.width ? item.width: 155"
                    :align="item.align"
                    :label="item.label"
                    :prop="item.field">
                </el-table-column>
            </el-table>
        </template>
    </el-container>
</template>
<script>
import custIdColumn from '@/components/index/common/CustIdColumn';
export default {
    data() {
        return {
            isIndeterminate: false,
            checkedAll: false
        };
    },
    computed: {
        headerData() {
            let data = {};
            this.columns.forEach(v => {
                data[v.field] = v.label;
            });
            return [data];
        },
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
    components: {custIdColumn},
    props: {
        autoHeight: {
            type: Boolean,
            default: false
        },
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
        },
        allArray() {
            this.isIndeterminate = false;
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
            return (data['acctId'] && data['acctId'].indexOf(value.trim()) !== -1) || (data['custId'] && data['custId'].indexOf(value.trim()) !== -1);
        }
    },
    mounted() {
    }
};
</script>
<style lang="less" scoped>
    .tree-table-component {
        height: 400px;
        /deep/.el-table__row {
            display: none;
        }
        /deep/.self-column-in-table {
            a {
                text-align: center;
                width: 135px;
            }
        }
        /deep/ .el-table tr {
            &:hover {
                td {
                    background: transparent !important;
                }
            }
        }
        /deep/.el-tree__empty-block {
            min-height: 400px;
        }
        /deep/.el-table--scrollable-x {
            /deep/.el-table__body-wrapper {
                width: 100%;
                height: 360px;
                background: transparent;
                overflow: auto;
                ::-webkit-scrollbar {
                    display: none;
                }
                &:hover {
                    background: transparent;
                }
            }
        }
        /deep/ .el-table__expanded-cell {
            background: transparent;
        }
        /deep/.el-tree {
            background: transparent;
        }
        /deep/.el-tree-node {
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
            min-width: 1060px;
            max-height: 400px;
            overflow-y: auto;
            overflow-x: hidden;
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
                padding: 20px 0 20px 18px;
                border-radius: 3px;
                border-bottom: 1px solid #21446a;
                &:hover {
                    background: #07254c;
                }
            }
        }
        /deep/.el-table__header-wrapper {
            padding-left: 13px;
        }
        .table-header-container {
            line-height: 55px;
            background: transparent !important;
            border-top: 1px solid #21446a;
            border-bottom: 1px solid #21446a;
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
