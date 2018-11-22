<template>
    <div :class="$style.abnormity_analysis">
        <bread-crumb :breadcrumbList="breadcrumbs"></bread-crumb>
        <card-form :class="$style.a_form_box"></card-form>
        <div :class="$style.bar_right">
            <card-table :class="$style.a_form_table_bar"></card-table>
            <bar-echarts :class="$style.a_form_table_bar"></bar-echarts>
        </div>
        <div :class="$style.export_button">
            <el-button :class="$style.export_bt" type="primary" @click="exportClick">导出CSV</el-button>
        </div>
        <a-t-details :class="$style.a_form_box"></a-t-details>
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
            // 导出CSV
            exportClick(){},
        }
    };
</script>
<style lang="less" module>
    .abnormity_analysis {
        color: #fff;
        .bar_right {
            width: 100%;
            height: 600px;
            display: flex;
            justify-content: space-between;
            .a_form_table_bar {
                width: 49.3%;
                box-shadow: 0 0 10px #326fcb;
                margin-bottom: 20px;
            }
        }
        .a_form_box {
            box-shadow: 0 0 10px #326fcb;
            margin-bottom: 20px;
        }
        .export_button {
            display: flex;
            justify-content: center;
            margin-bottom: 25px;
            .export_bt {
                color: #fff;
                background-color: rgb(7, 39, 89);
                border: 1px solid rgb(0, 157, 224);
                font-size: 13px;
                padding: 10px 30px;
            }
        }
    }

</style>
