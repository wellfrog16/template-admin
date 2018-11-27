<!--上传附件公共组件（1.选择文件--2.上传到服务器）-->
<!--@ params
    * uploadParams: 上传文件附加参数。 type: Object
    * actionUrl: 上传地址，公共方法参考utils/global/gfnFileSteamUtil.js。type: String
    * limitFileType: 限制上传文件类型。type: Array  小写字母['txt', 'csv']
    * limit: 最大上传条目。type: Number
    * multiple: 是否支持文件多选，按ctrl 或 shift。 type: Boolean
    * disabled: 是否禁用。 type: Boolean
    * selectFileButtonText: 选择按钮文案。 type: String
    * isShowSuccessMessage: 是否显示success的message信息。 type: Boolean
-->
<!-- 校验类型(verifies对应fields)
    * 1、STOCK_CODE_A: A股证券代码
    * 2、STOCK_CODE_HK: 港股证券代码
    * 3、STOCK_CODE_SH: 沪股证券代码
    * 4、ACCOUNT_CODE: 账户代码
    * 5、YMT_CODE: 一码通代码
    * 6、D_CODE: 身份证号
-->
<template>
    <div class="upload-file-to-server">
        <el-form>
            <el-form-item prop="name" style="margin-bottom: 0;">
                <el-upload
                    ref="upload"
                    :name="uploadName"
                    :action="actionUrl"
                    :limit="limit"
                    :multiple="multiple"
                    :on-exceed="handleOnExceed"
                    :on-change="handleChange"
                    :on-success="handleUploadSuccess"
                    :on-error="handleError"
                    :on-remove="handleRemove"
                    :auto-upload="autoUploadMode"
                    :file-list="fileList"
                    :disabled="disabled"
                    :data="uploadParams"
                    :show-file-list="true">
                    <el-button slot="trigger"
                               type="primary"
                               :disabled="disabled"
                               size="small">{{ selectFileButtonText }}
                    </el-button>
                    <el-button v-if="showSubmitUploadBtn" style="margin-left: 20px;"
                               type="success" size="small" :disabled="disabled"
                               @click="submitUpload">上传到服务器
                    </el-button>
                    <slot name="slotbutton"></slot>
                </el-upload>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            fileList: []
        };
    },
    props: {
        uploadParams: {
            type: Object,
            default() {
                return {
                    bodyParams: JSON.stringify({})
                };
            }
        },
        actionUrl: {
            type: String,
            default: ''
        },
        multiple: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 1
        },
        noLimitFileType: {
            type: Boolean,
            default: false
        },
        limitFileType: {
            type: Array,
            default() {
                return ['csv'];
            }
        },
        disabled: {
            type: Boolean,
            default() {
                return false;
            }
        },
        selectFileButtonText: {
            type: String,
            default: '选择附件'
        },
        isShowSuccessMessage: {
            type: Boolean,
            default: false
        },
        showSubmitUploadBtn: {
            type: Boolean,
            default: true
        },
        uploadName: {
            type: String,
            default: 'file'
        },
        fileListProps: {
            type: Array,
            default() {
                return [];
            }
        },
        autoUploadMode: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        fileListProps: {
            deep: true,
            handler(val) {
                this.fileList = val;
            }
        }
    },
    methods: {
        handleOnExceed(files, filelist) {
            this.$message.error(`超出最大上传文件数目：${this.limit}`);
        },
        handleChange(file, fileList) {
            this.$emit('currentFileList', fileList);
            if (this.noLimitFileType) {
                return;
            }
            for (let i = 0; i < this.limitFileType.length; i++) {
                if (file.name.split('.')[1].toLowerCase() === (this.limitFileType[i]).toLowerCase()) {
                    return;
                }
            }
            /* 去除不合法文件 */
            this.$nextTick(() => {
                this.fileList = fileList.filter(v => {
                    return this.limitFileType.indexOf(v.name.split('.')[1].toLowerCase()) > -1;
                });
            });
            this.$message.error(`上传文件类型只能为${this.limitFileType.join('、')}文件`);
        },
        handleUploadSuccess(res, file, fileList) {
            if (res.value === true) {
                this.$emit('getTxtCon', [file], true);
                return;
            }
            const {success, value, message} = res;
            if (success) {
                this.$emit('getTxtCon', value.data, success);
                if (this.isShowSuccessMessage) {
                    this.$message.success(`共计上传${value.totalLines}条，成功${value.totalLines - value.invalidLines}条，无效${value.invalidLines}条`);
                }
                // this.$refs.upload.clearFiles()
            } else {
                this.$message.error(message || '上传失败');
            }
        },
        handleError(err) {
            if (err.toString().indexOf('数据格式') > -1) {
                this.$message.error('请检查上传文件内容格式是否正确');
            } else {
                this.$message.error(`${JSON.parse(err.message).message}`);
            }
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
            if (!fileList.length) {
                this.$emit('getTxtCon', [], false);
            }
        },
        submitUpload() {
            this.$refs.upload.submit();
        }
    }
};
</script>
<style lang="less" scoped>
    .upload-file-to-server {
        .el-form {
            padding: 0 10px 0;
        }
    }
</style>
