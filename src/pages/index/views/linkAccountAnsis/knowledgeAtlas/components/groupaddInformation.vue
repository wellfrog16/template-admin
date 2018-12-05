<template>
    <el-card :class="$style.groupadd_information">
        <s-card :title="`客户群体选择`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-form-item prop="resource">
                        <el-radio-group
                            :class="$style.group_pos"
                            v-model="ruleForm.exportType">
                            <el-radio label="0" :class="$style.radio_pos">
                                <el-form-item
                                    :class="$style.resul"
                                    prop="resultId"
                                    label="导入结果集"
                                    label-width="90px">
                                    <el-select
                                        clearable size="small"
                                        :disabled="ruleForm.exportType === '1'"
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
                                <el-button
                                    :class="$style.radio_button"
                                    type="primary"
                                    @click="ascertainUPClick">确定
                                </el-button>
                            </el-radio>

                            <el-radio label="1" :class="$style.radio_pos">
                                <el-form-item
                                    :class="$style.resuls"
                                    prop="fileList"
                                    label="导入CSV"
                                    label-width="87px">
                                    <div>
                                        <upload-file-to-server
                                            :disabled="ruleForm.exportType === '0'"
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
                                <el-button
                                    :class="$style.radio_buttons"
                                    type="primary"
                                    @click="ascertainUPClick">确定
                                </el-button>
                            </el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--<el-row>-->
                    <!--<el-col>-->
                    <!--<el-form-item prop="a">-->
                    <!--<el-radio-group v-model="ruleForm.exportType">-->
                    <!--<el-radio label="0">-->
                    <!--<el-form-item-->
                    <!--prop="resultId"-->
                    <!--label="导入结果集"-->
                    <!--label-width="100px"-->
                    <!--style="display:inline-block; padding: 5px 0;"-->
                    <!--:rules="[-->
                    <!--{required: String(ruleForm.exportType) === '0', message: '请选择结果集'}-->
                    <!--]">-->
                    <!--<el-select class="custom-width" clearable size="small"-->
                    <!--@change="resultChange"-->
                    <!--v-loading="fullScreenLoading"-->
                    <!--element-loading-text="数据加载中，请耐心等待..."-->
                    <!--element-loading-background="rgba(0,0,0,0.3)"-->
                    <!--v-model="ruleForm.resultId">-->
                    <!--<el-option-->
                    <!--v-for="item in resultList"-->
                    <!--:key="item.resultId"-->
                    <!--:label="item.resultName"-->
                    <!--:value="item.resultId">-->
                    <!--</el-option>-->
                    <!--</el-select>-->
                    <!--</el-form-item>-->
                    <!--</el-radio>-->
                    <!--<br>-->
                    <!--<el-radio label="1">-->
                    <!--<el-form-item prop="fileList" label="导入CSV" label-width="87px"-->
                    <!--style="display:inline-block; padding: 5px 0;"-->
                    <!--:rules="[{-->
                    <!--required: String(ruleForm.exportType) === '1', message: '请上传附件'-->
                    <!--}]">-->
                    <!--<div>-->
                    <!--<upload-file-to-server-->
                    <!--class="upload-file"-->
                    <!--style="max-width: 444px;"-->
                    <!--ref="uploadFile"-->
                    <!--:actionUrl="actionUrl"-->
                    <!--:fileListProps="ruleForm.fileList"-->
                    <!--:uploadParams="uploadParams"-->
                    <!--:showSubmitUploadBtn="false"-->
                    <!--:autoUploadMode="false"-->
                    <!--@getTxtCon="handleUploadSuccess"-->
                    <!--@currentFileList="currentFileList"-->
                    <!--&gt;</upload-file-to-server>-->
                    <!--</div>-->
                    <!--</el-form-item>-->
                    <!--</el-radio>-->
                    <!--</el-radio-group>-->
                    <!--</el-form-item>-->
                    <!--</el-col>-->
                    <!--</el-row>-->
                </el-form>
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
                            <el-button type="danger" size="small" @click="handleDelete">删除</el-button>
                            <br>
                            <el-button type="warning" size="small" @click="handleSplit">拆分</el-button>
                            <br>
                            <el-button type="warning" size="small" @click="handleMerge">合并</el-button>
                            <br>
                            <el-button type="primary" size="small" @click="handleExportResult">导出到结果集</el-button>
                            <br>
                            <el-button type="primary" size="small" @click="handleExportCsv">导出到csv</el-button>
                            <br>
                            <el-button type="primary" size="small" @click="createNewData">重新生成数据</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </s-card>
    </el-card>

