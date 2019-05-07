<template>
    <el-select class="custom-width" clearable size="small" v-model="resultId" @change="handleChange" v-loading="loading" placeholder="请选择异常事件">
        <el-option-group
            v-for="group in resultOptions"
            :key="group.label"
            :label="group.label">
            <el-option
                v-for="item in group.options"
                :key="item.resultId"
                :label="item.resultName"
                :value="item.resultId">
                <span :style="{'float': 'left', 'color': cssMap[item.resultType - 1]}">{{ item.resultName }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px;">
                    <el-button size="mini" type="danger" @click.stop="handleDelete(item)">删除</el-button>
                </span> -->
            </el-option>
        </el-option-group>
    </el-select>
</template>
<script>
import _ from 'lodash';
import {getTlsResultInfo, deleteResultById} from '@/api/common';
export default {
    props: {
        resultIdProps: {
            type: String,
            default: ''
        },
        filterTypes: {
            type: Array, // ['2', '5']
            default() {
                return [];
            }
        },
        resultUrl: {
            type: String,
            default: ''
        },
        deleteUrl: {
            type: String,
            default: ''
        }
    },
    watch: {
        resultIdProps(val) {
            this.resultId = val;
        }
    },
    computed: {
        resultOptions() {
            let labelMap = ['异常事件', '模型'];
            let resultList = _.groupBy(this.resultList, 'resultType');
            return Object.keys(resultList).map(v => {
                return {
                    label: labelMap[v - 1],
                    options: resultList[v]
                };
            });
        }
    },
    data() {
        return {
            loading: false,
            resultId: '',
            resultList: [
                {
                    resultId: '1555988373',
                    resultName: '事件1',
                    resultType: '1',
                    setupUser: 'appadmin',
                    contrCode: 'cu1712',
                    timeRange: '2019-02-10 09:09:19 - 2019-02-13 09:09:19'
                },
                {
                    resultId: '1555988375',
                    resultName: '事件2',
                    resultType: '1',
                    contrCode: 'cu1712',
                    setupUser: 'appadmin',
                    timeRange: '2019-02-16 09:09:19 - 2019-02-17 09:09:19'
                }
            ],
            cssMap: ['#f8f400', '#40f3d6', '#ce20ff', '#13ce34', '#fff']
        };
    },
    methods: {
        handleChange() {
            if (!this.resultId) {
                return;
            }
            let index = this.resultList.findIndex(item => {
                return item.resultId === this.resultId; // 结果集编号
            });
            this.$emit('selectResultId', this.resultList[index]);
        },
        getResultList() {
            this.loading = true;
            getTlsResultInfo(this.resultUrl).then(resp => {
                this.loading = false;
                this.resultList = resp.filter(v => {
                    return this.filterTypes.indexOf(String(v.resultType)) === -1;
                });
                this.$emit('getResultList', resp);
            }).catch(e => {
                this.loading = false;
            });
        },
        handleDelete(item) {
            this.$confirm(`确定删除'${item.resultName}'?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deleteResultById(this.deleteUrl, item.resultId).then(() => {
                        this.resultId = '';
                        this.resultList.splice(this.resultList.findIndex(f => { return f.resultId === item.resultId; }), 1);
                    });
                });
        }
    },
    mounted() {
        // this.getResultList();
        this.resultId = this.resultIdProps;
    }
};
</script>
<style>
    .custom-width {
        width: 350px;
    }
</style>
