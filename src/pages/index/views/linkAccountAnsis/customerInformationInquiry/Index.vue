<template>
    <div :class="$style.card_table">
        <s-card :title="`客户地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
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
            </div>
        </s-card>
        <s-card :title="`客户交易信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
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
            </div>
        </s-card>
        <s-card :title="`精确信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
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
            </div>
        </s-card>
        <s-card :title="`模糊地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
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
            </div>
        </s-card>
    </div>
</template>
<script>
    import SCard from '@/components/index/common/SCard';

    export default {
        name: "Index",
        // 父传子！
        props: {},

        components: {
            SCard,
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                tableData: [],
                tablePaneList: {},
                // 底部列表
                tableColumns: [
                    {field: "acctNum", title: "账户组号", width: 150, align: 'center'},
                    {field: "custId", title: "客户编号", width: 150, align: 'center'},
                    {field: "custName", title: "客户名称", width: 150, align: 'center'},
                    {field: "memCd", title: "合约代码", width: 150, align: 'center'},
                    {field: "memName", title: "账户组当前净持仓", width: 150, align: 'center'},
                    {field: "breed", title: "账户当前净持仓", width: 150, align: 'center'},
                    {field: "contrCd", title: "多单持仓量", width: 150, align: 'center'},
                    {field: "supSto", title: "空单持仓量", width: 150, align: 'center'},
                    {field: "freDraBill", title: "统计区间超仓天数", width: 150, align: 'center'},
                    {field: "bargain", title: "统计区间超仓天数", width: 150, align: 'center'},
                ],
            }

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
    .card_table {
        width: 100%;
    }
</style>
