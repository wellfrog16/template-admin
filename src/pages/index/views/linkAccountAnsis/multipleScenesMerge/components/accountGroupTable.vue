<template>
    <div :class="$style.groupadd_information" v-loading="fullScreenLoading">
        <s-card :title="`客户群体选择`" :icon="`fa fa-user-check`">
            <div slot="content">
                <el-row :gutter="20">
                    <el-col :span="14">
                        <span>导入结果集：</span>
                        <resultSelectComponent
                            ref="resultSelectComponent"
                            style="width: 50%; max-width: 350px;"
                            :resultIdProps="resultIds"
                            @selectResultId="selectResultId"
                        ></resultSelectComponent>
                        <el-button
                            style="margin-left: 10px;"
                            :loading="loadingBt"
                            size="small"
                            type="primary"
                            @click="handleConfirmExportResultData"
                        >确认</el-button>
                    </el-col>
                    <el-col :span="10" style="line-height: 40px;">
                        <span>导入 CSV：</span>
                        <upload-file-to-server
                            class="upload-file"
                            style="display: inline-block; margin: 0 10px; vertical-align: top; width: 140px; text-align: left;"
                            ref="uploadFile"
                            :actionUrl="actionUrl"
                            :fileListProps="ruleForm.fileList"
                            :uploadParams="uploadParams"
                            :showSubmitUploadBtn="false"
                            :autoUploadMode="false"
                            @getTxtCon="handleUploadSuccess"
                            @currentFileList="currentFileList"
                        ></upload-file-to-server>
                        <el-button size="small" type="primary" @click="handleConfirmExportCsvData">确认</el-button>
                    </el-col>
                </el-row>
            </div>
        </s-card>
        <div :class="$style.main_table">
            <s-card title="账户组信息" icon="fa fa-layer-group" :canCollose="true" :showContent="showContent">
                <div slot="right">
                    <el-input
                        clearable
                        :class="$style.search_input"
                        size="mini"
                        placeholder="请输入账户组或客户编号"
                        v-model="searchText"
                    >
                        <i
                            class="el-icon-search"
                            slot="prefix"
                            style="margin-left:4px; cursor: pointer;"
                        ></i>
                    </el-input>
                </div>
                <div slot="content">
                    <el-row :gutter="20">
                        <el-col :span="21">
                            <div>
                                <tree-table
                                    :loading="loadingTree"
                                    ref="self-tree-table"
                                    :filterText="searchText"
                                    :columns="mainTableColumns"
                                    :tableData="mainTableData"
                                    @updateCheckedList="updateCheckedList"
                                ></tree-table>
                            </div>
                        </el-col>
                        <el-col :span="3">
                            <div :class="$style.operate_group">
                                <el-button
                                    class="self-width"
                                    type="danger"
                                    size="small"
                                    @click="handleDelete"
                                >删除</el-button>
                                <br>
                                <el-button
                                    class="self-width"
                                    type="warning"
                                    size="small"
                                    @click="handleSplit"
                                >拆分</el-button>
                                <br>
                                <el-button
                                    class="self-width"
                                    type="warning"
                                    size="small"
                                    @click="handleMerge"
                                >合并</el-button>
                                <br>
                                <el-button
                                    class="self-width"
                                    type="primary"
                                    size="small"
                                    @click="handleExportResult()"
                                >导出到结果集</el-button>
                                <br>
                                <el-button
                                    class="self-width"
                                    type="primary"
                                    size="small"
                                    @click="handleExportCsv('账户组信息', mainTableColumns)"
                                >导出到csv</el-button>
                                <br>
                                <el-button
                                    class="self-width"
                                    type="primary"
                                    size="small"
                                    :loading="loadingTree"
                                    @click="createData"
                                >生成数据</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </s-card>
        </div>
        <el-dialog
            :before-close="handleCloseDialog"
            title="输入合约代码生成数据"
            :visible.sync="dialogFormVisible"
            :class="$style.dia_name">
            <el-form ref="dialogRuleForm" :model="dialogRuleForm" :rules="dialogFormRules">
                <el-form-item prop="contractCode" label="合约代码：" label-width="100px">
                    <el-input
                        style="width: 80%;"
                        v-model="dialogRuleForm.contractCode"
                        clearable
                        size="small"
                        auto-complete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label-width="130px">
                    <el-button
                        type="primary"
                        size="small"
                        @click="handleDialogConfirm('dialogRuleForm')"
                    >确 定</el-button>
                    <el-button
                        type="warning"
                        size="small"
                        @click="handleDialogCancel('dialogRuleForm')"
                    >取 消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
