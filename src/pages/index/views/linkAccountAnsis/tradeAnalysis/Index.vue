<template>
    <div class="trade-analysis-main">
        <!-- 查询条件 -->
        <query-block @handleConfirmQuery="handleConfirmQuery"></query-block>
        <!-- 事件分析模块 -->
        <s-card title="事件分析" icon="fa fa-file-contract">
            <div slot="content">
                <event-analysis></event-analysis>
            </div>
        </s-card>
        <!-- 用户列表模块 -->
        <s-card title="用户列表" icon="fa fa-user">
            <div slot="content">
                <user-list></user-list>
            </div>
        </s-card>
        <!-- 异常行为分析 -->
        <s-card title="异常行为分析" icon="fa fa-file-invoice-dollar">
            <div slot="content">
                <abnorma-analysis></abnorma-analysis>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import queryBlock from './components/queryBlock';
import userList from './components/userList';
import abnormaAnalysis from './components/abnormaAnalysis';
import eventAnalysis from './components/eventAnalysis';
export default {
    components: {
        SCard,
        queryBlock,
        userList,
        abnormaAnalysis,
        eventAnalysis
    },
    data() {
        return {
            ruleForm: {}
        };
    },
    methods: {
        handleConfirmQuery(ruleForm) {
            console.log(ruleForm);
            this.ruleForm = ruleForm;
            // todo get user list
            // todo get event analysis
        },
    }
};
</script>
<style lang="less" scoped>
</style>
