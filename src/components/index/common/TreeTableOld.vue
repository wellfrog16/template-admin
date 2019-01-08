/* 树形table */
<template>
    <div>
        <div style="overflow: auto;" class="asso-scrollbar-b">
            <div style="width:2445px; display: flex; text-align: center; padding-left: 55px; height: 36px; line-height: 36px;">
                <div v-for="(item, index) in columns" :key="index" style="flex: 1;">
                    {{ item.label }}
                </div>
            </div>
        </div>
        <el-container>
            <div class="tree-table-component">
                <!-- <div class="table-header-container">
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkedAll" @change="handleCheckAll"></el-checkbox>
                <span class="table-header">

                </span>
            </div> -->
                <el-tree
                    ref="tree-table"
                    class="tree-table asso-scrollbar"
                    show-checkbox
                    node-key="id"
                    :data="tableData"
                    :default-expanded-keys="[0]"
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
                                    <span v-if="item.field !== 'custId' || data[item.field]==='客户编号'" style="width: 145px; text-overflow: ellipsis; overflow: hidden; display: inline-block; margin: 0;">{{ (data[item.field] === null || data[item.field] === undefined) ?  '' :  data[item.field] }}</span>
                                    <custIdColumn v-else :scope="{row: data}" style="text-align:center;"></custIdColumn>
                                </span>
                            </el-popover>
                        </div>
                    </span>
                </el-tree>
            </div>
        </el-container>
    </div>

</template>
<script>
import custIdColumn from '@/components/index/common/CustIdColumn';
export default {
    data() {
        return {
            isIndeterminate: false,
            checkedAll: false,
            treeData: []
        };
    },
    components: {custIdColumn},
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
        },
        allArray() {
            this.isIndeterminate = false;
        },
        tableData(val) {
            this.dealTreeData();
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
            return (data['acctId'] && data['acctId'].indexOf(value.trim()) !== -1) || (data['custId'] && data['custId'].indexOf(value.trim()) !== -1);
        },
        dealTreeData() {
            let parentNode = {id: 0, children: this.tableData};
            this.columns.forEach(v => {
                parentNode[v.field] = v.label;
            });
            this.treeData = [
                parentNode
            ];
        }
    },
    mounted() {
        // let ddd = [];
        // for (let i = 0; i < 21; i++) {
        //     ddd.push({
        //         'id': i,
        //         'acctId': 'XG' + i,
        //         'children': (() => {
        //             let d = [];
        //             for (let ii = 0; ii < 11; ii++) {
        //                 d.push({
        //                     'id': String(i) + String(ii),
        //                     'acctId': 'XG' + i,
        //                     'custId': '80' + String(i) + String(ii),
        //                     'custName': null,
        //                     'acctGroAvgRelaCoef': 0,
        //                     'acctAvgRelaCoef': 0,
        //                     'contrCd': 'cu1712',
        //                     'acctGroNetOpenInt': 500,
        //                     'acctNetOpenInt': 100,
        //                     'custWheOtherGro': 'BB001, BB001, BB001, BB001',
        //                     'buyBargainRela': 0,
        //                     'sellBargainRela': 0,
        //                     'netBuyBargainRela': 0,
        //                     'longPosMakePosRela': 0,
        //                     'shortPosMakePosRela': 0,
        //                     'floatPrftLossRela': 0
        //                 });
        //             }
        //             return d;
        //         })()
        //     });
        // }
        this.dealTreeData();
        let $ = this.$jquery;
        $('.asso-scrollbar').scroll(event => {
            $('.asso-scrollbar-b').scrollLeft($('.asso-scrollbar').scrollLeft());
        });
    }
};
</script>
<style lang="less" scoped>
    .asso-scrollbar-b::-webkit-scrollbar {
        display: none;
    }
    .tree-table-component {
        width: 100%;
        .el-tree {
            width: 100% !important;
            height: 390px;
            background: transparent;
        }
        /deep/.self-column-in-table {
            a {
                display: inline-block;
                text-align: center;
                width: 135px;
            }
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
            /deep/ .el-tree-node {
                width: 2500px;
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
