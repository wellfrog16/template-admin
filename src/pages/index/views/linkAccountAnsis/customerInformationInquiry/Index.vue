<template>
    <div :class="$style.card_table">
        <el-form>
            <el-row>
                <el-col>
                    <el-form-item>
                        <el-input></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
    // import BreadCrumb from '../components/commont/breadCrumbs.vue'
    // console.log(BreadCrumb)

    export default {
        name: "Index",
        // 父传子！
        props: {
        },

        components: {},
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {

            }

        },
        // 计算属性
        computed: {
        },
        watch: {

        },
        //    数据交互  127662
        methods: {


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
    .card_table {
        width: 100%;
    }
</style>
