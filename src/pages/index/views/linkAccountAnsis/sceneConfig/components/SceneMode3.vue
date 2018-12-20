<template>
    <div class="edit-scene-dialog">
        <s-card :title="`指标选择`">
            <div slot="content">
                <index-param ref="indexParamRef" :operateType="operateType" :createType="createType" :dialogItem="dialogItem" :disabled="disabled" @updateIndexPara="updateIndexPara"></index-param>
                <el-row style="margin-top:10px; text-align:center;">
                    <el-input :disabled="disabled" :clearable="!disabled" style="margin-right: 5px;" size="small" v-model="ruleForm.sceneName" placeholder="请输入场景名称" class="custom-width"></el-input>
                    <el-input :disabled="disabled" :clearable="!disabled" style="margin-right: 5px;" size="small" v-model="ruleForm.sceneComnt" placeholder="请输入场景说明" class="custom-width"></el-input>
                    <el-button size="small" type="primary" :disabled="disabled" @click="saveSceneConfig">保存场景</el-button>
                </el-row>
            </div>
        </s-card>
    </div>
</template>
<script>
import IndexParam from './IndexParam';
import SCard from '@/components/index/common/SCard';
import {checkSql} from '@/api/dataAnsis/sceneConfig';

export default {
    components: {SCard, IndexParam},
    props: {
        createType: {
            type: [Number, String],
            default: ''
        },
        operateType: {
            type: [Number, String],
            required: true
        },
        dialogItem: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    computed: {
        disabled() {
            return String(this.operateType) === '1';
        }
    },
    data() {
        return {
            ruleForm: {
                sceneType: '', // 场景类型
                isDel: '1', // 可以删除
                sceneId: '', // 场景id
                sceneComnt: '', // 场景说明
                sceneName: '', // 场景名称
                indexPara: '' // 指数内容
            }
        };
    },
    methods: {
        updateIndexPara(val) {
            this.ruleForm.indexPara = val;
        },
        syntaxCheck(callback) {
            let reg = /^[0-9]+$/;
            let flag = false;
            let tableData = this.$refs['indexParamRef'].tableData;
            tableData.forEach(v => {
                if (!reg.test(v.indexValue) || v.indexValue > 100) {
                    flag = true;
                }
            });
            if (flag) {
                this.$message.error('指标值请输入小于100的正整数');
                return;
            }
            checkSql(this.ruleForm.indexPara).then(resp => {
                if (resp.success) {
                    callback && callback();
                } else {
                    this.$message.error('请插入正确的指标');
                }
            });
        },
        saveSceneConfig() {
            if (!this.ruleForm.sceneName) {
                this.$message.error('请输入场景名称');
                return;
            }
            if (!this.ruleForm.sceneComnt) {
                this.$message.error('请输入场景说明');
                return;
            }
            // 语法校验
            this.syntaxCheck(() => {
                this.$refs['ruleForm'].validate(valid => {
                    if (valid) {
                        this.$emit('saveScene', this.ruleForm);
                    }
                });
            });
        }
    },
    mounted() {
    }
};
</script>
<style lang='less' scoped>
    .edit-scene-dialog {
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
            button {
                color: #0089ff;
            }
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
        .right-block {
            /deep/ .el-card__body {
                padding: 0;
            }
        }
        .custom-width {
            width: 180px;
        }
    }
</style>
