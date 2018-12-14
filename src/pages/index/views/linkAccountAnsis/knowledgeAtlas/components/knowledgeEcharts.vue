<template>
    <div :class="$style.knowledge_echarts">
        <el-tabs v-model="activeNmaeTabs" type="card" :class="$style.v">
            <el-tab-pane
                v-for="active in activeNameList"
                :label="active.label"
                :key="active.name"
                :name="active.name"
            >
            </el-tab-pane>
        </el-tabs>
        <s-card :title="`关系图库`" :icon="`fa fa-user-md`">
            <div slot="content">
                <echarts-common
                    :loading="loadingE"
                    domId="chartId"
                    :defaultOption="chartOptionsA"
                    :propsChartHeight="350">
                </echarts-common>
            </div>
        </s-card>
    </div>

</template>
<script>
    import SCard from '@/components/index/common/SCard';
    import EchartsCommon from '@/components/index/common/EchartsCommon';

    export default {
        name: "knowledgeEcharts",
        // 父传子！
        props: {
            echartsData: {
                type: Object,
                required: true
            },
        },
        components: {
            SCard,
            EchartsCommon
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                activeNmaeTabs: '0',
                activeNameList: [
                    {
                        name: '0',
                        label: '手工合并'
                    },
                    // {
                    //     name: '1',
                    //     label: "批量合并"
                    // }
                ],
                echartsDataList: [],
                barEcharts: null,
                echartsOptions: {},
                loadingE: true,
                chartOptionsA: {},

                chartOptions: {
                    backgroundColor: ['rgba(7, 39, 89)'],
                    title: {
                        text: '',
                        subtext: '',
                        top: 'top',
                        left: 'left',
                        normal: {
                            show: true,
                            textStyle: {
                                fontSize: 12
                            }
                        }
                    },
                    animationEasingUpdate: 'quinticInOut',
                    tooltip: {
                        formatter: (params) => {
                            if (params.dataType === 'edge') { // link
                                return '客户编号交集：' + params.data.tip || ''
                            } else if (params.dataType === 'node') {
                                return '账户组号: ' + params.name || ''
                            }
                        },
                        padding: 10,
                        backgroundColor: '#222',
                        borderColor: '#777',
                        borderWidth: 1,
                        extraCssText: 'width:150px; white-space:pre-wrap;',
                        // trigger:'item',
                        // backgroundColor:  'rgba(245, 244, 237,0.7)' ,//提示框浮动背景色
                        // borderColor:'black',
                        // borderWidth:1,
                        // textStyle:{
                        //     color:'black',
                        //     fontWeight:'bold',

                        // }
                    },
                    animation: false,
                    series: [
                        {
                            name: '知识图库',
                            type: 'graph',
                            layout: 'force',
                            symbolSize: 15,
                            focusNodeAdjacency: true,  //突出相关
                            roam: true,  //鼠标缩放、平移
                            data: [],
                            links: [],
                            categories: [],
                            force: {
                                repulsion: 200,
                                edgeLength:[100,200],

                                // edgeLength: 200,//连线的长度
                                // repulsion: 150  //子节点之间的间距
                            },
                            draggable:true,
                            label: {
                                normal: {
                                    position: 'right',
                                    show: true,
                                    textStyle: {
                                        fontSize: 12
                                    },
                                }
                            },
                        }
                    ],
                },

                // 横向滚动条
                dataZoom: [
                    {
                        type: 'slider',   // 图表下方的伸缩条
                        show: true,       // 是否显示
                        xAxisIndex: [0],
                        bottom: 0,
                        start: 99,     // 伸缩条开始位置（1-100），可以随时更改
                        end: 100       // 伸缩条结束位置（1-100），可以随时更改
                    },
                    {
                        type: 'inside',    // 鼠标滚轮
                        xAxisIndex: [0],
                        left: '93%',
                        start: 99,     // 伸缩条开始位置（1-100），可以随时更改
                        end: 100       // 伸缩条结束位置（1-100），可以随时更改
                    }
                ],
            };
        },
        // 计算属性
        computed: {},
        watch: {
            echartsData: {
                handler(val) {
                    this.echartsDataList = val;
                    if (val) {
                        this.loadingE = false;
                        if (Object.keys(this.echartsData && this.echartsData).length !== 0) {
                            this.echartClick();
                        }
                    }
                }
            }
        },
        //    数据交互  127662
        methods: {
            clearChartData() {
                this.barEcharts = this.$echarts.init(document.getElementById('chartId'));
                this.barEcharts.clear();
            },
            echartClick() {
                this.clearChartData();
                if (this.echartsData) {
                    this.chartOptions.series[0].data = this.echartsData.nodes;
                    this.chartOptions.series[0].links = this.echartsData.links;
                }
                this.barEcharts.setOption(this.chartOptions);
            },
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
    .knowledge_echarts {
        color: #13ce66;
    }

</style>
