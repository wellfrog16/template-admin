<template>
    <div :class="$style.nav">
        <div :class="$style.nav_log"></div>
        <!-- <div :class="$style.user_role">
            <el-input :class="$style.search " type="text"></el-input>
            <p>
                <i :class="[$style.switch, 'fas fa-bars fa-lg']"></i>Home
            </p>
            <p>
                <i :class="[$style.switch, 'fas fa-bars fa-lg']"></i>管理员
            </p>

        </div> -->
    </div>
</template>

<script>
export default {
    name: 'nav'
};
</script>

<style lang="less" module>
    @import '../../../assets/style/config.less';

    @height: 60px;
    .nav {
        width: 100%;
        height: @height;
        border-bottom: 1px solid #0763edf0;
        .nav_log {
            background: url('../../../assets/img/common/top.gif') no-repeat;
            width: 100%;
            height: 100%;
            min-width: 1000px;
            z-index: -10;
            zoom: 1;
            background-color: #fff;
            background-repeat: no-repeat;
            background-size: cover;
            -webkit-background-size: cover;
            -o-background-size: cover;
            background-position: center 0;
        }
        .user_role {
            float: right;
            font-size: 14px;
            color: #fff;
            position: relative;
            top: -96px;
            width: 300px;
            p, .search {
                float: left;
            }
        }
    }
</style>
