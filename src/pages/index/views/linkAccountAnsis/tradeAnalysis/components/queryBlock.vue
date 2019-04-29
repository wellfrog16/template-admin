<template>
    <div class="query-block">
        <s-card :title="`用户选择`" :icon="`fa fa-user-check`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item
                                prop="resultId"
                                label="导入结果集"
                                label-width="100px"
                                style="display:inline-block;"
                                :rules="
                                    [{
                                        required: true, message: '请选择结果集'
                                    }]"
                            >
                                <resultSelectComponent ref="resultSelectComponent" :resultIdProps="ruleForm.resultId" @selectResultId="selectResultId"></resultSelectComponent>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="contractCode" label="合约代码" label-width="100px">
                                <el-input
                                    clearable
                                    size="small"
                                    v-model="ruleForm.contractCode"
                                    class="custom-width"
                                    placeholder="cu1712"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="selectDateRange" label="统计区间" label-width="100px">
                                <s-date-picker
                                    :value="ruleForm.selectDateRange"
                                    :isRange="true"
                                    @change="handleSdatePickerDateRangeChange"
                                ></s-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="extra" label="时间粒度" label-width="100px" style="display:inline-block; padding: 5px 0;"
                                          :rules="[{
                                              validator: validateExtraArray, required: true
                                          }]">
                                <span style="color: #fff; margin: 0 8px;">前</span>
                                <el-input clearable size="small" v-model="ruleForm.extra[0]" style="width: 120px;"></el-input>
                                <span style="color: #fff; margin: 0 8px;">后</span>
                                <el-input clearable size="small" v-model="ruleForm.extra[1]" style="width: 120px;"></el-input>（分钟）
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <div slot="right">
                <el-button size="small" type="warning" @click="handleConfirmQuery">确定</el-button>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import SDatePicker from '@/components/index/common/SDatePicker';
import ResultSelectComponent from '@/components/index/common/UnusualEventsResultSelectComponent';
export default {
    components: {
        SCard,
        SDatePicker,
        ResultSelectComponent
    },
    data() {
        return {
            rules: {},
            ruleForm: {
                resultId: '',
                selectDateRange: [],
                contractCode: '',
                extra: [],
                timeRange: '' // 用于计算统计区间范围限制
            }
        };
    },
    methods: {
        validateExtraArray(rule, value, callback) {
            let reg = /^[0-9]+$/;
            if (!value.length) {
                callback(new Error('请输入时间粒度'));
            } else if (!value[0] && value[0] !== 0) {
                callback(new Error('请输入前置时间粒度'));
            } else if (!value[1] && value[1] !== 0) {
                callback(new Error('请输入后置时间粒度'));
            } else if (!reg.test(value[0]) || !reg.test(value[1])) {
                callback(new Error('时间粒度只能为数字'));
            } else if (value[0] > 60 || value[1] > 60) {
                callback(new Error('时间粒度小于60'));
            }
            callback();
        },
        selectResultId(item) {
            this.ruleForm.resultId = item.resultId;
            this.ruleForm.timeRange = item.timeRange;
            // todo set timeRange
        },
        handleSdatePickerDateRangeChange(val) {
            this.ruleForm.selectDateRange = val;
        },
        handleConfirmQuery() {
            // todo get user list
            // todo get event analysis
            this.$emit('handleConfirmQuery', this.ruleForm);
        }
    }
};
</script>
