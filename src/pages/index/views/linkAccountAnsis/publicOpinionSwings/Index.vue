<template>
    <div>
        <headline></headline>
        <undulate></undulate>
        <particulars></particulars>
    </div>
</template>

<script>
import Headline from './components/headline';
import Undulate from './components/undulate';
import Particulars from './components/particulars';
export default {
    name: 'Index',
    components: {Headline, Undulate, Particulars},
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {},
};
</script>

<style lang="less" module>

</style>
