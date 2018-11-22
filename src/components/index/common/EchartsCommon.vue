<!--图表公共组件-->
<template>
  <div :id="domId" class="echarts-container" :style="{'height': propsChartHeight + 'px'}" style="width: 100%;">
    <!--<div v-if="!defaultOption.dataset.source.length" class="placeholder-text">暂无数据</div>-->
  </div>
</template>
<script>
  import echarts from 'echarts'

  export default {
    props: {
        defaultOption: {
            type: Object,
            required: true
        },
        propsChartHeight: {
            type: Number,
            default: 300
        },
        domId: {
            type: String,
            default: 'echartsContainer'
        }
    },
    data() {
        return {
            echart: null
        }
    },
    methods: {
        initChart(mark) {
            let myChart = document.getElementById(this.domId)
            this.echart = echarts.init(myChart)
            // this.echart.dispatchAction({
            //   type: 'restore'
            // })
            if (mark != 'init') {
            //   this.gfnEchartShowLoading(this.echart)
            }
            this.echart.setOption(this.defaultOption)
            window.onresize = this.echart.resize
            /* 解除绑定事件 */
            this.echart.off('dblclick')
            this.echart.off('brushselected')
            /* 绑定双击事件 */
            this.echart.on('dblclick', (params) => {
                this.$emit('handleEchartDblClickEvent', params)
            })
            /* 绑定框选结束事件 */
            this.echart.on('brushselected', (params) => {
                this.$emit('handleBrushSelectedEvent', params)
            })
        }
    },
    watch: {
        defaultOption: {
            handler() {
                this.initChart()
            },
            deep: true
        },
        propsChartHeight(newValue) {
                this.echart.resize({
                height: newValue
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart('init')
        })
    },
    beforeDestroy() {
        this.echart.off('dblclick')
        this.echart.off('brushselected')
    }
  }
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