import {
    uploadFileByBodyInfo // 导入csv，输出账户号list 接口
} from '@/api/common';
import treeTableMixin from '@/pages/index/common/treeTableMixin';
import {
    regenerateData, // 生成数据
    postResultList // 导入结果集的树状列表
} from '@/api/dataAnsis/multipleScenesMerge';
import SCard from '@/components/index/common/SCard';
import UploadFileToServer from '@/components/index/common/UploadFileToServer';
import TreeTable from '@/components/index/common/TreeTableOld';
import ResultSelectComponent from '@/components/index/common/ResultSelectComponent';
import {mainTableColumns} from '../components/constants';
import _ from 'lodash';

export default {
    name: 'accountGroupTable',
    components: {
        SCard,
        UploadFileToServer, // 上传文件到服务器组件
        TreeTable,
        ResultSelectComponent // 导入结果集公共组件
    },
    mixins: [treeTableMixin],
    data() {
        return {
            loadingBt: false,
            loadingTree: false,
            dialogFormVisible: false,
            fullScreenLoading: false,
            mainTableColumns: mainTableColumns, // 树形table表头
            dialogRuleForm: {
                contractCode: '' // 合约代码
            },
            dialogFormRules: {
                contractCode: {
                    required: true,
                    message: '请输入合约代码'
                }
            },
            ruleForm: {
                fileList: [], // 导入CSV
                exportType: '' // 导入结果集按钮
            },
            rules: {
                exportType: {
                    message: '请选择结果集'
                },
                fileList: {
                    message: '请导入CSV'
                }
            },
            resultIds: '', // 当前导入的结果集id
            resultType: '', // 当前导入的结果集类型
            currentConctrd: '', // 当前导入后数据的合约代码
            startDate: '', // 当前导入后数据的合约代码
            endDate: '', // 当前导入后数据的合约代码
            statFreq: '', // 当前导入后数据的合约代码
            uploadOption: {
                name: '上传',
                size: 'small',
                type: 'primary'
            },
            uploadParams: {}, // 上传文件body参数
            actionUrl: uploadFileByBodyInfo('customer/combinedscence/csv'),
            defaultLimitFileType: ['csv'],
            searchText: '',
            importResultRespData: [], // 导入当前结果集后返回的结果
            importResultList: [], // 已经导入的结果集列表
            isHasSceneType1: false,
            showContent: false
        };
    },
    methods: {
        updateFullLoading(loading) {
            this.fullScreenLoading = loading;
        },
        updateResultList() {
            this.$refs['resultSelectComponent'].getResultList();
        },
        // 导入结果集数据
        selectResultId(val, resultNameG, resultTypeG, setupUserG) {
            this.resultIds = val;
            this.resultType = resultTypeG;
            if (val) {
                let params = {
                    'resultId': val, // 结果集编号
                    'resultName': resultNameG, // 结果集名称
                    'resultType': resultTypeG, // 结果集类型
                    'setupUser': setupUserG // 创建用户
                };
                this.loadingBt = true;
                this.fullScreenLoading = true;
                postResultList(params).then(resp => {
                    this.loadingBt = false;
                    this.fullScreenLoading = false;
                    this.importResultRespData = resp;
                    if (resp && resp.length) {
                        this.currentConctrd = this.currentConctrd || resp[0]['contractCode'] || '';
                        this.startDate = this.startDate || resp[0]['children'][0]['startDate'] || '1900-01-01';
                        this.endDate = this.endDate || resp[0]['children'][0]['endDate'] || '3000-12-31';
                        this.statFreq = this.statFreq || resp[0]['children'][0]['statFrep'] || '1';
                    }
                    console.log(this.startDate);
                }).catch(e => {
                    this.loadingBt = false;
                    this.fullScreenLoading = false;
                });
            }
        },
        sortDataByAcctIdCommon(data) {
            return _.sortBy(data, [item => { return item.acctId; }]);
        },
        // 确认结果集导入
        handleConfirmExportResultData() {
            if (this.isHasSceneType1 && String(this.resultType) === '1') {
                this.$message.error('只能导入一次相关系数类型的结果集');
                return;
            }
            if (this.importResultList.indexOf(this.resultIds) > -1) {
                this.$message.error('该结果集已经导入，不能重复导入');
                return;
            }
            this.importResultList.push(this.resultIds);
            this.showContent = true;
            this.mainTableData = this.sortDataByAcctIdCommon(this.mainTableData.concat(this.importResultRespData));
            if (!this.isHasSceneType1 && String(this.resultType) === '1') {
                this.isHasSceneType1 = true;
            }
        },
        // 导入CSV(附件导入成功)
        currentFileList(fileList) {
            this.ruleForm.fileList = fileList;
        },
        // 导入CSV
        handleUploadSuccess(resp) {
            if (resp && resp.length) {
                this.showContent = true;
                this.mainTableData = this.sortDataByAcctIdCommon(this.mainTableData.concat(resp));
            } else {
                this.$message.error('导入数据无效');
            }
        },
        // 提交CSV到服务器
        handleConfirmExportCsvData() {
            this.$refs['uploadFile'].submitUpload();
        },
        // 生成数据按钮
        createData() {
            if (this.mainTableData && !this.mainTableData.length) {
                this.$message.error('账户组信息暂无数据!');
            } else {
                if (!this.currentConctrd) {
                    this.dialogFormVisible = true;
                } else {
                    this.generateDataMethods();
                }
            }
        },
        // dialog取消按钮
        handleDialogCancel(formName) {
            this.dialogFormVisible = false;
            this.$refs[formName].resetFields();
        },
        handleCloseDialog(done) {
            done();
            this.dialogRuleForm.contractCode = '';
        },
        // dialog确认按钮
        handleDialogConfirm() {
            this.$refs['dialogRuleForm'].validate(valid => {
                if (valid) {
                    this.generateDataMethods();
                }
            });
        },
        generateDataMethods() {
            let conctrd = this.dialogRuleForm.contractCode || this.currentConctrd;
            console.log(conctrd);
            this.mainTableData.forEach(v => {
                v.contractCode = conctrd;
                if (v.children) {
                    v.children.forEach(m => {
                        m.contractCode = conctrd;
                    });
                }
            });
            this.loadingTree = true;
            this.$emit('updateLoading', this.loadingTree);
            this.dialogFormVisible = false;
            this.dialogRuleForm.contractCode = '';
            let params = {
                mainTableData: this.mainTableData,
                startDate: this.startDate,
                endDate: this.endDate,
                contractCode: this.currentConctrd,
                statFreq: this.statFreq
            };
            regenerateData(params).then(resp => {
                if (resp && resp.resData !== null) {
                    this.loadingTree = false;
                    let relativeTable = resp.relativeTable;
                    let resultTable = resp.resultTable;
                    // this.$emit('generateEvent', resp.kmap); // 知识库图表
                    this.$emit('updateLoading', this.loadingTree);
                    this.$emit('updateTableInfo', {relativeTable, resultTable});
                    this.mainTableData = this.sortDataByAcctIdCommon(resp.combineResultInfos); // 账户组信息
                }
            }).catch(e => {
                this.dialogFormVisible = false;
                this.loadingTree = false;
            });
        }
    }
};
</script>
<style lang='less' module>
    .groupadd_information {
        .operate_button_group {
            margin: 10px 0;
        }
        .groupadd_button {
            text-align: center;
            margin-bottom: 26px;
        }
        .dia_name {
            width: 65%;
        }
        .search_input {
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
        .operate_group {
            padding-top: 65px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        .self-card-css {
            /deep/.el-card__body {
                padding: 10px;
            }
        }
        .el-upload-list__item-name {
            max-width: 140px;
        }
    }

</style>
