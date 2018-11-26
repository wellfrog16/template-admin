<template>
    <div :class="$style.breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 路由生成菜单-->
            当前位置：
            <el-breadcrumb-item
                v-for="(item, index) in breadcrumbList"
                :to="{path:item.router}"
                :key="index">
                <span :class="$style.brliet">
                    {{ item.label }}
                </span>
            </el-breadcrumb-item>

        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    props: ['breadcrumbList'],
    data() {
        return {};
    },
    methods: {}
};
</script>
<style lang="less" module>
    .breadcrumb {
        height: 35px;
        display: flex;
        justify-content: space-between;
        .brliet {
            color: #fff !important;
        }
    }
</style>
