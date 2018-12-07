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
            this.$emit('selectResultId', this.resultId, this.resultList,);
        },
        getResultList() {
            this.loading = true;
            getTlsResultInfo().then(resp => {
                this.loading = false;
                this.resultList = resp;
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
