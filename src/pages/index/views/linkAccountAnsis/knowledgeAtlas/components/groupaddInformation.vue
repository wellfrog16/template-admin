<template>
    <div :class="$style.groupadd_information">
        <s-card :title="`客户群体选择`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-row>
                    <el-col :span="15">
                        <el-col :span="16">
                            <span>导入结果集：</span>
                            <resultSelectComponent
                                :resultIdProps="resultIds"
                                @selectResultId="selectResultId">
                            </resultSelectComponent>
                        </el-col>
                        <el-col :span="2">
                            <el-button :loading="loadingBt" size="small" type="primary" @click="ascertainUPClick1">确认</el-button>
                        </el-col>
                    </el-col>
                    <el-col :span="8" :class="$style.rigth">
                        <el-col :span="6" :class="$style.leading">
                            <span>导入 CSV：</span>
                        </el-col>
                        <el-col :span="10" :class="$style.up_loading">
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
                        </el-col>
                        <el-col :span="2">
                            <el-button size="small" type="primary" @click="ascertainUPClick">确认</el-button>
                        </el-col>

                    </el-col>
                </el-row>
            </div>
        </s-card>

        <s-card title="账户组信息" icon="el-icon-edit">
            <div slot="right">
                <el-input
                    class="search-input"
                    size="mini"
                    placeholder="请输入账户组或客户编号"
                    v-model="searchText">
                    <i class="el-icon-search" slot="prefix" style="margin-left:4px; cursor: pointer;"></i>
                </el-input>
            </div>
            <div slot="content">
                <el-row :gutter="20">
                    <el-col :span="21">
                        <div style="overflow:auto; max-height:400px;">
                            <tree-table
                                ref="self-tree-table"
                                :filterText="searchText"
                                :columns="mainTableColumns"
                                :tableData="mainTableData"
                                @updateCheckedList="updateCheckedList">
                            </tree-table>
                        </div>
                    </el-col>
                    <el-col :span="3">
                        <div class="operate-button-group">
                            <el-button style="padding: 9px 39px;" :class="$style.operate_button_group" type="danger" size="small"
                                       @click="handleDelete">删除
                            </el-button>
                            <br>
                            <el-button style="padding: 9px 39px;" :class="$style.operate_button_group" type="warning" size="small"
                                       @click="handleSplit">拆分
                            </el-button>
                            <br>
                            <el-button style="padding: 9px 39px;" :class="$style.operate_button_group" type="warning" size="small"
                                       @click="handleMerge">合并
                            </el-button>
                            <br>
                            <el-button :class="$style.operate_button_group" type="primary" size="small"
                                       @click="handleExportResult">导出到结果集
                            </el-button>
                            <br>
                            <el-button style="padding: 9px 24px;" :class="$style.operate_button_group" type="primary" size="small"
                                       @click="handleExportCsv('账户组信息', mainTableColumns)">导出到csv
                            </el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </s-card>
        <div :class="$style.groupadd_button">
            <el-button
                size="small"
                type="primary"
                @click="dialogFormVisible = true">生成数据
            </el-button>
            <el-button
                size="small"
                type="primary"
                @click="nextClick">下一步
            </el-button>
        </div>
        <el-dialog
            :before-close="closeData"
            title="客户历史交易查询"
            :visible.sync="dialogFormVisible"
            :class="$style.dia_name">
            <el-form ref="ruleForms" :model="ruleForms" :rules="rulesAll">
                <el-form-item
                    prop="contractCode"
                    label="合约代码："
                    label-width="100px">
                    <el-input
                        style="width: 80%;"
                        v-model="ruleForms.contractCode"
                        clearable size="small"
                        auto-complete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label-width="130px">
                    <el-button
                        type="warning"
                        size="small"
                        @click="dialogFormVisibl">取 消
                    </el-button>
                    <el-button
                        type="primary"
                        size="small"
                        @click="generateReportsClick('ruleForms')">确 定
                    </el-button>
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
    postRegenerate, // 生成报告（知识库图表）（文革7）
    postResultList // 导入结果集的树状列表(齐宁19)
} from '@/api/dataAnsis/knowledgeAtlas';

import SCard from '@/components/index/common/SCard';
import UploadFileToServer from '@/components/index/common/UploadFileToServer';
import TreeTable from '@/components/index/common/TreeTable';
import ResultSelectComponent from '@/components/index/common/ResultSelectComponent';

import {mainTableColumns} from '../components/constants';

