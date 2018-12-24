<template>
    <div :class="$style.home_mian">
        <div @click="cardClick" :class="$style.card_box">
            <s-card :title="`分析向导`" :icon="`fa fa-user-md`">
                <div slot="content"><div >34456465</div></div>
            </s-card>
        </div>
        <!--<div @click="cardClick" :class="$style.card_box">-->
        <!--<s-card :title="`分析向导`" :icon="`fa fa-user-md`">-->
        <!--<div slot="content"><div >34456465</div></div>-->
        <!--</s-card>-->
        <!--</div>-->
        <!--<div @click="cardClick" :class="$style.card_box">-->
        <!--<s-card :title="`分析向导`" :icon="`fa fa-user-md`">-->
        <!--<div slot="content"><div >34456465</div></div>-->
        <!--</s-card>-->
        <!--</div>-->
        <!--<div @click="cardClick" :class="$style.card_box">-->
        <!--<s-card :title="`分析向导`" :icon="`fa fa-user-md`">-->
        <!--<div slot="content"><div >34456465</div></div>-->
        <!--</s-card>-->
        <!--</div>-->
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';

export default {
    name: 'home',
    components: {SCard},
    data() {
        return {};
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
            width: calc(100% / 4 - 15px);
        }
    }
</style>
