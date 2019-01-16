<template>
    <s-card :title="`美油分时图`" :icon="`fa fa-search`">
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
                        style="width: 100%;"
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
                    <dialog-a-r3></dialog-a-r3>
                </el-col>
                <el-col :span="12">
                    <dialog-a-r4></dialog-a-r4>
                </el-col>
            </el-row>
            <div slot="footer" :class="$style.dialog_footer">
                <el-button @click="dialogCancelClick">取 消</el-button>
                <el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
            </div>
        </el-dialog>
        <echarts-common
            slot="content"
            :loading="loading2"
            ref="echartsDemo2"
            domId="echartsId2"
            :defaultOption="chartOptions2"
            :propsChartHeight="420">
        </echarts-common>
    </s-card>
</template>

<script>
import MiniIndex from './miniIndex';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR3 from './dialogAR1';
import DialogAR4 from './dialogAR2';
export default {
    name: 'chartAR2',
    components: {SCard, EchartsCommon, DialogAR3, DialogAR4},
    props: {
    },
    data() {
        return {
            currentRow: null,
            loading2: false,
            dialogVisible: false,
            chartOptions2: {}
        };
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    mixins: [MiniIndex],
    computed: {},
    mounted() {
    },
    methods: {
        closeData(done) {
            done();
            this.dialogVisible = false;
            this.flagValue = '';
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
            this.flagValue = '';
        },
        // 确 定
        dialogConfirmClick() {
            if (String(this.flagValue) !== '' && this.ruleForm.timeWindow !== '') {
                this.dialogVisible = false;
                console.log(this.ruleForm.timeWindow);
                console.log(this.tableData3);
            } else {
                this.dialogVisible = true;
            }
        },
        dialogClick() {
            this.dialogVisible = true;
            this.flagValue = '';
        },
        handleSelectionChange(val) {
            console.log(val);
        }
    },
};
</script>

<style lang="less" module>
    .dia_name {
        .demo_rule_form {
            width: 65%;
        }
        :global(.el-dialog__header) {
            padding: 0;
        }
        :global(.el-dialog__body) {
            padding: 10px 20px;
        }
        :global(.el-dialog__footer) {
            background: #0e274f;
            color: #fff;
            padding: 0 20px 20px;
            text-align: center;
        }
    }
</style>
