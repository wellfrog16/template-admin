<template>
    <div>
        <div style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 15px;">
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
                    <el-input clearable size="small" style="width: 350px;" v-model="inputTag" @keyup.enter.native="handleInputTag"></el-input>
                    <el-button size="mini" type="primary" style="margin-left: 5px;" @click="handleInputTag">确定</el-button>
                </el-col>
            </el-row>
        </div>
        <div v-show="selectTags.length" style="margin-top: 10px; overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 15px;">
            <el-row>
                <el-col :span="4" style="width: 140px;">已选{{ labelText }}：</el-col>
                <el-col :span="20" v-if="selectTags && selectTags.length">
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
            tagsOptions: ['企稳', '上市', '调降', '增长', '下跌'],
            inputTag: '',
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
            let emitValue = JSON.parse(JSON.stringify(this.selectTags));
            this.$emit('handleConfirmSelectTags', emitValue);
        },
        handleCancelSelectTags() {
            let emitValue = JSON.parse(JSON.stringify(this.selectTags));
            this.selectTags = [];
            this.inputTag = '';
            this.$emit('handleCancelSelectTags', emitValue);
        },
        clearForm() {
            this.selectTags = [];
            this.inputTag = '';
        }
    },
    mounted() {
        if (this.propsSelectTags) {
            this.selectTags = JSON.parse(JSON.stringify(this.propsSelectTags.split(',')));
        }
    }
};
</script>
