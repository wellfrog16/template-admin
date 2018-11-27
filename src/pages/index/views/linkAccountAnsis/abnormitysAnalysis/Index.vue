<template>
    <div :class="$style.abnormity_analysis">
        <a-form :class="$style.a_form_box"></a-form>
    </div>
</template>
<script>
    export default {
        name: '',
        components: {
            AForm: () => import('../abnormitysAnalysis/components/AbnormitysForm'),
        },
        data() {
            return {};
        },
        methods: {
        }
    };
</script>
<style lang="less" module>
    .abnormity_analysis {
        color: #fff;
        .bar_right {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .a_form_table_bar {
                width: 49.3%;
                margin-bottom: 20px;
            }
        }
    }
</style>
