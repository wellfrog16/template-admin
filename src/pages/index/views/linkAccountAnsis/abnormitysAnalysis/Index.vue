<template>
    <div :class="$style.abnormity_analysis">
        <bread-crumb :breadcrumbList="breadcrumbs"></bread-crumb>
        <a-form :class="$style.a_form_box"></a-form>
        <div :class="$style.bar_right">
            <a-table-tab-pane :class="$style.a_form_table_bar"></a-table-tab-pane>
            <a-b-earcharts :class="$style.a_form_table_bar"></a-b-earcharts>
        </div>
        <a-table></a-table>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {
            BreadCrumb: () => import('@/components/index/home/breadCrumbs'),
            AForm: () => import('../abnormitysAnalysis/components/AbnormitysForm'),
            ATableTabPane: () => import('../abnormitysAnalysis/components/AbnormitysTableTabPane'),
            ATable: () => import('../abnormitysAnalysis/components/AbnormitysTable'),
            ABEarcharts: () => import('../abnormitysAnalysis/components/AbnormitysBarEcharts'),
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
            margin-bottom: 75px;
        }
    }

</style>
