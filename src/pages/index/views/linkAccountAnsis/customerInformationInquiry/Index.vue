<template>
    <div :class="$style.card_table">
        <!--客户地址查询-->
        <s-c-add></s-c-add>
        <!--客户交易信息查询-->
        <s-c-transactions></s-c-transactions>
        <!--精确信息查询-->
        <s-p-information></s-p-information>
        <!--模糊地址查询-->
        <s-f-address></s-f-address>
    </div>
</template>
<script>

    export default {
        name: "Index",
        // 父传子！
        props: {},
        components: {
            SCAdd: () => import('../customerInformationInquiry/components/customerAddress'),         // 客户地址查询
            SCTransactions: () => import('../customerInformationInquiry/components/customerTransactions'),   // 客户交易信息查询
            SPInformation: () => import('../customerInformationInquiry/components/preciseInformation'),    // 精确信息查询
            SFAddress: () => import('../customerInformationInquiry/components/fuzzyAddress'),         // 模糊地址查询
        },
        // 存储数据
        data() {
            return {
            }

        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            // 客户地址查询

            // 客户交易信息查询

            // 精确信息查询

            // 模糊地址查询

        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {},
        beforeDestroy() {}
    };
</script>
<style lang="less" module>
    .card_table {
        width: 100%;
    }
</style>
