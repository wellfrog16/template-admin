<template>
    <div class="edit-scene-dialog">
        <el-row :gutter="20">
            <el-col :span="12">
                <s-card :title="`账户范围限制`">
                    <el-form ref="ruleForm" :model="ruleForm" slot="content" :rules="rules">
                        <el-form-item>
                            <el-checkbox-group v-model="checkedList">
                                <el-checkbox :disabled="disabled" :label="item.value" v-for="(item, index) in checkbox" :key="index" @change="handleCheckedChange">
                                    <el-form-item :prop="item.field" :label="item.label" label-width="140px" style="display:inline-block; padding: 5px 0;" :rules="[
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
                    </el-form>
                </s-card>
                <div style="margin-top:8px; text-align: left;">
                    <el-button size="small" type="primary" :disabled="disabled" @click="handleReset">恢复默认设置</el-button>
                </div>
            </el-col>
            <el-col :span='12' class="right-block">
                <index-param ref="indexParamRef" :operateType="operateType" :createType="createType" :dialogItem="dialogItem" :disabled="disabled" @updateIndexPara="updateIndexPara"></index-param>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px; text-align:center;">
            <el-input :disabled="disabled || !!ruleForm.sceneId" :clearable="!(disabled || !!ruleForm.sceneId)" style="margin-right: 5px;" size="small" v-model="ruleForm.sceneName" placeholder="请输入场景名称" class="custom-width"></el-input>
            <el-input :disabled="disabled" :clearable="!disabled" style="margin-right: 5px;" size="small" v-model="ruleForm.sceneComnt" placeholder="请输入场景说明" class="custom-width"></el-input>
            <el-button size="small" type="primary" :disabled="disabled" @click="saveSceneConfig">保存场景</el-button>
        </el-row>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import indexParam from './indexParamNew';
import {correlationIndexColumns, accountTotalTypeOptions, accountTotalFrepOptions, defaultConfig, checkbox} from './constants';
export default {
    components: {SCard, indexParam},
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
            defaultConfig,
            checkbox,
            accountTotalTypeOptions,
            accountTotalFrepOptions,
            correlationIndexColumns,
            loading: false,
            checkedList: ['1', '2', '3', '4'],
            ruleForm: {
                sceneType: '', // 场景类型
                isDel: '1', // 可以删除
                sceneId: '', // 场景id
                sceneComnt: '', // 场景说明
                sceneName: '', // 场景名称
                acctBargainQtty: '', // 账户成交量
                acctBillCnt: '', // 账户报单量
                acctMakePosQtty: '', // 账户持仓量
                statAcctCnt: '', // 统计账户数
                statAcctType: '', // 统计账户类型
                indexPara: '' // 指数内容
            },
            tableData: [],
            rules: {}
        };
    },
    methods: {
        updateIndexPara(val) {
            this.ruleForm.indexPara = val;
        },
        handleCheckedChange() {
            this.$refs['ruleForm'].validateField('acctMakePosQtty');
            this.$refs['ruleForm'].validateField('acctBargainQtty');
            this.$refs['ruleForm'].validateField('acctBillCnt');
            this.$refs['ruleForm'].validateField('statAcctCnt');
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
                    callback(new Error('统计账户数只能输入正整数'));
                }
                break;
            }
            callback();
        },
        setRuleForm() {
            this.ruleForm = {
                isDel: String(this.dialogItem.isDel) === '0' ? '0' : '1',
                sceneType: this.createType,
                sceneId: this.dialogItem.sceneId || '',
                sceneComnt: this.dialogItem.sceneComnt || '', // 场景说明
                sceneName: this.dialogItem.sceneName || '', // 场景名称
                acctBargainQtty: this.dialogItem.sceneId ? this.dialogItem.acctBargainQtty : this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.dialogItem.sceneId ? this.dialogItem.acctBillCnt : this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.dialogItem.sceneId ? this.dialogItem.acctMakePosQtty : this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.dialogItem.sceneId ? this.dialogItem.statAcctCnt : this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.dialogItem.sceneId ? this.dialogItem.statAcctType : this.defaultConfig.statAcctType, // 统计账户类型
                indexPara: this.dialogItem.sceneId ? this.dialogItem.indexPara : this.defaultConfig.indexPara[this.createType] // 统计频度
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
                sceneId: this.ruleForm.sceneId || '',
                sceneComnt: this.ruleForm.sceneComnt, // 场景说明
                sceneName: this.ruleForm.sceneName, // 场景名称
                acctBargainQtty: this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.defaultConfig.statAcctType, // 统计账户类型
                indexPara: this.defaultConfig.indexPara[this.createType] // 语法
            };
            this.tableData = JSON.parse(JSON.stringify(this.defaultConfig.tableData)); // 指标列表
        },
        saveSceneConfig() {
            if (!this.ruleForm.sceneName) {
                this.$message.error('请输入场景名称');
                return;
            }
            if (!this.ruleForm.sceneComnt) {
                this.$message.error('请输入场景说明');
                return;
            }
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.$refs['indexParamRef'].syntaxCheck(() => { // 语法校验
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
                    });
                }
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
            margin-top: 1px;
            padding-left: 58px;
            font-size: 12px;
            color: rgb(239, 156, 0);
        }
        .el-table {
            background: #07182e;
            border: none;
            /deep/ tr {
                background: #07182e !important;
                border: none;
            }
            /deep/ td {
                border-color: #202a33;
            }
        }
        .button-group {
            text-align: center;
            padding: 10px 0;
            button {
                width: 70px;
            }
        }
        .textarea-css {
            /deep/ .el-textarea__inner {
                background-color: #07182e;
                color: #fff;
                border: none;
            }
        }
        .right-block {
            /deep/ .el-card__body {
                padding: 0;
            }
        }
    }
</style>
