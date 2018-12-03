<!--精确信息查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="indexSelection" label="指标选择：" label-width="100px">
                            <el-select style="width: 100%;"
                                        v-model="ruleForm.indexSelection"
                                class="custom-width" clearable size="small"
                                 placeholder="指标选择">
                                <el-option
                                    v-for="item in indexSelectionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="contractCode" label="=" label-width="40px">
                            <el-input clearable size="small" v-model="ruleForm.contractCode"
                                      style="width: 100%;"  class="custom-width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button type="primary" @click="preciseInformationClick('ruleForm')">生成报告</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button type="primary" @click="preciseClearClick('ruleForm')">清除数据</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`精确信息查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table
                    :height="230"
                    :loading="loadingPreciseClear"
                    :columns="columnsCTrI3"
                    :tableData="tableData3">
                </s-table>
            </div>
        </s-card>
    </div>
</template>
<script>

    import {
        postPreciseInformation,      // 精确信息查询(生成报告接口)
    } from '@/api/dataAnsis/customerInformationInquiry';

    import {
        columnsCTrI3,     // 精确信息查询(列表头)
        indexSelectionOptions  // 指标选择
    } from '../../customerInformationInquiry/components/constants';

    export default {
        name: "customerAddress",
        // 父传子！
        props: {},
        components: {
            SCard: () => import('@/components/index/common/SCard'),               // 边框
            SDatePicker: () => import('@/components/index/common/SDatePicker'),   // 时间区间
            STable: () => import('@/components/index/common/STable'),             // 列表
        },
        // 存储数据
        data() {
            return {
                loadingPreciseClear: false,
                tableData3: [],                // 精确信息查数据
                columnsCTrI3: columnsCTrI3,    // 精确信息查(列表头)

                // form 表单绑定值
                ruleForm: {
                    indexSelection: '1',          // 指标选择
                    contractCode: ''      // 指标内容   -- 玉田新村105号101室
                },
                indexSelectionOptions: [],   // 指标选择
                rules: {
                    indexSelection: {
                        required: true,
                        message: '请输入合约代码'
                    }
                }
            }

        },
        // 数据交互
        methods: {

            // 精确信息查询清除数据
            preciseClearClick() {
                this.tableData3 = [];
            },

            // 精确信息查询(生成报告)
            preciseInformationClick(){
                this.$refs['ruleForm'].validate(valid => {
                    if(valid){
                        let params = {
                            "indexName": this.ruleForm.indexSelection,      // 指标名称
                            "indexValue": this.ruleForm.contractCode,         // 指标值
                        }
                        this.loadingPreciseClear = true;
                        postPreciseInformation(params).then(resp => {
                            this.loadingPreciseClear = false;
                            this.tableData3 = this.tableData3.concat(resp);
                        })
                    }
                })
            },
        },
        // 初始化数据
        mounted() {
            this.indexSelectionOptions = indexSelectionOptions;
        },
    }
</script>

<style lang="less" module>
</style>
