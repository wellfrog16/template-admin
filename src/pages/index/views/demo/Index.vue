<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="Echarts" name="tab-a">
                <echarts />
            </el-tab-pane>
            <el-tab-pane label="Mockjs" name="tab-b">
                <mock />
            </el-tab-pane>
            <el-tab-pane label="角色管理" name="tab-c">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿" name="tab-d">定时任务补偿</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import echarts from '@/components/index/demo/echarts.vue';
import mock from '@/components/index/demo/mock.vue';

export default {
    components: {echarts, mock},
    data() {
        return {
            activeName: 'tab-a'
        };
    },
    mounted() {
    },
    methods: {
        handleClick() {
            console.log(34234);
        }
    }
};
</script>

<style lang="less">

</style>
