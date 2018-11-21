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
                                        <el-input :disabled="disabled" :clearabled="!disabled" class="custom-width" size="small" v-model="ruleForm.a"></el-input>
                                        <span class="unit-css" v-if="item.unit">{{ item.unit }}</span>
                                        <el-select :disabled="disabled" :clearabled="!disabled" size="small" v-if="index === checkbox.length - 1" v-model="ruleForm.b" class="custom-width" style="margin-left:3px;">
                                            <el-option
                                                v-for="item in options"
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
                            <el-select :disabled="disabled" :clearabled="!disabled" size="small" v-model="ruleForm.cc" class="custom-width">
                                <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </s-card>
                <div style="margin-top:8px; text-align: left;">
                    <el-button size="small" type="primary">恢复默认设置</el-button>
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
                                    <el-button type="text" size="small" @click="handleInsert(scope.row)">插入</el-button>
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
                    <el-input :rows="4" type="textarea" placeholder="示例" :readonly="disabled" id="textarea" v-model="textareaContent"></el-input>
                </div>
                <div style="margin-top:8px; text-align:right;">
                    <el-button size="small" type="primary">语法检查</el-button>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin-top:10px; text-align:center;">
            <el-input style="margin-right: 5px;" size="small" v-model="sceneName" placeholder="请输入场景名称" class="custom-width"></el-input>
            <el-input style="margin-right: 5px;" size="small" v-model="sceneRemark" placeholder="请输入场景说明" class="custom-width"></el-input>
            <el-button size="small" type="primary">保存场景</el-button>
            <!-- <el-button size="small" type="primary">上一页</el-button> -->
            <!-- <el-button size="small" type="primary">下一页</el-button> -->
        </el-row>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import {correlationIndexColumns} from './constants';
export default {
    components: {SCard, STable},
    props: {
        operateType: {
            type: Number,
            required: true
        },
        dialogItem: {
            type: Object,
            default() {
                return {};
            }
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
            options: [{
                value: '0', label: '按持仓量'
            }],
            checkedList: [],
            checkbox: [
                {field: '1', label: '账户持仓量 >=', value: '0', unit: '手'},
                {field: '2', label: '账户成交量 >=', value: '1', unit: '手'},
                {field: '3', label: '账户报单数 >=', value: '2', unit: '笔'},
                {field: '4', label: '统计账户数 >=', value: '3', unit: ''}
            ],
            ruleForm: {
                a: '',
                b: '',
                cc: ''
            },
            tableData: [
                {a: '指标1', b: '>=', c: '90'}
            ],
            textareaContent: '',
            sceneName: '',
            sceneRemark: ''
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
                this.textareaContent = obj.value;
                cursorPos += str.length;
                obj.focus();
                obj.selectionStart = obj.selectionEnd = cursorPos;
            } else {
                obj.value += str;
                this.textareaContent = obj.value;
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
        }
    },
    mounted() {
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
            width: 150px;
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
            button {
                color: #0089ff;
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
