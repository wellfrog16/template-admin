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
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    series: [{
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [12, 50],
                        rotationRange: [-90, 90],
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
                                shadowColor: '#333'
                            }
                        },
                        data: [
                            {name: '上升', value: 34},
                            {name: '增长', value: 4},
                            {name: '矮冬瓜', value: 54},
                            {name: '丰富', value: 1},
                            {name: '法尔', value: 22},
                            {name: '阿飞', value: 111},
                            {name: '如果', value: 99},
                            {name: '文网文', value: 99},
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
