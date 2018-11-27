<template>
    <div class="index-param-commponent">
        <s-card :title="`相关性指标选择`">
            <el-row slot="content" :gutter="20">
                <el-col :span="11">
                    <s-table :showHeader="false" :columns="correlationIndexColumns" :tableData="tableData" :height="200" :otherProps="{unit: '%', disabled: disabled}">
                        <el-table-column
                            :width="100"
                            align="center"
                            slot="tableColumnsPush"
                            label="操作"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="handleInsert(scope.row)" :disabled="disabled">插入</el-button>
                            </template>
                        </el-table-column>
                    </s-table>
                </el-col>
                <el-col :span="2">
                    <div class="button-group">
                        <el-button @click="insertText(' AND ')" :disabled="disabled" size="mini" type="primary">AND</el-button><br>
                        <el-button @click="insertText(' OR ')"  :disabled="disabled" size="mini" type="primary">OR</el-button><br>
                        <el-button @click="insertText('()')"  :disabled="disabled" size="mini" type="primary">(...)</el-button>
                    </div>
                </el-col>
                <el-col :span="11">
                    <div class="textarea-css">
                        <el-input :rows="8" type="textarea" placeholder="示例：买入成交相关系数>=90% AND 卖出成交相关系数>90%" :readonly="disabled" id="textarea" v-model="ruleForm.indexPara"></el-input>
                    </div>
                </el-col>
            </el-row>
        </s-card>
        <div style="margin-top:8px; text-align:right;">
            <el-button size="small" type="primary" :disabled="disabled" @click="syntaxCheck">语法检查</el-button>
        </div>
    </div>
</template>

<script>
import {correlationIndexColumns, defaultConfig} from './constants';
import STable from '@/components/index/common/STable';
import SCard from '@/components/index/common/SCard';
import {getTlsIndexTlb, checkSql} from '@/api/dataAnsis/sceneConfig';
export default {
    components: {STable, SCard},
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
        },
        disalbed: {
            type: Boolean,
            default: false
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
            correlationIndexColumns,
            defaultConfig,
            tableData: [],
            ruleForm: {
                indexPara: ''
            }
        };
    },
    methods: {
        handleInsert(item) {
            let str = `${item.a} ${item.b} ${item.c}%`;
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
                sceneType: this.dialogItem.sceneType || this.createType,
                sceneId: this.dialogItem.sceneId || '',
                sceneComnt: this.dialogItem.sceneComnt || '', // 场景说明
                sceneName: this.dialogItem.sceneName || '', // 场景名称
                indexPara: this.dialogItem.indexPara || this.defaultConfig.indexPara // 统计频度
            };
        },
        handleReset() {
            this.ruleForm = {
                isDel: '1',
                sceneType: this.createType,
                sceneId: this.defaultConfig.sceneId || '',
                sceneComnt: this.defaultConfig.sceneComnt, // 场景说明
                sceneName: this.defaultConfig.sceneName, // 场景名称
                indexPara: this.defaultConfig.indexPara
            };
        },
        syntaxCheck(callback) {
            checkSql(this.ruleForm.indexPara).then(resp => {
                if (resp) {
                    callback && callback();
                } else {
                    this.$message.error('请插入正确的指标');
                }
            });
        },
        getTlsIndexTlb() {
            console.log(this.ruleForm.sceneType);
            getTlsIndexTlb(String(this.ruleForm.sceneType)).then(resp => {
                let data = resp.map(v => {
                    return {
                        indexName: v.indexName,
                        indexValue: 90,
                        indexCon: '>='
                    };
                });
                this.tableData = data;
            });
        }
    },
    mounted() {
        this.setRuleForm();
        this.getTlsIndexTlb();
    }
};
</script>

<style lang="less" scoped>
    .index-param-commponent {
        .button-group {
            text-align: center;
            padding: 10px 0;
            button {
                width: 70px;
                margin-top: 20px;
            }
        }
        .textarea-css {
            /deep/ .el-textarea__inner {
                background-color: #07182e;
                color: #fff;
                border: none;
            }
        }
    }
</style>
I