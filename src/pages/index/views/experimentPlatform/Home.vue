<template>
    <div :class="$style.home_mian">

        <el-row style="width: 100%;" :gutter="10">
            <el-col :span="6">
                <div @click="cardClick">
                    <el-card :body-style="{ padding: '0px' }">
                        <div :class="$style.img_box">
                            <img :class="$style.img_pic" style="width:100%; height:100%;" src="../../../../assets/img/pages/pic_1.jpg" alt="">
                        </div>
                        <div :class="$style.analysis">
                            <p :class="$style.span_h1">实验流程 </p>
                            <el-button type="text" :class="$style.button_text"> Operation Flow</el-button>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :span="6">
                <div @click="$router.push({name: 'bussinessEvaluation'})">
                    <el-card :body-style="{ padding: '0px' }">
                        <div :class="$style.img_box">
                            <img :class="$style.img_pic" style="width:100%; height:100%;" src="../../../../assets/img/pages/pic_1.jpg" alt="">
                        </div>
                        <div :class="$style.analysis">
                            <p :class="$style.span_h1">业务评价 </p>
                            <el-button type="text" :class="$style.button_text"> Business Evaluation</el-button>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
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
            this.$router.push({path: '/operationFlow'});
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
        }
        .analysis {
            text-align: center;
            padding: 15px;
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
