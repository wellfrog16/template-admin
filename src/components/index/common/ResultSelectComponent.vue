<template>
    <el-select class="custom-width" clearable size="small" v-model="resultId" @change="handleChange" v-loading="loading">
        <el-option
            v-for="item in resultList"
            :key="item.resultId"
            :label="item.resultName"
            :value="item.resultId">
            <span style="float: left;">{{ item.resultName }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px;">
                <el-button size="mini" type="danger" @click="handleDelete(item)">删除</el-button>
            </span>
        </el-option>
    </el-select>
</template>
<script>
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
        }
    },
    watch: {
        resultIdProps(val) {
            this.resultId = val;
        }
    },
    data() {
        return {
            loading: false,
            resultId: '',
            resultList: []
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
            let resultName = this.resultList[index]['resultName']; // 结果集名称
            let resultType = this.resultList[index]['resultType']; // 结果集类型
            let setupUser = this.resultList[index]['setupUser']; // 创建用户
            this.$emit('selectResultId', this.resultId, resultName, resultType, setupUser);
        },
        getResultList() {
            this.loading = true;
            getTlsResultInfo().then(resp => {
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
                    deleteResultById(item.resultId).then(() => {
                        this.resultId = '';
                        this.resultList.splice(this.resultList.findIndex(f => { return f.resultId === item.resultId; }), 1);
                    });
                });
        }
    },
    mounted() {
        this.getResultList();
        this.resultId = this.resultIdProps;
    }
};
</script>
<style>
    .custom-width {
        width: 350px;
    }
</style>
