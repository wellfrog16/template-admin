<template>
    <div :class="$style.black_list2">
        <s-card :title="`结果集分析`" :icon="`fa fa-chart-line`">
            <el-form
                slot="content"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                :class="$style.demo_rule_form">
                <el-row :class="$style.card1">
                    <el-col :xl="6" :lg="6" :md="6" :sm="12">
                        <el-form-item label="交易品种合约" prop="timeWindow" label-width="110px">
                            <el-select
                                style="width: 100%;"
                                v-model="ruleForm.timeWindow"
                                class="custom-width"
                                size="small"
                                clearable
                                @change="nationyChenge"
                                placeholder="请选择交易品种"
                            >
                                <el-option
                                    v-for="times in timeWindowOptions"
                                    :key="times.idName"
                                    :label="times.name"
                                    :value="times.name"
                                ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="分析模型" prop="timeInput1" label-width="110px">
                            <el-input
                                style="width: 100%;"
                                v-model="ruleForm.timeInput1"
                                class="custom-width"
                                size="small"
                                clearable
                                @change="nationyChenge"
                                placeholder="请输入分析模型"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="6" :lg="6" :md="6" :sm="12">
                        <el-form-item label="持仓量" prop="timeInput2" label-width="100px">
                            <el-input
                                style="width: 100%;"
                                v-model="ruleForm.timeInput2"
                                class="custom-width"
                                size="small"
                                clearable
                                placeholder="请输入持仓量"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="处理原因" prop="timeInput3" label-width="100px">
                            <el-input
                                style="width: 100%;"
                                v-model="ruleForm.timeInput3"
                                class="custom-width"
                                size="small"
                                clearable
                                placeholder="请输入处理原因"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="6" :lg="6" :md="6" :sm="12">
                        <el-form-item label="下单次数" prop="timeInput4" label-width="100px">
                            <el-input
                                style="width: 100%;"
                                v-model="ruleForm.timeInput4"
                                class="custom-width"
                                size="small"
                                clearable
                                placeholder="请输入下单次数"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item label="外部数据验证标记" prop="timeInput5" label-width="160px">
                            <el-input
                                style="width: 100%;"
                                v-model="ruleForm.timeInput5"
                                class="custom-width"
                                size="small"
                                clearable
                                @change="nationyChenge"
                                placeholder="请输入外部数据验证标记"
                            >
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :xl="6" :lg="6" :md="6" :sm="12">
                        <el-form-item label="撤单次数" prop="timeInput6" label-width="100px">
                            <el-input
                                style="width: 100%;"
                                v-model="ruleForm.timeInput6"
                                class="custom-width"
                                size="small"
                                clearable
                                @change="nationyChenge"
                                placeholder="请输入撤单次数"
                            >
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')" size="small">查询</el-button>
                            <el-button @click="resetForm('ruleForm')" size="small">重置</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </s-card>
        <div :class="$style.black_lists">
            <div :class="$style.box1" style="margin-right: 20px;">
                <s-card :title="`模型结果集分析`" :icon="`fa fa-chart-line`">
                    <s-table
                        slot="content"
                        ref="selfTables1"
                        :showSelectionColumn="true"
                        :showIndexColumn="false"
                        :height="336"
                        :loading="loadingAR"
                        :columns="columnsList"
                        :tableData="tableData"
                        @selection-change="handleSelectionChange1">
                    </s-table>
                    <div slot="content" style="text-align:center; margin-top: 10px; width: 100%;">
                        <el-button
                            size="small"
                            type="primary"
                            @click="importClick">
                            导入
                        </el-button>
                        <el-button
                            size="small"
                            type="primary"
                            @click="exportClick">
                            导出
                        </el-button>
                        <el-button
                            size="small"
                            type="primary"
                            @click="chooseMonitorClick">
                            选择监控
                        </el-button>
                    </div>
                </s-card>
            </div>
            <div :class="$style.box1">
                <s-card :title="`交易分析`" :icon="`fa fa-chart-line`">
                    <div slot="right">
                        <el-button type="text" @click="toggleDetail">
                            <span v-if="detail">
                                明细<i class="el-icon-plus" style="margign-left: 5px;"></i>
                            </span>
                            <span v-else>
                                图表<i class="fa fa-undo-alt" style="margign-left: 5px;"></i>
                            </span>
                        </el-button>
                    </div>
                    <echarts-common
                        slot="content"
                        v-if="details"
                        :loading="loading2"
                        ref="echartsDemos2"
                        domId="echartsId2"
                        :noClearFlag="false"
                        :defaultOption="chartOptions2"
                        :propsChartHeight="380">
                    </echarts-common>
                    <s-table
                        v-else
                        slot="content"
                        :height="380"
                        :loading="loadingAR2"
                        :columns="columnsList2"
                        :tableData="tableData2"
                    >
                    </s-table>
                </s-card>
            </div>
        </div>
    </div>
