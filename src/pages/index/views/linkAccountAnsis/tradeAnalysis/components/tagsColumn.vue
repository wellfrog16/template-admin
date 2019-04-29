<template>
    <div class="tags-column">
        <el-tag type="warning" size="small" v-for="(item, index) in scope.row[item.field]" :key="index">{{ item.name }}</el-tag>
    </div>
</template>

<script>
export default {
    name: 'tagsColumn',
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
        // handleClick() {
        //     this.$emit('handlerChange', {row: this.scope.row, item: this.item});
        // }
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
    .tags-column {
        text-align: center;
        &:focus {
            outline: none;
        }
    }
</style>
