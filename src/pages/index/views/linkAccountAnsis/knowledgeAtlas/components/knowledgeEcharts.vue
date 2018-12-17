<template>
    <div :class="$style.knowledge_echarts">
        <el-tabs v-model="activeNmaeTabs" type="card" :class="$style.v">
            <el-tab-pane
                v-for="active in activeNameList"
                :label="active.label"
                :key="active.name"
                :name="active.name"
            ></el-tab-pane>
        </el-tabs>
        <s-card :title="`关系图库`" :icon="`fa fa-user-md`">
            <div slot="content">
                <echarts-common
                    :loading="loading"
                    domId="chartId"
                    :defaultOption="chartOptionsA"
                    :propsChartHeight="350"
                ></echarts-common>
            </div>
        </s-card>
    </div>
</template>
<script>
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'knowledgeEcharts',
    props: {
        echartsData: {
            type: Object,
            required: true
        },
        loading: {
            type: Boolean
        }
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
            activeNameList: [{name: '0', label: '手工合并'}],
            echartsDataList: [],
            barEcharts: null,
            echartsOptions: {},
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
                tooltip: {
                    formatter: params => {
                        if (params.dataType === 'edge') { // link
                            return '客户编号交集：' + params.data.tip || '';
                        } else if (params.dataType === 'node') {
                            return '账户组号: ' + params.name || '';
                        }
                    },
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    extraCssText: 'width:300px; white-space:pre-wrap;'
                },
                animationEasingUpdate: 'quinticInOut',
                animation: false,
                series: [{
                    name: '知识图库',
                    type: 'graph',
                    layout: 'force',
                    symbolSize: 15,
                    focusNodeAdjacency: true,
                    roam: true,
                    data: [],
                    links: [],
                    categories: [],
                    force: {
                        repulsion: 200,
                        edgeLength: [100, 200]
                    },
                    draggable: true,
                    label: {
                        normal: {
                            position: 'right',
                            show: true,
                            textStyle: {
                                fontSize: 12
                            }
                        }
                    }
                }]
            },
            dataZoom: [
                {type: 'slider', show: true, xAxisIndex: [0], bottom: 0, start: 99, end: 100},
                {type: 'inside', xAxisIndex: [0], left: '93%', start: 99, end: 100}
            ]
        };
    },
    watch: {
        echartsData: {
            handler(val) {
                this.echartsDataList = val;
                if (val) {
                    if (Object.keys(this.echartsData && this.echartsData).length !== 0) {
                        this.echartClick();
                    }
                }
            }
        }
    },
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
        }
    }
};
</script>
<style lang='less' module>
    .knowledge_echarts {
        color: #13ce66;
    }
</style>
