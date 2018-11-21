<template>
    <div style="text-align:center; margin-bottom: 30px;">
        <el-button v-if="showPrevStepButton" type="primary" size="small" @click="prevStep">上一步</el-button>
        <el-button v-if="showNextStepButton" type="primary" size="small" @click="nextStep">下一步</el-button>
    </div>
</template>
<script>
export default {
    computed: {
        showPrevStepButton() {
            return true;
        },
        showNextStepButton() {
            return true;
        }
    },
    methods: {
        prevStep() {
            this.$router.go(-1);
        },
        nextStep() {
            let nextStepRouterMap = [
                {sceneConfig: ''}
            ];
            this.$router.push({name: `${nextStepRouterMap[this.$route.name]}`});
        }
    }
};
</script>
