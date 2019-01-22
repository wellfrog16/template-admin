<template>
    <div>
        <div :class="$style.ar_card">
            <chart-a-r1 :class="$style.ar_bar"></chart-a-r1>
            <chart-a-r2 :class="$style.ar_bar"></chart-a-r2>
        </div>
        <div :class="$style.ar_card">
            <chart-a-r3 :class="$style.ar_bar"></chart-a-r3>
            <chart-a-r4 :class="$style.ar_bar"></chart-a-r4>
        </div>
    </div>
</template>

<script>
import chartAR1 from './components/chartAR1';
import chartAR2 from './components/chartAR2';
import chartAR3 from './components/chartAR3';
import chartAR4 from './components/chartAR4';
export default {
    name: 'Index',
    components: {chartAR1, chartAR2, chartAR3, chartAR4},
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {},
};
</script>

<style lang="less" module>
    .ar_card {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .ar_bar {
            padding: 0;
            width: 49.3%;
            margin-bottom: 20px;
        }
    }
</style>
