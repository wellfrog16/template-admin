<template>
    <div :class="$style.knowledge_atlas">
        <s-card :title="`客户地址查询`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-button size="small" type="primary" @click="clearChartData">erwerw</el-button>
                <div :class="$style.bar_echarts"
                     id="knowledgeAtlas"
                     v-loading="chartLoading"
                     element-loading-text="数据加载中，请耐心等待..."
                     element-loading-background="rgba(0,0,0,0.3)">3524352
                </div>
            </div>
        </s-card>
    </div>

</template>
<script>
    import barEchartsA from 'echarts';

    export default {
        name: "Index",
        // 父传子！
        props: {},

        components: {
            SCard: () => import('@/components/index/common/SCard'),               // 边框
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                chartLoading: false,
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            clearChartData() {
                this.barEcharts = barEchartsA.init(document.getElementById('knowledgeAtlas'));
                console.log(this.barEcharts);
                this.barEcharts.clear();
            }
        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .knowledge_atlas {
        color: #13ce66;
    }

</style>
