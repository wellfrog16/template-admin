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
import {tableColumns3} from '../components/constants';
import STable from '@/components/index/common/STable';
export default {
    name: 'Atable3',
    props: {
        tableData3: {
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
        tableData3: {
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
            iSecharts3: false, // bar 延迟
            fullScreenLoading1: false, // bar 加载
            aLoading: false,
            tableColumns: tableColumns3,
            tableData: [],
        };
    },
    methods: {
        // Bar 柱状图(双击)
        tableellDblClick (row) {
            let rowCustId = [];
            // this.clearChartData();
            if (this.tableData3 && this.tableData3.length !== 0) {
                for (let i = 0; i < this.tableData3.length; i++) {
                    if (this.tableData3[i].acctNum === row.acctNum) {
                        rowCustId.push(this.tableData3[i].custId);
                    }
                }
            };
            let params = {
                'accountTeamNo': row.acctNum, // 账户组号
                'arrCustId': rowCustId, // 客户编号
                'statTimeBegin': this.$store.getters.momentGetters.statTimeBegin, // 统计起始日
                'statTimeEnd': this.$store.getters.momentGetters.statTimeEnd, // 统计截止日
                'contrCode': row.contrCd, // 合约代码
                'type': '2', // 取值 '1':超仓分析
            };
            this.Echarts1Loading1 = true;
            this.fullScreenLoading1 = true;
            this.$emit('EchartsClickLoading', this.Echarts1Loading1);
            // Bar 柱状图接口
            postImportAccounBar(params).then(resp => {
                this.Echarts1Loading1 = false;
                this.fullScreenLoading1 = false;
                this.$store.commit('autoTradeMut', resp);
                this.$emit('barEchartsCick', resp ? resp : {}, '2');
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
