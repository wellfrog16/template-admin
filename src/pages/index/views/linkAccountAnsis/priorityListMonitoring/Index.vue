<template>
    <div :class="$style.black_list">
        <s-card :title="`重点跟踪名单池`" :icon="`fa fa-chart-line`">
            <div slot="content">
                <s-table
                    rowClassName="self_color"
                    ref="selfTables1"
                    :height="340"
                    :loading="loadingAR"
                    :columns="columnsList"
                    :tableData="tableData"
                >
                </s-table>
                <div style="text-align:center; margin-top: 20px; width: 100%;">
                    <el-button
                        size="small"
                        type="primary"
                        @click="exporstClick">
                        设置监控指标
                    </el-button>
                </div>
                <el-dialog
                    width="75%"
                    :before-close="closeData"
                    title="预警指标配置"
                    :visible.sync="dialogVisible"
                >
                    <s-table
                        ref="selfTables1"
                        :height="260"
                        :loading="loadingAR"
                        :columns="dialogList"
                        :tableData="dialogData"
                    >
                    </s-table>
                    <div slot="footer" :class="$style.dialog_footer">
                        <el-button @click="dialogCancelClick">取消</el-button>
                        <el-button type="primary" @click="dialogConfirmClick">确定</el-button>
                    </div>
                </el-dialog>
            </div>
        </s-card>
        <black-list1></black-list1>
        <black-list2></black-list2>
    </div>
</template>

<script>
import InputInTable from '@/components/index/common/InputInTable';
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import BlackList1 from './components/blacklist1';
import BlackList2 from './components/blacklist2';
export default {
    name: 'Index',
    components: {SCard, STable, BlackList1, BlackList2},
    data() {
        return {
            loadingAR: false,
            columnsList: [
                {field: 'time1', label: '级别', minWidth: 130, align: 'center'},
                {field: 'time2', label: '监控账户', minWidth: 130, align: 'center'},
                {field: 'time3', label: '标的', minWidth: 130, align: 'center'},
                {field: 'time4', label: '来源', minWidth: 130, align: 'center'},
                {field: 'time5', label: '用户画像', minWidth: 130, align: 'center'},
                {field: 'time6', label: '持仓量', minWidth: 130, align: 'center'},
                {field: 'time7', label: '外部数据验证标记(失信+违法)', minWidth: 130, align: 'center'}
            ],
            tableData: [
                {'time1': '高级', 'time2': '20181205协查名单', 'time3': 'all', 'time4': '历史黑名单', 'time5': '正常', 'time6': '', 'time7': '1'},
                {'time1': '中级', 'time2': '20181206协查名单', 'time3': '沪铜1901', 'time4': '关联账户', 'time5': '异常', 'time6': '', 'time7': ''},
                {'time1': '低级', 'time2': '20181207协查名单', 'time3': '螺钢1901', 'time4': '超仓分析', 'time5': '正常', 'time6': '', 'time7': ''},
                {'time1': '正常', 'time2': '', 'time3': '', 'time4': '自成交分析', 'time5': '正常', 'time6': '', 'time7': ''},
                {'time1': '', 'time2': '', 'time3': '', 'time4': '高频交易', 'time5': '正常', 'time6': '', 'time7': ''}
            ],
            dialogVisible: false,
            dialogList: [
                {field: 'time1', label: '指标名称', minWidth: 130, align: 'center'},
                {field: 'time2', label: '历史参考值', minWidth: 130, align: 'center'},
                {field: 'time3', label: '阈值设置', minWidth: 130, align: 'center', template: InputInTable},
            ],
            dialogData: [
                {'time1': '交易次数', 'time2': '300', 'time3': '300'},
                {'time1': '持仓量', 'time2': '500W', 'time3': '500W'},
            ]
        };
    },
    methods: {
        rowClass({row, rowInde}) {
            if (row.time1 === '高级') {
                console.log(rowInde);
                return 'self_color';
            }
            // else if (row.time1 === '中级') {
            //     return 'backgtound: #999';
            // } else if (row.time1 === '低级') {
            //     return 'background: #fff';
            // }
        },
        // 设置监控指标-弹框
        exporstClick() {
            this.dialogVisible = true;
        },
        // 清空弹框数据
        closeData(done) {
            this.dialogVisible = false;
        },
        // 取消 弹框数据
        dialogCancelClick() {
            this.dialogVisible = false;
        },
        // 确认 确认数据
        dialogConfirmClick() {
            this.dialogVisible = false;
        }
    },
    mounted() {
    },
};
</script>

<style lang="less" module>
.black_list {
    width: 100%;
    :global(.el-dialog__body) {
        padding: 10px 20px;
    }
    :global(.el-dialog__footer) {
        background: #0e274f;
        color: #fff;
        padding: 0 20px 20px;
        text-align: center;
    }
    .self_color {
        background-color: red !important;
        color: blue;
    }
}
</style>
