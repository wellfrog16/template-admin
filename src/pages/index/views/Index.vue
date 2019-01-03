<template>
    <div :class="$style.home_mian">
        <div @click="cardClick" :class="$style.card_box">
            <el-card :body-style="{ padding: '0px' }">
                <div :class="$style.img_box">
                    <img :class="$style.img_pic" src="../../../assets/img/pages/pic_1.jpg" alt="">
                </div>
                <div :class="$style.analysis">
                    <p :class="$style.span_h1">关联账户分析 </p>
                    <el-button type="text" :class="$style.button_text"> Linked account analysisi</el-button>
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
            text-align: center;
            padding: 10px 15px;
            .span_h1 {
                color: #0cf;
                font-size: 23px;
                margin: 0;
            }
            .button_text {
                color: #0c97ba;
                font-size: 14px;
                padding: 5px;
            }
        }
    }
</style>
