<!--客户地址查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="customerID" label="客户编码：" label-width="100px">
                            <el-input
                                clearable
                                size="small"
                                v-model="ruleForm.customerID"
                                style="width: 100%;"
                                class="custom-width"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="30px">
                            <el-button
                                size="small"
                                type="primary"
                                @click="customerAddressClick('ruleForm')"
                            >生成报告</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="60px">
                            <el-button
                                size="small"
                                type="primary"
                                @click="customerClearClick('ruleForm')"
                            >清除数据</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`客户地址查询`" :icon="`fa fa-search-location`">
            <div slot="content">
                <s-table
                    :height="230"
                    :loading="loadingCustomerAddress"
                    :columns="this.columnsCTrI1"
                    :tableData="tableData1"
                ></s-table>
            </div>
        </s-card>
    </div>
</template>

<script>
// 客户地址查询(生成报告接口)
import {postCustomerAddress} from '@/api/dataAnsis/customerInformationInquiry';
// 客户地址查询(列表头)
import {columnsCTrI1} from '../../customerInformationInquiry/components/constants';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
export default {
    name: 'customerAddress',
    components: {SCard, STable},
    // 存储数据
    data() {
        return {
            loadingCustomerAddress: false,
            tableData1: [], // 客户地址查询数据
            columnsCTrI1: columnsCTrI1, // 客户地址查询(列表头)
            // form 表单绑定值
            ruleForm: {
                customerID: '' // 客户编码  20180000025  / 80000012
            },
            // 校验
            rules: {
                customerID: {
                    required: true,
                    message: '请输入客户编码'
                }
            }
        };
    },
    methods: {
        // 客户地址清除数据
        customerClearClick() {
            this.tableData1 = [];
        },
        // 客户地址查询(生成报告)
        customerAddressClick() {
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    let params = {
                        'custId': this.ruleForm.customerID
                    };
                    this.loadingCustomerAddress = true;
                    postCustomerAddress(params).then(resp => {
                        if (resp && resp.resData !== null) {
                            this.loadingCustomerAddress = false;
                            this.tableData1 = this.tableData1.concat(resp);
                        } else {
                            this.loadingCustomerAddress = false;
                            return [];
                        }
                    }).catch(e => {
                        this.loadingCustomerAddress = false;
                    });
                }
            });
        },
    },
    mounted() {
        this.ruleForm.customerID = this.$route.query.custId ? this.$route.query.custId : '';
    }
};
</script>
<style lang='less' module></style>
