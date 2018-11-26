<template>
    <div :class="$style.container">
        <head-top></head-top>
        <div :class="$style.containers">
            <div :class="$style.middle">
                <el-aside :class="$style.aside" :width="width">
                    <aside-menu
                        class="aside-menu"
                        :data="menuData"
                        :collapse="collapse"
                        background-color="#1f2d3d"
                        text-color="#fff"/>
                </el-aside>
                <el-main :class="$style.maicontainersn">
                    <s-breadbreadcrumb :breadcrumbList="menuData"></s-breadbreadcrumb>
                    <router-view/>
                    <!-- <bottom-operate-button></bottom-operate-button> -->
                </el-main>
            </div>
        </div>
    </div>
</template>

<script>
import AsideMenu from '@/components/index/home/menu';
// import BottomOperateButton from '@/components/index/home/BottomOperateButton';
import menu from '@/helper/menu';
import SBreadbreadcrumb from '@/components/index/home/SBreadbreadcrumb';

export default {
    components: {
        AsideMenu,
        SBreadbreadcrumb,
        // BottomOperateButton,
        HeadTop: () => import('@/components/index/home/headTop.vue'),
    },
    data() {
        return {
            width: '200',
            collapse: false,
            menuData: menu.filter(this.$router.options.routes)
        };
    },
    methods: {
        toggle() {
            const swit = this.$jquery(`.${this.$style.switch}`);
            const target = this.$jquery(`.${this.$style.logo} span`);
            if (this.collapse) {
                setTimeout(() => target.show(), 100);
                swit.removeClass(this.$style['switch-tran']);
            } else {
                target.hide();
                swit.addClass(this.$style['switch-tran']);
            }
            this.collapse = !this.collapse;
        }
    }
};
</script>

<style>
    .aside-menu:not(.el-menu--collapse) {
        width: 100%;
        border-right: solid 0;
    }
</style>

<style lang="less" module>
    @import '../../../assets/style/config.less';
    @height: 60px;

    .container {
        width: 100%;
        height: 100vh;
        background: url('../../../assets/img/common/bj.jpg') no-repeat;
        background-size: cover;
    }

    .containers {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
        position: relative;
        overflow: auto;
    }
    .aside {
        background: url('../../../assets/img/common/meunbj.png') no-repeat;
        height: 1080px;
        width: 200px;
        box-shadow: 0 0 10px #326fcb;
        position: fixed;
    }
    .middle {
        display: flex;
    }
    .maicontainersn {
        width: calc(100% - 180px);
        height: 100%;
        color: #fff;
        margin-left: 200px;
        margin-bottom: 30px;
    }

    .switch {
        cursor: pointer;
        transition: all 0.2s;
    }

    .switch-tran {
        transform: rotate(90deg);
        transition: all 0.2s;
    }

    .main {
        background-color: #0b2453;
    }
</style>
