<template>
    <div class="all-index-setting-dialog">
        <s-card :title="`指标模板选择`">
            <el-row slot="content">
                指标模板列表：
                <el-select size="small" v-model="selectIndexModels" multiple collapse-tags style="width: 300px;">
                    <el-option v-for="(item, index) in indexModels" :key="index" :label="item.label" :value="item.value">
                        <el-button style="float: left;" size="mini" type="danger" @click.stop="deleteModel(item)">删除</el-button>
                        <span style="float: right; margin-right: 20px;">{{ item.label }}</span>
                    </el-option>
                </el-select>
                <el-button style="margin-left:15px;" type="warning" size="small" @click="handleApplyModel">应用模板</el-button>
                <el-button style="margin-left:15px;" type="primary" size="small" @click="showCreateModelBlock = !showCreateModelBlock">{{ showCreateModelBlock ? '隐藏' : '新增模板' }}<i :class=" {'el-icon-arrow-up': showCreateModelBlock,  'el-icon-arrow-down': !showCreateModelBlock}"></i></el-button>
                <div class="select-index-detail" v-if="selectIndexModelDetail.length" style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 5px;">
                    <el-tag v-for="(item, index) in selectIndexModelDetail" :key="index" type="warning" style="margin-left: 5px;">
                        {{ item }}
                    </el-tag>
                </div>
            </el-row>
        </s-card>
        <s-card :title="`${item}指标设置`" v-for="(item, index) in titleArray" :key="index" v-show="showCreateModelBlock">
            <div slot="content">
                <common-index-setting :indexType="index"></common-index-setting>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import commonIndexSetting from './commonIndexSetting';
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
            return this.selectIndexModels.map(v => {
                return this.indexModels[v]['detail'];
            });
        }
    },
    data() {
        return {
            selectIndexModels: [],
            indexModels: [
                {label: '模板1', value: 0, detail: '买入量>=1000 AND 卖出量>=200'},
                {label: '模板2', value: 1, detail: '搜索量>=1000 OR 报道量>=400'},
                {label: '模板3', value: 2, detail: '情感偏离>=10'}
            ],
            showCreateModelBlock: false,
            titleArray: ['内因识别', '外因识别-重要舆情', '外因识别-舆情热度', '外因识别-热词走势', '外因识别-情感走势'],
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
            this.$confirm(`确定删除'${item.label}'?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // deleteResultById(this.deleteUrl, item.resultId).then(() => {
                    //     this.resultList.splice(this.resultList.findIndex(f => { return f.resultId === item.resultId; }), 1);
                    // });
                });
        }
    },
    mounted() {
        this.selectIndexModels = this.propsSelectIndexModels;
    }
};
</script>