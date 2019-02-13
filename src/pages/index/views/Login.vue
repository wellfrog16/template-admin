<template>
    <div class="login-page">
        <div class="banner" style="position:fixed; top: 0; left:0; z-index:111; background: rgba(2, 49, 88, 0.6); padding: 10px 0;">
            <div class="main-width">
                <div class="logo">
                    <img src="../../../assets/img/usr/login/logo.png" alt="">
                </div>
                <div class="login-btn" @click="handleLogin" v-if="!loginFlag">
                    <el-button type="primary">登录</el-button>
                    <!-- <img src="../../../assets/img/usr/login/login.png" alt=""><span>登录</span> -->

                </div>
                <div class="top_container" v-else>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <div class="user_img"><i class="fa fa-user"></i></div>
                        <div slot="content">{{ ruleForm.userName }}</div>
                    </el-tooltip>
                    <div class="user_name">欢迎您登陆！{{ ruleForm.userName }}</div>
                    <el-tooltip class="item" effect="dark" placement="bottom">
                        <div class="login_out" @click="handleLoginOut"><i class="fa fa-sign-out-alt"></i></div>
                        <div slot="content">登出</div>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div class="main-content">
            <div class="main-width">
                <div class="top-content">
                    <h3>上期所大数据监管科技平台</h3>
                    <h5>数字上期 智慧期市</h5>
                    <el-button size="small" @click="handleDetail">了解详情</el-button>
                    <div class="login-area" v-if="showLoginDialog">
                        <el-form ref="ruleForm" :model="ruleForm" label-width="70px" @keyup.enter.native="handleConfirm('loginFormId')">
                            <el-form-item prop="userName" label="用户名:" :rules="[{
                                required: true, message: '请输入用户名'
                            }]">
                                <el-input class="custom-width" size="small" v-model="ruleForm.userName" clearable></el-input>
                            </el-form-item>
                            <el-form-item prop="password" label="密码:" :rules="[{
                                required: true, message: '请输入密码'
                            }]">
                                <el-input class="custom-width" size="small" v-model="ruleForm.password" clearable type="password"></el-input>
                            </el-form-item>
                        </el-form>
                        <div style="text-align:center;">
                            <el-button type="primary" @click="handleConfirm" :loading="fullScreenLoading">登录</el-button>
                        </div>
                    </div>
                </div>
                <div class="bottom-content">
                    <div class="div1">研究支撑平台</div>
                    <div class="div2" @click="cardClick">监管科技工具集</div>
                    <div class="div3">国际化应用</div>
                    <div class="div4">行业应用</div>
                </div>
            </div>
        </div>
        <!-- <el-dialog :visible="showLoginDialog" center @close="handleCloseDialog" top="10%">
            <div class="login-dialog">
                <el-form ref="ruleForm" :model="ruleForm" label-width="140px">
                    <el-form-item prop="userName" label="用户名:" :rules="[{
                        required: true, message: '请输入用户名'
                    }]">
                        <el-input class="custom-width" size="small" v-model="ruleForm.userName" clearable></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码:" :rules="[{
                        required: true, message: '请输入密码'
                    }]">
                        <el-input class="custom-width" size="small" v-model="ruleForm.password" clearable type="password"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot=footer>
                <el-button type="primary" size="small" @click="handleConfirm">确定</el-button>
                <el-button type="default" size="small" @click="handleCancle">取消</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
// import {saveAuthedInfos, saveRealName} from '@/utils/storageUtil';
import {getAccessToken} from '@/api/login';
export default {
    data() {
        return {
            loginFlag: false,
            showLoginDialog: false,
            fullScreenLoading: false,
            ruleForm: {
                userName: localStorage.getItem('USER_NAME') || '',
                password: ''
            }
        };
    },
    methods: {
        handleDetail() {

        },
        handleCloseDialog() {
            this.showLoginDialog = false;
        },
        handleLogin() {
            if (this.loginFlag === true) {
                this.showLoginDialog = false;
                this.$message.error('您已登陆!');
            } else {
                this.showLoginDialog = true;
            }
        },
        handleCancle() {
            this.handleCloseDialog();
        },
        handleConfirm() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    // 请求token
                    this.getLogin();
                }
            });
        },
        getLogin() {
            this.mainContent = true;
            let params = {
                username: this.ruleForm.userName.toLowerCase(),
                password: this.ruleForm.password
            };
            this.fullScreenLoading = true;
            getAccessToken(params).then(resp => {
                localStorage.setItem('ACCESS_TOKEN', resp.access_token);
                localStorage.setItem('USER_NAME', params.username);
                this.$store.commit('saveAccessToken', resp.access_token);
                // this.$router.push({path: '/sceneConfig'});
                this.loginFlag = true;
                this.showLoginDialog = false;
            }).catch(e => {
                console.error(e);
                this.showLoginDialog = false;
            });
        },
        cardClick() {
            if (this.loginFlag) {
                this.$router.push({name: 'toolsHome'});
            } else {
                this.$message.error('您还未登录!');
            }
        },
        handleLoginOut() {
            this.loginFlag = false;
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_NAME');
            this.$message.success('登出成功');
        }
    },
    mounted() {
        let {loginFlag} = this.$route.query;
        this.loginFlag = loginFlag && this.ruleForm.userName;
    }
};
</script>

