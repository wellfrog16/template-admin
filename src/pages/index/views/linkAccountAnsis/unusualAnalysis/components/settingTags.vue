<template>
    <div>
        <div style="overflow: auto; max-height: 120px;" :class="{'show-border-css': showBorder}">
            <!-- <el-row style="line-height: 32px;">
                <el-col :span="3">标签库：</el-col>
                <el-col :span="21">
                    <el-checkbox-group v-model="selectTags">
                        <el-checkbox v-for="(item, index) in tagsOptions" :key="index" :label="item">{{ item }}</el-checkbox>
                    </el-checkbox-group>
                </el-col>
            </el-row> -->
            <el-row style="line-height: 32px;">
                <el-col :span="4" style="width: 140px;">新增{{ labelText }}：</el-col>
                <el-col :span="20">
                    <el-form :model="addTagForm" label-width="130px;" :inline="true">
                        <el-form-item label="标签类型" v-if="showTagType">
                            <el-select v-model="addTagForm.tagType" size="small" style="width: 150px;">
                                <el-option v-for="(item, index) in tagTypes" :key="index" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="标签名称">
                            <el-input
                                style="width: 150px;"
                                v-model="addTagForm.tagName"
                                ref="saveTagInput"
                                size="small"
                            >
                            </el-input>
                            <el-button size="small" type="primary" @click="handleInputTag" style="margin-left: 5px;">新增标签</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
        <div v-show="selectTags.length" style="overflow: auto; max-height: 120px; " :class="{'show-border-css': showBorder}">
            <el-row>
                <el-col :span="4" style="width: 140px;">已选{{ labelText }}：</el-col>
                <el-col :span="20" v-if="selectTags && selectTags.length">
                    <el-tag v-for="(item, index) in selectTags" :key="index" closable
                            @close="handleCloseTag(item)" type="warning" style="margin-left: 5px;">{{ item.tagName }}</el-tag>
                </el-col>
            </el-row>
        </div>
        <div style="text-align: center; margin-top: 20px;">
            <el-button size="small" type="primary" @click="handleConfirmSelectTags">确定</el-button>
            <el-button size="small" @click="handleCancelSelectTags">取消</el-button>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            selectTags: [],
            tagsOptions: ['企稳', '上市', '调降', '增长', '下跌'],
            inputTag: '',
            addTagForm: {
                tagName: '',
                tagType: ''
            },
            tagTypes: [
                {value: '0', label: '内因'},
                {value: '1', label: '外因'},
            ],
        };
    },
    props: {
        labelText: {
            type: String,
            default: '标签'
        },
        propsSelectTags: {
            type: String,
            default() {
                return '';
            }
        },
        showBorder: {
            type: Boolean,
            default: true
        },
        showTagType: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        propsSelectTags(val) {
            if (val) {
                this.selectTags = JSON.parse(JSON.stringify(val.split(',')));
            }
        }
    },
    methods: {
        handleInputTag() {
            if (!this.addTagForm.tagName.trim()) {
                this.$message.error('请输入自定义标签');
                return;
            }
            if (this.selectTags.indexOf(this.addTagForm.tagName.trim()) > -1) {
                this.$message.error('已存在相同标签');
                return;
            }
            this.selectTags.push({tagName: this.addTagForm.tagName, tagType: this.addTagForm.tagType});
        },
        handleCloseTag(item) {
            this.selectTags.splice(this.selectTags.indexOf(item), 1);
        },
        handleConfirmSelectTags() {
            let emitValue = JSON.parse(JSON.stringify(this.selectTags));
            this.$emit('handleConfirmSelectTags', emitValue);
        },
        handleCancelSelectTags() {
            let emitValue = JSON.parse(JSON.stringify(this.selectTags));
            this.selectTags = [];
            this.addTagForm = {tagName: '', tagType: ''};
            this.$emit('handleCancelSelectTags', emitValue);
        },
        clearForm() {
            this.selectTags = [];
            this.addTagForm = {tagName: '', tagType: ''};
        }
    },
    mounted() {
        if (this.propsSelectTags) {
            this.selectTags = JSON.parse(JSON.stringify(this.propsSelectTags.split(',')));
        }
    }
};
</script>
<style lang="less" scoped>
    .show-border-css {
        margin-top: 10px;
        border: 1px dashed #ccc;
        padding: 15px;
    }
</style>
