<template>
    <el-card :class="$style.card_table">
        <el-tabs v-model="activeName">
            <el-tab-pane
                v-for="active in activeNameList"
                :label="active.label"
                :key="active.name"
                :name="active.name">
                <el-table
                    :data="active.tableDataList"
                    border
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

</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)
    import {
        tableColumns_1, tableColumns_2, tableColumns_3
    } from '../components/constants'
    export default {
        name: "cardTable",
        // 父传子！
        props: {},

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
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
                        tableDataList: [],
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
    .self-card-component {
        box-shadow: 0 0 10px #326fcb;
        margin-bottom: 20px;
    }

</style>
