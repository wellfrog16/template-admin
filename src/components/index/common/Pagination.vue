<!--分页组件页面-->
<template>
    <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pagination.pageIndex"
            :page-sizes="pageSizes"
            :page-size="pagination.pageRows"
            :layout="layout"
            :total="pageTotal">
        </el-pagination>
    </div>
</template>
<!--suppress ALL -->
<script>
export default {
    props: {
        paginationProps: {
            type: Object,
            default() {
                return {
                    pageIndex: 1,
                    pageRows: 10
                };
            }
        },
        pageTotal: {
            type: Number,
            default: 0
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50, 100, 200];
            }
        },
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next'
        }
    },
    data() {
        return {
            pagination: {
                pageIndex: 1,
                pageRows: 10
            }
        };
    },
    watch: {
        paginationProps: {
            handler(newValue) {
                this.pagination = newValue;
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
        handleSizeChange(val) {
            this.pagination = {
                pageIndex: 1,
                pageRows: val
            };
            this.$emit('getPagination', this.pagination);
        },
        // 当前页改变传值
        handleCurrentChange(val) {
            this.pagination.pageIndex = val;
            this.$emit('getPagination', this.pagination);
        }
    },
    mounted() {
    }
};
</script>

<style scoped>

</style>
