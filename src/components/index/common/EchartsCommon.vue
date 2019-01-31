<!--图表公共组件-->
<template>
    <div v-loading="loading"
         element-loading-text="数据加载中，请耐心等待..."
         element-loading-background="rgba(0,0,0,0.7)"
         :id="domId" class="echarts-container chart-container" :style="{'height': propsChartHeight + 'px'}" style="width: 100%;">
         <!-- <div v-if="defaultOption.series.length && defaultOption.series[0]['data'].length" class="placeholder-text">暂无数据</div> -->
    </div>
</template>
<script>
// import {echartDefault} from '@/utils/con'
export default {
    props: {
        defaultOption: {
            type: Object,
            required: true
        },
        propsChartHeight: {
            type: [Number],
            default: 300
        },
        domId: {
            type: String,
            default: 'echartsContainer'
        },
        loading: {
            type: Boolean,
            default: false
        },
        noClearFlag: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            echart: null
        };
    },
    methods: {
        initChart(mark) {
            let myChart = document.getElementById(this.domId);
            if (!myChart) {
                return;
            }
            this.echart = this.$echarts.init(myChart, this.theme);
            // this.echart.dispatchAction({
            //   type: 'restore'
            // })
            if (mark !== 'init') {
                //   this.gfnEchartShowLoading(this.echart)
            }
            if (!this.noClearFlag) {
                this.echart.clear();
            }
            this.echart.setOption(this.defaultOption);
            // window.onresize = this.echart.resize; // 该方法只有一个图表有效；弃用；
            window.addEventListener('resize', () => {
                this.echart.resize();
            });
            /* 解除绑定事件 */
            this.echart && this.echart.off('click');
            this.echart && this.echart.off('dblclick');
            this.echart && this.echart.off('brushselected');
            this.echart && this.echart.off('contextmenu');
            /* 绑定单击事件 */
            let timeFn = null;

            /* 绑定双击事件 */
            this.echart.on('dblclick', params => {
                clearTimeout(timeFn);
                console.log(params);
                this.$emit('handleEchartDblClickEvent', params, this.domId);
            });
            this.echart.on('click', params => {
                clearTimeout(timeFn);
                timeFn = setTimeout(() => {
                    console.log(params);
                    this.$emit('handleEchartClickEvent', params, this.domId);
                }, 300);
            });
            /* 绑定框选结束事件 */
            this.echart.on('brushselected', params => {
                this.$emit('handleBrushSelectedEvent', params, this.domId);
            });
            /* 绑定框选结束事件 */
            this.echart.on('contextmenu', params => {
                this.$emit('handleContextMenu', params, this.domId);
            });
        }
    },
    watch: {
        defaultOption: {
            handler() {
                this.initChart();
            },
            deep: true
        },
        propsChartHeight(newValue) {
            this.echart.resize({
                height: newValue
            });
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart('init');
        });
    },
    beforeDestroy() {
        this.echart && this.echart.off('click');
        this.echart && this.echart.off('dblclick');
        this.echart && this.echart.off('brushselected');
        this.echart && this.echart.off('contextmenu');
    }
};
</script>
<style lang="less" scoped>
    .echarts-container {
        width: 100%;
        height: 300px;
        position: relative;
        .placeholder-text {
            font-size: 15px;
            position: absolute;
            left: 50%;
            top: 50%;
            transition: transform(-50%, -50%);
        }
    }
</style>
