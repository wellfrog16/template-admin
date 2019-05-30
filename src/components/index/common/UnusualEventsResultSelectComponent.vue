<template>
    <el-select class="custom-width" clearable size="small" v-model="resultId" @change="handleChange" v-loading="loading" placeholder="请选择异常事件">
        <el-option-group
            v-for="group in resultOptions"
            :key="group.label"
            :label="group.label">
            <el-option
                v-for="item in group.options"
                :key="item.expReportid"
                :label="item.expEventName"
                :value="item.expReportid">
                <span :style="{'float': 'left', 'color': cssMap[item.lev - 1]}">{{ item.expEventName }}</span>
                <!-- <span style="float: right; color: #8492a6; font-size: 13px;">
                    <el-button size="mini" type="danger" @click.stop="handleDelete(item)">删除</el-button>
                </span> -->
            </el-option>
        </el-option-group>
    </el-select>
</template>
<script>
import _ from 'lodash';
import {deleteResultById} from '@/api/common';
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
            let resultList = _.groupBy(this.resultList, 'idtfySubjMatter');
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
            resultList: [],
            cssMap: ['#ec6e6e', '#f7f01b', '#1bf772']
        };
    },
    methods: {
        handleChange() {
            if (!this.resultId) {
                return;
            }
            let index = this.resultList.findIndex(item => {
                return item.expReportid === this.resultId; // 结果集编号
            });
            this.$emit('selectResultId', this.resultList[index]);
        },
        handleDelete(item) {
            this.$confirm(`确定删除'${item.eventName}'?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    deleteResultById(this.deleteUrl, item.expReportid).then(() => {
                        this.resultId = '';
                        this.resultList.splice(this.resultList.findIndex(f => { return f.expReportid === item.expReportid; }), 1);
                    });
                });
        }
    },
    mounted() {
        this.resultId = this.resultIdProps;
        if (this.$route.query && this.$route.query.taskId) {
            // this.$store.getters.unusualEventList
            if (localStorage.getItem('TEMP_EVENT_LIST')) {
                this.resultList = JSON.parse(localStorage.getItem('TEMP_EVENT_LIST'))[this.$route.query.taskId];
            } else {
                // get all event list

            }
        } else {
            // get all event list

        }
    }
};
</script>
<style>
    .custom-width {
        width: 350px;
    }
</style>
