<template>
    <el-card :class="$style.card_model">

    </el-card>

</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)

    // 时间区间
    import SDatePicker from '@/components/index/common/SDatePicker';
    // 导入CSV
    import UploadCommon from '@/components/index/common/UploadCommon';

    export default {
        name: "model",
        // 父传子！
        props: {
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
        },

        components: {
            UploadCommon: () => import('@/components/index/common/UploadCommon'), // 导入CSV
            SDatePicker: () => import('@/components/index/common/SDatePicker')   // 时间区间
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {};
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {},
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .model {
        color: #13ce66;
    }

</style>
