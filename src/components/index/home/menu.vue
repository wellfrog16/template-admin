<template>
    <el-menu router
             unique-opened
             :default-active="activeMenu"
             :collapse="collapse"
             :text-color="textColor"
             :active-text-color="activeTextColor"
    >
        <el-menu-item @click="toggleMode" index="" class="col-button">
            <i class="fas fa-arrow-circle-left menu-fix-icon" v-if="!collapse"></i>
            <i class="fas fa-arrow-circle-right menu-fix-icon" v-else></i>
            <span slot="title">{{ collapse ? '显示' : '隐藏' }}</span>
        </el-menu-item>

        <template v-for="(item, index) in data">

            <!-- 无二级子节点 -->
            <el-menu-item v-if="!item.children && !item.hidden" :index="item.name" :key="index">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>

            <!-- 有二级子节点 -->
            <el-submenu v-if="item.children && !item.hidden" :index="item.name" :key="index">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{ item.label }}</span>
                </template>
                <template v-for="(item1, index1) in item.children">
                    <!-- 无三级菜单 -->
                    <el-menu-item v-if="!item1.children && !item.hidden" :index="item1.name" :key="index1">
                        <i :class="item1.icon"></i>{{ item1.label }}
                    </el-menu-item>

                    <!-- 有三级菜单 -->
                    <template v-if="item1.children && !item.hidden">
                        <el-submenu :index="item1.name" :key="index1">
                            <template slot="title">
                                <i :class="item1.icon"></i>
                                <span>{{ item1.label }}</span>
                            </template>
                            <el-menu-item
                                v-show="!item2.hidden"
                                v-for="(item2, index2) in item1.children"
                                :index="item2.name"
                                :key="index2">
                                <i :class="item2.icon"></i>{{ item2.label }}
                            </el-menu-item>
                        </el-submenu>
                    </template>
                </template>
            </el-submenu>
            <!--  -->
        </template>
        <el-menu-item @click="handleLoginOut" index="" class="col-button">
            <i class="fas fa-sign-out-alt menu-fix-icon"></i>
            <span slot="title">登出</span>
        </el-menu-item>
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
            activeMenu: null
        };
    },
    watch: {
        '$route.name': {
            handler(val) {
                this.activeMenu = val;
            }
        }
    },
    methods: {
        toggleMode() {
            this.$emit('toggleMode');
            // this.collapse = !this.collapse;
        },
        handleLoginOut() {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_NAME');
            this.$router.push({name: 'login'});
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
