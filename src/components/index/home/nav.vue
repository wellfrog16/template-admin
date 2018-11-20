<template>
    <div :class="$style.nav">
        <div :class="$style.nav_log"></div>
    </div>
</template>

<script>
    export default {
        name: "nav"
    }
</script>

<style lang="less" module>
    @import '../../../assets/style/config.less';

    @height: 60px;
    .nav {
        width: 100%;
        height: @height;
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
    }
</style>
