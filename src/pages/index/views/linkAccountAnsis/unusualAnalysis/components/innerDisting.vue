<template>
    <div class="inner-disting-page">
        <div class="dashboard">
            <el-row>
                <el-col :span="8">
                    <el-col :span="12" style="font-size: 21px; line-height: 65px;">
                        <span class="target-number" :class="{'red': upOrDown === 'up', 'green': upOrDown === 'down'}">{{ currentDashboardInfo['newPrice'] }}
                            <span>
                                <i v-if="upOrDown === 'down'" class="fa fa-long-arrow-alt-down" style="font-size: 30px;"></i>
                                <i v-if="upOrDown === 'up'" class="fa fa-long-arrow-alt-up"></i>
                            </span>
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <p><span class="target-number" :class="{'red': upOrDown === 'up', 'green': upOrDown === 'down'}">{{ priceRange }}</span></p>
                        <p><span class="target-number" :class="{'red': upOrDown === 'up', 'green': upOrDown === 'down'}">{{ priceRadtio }}%</span></p>
                    </el-col>
                    <el-col style="font-size:12px; color: #f5e1d1;">{{ moment(new Date()).format('YYYY-MM-DD HH:mm:ss') }}</el-col>
                </el-col>
                <el-col :span="16" style="font-size: 12px; line-height: 30px; color: #fff;">
                    <el-col :span="6" v-for="(item, index) in dashboardOptions" :key="index">{{ item.label }}：<span class="target-number" :class="{'red' : index === 0 && upOrDown === 'up', 'green': index === 0 && upOrDown === 'down'}">{{ currentDashboardInfo[item.field] }}</span></el-col>
                </el-col>
            </el-row>
        </div>
        <el-tabs type="card" v-model="activeInnerChartTab">
            <el-tab-pane label="日K图" name="0">
                <k-line-chart v-bind="$attrs" v-if="activeInnerChartTab === '0'" :loading="loading" ref="kLineRef" echartRef="kLineChartRef" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></k-line-chart>
            </el-tab-pane>
            <el-tab-pane label="分时图" name="1" >
                <time-sharing-trade-chart v-if="activeInnerChartTab === '1'" :loading="loading" ref="timeSharingTradeRef" echartRef="timeSharingTradeChartRef" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></time-sharing-trade-chart>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import kLineChart from './kLineChart';
import timeSharingTradeChart from './timeSharingTradeChart';
import moment from 'moment';
export default {
    components: {
        kLineChart,
        timeSharingTradeChart
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
    },
    inheritAttrs: false,
    data() {
        return {
            moment,
            activeInnerChartTab: '0',
            dashboardOptions: [
                {label: '最新价', field: 'newPrice'},
                {label: '开盘价', field: 'openPrice'},
                {label: '最高价', field: 'highestPrice'},
                {label: '最低价', field: 'lowestPrice'},
                {label: '结算价', field: 'settlementPrice'},
                {label: '昨结算', field: 'yesterdaySettlementPrice'},
                {label: '持仓量', field: 'openInterest'},
                {label: '成交量', field: 'volume'},
                {label: '买入价', field: 'buyingPrice'},
                {label: '卖出价', field: 'sailingPrice'},
                {label: '买入量', field: 'buyingQuantity'},
                {label: '卖出量', field: 'sailingQuantity'},
            ],
            currentDashboardInfo: {
                newPrice: 3999,
                openPrice: 2333,
                highestPrice: 2455,
                lowestPrice: 999,
                settlementPrice: 1244,
                yesterdaySettlementPrice: 2342,
                openInterest: 12873,
                volume: 99,
                buyingPrice: 3456,
                sailingPrice: 5563,
                buyingQuantity: 56,
                sailingQuantity: 66,
            }
        };
    },
    computed: {
        priceRange() {
            return this.currentDashboardInfo['newPrice'] - this.currentDashboardInfo['yesterdaySettlementPrice'];
        },
        priceRadtio() {
            return ((this.currentDashboardInfo['newPrice'] - this.currentDashboardInfo['yesterdaySettlementPrice']) / this.currentDashboardInfo['yesterdaySettlementPrice']).toFixed(2);
        },
        upOrDown() {
            return this.currentDashboardInfo['newPrice'] < this.currentDashboardInfo['yesterdaySettlementPrice'] ? 'down' : this.currentDashboardInfo['newPrice'] > this.currentDashboardInfo['yesterdaySettlementPrice'] ? 'up' : '';
        }
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        }
    }
};
</script>
<style lang="less" scoped>
    .inner-disting-page {
        .dashboard {
            padding: 15px;
            margin: 10px 0;
            border: 1px dashed #ccc;
            border-radius: 5px;
            .target-number {
                color: #f5e1d1;
                &.red {
                    color: #f34f5f;
                }
                &.green {
                    color: #5def5d;
                }
            }
        }
    }
</style>
