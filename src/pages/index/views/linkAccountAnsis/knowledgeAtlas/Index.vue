<template>
    <div :class="$style.knowledge_atlas">
        <!-- 知识库图-->
        <knowledge-echarts :echartsData="echartsData" :loading="loading"></knowledge-echarts>
        <!--数据-->
        <group-infor @generateEvent="generateEvent" @updateLoading="updateLoading"></group-infor>
    </div>
</template>
<script>
import KnowledgeEcharts from '../knowledgeAtlas/components/knowledgeEcharts'; // 知识库图表
import groupInfor from '../knowledgeAtlas/components/groupaddInformation';
export default {
    name: 'Index',
    components: {
        KnowledgeEcharts,
        groupInfor
    },
    // 混入, 是一个类的继承，类似于一个公共的方法。
    mixins: [],
    // 存储数据
    data() {
        return {
            echartsData: {},
            loading: false
        };
    },
    // 计算属性
    computed: {},
    watch: {},
    //    数据交互  127662
    methods: {
        generateEvent(data) {
            this.echartsData = data;
        },
        updateLoading(flag) {
            this.loading = flag;
        }
    }
};
</script>
<style lang='less' module>
    .knowledge_atlas {
        color: #13ce66;
    }

</style>
