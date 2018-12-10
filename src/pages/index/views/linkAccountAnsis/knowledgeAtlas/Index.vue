<template>
    <div :class="$style.knowledge_atlas">
        <knowledge-echarts :echartsData="echartsData"></knowledge-echarts>
        <group-infor @generateEvent="generateEvent"></group-infor>
    </div>
</template>
<script>
    import KnowledgeEcharts from '../knowledgeAtlas/components/knowledgeEcharts';  // 知识库图表
    import groupInfor from '../knowledgeAtlas/components/groupaddInformation';
    import SCard from '@/components/index/common/SCard';

    export default {
        name: "Index",
        // 父传子！
        props: {},

        components: {
            KnowledgeEcharts,
            groupInfor,
            SCard,   // 边框
        },
        // 混入, 是一个类的继承，类似于一个公共的方法。
        mixins: [],
        // 存储数据
        data() {
            return {
                echartsData: {}
            };
        },
        // 计算属性
        computed: {},
        watch: {},
        //    数据交互  127662
        methods: {
            generateEvent(data){
                this.echartsData = data;
            }
            // clearChartData(){},
            //  barEchartsDete() {
            //     // this.barEcharts = barEchartsA.init(document.getElementById('knowledgeAtlas'));
            //
            //     // this.barEcharts.clear();
            //
            //  },
            // clearChartData(val) {
            //     var myChart = echarts.init(document.getElementById('main'), 'macarons');
            //     var webkitDep = {
            //         "type": "force",
            //         "categories": [//关系网类别，可以写多组
            //             {
            //                 "name": "人物关系",//关系网名称
            //                 "keyword": {},
            //                 "base": "人物关系"
            //             }
            //         ],
            //         "nodes": [//展示的节点
            //
            //             {
            //                 "name": "XG0001",//节点名称
            //                 "id": 0,
            //                 "category": 0//与关系网类别索引对应，此处只有一个关系网所以这里写0
            //             },
            //             {
            //                 "name": "XG0002",
            //                 "id": 1,
            //                 "category": 0
            //             },
            //             {
            //                 "name": "XG0003",
            //                 "id": 2,
            //                 "category": 0
            //             },
            //             {
            //                 "name": "XG0004",
            //                 "id": 3,
            //                 "category": 0
            //             },
            //             {
            //                 "name": "XG0005",
            //                 "id": 4,
            //                 "category": 0
            //             },
            //             {
            //                 "name": "XG0006",
            //                 "id": 5,
            //                 "category": 0
            //             }
            //         ],
            //         "links": [//节点之间连接
            //             {
            //                 "source": 0,//起始节点，0表示第一个节点
            //                 "target": 1 //目标节点，1表示与索引为1的节点进行连接
            //             },
            //             {
            //                 "source": 0,
            //                 "target": 2
            //             }, {
            //                 "source": 1,
            //                 "target": 2
            //             }, {
            //                 "source": 1,
            //                 "target": 3
            //             }, {
            //                 "source": 1,
            //                 "target": 4
            //             }, {
            //                 "source": 3,
            //                 "target": 5
            //             }
            //         ],
            //
            //     };
            //
            //     var option = {
            //         legend: {
            //             data: ['知识图库']//此处的数据必须和关系网类别中name相对应
            //         },
            //         series: [{
            //             type: 'graph',
            //             layout: 'force',
            //             animation: false,
            //             label: {
            //                 normal: {
            //                     show:true,
            //                     position: 'right'
            //                 }
            //             },
            //             draggable: true,
            //             data: webkitDep.nodes.map(function (node, idx) {
            //                 node.id = idx;
            //                 return node;
            //             }),
            //             categories: webkitDep.categories,
            //             force: {
            //                 edgeLength: 105,//连线的长度
            //                 repulsion: 100  //子节点之间的间距
            //             },
            //             edges: webkitDep.links
            //         }]
            //     };
            //     myChart.setOption(option);
            //
            // },

        },
        // 在一个实例被创建之后执行代码
        created() {
        },
        // 初始化数据
        mounted() {
            // this.barEchartsDete();
        },
        beforeDestroy() {
        }
    };
</script>
<style lang="less" module>
    .knowledge_atlas {
        color: #13ce66;
    }

</style>
