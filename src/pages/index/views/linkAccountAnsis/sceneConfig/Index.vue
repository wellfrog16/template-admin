<template>
    <div class="scene-config-page">
        <s-card class="basic-info" :title="`客户群体选择`" :icon="`el-icon-edit`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24" style="border-right:1px solid #ccc;">
                            <el-form-item prop="a">
                                <el-radio-group v-model="ruleForm.exportType">
                                    <el-radio label="0">
                                        <el-form-item prop="resultName" label="导入结果集" label-width="140px" style="display:inline-block; padding: 5px 0;">
                                            <el-select class="custom-width" clearable size="small" v-model="ruleForm.b">
                                                <el-option
                                                    v-for="item in resultList"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-radio>
                                    <br>
                                    <el-radio label="1">
                                        <el-form-item prop="resultName" label="导入CSV" label-width="140px" style="display:inline-block; padding: 5px 0;">
                                            <div>
                                                <upload-common
                                                    :showFileList="true"
                                                    :actionUrl="uploadBasicUrl"
                                                    :uploadOption="uploadOption"
                                                    :limitFileType="defaultLimitFileType"
                                                    :limitFileSize="1"
                                                    :limit="1"
                                                    @handlePreview="handlePreview"
                                                    @handleRemove="handleRemove"
                                                    @getTxtCon="getFileList"
                                                ></upload-common>
                                            </div>
                                        </el-form-item>
                                    </el-radio>
                                    <br>
                                    <el-radio label="2">
                                        <el-form-item prop="resultName" label="导入连续客户号" label-width="140px" style="display:inline-block; padding: 5px 0;">
                                            <el-input clearable size="small" v-model="ruleForm.a" style="width: 150px;"></el-input>
                                            <span style="color: #fff; margin: 0 20px;">~</span>
                                            <el-input clearable size="small" v-model="ruleForm.a" style="width: 150px;"></el-input>
                                        </el-form-item>
                                    </el-radio>
                                    <br>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="a" label="地区选择" label-width="140px">
                                <div>
                                    <!-- <el-tree
                                        :props="defaultProps"
                                        show-checkbox
                                        :data="areaData"
                                        node-key="id"
                                        @check-change="handleCheckChange">
                                    </el-tree> -->
                                    <tree-common :isMultipleMode="true"></tree-common>
                                </div>
                            </el-form-item>
                            <el-form-item prop="a" label="合约代码" label-width="140px">
                                <el-input clearable size="small" v-model="ruleForm.a" class="custom-width"></el-input>
                            </el-form-item>
                            <el-form-item prop="selectDateRange" label="时间区间" label-width="140px">
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
                <el-input class="search-input" size="mini" prefix-icon="el-icon-search" placeholder="请输入账户号" v-model="searchAccountText"></el-input>
            </div>
            <div slot="content">
                <s-table :columns="columns" :tableData="tableData">
                    <el-table-column
                        :width="300"
                        slot="tableColumnsPush"
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="openDialog(scope.row, 1)" icon="el-icon-view">查看</el-button>
                            <el-button type="warning" size="small" @click="openDialog(scope.row, 2)" icon="el-icon-edit">编辑</el-button>
                            <el-button type="danger" size="small" v-if="scope.row.a === 1" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </s-table>
            </div>
        </s-card>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :custom-class="`self-dialog`"
                   :visible="showDialog" width="85%" @close="handleCloseDialog" :title="`${operateType === 1 ? '查看' : operateType === 2 ? '编辑' : '新增'}场景配置`">
            <edit-scene-dialog :operateType="operateType" :dialogItem="dialogItem"></edit-scene-dialog>
        </el-dialog>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import SCard from '@/components/index/common/SCard';
import SDatePicker from '@/components/index/common/SDatePicker';
import UploadCommon from '@/components/index/common/UploadCommon';
import TreeCommon from '@/components/index/common/TreeCommon';
import EditSceneDialog from './components/EditSceneDialog';
import {createTypeOptions} from './components/constants';
export default {
    components: {STable, SCard, SDatePicker, UploadCommon, TreeCommon, EditSceneDialog},
    data() {
        return {
            createTypeOptions,
            resultList: [{label: '结果集1', value: '1'}],
            showDialog: false,
            uploadOption: {
                name: '上传',
                size: 'small',
                type: 'primary'
            },
            uploadBasicUrl: '',
            defaultLimitFileType: ['xls', 'xlsx'],
            ruleForm: {
                exportType: '',
                a: '9',
                b: '',
                selectDateRange: []
            },
            tableData: [
                {a: 1, b: 2, c: 3}
            ],
            columns: [
                {
                    label: '场景名称', field: 'a'
                },
                {
                    label: '场景类型', field: 'b'
                },
                {
                    label: '场景说明', field: 'c'
                }
            ],
            searchAccountText: '',
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            areaData: [
                {id: 0, label: '北京', children: [{id: 1, label: '丰台区'}]}
            ],
            dialogItem: {},
            operateType: 0,
            createType: ''
        };
    },
    methods: {
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
        },
        getFileList(val) {
            console.log(val);
        },
        handleCloseDialog() {
            this.showDialog = false;
        },
        openDialog(item, type, createType) {
            this.showDialog = true;
            this.operateType = type;
            this.dialogItem = item;
        },
        handleRadioChange(val) {
            if (val) {
                this.openDialog({}, 0, val);
                this.createType = '';
            }
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
            width: 180px;

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
    }
</style>
