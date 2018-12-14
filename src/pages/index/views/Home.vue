<template>
    <div :class="$style.container">
        <head-top></head-top>
        <el-container :class="$style.containers">
            <el-aside :class="$style.aside" :style="{'width': width}">
                <aside-menu
                    class="aside-menu"
                    :data="menuData"
                    :collapse="collapse"
                    background-color="#1f2d3d"
                    text-color="#fff"
                    @toggleMode="toggleMode"
                />
            </el-aside>
            <div
                :class="[$style.bread_css]"
                :style="{'left': width, 'width': `calc(100% - ${width})`}"
            >
                <s-breadbreadcrumb :breadcrumbList="menuData"></s-breadbreadcrumb>
            </div>
            <div
                :class="[$style.maicontainersn]"
                :style=" {'width': `calc(100% - ${width})`}"
                id="main-container"
            >
                <el-main>
                    <router-view/>
                    <!-- <bottom-operate-button></bottom-operate-button> -->
                </el-main>
            </div>
        </el-container>
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
        HeadTop: () => import('@/components/index/home/headTop.vue')
    },
    data() {
        return {
            width: '200px',
            collapse: false,
            menuData: menu.filter(this.$router.options.routes)
        };
    },
    methods: {
        toggleMode() {
            // const swit = this.$jquery(`.${this.$style.switch}`);
            // const target = this.$jquery(`.${this.$style.logo} span`);
            // if (this.collapse) {
            //     setTimeout(() => target.show(), 100);
            //     swit.removeClass(this.$style['switch-tran']);
            // } else {
            //     target.hide();
            //     swit.addClass(this.$style['switch-tran']);
            // }
            this.collapse = !this.collapse;
            if (this.collapse) {
                this.width = '64px';
            } else {
                this.width = '200px';
            }
        }
    },
    mounted() {}
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
@width: 200px;

.container {
    width: 100%;
    height: 100vh;
    background: url("../../../assets/img/common/bj.jpg") no-repeat;
    background-size: cover;
}

.containers {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    position: relative;
}

.aside {
    background-color: rgba(0, 11, 32, 0.4);
    height: 1080px;
}

.bread_css {
    position: absolute;
    top: 0;
}

.maicontainersn {
    color: #fff;
    overflow: auto;
    margin-bottom: 50px;
    margin-top: 45px;
    width: calc(100% - @width);
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
    background-color: hsl(219, 77%, 18%);
}
</style>
