<!--上传文件公共组件-->
<!--@ params
    * showFileList: 是否显示文件列表。
    * uploadName: 上传组件名称。 type: Sting. 有的接口为"file", 默认"uploadFile"
    * uploadParams: 上传文件附加参数。 type: Object
    * actionUrl: 上传地址，公共方法参考utils/global/gfnFileSteamUtil.js。type: String
    * limitFileType: 限制上传文件类型。type: Array  小写字母['txt', 'csv', 'xls', 'xlsx']
    * limit: 最大上传条目。type: Number
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
    <div v-loading="loading"
         class="self-upload"
         element-loading-text="上传处理中，请耐心等待..."
         element-loading-background="rgba(0,0,0,0.3)">
        <el-upload
            ref="upload"
            :class="{'hidden-css': !showButton}"
            :action="actionUrl"
            :on-progress="handleProgress"
            :on-success="handleUploadSuccess"
            :on-error="handleError"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :limit="limit"
            :on-exceed="maxFileNum"
            :auto-upload="true"
            :data="uploadParams"
            :name="uploadName"
            :disabled="uploadOption.disabledflag || disabled"
            :file-list="uploadFileList"
            :show-file-list="showFileList"
            style="display: inline-block; margin-left: 10px;">
            <el-button slot="trigger"
                       v-if="showButton"
                       :type="uploadOption.type?uploadOption.type:'info'"
                       :size="uploadOption.size"
                       :disabled="uploadOption.disabledflag || disabled">{{ uploadOption.name }}
            </el-button>
        </el-upload>
    </div>
</template>
<script>
export default {
    name: 'txt-upload',
    props: {
        actionUrl: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        uploadName: {
            type: String,
            default: 'file'
        },
        uploadParams: {
            type: Object,
            default() {
                return {
                };
            }
        },
        uploadOption: {
            type: Object,
            default: function() {
                return {name: '导入', size: 'mini'};
            }
        },
        limit: {
            type: Number,
            default: 1
        },
        limitFileSize: { // 单位M
            type: Number,
            default: 20
        },
        limitFileType: {
            type: Array,
            default() {
                return ['txt'];
            }
        },
        isShowSuccessMessage: {
            type: Boolean,
            default: false
        },
        propsFileList: {
            type: Array,
            default() {
                return [];
            }
        },
        showFileList: {
            type: Boolean,
            default: false
        },
        noLimit: { // 不限制所有（格式及大小）
            type: Boolean,
            default: false
        },
        noLimitFileSize: { // 不限制文件大小
            type: Boolean,
            default: false
        },
        noLimitFileType: { // 不限制文件类型
            type: Boolean,
            default: false
        },
        isShowLoadingMode: { // 开启loading模式，主要针对较大文件上传100%后卡顿的问题
            type: Boolean,
            default: true
        },
        showButton: {
            type: Boolean,
            default: true
        }
    },
    watch: {
        propsFileList(newValue) {
            this.uploadFileList = newValue;
        }
    },
    data() {
        return {
            uploadData: null,
            uploadFileList: [],
            loading: false
        };
    },
    methods: {
        beforeUpload(file) {
            if (this.isShowLoadingMode) {
                this.loading = true;
            }
            if (this.noLimit) {
                return true;
            }
            if (!this.noLimitFileSize && (file.size > 1024 * 1024 * this.limitFileSize)) {
                this.loading = false;
                this.$message.error(`请上传文件在${this.limitFileSize}M以内！`);
                return false;
            }
            if (this.noLimitFileType) {
                return true;
            }
            for (let i = 0; i < this.limitFileType.length; i++) {
                if (file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase() === (this.limitFileType[i]).toLowerCase()) {
                    return true;
                }
            }
            this.$message.error(`上传文件类型只能为${this.limitFileType.join('、')}文件`);
            this.loading = false;
            return false;
        },
        maxFileNum() {
            this.$message.error(`上传文件数量最大为${this.limit}`);
        },
        handleUploadSuccess(res, file, fileList) {
            // 生成函件修改附件接口特殊处理
            this.loading = false;
            if (res.value === true) {
                this.$emit('getTxtCon', res.value);
                return;
            }
            const {success, value, message} = res;
            if (success) {
                let result = value.data || value;
                this.$refs.upload.clearFiles();
                this.$emit('getTxtCon', result, value);
                if (this.isShowSuccessMessage) {
                    this.$message.success(`共计上传${value.totalLines}条，成功${value.totalLines - value.invalidLines}条，无效${value.invalidLines}条`);
                }
            } else {
                this.$message.error(message || '上传失败');
            }
        },
        handleError(err) {
            this.$message.error(JSON.parse(err.message).message || '上传失败');
            this.loading = false;
        },
        handlePreview(file) {
            this.$emit('handlePreview', file);
        },
        handleRemove(file) {
            this.$emit('handleRemove', file);
        },
        handleProgress(event) {
            // console.log(event)
        }
    },
    mounted() {
    }
};
</script>

<style lang="less" scoped>
    .self-upload {
        .hidden-css {
            /deep/.el-upload {
                display: none;
            }
        }
    }
</style>
