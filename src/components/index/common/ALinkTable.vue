<template>
    <div class="a-input-link-table">
        <a @click="handleClick">{{ scope.row.a1 }}</a>
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
            window.open(`#/newsDetails?custId=${this.scope.row.a1}`);
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
    .a-input-link-table {
        text-align: center;
        &:focus {
            outline: none;
        }
    }
</style>
