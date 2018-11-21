<template>
    <div :class="$style.abnormity_analysis">
        <bread-crumb :breadcrumbList="breadcrumbs"></bread-crumb>
        <card-form :class="$style.a_form_box"></card-form>
        <card-table :class="$style.a_form_box"></card-table>
    </div>
</template>
<script>
export default {
    components: {
        BreadCrumb: () => import('@/components/index/home/breadCrumbs'),
        CardForm: () => import('../abnormityAnalysis/components/cardForm'),
        CardTable: () => import('../abnormityAnalysis/components/cardTable')

    },
    data() {
        return {
            // 面包屑
            breadcrumbs: [
                {
                    router: '/',
                    label: '首页'
                },
                {
                    router: '',
                    label: '数据分析工具'
                },
                {
                    router: 'dictionary',
                    label: '异常交易分析'
                }
            ],

        };
    },
    methods: {

    }
};
</script>
<style lang="less" module>
    .abnormity_analysis {
        color: #fff;
        .a_form_box {
            box-shadow: 0 0 10px #326fcb;
            margin-bottom: 20px;
        }
    }
</style>
