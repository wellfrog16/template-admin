<template>
    <div class="tree-common">
        <el-popover
            popper-class="self-popper"
            :width="270"
            placement="right"
            :disabled="!names.length"
            trigger="hover">
            <el-input slot="reference" :value="val" ref="dealerInput" :clearable="true" @clear="handlerClear" size="small" :disabled="disabled"
                      @input="handlerInput" v-popover:popover1 @blur="handleBlur"></el-input>
            <div style="max-height: 200px;overflow: auto;">
                <el-tag class="tag-css" v-for="(item, index) in names" :key="index" style="margin:2px 5px">{{ item }}</el-tag>
            </div>
        </el-popover>
        <el-popover
            ref="popover1"
            :width="popoverWidth"
            :disabled="disabled"
            trigger="click">
            <div style=" height: 200px;overflow-y: scroll;">
                <el-tree
                    ref="selectorDealer"
                    :show-checkbox="isMultipleMode"
                    :props="props"
                    :data="data"
                    accordion
                    :filter-node-method="filterNode"
                    node-key="usercode"
                    :default-expanded-keys="defaultExpandedKeys"
                    @node-click="handlerNodeClick"
                    @check-change="handleMulitpleChange"
                ></el-tree>
            </div>
        </el-popover>
    </div>
</template>

<script>
// import { getAllRoleOrgs } from '@/service/knowledgeBase/EarlyWarningHistory/Index';

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
                return [];
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
            userCode: '',
            popoverWidth: 270,
            props: {
                children: 'children',
                label: 'username'
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
                this.$emit('node-click', this.userCode, value);
            }
        }
    },
    watch: {
        selectItem: function() {
            this.value = this.selectItem;
            if (!this.value.length) {
                this.clearNodesOnMultiple();
            }
        }
    },
    methods: {
        handleBlur() {
            setTimeout(() => {
                if (this.flag && !this.isMultipleMode) {
                    let value = this.$refs['dealerInput']['$refs']['input']['value'];
                    if (!value) {
                        this.$emit('node-click', '', '');
                        return;
                    }
                    let code = this.getCodeByName(value);
                    if (!code) {
                        this.$message.error('请输入或选择有效人员');
                        this.handlerInput('');
                        this.$emit('node-click', '', '');
                    } else {
                        // 输入姓名
                        this.$emit('node-click', code, value);
                    }
                }
            }, 500);
        },
        getCodeByName(value) {
            let targetCode = '';
            let loop = function(data) {
                data.forEach(v => {
                    if (v.children) {
                        loop(v.children);
                    } else {
                        if (v.username === value) {
                            targetCode = v.usercode;
                            return true;
                        }
                    }
                });
            };
            loop(this.data);
            return targetCode;
        },
        ajaxGetAllRoleOrgs() {
            // getAllRoleOrgs().then(res => {
            //     this.data = res.children;
            // });
        },
        handlerInput(val) {
            this.$refs.selectorDealer.filter(val);
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.username.indexOf(value) !== -1;
        },
        handleMulitpleChange() {
            let code = [];
            if (this.isMultipleMode) {
                let checkedNodes = this.$refs['selectorDealer'].getCheckedNodes();
                if (checkedNodes && checkedNodes.length) {
                    let filterItem = checkedNodes.filter(v => {
                        return !!v.children === false;
                    });
                    this.names = filterItem.map(v => {
                        return v.username;
                    });
                    code = filterItem.map(v => {
                        return v.usercode;
                    });
                    this.value = this.names.join(',');
                    this.userCode = code.join(',');
                    this.$emit('node-click', this.userCode, this.value);
                } else {
                    this.$emit('node-click', '', '');
                }
            }
        },
        handlerNodeClick(item) {
            if (!item.children) {
                this.value = item.username;
                this.userCode = item.usercode;
            }
            this.$emit('node-click', this.userCode, this.value);
            this.flag = false; // 阻止blur事件
            setTimeout(() => {
                this.flag = true;
            }, 1000);
        },
        clearNodesOnMultiple() {
            if (this.isMultipleMode) {
                this.names = [];
                this.$refs['selectorDealer'] && this.$refs['selectorDealer'].setCheckedNodes([]);
            }
        },
        handlerClear() {
            this.$emit('node-click', '', '');
            this.clearNodesOnMultiple();
        },
        clearValue() {
            this.value = '';
        }
    },
    created() {
        this.ajaxGetAllRoleOrgs();
    },
    mounted() {
        this.popoverWidth = this.$refs.dealerInput.$el.scrollWidth - 40;
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" scoped>
</style>