export default {
    name: 'groupaddInformation',
    // 父传子！
    props: {},
    components: {
        SCard, // 边框
        UploadFileToServer, // 导入CSV
        TreeTable,
        ResultSelectComponent // 导入结果集的树状列表
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    mixins: [treeTableMixin],
    // 存储数据
    data() {
        return {
            loadingBt: false,
            dialogFormVisible: false,
            ruleForms: {
                contractCode: '' // 合约代码  cu1712
            },

            rulesAll: {
                contractCode: {
                    required: true,
                    message: '请输入合约代码'
                }
            },

            fullScreenLoading: false, // 加载 (结果集加载)

            mainTableColumns: mainTableColumns,
            // form 表单绑定值
            ruleForm: {
                fileList: [], // 导入CSV
                exportType: '', // 导入结果集按钮
            },
            rules: {
                exportType: {
                    message: '请选择结果集'
                },
                fileList: {
                    message: '请导入CSV'
                }
            },
            resultList: [],
            resultIds: '',
            uploadOption: {
                name: '上传',
                size: 'small',
                type: 'primary'
            },
            // 导入csv，输出账户号list 接口
            uploadParams: {}, // 上传文件body参数
            actionUrl: uploadFileByBodyInfo('customer/combinedscence/csv'),
            defaultLimitFileType: ['csv'],

            counter: 0, // 导入csv 表格push结果集名称
            searchText: '', // 请输入账户组或客户编号
            mainTableDataClick: [], // 确认按钮

        };
    },
    // 计算属性
    computed: {},
    watch: {},
    //    数据交互  127662
    methods: {
        // 导入结果集数据
        selectResultId(val, resultNameG, resultTypeG, setupUserG) {
            this.resultIds = val;
            if (val) {
                let params = {
                    'resultId': val,           // 结果集编号
                    'resultName': resultNameG, // 结果集名称
                    'resultType': resultTypeG, // 结果集类型
                    'setupUser': setupUserG,   // 创建用户
                };
                this.loadingBt = true;
                this.fullScreenLoading = true;
                postResultList(params).then(resp => {
                    this.loadingBt = false;
                    this.fullScreenLoading = false;
                    this.mainTableDataClick = resp;
                }).catch(e => {
                    this.loadingBt = false;
                    this.fullScreenLoading = false;
                });
            }
        },

        // 确认结果集导入 // 确认上次SVG
        ascertainUPClick1() {
            this.mainTableData = this.mainTableData.concat(this.mainTableDataClick);
        },
        ascertainUPClick() {
            this.$refs['uploadFile'].submitUpload();
        },

        // 导入CSV
        handleUploadSuccess(resp) {
            this.mainTableData = this.mainTableData.concat(resp);
        },
        // 导入CSV
        currentFileList(fileList) {
            this.ruleForm.fileList = fileList;
        },
        updateCheckedList() {
        },
        // 取消生成报告
        dialogFormVisibl() {
            this.dialogFormVisible = false;
            this.ruleForms.contractCode = '';
        },
        closeData(done) {
            done();
            // this.ruleForms.contractCode = '';
        },
        // 生成报告
        generateReportsClick() {
            this.$refs['ruleForms'].validate(valid => {
                if (valid) {
                    if (this.ruleForms.contractCode !== '') {
                        let a_contractCode = [];
                        let a_contractCodeChildren = [];
                        this.mainTableData.forEach(v => {
                            if (v.contractCode == null) {
                                v.contractCode = this.ruleForms.contractCode;
                                a_contractCode = this.mainTableData;
                                if (v.children) {
                                    v.children.forEach(m => {
                                        m.contractCode = this.ruleForms.contractCode;
                                        a_contractCodeChildren = this.mainTableData;
                                    });
                                }
                            }
                        });
                        this.dialogFormVisible = false;
                        postRegenerate(a_contractCodeChildren).then(resp => {
                            if (resp) {
                                this.$emit('generateEvent', resp.kmap); // 知识库图表
                                this.mainTableData = resp.resultSetList; // 账户组信息
                            }
                        }).catch(e => {
                            this.dialogFormVisible = false;
                        });
                    }
                }
            });
        },
        // 下一步
        nextClick() {
        },
    },
    // 在一个实例被创建之后执行代码
    created() {
    },
    // 初始化数据
    mounted() {
    },
    beforeDestroy() {
    }
};
</script>
<style lang="less" module>
    .groupadd_information {
        .rigth {
            position: relative;
        }
        .leading {
            position: relative;
            top: 9px;
        }
        .up_loading {
            position: relative;
            top: -4px;
        }
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
        .top-nav {
            position: relative;
            min-height: 56px;
        }
        .tabs-button {
            position: absolute;
            right: 0;
            top: 0;
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
        .operate-button-group {
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
    }

</style>
