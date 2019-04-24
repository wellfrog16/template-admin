<template>
    <div class="click-on-table-cell">
        <a @click="handleClick" style="cursor: pointer;">{{ scope.row[item.field] }}</a>
    </div>
</template>

<script>
export default {
    name: 'ALinkTable',
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
        handleClick() {
            this.$emit('handlerChange', {row: this.scope.row, item: this.item});
        }
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
    .click-on-table-cell {
        text-align: center;
        &:focus {
            outline: none;
        }
    }
</style>
