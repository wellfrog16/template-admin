<template>
    <div v-if="activeName === 'first'" :class="$style.bar_echarts" id="bar_echarts1"></div>
</template>
<script>
    // import barEchartsA from 'echarts';
    import MixinVue1 from "../components/MixinsTable1";
    export default {
        name: "barEcharts",
        // 父传子！
        props: {},

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [MixinVue1],
        // 存储数据
        data() {
            return {
                activeName: 'first'
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互
        methods: {

        },
        // 在一个实例被创建之后执行代码
        created() {
        }
        ,
        // 初始化数据
        mounted() {
            this.barEchartsDete();
        }
        ,
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .bar_echarts {
        box-shadow: 0 0 10px #326fcb !important;
        height: 500px;
        color: #13ce66;
    }
</style>
