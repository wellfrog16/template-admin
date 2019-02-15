<template>
    <div class="scene-config-page">
        <s-card :title="`查询`" :icon="`fa fa-search`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="10" :lg="10" :md="10" :sm="24">
                            <el-form-item prop="a">
                                <el-radio-group v-model="ruleForm.exportType" @change="groupChange">
                                    <el-radio label="0">
                                        <el-form-item
                                            prop="resultId"
                                            label="导入结果集"
                                            label-width="100px"
                                            style="display:inline-block; padding: 5px 0;"
                                            :rules="
                                                [{
                                                    required: String(ruleForm.exportType) === '0', message: '请选择结果集'
                                                }]"
                                        >
                                            <el-select
                                                class="custom-width"
                                                clearable
                                                size="small"
                                                @change="resultChange"
                                                v-loading="fullScreenLoading"
                                                element-loading-text="数据加载中，请耐心等待..."
                                                element-loading-background="rgba(0,0,0,0.3)"
                                                v-model="ruleForm.resultId"
                                            >
                                                <el-option
                                                    v-for="item in resultList"
                                                    :key="item.resultId"
                                                    :label="item.resultName"
                                                    :value="item.resultId"
                                                ></el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-radio>
                                    <br>
                                    <el-radio label="1" class="self-radio">
                                        <el-form-item
                                            prop="fileList"
                                            label="导入CSV"
                                            label-width="100px"
                                            style="display:inline-block; padding: 5px 0;"
                                            :rules="[{required: String(ruleForm.exportType) === '1', message: '请上传附件'}]"
                                        >
                                            <div>
                                                <upload-file-to-server
                                                    class="upload-file"
                                                    style="max-width: 444px;"
                                                    ref="uploadFile"
                                                    :actionUrl="actionUrl"
                                                    :fileListProps="ruleForm.fileList"
                                                    :uploadParams="uploadParams"
                                                    :showSubmitUploadBtn="false"
                                                    :autoUploadMode="false"
                                                    @getTxtCon="handleUploadSuccess"
                                                    @currentFileList="currentFileList"
                                                ></upload-file-to-server>
                                            </div>
                                        </el-form-item>
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="10" :lg="10" :md="10" :sm="24">
                            <el-form-item prop="selectDateRange" label="统计区间" label-width="140px">
                                <s-date-picker
                                    :value="ruleForm.selectDateRange"
                                    :isRange="true"
                                    @change="handleSdatePickerDateRangeChange"
                                ></s-date-picker>
                            </el-form-item>
                            <el-form-item prop="contractCode" label="合约代码" label-width="140px">
                                <el-input
                                    clearable
                                    size="small"
                                    v-model="ruleForm.contractCode"
                                    class="custom-width"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="4" :lg="4" :md="4" :sm="24" class="generate">
                            <el-form-item label-width="20px">
                                <el-button
                                    :loading="loadingBt"
                                    type="primary"
                                    size="small"
                                    @click="generateReportsClick('ruleForm')">生成协查报告
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </s-card>
        <div class="card_table">
            <el-tabs class="a_form_table_bar bar-shoe" v-model="activeName" size="small" type="card" @tab-click="handleTabsClick">
                <el-tab-pane label="超仓分析" name="0">
                    <a-table1 @barEchartsCick="barEchartsCick" @EchartsClickLoading="EchartsClickLoading1"
                              v-show="activeName ==='0'" :loadingTable="loadingTable0" :tableData1="tableData1"></a-table1>
                </el-tab-pane>
                <el-tab-pane label="频繁报撤单分析" name="1">
                    <a-table2 @barEchartsCick="barEchartsCick" @EchartsClickLoading="EchartsClickLoading2"
                              v-show="activeName === '1'" :loadingTable="loadingTable1"
                              :tableData2="tableData2"></a-table2>
                </el-tab-pane>
                <el-tab-pane label="自成交分析" name="2">
                    <a-table3 @barEchartsCick="barEchartsCick" @EchartsClickLoading="EchartsClickLoading3"
                              v-show="activeName === '2'" :loadingTable="loadingTable2"
                              :tableData3="tableData3"></a-table3>
                </el-tab-pane>
            </el-tabs>
            <s-card style="padding: 10px 0;" v-if="activeName ==='0'" :title="`超仓分析图`" :icon="`fa fa-chart-bar`"
                    class="a_form_table_bar">
                <div slot="content">
                    <e-charts1 ref="chart1" :loading1="loading1"></e-charts1>
                </div>
            </s-card>
            <s-card style="padding: 10px 0;" v-if="activeName ==='1'" :title="`频繁报撤单分析图`" :icon="`fa fa-user-md`"
                    class="a_form_table_bar">
                <div slot="content">
                    <div slot="content">
                        <e-charts2 ref="chart2" :loading2="loading2"></e-charts2>
                    </div>
                </div>
            </s-card>
            <s-card style="padding: 10px 0;" v-if="activeName ==='2'" :title="`自成交分析图`" :icon="`fa fa-user-md`"
                    class="a_form_table_bar">
                <div slot="content">
                    <div slot="content">
                        <e-charts3 ref="chart3" :loading3="loading3"></e-charts3>
                    </div>
                </div>
            </s-card>
        </div>
        <div style="text-align:center; margin-bottom: 20px; width: 85%;">
            <el-button size="small" type="primary" @click="exporstClick">导出CSV</el-button>
        </div>
        <s-card :title="`协查报告`" :icon="`fa fa-file-alt`">
            <div slot="content">
                <s-table
                    :loading="dealWithIsLoading"
                    loadingText="数据加载时间较长，请耐心等待..."
                    :columns="tableColumns"
                    :tableData="tableData"
                ></s-table>
            </div>
        </s-card>
        <div style="text-align:center; margin: 30px 0;">
            <el-button size="small" type="primary" @click="backClick1">上一步</el-button>
            <el-button size="small" type="primary" @click="exportClick1('协查报告', tableColumns)">导出CSV</el-button>
        </div>
    </div>
