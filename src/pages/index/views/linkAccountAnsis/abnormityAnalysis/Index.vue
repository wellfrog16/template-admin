<template>
    <div class="scene-config-page">
        <s-card>
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="10" :lg="10" :md="10" :sm="24">
                            <el-form-item prop="a">
                                <el-radio-group v-model="ruleForm.exportType">
                                    <el-radio label="0">
                                        <el-form-item prop="resultId" label="导入结果集" label-width="140px"
                                                      style="display:inline-block; padding: 5px 0;"
                                                      :rules="[{
                                                          required: String(ruleForm.exportType) === '0', message: '请选择结果集'
                                                      }]">
                                            <el-select class="custom-width" clearable size="small"
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
                                        <el-form-item prop="fileList" label="导入CSV" label-width="140px"
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
                        <el-col :xl="4" :lg="4" :md="4" :sm="24">
                            <el-form-item label-width="60px">
                                <el-button type="primary" @click="generateReportsClick('ruleForm')">生成报告</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </s-card>
        <a-table-tab-pane class="a_form_table_bar" :tablePaneData="tablePaneList"
                          :formData="formDataList"></a-table-tab-pane>
        <el-card class="a_form_table_bars ">
            <el-table
                :data="tableData"
                border
                height="410"
                style="width: 100%;">
                <el-table-column
                    v-for="(item,index) in tableColumns"
                    :key="item.field" :prop="item.field" :label="item.title" :align="item.align"
                    :min-width="item.width">
                </el-table-column>
            </el-table>
        </el-card>
        <div style="text-align:center; margin: 30px 0;">
            <el-button size="small" type="primary" @click="backClick1">上一步</el-button>
            <el-button size="small" type="primary" @click="exportClick1">导出CSV</el-button>
        </div>
    </div>
</template>
<script>
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
            ATableTabPane: () => import('../abnormityAnalysis/components/AbnormitysTableTabPane'),
        },
        data() {
            return {
                // teb 列表数据
                tablePaneList: {},
                // 底部列表
                tableColumns: [
                    {field: "acctNum", title: "账户组号", width: 150, align: 'center'},
                    {field: "custId", title: "客户编号", width: 150, align: 'center'},
                    {field: "custName", title: "客户名称", width: 150, align: 'center'},
                    {field: "memCd", title: "合约代码", width: 150, align: 'center'},
                    {field: "memName", title: "账户组当前净持仓", width: 150, align: 'center'},
                    {field: "breed", title: "账户当前净持仓", width: 150, align: 'center'},
                    {field: "contrCd", title: "多单持仓量", width: 150, align: 'center'},
                    {field: "supSto", title: "空单持仓量", width: 150, align: 'center'},
                    {field: "freDraBill", title: "统计区间超仓天数", width: 150, align: 'center'},
                    {field: "bargain", title: "统计区间超仓天数", width: 150, align: 'center'},
                ],
                tableData: [],
                formDataList: {},


                resultList: [{label: '结果集1', value: '1'}],
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
                    contractCode: 'cu1712',        // 合约代码
                    resultId: '',         // 导入结果集
                    selectDateRange: ['2017-02-20', '2018-11-25']   // 统计区间
                },
                rules: {
                    contractCode: {
                        required: true,
                        message: '请输入合约代码'
                    },
                    selectDateRange: {
                        required: true,
                        message: '请选择统计区间'
                    }
                }
            };
        },
        methods: {
            //  结果集列表
            getResultList() {
                postTlsResultInfo().then(resp => {
                    this.resultList = resp;
                });
            },
            // 底部导出CSV按钮
            exportClick1() {
            },
            // 底部上一步按钮
            backClick1() {
                console.log(this.tableData);
            },

            // 统计区间事件
            handleSdatePickerDateRangeChange(val) {
                this.ruleForm.selectDateRange = val;
            },
            // 导入CSV
            handleUploadSuccess() {
                this.showCarousel = false;
                this.$router.push({name: ''});
            },


            // 导入CSV
            currentFileList(fileList) {
                this.ruleForm.fileList = fileList;
            },
            // 生成报告
            generateReportsClick() {
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        //  0是结果集； 1是导入csv
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
                                contrCode: this.ruleForm.contractCode, // 合约代码
                                statTimeBegin: this.ruleForm.selectDateRange[0], // 统计起始日
                                statTimeEnd: this.ruleForm.selectDateRange[1],  // 统计截止日
                                resultSetNo: this.ruleForm.resultId   //结果集编号
                            };
                            postExportType(params).then(resp => {

                                this.$router.push({name: ''});
                                this.tableData = resp.report;
                                this.tablePaneList = resp;
                                this.formDataList = params;
                            });
                        }

                    } else {
                        console.log(' 0是结果集； 1是导入csv');

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

        .a_form_table_bars {
            box-shadow: 0 0 10px #326fcb;
            padding: 0;
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
