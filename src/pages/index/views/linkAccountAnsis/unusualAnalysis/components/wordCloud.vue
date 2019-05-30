/* 词云 */
<template>
    <div class="word-cloud-com">
        <echarts-common :loading="loading" ref="wordCloudCom" domId="wordCloudComDom" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
    </div>
</template>
<script>
import _ from 'lodash';
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {echartsDefault} from '@/assets/style/common/theme/echart';
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
            default: 400
        },
        data: {
            type: Array,
            default() {
                return [

                ];
            }
        },
        chartOptions: {
            type: Object,
            default() {
                return {
                    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    series: [{
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [15, 50],
                        rotationRange: [-45, 90],
                        shape: 'pentagon',
                        drawOutOfBound: true,
                        textStyle: {
                            normal: {
                                // color: function() {
                                //     return 'rgb(' + [
                                //         Math.round(Math.random() * 255),
                                //         Math.round(Math.random() * 255),
                                //         Math.round(Math.random() * 255)
                                //     ].join(',') + ')';
                                // },
                                color: function() {
                                    let colorArray = [
                                        '#f8f400',
                                        '#40f3d6',
                                        '#ce20ff',
                                        '#13ce34',
                                        '#ff8a00',
                                        '#e3007b',
                                        '#b9cc87',
                                        '#ffabf3',
                                        '#f3253c',
                                        '#dbef09',
                                        '#09beef',
                                        '#c475cc',
                                        '#75ccbe'
                                    ];
                                    let colorIndex = Math.ceil(Math.random() * 12);
                                    return colorArray[colorIndex];
                                }

                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#fff'
                            }
                        },
                        data: []
                    }]
                };
            }
        }
    },
    watch: {
        data: {
            handler(val) {
                this.setData(val);
            },
            deep: true
        }
    },
    methods: {
        handleEchartClickEvent(val) {
            this.$emit('handleEchartClickEvent', val);
        },
        handleEchartDblClickEvent(val) {
            this.$emit('handleEchartDblClickEvent', val);
        },
        setData(val) {
            let chartData = [];
            val.forEach(v => {
                chartData = [...chartData, ...v.keyWord.split(',').map(f => {
                    return {
                        name: f,
                        value: v.similarArticleStat
                    };
                })];
            });
            // chartData = [
            //     {name: '埃及法', value: 222},
            //     {name: '埃及法', value: 22},
            //     {name: '埃及法', value: 2666},
            //     {name: '案发后', value: 222},
            //     {name: '案发后', value: 11},
            //     {name: '那是', value: 2322},
            //     {name: '为啥', value: 1123},
            //     {name: '阿尔冯', value: 22},
            //     {name: '案发后', value: 999},
            // ];
            let uniqData = _.uniqBy(_.orderBy(chartData, 'value', 'desc'), 'name');
            this.chartOptions.series[0]['data'] = uniqData;
        }
    },
    mounted() {
        this.setData(this.data);
    }
};
</script>
