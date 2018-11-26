<template>
    <div :class="$style.abnormal_transaction_details">
        <el-card :class="$style.a_form_table_bar ">
            <el-table
                :data="tableData"
                border
                height="410"
                style="width: 100%;">
                <el-table-column
                    v-for="(item,index) in tableColumns"
                    :key="item.field" :prop="item.field" :label="item.title" :align="item.align"
                    :min-width="item.width">
                </el-table-column>
            </el-table>
        </el-card>
        <div :class="$style.export_button">
            <el-button :class="$style.export_bt" type="primary" @click="backClick1">上一步</el-button>
            <el-button :class="$style.export_bt" type="primary" @click="exportClick1">导出CSV</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        name: "AbnormitysTable",
        // 父传子！
        props: {
            tableData: {
                type: Array,
                default: true
            },
        },

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                tableColumns: [
                    {field: "acctNum", title: "账户组号",width: 150, align: 'center'},
                    {field: "custId", title: "客户编号",width: 150, align: 'center'},
                    {field: "custName", title: "客户名称",width: 150, align: 'center'},
                    {field: "memCd", title: "合约代码",width: 150, align: 'center'},
                    {field: "memName", title: "账户组当前净持仓",width: 150, align: 'center'},
                    {field: "breed", title: "账户当前净持仓",width: 150, align: 'center'},
                    {field: "contrCd", title: "多单持仓量",width: 150, align: 'center'},
                    {field: "supSto", title: "空单持仓量",width: 150, align: 'center'},
                    {field: "freDraBill", title: "统计区间超仓天数",width: 150, align: 'center'},
                    {field: "bargain", title: "统计区间超仓天数",width: 150, align: 'center'},
                ],
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            // 导出CSV
            exportClick1() {
            },
            // 上一步
            backClick1() {
                console.log(this.tableData);
            },
        },
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
    .a_form_table_bar {
        box-shadow: 0 0 10px #326fcb !important;
        padding: 0 !important;
        color: #fff !important;
    }
    .export_button {
        display: flex;
        justify-content: center;
        margin: 25px 0;
        .export_bt {
            color: #fff;
            background-color: rgb(7, 39, 89);
            border: 1px solid rgb(0, 157, 224);
            font-size: 13px;
            padding: 10px 30px;
        }
    }
    .abnormal_transaction_details {
        color: #13ce66;
    }

</style>
