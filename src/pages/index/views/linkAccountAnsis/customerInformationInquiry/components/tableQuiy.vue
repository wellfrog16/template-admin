<template>
    <el-table
        :data="tableData"
        border
        height="410"
        style="width: 100%;">
        <el-table-column
            v-for="(item,index) in tableColumns"
            :key="item.field" :prop="item.field" :label="item.title" :align="item.align"
            :min-width="item.width">
        </el-table-column>
    </el-table>
</template>

<script>
    export default {
        name: "tableQuiy"
    }
</script>

<style scoped>

</style>
