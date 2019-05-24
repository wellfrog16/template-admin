/* 树形推理图谱 */
<template>
    <div class="reasoning-map-chart">
        <keep-alive>
            <echarts-common :loading="loading" ref="reasoningMapRef" domId="reasoningMapRef" :defaultOption="chartOptions" :propsChartHeight="propsChartHeight" @handleEchartClickEvent="handleEchartClickEvent" @handleEchartDblClickEvent="handleEchartDblClickEvent"></echarts-common>
        </keep-alive>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
// import {data} from './treeData';
export default {
    components: {
        EchartsCommon
    },
    data() {
        // let symbolFunc = function(value, params) {
        //     console.log(params);
        //     if (params.name === 'flare') {
        //         return 'rect';
        //     }
        //     return 'emptyCircle';
        // };
        // let setSymbolStyle = data => {
        //     data.forEach(item => {

        //     })
        //     if (data.children) {
        //         setSymbolStyle(data.children);
        //     }
        // };
        return {
            chartOptions: {
                // color: [
                //     '#f8f400',
                //     '#40f3d6',
                //     '#ce20ff',
                //     '#00ff55',
                //     '#e4d1bb',
                //     '#ff8a00',
                //     '#b69913',
                //     '#00709e',
                //     '#b69913',
                //     '#1929b3',
                //     '#006624'
                // ],
                // grid: {
                //     left: '3%',
                //     right: '15%',
                //     bottom: '15%',
                //     containLabel: true
                // },
                tooltip: {
                    enterable: true,
                    trigger: 'item',
                    triggerOn: 'mousemove',
                    padding: 10,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width: 280px; max-height: 150px; white-space:pre-wrap; overflow-y: auto; overflow-x: hidden; color: yellow',
                    formatter: data => {
                        // if (data.data.factorLevel === 3) {
                        // } else {
                        //     return data.data.name;
                        // }
                        if (data.data.children && data.data.children.length) {
                            let str = data.data.name + ':<br>';
                            let detail = data.data.children.map(v => {
                                return `<div style="width: 280px; line-height: 25px; text-indent: 1rem; overflow: hidden; text-overflow: ellipsis;">${v.name}</div>`;
                            }).join('');
                            return str + detail;
                        }
                        return data.data.name;
                    }
                },
                series: [
                    {
                        type: 'tree',
                        roam: true,
                        data: [],
                        top: '10%',
                        bottom: '10%',
                        layout: 'radial',
                        symbolSize: 7,
                        symbol: 'emptyCircle',
                        initialTreeDepth: 2,
                        animationDurationUpdate: 750,
                        label: {
                            color: '#fff',
                            position: 'top',
                            offset: [0, -8]

                        },
                        itemStyle: {
                            color: '#00dcff', // 折叠节点填充颜色
                            borderColor: '#8ad68a',
                            borderWidth: 1,
                        }
                    }
                ]
            }
        };
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
        chartData: {
            type: Object,
            default() {
                return {};
            }
        }
    },
    watch: {
        chartData: {
            handler(val) {
                this.setChart(val);
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
        setChart(data) {
            // getKnowledgeMap().then(resp => {
            //     let {objects, links} = resp;
            //     this.chartOptions.series[0]['data'] = objects;
            //     this.chartOptions.series[0]['links'] = links;
            //     this.chartOptions.legend.data = objects.map(v => {
            //         return v.categoryName || '其它';
            //     });
            //     this.chartOptions.series[0]['categories'] = objects.map(v => {
            //         return {name: v.categoryName || ''};
            //     });
            // });
            // let params = {type: '螺纹钢'};
            // getKnowledgeTreeMap(params).then(resp => {
            //     console.log(resp);
            //     localStorage.setItem('treeMap', JSON.stringify(resp));
            //     this.chartOptions.series[0].data = resp;

            //     console.log(this.chartOptions.series);
            //     this.$refs['reasoningMapRef'].initChart();
            // });
            this.chartOptions.series[0].data = [data];
            console.log(data);
            console.log(this.chartOptions.series);
        }
    },
    mounted() {
    }
};
</script>
