<template>
    <div class="scene-config-page">
        <s-card :title="`查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="10" :lg="10" :md="10" :sm="24">
                            <el-form-item prop="a">
                                <el-radio-group v-model="ruleForm.exportType">
                                    <el-radio label="0">
                                        <el-form-item
                                            prop="resultId"
                                            label="导入结果集"
                                            label-width="100px"
                                            style="display:inline-block; padding: 5px 0;"
                                            :rules="[
                                            {required: String(ruleForm.exportType) === '0', message: '请选择结果集'}
                                                      ]">
                                            <el-select class="custom-width" clearable size="small"
                                                       @change="resultChange"
                                                       v-loading="fullScreenLoading"
                                                       element-loading-text="数据加载中，请耐心等待..."
                                                       element-loading-background="rgba(0,0,0,0.3)"
                                                       v-model="ruleForm.resultId">
                                                <el-option
                                                    v-for="item in resultList"
                                                    :key="item.resultId"
                                                    :label="item.resultName"
                                                    :value="item.resultId">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-radio>
                                    <br>
                                    <el-radio label="1">
                                        <el-form-item prop="fileList" label="导入CSV" label-width="87px"
                                                      style="display:inline-block; padding: 5px 0;"
                                                      :rules="[{
                                                          required: String(ruleForm.exportType) === '1', message: '请上传附件'
                                                      }]">
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
                                <el-input clearable size="small" v-model="ruleForm.contractCode"
                                          class="custom-width"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="4" :lg="4" :md="4" :sm="24" class="generate">
                            <el-form-item label-width="20px">
                                <el-button type="primary"
                                           @click="generateReportsClick('ruleForm')">生成协查报告</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </s-card>
        <a-table-tab-pane
            class="a_form_table_bar"
            :tablePaneData="tablePaneList"
            :dealWithIsLoading="dealWithIsLoading2"
            :formData="formDataList">
        </a-table-tab-pane>
        <s-card :title="`协查报告`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table
                    :loading="dealWithIsLoading2"
                    :columns="tableColumns"
                    :tableData="tableData">
                </s-table>
            </div>
        </s-card>
        <div style="text-align:center; margin: 30px 0;">
            <el-button size="small" type="primary" @click="backClick1">上一步</el-button>
            <el-button size="small" type="primary" @click="exportClick1">导出CSV</el-button>
        </div>
    </div>
