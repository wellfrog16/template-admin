<template>
    <div class="edit-scene-dialog">
        <el-row :gutter="20">
            <el-col :span="12">
                <s-card :title="`账户范围限制`">
                    <el-form ref="ruleForm" :model="ruleForm" slot="content">
                        <el-form-item>
                            <el-checkbox-group v-model="checkedList">
                                <el-checkbox :disabled="disabled" :label="item.value" v-for="(item, index) in checkbox" :key="index">
                                    <el-form-item :prop="item.field" :label="item.label" label-width="140px" style="display:inline-block; padding: 5px 0;">
                                        <el-input :disabled="disabled" :clearabled="!disabled" class="custom-width" size="small" v-model="ruleForm[item.field]"></el-input>
                                        <span class="unit-css" v-if="item.unit">{{ item.unit }}</span>
                                        <el-select :disabled="disabled" :clearabled="!disabled" size="small" v-if="index === checkbox.length - 1" v-model="ruleForm.statAcctType" class="custom-width" style="margin-left:3px;">
                                            <el-option
                                                v-for="item in accountTotalTypeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-checkbox>
                                <br>
                            </el-checkbox-group>
                        </el-form-item>
                        <p class="remark">* 缩小账户范围能提升计算效率</p>
                        <el-form-item label-width="140px" prop="cc" label="统计频度" style="padding-left:23px; margin-bottom: 30px;">
                            <el-select :disabled="disabled" :clearabled="!disabled" size="small" v-model="ruleForm.statFreq" class="custom-width">
                                <el-option
                                    v-for="item in accountTotalFrepOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </s-card>
                <div style="margin-top:8px; text-align: left;">
                    <el-button size="small" type="primary" :disabled="disabled" @click="handleReset">恢复默认设置</el-button>
                </div>
            </el-col>
            <el-col :span='12' class="right-block">
                <s-card :title="`算法参数配置`">
                    <el-row slot="content" style="padding: 20px;">
                        <el-radio-group v-model="ruleForm.sf">
                            <el-radio v-for="(item, index) in sfOptions" :key="index" :label="item.value">{{ item.label }}</el-radio>
                        </el-radio-group>
                    </el-row>
                </s-card>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px; text-align:center;">
            <el-input :disabled="disabled" :clearable="!disabled" style="margin-right: 5px;" size="small" v-model="ruleForm.sceneName" placeholder="请输入场景名称" class="custom-width"></el-input>
            <el-input :disabled="disabled" :clearable="!disabled" style="margin-right: 5px;" size="small" v-model="ruleForm.sceneComnt" placeholder="请输入场景说明" class="custom-width"></el-input>
            <el-button size="small" type="primary" :disabled="disabled" @click="saveSceneConfig">保存场景</el-button>
        </el-row>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import {correlationIndexColumns, accountTotalTypeOptions, accountTotalFrepOptions, defaultConfig, sfOptions} from './constants';
export default {
    components: {SCard},
    props: {
        operateType: {
            type: [Number, String],
            required: true
        },
        createType: {
            type: [Number, String],
            required: true
        },
        dialogItem: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    watch: {
        dialogItem() {
            this.setRuleForm();
        }
    },
    computed: {
        disabled() {
            return String(this.operateType) === '1';
        }
    },
    data() {
        return {
            accountTotalTypeOptions,
            accountTotalFrepOptions,
            correlationIndexColumns,
            defaultConfig,
            sfOptions,
            checkedList: ['0'],
            checkbox: [
                {field: 'acctMakePosQtty', label: '账户持仓量 >=', value: '0', unit: '手'},
                {field: 'acctBargainQtty', label: '账户成交量 >=', value: '1', unit: '手'},
                {field: 'acctBillCnt', label: '账户报单数 >=', value: '2', unit: '笔'},
                {field: 'statAcctCnt', label: '统计账户数 >=', value: '3', unit: ''}
            ],
            ruleForm: {
                isDel: '1', // 可以删除
                sceneId: '', // 场景id
                sceneComnt: '', // 场景说明
                sceneName: '', // 场景名称
                acctBargainQtty: '', // 账户成交量
                acctBillCnt: '', // 账户报单量
                acctMakePosQtty: '', // 账户持仓量
                statAcctCnt: '', // 统计账户数
                statAcctType: '', // 统计账户类型
                statFreq: '', // 统计频度
                sf: '', // 算法
                indexPara: '' // 指数内容
            }
        };
    },
    methods: {
        setRuleForm() {
            this.ruleForm = {
                isDel: '1',
                sceneType: this.createType,
                sceneId: this.dialogItem.sceneId || '',
                sceneComnt: this.dialogItem.sceneComnt || '', // 场景说明
                sceneName: this.dialogItem.sceneName || '', // 场景名称
                acctBargainQtty: this.dialogItem.acctBargainQtty || this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.dialogItem.acctBillCnt || this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.dialogItem.acctMakePosQtty || this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.dialogItem.statAcctCnt || this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.dialogItem.statAcctType || this.defaultConfig.statAcctType, // 统计账户类型
                statFreq: this.dialogItem.statFreq || this.defaultConfig.statFreq, // 统计频度
                sf: this.dialogItem.sf || this.defaultConfig.sf // 算法
            };
        },
        handleReset() {
            this.ruleForm = {
                isDel: '1',
                sceneType: this.createType,
                sceneComnt: this.ruleForm.sceneComnt, // 场景说明
                sceneName: this.ruleForm.sceneName, // 场景名称
                acctBargainQtty: this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.defaultConfig.statAcctType, // 统计账户类型
                statFreq: this.defaultConfig.statFreq, // 统计频度
                sf: this.defaultConfig.sf // 算法
            };
        },
        syntaxCheck(callback) {
            callback && callback();
        },
        saveSceneConfig() {
            if (!this.ruleForm.sceneName) {
                this.$message.error('请输入场景名称');
            }
            if (!this.ruleForm.sceneComnt) {
                this.$message.error('请输入场景说明');
            }
            // 语法校验
            this.syntaxCheck(() => {
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        this.$emit('saveScene', this.ruleForm);
                    }
                });
            });
        }
    },
    mounted() {
        this.setRuleForm();
    }
};
</script>
<style lang='less' scoped>
    .edit-scene-dialog {
        .el-card {
            background: #07182e;
        }
        .unit-css {
            color: #fff;
            margin-left: 5px;
        }
        /deep/ .el-checkbox {
            margin-left: 0;
        }
        .custom-width {
            width: 180px;
        }
        .remark {
            margin-top: -17px;
            padding-left: 58px;
            font-size: 12px;
            color: rgb(239, 156, 0);
        }
        .right-block {
            /deep/ .el-card__body {
                padding: 0;
            }
        }
    }
</style>
