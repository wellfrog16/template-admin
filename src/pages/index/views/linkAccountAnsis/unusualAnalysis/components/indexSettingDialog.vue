<template>
    <div class="index-setting-dialog">
        <s-card :title="`（${title}）指标模板选择`">
            <el-row slot="content">
                指标模板列表：
                <el-select size="small" v-model="selectIndexModel">
                    <el-option v-for="(item, index) in indexModels" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                <el-button style="margin-left:15px;" type="warning" size="small" @click="handleApplyModel">应用模板</el-button>
                <el-button style="margin-left:15px;" type="primary" size="small" @click="handleCreateNewModel">{{ showCreateModelBlock ? '隐藏' : '新增模板' }}<i :class=" {'el-icon-arrow-up': showCreateModelBlock,  'el-icon-arrow-down': !showCreateModelBlock}"></i></el-button>
            </el-row>
        </s-card>
        <div v-show="showCreateModelBlock">
            <s-card :title="`指标选择`">
                <el-row slot="content">
                    <s-table style="width:100%;" :loading="loading" header-row-class-name="table-header-css" :columns="correlationIndexColumns" :tableData="tableData[indexType]" :height="160" :otherProps="{unit: '%'}">
                        <el-table-column
                            :width="100"
                            align="center"
                            slot="tableColumnsPush"
                            label="操作"
                            show-overflow-tooltip>
                            <template slot-scope="scope">
                                <el-button type="primary" size="small" @click="handleInsert(scope.row)">插入</el-button>
                            </template>
                        </el-table-column>
                    </s-table>
                </el-row>
            </s-card>
            <div class="button-group">
                <el-button @click="insertText(' AND ')" size="mini" type="primary">AND</el-button>
                <el-button @click="insertText(' OR ')"  size="mini" type="primary">OR</el-button>
                <el-button @click="insertText('()')"  size="mini" type="primary">(...)</el-button>
            </div>
            <div class="textarea-css">
                <el-input :rows="4" type="textarea" :placeholder="`示例：`" :id="`textarea${indexType}`" v-model="ruleForm.indexPara"></el-input>
            </div>
            <div style="margin-top:8px; text-align:right;">
                <el-button size="small" type="primary" :loading="loadingExport" @click="exportModel()">导出到指标模板列表</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import SCard from '@/components/index/common/SCard';
import {correlationIndexColumns} from '../../sceneConfig/components/constants';
export default {
    components: {STable, SCard},
    props: {
        indexType: {
            type: [String, Number],
            default: '0'
        }
    },
    computed: {
        title() {
            return this.titleArray[this.indexType];
        }
    },
    data() {
        return {
            correlationIndexColumns,
            loading: false,
            ruleForm: {
                indexPara: ''
            },
            titleArray: ['内因识别', '外因识别-重要舆情', '外因识别-舆情热度', '外因识别-热词走势', '外因识别-情感走势'],
            commonTableHeader: [{indexName: '指标名称', indexCon: '条件', indexValue: '值'}],
            tableData: [
                [ // 内因指标
                    {indexName: '买入成交', indexCon: '>=', indexValue: '90'},
                    {indexName: '卖出成交', indexCon: '>=', indexValue: '90'},
                    {indexName: '净买入成交', indexCon: '>=', indexValue: '90'},
                    {indexName: '多头持仓', indexCon: '>=', indexValue: '90'},
                    {indexName: '空头持仓', indexCon: '>=', indexValue: '90'},
                    {indexName: '浮动盈亏', indexCon: '>=', indexValue: '90'},
                    {indexName: '买入报单', indexCon: '>=', indexValue: '90'},
                    {indexName: '卖出报单', indexCon: '>=', indexValue: '90'},
                    {indexName: '报单次数', indexCon: '>=', indexValue: '90'},
                    {indexName: '报单速度', indexCon: '>=', indexValue: '90'},
                    {indexName: '撤单次数', indexCon: '>=', indexValue: '90'},
                    {indexName: '撤单率', indexCon: '>=', indexValue: '90'},
                ],
                [ // 重要舆情
                    {indexName: '报道量', indexCon: '>=', indexValue: '90'},
                    {indexName: '评论量', indexCon: '>=', indexValue: '90'},
                    {indexName: '转载量', indexCon: '>=', indexValue: '90'},
                ],
                [ // 舆情热度
                    {indexName: '搜索量', indexCon: '>=', indexValue: '90'},
                    {indexName: '评论量', indexCon: '>=', indexValue: '90'},
                ],
                [ // 热词趋势
                    {indexName: '主题词模型', indexCon: '>=', indexValue: '90'},
                ],
                [ // 情感走势
                    {indexName: '情感模型', indexCon: '>=', indexValue: '90'},
                    {indexName: '情感偏离值', indexCon: '>=', indexValue: '90'},
                ]
            ],
            loadingExport: false,
            selectIndexModel: '',
            indexModels: [
                {label: '模板1', value: 0},
                {label: '模板2', value: 1},
                {label: '模板3', value: 2}
            ],
            showCreateModelBlock: false
        };
    },
    methods: {
        handleInsert(item) {
            let str = `${item.indexName} ${item.indexCon} ${item.indexValue}%`;
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
        getTlsIndexTlb() {
            // this.loading = true;
            // getTlsIndexTlb(String(this.ruleForm.sceneType)).then(resp => {
            //     this.loading = false;
            //     if (String(this.ruleForm.sceneType) === '1') {
            //         resp = resp.map(v => {
            //             return {
            //                 indexName: v.indexName,
            //                 indexValue: 90,
            //                 indexCon: '>='
            //             };
            //         });
            //     }
            //     this.tableData = resp;
            // }).catch(e => {
            //     this.loading = false;
            //     console.error(e);
            // });
        },
        handleCreateNewModel() {
            this.showCreateModelBlock = !this.showCreateModelBlock;
        },
        exportModel() {},
        handleApplyModel() {
            if (!this.selectIndexModel) {
                this.$message.error('请先选择一个指标模板');
                return;
            }
            // 应用模板
            let index = this.indexModels.findIndex(v => {
                return v.value === this.selectIndexModel;
            });
            this.$message.success(`${this.indexModels[index]['label']}应用成功！`);
            this.$emit('closeDialog');
        }
    }
};
</script>
<style lang="less" scoped>
    .index-setting-dialog {
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
I