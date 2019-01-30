<template>
    <s-card :title="`舆情新闻`" :icon="`fa fa-chart-line`">
        <el-button slot="right" type="text" @click="dialogClick">配置<i class="fa fa-undo-alt"></i></el-button>
        <el-dialog
            width="65%"
            slot="content"
            :before-close="closeData"
            title=""
            :visible.sync="dialogVisible"
            :class="$style.dia_name2">
            <dialog-a-r
                :visible="dialogVisible"></dialog-a-r>
            <div slot="footer" :class="$style.dialog_footer">
                <el-button @click="dialogCancelClick">取 消</el-button>
                <el-button type="primary" @click="dialogConfirmClick">确 定</el-button>
            </div>
        </el-dialog>
        <echarts-common
            slot="content"
            :loading="loading"
            ref="echarts"
            domId="echarts"
            :defaultOption="chartOptions"
            :propsChartHeight="300"
        ></echarts-common>
    </s-card>
</template>

<script>
import {echartsData} from './constants';
import SCard from '@/components/index/common/SCard';
import EchartsCommon from '@/components/index/common/EchartsCommon';
import DialogAR from './dialogAR';
export default {
    name: 'undulate',
    components: {SCard, EchartsCommon, DialogAR},
    data() {
        return {
            loading: false,
            dialogVisible: false,
            chartOptions: {
                title: {
                    text: '堆叠区域图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['邮件营销']
                },
                grid: {
                    x: 20, // 左
                    x2: 0, // 右
                    y: 60, // 上
                    // y2: 160 // 下
                    y2: 60, // 下
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: [
                            '2019-01-01',
                            '2019-01-02',
                            '2019-01-03',
                            '2019-01-04',
                            '2019-01-05',
                            '2019-01-06',
                            '2019-01-07',
                            '2019-01-08',
                            '2019-01-09',
                            '2019-01-10',
                            '2019-01-11',
                            '2019-01-12',
                            '2019-01-13',
                            '2019-01-14',
                            '2019-01-15',
                            '2019-01-16',
                            '2019-01-17',
                            '2019-01-18',
                            '2019-01-19',
                            '2019-01-20',
                            '2019-01-21',
                            '2019-01-22',
                            '2019-01-23',
                            '2019-01-24',
                            '2019-01-25',
                            '2019-01-26',
                            '2019-01-27',
                            '2019-01-28',
                            '2019-01-29',
                            '2019-01-30',
                            '2019-01-31',
                            '2019-02-01',
                            '2019-02-02',
                            '2019-02-03',
                            '2019-02-04',
                            '2019-02-05',
                            '2019-02-06',
                            '2019-02-07',
                            '2019-02-08',
                            '2019-02-09',
                            '2019-02-10',
                            '2019-02-11',
                            '2019-02-12',
                            '2019-02-13',
                            '2019-02-14',
                            '2019-02-15',
                            '2019-02-16',
                            '2019-02-17',
                            '2019-02-18',
                            '2019-02-19',
                            '2019-02-20',
                            '2019-02-21',
                            '2019-02-22',
                            '2019-02-23',
                            '2019-02-24',
                            '2019-02-25',
                            '2019-02-26',
                            '2019-02-27',
                            '2019-02-28',
                            '2019-03-01',
                            '2019-03-02',
                            '2019-03-03',
                            '2019-03-04',
                            '2019-03-05',
                            '2019-03-06',
                            '2019-03-07',
                            '2019-03-08',
                            '2019-03-09',
                            '2019-03-10',
                            '2019-03-11',
                            '2019-03-12',
                            '2019-03-13',
                            '2019-03-14',
                            '2019-03-15',
                            '2019-03-16',
                            '2019-03-17',
                            '2019-03-18',
                            '2019-03-19',
                            '2019-03-20',
                            '2019-03-21',
                            '2019-03-22',
                            '2019-03-23',
                            '2019-03-24',
                            '2019-03-25',
                            '2019-03-26',
                            '2019-03-27',
                            '2019-03-28',
                            '2019-03-29',
                            '2019-03-30',
                            '2019-03-31',
                        ]
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                dataZoom: [
                    {
                        type: 'inside',
                        start: 100,
                        end: 80
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 100,
                        end: 80
                    }
                ],
                series: [
                    {
                        name: '邮件营销',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        symbol: 'circle',
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'insideRight'
                            }
                        },
                        data: [
                            2001,
                            2013,
                            2102,
                            2103,
                            1204,
                            2025,
                            306,
                            207,
                            208,
                            209,
                            2110,
                            511,
                            2102,
                            913,
                            2163,
                            764,
                            465,
                            1266,
                            567,
                            568,
                            2169,
                            370,
                            471,
                            572,
                            1273,
                            274,
                            1275,
                            476,
                            1277,
                            2078,
                            279,
                            1180,
                            481,
                            782,
                            1283,
                            384,
                            685,
                            1286,
                            2007,
                            1008,
                            2089,
                            2163,
                            764,
                            465,
                            1266,
                            567,
                            568,
                            2169,
                            370,
                            471,
                            572,
                            1273,
                            274,
                            1275,
                            476,
                            1277,
                            2078,
                            279,
                            1180,
                            481,
                            782,
                            1283,
                            384,
                            685,
                            1286,
                            2007,
                            1008,
                            2089,
                            2163,
                            764,
                            465,
                            1266,
                            567,
                            568,
                            2169,
                            370,
                            471,
                            1277,
                            2078,
                            279,
                            1180,
                            481,
                            782,
                            1283,
                            384,
                            685,
                            1286,
                            2007,
                            1008,
                            2089
                        ],
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        },
                        // markPoint: {
                        //     label: {}
                        // }
                    },
                    {
                        type: 'scatter',
                        symbolSize: 20,
                        symbol: 'roundRect',
                        data: [[1, 1]],
                        label: {
                            normal: {
                                position: 'right',
                                distance: 10,
                                show: true,
                                formatter: [
                                    'Label Text',
                                ].join('\n'),
                                backgroundColor: '#eee',
                                borderColor: '#555',
                                // borderWidth: 2,
                                // borderRadius: 5,
                                // padding: 10,
                                // fontSize: 18,
                                // shadowBlur: 3,
                                // shadowColor: '#888',
                                // shadowOffsetX: 0,
                                // shadowOffsetY: 3,
                                // textBorderColor: '#000',
                                // textBorderWidth: 3,
                                color: '#fff'
                            }
                        }
                    }
                ]
            }
        };
    },
    computed: {},
    mounted() {
        this.barEchartsDete();
    },
    methods: {
        // 配置按钮
        dialogClick() {
            this.dialogVisible = true;
        },
        // 关闭弹框
        closeData(done) {
            done();
            this.dialogVisible = false;
        },
        // 取 消
        dialogCancelClick() {
            this.dialogVisible = false;
        },
        // 确 定
        dialogConfirmClick() {
            // this.$message.error('请选择条件');
        },
        barEchartsDete() {
            this.loading = true;
            let {dateTime} = echartsData;
            if (dateTime && dateTime.length !== 0) {
                this.loading = false;
                // console.log(headline);
                this.chartOptions['xAxis']['data'] = dateTime; // 实时交易时间
                // this.chartOptions['series'][0]['data'] = headline; // 实时交易价格
            }
        }
    },
};
</script>

<style lang="less" module>

</style>
