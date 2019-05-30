<template>
    <div class="unusual-detail" v-loading="loading">
        <el-input
            v-if="Object.keys(treeData).length"
            clearable
            size="small"
            style="width: 200px;"
            placeholder="输入关键字进行过滤"
            v-model="filterText">
        </el-input>
        <el-button v-if="Object.keys(treeData).length" size="small" type="primary" style="margin-left: 10px;" @click="createNewArticle">新增舆情</el-button>
        <el-tree
            class="my-tree-style"
            v-if="Object.keys(treeData).length"
            ref="myTree"
            :data="[treeData]"
            node-key="id"
            :props="propsOptions"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false">
            <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                    <el-button
                        v-if="node.level === 4"
                        class="self-button primary"
                        type="text"
                        size="mini"
                        @click="() => showArticleDetail(node, data)">
                        查看舆情
                    </el-button>
                    <el-button
                        v-if="node.level === 4"
                        class="self-button warning"
                        type="text"
                        size="mini"
                        @click="() => handleModify(node, data)">
                        修改关键词
                    </el-button>
                    <el-button
                        v-if="node.level !== 4"
                        class="self-button success"
                        type="text"
                        size="mini"
                        @click="() => handleAppendNode(node, data)">
                        新增子节点
                    </el-button>
                    <el-button
                        v-if="node.level === 4"
                        class="self-button notice"
                        type="text"
                        size="mini"
                        @click="() => showRulesSettingDialog(node, data)">
                        预警配置
                    </el-button>
                    <el-button
                        v-if="node.level !== 1"
                        class="self-button danger"
                        type="text"
                        size="mini"
                        @click="() => handleRemoveNode(node, data)">
                        删除节点
                    </el-button>
                </span>
            </span>
        </el-tree>

        <el-dialog :title="'新增子节点'" :close-on-click-modal="false" :close-on-press-escape="false" width="80%" :visible="createNodeDialog" @close="createNodeDialog = false">
            <div style="padding: 15px;" v-if="String(currentNodeInfo.factorLevel) === '3'">
                <el-row style="line-height: 32px;">
                    <el-col :span="3">新增关键词：</el-col>
                    <el-col :span="21">
                        类型：<el-select clearable size="small" style="width: 180px;" v-model="selectedKewWordType">
                            <el-option v-for="(item, index) in keyWordTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        名称：<el-input clearable size="small" style="width: 180px;" v-model="inputKeyword" @keyup.enter.native="handleConfirmInputKeyword"></el-input>
                        <el-button size="small" type="primary" style="margin-left: 5px;" @click="handleConfirmInputKeyword">确定</el-button>
                        <el-button size="small" style="margin-left: 5px;" @click="createNodeDialog=false">取消</el-button>
                    </el-col>
                </el-row>
            </div>
            <div v-else>
                <div style="line-height: 36px; margin-left: 35%;">当前节点名称：{{ currentNodeInfo.name }}</div>
                <div style="line-height: 36px; margin-left: 35%;">新增子节点名称：<el-input clearable size="small" v-model="createNewNodeName" style="width: 200px;"></el-input></div>
                <div slot="footer" style="text-align: center; margin-top: 20px;">
                    <el-button size="small" type="primary" style="margin-left: 5px;" @click="handleConfirmCreateNewNode">确定</el-button>
                    <el-button size="small" style="margin-left: 5px;" @click="createNodeDialog=false">取消</el-button>
                </div>
            </div>
        </el-dialog>

        <el-dialog :title="'修改关键词'" :close-on-click-modal="false" :close-on-press-escape="false" width="80%" :visible="modifyDialog" @close="modifyDialog = false">
            <div style="padding: 15px;">
                <el-row style="line-height: 32px;">
                    <el-col :span="3">修改关键词：</el-col>
                    <el-col :span="21">
                        <el-input clearable size="small" style="width: 180px;" v-model="currentNodeInfo.name" @keyup.enter.native="handleModifyKeyword"></el-input>
                        <el-button size="small" type="primary" style="margin-left: 5px;" @click="handleModifyKeyword">确定</el-button>
                    </el-col>
                </el-row>
            </div>
        </el-dialog>

        <el-dialog title="预警配置" :close-on-click-modal="false" :close-on-press-escape="false" width="80%" :visible="rulesSettingDialog" @close="rulesSettingDialog = false">
            <el-form ref="settingForm" :model="settingForm" :inline="true">
                <!-- v-if="this.currentNodeInfo.factorType && String(this.currentNodeInfo.factorType) === '1'" -->
                <el-form-item v-if="this.currentNodeInfo.factorType && String(this.currentNodeInfo.factorType) === '1'" prop="selectedSettingLongOrShortType" label="类型" label-width="140px" style="display:inline-block; padding: 5px 0;"
                              :rules="[{
                                  required: (this.currentNodeInfo.factorType && String(this.currentNodeInfo.factorType) === '1'), message: '请选择利多或利空'
                              }]">
                    <el-select clearable size="small" style="width: 150px;" v-model="settingForm.selectedSettingLongOrShortType">
                        <el-option v-for="(item, index) in longOrShortTypeOptions" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="settingRange" :label="this.currentNodeInfo.factorType && String(this.currentNodeInfo.factorType) === '1' ? '': '指标设置'" label-width="140px" style="display:inline-block; padding: 5px 0;"
                              :rules="[{
                                  validator: validateSettingRange, required: true
                              }]">
                    <el-input clearable size="small" v-model="settingForm.settingRange[0]" style="width: 150px;"></el-input>%
                    <span style="color: #fff; margin: 0 8px;">~</span>
                    <el-input clearable size="small" v-model="settingForm.settingRange[1]" style="width: 150px;"></el-input>%
                </el-form-item>
            </el-form>
            <div slot="footer" style="text-align: center;">
                <el-button size="small" type="primary" style="margin-left: 5px;" @click="handleSettingConfirm">确定</el-button>
                <el-button size="small" style="margin-left: 5px;" @click="rulesSettingDialog=false">取消</el-button>
            </div>
        </el-dialog>

        <el-dialog title="新增舆情" :close-on-click-modal="false" :close-on-press-escape="false" width="80%" :visible="createNewArticleDialog" @close="createNewArticleDialog = false">
            <create-article-in-knowledge :keyWordTypeOptions="keyWordTypeOptions" @handleConfirmExportArticle="handleConfirmExportArticle" @handleCancelExportArticle="handleCancelExportArticle"></create-article-in-knowledge>
        </el-dialog>

        <el-dialog title="舆情详情" v-loading="loading" :close-on-click-modal="false" :close-on-press-escape="false" width="80%" :visible="articleDetailDialog" @close="articleDetailDialog = false">
            <article-detail :currentNewsDetails="currentNewsDetails"></article-detail>
        </el-dialog>
    </div>
