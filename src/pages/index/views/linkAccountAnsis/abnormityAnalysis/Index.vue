<template>
    <div :class="$style.abnormity_analysis">
        <bread-crumb :breadcrumbList="breadcrumbs"></bread-crumb>
        <card-form :class="$style.a_form_box"></card-form>
        <div :class="$style.bar_right">
            <card-table :class="$style.a_form_table_bar"></card-table>
            <bar-echarts :class="$style.a_form_table_bar"></bar-echarts>
        </div>
        <a-t-details></a-t-details>
    </div>
</template>
<script>

    export default {
        components: {
            BreadCrumb: () => import('@/components/index/home/breadCrumbs'),
            CardForm: () => import('../abnormityAnalysis/components/cardForm'),
            CardTable: () => import('../abnormityAnalysis/components/cardTable'),
            ATDetails: () => import('../abnormityAnalysis/components/abnormalTransactionDetails'),
            BarEcharts: () => import('../abnormityAnalysis/components/barEcharts'),

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
        .bar_right {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .a_form_table_bar {
                width: 49.3%;
                margin-bottom: 20px;
            }
        }
        .a_form_box {
            margin-bottom: 20px;
        }
    }

</style>
