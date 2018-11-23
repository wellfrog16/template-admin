<template>
    <div :class="$style.card_table">
        <el-card :class="$style.a_form_table_bar">
            <el-tabs v-model="activeName" type="card" :class="$style.pane_titles">
                <el-tab-pane
                    v-for="active in activeNameList"
                    :label="active.label"
                    :key="active.name"
                    :name="active.name">
                    <el-table
                        size="small"
                        ref="multipleTable" s
                        height="450"
                        highlight-current-row
                        tooltip-effect="dark"
                        :data="active.tableDataList"
                        border
                        @select="handleRowSelect"
                        @selection-change="handleSelectionChange"
                        style="width: 100%;">
                        <el-table-column
                            v-for="(item,index) in active.tableColumns"
                            :key="item.field"
                            :prop="item.field"
                            :label="item.title"
                            :align="item.align"
                            :min-width="item.width">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-card>
        <div :class="$style.export_button">
            <el-button :class="$style.export_bt" type="primary" @click="exportClick">导出CSV</el-button>
        </div>
    </div>

    <!--<div>-->
    <!--<el-button :class="$style.export_bt" type="primary" @click="exportClick1">导出CSV</el-button>-->
    <!--</div>-->
</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)
    import MixinVue1 from "../components/MixinsForm";
    import {
        tableColumns_1, tableColumns_2, tableColumns_3
    } from '../components/constants'

    export default {
        name: "AbnormitysTableTabPane",
        // 父传子！
        props: {},

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [MixinVue1],
        // 存储数据
        data() {
            return {
                tabPosition: 'top',
                //  tab页
                activeName: 'first',
                //初始化表格信息
                activeNameList: [
                    {
                        name: 'first',
                        label: '超仓分析',
                        tableColumns: tableColumns_1,
                        tableDataList: [],
                    }, {
                        label: '频繁报撤销单分析',
                        name: 'second',
                        tableColumns: tableColumns_2,
                        tableDataList: [
                            // {
                            //     "accountTeamNo": "日期",
                            //     "customerNo": "日期",
                            //     "customerName": "日期",
                            //     "contractCode": "日期",
                            //     "ccountTeamNetPosition": "日期",
                            //     "accountNetPosition": "日期",
                            //     "muiltInventory": "日期",
                            //     "voidInventory": "日期",
                            //     "overStoreTimeTaked": "日期",
                            // },
                            // {
                            //     "accountTeamNo": "日期",
                            //     "customerNo": "日期",
                            //     "customerName": "日期",
                            //     "contractCode": "日期",
                            //     "ccountTeamNetPosition": "日期",
                            //     "accountNetPosition": "日期",
                            //     "muiltInventory": "日期",
                            //     "voidInventory": "日期",
                            //     "overStoreTimeTaked": "日期",
                            // },
                            // {
                            //     "accountTeamNo": "日期",
                            //     "customerNo": "日期",
                            //     "customerName": "日期",
                            //     "contractCode": "日期",
                            //     "ccountTeamNetPosition": "日期",
                            //     "accountNetPosition": "日期",
                            //     "muiltInventory": "日期",
                            //     "voidInventory": "日期",
                            //     "overStoreTimeTaked": "日期",
                            // },
                            // {
                            //     "accountTeamNo": "日期",
                            //     "customerNo": "日期",
                            //     "customerName": "日期",
                            //     "contractCode": "日期",
                            //     "ccountTeamNetPosition": "日期",
                            //     "accountNetPosition": "日期",
                            //     "muiltInventory": "日期",
                            //     "voidInventory": "日期",
                            //     "overStoreTimeTaked": "日期",
                            // },
                            // {
                            //     "accountTeamNo": "日期",
                            //     "customerNo": "日期",
                            //     "customerName": "日期",
                            //     "contractCode": "日期",
                            //     "ccountTeamNetPosition": "日期",
                            //     "accountNetPosition": "日期",
                            //     "muiltInventory": "日期",
                            //     "voidInventory": "日期",
                            //     "overStoreTimeTaked": "日期",
                            // },
                            // {
                            //     "accountTeamNo": "日期",
                            //     "customerNo": "日期",
                            //     "customerName": "日期",
                            //     "contractCode": "日期",
                            //     "ccountTeamNetPosition": "日期",
                            //     "accountNetPosition": "日期",
                            //     "muiltInventory": "日期",
                            //     "voidInventory": "日期",
                            //     "overStoreTimeTaked": "日期",
                            // },
                        ],
                    }, {
                        label: '自成交分析',
                        name: 'third',
                        tableColumns: tableColumns_3,
                        tableDataList: [],
                    }
                ],
            }

        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            handleRowSelect(selection, row) {
            },
            handleSelectionChange(selection, row) {
            },
            exportClick1(selection, row) {
            },
            // 导出CSV
            exportClick() {
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
    .card_table {
        color: #fff !important;
        position: relative;
        .a_form_table_bar {
            box-shadow: 0 0 10px #326fcb !important;
            padding: 0 !important;
            color: #fff !important;
        }
        :global(.el-card__body) {
            padding: 0;
            .el-tabs__item .is-active {
                color: #fff;
            }
            :global(.el-tabs__header) {
                border-bottom: 1px solid #0740a2ad;
                position: absolute;
                top: -60px;
            }
            :global(.el-tabs__item) {
                border-bottom: 0 solid #0740a2ad;
                border-left: 1px solid #0740a2ad;
                color: #fff;
            }
            :global(.el-tabs__nav) {
                color: #fff;
                border: 1px solid #0740a2ad;
            }
        }

        .export_button {
            display: flex;
            justify-content: flex-end;
            margin-top: 17px;
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