</template>
<script>
import {data} from './treeData';
import createArticleInKnowledge from './createArticle';
import articleDetail from './articleDetail';
import {createNewChildNode, deleteNodes, modifyKeywords, getSettingWarningRulesById, settingWarningRules, exportArticle, getArticleDetailByKeywords} from '@/api/unusualAnalysis';
const debounce = (function() {
    let timer = 0;
    return function(func, delay) {
        clearTimeout(timer);
        timer = setTimeout(func, delay);
    };
})();
export default {
    components: {createArticleInKnowledge, articleDetail},
    watch: {
        filterText(val) {
            debounce(() => {
                this.$refs.myTree.filter(val);
            }, 1000);
        }
    },
    props: {
        treeData: {
            type: Object,
            default() {
                return {};
            }
        },
        queryBlockData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    data() {
        return {
            data,
            loading: false,
            modifyDialog: false,
            createNodeDialog: false,
            rulesSettingDialog: false,
            articleDetail: false,
            createNewArticleDialog: false,
            articleDetailDialog: false,
            currentNodeInfo: {},
            tempCurrentNodeInfo: {}, // 临时对比使用
            createNewNodeName: '',
            inputKeyword: '',
            filterText: '',
            propsOptions: {
                label: 'name'
            },
            selectedKewWordType: '',
            keyWordTypeOptions: [
                {label: '非结构化', value: '1'},
                {label: '结构化', value: '2'},
            ],
            longOrShortTypeOptions: [
                {label: '利多设置', value: '1'},
                {label: '利空设置', value: '-1'},
            ],
            settingForm: {
                settingRange: [],
                selectedSettingLongOrShortType: ''
            },
            createArticleForm: {
                title: '',
                content: ''
            },
            currentNewsDetails: {}
        };
    },
    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data['name'] ? data['name'].indexOf(value) !== -1 : true;
        },
        validateSettingRange(rule, value, callback) {
            let reg = /^[0-9]+$/;
            if (!value.length) {
                callback(new Error('请输入设置阈值'));
            } else if (!value[0] && value[0] !== 0) {
                callback(new Error('请输入阈值最小值'));
            } else if (!value[1] && value[1] !== 0) {
                callback(new Error('请输入阈值最大值'));
            } else if (!reg.test(value[0]) || !reg.test(value[1])) {
                callback(new Error('阈值只能为整数'));
            } else if (Number(value[0]) > 100 || Number(value[1]) > 100) {
                callback(new Error('不能大于100'));
            } else if (Number(value[0]) > Number(value[1])) {
                callback(new Error('最大值必须大于最小值'));
            }
            callback();
        },
        getRulesById() {
            this.loading = true;
            getSettingWarningRulesById({factorId: this.currentNodeInfo.id}).then(resp => {
                this.loading = false;
                if (resp) {
                    const {minValue, maxValue, operateType} = resp;
                    this.settingForm = {
                        settingRange: [minValue || '', maxValue || ''],
                        selectedSettingLongOrShortType: operateType
                    };
                } else {
                    this.settingForm = {
                        settingRange: [],
                        selectedSettingLongOrShortType: ''
                    };
                }
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        handleSettingConfirm() {
            console.log(this.currentNodeInfo);
            this.$refs.settingForm.validate(valid => {
                if (valid) {
                    // commit
                    let params = {
                        factorId: this.currentNodeInfo.id,
                        factorType: this.currentNodeInfo.factorType, // 结构化、非结构化
                        minValue: this.settingForm.settingRange[0],
                        maxValue: this.settingForm.settingRange[1], // 阈值
                        operateType: String(this.currentNodeInfo.factorType) === '1' ? this.settingForm.selectedSettingLongOrShortType : '' // 多空
                    };
                    console.log(params);
                    // 提交预警设置
                    this.loading = true;
                    settingWarningRules(params).then(resp => {
                        this.loading = false;
                        this.modifyTreeConfigSuccess();
                        this.rulesSettingDialog = false;
                        this.settingForm = {
                            settingRange: [],
                            selectedSettingLongOrShortType: ''
                        };
                    }).catch(e => {
                        this.loading = false;
                        console.error(e);
                    });
                }
            });
        },
        handleConfirmExportArticle(value) {
            // todo commit
            console.log(value);
            let params = {
                'newsTitle': value.title,
                'headline': '',
                'newsRelaIndustry': '',
                'breed': this.queryBlockData.txBreed || '',
                'newsHapp': '',
                'markerNewsFirstF': '',
                'newsIvcBrf': '',
                'newsText': value.content,
                'newsSource': '',
                'breedProsInflu': '',
                'keyWord': value.keywords ? value.keywords.map(v => { return v.label; }).join(',') : '',
                'lable': value.tags ? value.tags.join(',') : '',
                'newsTm': value.currentTime,
                'newsRelTm': value.currentTime
            };
            this.loadingTable = true;
            exportArticle(params).then(resp => {
                this.loadingTable = false;
                this.createNewArticleDialog = false;
                this.modifyTreeConfigSuccess();
            }).catch(e => {
                this.loadingTable = false;
                console.error(e);
            });
        },
        handleCancelExportArticle() {
            this.createNewArticleDialog = false;
        },
        createNewArticle() {
            this.createNewArticleDialog = true;
        },
        handleModifyKeyword() {
            if (this.currentNodeInfo.name && this.currentNodeInfo.name.length < 2) {
                this.$message.error('关键词名称请至少输入两个文字');
                return;
            }
            if (this.currentNodeInfo.name && this.currentNodeInfo.name !== this.tempCurrentNodeInfo.name) {
                // commit
                let params = {
                    parentId: this.currentNodeInfo.parentId,
                    id: this.currentNodeInfo.id,
                    factorName: this.currentNodeInfo.name,
                    factorType: this.currentNodeInfo.factorType
                };
                modifyKeywords(params).then(resp => {
                    this.loading = false;
                    this.modifyDialog = false;
                    this.modifyTreeConfigSuccess();
                }).catch(e => {
                    this.loading = false;
                    console.error(e);
                });
            }
        },
        handleConfirmCreateNewNode() { // 增加子节点
            // goto commit
            console.log(this.currentNodeInfo);
            this.loading = true;
            let params = {
                parentId: this.currentNodeInfo.id,
                factorLevel: +this.currentNodeInfo.factorLevel + 1,
                factorName: this.createNewNodeName,
            };
            createNewChildNode(params).then(resp => {
                this.loading = false;
                this.createNodeDialog = false;
                this.modifyTreeConfigSuccess();
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        handleConfirmInputKeyword() { // 增加子节点---关键词level
            if (!this.selectedKewWordType) {
                this.$message.error('请选择新增关键词类型');
                return;
            }
            if (!this.inputKeyword.trim() || (this.inputKeyword.trim() && this.inputKeyword.trim().length < 2)) {
                this.$message.error('关键词名称请至少输入两个文字');
                return;
            }
            let filterItem = this.currentNodeInfo.children.filter(v => {
                return v.keyWord === this.inputKeyword.trim() && v.factorType === this.selectedKewWordType;
            });
            if (filterItem && filterItem.length) {
                this.$message.error('已存在相同关键词');
            }
            // commit
            this.loading = true;
            let params = {
                parentId: this.currentNodeInfo.id,
                factorLevel: +this.currentNodeInfo.factorLevel + 1,
                factorName: this.inputKeyword,
                factorType: this.selectedKewWordType
            };
            createNewChildNode(params).then(resp => {
                this.loading = false;
                this.createNodeDialog = false;
                this.modifyTreeConfigSuccess();
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        setCurrentNode(node, data) {
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex(d => d.id === data.id);
            this.currentNodeInfo = JSON.parse(JSON.stringify(children[index]));
            this.tempCurrentNodeInfo = JSON.parse(JSON.stringify(children[index]));
        },
        handleModify(node, data) {
            this.modifyDialog = true;
            this.setCurrentNode(node, data);
        },
        showArticleDetail(node, data) {
            this.articleDetailDialog = true;
            this.setCurrentNode(node, data);
            this.loading = true;
            getArticleDetailByKeywords({keyWord: node.data.name}).then(resp => {
                this.loading = false;
                this.currentNewsDetails = resp[0];
            }).catch(e => {
                this.loading = false;
                console.error(e);
            });
        },
        showRulesSettingDialog(node, data) { // 预警设置
            this.rulesSettingDialog = true;
            this.setCurrentNode(node, data);
            this.getRulesById();
        },
        handleAppendNode(node, data) {
            console.log(node);
            this.createNodeDialog = true;
            this.setCurrentNode(node, data);
            // const newChild = {id: tempId++, label: 'testtest', children: []};
            // if (!data.children) {
            //     this.$set(data, 'children', []);
            // }
            // data.children.push(newChild);
        },
        handleRemoveNode(node, data) {
            this.$confirm('删除后，该节点子集节点有一并删除，是否确定删除该节点？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    // delete node
                    console.log(node.data);
                    this.loading = true;
                    deleteNodes(node.data).then(resp => {
                        this.loading = false;
                        this.modifyTreeConfigSuccess();
                    }).catch(e => {
                        console.error(e);
                        this.loading = false;
                    });
                });
        },
        modifyTreeConfigSuccess() {
            this.$emit('getTreeData');
            this.$emit('updateModifyTreeConfigFlag', true);
        }
    }
};
</script>
<style lang="less" scoped>
.unusual-detail {
    height: 600px;
    overflow: auto;
    .el-tree {
        min-height: 400px;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 10px;
        margin-top: 10px;
        margin-right: 10px;
    }
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
    .self-button {
        font-size: 14px;
        &.warning {
            color: yellow;
        }
        &.primary {
            color: #53c4f8;
        }
        &.success {
            color: rgb(151, 223, 43);
        }
        &.danger {
            color: red;
        }
        &.notice {
            color: #ef9c00;
        }
    }
    /deep/ .el-tree-node__content {
        background: transparent;
        &:hover {
            background: transparent;
        }
        &:visited {
            background: transparent;
        }
        &:focus {
            background: transparent;
        }
        &:active {
            background: transparent;
        }
    }
}
</style>
