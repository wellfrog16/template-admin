<template>
    <div class="consenusus-tags">
        <el-tag v-for="(item, index) in scope.row[item.field]" :key="index" type="warning" style="margin-left: 5px;">{{ item }}</el-tag>
    </div>
</template>

<script>
export default {
    name: 'consenusus-tags',
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

<style lang="less" module>
    .consenusus-tags {
        text-align: center;
        &:focus {
            outline: none;
        }
    }
</style>
