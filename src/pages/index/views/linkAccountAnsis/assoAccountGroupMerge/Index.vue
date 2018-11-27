<template>
    <div class="asso-account-group-merge">
        <div class="top-nav">
            <el-tabs type="card" v-model="activeTab">
                <el-tab-pane v-for="(item, index) in tabs" :key="index" :name="item.name" :label="item.label">
                </el-tab-pane>
            </el-tabs>
            <div class="tabs-button">
                <el-row>
                    <span style="margin-right: 10px;">导入结果集：</span>
                    <el-select class="custom-width" clearable size="small" v-model="resultIds">
                        <el-option
                            v-for="item in resultList"
                            :key="item.resultId"
                            :label="item.resultName"
                            :value="item.resultId">
                        </el-option>
                    </el-select>
                </el-row>
            </div>
        </div>
        <div v-if="activeTab==='0'">
            <el-row>
                <el-col :span="12">
                    <echarts-common ref="chart1" domId="chart1" :defaultOption="chartOption1" :propsChartHeight="400"></echarts-common>
                </el-col>
                <el-col :span="12">
                    <echarts-common ref="chart2" domId="chart2" :defaultOption="chartOption2" :propsChartHeight="400"></echarts-common>
                </el-col>
                <el-col :span="12">
                    <echarts-common ref="chart3" domId="chart3" :defaultOption="chartOption3" :propsChartHeight="400"></echarts-common>
                </el-col>
                <el-col :span="12">
                    <echarts-common ref="chart4" domId="chart4" :defaultOption="chartOption4" :propsChartHeight="400"></echarts-common>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import EchartsCommon from '@/components/index/common/EchartsCommon';
import {chartOption1, chartOption2, chartOption3, chartOption4} from './components/constants';
export default {
    components: {EchartsCommon},
    data() {
        return {
            chartOption1,
            chartOption2,
            chartOption3,
            chartOption4,
            activeTab: '0',
            tabs: [
                {name: '0', label: '场景名称1'},
                {name: '1', label: '场景名称2'},
            ],
            resultIds: '',
            resultList: []
        };
    }
};
</script>
<style lang="less" scoped>
    .asso-account-group-merge {
        background: transparent;
        .top-nav {
            position: relative;
        }
        .tabs-button {
            position: absolute;
            right: 0;
            top: 0;
        }
    }
</style>
