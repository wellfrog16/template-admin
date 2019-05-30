<template>
    <div class="important-consensus" v-loading="loadingTable">
        <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="120px" :inline="true">
            <el-row style="text-align: right; height: 40px; margin-top: 5px;">
                <el-form-item prop="searchText">
                    <el-input clearable size="small" v-model="searchForm.searchText" placeholder="请输入搜索主题词" style="width: 150px; margin-right: 5px;"></el-input>
                    <el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
                    <el-button type="primary" size="mini" @click="showKeyWordCloud">显示关键词词云</el-button>
                    <el-button type="primary" size="mini" @click="exportContent">导入舆情</el-button>
                </el-form-item>
            </el-row>
        </el-form>
        <s-table :columns="importantConsensusColumns" :tableData="tableData" :height="250" @handlerChange="handleCellClick">
            <el-table-column
                :width="200"
                align="center"
                slot="tableColumnsPush"
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                    <span type="text" @click="handleFocus(scope.row)" style="cursor: pointer;">
                        <i class="fa fa-heart" :class="{'focus': scope.row.concernF}"><span style="user-select: none;">关注&nbsp;&nbsp;</span></i>
                    </span>
                    <!-- <el-button type="primary" size="mini" @click="handleMonitor(scope.row)">监控</el-button> -->
                    <!-- <el-button type="primary" size="mini" @click="handleThemeAnalysis(scope.row)">主题分析</el-button> -->
                    <el-button type="warning" size="mini" @click="modifyKeyword(scope.row)">修改关键词</el-button>
                </template>
            </el-table-column>
        </s-table>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible="modifyKeywordDialog" @close="modifyKeywordDialog = false">
            <!-- <el-form ref="searchForm" :model="ruleForm" :rules="rules" label-width="120px">
                <el-form-item prop="keyword" label="修改关键词：">
                    <el-input size="small" style="width: 350px;" v-model="ruleForm.keyword" @keyup.enter.native="handleModifyKeywordConfirm"></el-input>
                </el-form-item>
            </el-form>
            <div style="text-align: right;">
                <el-button size="small" type="primary" @click="handleModifyKeywordConfirm">确定</el-button>
                <el-button size="small" @click="modifyKeywordDialog=false">取消</el-button>
            </div> -->
            <setting-tags ref="detailSettingKeywordsDialog" :propsSelectTags="currentItem.keyWord" labelText="关键词" @handleConfirmSelectTags="handleModifyKeywordConfirm" @handleCancelSelectTags="modifyKeywordDialog = false"></setting-tags>

        </el-dialog>
        <el-dialog :title="currentItem.title" :close-on-click-modal="false" :close-on-press-escape="false" :visible="settingTagsDialog" @close="settingTagsDialog = false" width="85%">
            <article-detail :currentNewsDetails="currentNewsDetails" v-loading="dialogLoading"></article-detail>
            <setting-tags ref="detailSettingTagsDialog" :propsSelectTags="currentItem.label" @handleConfirmSelectTags="handleConfirmSelectTags" @handleCancelSelectTags="handleCancelSelectTags"></setting-tags>
        </el-dialog>
        <el-dialog title="导入舆情" v-loading="exportArticleLoading" :close-on-click-modal="false" :close-on-press-escape="false" :visible="importContentDialog" @close="importContentDialog = false" width="85%">

            <create-article ref="createArticleDialog" :keyWordTypeOptions="keyWordTypeOptions" @handleConfirmExportArticle="handleConfirmExportArticle" @handleCancelExportArticle="handleCancelExportArticle"></create-article>
            <!-- <el-form ref="importContentForm" :model="importContentForm" :rules="rules" label-width="120px">
                <el-form-item prop="title" label="舆情标题：">
                    <el-input size="small" v-model="importContentForm.title" placeholder="请输入舆情标题" style="width: 350px;"></el-input>
                </el-form-item>
                <el-form-item prop="content" label="舆情内容：">
                    <el-input rows="8" type="textarea" placeholder="请输入舆情内容" v-model="importContentForm.content"></el-input>
                </el-form-item>
            </el-form>
            <setting-tags @handleConfirmSelectTags="handleConfirmImportContent" @handleCancelSelectTags="handleCancelSelectTags"></setting-tags> -->
        </el-dialog>
        <el-dialog title="关键词词云" :close-on-click-modal="false" :close-on-press-escape="false" :visible="keyWordCloudDialog" @close="keyWordCloudDialog = false" width="90%">
            <word-cloud :data="tableData"></word-cloud>
        </el-dialog>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import createArticle from './createArticle';
