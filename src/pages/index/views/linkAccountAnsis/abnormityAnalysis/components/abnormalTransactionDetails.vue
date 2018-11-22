<template>
    <el-card :class="$style.abnormal_transaction_details">
        <!--<div :class="$style.card_table_bt"></div>-->
        <el-table
            :data="tableDataList"
            border
            style="width: 100%;">
            <el-table-column
                v-for="(item,index) in tableColumns"
                :key="item.field"
                :prop="item.field"
                :label="item.title"
                :align="item.align"
                :min-width="item.width">
            </el-table-column>
        </el-table>
    </el-card>

</template>
<script>
    export default {
        name: "abnormal-transaction-details",
        // 父传子！
        props: {},

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                tableDataList: [
                    {"trade_date1": "日期", "trade_date2": "日期", "trade_date3": "日期",},
                ],
                tableColumns: [
                    {field: "trade_date1", title: "日期",width: 150, align: 'center'},
                    {field: "trade_date2", title: "日期",width: 150, align: 'center'},
                    {field: "trade_date3", title: "日期",width: 150, align: 'center'},
                ],
            };
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
    .abnormal_transaction_details {
        color: #13ce66;
    }

</style>
