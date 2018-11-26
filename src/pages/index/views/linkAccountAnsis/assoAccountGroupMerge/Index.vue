<template>
    <div class="asso-account-group-merge">
        <el-tabs type="card">
            <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name" :label="item.label">
                <div></div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tabs: [
                {name: '0', label: '1111'},
                {name: '1', label: '2222'},
            ]
        };
    }
};
</script>
<style lang="less" scoped>
    .asso-account-group-merge {
        background: transparent;
    }
</style>