</template>
<script>
    import {
        uploadFileByBodyInfo    // 导入csv，输出账户号list
    } from '@/api/common';

    import {
        postTlsResultInfo,    //  结果集列表
    } from '@/api/dataAnsis/abnormityAnalysis';


    import TreeTable from '@/components/index/common/TreeTable';
    export default {
        name: "groupaddInformation",
        // 父传子！
        props: {},

        components: {
            SCard: () => import('@/components/index/common/SCard'),  // 边框
            UploadFileToServer: () => '@/components/index/common/UploadFileToServer',  // 导入CSV
            TreeTable,
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {

                fullScreenLoading: false,  // 加载 (结果集加载)

                mainTableColumns: [
                    {
                        field: 'acctId',
                        label: '账户组号',
                        minWidth: '80',
                    },
                    {
                        field: 'custId',
                        label: '客户编号'
                    },
                    {
                        field: 'custName',
                        label: '客户名称'
                    },
                    {
                        field: 'acctGroAvgRelaCoef',
                        label: '账户组平均相关系数',
                    },
                    {
                        field: 'acctAvgRelaCoef',
                        label: '账户平均相关系数',
                    },
                    {
                        field: 'contrCd',
                        label: '合约代码',
                    },
                    {
                        field: 'acctGroNetOpenInt',
                        label: '账户组净持仓量',
                    },
                    {
                        field: 'acctNetOpenInt',
                        label: '账户净持仓量',
                    },
                    {
                        field: 'custWheOtherGro',
                        label: '客户所在其他组',
                    },
                    {
                        field: 'buyBargainRela',
                        label: '买入成交相关系数',
                    },
                    {
                        field: 'sellBargainRela',
                        label: '卖出成交相关系数',
                    },
                    {
                        field: 'netBuyBargainRela',
                        label: '净买入成交相关系数',
                    },
                    {
                        field: 'longPosMakePosRela',
                        label: '多头持仓相关系数',
                    },
                    {
                        field: 'shortPosMakePosRela',
                        label: '空头持仓相关系数',
                    },
                    {
                        field: 'floatPrftLossRela',
                        label: '浮动盈亏相关系数',
                    }
                    ],
                mainTableData: [

                ],
                // form 表单绑定值
                ruleForm: {
                    fileList: [],          // 导入CSV
                    exportType: '',       // 导入结果集按钮
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

                uploadOption: {
                    name: '上传',
                    size: 'small',
                    type: 'primary'
                },
                // 导入csv，输出账户号list 接口
                uploadParams: {}, // 上传文件body参数
                actionUrl: uploadFileByBodyInfo(),
                defaultLimitFileType: ['csv'],


                searchText: '',  // 请输入账户组或客户编号
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {

            // 确认结果集导入 // 确认上次SVG
            ascertainUPClick() {
                console.log(this.ruleForm.exportType);
            },
            // 选择结果集的按钮 -- 二选一
            resultChange(val) {
                if (val) {
                    if (this.ruleForm.exportType !== '0') {
                        this.ruleForm.exportType = '0'
                    }
                } else {
                    this.ruleForm.exportType = '';
                }
            },
            //  结果集列表
            getResultList() {
                this.fullScreenLoading = true;
                postTlsResultInfo().then(resp => {
                    this.fullScreenLoading = false;
                    this.resultList = resp;
                });
            },
            // 导入CSV
            handleUploadSuccess() {
                this.$router.push({name: ''});
            },
            // 导入CSV
            currentFileList(fileList) {
                this.ruleForm.fileList = fileList;
            },

            // 删除
            handleDelete() {
            },
            // 拆分
            handleSplit() {
            },
            // 合并
            handleMerge() {
            },
            // 导出到结果集
            handleExportResult() {
            },
            // 导出到csv
            handleExportCsv() {
            },
            // 重新生成数据
            createNewData() {
            },
            updateCheckedList() {
            }
        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
            //  结果集列表
            // this.getResultList();
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .groupadd_information {
        color: #13ce66;
        .group_pos {
            width: 100%;
        }
        .resul {
            position: relative;
            top: -28px;
            left: 20px;
        }
        .resuls {
            position: relative;
            top: -15px;
            left: 20px;
        }
        .radio_pos {
            width: 500px;
        }
        .radio_button {
            position: relative;
            float: right;
            top: -69px;
            right: 70px;
        }
        .radio_buttons {
            position: relative;
            top: -55px;
            left: 200px;
        }
        .el-radio-group {
            display: flex;
        }
    }

</style>