<style lang="less" scoped>
    .login-page {
        width: 100%;
        height: 100%;
        color: #fff;
        position: relative;
        .top_container {
            height: 60px;
            display: flex;
            line-height: 60px;
            justify-content: flex-end;
            align-items: center;
            color: #00cfff;
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
                margin-left: 25px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                i {
                    font-size: 24px;
                }
            }
        }
        .main-width {
            max-width: 1280px;
            margin: 0 auto;
        }
        .login-dialog {
            background: transparent;

            .custom-width {
                width: 350px;
            }
        }

        .banner {
            width: 100%;
            overflow: hidden;
            .main-width {
                display: flex;
                justify-content: space-between;
            }

            .logo {
                flex: 1;
                line-height: 60px;
                margin-left: 20px;

                img {
                    vertical-align: middle;
                }
            }

            .login-btn {
                flex: 1;
                line-height: 60px;
                text-align: right;
                margin-right: 20px;
                cursor: pointer;

                img {
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                }

                span {
                    margin-left: 8px;
                }
            }
        }

        .main-content {
            width: 100%;
            height: 100%;
            position: fixed;
            background: url('../../../assets/img/usr/login/content_bg.png') no-repeat;
            background-size: cover;
            overflow: hidden;

            .top-content {
                text-align: center;
                position: absolute;
                top: 32%;
                left: 50%;
                width: 100%;
                transform: translate(-50%, -32%);

                h3 {
                    color: #d7e7fa;
                    font-size: 72px;
                    font-weight: 400;
                    opacity: 0.9;
                }

                h5 {
                    color: #cbdaec;
                    font-size: 24px;
                    margin: 0;
                    font-weight: 400;
                }

                button {
                    margin-top: 50px;
                    color: #d7e7fa;
                    font-size: 14px;
                    background: url('../../../assets/img/usr/login/detail_btn_bg.png') no-repeat;
                    background-size: cover;
                }
            }

            .login-area {
                width: 400px;
                position: absolute;
                right: 10%;
                top: 50%;
                padding: 30px;
                box-shadow: 3px 0 15px rgb(31, 82, 170, 0.75);
                /deep/ .el-form-item__label {
                    color: #ddeaf9;
                }

                /deep/ .el-input__inner {
                    background: transparent;
                    color: #ddeaf9;
                }

                button {
                    margin: 0;
                    width: 160px;
                    margin-left: 70px;
                }
            }

            .bottom-content {
                position: absolute;
                bottom: 80px;
                display: flex;
                max-width: 1280px;
                height: 100px;
                line-height: 100px;

                > div {
                    flex: 1;
                    justify-content: space-around;
                    margin: 0 20px;
                    text-align: center;
                    color: #ddeaf9;
                    font-size: 16px;
                    cursor: pointer;
                    font-weight: 400;
                    width: 400px;
                }

                .div1 {
                    background: url('../../../assets/img/usr/login/1_1.png') no-repeat;
                    background-size: cover;
                }

                .div1:hover {
                    background: url('../../../assets/img/usr/login/1_2.png') no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-weight: 800;
                }

                .div2 {
                    background: url('../../../assets/img/usr/login/2_1.png') no-repeat;
                    background-size: cover;
                }

                .div2:hover {
                    background: url('../../../assets/img/usr/login/2_2.png') no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-weight: 800;
                }

                .div3 {
                    background: url('../../../assets/img/usr/login/3_1.png') no-repeat;
                    background-size: cover;
                }

                .div3:hover {
                    background: url('../../../assets/img/usr/login/3_2.png') no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-weight: 800;
                }

                .div4 {
                    background: url('../../../assets/img/usr/login/4_1.png') no-repeat;
                    background-size: cover;
                }

                .div4:hover {
                    background: url('../../../assets/img/usr/login/4_2.png') no-repeat;
                    background-size: cover;
                    color: #fff;
                    font-weight: 800;
                }
            }
        }
    }
</style>
