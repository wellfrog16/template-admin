<template>
    <div class="tree-common">
        <el-popover
            popper-class="self-popper"
            :width="270"
            placement="right"
            :disabled="!names.length"
            trigger="hover">
            <el-input :readonly="true" slot="reference" :value="inputData" ref="dealerInput" :clearable="true" @clear="handlerClear" size="small" :disabled="disabled"
                      @input="handlerInput" v-popover:popover1 @blur="handleBlur"></el-input>
            <div style="max-height: 200px; overflow: auto;">
                <el-tag class="tag-css" v-for="(item, index) in names" :key="index" style="margin:2px 5px;">{{ item }}</el-tag>
            </div>
        </el-popover>
        <el-popover
            ref="popover1"
            :width="popoverWidth"
            :disabled="disabled"
            trigger="click">
            <div style="height: 200px; overflow-y: scroll;">
                <el-tree
                    style="width:350px;"
                    ref="tree-common"
                    :show-checkbox="isMultipleMode"
                    :props="props"
                    :data="data"
                    accordion
                    :filter-node-method="filterNode"
                    node-key="id"
                    :default-expanded-keys="defaultExpandedKeys"
                    @node-click="handlerNodeClick"
                    @check-change="handleMulitpleChange"
                ></el-tree>
            </div>
        </el-popover>
    </div>
</template>

<script>
import {getAreaTreeList} from '@/api/common/index.js';
export default {
    name: 'selector-dealer',
    props: {
        selectItem: {
            type: String,
            default() {
                return '';
            }
        },
        defaultExpandedKeys: {
            type: Array,
            default() {
                return ['0'];
            }
        },
        disabled: {
            type: Boolean,
            default: false
        },
        isMultipleMode: { // 多选模式
            type: Boolean,
            default: false
        }
    },
    components: {},
    mixins: [],
    data() {
        return {
            names: [],
            value: '',
            id: '',
            popoverWidth: 326,
            props: {
                children: 'children',
                label: 'label'
            },
            data: [],
            flag: true
        };
    },
    computed: {
        val: {
            get: function() {
                return this.value;
            },
            set: function(value) {
                this.$emit('node-click', this.id, value);
            }
        },
        inputData() {
            if (this.isMultipleMode) {
                return this.names.join(',');
            } else {
                return this.val;
            }
        }
    },
    watch: {
        selectItem: function() {
            this.value = this.selectItem;
            if (!this.value.length) {
                this.handlerClear();
            }
        }
    },
    methods: {
        handleBlur() {
            // setTimeout(() => {
            //     if (this.flag && !this.isMultipleMode) {
            //         let value = this.$refs['dealerInput']['$refs']['input']['value'];
            //         if (!value) {
            //             this.$emit('node-click', '', '');
            //             return;
            //         }
            //         let code = this.getCodeByName(value);
            //         if (!code) {
            //             this.$message.error('请输入或选择有效人员');
            //             this.handlerInput('');
            //             this.$emit('node-click', '', '');
            //         } else {
            //             // 输入姓名
            //             this.$emit('node-click', code, value);
            //         }
            //     }
            // }, 500);
        },
        getCodeByName(value) {
            let targetCode = '';
            let loop = function(data) {
                data.forEach(v => {
                    if (v.children) {
                        loop(v.children);
                    } else {
                        if (v.label === value) {
                            targetCode = v.id;
                            return true;
                        }
                    }
                });
            };
            loop(this.data);
            return targetCode;
        },
        ajaxGetAllRoleOrgs() {
            getAreaTreeList().then(resp => {
                let data = [
                    {
                        label: '全国',
                        value: '0',
                        children: resp
                    }
                ];
                this.data = data;
            });
        },
        handlerInput(val) {
            this.$refs['tree-common'].filter(val);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleMulitpleChange() {
            let code = [];
            if (this.isMultipleMode) {
                let checkedNodes = this.$refs['tree-common'].getCheckedNodes();
                if (checkedNodes && checkedNodes.length) {
                    let filterItem = checkedNodes.filter(v => {
                        return !!v.children === false;
                    });
                    this.names = filterItem.map(v => {
                        return v.label;
                    });
                    code = filterItem.map(v => {
                        return v.id;
                    });
                    this.value = this.names.join(',');
                    this.id = code.join(',');
                    this.$emit('node-click', this.id, this.value);
                } else {
                    setTimeout(() => {
                        this.handlerClear();
                    });
                }
            }
        },
        handlerNodeClick(item) {
            if (!this.isMultipleMode) {
                if (!item.children) {
                    this.value = item.label;
                    this.id = item.id;
                }
                this.$emit('node-click', this.id, this.value);
                this.flag = false; // 阻止blur事件
                setTimeout(() => {
                    this.flag = true;
                }, 1000);
            }
        },
        clearNodesOnMultiple() {
            if (this.isMultipleMode) {
                this.names = [];
                this.$refs['tree-common'] && this.$refs['tree-common'].setCheckedNodes([]);
            }
        },
        handlerClear() {
            this.$emit('node-click', '', '');
            this.clearNodesOnMultiple();
        },
        clearValue() {
            this.value = '';
        },
        getCheckedList() {
            return this.$refs['tree-common'].getCheckedNodes();
        }
    },
    created() {
        this.ajaxGetAllRoleOrgs();
    },
    mounted() {
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" scoped>
    .tree-common {
        width: 350px;
    }
</style>
