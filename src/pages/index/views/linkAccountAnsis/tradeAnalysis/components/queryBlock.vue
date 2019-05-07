<template>
    <div class="query-block">
        <s-card :title="`用户选择`" :icon="`fa fa-user-check`">
            <div slot="content">
                <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
                    <el-row>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item
                                prop="resultId"
                                label="导入异常事件"
                                label-width="130px"
                                style="display:inline-block;"
                                :rules="
                                    [{
                                        required: true, message: '请选择异常事件'
                                    }]"
                            >
                                <resultSelectComponent ref="resultSelectComponent" :resultIdProps="ruleForm.resultId" @selectResultId="selectResultId"></resultSelectComponent>
                            </el-form-item>
                        </el-col>
                        <!--    <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="contractCode" label="合约代码" label-width="100px">
                                <el-input
                                    clearable
                                    size="small"
                                    v-model="ruleForm.contractCode"
                                    class="custom-width"
                                    placeholder="cu1712"
                                ></el-input>
                            </el-form-item>
                        </el-col> -->
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="extra" label-width="130px" style="display:inline-block; padding: 5px 0;"
                                          :rules="[{
                                              validator: validateExtraArray, required: true
                                          }]">
                                <span slot="label">
                                    <span>观察窗口</span>
                                    <el-tooltip>
                                        <span slot="content">基于统计时间区间，前置m分钟，后置n分钟的一个时间区域</span>
                                        <i class="el-icon-info" style="font-size: 12px;"></i>
                                    </el-tooltip>
                                </span>
                                <span style="color: #fff; margin: 0 8px;">前</span>
                                <el-input clearable size="small" v-model="ruleForm.extra[0]" style="width: 120px;"></el-input>
                                <span style="color: #fff; margin: 0 8px;">后</span>
                                <el-input clearable size="small" v-model="ruleForm.extra[1]" style="width: 120px;"></el-input>（分钟）
                            </el-form-item>
                        </el-col>
                        <el-col :xl="12" :lg="12" :md="12" :sm="24">
                            <el-form-item prop="selectDateRange" label-width="130px" :rules="[{required: true, validator: validDateRange}]">
                                <span slot="label">
                                    <span>统计时间区间</span>
                                    <el-tooltip>
                                        <span slot="content">规定异常事件的统计时间区间</span>
                                        <i class="el-icon-info" style="font-size: 12px;"></i>
                                    </el-tooltip>
                                </span>
                                <s-date-picker
                                    :value="ruleForm.selectDateRange"
                                    :isRange="true"
                                    :propsDownDisabledTime="downDisabledTime"
                                    :propsUpDisabledTime="upDisabledTime"
                                    @change="handleSdatePickerDateRangeChange"
                                ></s-date-picker>
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
            },
            upDisabledTime: 0,
            downDisabledTime: 0,
        };
    },
    methods: {
        validateExtraArray(rule, value, callback) {
            let reg = /^[0-9]+$/;
            if (!value.length) {
                callback(new Error('请输入观察窗口'));
            } else if (!value[0] && value[0] !== 0) {
                callback(new Error('请输入前置观察窗口'));
            } else if (!value[1] && value[1] !== 0) {
                callback(new Error('请输入后置观察窗口'));
            } else if (!reg.test(value[0]) || !reg.test(value[1])) {
                callback(new Error('观察窗口只能为数字'));
            } else if (value[0] > 60 || value[1] > 60) {
                callback(new Error('观察窗口小于60'));
            }
            callback();
        },
        validDateRange(rule, value, callback) {
            if (!value.length) {
                callback(new Error('请输入统计时间区间'));
            } else if (!value[0]) {
                callback(new Error('请输入开始时间'));
            } else if (!value[1]) {
                callback(new Error('请输入结束时间'));
            }
            callback();
        },
        selectResultId(item) {
            this.ruleForm.resultId = item.resultId;
            this.ruleForm.selectDateRange = [item.timeRange.slice(0, 11), item.timeRange.slice(22, 33)];
            // todo set disabled timeRange
            console.log(item.timeRange.slice(0, 20));
            console.log(item.timeRange.slice(22));
            this.upDisabledTime = new Date(item.timeRange.slice(22, 33) + '00:00:00').getTime() + 24 * 60 * 60 * 1000;
            this.downDisabledTime = new Date(item.timeRange.slice(0, 11) + '00:00:00').getTime() - 24 * 60 * 60 * 1000;
        },
        handleSdatePickerDateRangeChange(val) {
            this.ruleForm.selectDateRange = val;
        },
        handleConfirmQuery() {
            // todo get user list
            // todo get event analysis
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.$emit('handleConfirmQuery', this.ruleForm);
                }
            });
        }
    }
};
</script>
