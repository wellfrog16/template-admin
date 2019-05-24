/* 新增舆情 */
<template>
    <div class="create-article-pag">
        <el-form ref="createArticleForm" :model="createArticleForm" :rules="rules" label-width="140px">
            <el-form-item label="时间：" prop="articleTime">
                <el-date-picker
                    clearable
                    style="width: 350px;"
                    v-model="createArticleForm.articleTime"
                    type="date"
                    size="small"
                    placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <div v-if="addKeywordsList.length" style="margin-left: 120px; line-height: 50px; margin-top: -20px;">
                <el-tag v-for="(item, index) in addKeywordsList" :key="index" size="small" type="warning" style="margin-right: 5px;" closable @close="handleCloseTag(item)" >{{ item.label }}</el-tag>
            </div>
            <el-form-item prop="title" label="舆情标题：">
                <el-input clearable size="small" v-model="createArticleForm.title" placeholder="请输入舆情标题" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item prop="newsRelaIndustry" label="舆情相关行业：">
                <el-input clearable size="small" placeholder="请输入舆情相关行业" v-model="createArticleForm.newsRelaIndustry" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item prop="newsHapp" label="舆情发生地：">
                <el-input clearable size="small" placeholder="请输入舆情发生地" v-model="createArticleForm.newsHapp" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item prop="markerNewsFirstF" label="舆情是否首次出现：">
                <el-select v-model="createArticleForm.markerNewsFirstF" size="small" clearable style="width: 350px;">
                    <el-option :value="0" label="是"></el-option>
                    <el-option :value="1" label="否"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="newsSource" label="舆情来源：">
                <el-input clearable size="small" placeholder="请输入舆情来源" v-model="createArticleForm.newsSource" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item prop="newsIvcBrf" label="舆情摘要：">
                <el-input clearable size="small" placeholder="请输入舆情摘要" v-model="createArticleForm.newsIvcBrf" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item prop="content" label="舆情内容：">
                <el-input rows="8" type="textarea" placeholder="请输入舆情内容" v-model="createArticleForm.content"></el-input>
            </el-form-item>
            <el-form-item prop="breed" label="品种：">
                <el-select clearable v-model="createArticleForm.breed" size="small" style="width: 350px;" placeholder="请选择交易品种">
                    <el-option v-for="(item, index) in categoryOptions"
                               :label="item.label"
                               :value="item.label"
                               :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="breedProsInflu" label="对品种潜在影响：">
                <el-select v-model="createArticleForm.breedProsInflu" size="small" clearable style="width: 350px;">
                    <el-option value="1" label="利多"></el-option>
                    <el-option value="-1" label="利空"></el-option>
                    <el-option value="0" label="中性"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="articleKeywordName" label="关键词：">
                <!-- 类型：<el-select size="small" style="width: 180px;" v-model="createArticleForm.articleKeywordType">
                    <el-option v-for="(item, index) in keyWordTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;&nbsp; -->
                <el-input clearable size="small" style="width: 350px;" v-model="createArticleForm.articleKeywordName" @keyup.enter.native="confirmAddArticleKeyword"></el-input>
                <!-- <el-button size="mini" type="primary" style="margin-left: 5px;" @click="confirmAddArticleKeyword">确定</el-button> -->
            </el-form-item>
            <setting-tags ref="settingTags" @handleConfirmSelectTags="handleConfirmExportArticle" @handleCancelSelectTags="handleCancelExportArticle"></setting-tags>
        </el-form>

    </div>
</template>
<script>
import settingTags from './settingTags';
import moment from 'moment';
export default {
    components: {settingTags},
    data() {
        return {
            createArticleForm: {
                articleTime: moment(new Date()).format('YYYY-MM-DD'),
                articleKeywordType: '',
                articleKeywordName: '',
                title: '',
                content: '',
                newsRelaIndustry: '', // 行业
                newsHapp: '', // 发生地
                markerNewsFirstF: '', // 是否首次出现
                newsSource: '', // 舆情来源
                newsIvcBrf: '', // 舆情摘要
                breedProsInflu: '', // 对品种潜在影响
                breed: '', // 品种
            },
            addKeywordsList: [],
            rules: {
                title: {
                    required: true,
                    message: '请输入舆情标题'
                },
                articleTime: {
                    required: true,
                    message: '请选择舆情发布时间'
                },
                newsRelaIndustry: {
                    required: true,
                    message: '请输入舆情行业'
                },
                breed: {
                    required: true,
                    message: '请选择品种'
                },
                breedProsInflu: {
                    required: true,
                    message: '请选择对品种潜在影响'
                },
                content: {
                    required: true,
                    message: '请输入舆情内容'
                },
                articleKeywordName: {
                    required: true,
                    message: '请输入关键词'
                },
            },
            categoryOptions: [
                {label: '螺纹钢', value: '0'},
                // {label: '橡胶', value: '1'},
                // {label: '黄金', value: '2'},
                // {label: '燃油', value: '3'},
            ],
        };
    },
    props: {
        keyWordTypeOptions: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        confirmAddArticleKeyword() {
            if (this.createArticleForm.articleKeywordName && this.createArticleForm.articleKeywordType) {
                this.addKeywordsList.push({
                    label: this.createArticleForm.articleKeywordName,
                    type: this.createArticleForm.articleKeywordType
                });
            }
        },
        handleConfirmExportArticle(value) {
            if (!value.length) {
                this.$message.error('请输入标签');
                return;
            }
            this.$refs['createArticleForm'].validate(valid => {
                if (valid) {
                    let emitValue = {
                        tags: value,
                        keywords: this.addKeywordsList,
                        title: this.createArticleForm.title,
                        content: this.createArticleForm.content,
                        currentTime: this.createArticleForm.articleTime,
                        newsRelaIndustry: this.createArticleForm.newsRelaIndustry,
                        newsHapp: this.createArticleForm.newsHapp,
                        markerNewsFirstF: this.createArticleForm.markerNewsFirstF,
                        newsSource: this.createArticleForm.newsSource,
                        newsIvcBrf: this.createArticleForm.newsIvcBrf,
                        breedProsInflu: this.createArticleForm.breedProsInflu,
                        breed: this.createArticleForm.breed,
                    };
                    this.resetForm();
                    console.log(emitValue);
                    this.$emit('handleConfirmExportArticle', emitValue);
                }
            });
        },
        handleCancelExportArticle(value) {
            let emitValue = {
                tags: value,
                keywords: this.addKeywordsList,
                title: this.createArticleForm.title,
                content: this.createArticleForm.content,
                currentTime: this.createArticleForm.articleTime
            };
            this.resetForm();
            this.$emit('handleCancelExportArticle', emitValue);
        },
        resetForm() {
            this.addKeywordsList = [];
            this.createArticleForm = {
                articleKeywordType: '',
                articleKeywordName: '',
                title: '',
                content: ''
            };
        },
        handleCloseTag(item) {
            this.addKeywordsList.splice(this.addKeywordsList.indexOf(item), 1);
        },
        clearForm() {
            this.$refs['settingTags'].clearForm();
        }
    }
};
</script>