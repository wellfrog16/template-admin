<template>
    <div class="edit-scene-dialog">
        <el-row :gutter="20">
            <el-col :span="12">
                <s-card :title="`账户范围限制`">
                    <el-form ref="ruleForm" :model="ruleForm" slot="content">
                        <el-form-item>
                            <el-checkbox-group v-model="checkedList">
                                <el-checkbox :disabled="disabled" :label="item.value" v-for="(item, index) in checkbox" :key="index">
                                    <div v-if="index === 0" class="header-css">按数量筛选：</div>
                                    <div v-if="index === 3"  class="header-css">按排名筛选：</div>
                                    <el-form-item :prop="item.field" :label="item.label" label-width="140px" style="display:inline-block; padding: 5px 0;"  :rules="[
                                        {validator: selfValidate, type: item.field}
                                    ]">
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
                        <el-form-item label-width="140px" prop="cc" label="统计频度" style="padding-left:23px; margin-bottom: 0;">
                            <el-select :disabled="disabled" :clearabled="!disabled" size="small" v-model="ruleForm.statFreq" class="custom-width">
                                <el-option
                                    :disabled="item.value !== '1'"
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
                        <el-radio-group v-model="ruleForm.almSel">
                            <el-radio v-for="(item, index) in sfOptions" :key="index" :label="item.value" :disabled="item.value === '1'">{{ item.label }}</el-radio>
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
import {checkbox, correlationIndexColumns, accountTotalTypeOptions, accountTotalFrepOptions, defaultConfig, sfOptions} from './constants';
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
            checkbox,
            accountTotalTypeOptions,
            accountTotalFrepOptions,
            correlationIndexColumns,
            defaultConfig,
            sfOptions,
            checkedList: ['1', '2', '3', '4'],
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
                almSel: '2', // 算法
                indexPara: '' // 指数内容
            }
        };
    },
    methods: {
        setRuleForm() {
            this.ruleForm = {
                isDel: String(this.dialogItem.isDel) === '0' ? '0' : '1',
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
                almSel: this.dialogItem.almSel || this.defaultConfig.almSel // 算法
            };
            if (this.dialogItem.sceneId) {
                let checkedList = [];
                if (this.dialogItem.acctMakePosQtty !== null) {
                    checkedList.push('1');
                }
                if (this.dialogItem.acctBargainQtty !== null) {
                    checkedList.push('2');
                }
                if (this.dialogItem.acctBillCnt !== null) {
                    checkedList.push('3');
                }
                if (this.dialogItem.statAcctCnt !== null) {
                    checkedList.push('4');
                }
                this.checkedList = checkedList;
            } else {
                this.checkedList = this.defaultConfig.checkedList;
            }
        },
        handleReset() {
            this.ruleForm = {
                isDel: String(this.ruleForm.isDel) === '0' ? '0' : '1',
                sceneType: this.createType,
                sceneComnt: this.ruleForm.sceneComnt, // 场景说明
                sceneName: this.ruleForm.sceneName, // 场景名称
                acctBargainQtty: this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.defaultConfig.statAcctType, // 统计账户类型
                statFreq: this.defaultConfig.statFreq, // 统计频度
                almSel: this.defaultConfig.almSel // 算法
            };
        },
        selfValidate(rule, value, callback) {
            let reg = /^[0-9]+$/;
            switch (rule.type) {
            case 'acctMakePosQtty':
                if (this.checkedList.indexOf('1') > -1 && !reg.test(value)) {
                    callback(new Error('账户持仓量只能输入正整数'));
                }
                break;
            case 'acctBargainQtty':
                if (this.checkedList.indexOf('2') > -1 && !reg.test(value)) {
                    callback(new Error('账户成交量只能输入正整数'));
                }
                break;
            case 'acctBillCnt':
                if (this.checkedList.indexOf('3') > -1 && !reg.test(value)) {
                    callback(new Error('账户报单数只能输入正整数'));
                }
                break;
            case 'statAcctCnt':
                if (this.checkedList.indexOf('4') > -1 && !reg.test(value)) {
                    callback(new Error('账户数只能输入正整数'));
                }
                break;
            }
            callback();
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
                        let params = JSON.parse(JSON.stringify(this.ruleForm));
                        if (this.checkedList.indexOf('1') === -1) {
                            params.acctMakePosQtty = '';
                        }
                        if (this.checkedList.indexOf('2') === -1) {
                            params.acctBargainQtty = '';
                        }
                        if (this.checkedList.indexOf('3') === -1) {
                            params.acctBillCnt = '';
                        }
                        if (this.checkedList.indexOf('4') === -1) {
                            params.statAcctCnt = '';
                        }
                        this.$emit('saveScene', params);
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
        .header-css {
            margin-left: -20px;
            padding: 10px 32px;
            background: url('../../../../../../assets/img/usr/card_header_bg.png') no-repeat -10px bottom;
            background-size: 200px;
        }
    }
</style>
