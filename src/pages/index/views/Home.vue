<template>
    <el-container :class="$style.container">
        <el-aside :class="$style.aside" style="width:200px;">
        </el-aside>
        <el-container>
            <el-header :class="$style.header">
                11111111
            </el-header>
            <el-main :class="$style.main">
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default { };
</script>

<style lang="less" module>
@import '../../../assets/style/config.less';

.container {
    height: 100vh;
}

.aside {
    width: 200px;
    background-color: @g-color-primary;
}

.header {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid @g-color-border4;
}

.main {
    background-color: #f0f2f5;
}
</style>