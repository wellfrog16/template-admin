<!--模糊地址查询-->
<template>
    <div>
        <el-card :class="$style.form_data">
            <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                <el-row>
                    <el-col :xl="4" :lg="4" :md="4" :sm="24">
                        <el-form-item prop="nationy" label="国家：" label-width="70px">
                            <el-select style="width: 100%;"
                                v-model="ruleForm.nationy"
                                class="custom-width"
                                size="small"
                                placeholder="请选择国家">
                                <el-option
                                    v-for="items in nationyOptions"
                                    :key="items.value"
                                    :label="items.label"
                                    :value="items.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="4" :lg="4" :md="4" :sm="24">
                        <el-form-item prop="province" label="省：" label-width="50px">
                            <el-select style="width: 100%;"
                                v-model="ruleForm.province"
                                class="custom-width" clearable size="small"

                                placeholder="请选择省">
                                <el-option
                                    v-for="item in provinceOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="4" :lg="4" :md="4" :sm="24">
                        <el-form-item prop="city" label="市：" label-width="50px">
                            <el-select style="width: 100%;"
                                v-model="ruleForm.city"
                                class="custom-width" clearable size="small"
                                placeholder="请选择市">
                                <el-option
                                    v-for="item in cityOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="7" :lg="7" :md="7" :sm="24">
                        <el-form-item prop="address" label="地址" label-width="50px">
                            <el-input clearable size="small" v-model="ruleForm.address"
                                      style="width: 95%;" class="custom-width">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="15px">
                            <el-button type="primary" @click="fuzzyAddressClick('ruleForm')">生成报告</el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="2" :lg="2" :md="2" :sm="24">
                        <el-form-item label-width="45px">
                            <el-button type="primary" @click="fuzzyClearClick('ruleForm')">清除数据</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-card>
        <s-card :title="`模糊地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <s-table
                    :height="230"
                    :loading="loadingFuzzyClear"
                    :columns="columnsCTrI4"
                    :tableData="tableData4">
                </s-table>
            </div>
        </s-card>
    </div>
</template>

<script>

    import {
        postFuzzyAddressData,       // 模糊地址(接口)
        postFuzzyAddress,           // 模糊地址查询(生成报告接口)
    } from '@/api/dataAnsis/customerInformationInquiry';
    import {
        columnsCTrI4,      // 模糊地址查询(列表头)
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
                loadingFuzzyClear: false,
                tableData4: [],                // 模糊地址查询数据
                columnsCTrI4: columnsCTrI4,    // 模糊地址查询(列表头)

                // form 表单绑定值
                nationyOptions: [
                    {label: '中国', value: '0'},
                ],   // 国家
                provinceOptions:[],   // 省
                cityOptions:[],       // 市


                ruleForm: {
                    nationy: '0',         // 国家
                    province: '',        // 省
                    city: '',            // 市
                    address: '',         // 地址   玉田新村105号101室
                },
                rules: {
                    address: {
                        required: true,
                        message: '请输入详细地址'
                    }
                }
            }

        },
        //    数据交互  127662
        methods: {
            // 模糊地址(接口)
            fuzzyAddressData(){
                postFuzzyAddressData().then(resp => {
                    let data = [
                        {
                            label: '全国',
                            id: '0',
                            children: resp
                        }
                    ];
                    this.nationyOptions = data;
                    // this.nationyOptions = [];  // 国家
                    this.provinceOptions = resp;  // 省
                    this.cityOptions = [];  // 市
                })
            },
            proviceChenge(val){
                console.log(this.ruleForm.province);
            },
            // 模糊地址查询清除数据
            fuzzyClearClick() {
                this.tableData4 = [];
            },

            // 模糊地址查询(生成报告)
            fuzzyAddressClick(){
                this.$refs['ruleForm'].validate(valid => {
                    if(valid){
                        let params = {
                            "countryName": this.ruleForm.nationy,   // 国家
                            "provinceName": this.ruleForm.province,  // 省
                            "cityName": this.ruleForm.city,      // 市
                            "address": this.ruleForm.address,   // 地址
                        }
                        this.loadingFuzzyClear = true;
                        postFuzzyAddress(params).then(resp => {
                            this.loadingFuzzyClear = false;
                            if(resp){
                                this.tableData4 = this.tableData4.concat(resp);
                            }
                        })
                    }
                })
            },
        },
        // 初始化数据
        mounted() {
            this.fuzzyAddressData();
        },
    }
</script>

<style lang="less" module>
</style>
