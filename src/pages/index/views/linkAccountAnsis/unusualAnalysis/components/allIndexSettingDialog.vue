<template>
    <div class="all-index-setting-dialog" v-loading="loading">
        <s-card :title="`指标模板选择`">
            <el-row slot="content">
                指标模板列表：
                <el-select size="small" v-model="selectIndexModels" multiple collapse-tags style="width: 300px;">
                    <el-option v-for="(item, index) in indexModels" :key="index" :label="item.templName" :value="item.templId">
                        <el-button style="float: left;" size="mini" type="danger" @click.stop="deleteModel(item)">删除</el-button>
                        <span style="float: right; margin-right: 20px;">{{ item.templName }}</span>
                    </el-option>
                </el-select>
                <el-button style="margin-left:15px;" type="warning" size="small" @click="handleApplyModel">应用模板</el-button>
                <el-button style="margin-left:15px;" type="primary" size="small" @click="showCreateModelBlock = !showCreateModelBlock">{{ showCreateModelBlock ? '隐藏' : '新增模板' }}<i :class=" {'el-icon-arrow-up': showCreateModelBlock,  'el-icon-arrow-down': !showCreateModelBlock}"></i></el-button>
                <div class="select-index-detail" v-if="selectIndexModelDetail.length" style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 5px;">
                    <el-tag v-for="(item, index) in selectIndexModelDetail" :key="index" type="warning" style="margin-left: 5px;">
                        {{ item.idtfyIndex }}
                    </el-tag>
                </div>
            </el-row>
        </s-card>
        <s-card :title="`${item}指标设置`" v-for="(item, index) in titleArray" :key="index" v-show="showCreateModelBlock">
            <div slot="content">
                <common-index-setting :indexType="index" @updateModelList="getIndexModelsList"></common-index-setting>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import commonIndexSetting from './commonIndexSetting';
import {queryTemplatesList, deleteTemplate} from '@/api/unusualAnalysis';
export default {
    components: {SCard, commonIndexSetting},
    props: {
        propsSelectIndexModels: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        selectIndexModelDetail() {
            return this.indexModels.filter(v => {
                return this.selectIndexModels.indexOf(v.templId) > -1;
            });
        }
    },
    data() {
        return {
            loading: false,
            selectIndexModels: [],
            indexModels: [],
            showCreateModelBlock: false,
            // titleArray: ['内因识别', '外因识别-重要舆情', '外因识别-舆情热度', '外因识别-热词走势', '外因识别-情感走势'],
            titleArray: ['内因识别', '外因识别-情感走势'],
        };
    },
    methods: {
        handleApplyModel() {
            if (!this.selectIndexModels.length) {
                this.$message.error('请先选择指标模板');
                return;
            }
            // 应用模板
            this.$message.success('指标模板应用成功！');
            this.$emit('selectModels', this.selectIndexModelDetail);
            this.$emit('closeDialog');
        },
        deleteModel(item) {
            this.$confirm(`确定删除'${item.templName}'?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.loading = true;
                    deleteTemplate(item.templId).then(() => {
                        this.loading = false;
                        this.indexModels.splice(this.indexModels.findIndex(f => { return f.templId === item.templId; }), 1);
                    }).catch(e => {
                        this.loading = false;
                        console.error(e);
                    });
                });
        },
        getIndexModelsList() {
            this.loading = true;
            queryTemplatesList().then(resp => {
                this.loading = false;
                this.indexModels = resp;
            }).catch(e => {
                console.error(e);
                this.loading = false;
            });
        }
    },
    mounted() {
        this.selectIndexModels = JSON.parse(JSON.stringify(this.propsSelectIndexModels));
        this.getIndexModelsList();
    }
};
</script>