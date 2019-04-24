<template>
    <s-card class="query-block" :title="`动因分析指标筛选及设置`" :icon="`fa fa-filter`">
        <div slot="right">
            <el-button type="primary" size="small">确定</el-button>
        </div>
        <div slot="content">
            <el-form ref="searchForm" :model="searchForm" :rules="rules" label-width="120px">
                <el-row>
                    <el-col :xl="12" :lg="12" :md="12" :sm="24">
                        <el-form-item prop="category" label="交易品种：">
                            <el-select v-model="searchForm.category" size="small" class="custom-width" placeholder="请选择交易品种">
                                <el-option v-for="(item, index) in categoryOptions"
                                           :label="item.label"
                                           :value="item.value"
                                           :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="12" :lg="12" :md="12" :sm="24">
                        <el-form-item prop="contractCode" label="合约代码：">
                            <el-input clearable size="small" v-model="searchForm.contractCode" class="custom-width" placeholder="cu1712"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="12" :lg="12" :md="12" :sm="24">
                        <el-form-item prop="selectDateRange" label="统计区间：">
                            <s-date-picker
                                :value="searchForm.selectDateRange"
                                :isRange="true"
                                @change="handleSdatePickerDateRangeChange"
                            ></s-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="12" :lg="12" :md="12" :sm="24">
                        <el-form-item label="指标设置：">
                            <el-button size="small" type="primary" @click="showSettingDialog">指标设置<i class="el-icon-setting"></i></el-button>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <div style="overflow: auto; max-height: 120px; border: 1px dashed #ccc; padding: 5px;" v-show="selectIndexModels.length">
                            <el-tag
                                style="margin-left: 5px;"
                                v-show="index < 3 || showMoreIndex"
                                v-for="(item, index) in selectIndexModels"
                                :key="index"
                                type="warning">
                                {{ item }}
                            </el-tag>
                            <span @click="showMoreIndex=!showMoreIndex" style="cursor: pointer; margin-left: 10px;">
                                <i class="el-icon-arrow-up" v-if="showMoreIndex">收起</i>
                                <i class="el-icon-arrow-down" v-else>展开更多</i>
                            </span>
                        </div>
                    </el-col>
                </el-row>
            </el-form>
            <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" width="85%" :visible="settingDialog" @close="settingDialog = false">
                <all-index-setting-dialog @closeDialog="closeDialog" @selectModels="selectModels" :propsSelectIndexModels="selectIndexModels"></all-index-setting-dialog>
            </el-dialog>
        </div>
    </s-card>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import SDatePicker from '@/components/index/common/SDatePicker';
import allIndexSettingDialog from './allIndexSettingDialog';
import moment from 'moment';
export default {
    components: {
        SCard,
        SDatePicker,
        allIndexSettingDialog
    },
    data() {
        return {
            searchForm: {
                category: '',
                selectDateRange: [new Date(moment().subtract(5, 'days').format('YYYY-MM-DD')), new Date(moment().subtract(1, 'days').format('YYYY-MM-DD'))],
                contractCode: ''
            },
            categoryOptions: [
                {label: '原油', value: 0},
                {label: '橡胶', value: 1},
                {label: '黄金', value: 2},
                {label: '燃油', value: 3},
            ],
            rules: {},
            settingDialog: false,
            selectIndexModels: [],
            showMoreIndex: false
        };
    },
    methods: {
        handleSdatePickerDateRangeChange(val) {
            this.searchForm.selectDateRange = val;
        },
        showSettingDialog() {
            this.settingDialog = true;
        },
        closeDialog() {
            this.settingDialog = false;
        },
        selectModels(val) {
            this.selectIndexModels = val;
        }
    }
};
</script>

<style lang="less" scoped>
    .query-block {
        .custom-width {
            width: 350px;
        }
    }
</style>