</template>
<script>
    import MixinVue from "./components/MixinsTable";
    import SCard from '@/components/index/common/SCard';
    import UploadFileToServer from '@/components/index/common/UploadFileToServer'; // 导入CSV
    import SDatePicker from '@/components/index/common/SDatePicker';    // 日期
    import UploadCommon from '@/components/index/common/UploadCommon';// 时间区间
    import {
        uploadFileByBodyInfo    // 导入csv，输出账户号list
        // getTlsResultInfo            //  结果集列表
    } from '@/api/common';
    import {
        postTlsResultInfo,    //  结果集列表
        postExportType,  // 当选择结果集时的生成报告接口
        postExceptionInfo,  // 当选择导入csv时的生成报告接口
        postImportAccounBar  // Bar 柱状图
    } from '@/api/dataAnsis/abnormityAnalysis';

    export default {
        components: {
            SCard,
            UploadFileToServer,
            SDatePicker,
            UploadCommon,
            STable: () => import('@/components/index/common/STable'),             // 列表
            ATableTabPane: () => import('../abnormityAnalysis/components/AbnormitysTableTabPane'),
        },
        mixins: [MixinVue],
        data() {
            return {
                fullScreenLoading: false,  // 加载 (结果集加载)
                dealWithIsLoading2: false,  // 加载(表格加载)
                // teb 列表数据
                tablePaneList: {},
                // 底部列表
                tableColumns: [
                    {field: "acctNum", label: "账户组号", width: 150, align: 'center'},
                    {field: "custId", label: "客户编号", width: 150, align: 'center'},
                    {field: "custName", label: "客户名称", width: 150, align: 'center'},
                    {field: "memCd", label: "会员代码", width: 150, align: 'center'},
                    {field: "memName", label: "会员名称", width: 150, align: 'center'},
                    {field: "breed", label: "协查品种", width: 150, align: 'center'},
                    {field: "contrCd", label: "合约代码", width: 150, align: 'center'},
                    {field: "supSto", label: "超仓", width: 150, align: 'center'},
                    {field: "freDraBill", label: "频繁报撤单", width: 150, align: 'center'},
                    {field: "bargain", label: "自成交", width: 150, align: 'center'},
                ],
                tableData: [],
                formDataList: {},
                resultList: [
                    // {
                    //     resultId: "AA0001",
                    //     resultName: "AA",
                    //     resultType: "5",
                    //     setupTm: "2018-11-21T16:00:00.000+0000",
                    //     setupUser: "appadmin"
                    // },{
                    //     resultId: "BB0001",
                    //     resultName: "BB",
                    //     resultType: "6",
                    //     setupTm: "2018-11-22T16:00:00.000+0000",
                    //     setupUser: "appadmin"
                    // },{
                    //     resultId: "CC0001",
                    //     resultName: "CC",
                    //     resultType: "7",
                    //     setupTm: "2018-11-23T16:00:00.000+0000",
                    //     setupUser: "appadmin"
                    // }
                ],
                uploadOption: {
                    name: '上传',
                    size: 'small',
                    type: 'primary'
                },
                // 导入csv，输出账户号list 接口
                uploadParams: {}, // 上传文件body参数
                actionUrl: uploadFileByBodyInfo(),
                defaultLimitFileType: ['csv'],

                // form 表单绑定值
                ruleForm: {
                    fileList: [],          // 导入CSV
                    exportType: '',       // 导入结果集按钮
                    contractCode: '',        // 合约代码  cu1712
                    resultId: '',         // 导入结果集
                    // selectDateRange: ['2017-02-20', '2017-10-09']   // 统计区间  '2017-02-20', '2017-10-09'
                    selectDateRange: [new Date(moment().subtract(1, 'months').format('YYYY-MM-DD')), new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))]
                },
                rules: {
                    contractCode: {
                        required: true,
                        message: '请输入合约代码'
                    },
                    selectDateRange: {
                        required: true,
                        message: '请选择统计区间'
                    },
                    exportType: {
                        message: '请选择结果集'
                    },
                    fileList: {
                        message: '请导入CSV'
                    }
                }
            };
        },
        methods: {
            //  结果集列表
            getResultList() {
                this.fullScreenLoading = true;
                postTlsResultInfo().then(resp => {
                    this.fullScreenLoading = false;
                    this.resultList = resp;
                });
            },
            // 选择结果集的按钮 -- 二选一
            resultChange(val){
                if(val){
                    if(this.ruleForm.exportType !== '0') {
                        this.ruleForm.exportType = '0'
                    }
                }else {
                    this.ruleForm.exportType = '';
                }
            },
            // 底部导出CSV按钮
            exportClick1() {
            },
            // 底部上一步按钮
            backClick1() {
            },

            // 统计区间事件
            handleSdatePickerDateRangeChange(val) {
                this.ruleForm.selectDateRange = val;
            },
            // 导入CSV
            handleUploadSuccess() {
                this.$router.push({name: ''});
            },


            // 导入CSV
            currentFileList(fileList) {
                this.ruleForm.fileList = fileList;
            },
            // 生成报告
            generateReportsClick() {
                this.tableData = [];
                this.tablePaneList = {};
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        if (this.ruleForm.exportType === '1') {
                            let params = {
                                contrCode: this.ruleForm.contractCode, // 合约代码
                                statTimeBegin: this.ruleForm.selectDateRange[0], // 统计起始日
                                statTimeEnd: this.ruleForm.selectDateRange[1],  // 统计截止日
                                file: ''
                            }
                            this.uploadParams = {...this.uploadParams, ...params};
                            this.$nextTick(() => {
                                this.$refs['uploadFile'].submitUpload();
                            });
                            // postExceptionInfo(params).then(resp => {
                            //
                            //     this.$router.push({name: ''});
                            //     this.tableData = resp.report;
                            //     this.tablePaneList = resp;
                            //     this.formDataList = params;
                            // });
                        } else {
                            let params = {
                                contrCode: this.ruleForm.contractCode,             // 合约代码
                                statTimeBegin: this.ruleForm.selectDateRange[0],   // 统计起始日
                                statTimeEnd: this.ruleForm.selectDateRange[1],     // 统计截止日
                                resultSetNo: this.ruleForm.resultId                // 结果集编号
                            };

                            this.dealWithIsLoading2 = true;
                            postExportType(params).then(resp => {
                                this.dealWithIsLoading2 = false;
                                this.$router.push({name: ''});
                                this.tableData = resp.report;  // 协查报告数据
                                this.tablePaneList = resp;    // tab 表格数据
                                this.formDataList = params; // 生成协查报告的参数
                            });
                        }
                    }
                });
            }
        },
        mounted() {
            //  结果集列表
            this.getResultList();
        }
    };
</script>
<style lang="less" scoped>
    .scene-config-page {
        color: #fff;
        .el-form {
            color: #fff;
        }

        .generate {
            position: relative;
            top: -50px;
            right: -25px;
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
    }
</style>
