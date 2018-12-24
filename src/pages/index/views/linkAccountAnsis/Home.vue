<template>
    <div :class="$style.home_mian">
        <div @click="cardClick" :class="$style.card_box">
            <el-card :body-style="{ padding: '0px' }">
                <div :class="$style.img_box">
                    <img :class="$style.img_pic" src="../../../../assets/img/pages/pic_04.jpg" alt="">
                </div>
                <div :class="$style.analysis">
                    <span :class="$style.span_h1">关联账户分析 </span>
                    <el-button type="text" :class="$style.button_text"> Analysis</el-button>
                    <div :class="$style.analysis_p">
                        <p :class="$style.analysis_span">
                            <img :class="$style.img_icon" src="../../../../assets/img/pages/tb.png" alt="">
                        </p>
                    </div>
                </div>
            </el-card>
        </div>
        <!--<div :class="$style.card_box">
            <el-card :body-style="{ padding: '0px' }">
                <div :class="$style.img_box">
                    <img :class="$style.img_pic" src="../../../../assets/img/pages/pic_02.jpg" alt="">
                </div>
                <div :class="$style.analysis">
                    <span :class="$style.span_h1">向导二 </span>
                    <el-button type="text" :class="$style.button_text"> Analysis wizard</el-button>
                    <div :class="$style.analysis_p">
                        <p :class="$style.analysis_span">
                            <img :class="$style.img_icon" src="../../../../assets/img/pages/tb.png" alt="">
                        </p>
                    </div>
                </div>
            </el-card>
        </div>
        <div :class="$style.card_box">
            <el-card :body-style="{ padding: '0px' }">
                <div :class="$style.img_box">
                    <img :class="$style.img_pic" src="../../../../assets/img/pages/pic_03.jpg" alt="">
                </div>
                <div :class="$style.analysis">
                    <span :class="$style.span_h1">向导三 </span>
                    <el-button type="text" :class="$style.button_text"> Analysis wizard</el-button>
                    <div :class="$style.analysis_p">
                        <p :class="$style.analysis_span">
                            <img :class="$style.img_icon" src="../../../../assets/img/pages/tb.png" alt="">
                        </p>
                    </div>
                </div>
            </el-card>
        </div>
        <div :class="$style.card_box">
            <el-card :body-style="{ padding: '0px' }">
                <div :class="$style.img_box">
                    <img :class="$style.img_pic" src="../../../../assets/img/pages/pic_01.jpg" alt="">
                </div>
                <div :class="$style.analysis">
                    <span :class="$style.span_h1">向导四 </span>
                    <el-button type="text" :class="$style.button_text"> Analysis wizard</el-button>
                    <div :class="$style.analysis_p">
                        <p :class="$style.analysis_span">
                            <img :class="$style.img_icon" src="../../../../assets/img/pages/tb.png" alt="">
                        </p>
                    </div>
                </div>
            </el-card>
        </div> -->
    </div>
</template>

<script>
export default {
    name: 'home',
    components: {},
    data() {
        return {
            currentDate: new Date()
        };
    },
    methods: {
        cardClick() {
            console.log(11);
            this.$router.push({path: '/sceneConfig'});
        }
    },
    mounted() {}
};
</script>
<style lang="less" module>
    .home_mian {
        display: flex;
        justify-content: space-between;
        .card_box {
            cursor: pointer;
            box-shadow: 0 0 10px #326fcb;
            width: calc(100% / 4 - 15px);
            .img_box {
                .img_pic {
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .analysis {
            padding: 10px 15px;
            .span_h1 {
                color: #0cf;
                font-size: 23px;
            }
            .button_text {
                color: #0c97ba;
                font-size: 14px;
            }
            .analysis_p {
                display: flex;
                justify-content: flex-end;
                .analysis_span {
                    width: 23px;
                    height: 23px;
                    padding: 0;
                    margin: 0;
                }
            }
        }
        .img_icon {
            width: 100%;
            height: 100%;
        }
    }
</style>
