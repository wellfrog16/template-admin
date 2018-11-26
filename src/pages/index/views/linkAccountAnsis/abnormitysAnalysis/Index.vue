<template>
    <div :class="$style.abnormity_analysis">
        <bread-crumb :breadcrumbList="breadcrumbs"></bread-crumb>
        <a-form :class="$style.a_form_box"></a-form>

    </div>
</template>
<script>
    export default {
        name: '',
        components: {
            BreadCrumb: () => import('@/components/index/home/breadCrumbs'),
            AForm: () => import('../abnormitysAnalysis/components/AbnormitysForm'),
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
    }

</style>
