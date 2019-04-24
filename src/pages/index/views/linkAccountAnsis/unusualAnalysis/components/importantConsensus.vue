<template>
    <div class="important-consensus">
        <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="120px" :inline="true">
            <el-row style="text-align: right; height: 40px; margin-top: 5px;">
                <el-form-item prop="category">
                    <el-input size="small" v-model="searchForm.searchText" placeholder="请输入搜索主题词" class="custom-width"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch">搜 索</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <s-table :columns="importantConsensusColumns" :tableData="tableData" :height="200" @handlerChange="handleCellClick">
            <el-table-column
                :width="350"
                align="center"
                slot="tableColumnsPush"
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span type="text" @click="handleFocus(scope.row)" style="cursor: pointer;">
                        <i class="fa fa-heart" :class="{'focus': scope.row.focus}"><span style="user-select: none;">关注&nbsp;&nbsp;</span></i>
                    </span>
                    <el-button type="primary" size="mini" @click="handleMonitor(scope.row)">监控</el-button>
                    <el-button type="primary" size="mini" @click="handleThemeAnalysis(scope.row)">主题分析</el-button>
                    <el-button type="warning" size="mini" @click="modifyKeyword(scope.row)">修改关键词</el-button>
                </template>
            </el-table-column>
        </s-table>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible="showDialog" @close="showDialog = false">
            <el-form ref="searchForm" :model="ruleForm" :rules="rules" label-width="120px">
                <el-form-item prop="keyword" label="修改关键词：">
                    <el-input size="small" style="width: 350px;" v-model="ruleForm.keyword"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button size="small" type="primary" @click="handleModifyKeywordConfirm">确定</el-button>
                <el-button size="small" @click="showDialog=false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="currentItem.title" :close-on-click-modal="false" :close-on-press-escape="false" :visible="settingTagsDialog" @close="settingTagsDialog = false" width="85%">
            <div style="height: 340px; overflow: auto;">
                <h3>银河证券：期货公司将迎来A股IPO开闸 利好期货概念股</h3>
                <p>
                    证券时报e公司讯，证监会副主席方星海21日表示，要加大政策支持力度，加大推进符合条件期货公司在A股上市。他还表示，积极推动股指期货在内对外开放；期货法立法工作在推进，积极推动外商控股期货公司设立。对此，银河证券点评称：随着期指放开，更多的金融衍生品会纷至沓来，中国的资本市场会越来越越国际化。更重要的是，期货公司在等待四年后，要迎来A股IPO开闸了，这对期货概念股无疑是个大利好。
                </p>
            </div>
            <div style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 5px;">
                <el-row style="line-height: 32px;">
                    <el-col :span="3">标签库：</el-col>
                    <el-col :span="21">
                        <el-checkbox-group v-model="selectTags">
                            <el-checkbox v-for="(item, index) in tagsOptions" :key="index" :label="item">{{ item }}</el-checkbox>
                        </el-checkbox-group>
                    </el-col>
                </el-row>
                <el-row style="line-height: 32px;">
                    <el-col :span="3">自定义标签：</el-col>
                    <el-col :span="21">
                        <el-input size="small" style="width: 180px;" v-model="inputTag" @key.enter.native="handleInputTag"></el-input>
                        <el-button size="small" type="primary" style="margin-left: 5px;" @click="handleInputTag">确定</el-button>
                    </el-col>
                </el-row>
            </div>
            <div v-show="selectTags.length" style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 5px;">
                <el-row>
                    <el-col :span="3">已选标签：</el-col>
                    <el-col :span="21">
                        <el-tag v-for="(item, index) in selectTags" :key="index" type="warning" style="margin-left: 5px;">{{ item }}</el-tag>
                    </el-col>
                </el-row>
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <el-button size="small" type="primary" @click="handleConfirmSelectTags">确定</el-button>
                <el-button size="small" @click="settingTagsDialog=false">取消</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import {importantConsensusColumns} from './constants';
export default {
    components: {STable},
    data() {
        return {
            importantConsensusColumns,
            searchForm: {
                searchText: ''
            },
            ruleForm: {keyword: ''},
            currentId: '',
            rules: {},
            showDialog: false,
            tableData: [
                {id: 0, title: '舆情1', count: 11, analysis: '正面', keyword: '上升', tags: [], source: '万德', focus: true},
                {id: 1, title: '舆情2', count: 11, analysis: '正面', keyword: '增长', tags: [], source: '财经', focus: false},
                {id: 2, title: '舆情3', count: 11, analysis: '负面', keyword: '矮冬瓜', tags: [], source: '万德', focus: true},
                {id: 3, title: '舆情4', count: 11, analysis: '中性', keyword: '法尔', tags: [], source: '万德', focus: true},
                {id: 4, title: '舆情5', count: 11, analysis: '中性', keyword: '阿飞', tags: [], source: '万德', focus: true},
                {id: 5, title: '舆情6', count: 11, analysis: '中性', keyword: '如果', tags: [], source: '万德', focus: true},
                {id: 6, title: '舆情7', count: 11, analysis: '中性', keyword: '文网文', tags: [], source: '万德', focus: true},
            ],
            settingTagsDialog: false,
            selectTags: [],
            tagsOptions: ['高', '帅', '瘦'],
            currentItem: {},
            inputTag: ''
        };
    },
    methods: {
        handleSearch() {

        },
        handleFocus(row) {
            row.focus = !row.focus;
        },
        handleMonitor() {

        },
        handleThemeAnalysis() {

        },
        modifyKeyword(row) {
            this.showDialog = true;
            this.ruleForm.keyword = row.keyword;
            this.currentId = row.id;
        },
        handleModifyKeywordConfirm() {
            if (!this.ruleForm.keyword) {
                this.$message.error('请输入关键词');
                return;
            }
            this.tableData.forEach(v => {
                if (v.id === this.currentId) {
                    v.keyword = this.ruleForm.keyword;
                }
            });
            this.showDialog = false;
        },
        handleCellClick(item) {
            this.settingTagsDialog = true;
            this.currentItem = item.row;
            this.selectTags = this.currentItem.tags;
        },
        handleConfirmSelectTags() {
            this.tableData.forEach(v => {
                if (v.id === this.currentItem.id) {
                    v.tags = this.selectTags;
                }
            });
            this.settingTagsDialog = false;
        },
        handleInputTag() {
            if (!this.inputTag.trim()) {
                this.$message.error('请输入自定义标签');
                return;
            }
            if (this.selectTags.indexOf(this.inputTag.trim()) > -1) {
                this.$message.error('已存在相同标签');
                return;
            }
            this.selectTags.push(this.inputTag);
        }
    },
};
</script>
<style lang="less" scoped>
    .important-consensus {
        .focus {
            color: #f95858;
            cursor: pointer;
        }
    }
</style>
