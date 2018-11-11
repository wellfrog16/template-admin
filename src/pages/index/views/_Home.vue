<template>
    <div class='home'>
        <img alt='Vue logo' src='../../../assets/img/usr/logo.png'>
        <HelloWorld msg='Welcome to Your Vue.js App'/>
        <div id='main' style='width: 600px; height:400px;'></div>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    mounted() {
        console.log(this.$jquery);
        console.log(this.$echarts);

        // 默认
        // var myChart = this.$echarts.init(document.getElementById('main'));
        // 主题测试
        var myChart = this.$echarts.init(document.getElementById('main'), 'macarons');

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data: ['销量']
            },
            xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
};
</script>
