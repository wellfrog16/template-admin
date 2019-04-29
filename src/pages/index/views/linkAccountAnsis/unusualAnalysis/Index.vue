<template>
    <div class="unusual-analysis-page">
        <query-block></query-block>
        <!-- <el-tabs v-model="activeTab" @tab-click="handleClick">
            <el-tab-pane label="内因识别" name="0">
            </el-tab-pane>
            <el-tab-pane label="外因识别" name="1"></el-tab-pane>
        </el-tabs> -->
        <el-row :gutter="15">
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
                <s-card class="inner-distinguish" :title="`内因识别`" :icon="`fa fa-broadcast-tower`" :propsHeight="850">
                    <div slot="content">
                        <!-- <p class="header-css" style="margin-top:0;">K线图和分时图</p> -->
                        <!-- <distinguish-index :indexType="0" :distinguishIndexOptions="distinguishIndexOptions[0]"></distinguish-index> -->
                        <inner-disting :unusualMarkAreaData="unusualMarkAreaData"></inner-disting>
                    </div>
                </s-card>
            </el-col>
            <el-col :xl="12" :lg="12" :md="12" :sm="24">
                <s-card class="outer-distinguish" :title="`外因识别`" :icon="`fa fa-compass`" :propsHeight="850">
                    <div slot="content" style="height: 764px; overflow: auto;">
                        <p class="header-css" style="margin-top:0;">重要舆情</p>
                        <!-- <distinguish-index :indexType="1" :distinguishIndexOptions="distinguishIndexOptions[1]"></distinguish-index> -->
                        <important-consensus :unusualMarkAreaData="unusualMarkAreaData" v-bind="$attrs"></important-consensus>
                        <p class="header-css">舆情热度</p>
                        <!-- <distinguish-index :indexType="2" :distinguishIndexOptions="distinguishIndexOptions[2]"></distinguish-index> -->
                        <consensus-hot-chart :unusualMarkAreaData="unusualMarkAreaData" v-bind="$attrs"></consensus-hot-chart>
                        <p class="header-css">热词走势</p>
                        <!-- <distinguish-index :indexType="3" :distinguishIndexOptions="distinguishIndexOptions[3]"></distinguish-index> -->
                        <hot-words-trend-chart :unusualMarkAreaData="unusualMarkAreaData" v-bind="$attrs"></hot-words-trend-chart>
                        <p class="header-css">情感走势</p>
                        <!-- <distinguish-index :indexType="4" :distinguishIndexOptions="distinguishIndexOptions[4]"></distinguish-index> -->
                        <emotional-trend-chart :unusualMarkAreaData="unusualMarkAreaData" v-bind="$attrs"></emotional-trend-chart>
                    </div>
                </s-card>
            </el-col>
            <el-col :span="24">
                <s-card class="reasoning-map" :title="`${showReasonReport ? '动因报告' : '异常原因推理图谱'}`" :icon="`${showReasonReport ? 'fa fa-file-contract' : 'fab fa-hubspot'}`">
                    <div slot="right">
                        <el-button type="text" @click="toggleDetail">
                            <span v-if="!showReasonReport">动因报告<i class="fa fa-file-import" style="margign-left: 5px;"></i></span>
                            <span v-else>图谱<i class="fa fa-undo-alt" style="margign-left: 5px;"></i></span>
                        </el-button>
                    </div>
                    <div slot="content">
                        <reasoning-map v-show="!showReasonReport" :propsChartHeight="450"></reasoning-map>
                        <div v-show="showReasonReport">
                            <s-table :height="450" :columns="reasonReportColumns" :tableData="reasonReportData"></s-table>
                        </div>
                    </div>
                </s-card>
            </el-col>
            <el-col :span="24">
                <s-card class="unusual-report" :title="`异常报告`" :icon="`fa fa-file-signature`">
                    <div slot="right">
                        <el-button type="primary" size="small" @click="handleExportUnusualReport">导出分析</el-button>
                    </div>
                    <div slot="content">
                        <s-table :columns="unusualReportColumns" :tableData="unusualReportData" :rowStyle="rowStyle"></s-table>
                    </div>
                </s-card>
            </el-col>
            <el-col style="text-align: center;">
                <el-button type="warning" size="small" @click="nextStep">下一步</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import queryBlock from './components/queryBlock';
