<template>
    <el-select class="custom-width" clearable size="small" v-model="resultId" @change="handleChange" v-loading="loading">
        <el-option
            v-for="item in resultList"
            :key="item.resultId"
            :label="item.resultName"
            :value="item.resultId">
        </el-option>
    </el-select>
</template>
<script>
import {getTlsResultInfo} from '@/api/common';
export default {
    props: {
        resultIdProps: {
            type: String,
            default: ''
        },
        filterTypes: {
            type: [Number, String],
            default: ''
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
                    return String(v.resultType) !== String(this.filterTypes);
                });
                this.$emit('getResultList', resp);
            }).catch(e => {
                this.loading = false;
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
