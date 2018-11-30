<template>
    <el-menu router
             :collapse="collapse"
             :text-color="textColor"
             :active-text-color="activeTextColor"
    >
        <el-menu-item @click="toggleMode" index="" class="col-button">
            <i class="fas fa-bars fa-lg"></i>
            <span slot="title" style="margin-left:20px;">折叠</span>
        </el-menu-item>

        <template v-for="(item, index) in data">

            <!-- 无二级子节点 -->
            <el-menu-item v-if="!item.children && !item.hidden" :index="item.path" :key="index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

            <!-- 有二级子节点 -->
            <el-submenu v-if="item.children && !item.hidden" :index="item.label" :key="index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                </template>
                <template v-for="(item1, index1) in item.children">
                    <!-- 无三级菜单 -->
                    <el-menu-item v-if="!item1.children" :index="`${item.path}${item1.path}`" :key="index1">
                        <i :class="item1.icon"></i>{{ item1.label }}
                    </el-menu-item>

                    <!-- 有三级菜单 -->
                    <template v-if="item1.children">
                        <el-submenu :index="item1.label" :key="index1">
                            <template slot="title">
                                <i :class="item1.icon"></i>
                                <span>{{ item1.label }}</span>
                            </template>
                            <el-menu-item
                                v-for="(item2, index2) in item1.children"
                                :index="`${item.path}${item1.path}${item2.path}`"
                                :key="index2">
                                <i :class="item2.icon"></i>{{ item2.label }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </template>
            </el-submenu>
            <!--  -->
        </template>
    </el-menu>
</template>

<script>
// todo: 三级菜单通用组件化
export default {
    props: {
        'data': {type: Array, default: () => []},
        'collapse': {type: Boolean, default: false},
        'text-color': {type: String, default: '#303133'},
        'active-text-color': {type: String, default: '#409eff'}
    },
    data() {
        return {
            // collapse: false
        };
    },
    methods: {
        toggleMode() {
            this.$emit('toggleMode');
            // this.collapse = !this.collapse;
        }
    }
};
</script>
<style lang="less">
    .col-button {
        background: transparent;
        &.is-active {
            background: transparent;
        }
        &:hover {
            background: transparent;
        }
        &:focus {
            background: transparent;
        }
        &:active {
            background: transparent;
        }
        &:visited {
            background: transparent;
        }
    }
</style>
