<template>
    <div>
        <el-table
            border
            ref="selfTable"
            :data="newData"
            :height="height"
            v-loading="loading"
            element-loading-text="数据加载中，请耐心等待..."
            element-loading-background="rgba(0,0,0,0.3)"
            :row-class-name="rowClassName"
            :cell-class-name="cellClassName"
            :show-header="showHeader"
            :show-summary="showSummary"
            :summary-method="summaryMethod"
            :span-method="spanMethod"
            :highlight-current-row="highlightCurrentRow"
            @header-contextmenu="headerRightClick"
            @select="handleSelectedRow"
            @select-all="handleSelectedAllRow"
            @selection-change="handleSelectionChange"
            @row-click="handleRowClick"
            @cell-click="handleCellClick"
            @cell-dblclick="handleCellDblClick"
            @row-contextmenu="handleRowContextMenu"
            @row-dblclick="handleRowDbClick"
            @sort-change="sortChange"
            @current-change="handleCurrentChange"
            style="width: 100%; overflow:visible;">
            <slot name="tableColumnsUnshift"></slot>
            <el-table-column
                v-if="showSelectionColumn"
                type="selection"
                align="center"
                width="55">
            </el-table-column>
            <el-table-column
                v-if="showIndexColumn"
                type="index"
                width="60"
                align="center"
                label="序号">
            </el-table-column>
            <div slot="empty">
                <span>
                    <i class="fa fa-chart-bar fa-lg"></i>
                </span>
                暂无数据
            </div>
            <s-table-columns v-for="(item,index) in newColumns"
                             :key="index"
                             :item="item"
                             :otherProps="otherProps"
                             @handlerChange="handlerChange"/>
            <slot name="tableColumnsPush"></slot>
        </el-table>
        <el-row v-if="showPagination">
            <el-col :span="24" style="margin-top: 15px;">
                <pagination class="pager-nat"
                            @getPagination="getPagination"
                            :paginationProps="pagination"
                            :pageSizes="pageSizes"
                            background
                            :layout="paginationLayout"
                            :pageTotal="Number(totalNum) || 0"></pagination>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import STableColumns from './STableColumns';
import Pagination from './Pagination'; // 分页组件引入
export default {
    name: 'self-table',
    props: {
        showPagination: {
            type: Boolean,
            default: false
        },
        totalNum: {
            type: Number,
            default: 0
        },
        pagination: {
            type: Object,
            default() {
                return {
                    pageIndex: 1,
                    pageRows: 10
                };
            }
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50, 100];
            }
        },
        paginationLayout: {
            type: String,
            default: 'total, sizes, prev, pager, next'
        },
        showSelectionColumn: {
            type: Boolean,
            default: false
        },
        showIndexColumn: {
            type: Boolean,
            default: true
        },
        columns: {
            type: Array,
            required: true
        },
        tableData: {
            type: Array,
            default() {
                return [];
            }
        },
        autoHeight: {
            type: Boolean,
            default: false
        },
        height: {
            type: [Number, String],
            default() {
                if (!this.autoHeight) {
                    return 400;
                }
            }
        },
        maxHeight: {
            type: [Number, String],
            default() {
                if (this.autoHeight) {
                    return 400;
                }
            }
        },
        rowClassName: [String, Function],
        cellClassName: [String, Function],
        summaryMethod: Function,
        spanMethod: Function,
        showSummary: {
            type: Boolean,
            default() {
                return false;
            }
        },
        showHeader: {
            type: Boolean,
            default() {
                return true;
            }
        },
        loading: {
            type: Boolean,
            default() {
                return false;
            }
        },
        highlightCurrentRow: {
            type: Boolean,
            default() {
                return false;
            }
        },
        uniqueKey: String,
        otherProps: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    components: {
        STableColumns, // 表格列
        Pagination
    },
    watch: {},
    mixins: [],
    data() {
        return {};
    },
    computed: {
        newData() {
            return this.tableData;
        },
        newColumns() {
            return this.columns;
        }
    },
    created() {},
    mounted() {},
    beforeDestroy() {},
    methods: {
        showOrHideLoading(flag) {
            this.dealWithIsLoading = flag;
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.$emit('selection-change', val);
        },
        handleRowClick(row, event, column) {
            this.$emit('rowClick', row, event, column);
        },
        handleCellClick(row) {
            // console.log(row);
            this.$emit('celCick', row);
        },
        handleCellDblClick(row) {
            this.$emit('cellDblClick', row);
        },
        headerRightClick(column, event) {
            this.$emit('headerRightClick', column, event);
        },
        handleRowContextMenu(row, event) {
            this.$emit('handleRowContextMenu', row, event);
        },
        handleRowDbClick(row, event) {
            this.$emit('handleRowDbClick', row, event);
        },
        handleSelectedRow(selection, row) {
            this.$emit('select', selection, row);
        },
        handleSelectedAllRow(selection) {
            this.$emit('select-all', selection);
        },
        handlerChange(val) {
            this.$emit('handlerChange', val);
        },
        handleCurrentChange(val1, val2) {
            this.$emit('current-change', val1, val2);
        },
        sortChange(column) {
            this.$emit('sortChange', column);
        },
        setCurrentRow(row) {
            this.$refs.selfTable.setCurrentRow(row);
        },
        getPagination(pagination) {
            this.$emit('handlePaginationChange', pagination);
        },
    }
};
</script>
