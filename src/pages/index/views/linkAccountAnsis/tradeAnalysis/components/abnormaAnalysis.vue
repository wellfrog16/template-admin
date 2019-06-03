<template>
    <div class="abnorma-nalysis">
        <el-tabs class="a_form_table_bar bar-shoe" v-model="activeName" size="small" type="card" @tab-click="handleTabsClick">
            <el-tab-pane label="超仓分析" name="0">
                <el-row :gutter="15" style="padding: 6px 6px 0 6px;">
                    <el-col :span="12">
                        <s-card :title="`超仓分析表`" :icon="`fa fa-chart-bar`">
                            <div slot="content">
                                <table1 :noAccountGroup="true" @barEchartsCick="barEchartsCick" @EchartsClickLoading="EchartsClickLoading1"
                                        :loadingTable="loadingTable0" :tableData1="tableData1"></table1>
                            </div>
                        </s-card>
                    </el-col>
                    <el-col :span="12">
                        <s-card v-if="activeName ==='0'" :title="`超仓分析图`" :icon="`fa fa-chart-bar`" style="padding: 10px 0;">
                            <div slot="content">
                                <echarts1 style="height: 455px;" ref="chart1" :loading1="loading1"></echarts1>
                            </div>
                        </s-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
            <el-tab-pane label="频繁报撤单分析" name="1">
                <el-row :gutter="15" style="padding: 6px 6px 0 6px;">
                    <el-col :span="12">
                        <s-card :title="`频繁报撤单分析表`" :icon="`fa fa-user-md`">
                            <div slot="content">
                                <table2 :noAccountGroup="true" @barEchartsCick="barEchartsCick" @EchartsClickLoading="EchartsClickLoading2"
                                        :loadingTable="loadingTable1"
                                        :tableData2="tableData2"></table2>
                            </div>
                        </s-card>
                    </el-col>
                    <el-col :span="12">
                        <s-card v-if="activeName ==='1'" :title="`频繁报撤单分析图`" :icon="`fa fa-user-md`" style="padding: 10px 0;">
                            <div slot="content">
                                <div slot="content">
                                    <echarts2 style="height: 455px;" ref="chart2" :loading2="loading2"></echarts2>
                                </div>
                            </div>
                        </s-card>
                    </el-col>
                </el-row>

            </el-tab-pane>
            <el-tab-pane label="自成交分析" name="2">
                <el-row :gutter="15" style="padding: 6px 6px 0 6px;">
                    <el-col :span="12">
                        <s-card :title="`自成交分析表`" :icon="`fa fa-donate`">
                            <div slot="content">
                                <table3 :noAccountGroup="true" @barEchartsCick="barEchartsCick" @EchartsClickLoading="EchartsClickLoading3"
                                        :loadingTable="loadingTable2"
                                        :tableData3="tableData3"></table3>
                            </div>
                        </s-card>
                    </el-col>
                    <el-col :span="12">
                        <s-card v-if="activeName ==='2'" :title="`自成交分析图`" :icon="`fa fa-donate`" style="padding: 10px 0;">
                            <div slot="content">
                                <div slot="content">
                                    <echarts3 style="height: 455px;" ref="chart3" :loading3="loading3"></echarts3>
                                </div>
                            </div>
                        </s-card>
                    </el-col>
                </el-row>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import table1 from '@/pages/index/views/linkAccountAnsis/abnormityAnalysis/components/Atable1';
import table2 from '@/pages/index/views/linkAccountAnsis/abnormityAnalysis/components/Atable2';
import table3 from '@/pages/index/views/linkAccountAnsis/abnormityAnalysis/components/Atable3';
import echarts1 from '@/pages/index/views/linkAccountAnsis/abnormityAnalysis/components/Echarts1';
import echarts2 from '@/pages/index/views/linkAccountAnsis/abnormityAnalysis/components/Echarts2';
import echarts3 from '@/pages/index/views/linkAccountAnsis/abnormityAnalysis/components/Echarts3';
import SCard from '@/components/index/common/SCard';
import {
    postExportType, // 当选择结果集时的生成报告接口
} from '@/api/dataAnsis/abnormityAnalysis';
export default {
    components: {
        table1,
        table2,
        table3,
        echarts1,
        echarts2,
        echarts3,
        SCard
    },
    data() {
        return {
            loading1: false,
            loading2: false,
            loading3: false,
            activeName: '0',
            loadingTable0: false, // 加载 (tab 加载)
            loadingTable1: false, // 加载 (tab 加载)
            loadingTable2: false, // 加载 (tab 加载)
            // 底部列表
            tableData: [],
            tableData1: [],
            tableData2: [],
            tableData3: [],

        };
    },
    methods: {
        EchartsClickLoading1(flag) {
            this.loadingTable0 = flag;
            this.loading1 = flag;
            this.loadingBt = flag;
        },
        EchartsClickLoading2(flag) {
            this.loadingTable1 = flag;
            this.loading2 = flag;
            this.loadingBt = flag;
        },
        EchartsClickLoading3(flag) {
            this.loadingTable2 = flag;
            this.loading3 = flag;
            this.loadingBt = flag;
        },
        drewChart(num) {
            if (num === '0') {
                this.$refs['chart1'] && this.$refs['chart1'].initChart();
            } else if (num === '1') {
                this.$refs['chart2'] && this.$refs['chart2'].initChart();
            } else {
                this.$refs['chart3'] && this.$refs['chart3'].initChart();
            }
        },
        barEchartsCick(data, num) {
            this.drewChart(num);
        },
        getTestData() {
            let params = {
                analysisType: '',
                resultSetNo: '1555666647', // '1556015132', // '1555666647', // 结果集编号
                contrCode: 'cu1712', // 合约代码
                statTimeBegin: '2017-05-05', // 统计起始日
                statTimeEnd: '2017-09-09', // 统计截止日
            };
            // 0:超仓，1:频繁报撤单，2:自成交，3:协查报告
            let array = ['0', '1', '2'];

            array.forEach(v => {
                this.$store.commit('momentMut', {...params, ...{analysisType: v}}); // tab表格数据
                this.loadingTable0 = true;
                this.loadingTable1 = true;
                this.loadingTable2 = true;
                postExportType({...params, ...{analysisType: v}}).then(resp => {
                    if (resp) {
                        this.$router.push({name: ''});
                        switch (resp.analysisType) {
                        case '0':
                            this.loadingTable0 = false;
                            this.tableData1 = resp.overStoreAnalysis; // 0:超仓，
                            break;
                        case '1':
                            this.loadingTable1 = false;
                            this.tableData2 = resp.frequentTrade; // 1:频繁报撤单
                            break;
                        case '2':
                            this.loadingTable2 = false;
                            this.tableData3 = resp.autoTrade; // 2:自成交
                            break;
                        case '3':
                            this.dealWithIsLoading = false;
                            if (resp.report.length > 2000) {
                                this.$alert('返回数据量过大，为提高操作体验，只显示前2000条数据，可导出到csv查看全部');
                                resp.report = resp.report.slice(0, 2000);
                            }
                            this.overData = resp.report.filter(v => {
                                return v.supSto === '是';
                            });
                            this.allReportData = resp.report; // 全量数据
                            break;
                        }
                    }
                }).catch(e => {
                    this.loadingTable0 = false;
                    this.loadingTable1 = false;
                    this.loadingTable2 = false;
                });
            });
        },
        handleTabsClick() {
            this.$nextTick(() => {
                this.drewChart(this.activeName);
            });
        },
    },
    mounted() {
        this.getTestData();
    }
};
</script>
