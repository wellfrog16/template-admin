<template>
    <div>
        <echarts-common :defaultOptions="echartsOptions"></echarts-common>
    </div>
</template>
<script>
import EchartsCommon from '@/components/common/index/EchartsCommon';
export default {
    components: {EchartsCommon},
    data() {
        return {
            echartsOptions: {}
        };
    }
};
</script>
