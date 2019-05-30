<template>
    <div class="common-index-setting">
        <el-row :gutter="10">
            <el-col :span="10">
                <s-table style="width:100%;" :loading="loading" header-row-class-name="table-header-css" :columns="correlationIndexColumns" :tableData="tableData[indexType]" :height="200"> <!--  :otherProps="{unit: '%'}" -->
                    <el-table-column
                        :width="100"
                        align="center"
                        slot="tableColumnsPush"
                        label="操作"
                        show-overflow-tooltip>
                        <template slot-scope="scope">
                            <el-button type="primary" size="mini" @click="handleInsert(scope.row)">插入</el-button>
                        </template>
                    </el-table-column>
                </s-table>
            </el-col>
            <el-col :span="4">
                <div class="button-group">
                    <el-button @click="insertText(' AND ')" size="mini" type="primary" style="margin-bottom: 10px;">AND</el-button>
                    <br>
                    <el-button @click="insertText(' OR ')"  size="mini" type="primary" style="margin-bottom: 10px;">OR</el-button>
                    <br>
                    <el-button @click="insertText('()')"  size="mini" type="primary">(...)</el-button>
                </div>
            </el-col>
            <el-col :span="10">
                <div class="textarea-css">
                    <el-input :rows="7" type="textarea" :placeholder="`示例：`" :id="`textarea${indexType}`" v-model="ruleForm.indexPara"></el-input>
                </div>
                <div style="margin-top:8px; text-align:right;">
                    <el-button size="small" type="primary" :loading="loadingExport" @click="exportModel()">导出到指标模板列表</el-button>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import {correlationIndexColumns} from './constants';
import {saveTemplate} from '@/api/unusualAnalysis';
export default {
    components: {STable},
    props: {
        indexType: {
            type: [String, Number],
            default: '0'
        }
    },
    data() {
        return {
            correlationIndexColumns,
            loading: false,
            ruleForm: {
                indexPara: ''
            },
            commonTableHeader: [{indexName: '指标名称', indexCon: '条件', indexValue: '值'}],
            tableData: [
                [ // 内因指标
                    {indexName: '成交量', indexCon: '>=', indexValue: '90'},
                    {indexName: '成交价', indexCon: '>=', indexValue: '90'},
                    // {indexName: '卖出成交', indexCon: '>=', indexValue: '90'},
                    // {indexName: '净买入成交', indexCon: '>=', indexValue: '90'},
                    // {indexName: '多头持仓', indexCon: '>=', indexValue: '90'},
                    // {indexName: '空头持仓', indexCon: '>=', indexValue: '90'},
                    // {indexName: '浮动盈亏', indexCon: '>=', indexValue: '90'},
                    // {indexName: '买入报单', indexCon: '>=', indexValue: '90'},
                    // {indexName: '卖出报单', indexCon: '>=', indexValue: '90'},
                    // {indexName: '报单次数', indexCon: '>=', indexValue: '90'},
                    // {indexName: '报单速度', indexCon: '>=', indexValue: '90'},
                    // {indexName: '撤单次数', indexCon: '>=', indexValue: '90'},
                    // {indexName: '撤单率', indexCon: '>=', indexValue: '90'},
                ],
                // [ // 重要舆情
                //     {indexName: '报道量', indexCon: '>=', indexValue: '90'},
                //     {indexName: '评论量', indexCon: '>=', indexValue: '90'},
                //     {indexName: '转载量', indexCon: '>=', indexValue: '90'},
                // ],
                // [ // 舆情热度
                //     {indexName: '搜索量', indexCon: '>=', indexValue: '90'},
                //     {indexName: '评论量', indexCon: '>=', indexValue: '90'},
                // ],
                // [ // 热词趋势
                //     {indexName: '主题词模型', indexCon: '>=', indexValue: '90'},
                // ],
                [ // 情感走势
                    {indexName: '正面', indexCon: '>=', indexValue: '90'},
                    {indexName: '中性', indexCon: '>=', indexValue: '90'},
                    {indexName: '负面', indexCon: '>=', indexValue: '90'},
                ]
            ],
            loadingExport: false,
        };
    },
    methods: {
        exportModel() {
            this.$prompt('请输入模板名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^[a-zA-Z0-9\u4E00-\u9FA5]{1,15}$/,
                inputErrorMessage: '只能输入字母、汉字或数字'
            }).then(({value}) => {
                let params = {
                    templName: value,
                    moduleType: this.indexType,
                    idtfyIndex: this.ruleForm.indexPara
                };
                this.loadingExport = true;
                saveTemplate(params).then(resp => {
                    this.loadingExport = false;
                    this.$emit('updateModelList');
                }).catch(e => {
                    this.loadingExport = false;
                    console.error(e);
                });
            }).catch(() => {
                // 取消输入
            });
        },
        handleInsert(item) {
            let str = `${item.indexName} ${item.indexCon} ${item.indexValue}`;
            this.insertText(str);
        },
        insertText(str, obj) {
            obj = obj || document.getElementById(`textarea${this.indexType}`);
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
            obj = obj || document.getElementById(`textarea${this.indexType}`);
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
    }
};
</script>

<style lang="less" scoped>
    .common-index-setting {
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
        /deep/ table.el-table__body {
            width: 100% !important;
        }
        /deep/ .el-table__empty-block {
            width: 100% !important;
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
    }
</style>