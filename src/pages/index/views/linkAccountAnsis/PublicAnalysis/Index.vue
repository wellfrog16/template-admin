<template>
    <div>
        <dashboard></dashboard>
        <AnalysisChart1></AnalysisChart1>
        <AnalysisChart2></AnalysisChart2>
        <AnalysisChart3></AnalysisChart3>
        <AnalysisChart4></AnalysisChart4>
        <AnalysisChart5></AnalysisChart5>
        <AnalysisChart6></AnalysisChart6>
    </div>
</template>

<script>
import AnalysisChart1 from './components/analysisChart1';
import AnalysisChart2 from './components/analysisChart2';
import AnalysisChart3 from './components/analysisChart3';
import AnalysisChart4 from './components/analysisChart4';
import AnalysisChart5 from './components/analysisChart5';
import AnalysisChart6 from './components/analysisChart6';
import Dashboard from './components/dashboard';
export default {
    name: 'Index',
    components: {
        AnalysisChart1,
        AnalysisChart2,
        AnalysisChart3,
        AnalysisChart4,
        AnalysisChart5,
        AnalysisChart6,
        Dashboard
    },
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
</style>
