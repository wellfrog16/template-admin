<template>
    <div>
        <dashboard></dashboard>
        <AnalysisChart1></AnalysisChart1>
        <AnalysisChart2></AnalysisChart2>
    </div>
</template>

<script>
import AnalysisChart1 from './components/analysisChart1';
import AnalysisChart2 from './components/analysisChart2';
import Dashboard from './components/dashboard';
export default {
    name: 'Index',
    components: {AnalysisChart1, AnalysisChart2, Dashboard},
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {},
};
</script>

<style scoped>

</style>
