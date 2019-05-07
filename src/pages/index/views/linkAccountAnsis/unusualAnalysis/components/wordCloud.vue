/* 词云 */
<template>
    <div class="word-cloud-com">
        <echarts-common :loading="loading" ref="wordCloudCom" domId="wordCloudComDom" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    components: {
        EchartsCommon
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        propsChartHeight: {
            type: [Number, String],
            default: 500
        },
        chartOptions: {
            type: Object,
            default() {
                return {
                    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    series: [{
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [20, 50],
                        // rotationRange: [-90, 90],
                        shape: 'pentagon',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255),
                                        Math.round(Math.random() * 255)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#fff'
                            }
                        },
                        data: [
                            {name: '开闸', value: 34},
                            {name: '下行拐点', value: 4},
                            {name: '下跌', value: 54},
                            {name: '弱势', value: 1},
                            {name: '回调', value: 22},
                            {name: '调降', value: 111},
                            {name: '均衡', value: 99},
                            {name: '平稳', value: 199},
                            {name: '中性', value: 44},
                            {name: '上升', value: 121},
                        ]
                    }]
                };
            }
        }
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        }
    }
};
</script>
