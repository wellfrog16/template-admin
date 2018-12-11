<template>
    <div style="display: flex; align-items:center;" class="input-in-table">
        <el-input v-model="scope.row[item.field]" size="mini"
                  :readonly="otherProps.disabled"></el-input>
        <span v-if="otherProps.unit">{{ otherProps.unit }}</span>
    </div>
</template>

<script>
export default {
    props: {
        otherProps: {
            type: Object,
            default() {
                return {
                    disabled: false,
                    unit: ''
                };
            }
        },
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

<style lang="less" scoped>
    .input-in-table {
        input {
            text-align: center;
        }
    }
</style>
