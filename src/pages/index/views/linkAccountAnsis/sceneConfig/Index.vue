<template>
    <div class="scene-config-page">
        <s-card class="basic-info" :title="`客户群体选择`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="border-right:1px solid rgba(4, 58, 127, 0.92);">
                            <el-form-item prop="a">
                                <el-radio-group v-model="ruleForm.exportType">
                                    <el-radio label="0">
                                        <el-form-item prop="resultId" label="导入结果集" label-width="140px" style="display:inline-block; padding: 5px 0;"
                                                      :rules="[{
                                                          required: String(ruleForm.exportType) === '0', message: '请选择结果集'
                                                      }]">
                                            <resultSelectComponent :resultIdProps="ruleForm.resultId" @selectResultId="selectResultId"></resultSelectComponent>
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
                                            <el-button size="small" type="primary" @click="handleCheckedAll" style="margin-left:5px;">全选</el-button>
                                        </el-form-item>
                                    </el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item label="地区选择" label-width="140px">
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
                <s-table :columns="columns" :tableData="tableData" :showSelectionColumn="true" :loading="loading" @selection-change="handleSelectChange">
                    <el-table-column
                        :width="300"
                        slot="tableColumnsPush"
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click.self="openDialog(scope.row, 1)" icon="el-icon-view">查看</el-button>
                            <el-button type="warning" size="small" @click.self="openDialog(scope.row, 2)" icon="el-icon-edit">编辑</el-button>
                            <el-button type="danger" size="small" v-if="scope.row.isDel === '1'" icon="el-icon-delete" @click.self="handleDelete(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </s-table>
            </div>
        </s-card>
        <div style="text-align:center; margin: 20px 0;">
            <el-button size="small" type="primary" style="width: 100px;" @click="nextStep">下一步</el-button>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`"
                   :visible="showDialog" width="85%" @close="handleCloseDialog" :title="`${operateType === 1 ? '查看' : operateType === 2 ? '编辑' : '新增'}场景配置-${createTypeName}`">
            <edit-scene-dialog :operateType="operateType" :dialogItem="dialogItem" :createType="dialogItem.sceneType || this.createType" @updateSceneList="getTableData"></edit-scene-dialog>
        </el-dialog>
        <el-dialog v-loading.fullscreen.lock="loading" :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`" :visible="showCarousel" width="85%" top="3%" @close="handleCloseCarousel">
            <el-carousel :interval="4000" height="555px">
                <el-carousel-item v-for="(item, index) in selectList" :key="index">
                    <edit-scene-dialog :operateType="1" :dialogItem="item" :createType="item.sceneType"></edit-scene-dialog>
                </el-carousel-item>
            </el-carousel>
            <el-row style="margin-top:20px; text-align:center;">
                <el-button size="small" type="primary" style="width: 100px;" @click="handleNextStep" :loading="loading">确定</el-button>
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
import {uploadFileByBodyInfo} from '@/api/common';
import resultSelectComponent from '@/components/index/common/ResultSelectComponent';
import {resData5} from '../assoAccountGroupMerge//components/constants';
import moment from 'moment';
import _ from 'lodash';
export default {
    components: {
        STable,
        SCard,
        SDatePicker,
        TreeCommon,
        EditSceneDialog,
        UploadFileToServer,
        resultSelectComponent
    },
    data() {
        return {
            createTypeOptions,
            showDialog: false,
            showCarousel: false,
            loading: false,
            uploadOption: {
                name: '上传',
                size: 'small',
                type: 'primary'
            },
            actionUrl: uploadFileByBodyInfo('accountMerge/csv'),
            uploadParams: {}, // 上传文件body参数
            createTypeName: '相关性分析',
            defaultLimitFileType: ['csv'],
            ruleForm: {
                fileList: [],
                exportType: '',
                resultId: '',
                resultType: '',
                customNoArray: ['80000001', '80001000'],
                contractCode: 'cu1712',
                selectDateRange: [new Date(moment().subtract(1, 'months').format('YYYY-MM-DD')), new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))]
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
            dialogItem: {},
            operateType: 0,
            createType: '',
            selectList: [],
            exportCustomNo: [],
            rules: {
                contractCode: [
                    {
                        required: true,
                        message: '请输入合约代码',
                    },
                    {
                        pattern: /^[A-Za-z0-9]{1,30}$/,
                        message: '只能输入字母和数字，30个字符以内'
                    }
                ],
                selectDateRange: {
                    required: true,
                    message: '请选择统计区间'
                }
            },
            openWindows: {},
            openFlag: false
        };
    },
    methods: {
        handleCheckedAll() {
            this.ruleForm.exportType = '2';
            this.ruleForm.customNoArray = ['00000001', '99999999'];
        },
        selectResultId(val, valName, valType) {
            this.ruleForm.resultId = val;
            this.ruleForm.resultType = valType;
        },
        validateCustomNo(rule, value, callback) {
            let reg = /^[0-9]+$/;
            if (String(this.ruleForm.exportType) === '2') {
                if (!value.length) {
                    callback(new Error('请输入客户段号'));
                } else if (!value[0] && value[0] !== 0) {
                    callback(new Error('请输入客户段起始号'));
                } else if (!value[1] && value[1] !== 0) {
                    callback(new Error('请输入客户段结束号'));
                } else if (!reg.test(value[0]) || !reg.test(value[1])) {
                    callback(new Error('客户编号只能为数字'));
                } else if (value[0] > value[1]) {
                    callback(new Error('客户段起始号不能大于结束号'));
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
            this.dialogItem = {};
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
            if (this.selectList.length > 4) {
                this.$message.error('最多选择四个场景');
                return;
            }
            if (!this.ruleForm.exportType) {
                this.$message.error('请选择一种导入客户的方式');
                return;
            }
            this.selectList = _.sortBy(this.selectList, [item => { return item.sceneId; }]);
            let sceneTypes = this.selectList.map(v => {
                return v.sceneType;
            });
            let uniqArray = _.uniq(sceneTypes);
            if (uniqArray.length < this.selectList.length) {
                this.$message.error('不能选择同一种场景类型');
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
            this.loading = true;
            getSceneList(params).then(resp => {
                this.loading = false;
                this.tableData = resp;
            }).catch(e => {
                this.loading = false;
                console.error(e);
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
        handleSearch() {
            this.getTableData({searchName: this.searchAccountText});
        },
        handleUploadSuccess(resp, success, params) {
            this.loading = false;
            this.showCarousel = false;
            let store = this.$store.getters.sceneCommitResp;
            store[params.sceneIds] = resp;
            this.$store.commit('saveSceneCommitResp', store);
            if (!this.openFlag) {
                this.openFlag = true;
                this.$router.push({name: 'assoAccountGroupMerge'});
            }
            // this.windowNewTabBySceneId(params, resp);
        },
        async createWindow(params, resp) {
            let sceneTypeMap = {
                '1': 'XG',
                '2': 'BV',
                '3': 'BI',
                '4': 'RL',
            };
            let win = await window.open(`${location.origin}/#/assoAccountGroupMerge${sceneTypeMap[params.sceneTypes]}?sceneId=${params.sceneIds}`);
            console.log(win);
            setTimeout(() => {
                win && win.postMessage(resp);
            }, 1350);
        },
        windowNewTabBySceneId(params, resp) {
            resp.sceneId = params.sceneIds;
            this.createWindow(params, resp);
        },
        getNextStepData(params) {
            this.loading = true;
            if (this.ruleForm.exportType === '1') {
                this.uploadParams = {...this.uploadParams, ...params};
                this.$nextTick(() => {
                    this.$refs['uploadFile'].submitUpload();
                });
            } else {
                mergeAccount(params).then(resp => {
                    this.loading = false;
                    this.showCarousel = false;
                    let store = this.$store.getters.sceneCommitResp;
                    store[params.sceneIds] = resp;
                    this.$store.commit('saveSceneCommitResp', store);
                    if (!this.openFlag) {
                        this.openFlag = true;
                        this.$router.push({name: 'assoAccountGroupMerge'});
                    }
                    // this.windowNewTabBySceneId(params, resp);
                }).catch(e => {
                    this.loading = false;
                });
            }
        },
        handleNextStep() {
            let cityIds = this.$refs['tree-components'].getCheckedList(true).map(v => {
                return v.id;
            });

            let params = {
                exportType: this.ruleForm.exportType,
                cityIds: cityIds.join(',') || '11',
                contrCd: this.ruleForm.contractCode,
                statStartDt: moment(this.ruleForm.selectDateRange[0]).format('YYYY-MM-DD'),
                // statStartDt: '2017-03-01',
                // statStopDay: '2017-03-31',
                statStopDay: moment(this.ruleForm.selectDateRange[1]).format('YYYY-MM-DD'),
                sceneIds: '',
                sceneNames: '',
                sceneTypes: '',
                statFreq: '',
                indexPara: ''
            };
            if (this.ruleForm.exportType === '0') {
                params.resultIds = this.ruleForm.resultId;
                params.resultType = this.ruleForm.resultType;
            }
            if (this.ruleForm.exportType === '2') {
                params.accountStart = this.ruleForm.customNoArray[0];
                params.accountEnd = this.ruleForm.customNoArray[1];
            }
            let paramsArray = [];
            this.selectList.forEach(v => {
                paramsArray.push({
                    ...params,
                    ...{
                        sceneIds: v.sceneId,
                        sceneNames: v.sceneName,
                        sceneTypes: v.sceneType,
                        statFreq: v.statFreq,
                        indexPara: v.indexPara
                    }
                });
            });
            let tabs = {};
            paramsArray.forEach(v => {
                tabs[v.sceneIds] = v;
            });
            this.$store.commit('saveSceneCommitParams', tabs);
            paramsArray.forEach(v => {
                if (v.sceneTypes === '1' || v.sceneTypes === '3') {
                    this.getNextStepData(v);
                } else {
                    if (!this.openFlag) {
                        this.openFlag = true;
                        let store = this.$store.getters.sceneCommitResp;
                        store[params.sceneIds] = resData5;
                        this.$store.commit('saveSceneCommitResp', store);
                        this.$router.push({name: 'assoAccountGroupMerge'});
                    }
                }
            });
        }
    },
    mounted() {
        this.getTableData();
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
    }
</style>
