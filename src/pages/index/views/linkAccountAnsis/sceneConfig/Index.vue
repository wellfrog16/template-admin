<template>
    <div class="scene-config-page">
        <s-card class="basic-info" :title="`客户群体选择`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="border-right:1px solid #ccc;">
                            <el-form-item prop="a">
                                <el-radio-group v-model="ruleForm.exportType">
                                    <el-radio label="0">
                                        <el-form-item prop="resultId" label="导入结果集" label-width="140px" style="display:inline-block; padding: 5px 0;"
                                                      :rules="[{
                                                          required: String(ruleForm.exportType) === '0', message: '请选择结果集'
                                                      }]">
                                            <el-select class="custom-width" clearable size="small" v-model="ruleForm.resultId">
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
                                    <el-radio label="1" class="self-radio">
                                        <el-form-item prop="fileList" label="导入CSV" label-width="140px" style="display:inline-block; padding: 5px 0;"
                                                      :rules="[{
                                                          required: String(ruleForm.exportType) === '1', message: '请上传附件'
                                                      }]">
                                            <div>
                                                <!-- <upload-common
                                                    :showFileList="true"
                                                    :fileList="fileList"
                                                    :actionUrl="uploadBasicUrl"
                                                    :uploadOption="uploadOption"
                                                    :limitFileType="defaultLimitFileType"
                                                    :limitFileSize="1"
                                                    :limit="1"
                                                    @handlePreview="handlePreview"
                                                    @handleRemove="handleRemove"
                                                    @getTxtCon="getFileList"
                                                ></upload-common> -->
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
                                    <br>
                                    <el-radio label="2">
                                        <el-form-item prop="customNoArray" label="导入连续客户号" label-width="140px" style="display:inline-block; padding: 5px 0;"
                                                      :rules="[{
                                                          validator: validateCustomNo, required: String(ruleForm.exportType) === '2'
                                                      }]">
                                            <el-input clearable size="small" v-model="ruleForm.customNoArray[0]" style="width: 150px;"></el-input>
                                            <span style="color: #fff; margin: 0 20px;">~</span>
                                            <el-input clearable size="small" v-model="ruleForm.customNoArray[1]" style="width: 150px;"></el-input>
                                        </el-form-item>
                                    </el-radio>
                                    <br>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="area" label="地区选择" label-width="140px">
                                <div>
                                    <tree-common ref="tree-components" :isMultipleMode="true"></tree-common>
                                </div>
                            </el-form-item>
                            <el-form-item prop="contractCode" label="合约代码" label-width="140px">
                                <el-input clearable size="small" v-model="ruleForm.contractCode" class="custom-width"></el-input>
                            </el-form-item>
                            <el-form-item prop="selectDateRange" label="统计区间" label-width="140px">
                                <s-date-picker
                                    :value="ruleForm.selectDateRange"
                                    :isRange="true"
                                    @change="handleSdatePickerDateRangeChange"
                                ></s-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </s-card>
        <s-card class="table-container" :title="`场景配置`" :subTitle="`（ * 场景可多选 ）`" :icon="`el-icon-setting`">
            <div slot="right">
                <el-popover
                    placement="right"
                    width="200"
                    trigger="click">
                    <el-radio-group v-model="createType" @change="handleRadioChange">
                        <el-radio style="display:block; padding: 10px; margin: 0;" v-for="(item, index) in createTypeOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
                    </el-radio-group>
                    <el-button slot="reference" class="new-btn" type="primary" size="mini"><i class="el-icon-plus"></i>新增自定义场景</el-button>
                </el-popover>
                <el-input class="search-input" size="mini" placeholder="请输入场景名称或场景说明" v-model="searchAccountText" @keyup.enter.native="handleSearch">
                    <i class="el-icon-search" slot="prefix" @click="handleSearch" style="margin-left:4px; cursor: pointer;"></i>
                </el-input>
            </div>
            <div slot="content">
                <s-table :columns="columns" :tableData="tableData" :showSelectionColumn="true" @selection-change="handleSelectChange">
                    <el-table-column
                        :width="300"
                        slot="tableColumnsPush"
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="openDialog(scope.row, 1)" icon="el-icon-view">查看</el-button>
                            <el-button type="warning" size="small" @click="openDialog(scope.row, 2)" icon="el-icon-edit">编辑</el-button>
                            <el-button type="danger" size="small" v-if="scope.row.isDel === '1'" icon="el-icon-delete" @click="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </s-table>
            </div>
        </s-card>
        <div style="text-align:center; margin: 30px 0;">
            <el-button size="small" type="primary" style="width: 100px;" @click="nextStep">下一步</el-button>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`"
                   :visible="showDialog" width="85%" @close="handleCloseDialog" :title="`${operateType === 1 ? '查看' : operateType === 2 ? '编辑' : '新增'}场景配置-${createTypeName}`">
            <edit-scene-dialog :operateType="operateType" :dialogItem="dialogItem" :createType="dialogItem.sceneType || this.createType" @updateSceneList="getTableData"></edit-scene-dialog>
        </el-dialog>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`" :visible="showCarousel" width="85%" top="5%" @close="handleCloseCarousel">
            <el-carousel :interval="4000" height="600px">
                <el-carousel-item v-for="(item, index) in selectList" :key="index">
                    <edit-scene-dialog :operateType="1" :dialogItem="item" :createType="item.sceneType"></edit-scene-dialog>
                </el-carousel-item>
            </el-carousel>
            <el-row style="margin-top:30px; text-align:center;">
                <el-button size="small" type="primary" style="width: 100px;" @click="handleNextStep">确定</el-button>
            </el-row>
        </el-dialog>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import SCard from '@/components/index/common/SCard';
