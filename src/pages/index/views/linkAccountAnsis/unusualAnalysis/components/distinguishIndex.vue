/* 指标识别 */
<template>
    <div class="distinguish-index-comp">
        <el-row style="margin-bottom: 15px;">
            <el-col :span="12" class="header-css">指标识别：
                <!-- <el-tooltip content="点击设置指标">
                    <i class="el-icon-setting" style="cursor:pointer;" @click="showSettingDialog"></i>
                </el-tooltip> -->
            </el-col>
            <el-col :span="12">
                <div style="text-align: right; line-height: 36px; cursor: pointer;" @click="showMore">
                    更多指标<i v-show="showMoreIndex" class="el-icon-arrow-up"></i>
                    <i v-show="!showMoreIndex" class="el-icon-arrow-down"></i>
                </div>
            </el-col>
        </el-row>

        <div class="distinguish-index">
            <el-row>
                <el-col :span="8" v-for="(item, index) in distinguishIndexOptions" :key="index" v-show="showMoreIndex || (!showMoreIndex && index < 3)" style="line-height: 30px;">
                    {{ item.label }} ： {{ item.value }}
                </el-col>
            </el-row>
        </div>
        <el-dialog :close-on-click-modal="false" :close-on-press-escape="false" :visible="showDialog" width="85%" top="3%" @close="showDialog = false">
            <index-setting-dialog :indexType="indexType" @closeDialog="closeDialog"></index-setting-dialog>
        </el-dialog>
    </div>
</template>
<script>
import indexSettingDialog from './indexSettingDialog';
export default {
    components: {indexSettingDialog},
    props: {
        distinguishIndexOptions: {
            type: Array,
            default() {
                return [
                    {label: '买入成交量', value: '>90%'},
                    {label: '卖出成交量', value: '>90%'},
                    {label: '买入成交量', value: '>90%'},
                    {label: '买入成交量', value: '>90%'},
                    {label: '买入成交量', value: '>90%'},
                    {label: '买入成交量', value: '>90%'},
                ];
            }
        },
        indexType: {
            type: [Number, String],
            default: '0'
        }
    },
    data() {
        return {
            showMoreIndex: false,
            showDialog: false
        };
    },
    methods: {
        showMore() {
            this.showMoreIndex = !this.showMoreIndex;
        },
        showSettingDialog() {
            this.showDialog = true;
        },
        closeDialog() {
            this.showDialog = false;
        }
    }
};
</script>
<style lang="less" scoped>
    .distinguish-index-comp {
        border: 1px dashed #ccc;
        border-radius: 5px;
        padding: 5px 10px;
        .distinguish-index {
            text-align: center;
        }
        .header-css {
            color: #fff;
            margin-left: -20px;
            padding: 10px 32px;
            background: url('../../../../../../assets/img/usr/card_header_bg.png') no-repeat -10px bottom;
            background-size: 200px;
        }
    }
</style>
