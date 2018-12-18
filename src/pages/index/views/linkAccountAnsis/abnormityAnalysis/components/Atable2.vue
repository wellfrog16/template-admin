<template>
    <div :class="$style.card_table">
        <s-table
            sortable
            :height="450"
            :loading="loadingTable"
            :columns="tableColumns"
            :tableData="tableData"
            @cellDblClick="tableellDblClick"
        ></s-table>
    </div>
</template>

<script>
    // Bar 柱状图接口
    import {postImportAccounBar} from '@/api/dataAnsis/abnormityAnalysis';
    import {tableColumns2} from '../components/constants';
    import STable from '@/components/index/common/STable';

    export default {
        name: 'Atable2',
        props: {
            tableData2: {
                type: Array,
                required: true
            },
            // 加载
            loadingTable: {
                ttype: Boolean,
                default() {
                    return {};
                }
            }
        },
        components: {STable},
        watch: {
            tableData2: {
                handler(val) {
                    if (val) {
                        this.tableData = val;
                    }
                }
            }
        },
        data() {
            return {
                Echarts1Loading1: false, // bar 加载
                iSecharts: false, // bar 延迟
                fullScreenLoading1: false, // bar 加载
                aLoading: false,
                tableColumns: tableColumns2,
                tableData: [],
            };
        },
        methods: {
            tableellDblClick (row) {
                let rowCustId = [];
                // this.clearChartData();
                if (this.tableData2 && this.tableData2.length !== 0) {
                    for (let i = 0; i < this.tableData2.length; i++) {
                        if (this.tableData2[i].acctNum === row.acctNum) {
                            rowCustId.push(this.tableData2[i].custId);
                        }
                    }
                };
                let params = {
                    'accountTeamNo': row.acctNum, // 账户组号
                    'arrCustId': rowCustId, // 客户编号
                    'statTimeBegin': this.$store.getters.momentGetters.statTimeBegin, // 统计起始日
                    'statTimeEnd': this.$store.getters.momentGetters.statTimeEnd, // 统计截止日
                    'contrCode': row.contrCd, // 合约代码
                    'type': '1', // 取值 '1':超仓分析
                };
                this.Echarts1Loading1 = true;
                this.fullScreenLoading1 = true;
                this.$emit('EchartsClickLoading', this.Echarts1Loading1);
                // Bar 柱状图接口
                postImportAccounBar(params).then(resp => {
                    this.Echarts1Loading1 = false;
                    this.fullScreenLoading1 = false;
                    this.$store.commit('frequentMut', resp);
                    this.$emit('barEchartsCick', resp ? resp : {}, '1');
                    this.$emit('EchartsClickLoading', this.Echarts1Loading1);
                }).catch(e => {
                    this.fullScreenLoading1 = false;
                });
            }
        },
        mounted() {}
    }
</script>
<style lang='less' module></style>
