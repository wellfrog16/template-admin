<!--精确信息查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="indexSelection" label="指标选择：" label-width="100px">
                            <el-select
                                style="width: 100%;"
                                v-model="ruleForm.indexSelection"
                                class="custom-width"
                                clearable
                                size="small"
                                placeholder="指标选择"
                            >
                                <el-option
                                    v-for="item in indexSelectionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="1" :lg="1" :md="1" :sm="24" :class="$style.col_md">
                        <span>=</span>
                    </el-col>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="contractCode" label=" " label-width="20px">
                            <el-input
                                clearable
                                size="small"
                                v-model="ruleForm.contractCode"
                                style="width: 100%;"
                                class="custom-width"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="25px">
                            <el-button
                                size="small"
                                type="primary"
                                @click="preciseInformationClick('ruleForm')"
                            >生成报告</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button
                                size="small"
                                type="primary"
                                @click="preciseClearClick('ruleForm')"
                            >清除数据</el-button>
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
                    :tableData="tableData3"
                ></s-table>
            </div>
        </s-card>
    </div>
</template>
<script>
// 精确信息查询(生成报告接口)
import {postPreciseInformation} from '@/api/dataAnsis/customerInformationInquiry';
import {columnsCTrI3, indexSelectionOptions} from '../../customerInformationInquiry/components/constants';
export default {
    name: 'customerAddress',
    components: {
        SCard: () => import('@/components/index/common/SCard'),
        STable: () => import('@/components/index/common/STable')
    },
    // 存储数据
    data() {
        return {
            loadingPreciseClear: false,
            tableData3: [], // 精确信息查数据
            columnsCTrI3: columnsCTrI3, // 精确信息查(列表头)
            // form 表单绑定值
            ruleForm: {
                indexSelection: '1', // 指标选择
                contractCode: '' // 指标内容
            },
            indexSelectionOptions: [], // 指标选择
            rules: {
                indexSelection: {
                    required: true,
                    message: '请选择指标选择'
                },
                contractCode: {
                    required: true,
                    message: '请输入指标内容'
                }
            }
        };
    },
    // 数据交互
    methods: {
        // 精确信息查询清除数据
        preciseClearClick() {
            this.tableData3 = [];
        },
        // 精确信息查询(生成报告)
        preciseInformationClick() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    let params = {
                        'indexName': this.ruleForm.indexSelection, // 指标名称
                        'indexValue': this.ruleForm.contractCode // 指标值
                    };
                    this.loadingPreciseClear = true;
                    postPreciseInformation(params).then(resp => {
                        if (resp && resp.resData !== null) {
                            this.loadingPreciseClear = false;
                            this.tableData3 = this.tableData3.concat(resp);
                        } else {
                            this.loadingPreciseClear = false;
                            return [];
                        }
                    }).catch(e => {
                        this.loadingPreciseClear = false;
                    });
                }
            });
        },
    },
    // 初始化数据
    mounted() {
        this.indexSelectionOptions = indexSelectionOptions;
    }
};
</script>
<style lang='less' module>
.form_data {
    .col_md {
        text-align: center;
        padding: 10px;
    }
}
</style>