import settingTags from './settingTags';
import wordCloud from './wordCloud';
import articleDetail from './articleDetail';
import {importantConsensusColumns} from './constants';
import {exportArticle, getArticleDetailByArticleTitle, updateArticleItem} from '@/api/unusualAnalysis';
export default {
    components: {STable, settingTags, wordCloud, createArticle, articleDetail},
    props: {
        queryBlockData: {
            type: Object,
            default() {
                return {};
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        importantConsensusTableData: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    watch: {
        importantConsensusTableData: {
            handler(val) {
                this.tableData = JSON.parse(JSON.stringify(val));
            },
            deep: true
        },
        loading(val) {
            this.loadingTable = val;
        }
    },
    data() {
        return {
            importantConsensusColumns,
            loadingTable: false,
            dialogLoading: false,
            exportArticleLoading: false,
            keyWordTypeOptions: [
                {label: '非结构化', value: '1'},
                {label: '结构化', value: '2'},
            ],
            searchForm: {
                searchText: ''
            },
            ruleForm: {keyword: ''},
            rules: {},
            modifyKeywordDialog: false,
            tableData: [],
            currentItem: {},
            settingTagsDialog: false,
            importContentDialog: false,
            keyWordCloudDialog: false,
            importContentForm: {
                title: '',
                content: ''
            },
            currentNewsDetails: {}
        };
    },
    methods: {
        handleSearch() {
            this.searchForm.searchText.trim() && this.fetchArticleList({inputWord: this.searchForm.searchText.trim()});
        },
        handleFocus(row) {
            row.concernF = !row.concernF;
            if (row.concernF) {
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
            this.modifyKeywordDialog = true;
            this.ruleForm.keyword = row.keyWord;
            this.currentItem = row;
        },
        handleModifyKeywordConfirm(val) {
            if (!this.ruleForm.keyword) {
                this.$message.error('请输入关键词');
                return;
            }
            this.loadingTable = true;
            updateArticleItem({keyWord: val.join(','), newsid: this.currentItem.newsId}).then(resp => {
                this.$refs['detailSettingKeywordsDialog'].clearForm();
                this.loadingTable = false;
                this.modifyKeywordDialog = false;
                this.$emit('fetchArticleList');
            }).catch(e => {
                console.error(e);
                this.loadingTable = false;
            });
        },
        handleCellClick({item, row}) {
            console.log(row);
            this.loadingTable = true;
            getArticleDetailByArticleTitle({newsid: row.newsId}).then(resp => {
                this.loadingTable = false;
                if (resp) {
                    this.settingTagsDialog = true;
                    this.currentItem = row;
                    this.$nextTick(() => {
                        this.currentNewsDetails = resp[0];
                        console.log(this.currentNewsDetails);
                        this.$refs['detailSettingTagsDialog'].selectTags = this.currentItem.label ? this.currentItem.label.split(',') : [];
                    });
                }
            }).catch(e => {
                this.loadingTable = false;
            });
        },
        handleConfirmSelectTags(selectTags) {
            this.dialogLoading = true;
            updateArticleItem({lable: selectTags.map(v => { return v.tagName; }).join(','), newsid: this.currentItem.newsId}).then(resp => {
                this.$refs['detailSettingTagsDialog'].clearForm();
                this.dialogLoading = false;
                this.settingTagsDialog = false;
                this.$emit('fetchArticleList');
            }).catch(e => {
                console.error(e);
                this.dialogLoading = false;
            });
        },
        handleConfirmExportArticle(value) {
            // todo commit
            console.log(value);
            let params = {
                'newsTitle': value.title,
                'headline': '',
                'newsRelaIndustry': value.newsRelaIndustry || '',
                'breed': value.breed || '',
                'newsHapp': value.newsHapp,
                'markerNewsFirstF': value.markerNewsFirstF,
                'newsIvcBrf': value.newsIvcBrf,
                'newsText': value.content,
                'newsSource': value.newsSource,
                'breedProsInflu': value.breedProsInflu,
                'keyWord': value.keywords.join(','),
                'lable': value.tags ? value.tags.join(',') : '',
                'newsTm': value.currentTime,
                'newsRelTm': value.currentTime
            };
            this.exportArticleLoading = true;
            exportArticle(params).then(resp => {
                this.$refs['createArticleDialog'].clearForm();
                this.exportArticleLoading = false;
                this.$emit('fetchArticleList');
                this.importContentDialog = false;
            }).catch(e => {
                this.exportArticleLoading = false;
                console.error(e);
            });
        },
        handleCancelExportArticle() {
            this.importContentDialog = false;
        },
        handleCancelSelectTags() {
            this.settingTagsDialog = false;
        },
        showKeyWordCloud() {
            this.keyWordCloudDialog = true;
        },
        exportContent() {
            this.importContentDialog = true;
        },
        fetchArticleList(props, callback) {
            this.$emit('fetchArticleList', props, callback);
        }
    }
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
