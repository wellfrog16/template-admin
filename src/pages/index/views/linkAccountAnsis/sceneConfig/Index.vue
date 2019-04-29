<template>
    <div class="scene-config-page">
        <s-card class="basic-info" :title="`客户群体选择`" :icon="`fa fa-user-check`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="border-right:1px solid rgba(4, 58, 127, 0.92);">
                            <el-form-item prop="exportType">
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
                                                    @handleUploadError="handleUploadError"
                                                ></upload-file-to-server>
                                                <!-- <el-button @click="remove">remove</el-button> -->
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
                                            <span style="color: #fff; margin: 0 8px;">~</span>
                                            <el-input clearable size="small" v-model="ruleForm.customNoArray[1]" style="width: 150px;"></el-input>
                                            <el-button size="mini" type="primary" @click="handleCheckedAll" style="margin-left:5px;">全选</el-button>
                                        </el-form-item>
                                    </el-radio>
                                </el-radio-group>
                                <div><span style="font-size: 14px; color: #f36565;">注：请选择一种客户导入方式</span></div>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item label="地区选择" label-width="140px">
                                <div>
                                    <tree-common ref="tree-components" :isMultipleMode="true"></tree-common>
                                </div>
                            </el-form-item>
                            <el-form-item prop="contractCode" label="合约代码" label-width="140px">
                                <el-input clearable size="small" v-model="ruleForm.contractCode" class="custom-width" placeholder="cu1712"></el-input>
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
        <s-card class="table-container" :title="`场景配置`" :icon="`el-icon-setting`">
            <div slot="right">
                <el-popover
                    placement="right"
                    width="200"
                    trigger="click">
                    <el-radio-group v-model="createType" @change="handleRadioChange">
                        <el-radio style="display:block; padding: 10px; margin: 0;" v-for="(item, index) in createTypeOptions" :key="index" :label="item.value">
                            <span>{{ item.label }}</span>
                            <el-tooltip placement="right">
                                <i class="el-icon-question" style="font-size: 14px; margin-left: 10px;"></i>
                                <div slot="content" style="max-width: 250px; line-height: 20px;">{{ item['tooltip'] }}</div>
                            </el-tooltip>
                        </el-radio>
                    </el-radio-group>
                    <el-button slot="reference" class="new-btn" type="primary" size="mini"><i class="el-icon-plus"></i>新增自定义场景</el-button>
                </el-popover>
                <el-input class="search-input" size="mini" placeholder="请输入场景名称或场景说明" v-model="searchAccountText" @keyup.enter.native="handleSearch">
                    <i class="el-icon-search" slot="prefix" @click="handleSearch" style="margin-left:4px; cursor: pointer;"></i>
                </el-input>
            </div>
            <div slot="content">
                <s-table :columns="columns" :tableData="tableData" :loading="loading" @selection-change="handleSelectChange" :cellStyle="selfCellStyle">
                    <el-table-column
                        fixed
                        align="center"
                        :width="80"
                        slot="tableColumnsUnshift"
                    >
                        <template slot-scope="scope">
                            <el-radio v-model="checkedRadio" :label="scope.row.sceneId" @change="handleSelectedSceneChange(scope)">
                                {{  }}
                            </el-radio>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :width="300"
                        align="center"
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
        <div style="text-align:center; margin: 20px 0;">
            <el-button size="small" type="warning" style="width: 100px;" @click="nextStep">下一步</el-button>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`"
                   :visible="showDialog" width="85%" @close="handleCloseDialog" :title="`${operateType === 1 ? '查看' : operateType === 2 ? '编辑' : '新增'}场景配置-${createTypeName}`">
            <edit-scene-dialog :operateType="operateType" :dialogItem="dialogItem" :createType="dialogItem.sceneType || this.createType" @updateSceneList="getTableData"></edit-scene-dialog>
        </el-dialog>
        <el-dialog
            element-loading-text="
            计算任务进行中，需时较长
            如遇特殊情况退出（断网、断电等）
            无需重复操作，计算完成后将自动保存到结果集"
            element-loading-background="rgba(0,0,0,0.6)"
            v-loading.fullscreen.lock="loading" :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`" :visible="showCarousel" width="85%" top="2%" @close="handleCloseCarousel">
            <el-carousel :interval="4000" :height="carouselHeight" indicator-position="none" arrow="never" v-if="showCarousel">
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
// import {testData} from '../assoAccountGroupMerge//components/constants';
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
            checkedRadio: '',
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
                contractCode: '',
                // selectDateRange: ['2017-06-01', '2017-08-31']
                selectDateRange: [new Date(moment().subtract(1, 'months').format('YYYY-MM-DD')), new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))]
            },
            tableData: [],
            columns: [
                {
                    label: '场景名称',
                    field: 'sceneName',
                    minWidth: 160
                },
                {
                    label: '场景类型',
                    field: 'sceneTypeName',
                    minWidth: 160,
                    sortable: true,
                    sortMethod: this.gfnSortByChineseCharacters.bind(this, 'sceneTypeName')
                },
                {
                    label: '场景说明',
                    field: 'sceneComnt',
                    minWidth: 160
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
            openFlag: false,
            cssMap: ['#f8f400', '#40f3d6', '#ce20ff', '#13ce34'],
            carouselHeight: '555px',
        };
    },
    methods: {
        remove() {
            // let fileList = this.ruleForm.fileList;
            // this.ruleForm.fileList = [];
            setTimeout(() => {
                // this.ruleForm.fileList = fileList;

                console.log(this.ruleForm.fileList);
                this.$nextTick(() => {
                    this.$refs['uploadFile'].submitUpload();
                    setTimeout(() => {
                        this.$refs['uploadFile'].$refs['upload'].clearFiles();
                        this.ruleForm.fileList = [];
                    }, 1000);
                });
            });
        },
        selfCellStyle({row, column, rowIndex, columnIndex}) {
            if (columnIndex === 3) {
                return `color: ${this.cssMap[row.sceneType - 1]}`;
            }
        },
        handleSelectedSceneChange(scope) { // 单选
            this.checkedRadio = scope.row.sceneId;
            this.selectList = this.tableData.filter(v => {
                return v.sceneId === scope.row.sceneId;
            });
        },
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
            if (String(this.ruleForm.exportType) === '1' && !this.ruleForm.fileList.length) {
                this.$message.error('请先上传一个CSV文件');
                return;
            }
            this.selectList = this.tableData.filter(v => {
                return v.sceneId === this.checkedRadio;
            });
            this.selectList = _.sortBy(this.selectList, [item => { return item.sceneId; }]);
            let sceneTypes = this.selectList.map(v => {
                return v.sceneType;
            });
            let uniqArray = _.uniq(sceneTypes);
            if (uniqArray.length < this.selectList.length) {
                this.$message.error('不能选择同一种场景类型');
                return;
            }
            // 轮播图高度
            this.carouselHeight = this.selectList[0]['sceneType'] === '1' ? '660px' : '555px';
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
                        if (item.sceneId === this.checkedRadio) {
                            this.checkedRadio = '';
                        }
                    });
                });
        },
        handleSearch() {
            this.getTableData({searchName: this.searchAccountText});
        },
        handleUploadError() {
            this.loading = false;
            this.showCarousel = false;
            /* this.$nextTick(() => {
                this.$refs['uploadFile'].$refs['upload'].clearFiles();
                this.ruleForm.fileList = [];
            }); */
        },
        handleUploadSuccess(resp, success, params) {
            this.loading = false;
            if (!resp) {
                this.$notify.error({
                    message: '没有查到符合条件的数据',
                    duration: 0
                });
                return;
            }
            this.showCarousel = false;
            let store = this.$store.getters.sceneCommitResp;
            store[params.sceneIds] = resp;
            this.$store.commit('saveSceneCommitResp', store);
            setTimeout(() => {
                if (!this.openFlag) {
                    this.openFlag = true;
                    this.$router.push({name: 'assoAccountGroupMerge'});
                }
            });
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
                this.uploadParams = {...this.uploadParams, ...params, ...{setupUser: localStorage.getItem('USER_NAME')}};
                this.$nextTick(() => {
                    this.$refs['uploadFile'].submitUpload();
                });
            } else {
                mergeAccount(params).then(resp => {
                    this.loading = false;
                    if (!resp) {
                        return;
                    }
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
            let cityIds = [];
            if (this.$refs['tree-components'].getCheckedList(true)) {
                cityIds = this.$refs['tree-components'].getCheckedList(true).map(v => {
                    return v.id;
                });
            }
            let params = {
                exportType: this.ruleForm.exportType,
                cityIds: cityIds.join(',') || '',
                contrCd: this.ruleForm.contractCode,
                // statStartDt: '2016-12-01',
                // statStopDay: '2017-12-31',
                statStartDt: moment(this.ruleForm.selectDateRange[0]).format('YYYY-MM-DD'),
                statStopDay: moment(this.ruleForm.selectDateRange[1]).format('YYYY-MM-DD'),
                sceneIds: '',
                sceneNames: '',
                sceneTypes: '',
                statFreq: '',
                indexPara: ''
            };
            if (this.ruleForm.exportType === '0') {
                params.resultIds = this.ruleForm.resultId;
                params.id = this.ruleForm.resultId;
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
                        id: v.sceneId,
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
            // 判断任务队列有慢请求
            let reqUrl = this.ruleForm.exportType === '1' ? 'operate/accountMerge/csv' : 'operate/accountMerge';
            this.getUserInterfaceState(reqUrl, () => {
                paramsArray.forEach(v => {
                    this.getNextStepData(v);
                });
            });
        }
    },
    mounted() {
        this.getTableData();
        // window.addEventListener('message', function(event) {
        //     console.log(event);
        // }, false);
    }

};
</script>
<style lang="less" scoped>
    .scene-config-page {
        color: #fff;
        .loading-css {
            background: red;
            white-space: pre;
        }
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
        .el-upload-list__item-name {
            max-width: 140px;
        }
    }
</style>
