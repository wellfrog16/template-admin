<template>
    <iframe src="/#/" width="100%" :height="ceontainerHeight" style="border: none;"></iframe>
</template>
<script>
export default {
    data() {
        return {
            ceontainerHeight: 800
        };
    },
    mounted() {
        this.ceontainerHeight = document.getElementById('main-container').clientHeight - 13;
    }
};
</script>