</template>

<script>
import SCard from '@/components/index/common/SCard';
import STable from '@/components/index/common/STable';
import EchartsCommon from '@/components/index/common/EchartsCommon';
export default {
    name: 'blacklist1',
    components: {SCard, STable, EchartsCommon},
    data() {
        return {
            detail: true,
            details: true,
            loadingAR: false,
            columnsList: [
                {field: 'time1', label: '账户名', minWidth: 130, align: 'center'},
                {field: 'time2', label: '姓名', minWidth: 130, align: 'center'},
                {field: 'time3', label: '电话', minWidth: 130, align: 'center'},
                {field: 'time4', label: '涉及品种', minWidth: 130, align: 'center'},
                {field: 'time5', label: '处理时间', minWidth: 130, align: 'center'},
                {field: 'time6', label: '处理原因', minWidth: 130, align: 'center'},
                {field: 'time7', label: '处理结果', minWidth: 130, align: 'center'},
                {field: 'time8', label: '目前状态', minWidth: 130, align: 'center'},
                {field: 'time9', label: '交易次数', minWidth: 130, align: 'center'},
                {field: 'time10', label: '持仓量', minWidth: 130, align: 'center'},
                {field: 'time11', label: '外部数据验证标记', minWidth: 130, align: 'center'}
            ],
            tableData: [
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                },
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                },
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                },
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                }
            ],
            loadingAR2: false,
            columnsList2: [
                {field: 'time1', label: '账户名', minWidth: 130, align: 'center'},
                {field: 'time2', label: '姓名', minWidth: 130, align: 'center'},
                {field: 'time3', label: '电话', minWidth: 130, align: 'center'},
                {field: 'time4', label: '涉及品种', minWidth: 130, align: 'center'},
                {field: 'time5', label: '处理时间', minWidth: 130, align: 'center'},
                {field: 'time6', label: '处理原因', minWidth: 130, align: 'center'},
                {field: 'time7', label: '处理结果', minWidth: 130, align: 'center'},
                {field: 'time8', label: '目前状态', minWidth: 130, align: 'center'},
                {field: 'time9', label: '交易次数', minWidth: 130, align: 'center'},
                {field: 'time10', label: '持仓量', minWidth: 130, align: 'center'},
                {field: 'time11', label: '外部数据验证标记', minWidth: 130, align: 'center'}
            ],
            tableData2: [
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                },
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                },
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                },
                {
                    'time1': '80000255',
                    'time2': '刘波',
                    'time3': '13120567211',
                    'time4': 'A',
                    'time5': '20171231',
                    'time6': '未知',
                    'time7': '待处理',
                    'time8': 'active',
                    'time9': '68',
                    'time10': '375624',
                    'time11': '失信',
                }
            ],
            loading2: false,
            chartOptions2: {
                title: [
                    {
                        text: '', // 动态数据
                        // subtext: '副标题',
                        // left: 'center',
                        left: 'left',
                        itemGap: 10,
                        // left: '20%',
                        textStyle: {
                            // 文字颜色
                            color: '#fff',
                            // 字体风格,'normal','italic','oblique'
                            fontStyle: 'normal',
                            // 字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
                            fontWeight: '100',
                            // 字体系列
                            fontFamily: 'sans-serif',
                            // 字体大小
                            fontSize: 12,
                        }
                    },
                ],
                tooltip: {
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'cross' // 默认为直线，可选为：'line' | 'shadow'
                        // type: 'cross'
                        // type: 'line'
                    },
                    textStyle: {
                        fontSize: 12
                    },
                },
                legend: {
                    top: '5%',
                    data: ['原油日K'],
                    textStyle: {
                        color: '#fff',
                        fontSize: '14'
                    }
                },
                grid: {
                    x: 30, // 左
                    x2: 20, // 右
                    y: 60, // 上
                    y2: 70 // 下
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 100,
                        end: 10
                    },
                    {
                        show: true,
                        type: 'slider',
                        y: '90%',
                        start: 100,
                        end: 10
                    }
                ],
                xAxis: {
                    name: '',
                    type: 'category',
                    boundaryGap: true,
                    axisLine: { // y轴
                        lineStyle: {
                            color: '#1fc0ff',
                            margin: 10,
                            width: 1,
                            fontSize: 10 // 字体
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            fontSize: 10 // 字体
                        }
                    },
                    data: [
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01',
                        '2019-01-01'
                    ]
                },
                yAxis: [
                    {
                        name: '成交价',
                        scale: true,
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                type: 'dashed',
                                // 使用深浅的间隔色
                                color: ['#1f416e']
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                // width: 0
                                fontSize: 9 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                    },
                    {
                        name: '',
                        scale: true,
                        show: false,
                        offset: 0,
                        position: 'right',
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                type: 'dashed',
                                // 使用深浅的间隔色
                                color: ['#1f416e']
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                // width: 0
                                fontSize: 9 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                    },
                    {
                        name: '',
                        scale: true,
                        show: false,
                        offset: 0,
                        position: 'right',
                        splitLine: {
                            show: true,
                            //  改变轴线颜色
                            lineStyle: {
                                type: 'dashed',
                                // 使用深浅的间隔色
                                color: ['#1f416e']
                            }
                        },
                        axisLine: { // y轴
                            lineStyle: {
                                color: '#6ab2ec',
                                // width: 0
                                fontSize: 9 // 字体
                            }
                        },
                        axisTick: { // y轴刻度线
                            show: true,
                        },
                    },
                ],
                series: [
                    {
                        type: 'candlestick',
                        name: '原油日K',
                        barMaxWidth: 50,
                        yAxisIndex: 0,
                        data: [
                            [
                                10887.47,
                                10848.99,
                                10847.76,
                                10894.01
                            ],
                            [
                                10848.47,
                                10868.57,
                                10847.82,
                                10870.52
                            ],
                            [
                                10868.84,
                                10915.45,
                                10868.43,
                                10915.45
                            ],
                            [
                                10915.09,
                                10907.6299,
                                10907.6299,
                                10916.2
                            ],
                            [
                                10907.15,
                                10916.16,
                                10903.75,
                                10917.2099
                            ],
                            [
                                10915.65,
                                10923.64,
                                10908.12,
                                10924.25
                            ],
                            [
                                10923.12,
                                10933.25,
                                10922.57,
                                10936.73
                            ],
                            [
                                10934.24,
                                10916.97,
                                10910.22,
                                10934.24
                            ],
                            [
                                10918.2,
                                10929.7099,
                                10918.2,
                                10930.28
                            ],
                            [
                                10929.92,
                                10939.7,
                                10928.91,
                                10940.05
                            ],
                            [
                                10938.52,
                                10931.91,
                                10931.19,
                                10942.24
                            ],
                            [
                                10932.8,
                                10942.59,
                                10930.65,
                                10945.19
                            ],
                            [
                                10942.92,
                                10925.9599,
                                10924.97,
                                10943.01
                            ],
                            [
                                10926.89,
                                10919.14,
                                10918.4599,
                                10929.09
                            ],
                            [
                                10918.58,
                                10930.66,
                                10917.68,
                                10932.05
                            ],
                            [
                                10931.83,
                                10940.75,
                                10930.52,
                                10944.26
                            ],
                            [
                                10939.4,
                                10936.67,
                                10933.28,
                                10939.43
                            ],
                            [
                                10937.76,
                                10947.69,
                                10935.9599,
                                10949.58
                            ],
                            [
                                10948.3799,
                                10927.43,
                                10927.43,
                                10948.49
                            ],
                            [
                                10927.68,
                                10919.37,
                                10919.2099,
                                10927.68
                            ],
                            [
                                10920.0,
                                10909.07,
                                10909.07,
                                10922.57
                            ],
                            [
                                10908.48,
                                10903.3799,
                                10900.16,
                                10909.04
                            ],
                            [
                                10903.41,
                                10904.9,
                                10902.61,
                                10907.47
                            ],
                            [
                                10904.5,
                                10912.91,
                                10902.2,
                                10914.91
                            ],
                            [
                                10913.73,
                                10911.01,
                                10909.91,
                                10919.09
                            ],
                            [
                                10910.81,
                                10908.87,
                                10906.93,
                                10912.03
                            ],
                            [
                                10908.86,
                                10929.34,
                                10908.86,
                                10930.3
                            ],
                            [
                                10926.97,
                                10927.09,
                                10925.08,
                                10929.39
                            ],
                            [
                                10927.01,
                                10931.17,
                                10925.98,
                                10932.2
                            ],
                            [
                                10930.3,
                                10918.93,
                                10918.92,
                                10930.86
                            ],
                            [
                                10919.26,
                                10915.09,
                                10915.09,
                                10921.08
                            ],
                            [
                                10915.67,
                                10904.43,
                                10904.43,
                                10915.8799
                            ],
                            [
                                10904.42,
                                10895.6,
                                10895.6,
                                10905.42
                            ],
                            [
                                10895.33,
                                10885.29,
                                10882.06,
                                10895.33
                            ],
                            [
                                10884.8,
                                10882.53,
                                10880.68,
                                10885.12
                            ],
                            [
                                10881.65,
                                10885.99,
                                10877.89,
                                10885.99
                            ],
                            [
                                10885.98,
                                10868.7,
                                10868.7,
                                10887.06
                            ],
                            [
                                10867.9599,
                                10837.4599,
                                10836.53,
                                10867.9599
                            ],
                            [
                                10838.06,
                                10849.85,
                                10835.7099,
                                10850.97
                            ],
                            [
                                10849.26,
                                10843.14,
                                10841.03,
                                10849.26
                            ],
                            [
                                10843.9599,
                                10863.44,
                                10843.17,
                                10864.2099
                            ],
                            [
                                10863.15,
                                10863.99,
                                10860.91,
                                10866.73
                            ],
                            [
                                10864.02,
                                10871.16,
                                10864.02,
                                10874.91
                            ],
                            [
                                10871.01,
                                10862.31,
                                10862.31,
                                10871.36
                            ],
                            [
                                10862.06,
                                10845.24,
                                10845.24,
                                10862.06
                            ],
                            [
                                10845.61,
                                10843.2099,
                                10841.19,
                                10846.7099
                            ],
                            [
                                10844.47,
                                10850.98,
                                10843.18,
                                10851.25
                            ],
                            [
                                10850.93,
                                10852.95,
                                10850.6,
                                10854.22
                            ],
                            [
                                10718.43,
                                10731.5,
                                10691.06,
                                10737.12
                            ],
                            [
                                10731.3,
                                10775.53,
                                10720.27,
                                10777.25
                            ],
                            [
                                10774.7099,
                                10758.73,
                                10758.73,
                                10780.12
                            ],
                            [
                                10758.92,
                                10740.27,
                                10740.27,
                                10760.22
                            ],
                            [
                                10738.24,
                                10758.36,
                                10729.56,
                                10759.72
                            ],
                            [
                                10758.28,
                                10747.15,
                                10746.72,
                                10758.47
                            ],
                            [
                                10745.84,
                                10731.23,
                                10730.6299,
                                10746.17
                            ],
                            [
                                10730.53,
                                10722.7,
                                10705.02,
                                10731.2099
                            ],
                            [
                                10722.76,
                                10729.77,
                                10720.33,
                                10729.77
                            ],
                            [
                                10730.45,
                                10745.05,
                                10729.94,
                                10745.75
                            ],
                            [
                                10744.82,
                                10735.3,
                                10735.07,
                                10747.22
                            ],
                            [
                                10735.41,
                                10727.98,
                                10727.98,
                                10735.5
                            ],
                            [
                                10727.32,
                                10705.62,
                                10705.62,
                                10727.32
                            ],
                            [
                                10706.15,
                                10745.25,
                                10704.8799,
                                10746.6299
                            ],
                            [
                                10745.39,
                                10750.07,
                                10742.4599,
                                10751.77
                            ],
                            [
                                10750.58,
                                10750.15,
                                10750.15,
                                10760.37
                            ],
                            [
                                10749.83,
                                10748.07,
                                10745.15,
                                10750.57
                            ],
                            [
                                10748.37,
                                10748.84,
                                10745.48,
                                10751.0
                            ],
                            [
                                10748.18,
                                10783.16,
                                10747.69,
                                10783.93
                            ],
                            [
                                10783.2099,
                                10770.22,
                                10769.25,
                                10783.67
                            ],
                            [
                                10770.42,
                                10762.3799,
                                10762.3799,
                                10776.19
                            ],
                            [
                                10761.06,
                                10753.55,
                                10752.8799,
                                10761.42
                            ],
                            [
                                10753.36,
                                10738.39,
                                10738.32,
                                10753.36
                            ],
                            [
                                10739.32,
                                10729.42,
                                10728.02,
                                10739.56
                            ],
                            [
                                10728.1,
                                10724.43,
                                10724.42,
                                10730.95
                            ],
                            [
                                10723.9,
                                10708.39,
                                10708.39,
                                10723.9
                            ],
                            [
                                10709.03,
                                10713.4599,
                                10703.55,
                                10713.79
                            ],
                            [
                                10713.33,
                                10694.55,
                                10690.42,
                                10713.61
                            ],
                            [
                                10694.18,
                                10702.4,
                                10694.18,
                                10702.78
                            ],
                            [
                                10702.8,
                                10681.78,
                                10681.78,
                                10702.8
                            ],
                            [
                                10680.87,
                                10688.19,
                                10676.99,
                                10689.67
                            ],
                            [
                                10687.99,
                                10687.2,
                                10687.2,
                                10691.61
                            ],
                            [
                                10687.12,
                                10706.59,
                                10686.29,
                                10707.47
                            ],
                            [
                                10706.29,
                                10695.85,
                                10695.85,
                                10707.4
                            ],
                            [
                                10694.6299,
                                10690.72,
                                10690.72,
                                10697.22
                            ],
                            [
                                10690.18,
                                10681.4,
                                10680.44,
                                10690.44
                            ],
                            [
                                10681.7,
                                10694.95,
                                10681.24,
                                10694.95
                            ],
                            [
                                10694.56,
                                10691.27,
                                10689.85,
                                10697.03
                            ],
                            [
                                10690.18,
                                10668.41,
                                10668.26,
                                10690.64
                            ],
                            [
                                10668.26,
                                10703.58,
                                10667.33,
                                10703.6
                            ],
                            [
                                10704.72,
                                10708.92,
                                10703.6299,
                                10710.61
                            ],
                            [
                                10709.8,
                                10731.81,
                                10709.16,
                                10733.51
                            ],
                            [
                                10731.31,
                                10724.98,
                                10724.15,
                                10733.2099
                            ],
                            [
                                10724.14,
                                10749.1299,
                                10722.68,
                                10749.1299
                            ],
                            [
                                10750.35,
                                10768.78,
                                10749.99,
                                10768.78
                            ],
                            [
                                10768.54,
                                10763.27,
                                10762.5,
                                10772.4599
                            ],
                            [
                                10762.54,
                                10754.66,
                                10754.3799,
                                10762.74
                            ],
                            [
                                10754.7,
                                10754.29,
                                10752.34,
                                10755.29
                            ],
                            [
                                10782.81,
                                10805.52,
                                10782.81,
                                10816.51
                            ],
                            [
                                10805.78,
                                10776.05,
                                10774.94,
                                10806.59
                            ],
                            [
                                10775.87,
                                10764.99,
                                10764.99,
                                10785.29
                            ],
                            [
                                10764.16,
                                10783.56,
                                10763.49,
                                10783.56
                            ],
                            [
                                10784.7,
                                10798.67,
                                10784.7,
                                10802.42
                            ],
                            [
                                10798.8799,
                                10786.15,
                                10780.12,
                                10800.15
                            ],
                            [
                                10786.2099,
                                10798.26,
                                10774.54,
                                10798.26
                            ],
                            [
                                10797.99,
                                10784.06,
                                10783.19,
                                10799.0
                            ],
                            [
                                10784.35,
                                10781.19,
                                10779.94,
                                10785.97
                            ],
                            [
                                10780.94,
                                10788.48,
                                10779.74,
                                10788.8
                            ],
                            [
                                10789.16,
                                10792.89,
                                10788.6,
                                10793.28
                            ],
                            [
                                10791.97,
                                10773.14,
                                10771.18,
                                10792.37
                            ],
                            [
                                10773.03,
                                10784.4,
                                10772.95,
                                10784.4
                            ],
                            [
                                10784.45,
                                10793.76,
                                10784.45,
                                10794.7
                            ],
                            [
                                10792.87,
                                10787.25,
                                10787.24,
                                10793.65
                            ],
                            [
                                10786.4,
                                10817.65,
                                10785.74,
                                10818.8799
                            ],
                            [
                                10817.1,
                                10804.62,
                                10803.74,
                                10817.37
                            ],
                            [
                                10804.27,
                                10810.26,
                                10803.9599,
                                10811.36
                            ],
                            [
                                10810.2099,
                                10809.65,
                                10807.08,
                                10811.2099
                            ],
                            [
                                10809.75,
                                10824.76,
                                10809.32,
                                10829.82
                            ],
                            [
                                10823.47,
                                10815.39,
                                10813.8799,
                                10823.79
                            ],
                            [
                                10815.34,
                                10815.57,
                                10810.2,
                                10816.33
                            ],
                            [
                                10814.65,
                                10818.3799,
                                10814.54,
                                10819.25
                            ],
                            [
                                10818.3799,
                                10821.11,
                                10816.1,
                                10822.15
                            ],
                            [
                                10821.4,
                                10818.42,
                                10816.42,
                                10825.42
                            ],
                            [
                                10817.68,
                                10811.26,
                                10811.26,
                                10820.07
                            ],
                            [
                                10811.25,
                                10805.55,
                                10803.11,
                                10811.95
                            ],
                            [
                                10806.26,
                                10806.07,
                                10804.77,
                                10807.34
                            ],
                            [
                                10806.6,
                                10799.15,
                                10799.15,
                                10807.83
                            ],
                            [
                                10798.59,
                                10805.37,
                                10797.78,
                                10805.6
                            ],
                            [
                                10805.9,
                                10782.32,
                                10782.32,
                                10806.37
                            ],
                            [
                                10782.69,
                                10771.31,
                                10770.78,
                                10782.69
                            ],
                            [
                                10769.16,
                                10760.39,
                                10758.25,
                                10770.37
                            ],
                            [
                                10759.73,
                                10746.07,
                                10746.02,
                                10763.39
                            ],
                            [
                                10745.39,
                                10741.06,
                                10732.43,
                                10745.64
                            ],
                            [
                                10741.7099,
                                10748.57,
                                10738.48,
                                10748.77
                            ],
                            [
                                10748.44,
                                10731.82,
                                10731.82,
                                10749.74
                            ],
                            [
                                10732.1299,
                                10725.8799,
                                10720.16,
                                10732.42
                            ],
                            [
                                10726.15,
                                10745.68,
                                10725.97,
                                10746.64
                            ],
                            [
                                10746.08,
                                10741.32,
                                10740.31,
                                10747.52
                            ],
                            [
                                10742.11,
                                10735.18,
                                10734.76,
                                10742.78
                            ],
                            [
                                10735.48,
                                10748.0,
                                10731.3,
                                10750.52
                            ],
                            [
                                10748.07,
                                10716.32,
                                10716.32,
                                10748.18
                            ],
                            [
                                10715.52,
                                10702.11,
                                10701.9,
                                10717.04
                            ],
                            [
                                10701.68,
                                10699.37,
                                10699.37,
                                10702.31
                            ],
                            [
                                10698.51,
                                10680.6299,
                                10679.01,
                                10699.27
                            ],
                            [
                                10680.85,
                                10682.93,
                                10678.94,
                                10683.67
                            ],
                            [
                                10682.86,
                                10684.56,
                                10682.86,
                                10687.15
                            ],
                            [
                                10656.31,
                                10709.55,
                                10656.31,
                                10725.11
                            ],
                            [
                                10707.42,
                                10634.56,
                                10634.56,
                                10707.42
                            ],
                            [
                                10634.32,
                                10601.82,
                                10585.49,
                                10634.32
                            ],
                            [
                                10602.95,
                                10637.29,
                                10571.16,
                                10637.29
                            ],
                            [
                                10637.67,
                                10647.48,
                                10637.67,
                                10660.07
                            ],
                            [
                                10647.39,
                                10662.82,
                                10641.01,
                                10662.82
                            ],
                            [
                                10663.16,
                                10643.23,
                                10643.23,
                                10663.16
                            ],
                            [
                                10642.84,
                                10637.61,
                                10631.86,
                                10643.09
                            ],
                            [
                                10638.69,
                                10657.05,
                                10638.01,
                                10661.1
                            ],
                            [
                                10656.04,
                                10647.68,
                                10646.82,
                                10657.72
                            ],
                            [
                                10648.07,
                                10624.8,
                                10623.68,
                                10648.3799
                            ],
                            [
                                10624.77,
                                10626.18,
                                10624.56,
                                10628.18
                            ],
                            [
                                10626.28,
                                10643.75,
                                10620.23,
                                10645.06
                            ],
                            [
                                10643.01,
                                10637.1299,
                                10637.1299,
                                10646.27
                            ],
                            [
                                10636.75,
                                10632.93,
                                10629.74,
                                10637.1299
                            ],
                            [
                                10633.36,
                                10636.26,
                                10629.12,
                                10636.9
                            ],
                            [
                                10634.99,
                                10645.32,
                                10632.95,
                                10645.32
                            ],
                            [
                                10645.28,
                                10661.58,
                                10644.48,
                                10661.58
                            ],
                            [
                                10666.16,
                                10679.19,
                                10666.16,
                                10688.22
                            ],
                            [
                                10679.08,
                                10668.7099,
                                10665.43,
                                10681.69
                            ],
                            [
                                10667.75,
                                10667.78,
                                10667.3,
                                10674.52
                            ],
                            [
                                10667.03,
                                10682.64,
                                10666.64,
                                10682.93
                            ],
                            [
                                10683.04,
                                10701.8,
                                10680.49,
                                10701.93
                            ],
                            [
                                10701.35,
                                10706.11,
                                10701.35,
                                10706.1299
                            ],
                            [
                                10706.15,
                                10711.99,
                                10706.15,
                                10722.05
                            ],
                            [
                                10711.61,
                                10709.09,
                                10708.79,
                                10714.54
                            ],
                            [
                                10709.11,
                                10713.84,
                                10708.1299,
                                10713.84
                            ],
                            [
                                10713.62,
                                10711.42,
                                10711.42,
                                10721.82
                            ],
                            [
                                10711.24,
                                10703.42,
                                10703.42,
                                10711.65
                            ],
                            [
                                10703.62,
                                10695.1299,
                                10694.2099,
                                10703.87
                            ],
                            [
                                10695.54,
                                10698.7,
                                10690.8,
                                10698.92
                            ],
                            [
                                10699.43,
                                10693.09,
                                10692.52,
                                10699.91
                            ],
                            [
                                10693.67,
                                10677.95,
                                10677.95,
                                10695.1
                            ],
                            [
                                10677.02,
                                10674.54,
                                10672.87,
                                10677.94
                            ],
                            [
                                10673.47,
                                10667.53,
                                10665.39,
                                10674.18
                            ],
                            [
                                10668.28,
                                10665.4599,
                                10664.17,
                                10669.23
                            ],
                            [
                                10664.52,
                                10679.4,
                                10662.16,
                                10680.2
                            ],
                            [
                                10679.9,
                                10673.54,
                                10673.35,
                                10680.73
                            ],
                            [
                                10673.5,
                                10664.74,
                                10663.85,
                                10676.02
                            ],
                            [
                                10662.84,
                                10672.72,
                                10662.39,
                                10673.17
                            ],
                            [
                                10673.01,
                                10651.9599,
                                10651.54,
                                10675.92
                            ],
                            [
                                10651.32,
                                10646.26,
                                10643.64,
                                10651.32
                            ],
                            [
                                10646.6,
                                10641.7,
                                10641.5,
                                10649.79
                            ],
                            [
                                10640.45,
                                10627.91,
                                10627.82,
                                10641.47
                            ],
                            [
                                10626.53,
                                10621.93,
                                10619.48,
                                10627.5
                            ],
                            [
                                10622.35,
                                10638.42,
                                10622.23,
                                10639.05
                            ],
                            [
                                10638.39,
                                10645.32,
                                10638.27,
                                10646.15
                            ],
                            [
                                10646.29,
                                10653.3799,
                                10646.27,
                                10653.3799
                            ],
                            [
                                10671.69,
                                10666.15,
                                10654.2099,
                                10687.6
                            ],
                            [
                                10666.2,
                                10650.54,
                                10650.54,
                                10678.31
                            ],
                            [
                                10650.44,
                                10669.26,
                                10639.82,
                                10669.26
                            ],
                            [
                                10669.05,
                                10667.53,
                                10662.64,
                                10669.14
                            ],
                            [
                                10668.84,
                                10657.16,
                                10649.29,
                                10669.39
                            ],
                            [
                                10657.81,
                                10630.8,
                                10629.41,
                                10658.39
                            ],
                            [
                                10630.77,
                                10647.15,
                                10628.24,
                                10648.03
                            ],
                            [
                                10647.07,
                                10648.95,
                                10636.39,
                                10648.95
                            ],
                            [
                                10648.61,
                                10652.64,
                                10639.23,
                                10652.64
                            ],
                            [
                                10652.9,
                                10655.5,
                                10652.47,
                                10662.31
                            ],
                        ],
                        itemStyle: {
                            normal: {
                                color: '#FD1050',
                                color0: '#0CF49B',
                                borderColor: '#FD1050',
                                borderColor0: '#0CF49B'
                            }
                        }
                    },
                    {
                        type: 'candlestick',
                        name: '纽约日K',
                        yAxisIndex: 0,
                        barMaxWidth: 50,
                        data: [
                        ],
                        itemStyle: {
                            normal: {
                                color: '#a54305',
                                color0: 'none',
                                borderColor: '#a54305',
                                borderColor0: '#a54305'
                            }
                        }
                    },
                    {
                        type: 'candlestick',
                        name: '布伦特日K',
                        barMaxWidth: 50,
                        yAxisIndex: 0,
                        data: [
                        ],
                        itemStyle: {
                            normal: {
                                color: '#93a206de',
                                color0: 'none',
                                borderColor: '#93a206de',
                                borderColor0: '#93a206de'
                            }
                        }
                    },
                ]
            },
            // form 表单绑定值
            ruleForm: {
                timeWindow: '原油', // 时间窗口
                timeInput1: '300',
                timeInput2: '300',
                timeInput3: '超仓',
                timeInput4: '300',
                timeInput5: '1',
                timeInput6: '300',
            },
            rules: {
                timeWindow: [
                    {required: true, message: '请选择交易品种', trigger: 'change'}
                ]
            },
            timeWindowOptions: [
                {
                    idName: '0',
                    name: '原油'
                },
                {
                    idName: '1',
                    name: '铜'
                }
            ]
        };
    },
    methods: {
        // 选择交易品种
        nationyChenge() {},
        // 查询
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        // 重置
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        // 导入
        importClick() {},
        // 导出
        exportClick() {},
        // 选择监控
        chooseMonitorClick() {},
        // 选择监控多选
        handleSelectionChange1(val) {},
        // 明细和图标切换
        toggleDetail() {
            if (this.detail && this.details) {
                this.detail = !this.detail;
                this.details = !this.details;
            } else {
                this.detail = !this.detail;
                this.details = !this.details;
            }
        },
    },
    mounted() {
    },
};
</script>

<style lang="less" module>
.black_list2 {
    width: 100%;
    .black_lists {
        width: 100%;
        display: flex;
        .box1 {
            width: calc(100% / 2 - 10px);
            .card1 {
                height: 90px;
                overflow-y: auto;
            }
        }
    }
}
</style>
