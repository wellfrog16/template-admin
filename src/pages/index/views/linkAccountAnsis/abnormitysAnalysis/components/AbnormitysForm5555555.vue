<template>
    <el-card :class="$style.card_form">
        <el-form :class="$style.a_form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px"
                 class="demo-ruleForm">
            <el-row>
                <el-col :xl="10" :lg="10" :md="10" :sm="24">
                    <el-form-item :class="$style.rul_form_iInput" prop="importAccountGroup" label="导入结果集"
                                  label-width="100px">
                        <el-select :class="$style.select_option"
                                   class="custom-width"
                                   clearable size="small"
                                   :disabled="isImportAccountGroup"
                                   @change=""
                                   v-model="ruleForm.importAccountGroup">
                            <el-option
                                v-for="item in resultList"
                                :key="item.resultId"
                                :label="item.resultName"
                                :value="item.resultId">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="statisticalInterval" label="统计区间" label-width="100px">
                        <s-date-picker
                            :value="ruleForm.statisticalInterval"
                            :isRange="true"
                            @change="statisticalIntervalChange">
                        </s-date-picker>
                    </el-form-item>
                </el-col>
                <el-col :xl="10" :lg="10" :md="10" :sm="24">
                    <el-form-item prop="importCSV" label="导入CSV" label-width="120px">
                        <div>
                            <upload-common
                                :disabled="isImportCSV"
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
                    <el-form-item prop="contractCode" label="合约代码" label-width="120px">
                        <el-input :class="$style.select_option"
                                  clearable size="small"
                                  v-model="ruleForm.contractCode"
                                  class="custom-width">
                        </el-input>
                    </el-form-item>
                </el-col>
                <el-col :xl="4" :lg="4" :md="4" :sm="24">
                    <el-form-item label-width="60px">
                        <el-button type="primary" @click="generateReportsClick('ruleForm')">生成报告</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <a-table-tab-pane :class="$style.a_form_table_bar" :tablePaneData="tablePaneList" :formData="formDataList"></a-table-tab-pane>
        <a-table :tableData="tableList"></a-table>
    </el-card>

</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)

    // 时间区间
    import SDatePicker from '@/components/index/common/SDatePicker';
    // 导入CSV
    import UploadCommon from '@/components/index/common/UploadCommon';
    import {
        postImportAccountGroup,   //导入账户组
        postIInquire,            // 查询
        postImportAccounBar     // Bar 柱状图
    } from '@/api/dataAnsis/abnormityAnalysis';

    export default {
        name: "AbnormitysForm",
        // 父传子！
        props: {},

        components: {
            UploadCommon: () => import('@/components/index/common/UploadCommon'), // 导入CSV
            SDatePicker: () => import('@/components/index/common/SDatePicker'),   // 时间区间
            ATableTabPane: () => import('../../abnormitysAnalysis/components/AbnormitysTableTabPane'),
            ATable: () => import('../../abnormitysAnalysis/components/AbnormitysTable'),
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                isImportAccountGroup: false,
                isImportCSV: false,
                tablePaneList: {},
                formDataList: {},
                tableList: [],
                ruleForm: {
                    importAccountGroup: '',  // 导入账户组
                    importCSV: '',           // 导入CSV
                    statisticalInterval: ['2017-02-20', '2018-11-25'],  // 统计区间
                    contractCode: 'cu1712',    // 合约代码
                },
                rules: {
                    // name: [
                    //     {required: true, message: '请输入活动名称', trigger: 'blur'},
                    //     {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    // ],
                    // region: [
                    //     {required: true, message: '请选择活动区域', trigger: 'change'}
                    // ],
                    // date1: [
                    //     {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
                    // ],
                    // date2: [
                    //     {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
                    // ],
                    // type: [
                    //     {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
                    // ],
                    // resource: [
                    //     {required: true, message: '请选择活动资源', trigger: 'change'}
                    // ],
                    // desc: [
                    //     {required: true, message: '请填写活动形式', trigger: 'blur'}
                    // ]
                },
                resultList: [],  // 导入账户组列表
                uploadBasicUrl: '',  //  导入CSV
                uploadOption: {
                    name: '上传',
                    size: 'small',
                    type: 'primary'
                },
                defaultLimitFileType: ['xls', 'xlsx'],
            };
        },
        // 计算属性
        computed: {
        },
        watch: {},
        //    数据交互  127662
        methods: {
            setParams(){
                let params = {};
                if(this.ruleForm.importAccountGroup == ''){
                    params  = {          // 导入账户组
                        "statTimeBegin": this.ruleForm.statisticalInterval[0],  // 统计起始日
                        "statTimeEnd": this.ruleForm.statisticalInterval[1],    // 统计截止日
                        "contrCode": this.ruleForm.contractCode,                // 合约代码
                        "type":"2"
                    }
                }else {
                    params = {
                        "resultSetNo": this.ruleForm.importAccountGroup,       // 导入结果集
                        "statTimeBegin": this.ruleForm.statisticalInterval[0], // 统计起始日
                        "statTimeEnd": this.ruleForm.statisticalInterval[1],   // 统计截止日
                        "contrCode": this.ruleForm.contractCode,               // 合约代码
                        "type":"1"        // 表示导入结果集， '2'--表示导入csv文件
                    }
                }
                return params;
            },
            // 统计区间
            statisticalIntervalChange(val) {
                this.ruleForm.statisticalInterval = val;
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
            // 生成报告(查询)
            generateReportsClick(formName) {
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         alert('submit!');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });

                postIInquire(this.setParams()).then(resp => {
                    // overStoreAnalysis ： 超仓分析，
                    // frequentTrade      : 频繁报撤单，
                    // autoTrade：          自成交
                    // report

                    this.tablePaneList = resp;
                    this.tableList = resp.report;
                    this.formDataList = this.setParams();
                    // if (resp) {
                    //     let params = {
                    //         "accountTeamNo": '',    // 账户组号
                    //         "custId": "",           // 客户编号
                    //         "statTimeBegin": "",    // 统计起始日
                    //         "statTimeEnd": "",      // 统计截止日
                    //         "contrCode": "",        // 合约代码
                    //         "type": "1",            // ---取值 '1':超仓分析
                    //     }
                    //     postImportAccounBar(params).then(resp => {
                    //         console.log(resp);
                    //     })
                    // } else {
                    //     console.log(222);
                    // }
                    // console.log(resp.overStoreAnalysis);
                    //
                    // console.log(this.$store.commit('setStepOneParams'));

                    // setStepOneParams
                    // this.$store.commit('setStepOneParams',
                    //     {startDate: this.stepOneParams.startDate,
                    //         endDate: this.stepOneParams.endDate,})


                })
            },


        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
            // 导入结果集
            // postImportAccountGroup().then(resp => {
            //     this.resultList = resp;
            // });
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .card_form {
        color: #13ce66;
        :global(.el-card__body) {
            padding: 4px;
            .el-form-item {
                margin-bottom: 15px;
            }
        }
        .a_form {
            margin-bottom: 65px;
        }
    }
</style>
