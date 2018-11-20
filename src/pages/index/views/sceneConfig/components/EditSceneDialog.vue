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
                        <el-form-item label-width="140px" prop="cc" label="统计频度" style="padding-left:23px;">
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
            </el-col>
            <el-col :span='12'>
                <s-card :title="`相关性指标选择`">
                    <el-row slot="content">
                        <s-table :columns="columns" :tableData="tableData" :height="200"></s-table>
                    </el-row>
                </s-card>
                <div class="button-group">
                    <el-button @click="insertText(' AND ')" :disabled="disabled" size="mini" type="primary">AND</el-button>
                    <el-button @click="insertText(' OR ')"  :disabled="disabled" size="mini" type="primary">OR</el-button>
                    <el-button @click="insertText('()')"  :disabled="disabled" size="mini" type="primary">(...)</el-button>
                </div>
                <div class="textarea-css">
                    <el-input type="textarea" placeholder="示例" :readonly="disabled" id="textarea" v-model="textareaContent"></el-input>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
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
            columns: [
                {field: 'a', label: '指标名称'},
                {field: 'b', label: '条件'},
                {field: 'c', label: '值'},
            ],
            tableData: [
                {a: 1, b: 1, c: 2}
            ],
            textareaContent: ''
        };
    },
    methods: {
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
            color: yellow;
        }
        .el-table {
            tr {
                line-height: 20px;
                height: 20px;
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
                background-color: rgb(7, 23, 46);
                color: #fff;
            }
        }
    }
</style>
