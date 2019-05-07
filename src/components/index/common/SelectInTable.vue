<template>
    <div style="display: flex; align-items:center;" class="select-in-table">
        <el-select v-model="scope.row[item.field]">
            <el-option v-for="(item, index) in conOptions" :key="index" :value="item" :label="item"></el-option>
        </el-select>
    </div>
</template>

<script>
export default {
    props: {
        scope: {
            type: Object,
            default() {
                return {};
            }
        },
        item: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    components: {},
    mixins: [],
    data() {
        return {
            conOptions: ['>=', '<=']
        };
    },
    computed: {},
    methods: {
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    }
};
</script>

<style lang="less" scoped>

</style>
