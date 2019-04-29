<template>
    <div>
        <s-table :columns="staticInfoColumns" :tableData="tableData"></s-table>
    </div>
</template>
<script>
import STable from '@/components/index/common/STable';
import {staticInfoColumns} from './constants';
export default {
    components: {STable},
    data() {
        return {
            staticInfoColumns,
            tableData: [],
        };
    },
    props: {
        custId: {
            type: String,
            default: ''
        }
    },
    mounted() {
        if (this.custId) {
            // get custInfo
        }
    }
};
</script>
