<template>
    <div style="display: flex; align-items:center;" class="self-column-in-table">
        <a @click="handleClick">{{ scope.row.custId }}</a>
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
        };
    },
    computed: {},
    methods: {
        handleClick() {
            window.open(`#/customerInformationInquiry?custId=${this.scope.row.custId}`);
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

<style lang="less" scoped>
    .self-column-in-table {
        text-align: center;
        &:focus {
            outline: none;
        }
    }
</style>
