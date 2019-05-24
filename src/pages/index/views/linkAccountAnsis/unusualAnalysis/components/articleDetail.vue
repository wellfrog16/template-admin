<template>
    <div style="min-height: 250px;">
        <h2 style="text-align: center;">{{ Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.newsTitle: '' }}</h2>
        <h4 v-if="Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.newsSource: ''">来源：{{ Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.newsSource: '' }}</h4>
        <h4 v-if="Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.keyWord: ''">关键词：{{ Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.keyWord: '' }}</h4>
        <h4 v-if="Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.breedProsInflu: ''">情感分析：{{ Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.breedProsInflu: '' }}</h4>
        <p style="line-height: 20px; text-indent: 2rem; overflow: auto; height: 180px; color: '#ffd524';">
            {{ Object.keys(currentNewsDetails).length > 0 ? currentNewsDetails.newsText: '' }}
        </p>
    </div>
</template>
<script>

export default {
    props: {
        currentNewsDetails: {
            type: Object,
            default() {
                return {};
            }
        }
    }
};
</script>