</template>
<script>
import {tableColumns, tableColumns1, tableColumns2, tableColumns3} from '../abnormityAnalysis/components/constants';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import UploadFileToServer from '@/components/index/common/UploadFileToServer'; // 导入CSV
import SDatePicker from '@/components/index/common/SDatePicker'; // 日期
import ATable1 from '../abnormityAnalysis/components/Atable1';
import ATable2 from '../abnormityAnalysis/components/Atable2';
import ATable3 from '../abnormityAnalysis/components/Atable3';
import ECharts1 from '../abnormityAnalysis/components/Echarts1';
import ECharts2 from '../abnormityAnalysis/components/Echarts2';
import ECharts3 from '../abnormityAnalysis/components/Echarts3';
import moment from 'moment';
import {
    uploadFileByBodyInfo, // 导入csv，输出账户号list
} from '@/api/common';
import {
    postTlsResultInfo, // 结果集列表
    postExportType, // 当选择结果集时的生成报告接口
} from '@/api/dataAnsis/abnormityAnalysis';

export default {
    components: {
        SCard,
        UploadFileToServer,
        SDatePicker,
        STable,
        ATable1,
        ATable2,
        ATable3,
        ECharts1,
        ECharts2,
        ECharts3
    },
    mixins: [],
    data() {
        return {
            count: 0,
            loadingBt: false,
            loading1: false,
            loading2: false,
            loading3: false,
            activeName: '0',
            loadingTable0: false, // 加载 (tab 加载)
            loadingTable1: false, // 加载 (tab 加载)
            loadingTable2: false, // 加载 (tab 加载)
            fullScreenLoading: false, // 加载 (结果集加载)
            dealWithIsLoading: false, // 加载(表格加载)
            // 底部列表
            tableColumns: tableColumns,
            tableData: [],
            tableData1: [],
            tableData2: [],
            tableData3: [],
            tableColumns1: tableColumns1,
            tableColumns2: tableColumns2,
            tableColumns3: tableColumns3,
            resultList: [],
            uploadOption: {
                name: '上传',
                size: 'small',
                type: 'primary',
            },
            // 导入csv，输出账户号list 接口
            uploadParams: {}, // 上传文件body参数
            actionUrl: uploadFileByBodyInfo('exceptionInfo/csv'),
            defaultLimitFileType: ['csv'],

            // form 表单绑定值
            ruleForm: {
                fileList: [], // 导入CSV
                exportType: '', // 导入结果集按钮
                contractCode: '', // 合约代码  cu1712
                resultId: '', // 导入结果集
                // selectDateRange: ['2017-06-01', '2017-12-31'] // 统计区间  '2017-02-20', '2017-10-09'
                selectDateRange: [new Date(moment().subtract(1, 'months').format('YYYY-MM-DD')), new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))],
            },
            rules: {
                contractCode: {
                    required: true,
                    message: '请输入合约代码',
                },
                selectDateRange: {
                    required: true,
                    message: '请选择统计区间',
                },
                fileList: {
                    message: '请导入CSV',
                },
            },
            barEcharts: {},
            nums: '',
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
        //  结果集列表
        getResultList() {
            this.fullScreenLoading = true;
            postTlsResultInfo().then(resp => {
                this.fullScreenLoading = false;
                this.resultList = resp;
            }).catch(e => {
                this.fullScreenLoading = false;
            });
        },
        // 统计区间事件
        handleSdatePickerDateRangeChange(val) {
            this.ruleForm.selectDateRange = val;
        },
        groupChange(val) {
            if (val === '1') {
                this.ruleForm.resultId = '';
            } else {
                if (this.ruleForm.fileList && this.ruleForm.fileList.length !== 0) {
                    this.ruleForm.fileList = [];
                }
            }
        },
        // 导入CSV (添加附件成功)
        currentFileList(fileList) {
            this.ruleForm.fileList = fileList;
            this.ruleForm.exportType = '1';
            this.ruleForm.resultId = '';
        },
        // 导入CSV
        handleUploadSuccess(resp) {
            if (resp) {
                // this.$message.error(`超出最大上传文件数目：${this.limit}`);
                this.ruleForm.fileList = [];
                switch (resp.analysisType) {
                case '0':
                    this.count = this.count + 1;
                    this.loadingTable0 = false;
                    this.tableData1 = resp.overStoreAnalysis; // 0:超仓，
                    this.$notify({
                        title: '',
                        message: '操作成功！',
                        type: 'success'
                    });
                    break;
                case '1':
                    this.count = this.count + 1;
                    this.loadingTable1 = false;
                    this.$notify({
                        title: '',
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.tableData2 = resp.frequentTrade; // 1:频繁报撤单
                    break;
                case '2':
                    this.count = this.count + 1;
                    this.loadingTable2 = false;
                    this.$notify({
                        title: '',
                        message: '操作成功！',
                        type: 'success'
                    });
                    // this.$message.success('操作成功！');
                    this.tableData3 = resp.autoTrade; // 2:自成交
                    break;
                case '3':
                    this.count = this.count + 1;
                    this.dealWithIsLoading = false;
                    this.$notify({
                        title: '',
                        message: '操作成功！',
                        type: 'success'
                    });
                    this.tableData = resp.report; // 3:协查报告
                    break;
                }
                if (this.count === 4) {
                    this.loadingBt = false;
                }
            } else {
                this.$notify.error({
                    title: '',
                    message: '操作失败！'
                });
            }
        },
        // 选择结果集的按钮 -- 二选一
        resultChange(val) {
            if (val) {
                if (this.ruleForm.exportType !== '0') {
                    this.ruleForm.exportType = '0';
                    if (this.ruleForm.fileList && this.ruleForm.fileList.length !== 0) {
                        this.ruleForm.fileList = [];
                    }
                }
            } else {
                this.ruleForm.exportType = '';
            }
        },
        handleTabsClick() {
            this.$nextTick(() => {
                this.drewChart(this.activeName);
            });
        },
        // 生成报告
        generateReportsClick() {
            if (!this.ruleForm.exportType) {
                this.$message.error('请选择一种导入的方式');
                return;
            }
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.$store.commit('overStoreMut', {}); // tab 表格数据
                    this.$store.commit('frequentMut', {}); // tab 表格数据
                    this.$store.commit('autoTradeMut', {}); // tab 表格数据
                    this.tableData = [];
                    this.tableData1 = [];
                    this.tableData2 = [];
                    this.tableData3 = [];
                    this.count = 0;
                    this.$nextTick(() => {
                        this.$refs['chart1'] && this.$refs['chart1'].clearChartData();
                        this.$refs['chart2'] && this.$refs['chart2'].clearChartData();
                        this.$refs['chart3'] && this.$refs['chart3'].clearChartData();
                    });
                    let params = {
                        analysisType: '',
                        resultSetNo: this.ruleForm.resultId || '', // 结果集编号
                        contrCode: this.ruleForm.contractCode, // 合约代码
                        statTimeBegin: moment(this.ruleForm.selectDateRange[0]).format('YYYY-MM-DD'), // 统计起始日
                        statTimeEnd: moment(this.ruleForm.selectDateRange[1]).format('YYYY-MM-DD'), // 统计截止日
                    };
                    // 0:超仓，1:频繁报撤单，2:自成交，3:协查报告
                    let array = ['0', '1', '2', '3'];
                    if (this.ruleForm.exportType === '0') {
                        array.forEach(v => {
                            this.$store.commit('momentMut', {...params, ...{analysisType: v}}); // tab表格数据
                            this.loadingBt = true;
                            this.loadingTable0 = true;
                            this.loadingTable1 = true;
                            this.loadingTable2 = true;
                            this.dealWithIsLoading = true;
                            postExportType({...params, ...{analysisType: v}}).then(resp => {
                                if (resp) {
                                    this.$router.push({name: ''});
                                    switch (resp.analysisType) {
                                    case '0':
                                        this.count = this.count + 1;
                                        this.loadingTable0 = false;
                                        this.tableData1 = resp.overStoreAnalysis; // 0:超仓，
                                        break;
                                    case '1':
                                        this.count = this.count + 1;
                                        this.loadingTable1 = false;
                                        this.tableData2 = resp.frequentTrade; // 1:频繁报撤单
                                        break;
                                    case '2':
                                        this.count = this.count + 1;
                                        this.loadingTable2 = false;
                                        this.tableData3 = resp.autoTrade; // 2:自成交
                                        break;
                                    case '3':
                                        this.count = this.count + 1;
                                        this.dealWithIsLoading = false;
                                        this.tableData = resp.report; // 3:协查报告
                                        break;
                                    }
                                    if (this.count === 4) {
                                        this.loadingBt = false;
                                    }
                                }
                            }).catch(e => {
                                this.loadingBt = false;
                                this.loadingTable0 = false;
                                this.loadingTable1 = false;
                                this.loadingTable2 = false;
                                this.dealWithIsLoading = false;
                            });
                        });
                    } else {
                        let arrayParams = [];
                        array.forEach(v => {
                            arrayParams.push({
                                ...params,
                                ...{analysisType: v}
                            });
                        });
                        arrayParams.forEach(v => {
                            setTimeout(() => {
                                this.loadingBt = true;
                                this.loadingTable0 = true;
                                this.loadingTable1 = true;
                                this.loadingTable2 = true;
                                this.dealWithIsLoading = true;
                                this.uploadParams = v;
                                this.$store.commit('momentMut', this.uploadParams); // tab 表格数据
                                this.$nextTick(() => {
                                    this.$refs['uploadFile'].submitUpload();
                                });
                            });
                        });
                    }
                }
            });
        },
        // 导出CSV
        exporstClick() {
            let fileName = '';
            let tableColumns = '';
            let tableData = '';
            if (this.activeName === '0') {
                fileName = '超仓分析';
                tableData = this.tableData1;
                tableColumns = this.tableColumns1;
            } else if (this.activeName === '1') {
                fileName = '频繁报撤单分析';
                tableData = this.tableData2;
                tableColumns = this.tableColumns2;
            } else {
                fileName = '自成交分析';
                tableData = this.tableData3;
                tableColumns = this.tableColumns3;
            }

            if (tableData && !tableData.length) {
                this.$message.error('异常交易暂无数据!');
                return;
            }
            let params = {
                'fileName': fileName || '测试',
                'tableColumns': tableColumns,
                'tableData': tableData,
            };
            this.gfnExportFileWithForm(params);
        },
        // 底部导出CSV按钮
        exportClick1(fileName, tableColumns) {
            if (this.tableData && !this.tableData.length) {
                this.$message.error('协查报告暂无数据!');
                return;
            }
            let params = {
                'fileName': fileName || '测试',
                'tableColumns': tableColumns,
                'tableData': this.tableData,
            };
            this.gfnExportFileWithForm(params);
        },
        // 底部上一步按钮
        backClick1() {
        },
    },
    mounted() {
        //  结果集列表
        this.getResultList();
    },
};
</script>
<style lang='less' scoped>
    .scene-config-page {
        color: #fff;
        .el-form {
            color: #fff;
        }
        .new-btn {
            margin-left: 15px;
        }
        /deep/ .el-tree {
            width: 350px;
            max-height: 100px;
            margin-top: 5px;
            min-height: 30px;
            padding-top: 5px;
            border-radius: 3px;
            overflow: auto;
        }
        .search-input {
            width: 240px;

            /deep/ input {
                border-radius: 15px;
            }

            /deep/ i {
                color: #3c70a5 !important;
            }
        }
        .custom-width {
            width: 350px;
        }
        /deep/ .el-carousel__container {
            min-height: 500px;
        }
        .self-radio {
            /deep/ .el-radio__input {
                vertical-align: top;
                margin-top: 20px;
            }
        }
        .generate {
            position: relative;
            top: -50px;
            right: -25px;
        }
        .card_table {
            margin-top: 5px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            position: relative;
            .bar-shoe {
                box-shadow: 0 0 10px rgba(31, 82, 170, 0.75);
            }
            .a_form_table_bar {
                padding: 0;
                width: 49.3%;
                margin-bottom: 20px;
            }
        }
    }
</style>
