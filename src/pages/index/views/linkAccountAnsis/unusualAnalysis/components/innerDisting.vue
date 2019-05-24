<template>
    <div class="inner-disting-page" v-loading="loading">
        <div class="dashboard">
            <el-row>
                <el-col :span="8">
                    <el-col :span="12" style="font-size: 21px; line-height: 75px;">
                        <span class="target-number" :class="{'red': upOrDown === 'up', 'green': upOrDown === 'down'}">{{ Object.keys(currentDashboardInfo).length ? currentDashboardInfo['latestPrice'] : '' }}
                            <span>
                                <i v-if="upOrDown === 'down'" class="fa fa-long-arrow-alt-down" style="font-size: 30px;"></i>
                                <i v-if="upOrDown === 'up'" class="fa fa-long-arrow-alt-up" style="font-size: 30px;"></i>
                            </span>
                        </span>
                    </el-col>
                    <el-col :span="12">
                        <p><span class="target-number" :class="{'red': upOrDown === 'up', 'green': upOrDown === 'down'}">{{ Object.keys(currentDashboardInfo).length ? priceRange : '' }}</span></p>
                        <p v-if="Object.keys(currentDashboardInfo).length ? priceRadtio : '' "><span class="target-number" :class="{'red': upOrDown === 'up', 'green': upOrDown === 'down'}">{{ Object.keys(currentDashboardInfo).length ? priceRadtio : '' }}%</span></p>
                    </el-col>
                    <el-col style="font-size:12px; color: #f5e1d1;">{{ Object.keys(queryBlockData).length ? queryBlockData.statEndTm : '' }}</el-col>
                </el-col>
                <el-col :span="16" style="font-size: 12px; line-height: 30px; color: #fff;">
                    <el-col :span="8" v-for="(item, index) in dashboardOptions" :key="index">{{ item.label }}：<span class="target-number" :class="{'red' : index === 0 && upOrDown === 'up', 'green': index === 0 && upOrDown === 'down'}">{{ Object.keys(currentDashboardInfo).length ? currentDashboardInfo[item.field] : '' }}</span></el-col>
                </el-col>
            </el-row>
        </div>
        <el-tabs type="card" v-model="activeInnerChartTab" style="margin-top: 20px;">
            <el-tab-pane label="日K图" name="0">
                <keep-alive>
                    <k-line-chart :loading="loading" :chartData="innerInfo.mtInternalExportImputList" :unusualMarkAreaData="innerInfo.mtExpeventInfoOutList" v-bind="$attrs" v-if="activeInnerChartTab === '0'" ref="kLineRef" echartRef="kLineChartRef" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></k-line-chart>
                </keep-alive>
            </el-tab-pane>
            <el-tab-pane label="分时图" name="1" >
                <keep-alive>
                    <time-sharing-trade-chart v-if="activeInnerChartTab === '1'" :loading="loading" ref="timeSharingTradeRef" echartRef="timeSharingTradeChartRef" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></time-sharing-trade-chart>
                </keep-alive>
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
        innerInfo: {
            type: Object,
            default() {
                return {};
            }
        },
        queryBlockData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    inheritAttrs: false,
    data() {
        return {
            moment,
            activeInnerChartTab: '0',
            dashboardOptions: [
                {label: '最新价', field: 'latestPrice'},
                {label: '开盘价', field: 'todayOpenQuot'},
                {label: '最高价', field: 'highestPrice'},
                {label: '最低价', field: 'lowestPrice'},
                {label: '收盘价', field: 'todaycloseQuot'},
                {label: '结算价', field: 'todayStl'},
                // {label: '昨结算', field: 'yesterdaytodayStl'},
                {label: '持仓量', field: 'makePos'},
                {label: '成交量', field: 'bargainAmt'},
                // {label: '成交价', field: 'bargainPrice'},
                // {label: '买入价', field: 'buyingPrice'},
                // {label: '卖出价', field: 'sailingPrice'},
                // {label: '买入量', field: 'buyingQuantity'},
                // {label: '卖出量', field: 'sailingQuantity'},
            ],
            // currentDashboardInfo: {
            //     latestPrice: 3999,
            //     todayOpenQuot: 2333,
            //     highestPrice: 2455,
            //     lowestPrice: 999,
            //     todaycloseQuot: 2342,
            //     todayStl: 1244,
            //     // yesterdaytodayStl: 2342,
            //     makePos: 12873,
            //     bargainQtty: 99,
            //     buyingPrice: 3456,
            //     sailingPrice: 5563,
            //     buyingQuantity: 56,
            //     sailingQuantity: 66,
            //     bargainPrice: 234,
            // }
        };
    },
    computed: {
        currentDashboardInfo() {
            return this.innerInfo.deepMarInfoHisVo || {};
        },
        priceRange() {
            return (this.currentDashboardInfo['todaycloseQuot'] - this.currentDashboardInfo['yestdcloseQuot']).toFixed(2);
        },
        priceRadtio() {
            return (this.currentDashboardInfo.roseRate * 100).toFixed(2);
            // return ((this.currentDashboardInfo['latestPrice'] - this.currentDashboardInfo['todaycloseQuot']) / this.currentDashboardInfo['todaycloseQuot']).toFixed(2);
        },
        upOrDown() {
            return this.currentDashboardInfo.flag === '1' ? 'up' : this.currentDashboardInfo.flag === '-1' ? 'down' : '';
            // return this.currentDashboardInfo['latestPrice'] < this.currentDashboardInfo['todaycloseQuot'] ? 'down' : this.currentDashboardInfo['latestPrice'] > this.currentDashboardInfo['todaycloseQuot'] ? 'up' : '';
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
                    color: #ec0000;
                }
                &.green {
                    color: #5def5d;
                }
            }
        }
    }
</style>
