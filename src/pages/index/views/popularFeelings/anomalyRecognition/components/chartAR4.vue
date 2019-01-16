<template>
    <s-card :title="`美油实时图`" :icon="`fa fa-search`">
        <el-button slot="right" type="text" @click="dialogClick">异常指标</el-button>
        <el-dialog
            width="86%"
            slot="content"
            :before-close="closeData"
            title=""
            :visible.sync="dialogVisible"
            :class="$style.dia_name">
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                :class="$style.demo_rule_form">
                <el-form-item label="时间窗口" prop="timeWindow" label-width="100px">
                    <el-select
                        style="width: 45%;"
                        v-model="ruleForm.timeWindow"
                        class="custom-width"
                        size="small"
                        clearable
                        @change="nationyChenge"
                        placeholder="请选择时间窗口"
                    >
                        <el-option
                            v-for="times in timeWindowOptions"
                            :key="times.idName"
                            :label="times.name"
                            :value="times.idName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-row :gutter="20">
                <el-col :span="12">
                    <dialog-a-r1></dialog-a-r1>
                </el-col>
                <el-col :span="12">
                    <dialog-a-r2></dialog-a-r2>
                </el-col>
            </el-row>
            <div slot="footer" :class="$style.dialog_footer">
                <el-button @click="dialogCancelClick">取 消</el-button>
                <el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
            </div>
        </el-dialog>
        <echarts-common
            slot="content"
            :loading="loading4"
            ref="echartsDemo4"
            domId="echartsId4"
            :defaultOption="chartOptions4"
            :propsChartHeight="420">
        </echarts-common>
    </s-card>
</template>

<script>
import MiniIndex from './miniIndex';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR1 from './dialogAR1';
import DialogAR2 from './dialogAR2';
export default {
    name: 'chartAR2',
    components: {SCard, EchartsCommon, DialogAR1, DialogAR2},
    props: {
    },
    mixins: [MiniIndex],
    data() {
        return {
            loading4: false,
            dialogVisible: false,
            chartOptions4: {}
        };
    },
    computed: {},
    mounted() {
    },
    methods: {
        dialogClick() {
            this.dialogVisible = true;
        },
        closeData(done) {
            done();
            this.dialogVisible = false;
        },
        // 取 消
        dialogCancelClick() {
            // this.dialogVisible = !this.dialogVisible;
            // console.log('取 消');
            // this.$emit('eventClick', this.dialogVisible);
        },
        // 确 定
        dialogConfirmClick() {
            this.dialogVisible = false;
            console.log(this.dialogVisible);
            // console.log('确 定');
            // this.$emit('eventClick', this.dialogVisible);
        }
    }
};
</script>

<style lang="less" module>

</style>
