<template>
    <div :class="$style.head_top" @click="goHome">
        <div :class="$style.head_top_log">
            <div :class="$style.top_container">
                <!-- <el-tooltip class="item" effect="dark" placement="bottom">
                    <div :class="$style.user_img"><i class="fa fa-user"></i></div>
                    <div slot="content">{{ userName }}</div>
                </el-tooltip> -->
                <div :class="$style.user_name">欢迎您！{{ userName }}</div>
                <el-tooltip class="item" effect="dark" placement="bottom">
                    <div :class="$style.login_out" @click.stop="goHome"><i class="fa fa-home"></i></div>
                    <div slot="content">首页</div>
                </el-tooltip>
                <el-popover :popper-class="$style.popper_class" placement="bottom"
                            width="300"
                            trigger="hover">
                    <div slot="reference" :class="$style.login_out" @click.prevent.stop="() => {return;}"><i class="fa fa-sitemap"></i></div>
                    <div>
                        <el-row :gutter="10">
                            <el-col :span="12" v-for="(item, index) in topNavList" :key="index"
                                    style="margin: 5px 0; cursor: pointer; text-align: center;">
                                <el-card>
                                    <span @click="handleRouterLink(item)">{{ item.name }}</span>
                                </el-card>
                            </el-col>
                        </el-row>
                    </div>
                </el-popover>
                <el-tooltip class="item" effect="dark" placement="bottom">
                    <div :class="$style.login_out" @click.stop="handleLoginOut"><i class="fa fa-sign-out-alt"></i></div>
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
            userName: localStorage.getItem('USER_NAME') || '',
            topNavList: [
                {name: '研究支撑平台', link: ''},
                {name: '监管科技工具集', link: 'toolsHome'},
                {name: '国际化应用', link: ''},
                {name: '行业应用', link: ''},
            ]
        };
    },
    methods: {
        handleLoginOut() {
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_NAME');
            this.$router.push({name: 'login'});
            this.$message.success('登出成功');
        },
        goHome() {
            this.$router.push({name: 'login', query: {loginFlag: true}});
        },
        handleRouterLink(item) {
            if (item.link) {
                console.log(item.link);
                this.$router.push({name: item.link});
            }
        }
    }
};
</script>

<style lang="less" module>
    @import '../../../assets/style/config.less';

    @height: 60px;
    .head_top {
        cursor: pointer;
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
