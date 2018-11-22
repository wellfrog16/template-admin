<template>
    <el-card :class="$style.card_model">

    </el-card>

</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)

    // 时间区间
    import SDatePicker from '@/components/index/common/SDatePicker';
    // 导入CSV
    import UploadCommon from '@/components/index/common/UploadCommon';

    export default {
        name: "model",
        // 父传子！
        props: {},

        components: {
            UploadCommon: () => import('@/components/index/common/UploadCommon'), // 导入CSV
            SDatePicker: () => import('@/components/index/common/SDatePicker')   // 时间区间
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {};
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {},
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
    .model {
        color: #13ce66;
    }

</style>
