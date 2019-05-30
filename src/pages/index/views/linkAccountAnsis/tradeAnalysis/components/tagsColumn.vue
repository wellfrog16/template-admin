<template>
    <div class="consenusus-tags">
        <el-tag v-show="item.name" v-for="(item, index) in tags" :key="index" size="small" :type="item.type === '0' ? 'warning' : item.type==='1' ? 'danger' : 'success'" style="margin-left: 5px;">{{ item.name }}</el-tag>
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
    computed: {
        tags() {
            if (this.scope.row[this.item.field]) {
                let tags = this.scope.row[this.item.field].split(',');
                return tags.map(tag => {
                    return {
                        type: tag.indexOf('|') > -1 ? tag.split('|')[0] : '',
                        name: tag.indexOf('|') > -1 ? tag.split('|')[1] : tag,
                    };
                });
            }
            return [];
        }
    },
    components: {},
    mixins: [],
    data() {
        return {
        };
    },
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
