<template>
    <div :class="$style.card_table">
        <s-table
            sortable
            :height="460"
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
import {tableColumns1} from '../components/constants';
import STable from '@/components/index/common/STable';
export default {
    name: 'Atable1',
    props: {
        tableData1: {
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
        tableData1: {
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
            fullScreenLoading1: false, // bar 加载
            aLoading: false,
            tableColumns: tableColumns1,
            tableData: []
        };
    },
    methods: {
        // Bar 柱状图(双击)
        tableellDblClick (row) {
            // this.clearChartData();
            let rowCustId = [];
            if (this.tableData1 && this.tableData1.length !== 0) {
                for (let i = 0; i < this.tableData1.length; i++) {
                    if (this.tableData1[i].acctNum === row.acctNum) {
                        rowCustId.push(this.tableData1[i].custId);
                    }
                }
            };
            let params = {
                'accountTeamNo': row.acctNum, // 账户组号
                'arrCustId': rowCustId, // 客户编号
                'statTimeBegin': this.$store.getters.momentGetters.statTimeBegin, // 统计起始日
                'statTimeEnd': this.$store.getters.momentGetters.statTimeEnd, // 统计截止日
                'contrCode': row.contrCd, // 合约代码
                'type': '0', // 取值 '0,1,2':超仓分析
            };
            this.Echarts1Loading1 = true;
            this.fullScreenLoading1 = true;
            this.$emit('EchartsClickLoading', this.Echarts1Loading1);
            // Bar 柱状图接口
            postImportAccounBar(params).then(resp => {
                if (resp && resp.length !== 0) {
                    this.Echarts1Loading1 = false;
                    this.fullScreenLoading1 = false;
                    this.$store.commit('overStoreMut', resp);
                    this.$emit('barEchartsCick', resp ? resp : {}, '0' );
                    this.$emit('EchartsClickLoading', this.Echarts1Loading1);
                }
            }).catch(e => {
                this.fullScreenLoading1 = false;
            });
        }
    },
    mounted() {}
}
</script>

<style lang='less' module></style>
