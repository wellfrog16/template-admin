<template>
    <div class="trade-analysis-main">
        <!-- 查询条件 -->
        <query-block @handleConfirmQuery="handleConfirmQuery" :loading="loading"></query-block>
        <!-- 事件分析模块 -->
        <s-card title="事件分析" icon="fa fa-file-contract">
            <div slot="content">
                <event-analysis :loadingBasicInfo="loadingBasicInfo" :loadingEventChartData="loadingEventChartData" :unusualMarkArea="unusualMarkArea" :propsEventBasicInfo="eventBasicInfo" :propsEventChartData="eventChartData" @updateEventBasicInfo="getEventBasicInfo"></event-analysis>
            </div>
        </s-card>
        <!-- 用户画像模块 -->
        <s-card title="用户画像分析" icon="fa fa-user" :loading="loadingUserList">
            <div slot="content">
                <user-list :propsUserList="userList" :ruleForm="ruleForm"></user-list>
            </div>
        </s-card>
        <!-- 异常行为分析 -->
        <s-card title="异常行为分析" icon="fa fa-file-invoice-dollar" :loading="loadingUnusualReport">
            <div slot="content">
                <abnorma-analysis :unusualReport="unusualReport"></abnorma-analysis>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import queryBlock from './components/queryBlock';
import userList from './components/userList';
import abnormaAnalysis from './components/abnormaAnalysis';
import eventAnalysis from './components/eventAnalysis';
import {
    queryEventInfo,
    queryEventChartData,
    queryUserList,
    createUnusualReport,
} from '@/api/tradeAnalysis';
import moment from 'moment';
export default {
    components: {
        SCard,
        queryBlock,
        userList,
        abnormaAnalysis,
        eventAnalysis
    },
    computed: {
        loading() {
            return this.loadingBasicInfo || this.loadingEventChartData || this.loadingUserList || this.loadingUnusualReport;
        }
    },
    data() {
        return {
            ruleForm: {},
            loadingBasicInfo: false,
            loadingEventChartData: false,
            loadingUserList: false,
            loadingUnusualReport: false,
            eventBasicInfo: {},
            eventChartData: {},
            userList: [],
            unusualReport: [],
            unusualMarkArea: []
        };
    },
    methods: {
        handleConfirmQuery(ruleForm) {
            console.log(ruleForm);
            let params = {
                expEventId: this.ruleForm.resultId,
                expStartTm: this.ruleForm.selectDateRange[0],
                expEndTm: this.ruleForm.selectDateRange[1],
                watchStartTm: moment(this.ruleForm.selectDateRange[0]).subtract(this.ruleForm.extra[0], 'days').format('YYYY-MM-DD'),
                watchEndTm: moment(this.ruleForm.selectDateRange[1]).add(this.ruleForm.extra[1], 'days').format('YYYY-MM-DD'),
                contrCd: this.ruleForm.contrCd
            };
            console.log(params);
            this.ruleForm = {...ruleForm, ...params};
            // 异常事件基本信息
            this.getEventBasicInfo();
            // 异常事件图表信息
            this.getEventChartData(params);
            // 用户画像
            this.getUserList(params);
            // 异常分析报告
            this.getUnusualReport(params);
        },
        getEventBasicInfo() {
            let params = {
                expReportid: this.ruleForm.expReportid
            };
            this.loadingBasicInfo = true;
            queryEventInfo(params).then(resp => {
                this.loadingBasicInfo = false;
                if (resp) {
                    this.eventBasicInfo = resp;
                }
            }).catch(e => {
                this.loadingBasicInfo = false;
                console.error(e);
            });
        },
        getEventChartData(params) {
            this.loadingEventChartData = true;
            queryEventChartData(params).then(resp => {
                this.loadingEventChartData = false;
                if (resp) {
                    this.eventChartData = resp.eventAnalyQuotesList;
                    this.unusualMarkArea = [
                        [{name: '异常区域', xAxis: params.expStartTm}, {xAxis: params.expEndTm}],
                        [{name: '观察窗口', xAxis: params.watchStartTm, itemStyle: {color: 'transparent', borderColor: '#ccc', borderWidth: 1, borderType: 'dashed'}, label: {color: '#ccc', position: 'insideTopRight'}}, {xAxis: params.watchEndTm}],
                    ];
                }
            }).catch(e => {
                this.loadingEventChartData = false;
                console.error(e);
            });
        },
        getUserList(params) {
            this.loadingUserList = true;
            queryUserList(params).then(resp => {
                this.loadingUserList = false;
                if (resp) {
                    this.userList = resp.txUserDrawAnalyTblList;
                }
            }).catch(e => {
                this.loadingUserList = false;
                console.error(e);
            });
        },
        getUnusualReport(params) {
            this.loadingUnusualReport = true;
            createUnusualReport(params).then(resp => {
                this.loadingUnusualReport = false;
                if (resp) {
                    this.unusualReport = resp;
                }
            }).catch(e => {
                this.loadingUnusualReport = false;
                console.error(e);
            });
        },
    }
};
</script>
<style lang="less" scoped>
</style>
