<template>
    <el-card :class="$style.card_form">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :xl="10" :lg="10" :md="10" :sm="24">
                    <el-form-item :class="$style.rul_form_iInput" prop="importAccountGroup" label="导入账户组"
                                  label-width="100px">
                        <el-select :class="$style.select_option"
                                   class="custom-width"
                                   clearable size="small"
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
    </el-card>

</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)
    import MixinVue1 from "../components/MixinsForm";
    // 时间区间
    import SDatePicker from '@/components/index/common/SDatePicker';
    // 导入CSV
    import UploadCommon from '@/components/index/common/UploadCommon';
    import {
        postImportAccountGroup,
        postImportAccoun,
    } from '@/api/dataAnsis/abnormityAnalysis';

    export default {
        name: "AbnormitysForm",
        // 父传子！
        props: {},

        components: {
            UploadCommon: () => import('@/components/index/common/UploadCommon'), // 导入CSV
            SDatePicker: () => import('@/components/index/common/SDatePicker')   // 时间区间
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [MixinVue1],
        // 存储数据
        data() {
            return {
                ruleForm: {
                    importAccountGroup: '',  // 导入账户组
                    importCSV: '',           // 导入CSV
                    statisticalInterval: [],  // 统计区间
                    contractCode: '4635653',    // 合约代码
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
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
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
        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
            // postImportAccountGroup().then(resp => {
            //     console.log(resp);
            //     this.resultList = resp;
            // });
            // postImportAccoun().then(resp => {
            //     console.log(resp);
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
            padding: 15px 0 0 0;
            .el-form-item {
                margin-bottom: 15px;
            }
        }
        .select_option {
            width: 82%;
        }
    }
</style>
