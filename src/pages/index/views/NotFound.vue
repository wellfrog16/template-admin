<template>
    <div class="not-found-page">
        <div @click="handleGoIndex"></div>
        <!-- <div class="head404"></div>
        <div class="txtbg404">
            <p>><a style="cursor:pointer;" onclick="history.back()">返回上一页面</a></p>
            <p>><a>返回首页</a></p>
        </div> -->
    </div>
</template>
<script>
export default {
    methods: {
        handleGoIndex() {
            this.$router.push({name: 'sceneConfig'});
        }
    }
};
</script>

<style lang="less" scoped>
    .not-found-page {
        width: 100%;
        height: 100%;
        div {
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 0;
            overflow: hidden;
            background: url('../../../assets/img/usr/404/404.jpg') no-repeat;
            background-size: cover;
        }

        .head404 {
            width: 580px;
            height: 234px;
            margin: 50px auto 0 auto;
            background: url('../../../assets/img/usr/404/head404.png') no-repeat;
        }

        .txtbg404 {
            width: 499px;
            height: 169px;
            margin: 10px auto;
            background: url('../../../assets/img/usr/404/txtbg404.png') no-repeat;
            p {
                margin: 5px 0;
                line-height: 18px;
            }
            .paddingbox {
                padding-top: 15px;
            }
        }
        a {
            color: #eee;
            text-decoration: none;
            &:hover {
                color: #fc9d1d;
                text-decoration: underline;
            }
        }
    }

</style>