// import distinguishIndex from './components/distinguishIndex';
import innerDisting from './components/innerDisting';
import importantConsensus from './components/importantConsensus';
import consensusHotChart from './components/consensusHotChart';
import hotWordsTrendChart from './components/hotWordsTrendChart';
import emotionalTrendChart from './components/emotionalTrendChart';
import reasoningMap from './components/reasoningMap';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {reasonReportColumns, unusualReportColumns} from './components/constants';
export default {
    components: {
        queryBlock,
        // distinguishIndex,
        innerDisting,
        importantConsensus,
        consensusHotChart,
        hotWordsTrendChart,
        emotionalTrendChart,
        reasoningMap,
        SCard,
        STable
    },
    data() {
        return {
            reasonReportColumns,
            unusualReportColumns,
            activeTab: '0',
            showReasonReport: false,
            unusualMarkAreaData: [[{name: '异常区域', xAxis: '2019-04-12'}, {xAxis: '2019-04-13'}], [{name: '异常区域', xAxis: '2019-04-15'}, {xAxis: '2019-04-16'}]],
            reasonReportData: [
                {name: '美油价格', curPrice: '11', hisPriceAvg: '1', deviate: '1', influenceEffect: '1', attribute: '外因/宏观因素'},
                {name: '原油价格', curPrice: '22', hisPriceAvg: '3', deviate: '3', influenceEffect: '3', attribute: '内因/异常交易'},
                {name: '汇率', curPrice: '13', hisPriceAvg: '13', deviate: '4', influenceEffect: '4', attribute: '外因'},
                {name: '交易量', curPrice: '44', hisPriceAvg: '21', deviate: '3', influenceEffect: '4', attribute: '外因'},
                {name: '现货价格偏离', curPrice: '23', hisPriceAvg: '31', deviate: '12', influenceEffect: '21', attribute: '内因'},
                {name: '舆情情感', curPrice: '13', hisPriceAvg: '11', deviate: '1', influenceEffect: '11', attribute: '外因'},
            ],
            unusualReportData: [
                {varieties: '原油', identifyingTargets: '舆情', keywords: '减产', timeRange: '2019-04-02 10:01:09 -- 11:00:02', thingsDesc: '**', userRange: '1000', influenceRange: '20%', grade: '高'},
                {varieties: '原油', identifyingTargets: '价格', keywords: '价格波动过大', timeRange: '2019-04-02 10:01:09 -- 11:00:02', thingsDesc: '**', userRange: '1000', influenceRange: '10%', grade: '中'},
                {varieties: '沪铜', identifyingTargets: '现期', keywords: '期现差', timeRange: '2019-04-02 10:01:09 -- 11:00:02', thingsDesc: '**', userRange: '1000', influenceRange: '4%', grade: '低'},
                {varieties: '原油', identifyingTargets: '舆情', keywords: '减产', timeRange: '2019-04-02 10:01:09 -- 11:00:02', thingsDesc: '**', userRange: '1000', influenceRange: '20%', grade: '高'},
            ],
            distinguishIndexOptions: [
                [
                    {label: '买入成交量', value: '>=90%'},
                    {label: '卖出成交量', value: '>=90%'},
                    {label: '多头持仓', value: '>=90%'},
                    {label: '买入成交量', value: '>=90%'},
                    {label: '买入成交量', value: '>=90%'},
                    {label: '买入成交量', value: '>=90%'}
                ],
                [
                    {label: '报道量', value: '>=90%'},
                    {label: '评论量', value: '>=90%'},
                    {label: '转载量', value: '>=90%'},
                ],
                [
                    {label: '搜索量', value: '>=90%'},
                    {label: '评论量', value: '>=90%'},
                ],
                [
                    {label: '主题词模型', value: '>=90%'},
                ],
                [
                    {label: '情感模型', value: '>=90%'},
                    {label: '情感偏离值', value: '>=90%'},
                ]
            ]
        };
    },
    methods: {
        handleExportUnusualReport() {},
        toggleDetail() {
            this.showReasonReport = !this.showReasonReport;
        },
        rowStyle({row}) {
            if (row.grade === '高') {
                return {'color': '#ec6e6e'};
            } else if (row.grade === '中') {
                return {'color': '#f7f01b'};
            } else if (row.grade === '低') {
                return {'color': '#1bf772'};
            }
            return {'color': '#fff'};
        },
        nextStep() {
            this.$confirm('离开本页面信息将丢失，是否确定离开?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.$router.push({name: 'tradeAnalysis'});
                });
        },
    }
};
</script>

<style lang="less" scoped>
    .unusual-analysis-page {
        .header-css {
            color: #fff;
            margin-left: -20px;
            padding: 10px 32px;
            background: url('../../../../../assets/img/usr/card_header_bg.png') no-repeat -10px bottom;
            background-size: 200px;
        }
    }
</style>
