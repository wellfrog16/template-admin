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
                        <el-form-item label-width="140px" prop="statFreq" label="统计频度" style="padding-left:23px; margin-bottom: 30px;">
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
                <s-card :title="`相关性指标选择`">
                    <el-row slot="content">
                        <s-table :showHeader="false" :columns="correlationIndexColumns" :tableData="tableData" :height="200" :otherProps="{unit: '%', disabled: disabled}">
                            <el-table-column
                                :width="100"
                                align="center"
                                slot="tableColumnsPush"
                                label="操作"
                                show-overflow-tooltip>
                                <template slot-scope="scope">
                                    <el-button type="primary" size="small" @click="handleInsert(scope.row)" :disabled="disabled">插入</el-button>
                                </template>
                            </el-table-column>
                        </s-table>
                    </el-row>
                </s-card>
                <div class="button-group">
                    <el-button @click="insertText(' AND ')" :disabled="disabled" size="mini" type="primary">AND</el-button>
                    <el-button @click="insertText(' OR ')"  :disabled="disabled" size="mini" type="primary">OR</el-button>
                    <el-button @click="insertText('()')"  :disabled="disabled" size="mini" type="primary">(...)</el-button>
                </div>
                <div class="textarea-css">
                    <el-input :rows="4" type="textarea" placeholder="示例：买入成交相关系数>=90% AND 卖出成交相关系数>90%" :readonly="disabled" id="textarea" v-model="ruleForm.indexPara"></el-input>
                </div>
                <div style="margin-top:8px; text-align:right;">
                    <el-button size="small" type="primary" :disabled="disabled" @click="syntaxCheck">语法检查</el-button>
                </div>
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
import STable from '@/components/index/common/STable';
import {
    getTlsIndexTlb,
    checkSql
} from '@/api/dataAnsis/sceneConfig';
import {correlationIndexColumns, accountTotalTypeOptions, accountTotalFrepOptions, defaultConfig, checkbox} from './constants';
export default {
    components: {SCard, STable},
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
            debugger;
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
                statFreq: '', // 统计频度
                indexPara: '' // 指数内容
            },
            tableData: []
        };
    },
    methods: {
        handleInsert(item) {
            let str = `${item.indexName} ${item.indexCon} ${item.indexValue}%`;
            this.insertText(str);
        },
        insertText(str, obj) {
            obj = obj || document.getElementById('textarea');
            if (document.selection) {
                let sel = document.selection.createRange();
                sel.text = str;
            } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                let startPos = obj.selectionStart;
                let endPos = obj.selectionEnd;
                let cursorPos = startPos;
                let tmpStr = obj.value;
                obj.value = tmpStr.substring(0, startPos) + str + tmpStr.substring(endPos, tmpStr.length);
                this.ruleForm.indexPara = obj.value;
                cursorPos += str.length;
                obj.focus();
                obj.selectionStart = obj.selectionEnd = cursorPos;
            } else {
                obj.value += str;
                this.ruleForm.indexPara = obj.value;
            }
        },
        moveEnd(obj) {
            obj = obj || document.getElementById('textarea');
            obj.focus();
            var len = obj.value.length;
            if (document.selection) {
                var sel = obj.createTextRange();
                sel.moveStart('character', len);
                sel.collapse();
                sel.select();
            } else if (typeof obj.selectionStart === 'number' && typeof obj.selectionEnd === 'number') {
                obj.selectionStart = obj.selectionEnd = len;
            }
        },
        setRuleForm() {
            this.ruleForm = {
                isDel: '1',
                sceneType: this.createType,
                sceneId: this.dialogItem.sceneId || '',
                sceneComnt: this.dialogItem.sceneComnt || '', // 场景说明
                sceneName: this.dialogItem.sceneName || '', // 场景名称
                acctBargainQtty: this.dialogItem.sceneId ? this.dialogItem.acctBargainQtty : this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.dialogItem.sceneId ? this.dialogItem.acctBillCnt : this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.dialogItem.sceneId ? this.dialogItem.acctMakePosQtty : this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.dialogItem.sceneId ? this.dialogItem.statAcctCnt : this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.dialogItem.sceneId ? this.dialogItem.statAcctType : this.defaultConfig.statAcctType, // 统计账户类型
                statFreq: this.dialogItem.sceneId ? this.dialogItem.statFreq : this.defaultConfig.statFreq, // 统计频度
                indexPara: this.dialogItem.sceneId ? this.dialogItem.indexPara : this.defaultConfig.indexPara // 统计频度
            };
            if (this.dialogItem.sceneId) {
                let checkedList = [];
                if (this.dialogItem.acctMakePosQtty) {
                    checkedList.push('1');
                } else if (this.dialogItem.acctBargainQtty) {
                    checkedList.push('2');
                } else if (this.dialogItem.acctBillCnt) {
                    checkedList.push('3');
                } else if (this.dialogItem.statAcctCnt) {
                    checkedList.push('4');
                }
                this.checkedList = checkedList;
            } else {
                this.checkedList = this.defaultConfig.checkedList;
            }
        },
        handleReset() {
            this.ruleForm = {
                isDel: '1',
                sceneType: this.createType,
                sceneId: this.ruleForm.sceneId || '',
                sceneComnt: this.ruleForm.sceneComnt, // 场景说明
                sceneName: this.ruleForm.sceneName, // 场景名称
                acctBargainQtty: this.defaultConfig.acctBargainQtty, // 账户成交量
                acctBillCnt: this.defaultConfig.acctBillCnt, // 账户报单量
                acctMakePosQtty: this.defaultConfig.acctMakePosQtty, // 账户持仓量
                statAcctCnt: this.defaultConfig.statAcctCnt, // 统计账户数
                statAcctType: this.defaultConfig.statAcctType, // 统计账户类型
                statFreq: this.defaultConfig.statFreq, // 统计频度
                indexPara: this.defaultConfig.indexPara // 语法
            };
            this.tableData = JSON.parse(JSON.stringify(this.defaultConfig.tableData)); // 指标列表
        },
        syntaxCheck(callback) {
            checkSql(this.ruleForm.indexPara).then(resp => {
                if (resp.success) {
                    callback && callback();
                } else {
                    this.$message.error('请插入正确的指标');
                }
            });
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
        },
        getTlsIndexTlb() {
            getTlsIndexTlb(this.ruleForm.sceneType).then(resp => {
                let data = resp.map(v => {
                    return {
                        indexName: v.indexName,
                        indexValue: 90,
                        indexCon: '>='
                    };
                });
                this.tableData = data;
                this.defaultConfig.tableData = JSON.parse(JSON.stringify(data));
            });
        }
    },
    mounted() {
        this.setRuleForm();
        this.getTlsIndexTlb();
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
