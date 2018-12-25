<template>
    <div :class="$style.head_top">
        <div :class="$style.head_top_log">
            <div :class="$style.top_container">
                <el-tooltip class="item" effect="dark" placement="bottom">
                    <div :class="$style.user_img"><i class="fa fa-user"></i></div>
                    <div slot="content">{{ userName }}</div>
                </el-tooltip>
                <div :class="$style.user_name">欢迎您登陆！{{ userName }}</div>
                <el-tooltip class="item" effect="dark" placement="bottom">
                    <div :class="$style.login_out" @click="handleLoginOut"><i class="fa fa-sign-out-alt"></i></div>
                    <div slot="content">登出</div>
                </el-tooltip>
            </div>
        </div>

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
    name: 'headTop',
    data() {
        return {
            userName: localStorage.getItem('USER_NAME')
        };
    },
    methods: {
        handleLoginOut() {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_NAME');
            this.$router.push({name: 'login'});
            this.$message.success('登出成功');
        }
    }
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
        .top_container {
            height: 60px;
            display: flex;
            line-height: 60px;
            justify-content: flex-end;
            align-items: center;
            color: #00cfff;
            padding-right: 20px;
            .user_img {
                border-radius: 50%;
                width: 45px;
                height: 45px;
                background: rgba(255, 255, 255, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
                cursor: pointer;
                i {
                    font-size: 16px;
                }
            }
            .user_name {
                margin-left: 5px;
            }
            .login_out {
                margin-left: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                i {
                    font-size: 24px;
                }
            }
        }
    }
</style>
