<template>
    <div :class="$style.breadcrumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <!-- 路由生成菜单-->
            <span :class="$style.brliet"><i class="el-icon-location-outline" style="margin-right: 8px;"></i>当前位置：</span>
            <el-breadcrumb-item
                v-for="(item, index) in currentBreamList"
                :to="{path: item.path}"
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
    props: {
        breadcrumbList: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            currentBreamList: []
        };
    },
    watch: {
        '$route': {
            handler(val) {
                this.dealData();
            }
        },
        'deep': true
    },
    methods: {
        selfRemove(array, val) {
            var index = array.indexOf(val);
            if (index > -1) {
                array.splice(index, 1);
            }
        },
        dealData(data) {
            let routeName = this.$route.name;
            let currentBreamList = [];
            const traverse = data => {
                for (let i = 0; i < data.length; i++) {
                    let v = data[i];
                    if (v.name === routeName) {
                        currentBreamList.push(v);
                        return currentBreamList;
                    }
                    if (v.children && v.children.length) {
                        currentBreamList.push(v);
                        let rs = traverse(v.children);
                        if (rs) {
                            return rs;
                        } else {
                            this.selfRemove(currentBreamList, v);
                        }
                    }
                }
                return false;
            };
            traverse(this.breadcrumbList);
            this.currentBreamList = currentBreamList;
        },
    },
    mounted() {
        this.dealData();
    }
};
</script>
<style lang="less" module>
    .breadcrumb {
        height: 35px;
        line-height: 35px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 10px 15px;
        padding-left: 20px;
        background: url('../../../assets/img/usr/breadcrumb_bg.png') no-repeat left;
        .brliet {
            color: #fff !important;
            font-weight: 700;
        }
    }
</style>
