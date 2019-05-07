<template>
    <div class="important-consensus">
        <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="120px" :inline="true">
            <el-row style="text-align: right; height: 40px; margin-top: 5px;">
                <el-form-item prop="category">
                    <el-input size="small" v-model="searchForm.searchText" placeholder="请输入搜索主题词" style="width: 150px;"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="small" @click="handleSearch">搜 索</el-button>
                    <el-button type="primary" size="small" @click="showKeyWordCloud">显示关键词词云</el-button>
                    <el-button type="primary" size="small" @click="exportContent">导入舆情</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <s-table :columns="importantConsensusColumns" :tableData="tableData" :height="200" @handlerChange="handleCellClick">
            <el-table-column
                :width="200"
                align="center"
                slot="tableColumnsPush"
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span type="text" @click="handleFocus(scope.row)" style="cursor: pointer;">
                        <i class="fa fa-heart" :class="{'focus': scope.row.focus}"><span style="user-select: none;">关注&nbsp;&nbsp;</span></i>
                    </span>
                    <!-- <el-button type="primary" size="mini" @click="handleMonitor(scope.row)">监控</el-button> -->
                    <!-- <el-button type="primary" size="mini" @click="handleThemeAnalysis(scope.row)">主题分析</el-button> -->
                    <el-button type="warning" size="mini" @click="modifyKeyword(scope.row)">修改关键词</el-button>
                </template>
            </el-table-column>
        </s-table>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible="showDialog" @close="showDialog = false">
            <el-form ref="searchForm" :model="ruleForm" :rules="rules" label-width="120px">
                <el-form-item prop="keyword" label="修改关键词：">
                    <el-input size="small" style="width: 350px;" v-model="ruleForm.keyword" @keyup.enter.native="handleModifyKeywordConfirm"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button size="small" type="primary" @click="handleModifyKeywordConfirm">确定</el-button>
                <el-button size="small" @click="showDialog=false">取消</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="currentItem.title" :close-on-click-modal="false" :close-on-press-escape="false" :visible="settingTagsDialog" @close="settingTagsDialog = false" width="85%">
            <div style="height: 340px; overflow: auto;">
                <h3 style="text-align: center;">银河证券：期货公司将迎来A股IPO开闸 利好期货概念股</h3>
                <p style="line-height: 20px; text-indent: 2rem;">
                    证券时报e公司讯，证监会副主席方星海21日表示，要加大政策支持力度，加大推进符合条件期货公司在A股上市。他还表示，积极推动股指期货在内对外开放；期货法立法工作在推进，积极推动外商控股期货公司设立。对此，银河证券点评称：随着期指放开，更多的金融衍生品会纷至沓来，中国的资本市场会越来越越国际化。更重要的是，期货公司在等待四年后，要迎来A股IPO开闸了，这对期货概念股无疑是个大利好。
                </p>
            </div>
            <setting-tags ref="detailSettingTagsDialog" @handleConfirmSelectTags="handleConfirmSelectTags" @handleCancelSelectTags="handleCancelSelectTags"></setting-tags>
        </el-dialog>
        <el-dialog title="导入舆情" :close-on-click-modal="false" :close-on-press-escape="false" :visible="importContentDialog" @close="importContentDialog = false" width="85%">
            <el-form ref="importContentForm" :model="importContentForm" :rules="rules" label-width="120px">
                <el-form-item prop="title" label="舆情标题：">
                    <el-input size="small" v-model="importContentForm.title" placeholder="请输入舆情标题" style="width: 350px;"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="舆情内容：">
                    <el-input rows="8" type="textarea" placeholder="请输入舆情内容" v-model="importContentForm.content"></el-input>
                </el-form-item>
            </el-form>
            <setting-tags @handleConfirmSelectTags="handleConfirmImportContent" @handleCancelSelectTags="handleCancelSelectTags"></setting-tags>
        </el-dialog>
        <el-dialog title="关键词词云" :close-on-click-modal="false" :close-on-press-escape="false" :visible="keyWordCloudDialog" @close="keyWordCloudDialog = false" width="65%">
            <word-cloud></word-cloud>
        </el-dialog>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import settingTags from './settingTags';
import wordCloud from './wordCloud';
import {importantConsensusColumns} from './constants';
export default {
    components: {STable, settingTags, wordCloud},
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
                {id: 0, title: '银河证券：期货公司将迎来A股IPO开闸 利好期货概念股', count: 4111, analysis: '正面', keyword: '开闸', tags: ['利好'], source: '万德', focus: true},
                {id: 1, title: '钢价面临下行拐点 利好逐步兑现', count: 2121, analysis: '正面', keyword: '下行拐点', tags: ['利好'], source: '财经', focus: false},
                {id: 2, title: '沪胶呈现弱势寻底格局', count: 7631, analysis: '负面', keyword: '弱势', tags: ['弱势'], source: '万德', focus: true},
                {id: 3, title: '焦炭盘面企稳 沥青等待回调', count: 987, analysis: '正面', keyword: '回调', tags: ['企稳'], source: '万德', focus: true},
                {id: 4, title: '巨头纷纷调降产量背后 难掩铁矿石高位隐忧', count: 1311, analysis: '负面', keyword: '调降', tags: ['调降产量'], source: '万德', focus: true},
                {id: 5, title: '甲醇多空力量相对均衡', count: 531, analysis: '中性', keyword: '均衡', tags: ['平稳'], source: '万德', focus: true},
                {id: 6, title: '红枣期货在郑商所上市交易', count: 3311, analysis: '中性', keyword: '平稳', tags: ['上市'], source: '万德', focus: true},
            ],
            currentItem: {},
            settingTagsDialog: false,
            importContentDialog: false,
            keyWordCloudDialog: false,
            importContentForm: {
                title: '',
                content: ''
            }
        };
    },
    methods: {
        handleSearch() {

        },
        handleFocus(row) {
            row.focus = !row.focus;
            if (row.focus) {
                this.$message.success('关注成功');
            } else {
                this.$message.success('已取消关注');
            }
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
            this.$nextTick(() => {
                this.$refs['detailSettingTagsDialog'].selectTags = this.currentItem.tags;
            });
        },
        handleConfirmSelectTags(selectTags) {
            this.tableData.forEach(v => {
                if (v.id === this.currentItem.id) {
                    v.tags = selectTags;
                }
            });
            this.settingTagsDialog = false;
        },
        handleConfirmImportContent() {
            // todo commit
            this.$message.success('导入舆情成功');
            this.importContentDialog = false;
        },
        handleCancelSelectTags() {
            this.settingTagsDialog = false;
            this.importContentDialog = false;
        },
        showKeyWordCloud() {
            this.keyWordCloudDialog = true;
        },
        exportContent() {
            this.importContentDialog = true;
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
