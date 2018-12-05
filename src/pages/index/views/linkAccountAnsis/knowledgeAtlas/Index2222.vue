<template>
    <div :class="$style.knowledge_atlas">
        <s-card :title="`关系图库`" :icon="`fa fa-user-md`">
            <div slot="content">
                <el-button size="small" type="primary" @click="clearChartData">erwerw</el-button>
                <div :class="$style.bar_echarts"
                id="knowledgeAtlas"
                v-loading="chartLoading"
                element-loading-text="数据加载中，请耐心等待..."
                element-loading-background="rgba(0,0,0,0.3)">3524352
                </div>
            </div>
        </s-card>
    </div>

</template>
<script>
    import barEchartsA from 'echarts';

    export default {
        name: "Index",
        // 父传子！
        props: {},

        components: {
            SCard: () => import('@/components/index/common/SCard'),               // 边框
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                chartLoading: false,
                // chartOptions: {
                //
                // }
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            barEchartsDete() {
                // this.barEcharts = barEchartsA.init(document.getElementById('knowledgeAtlas'));

                // this.barEcharts.clear();

            },

            clearChartData(val) {
                this.barEcharts = barEchartsA.init(document.getElementById('knowledgeAtlas'));
                var webkitDep = {
                    "type": "force",
                    "categories": [//关系网类别，可以写多组
                        {
                            "name": "人物关系",//关系网名称
                            "keyword": {},
                            "base": "人物关系"
                        }
                    ],
                    "nodes": [//展示的节点
                        {
                            "name": "刘烨",//节点名称
                            "value": 3,
                            "category": 0//与关系网类别索引对应，此处只有一个关系网所以这里写0
                        },
                        {
                            "name": "霓娜",
                            "value": 1,
                            "category": 0
                        },
                        {
                            "name": "诺一",
                            "value": 1,
                            "category": 0
                        }
                    ],
                    "links": [//节点之间连接
                        {
                            "source": 0,//起始节点，0表示第一个节点
                            "target": 1 //目标节点，1表示与索引为1的节点进行连接
                        },
                        {
                            "source": 0,
                            "target": 2
                        }
                    ]
                };

               var option = {
                    legend: {
                        data: ['人物关系']//此处的数据必须和关系网类别中name相对应
                    },
                    series: [{
                        type: 'graph',
                        layout: 'force',
                        animation: false,
                        label: {
                            normal: {
                                show:true,
                                position: 'right'
                            }
                        },
                        draggable: true,
                        data: webkitDep.nodes.map(function (node, idx) {
                            node.id = idx;
                            return node;
                        }),
                        categories: webkitDep.categories,
                        force: {
                            edgeLength: 105,//连线的长度
                            repulsion: 100  //子节点之间的间距
                        },
                        edges: webkitDep.links
                    }]
                };
                this.barEcharts.setOption(option);



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
    .knowledge_atlas {
        color: #13ce66;
        .bar_echarts {
            height: 600px;
        }
    }

</style>