import SDatePicker from '@/components/index/common/SDatePicker';
import UploadFileToServer from '@/components/index/common/UploadFileToServer';
import TreeCommon from '@/components/index/common/TreeCommon';
import EditSceneDialog from './components/EditSceneDialog';
import {createTypeOptions} from './components/constants';
import {getSceneList, deleteScene, mergeAccount} from '@/api/dataAnsis/sceneConfig';
import {getAccountsByUploadFile, getTlsResultInfo} from '@/api/common';
export default {
    components: {
        STable,
        SCard,
        SDatePicker,
        TreeCommon,
        EditSceneDialog,
        UploadFileToServer
    },
    data() {
        return {
            createTypeOptions,
            resultList: [{label: '结果集1', value: '1'}],
            showDialog: false,
            showCarousel: false,
            uploadOption: {
                name: '上传',
                size: 'small',
                type: 'primary'
            },
            actionUrl: getAccountsByUploadFile(),
            uploadParams: {}, // 上传文件body参数
            createTypeName: '相关性分析',
            defaultLimitFileType: ['csv'],
            ruleForm: {
                fileList: [],
                exportType: '',
                resultId: '',
                customNoArray: [],
                contractCode: '',
                area: '9',
                selectDateRange: []
            },
            tableData: [],
            columns: [
                {
                    label: '场景名称',
                    field: 'sceneName'
                },
                {
                    label: '场景类型',
                    field: 'sceneTypeName'
                },
                {
                    label: '场景说明',
                    field: 'sceneComnt'
                }
            ],
            searchAccountText: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            areaData: [],
            dialogItem: {},
            operateType: 0,
            createType: '',
            selectList: [],
            exportCustomNo: [],
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
        validateCustomNo(rule, value, callback) {
            if (String(this.ruleForm.exportType) === '2') {
                if (!value.length) {
                    callback(new Error('请输入客户段号'));
                } else if (!value[0] && value[0] !== 0) {
                    callback(new Error('请输入客户段起始号'));
                } else if (!value[1] && value[1] !== 0) {
                    callback(new Error('请输入客户段结束号'));
                }
            }
            callback();
        },
        handleCheckChange(val) {
            console.log(val);
        },
        handleSdatePickerDateRangeChange(val) {
            this.ruleForm.selectDateRange = val;
        },
        handlePreview(file) {
            console.log(file);
        },
        handleRemove(file) {
            console.log(file);
            this.resultId = '';
        },
        getFileList(val) {
            console.log(val);
            this.resultId = val.join(',');
        },
        currentFileList(fileList) {
            this.ruleForm.fileList = fileList;
        },
        handleCloseDialog() {
            this.showDialog = false;
            this.createType = '';
        },
        openDialog(item, type) {
            this.showDialog = true;
            this.operateType = type;
            this.dialogItem = item;
            this.createTypeName = item.sceneTypeName || this.createTypeName;
        },
        handleRadioChange(val) {
            let index = this.createTypeOptions.findIndex(v => {
                return v['value'] === val;
            });
            this.createTypeName = this.createTypeOptions[index]['label'];
            if (val) {
                this.openDialog({}, 0);
            }
        },
        handleCloseCarousel() {
            this.showCarousel = false;
        },
        nextStep() {
            if (!this.selectList.length) {
                this.$message.error('请选择一个场景');
                return;
            }
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.showCarousel = true;
                }
            });
        },
        handleSelectChange(val) {
            console.log(val);
            this.selectList = val;
        },
        getTableData(params) {
            this.showDialog = false;
            getSceneList(params).then(resp => {
                this.tableData = resp;
            });
        },
        handleDelete(item) {
            this.$confirm('确定删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deleteScene(item.sceneId).then(() => {
                        this.getTableData();
                    });
                });
        },
        getResultList() {
            getTlsResultInfo().then(resp => {
                this.resultList = resp;
            });
        },
        handleSearch() {
            this.getTableData({searchName: this.searchAccountText});
        },
        handleUploadSuccess() {
            this.showCarousel = false;
            this.$router.push({name: ''});
        },
        handleNextStep() {
            let params = {
                // cityIds: this.$refs['tree-components'].getCheckedList(),
                cityIds: '',
                contractCode: this.ruleForm.contractCode,
                startDate: this.ruleForm.selectDateRange[0],
                endDate: this.ruleForm.selectDateRange[1],
                sceneIds: this.selectList.map(v => {
                    return v.sceneId;
                }).join(',')
            };
            if (!this.ruleForm.exportType) {
                this.$message.error('请选择一种导入客户的方式');
                return;
            }
            if (this.ruleForm.exportType === '0') {
                params.resultIds = this.ruleForm.resultId;

                if (this.ruleForm.exportType === '2') {
                    params.accountStart = this.ruleForm.customNoArray[0];
                    params.accountEnd = this.ruleForm.customNoArray[1];
                }
                console.log(params);
                // 导入csv
                if (this.ruleForm.exportType === '1') {
                    this.uploadParams = {...this.uploadParams, ...params};
                    this.$refs['uploadFile'].submitUpload();
                } else {
                    mergeAccount(params).then(resp => {
                        this.showCarousel = false;
                        this.$router.push({name: ''});
                    });
                }
            }
        },
        mounted() {
            this.getTableData();
            this.getResultList();
        }
    }
};
</script>
<style lang="less" scoped>
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
            /deep/.el-radio__input {
                vertical-align: top;
                margin-top: 20px;
            }
        }
    }
</style>
