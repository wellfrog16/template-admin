<!--客户地址查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="customerID" label="客户编码：" label-width="100px">
                            <el-input clearable size="small" v-model="ruleForm.customerID"
                                      style="width: 100%;" class="custom-width"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button type="primary" @click="customerAddressClick('ruleForm')">生成报告</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button type="primary" @click="customerClearClick('ruleForm')">清除数据</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`客户地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table :columns="this.columnsCTrI1" :tableData="tableData1">
                </s-table>
            </div>
        </s-card>
    </div>
</template>

<script>
    import {
        postCustomerAddress,          // 客户地址查询(生成报告接口)
    } from '@/api/dataAnsis/customerInformationInquiry';

    import {
        columnsCTrI1,    // 客户地址查询  (假数据)
        tableData1,    // 客户地址查询(列表头)
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
                tableData1: [],               // 客户地址查询数据
                columnsCTrI1: columnsCTrI1,   // 客户地址查询(列表头)

                // form 表单绑定值
                ruleForm: {
                    customerID: '',      // 客户编码
                },
                // 校验
                rules: {
                    customerID: {
                        required: true,
                        message: '请输入客户编码'
                    }
                }
            }

        },
        //    数据交互  127662
        methods: {

            // 客户地址清除数据
            customerClearClick() {
                this.tableData1 = [];
            },

            // 客户地址查询(生成报告)
            customerAddressClick(){
                this.$refs['ruleForm'].validate(valid => {
                    if(valid){
                        let params = {
                            "id": this.ruleForm.customerID,   // 客户编码
                        }
                        postCustomerAddress(params).then(resp => {
                            this.tableData1 = tableData1;

                        })
                    }
                })

            },
        },
        // 初始化数据
        mounted() {
            // this.customerAddressClick();
        },
    }
</script>

<style lang="less" module>
</style>
