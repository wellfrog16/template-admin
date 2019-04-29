<template>
    <div>
        <div style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 15px;">
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
                    <el-input size="small" style="width: 180px;" v-model="inputTag" @keyup.enter.native="handleInputTag"></el-input>
                    <el-button size="small" type="primary" style="margin-left: 5px;" @click="handleInputTag">确定</el-button>
                </el-col>
            </el-row>
        </div>
        <div v-show="selectTags.length" style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 15px;">
            <el-row>
                <el-col :span="3">已选标签：</el-col>
                <el-col :span="21">
                    <el-tag v-for="(item, index) in selectTags" :key="index" closable
                            @close="handleCloseTag(item)" type="warning" style="margin-left: 5px;">{{ item }}</el-tag>
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
            tagsOptions: ['高', '帅', '瘦'],
            inputTag: '',
        };
    },
    methods: {
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
        },
        handleCloseTag(item) {
            this.selectTags.splice(this.selectTags.indexOf(item), 1);
        },
        handleConfirmSelectTags() {
            this.$emit('handleConfirmSelectTags', this.selectTags);
        },
        handleCancelSelectTags() {
            this.$emit('handleCancelSelectTags');
        },
    }
};
</script>
