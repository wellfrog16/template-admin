<template>
    <div :class="$style.head_top">
        <div :class="$style.head_top_log"></div>
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
    name: 'headTop'
};
</script>

<style lang="less" module>
    @import '../../../assets/style/config.less';

    @height: 60px;
    .head_top {
        width: 100%;
        height: @height;
        .head_top_log {
            background: url('../../../assets/img/common/top_logo.png') no-repeat;
            width: 100%;
            height: @height;
            z-index: -10;
            zoom: 1;
            background-size: cover;
            background-position: center center;
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
