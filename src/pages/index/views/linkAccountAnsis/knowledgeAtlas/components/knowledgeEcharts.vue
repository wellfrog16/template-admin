
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
                <el-button
                    size="small"
                    type="primary"
                    @click="echartClick">erwerw
                </el-button>
                <echarts-common
                    :loading="loading"
                    domId="chartId"
                    :defaultOption="chartOptionsA"
                    :propsChartHeight="300">
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
                activeNmaeTabs:'0',
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
                loading: false,
                chartOptionsA: {},

                chartOptions: {
                    backgroundColor: ['rgba(7, 39, 89)'],
                    title: {
                        text: '知识图库',
                        subtext: 'Default layout',
                        top: 'top',
                        left: 'left'
                    },
                    tooltip: {},
                    animation: false,
                    series: [
                        {
                            name: '知识图库',
                            type: 'graph',
                            layout: 'force',
                            data: [
                                {
                                    "name": "XG0001",//节点名称
                                    "id": 0,
                                    "category": 0//与关系网类别索引对应，此处只有一个关系网所以这里写0
                                },
                                {
                                    "name": "XG0002",
                                    "id": 1,
                                    "category": 0
                                },
                                {
                                    "name": "XG0003",
                                    "id": 2,
                                    "category": 0
                                },
                                {
                                    "name": "XG0004",
                                    "id": 3,
                                    "category": 0
                                },
                                {
                                    "name": "XG0005",
                                    "id": 4,
                                    "category": 0
                                },
                                {
                                    "name": "XG0006",
                                    "id": 5,
                                    "category": 0
                                }
                            ],
                            links: [
                                {
                                    "source": 0,//起始节点，0表示第一个节点
                                    "target": 1 //目标节点，1表示与索引为1的节点进行连接
                                },
                                {
                                    "source": 5,
                                    "target": 3
                                }, {
                                    "source": 2,
                                    "target": 4
                                }
                            ],
                            categories: [
                                { "name": "XG0001"},
                                { "name": "XG0002"},
                                { "name": "XG0003"},
                                { "name": "XG0004"},
                                { "name": "XG0005"},
                                { "name": "XG0006"}
                            ],
                            roam: true,
                            label: {
                                normal: {
                                    position: 'right'
                                }
                            },
                            force: {
                                repulsion: 100
                            }
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
                handler(val){
                    this.echartsDataList = val;
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

                // var webkitDep = {
                //     "type": "force",
                //     "categories": [//关系网类别，可以写多组
                //         {
                //             "name": "人物关系",//关系网名称
                //             "keyword": {},
                //             "base": "人物关系"
                //         }
                //     ],
                //     "nodes": [//展示的节点
                //
                //         {
                //             "name": "XG0001",//节点名称
                //             "id": 0,
                //             "category": 0//与关系网类别索引对应，此处只有一个关系网所以这里写0
                //         },
                //         {
                //             "name": "XG0002",
                //             "id": 1,
                //             "category": 0
                //         },
                //         {
                //             "name": "XG0003",
                //             "id": 2,
                //             "category": 0
                //         },
                //         {
                //             "name": "XG0004",
                //             "id": 3,
                //             "category": 0
                //         },
                //         {
                //             "name": "XG0005",
                //             "id": 4,
                //             "category": 0
                //         },
                //         {
                //             "name": "XG0006",
                //             "id": 5,
                //             "category": 0
                //         }
                //     ],
                //     "links": [//节点之间连接
                //         {
                //             "source": 0,//起始节点，0表示第一个节点
                //             "target": 1 //目标节点，1表示与索引为1的节点进行连接
                //         },
                //         {
                //             "source": 5,
                //             "target": 3
                //         }, {
                //             "source": 2,
                //             "target": 4
                //         }
                //     ],
                //
                // };
                //
                // var option = {
                //     legend: {
                //         data: ['知识图库']//此处的数据必须和关系网类别中name相对应
                //     },
                //     series: [{
                //         type: 'graph',
                //         layout: 'force',
                //         animation: false,
                //         label: {
                //             normal: {
                //                 show:true,
                //                 position: 'right'
                //             }
                //         },
                //         draggable: true,
                //         data: webkitDep.nodes.map(function (node, idx) {
                //             node.id = idx;
                //             return node;
                //         }),
                //         categories: webkitDep.categories,
                //         force: {
                //             edgeLength: 105,//连线的长度
                //             repulsion: 100  //子节点之间的间距
                //         },
                //         edges: webkitDep.links
                //     }]
                // };
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
