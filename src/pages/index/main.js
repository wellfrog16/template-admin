import Vue from 'vue';
import ElementUI from 'element-ui';
import filters from '@/utils/filters';
import App from './App.vue';
import router from '../../router/index';
import store from '@/store';

import jquery from 'jquery';
import echarts from 'echarts';
import moment from 'moment';
import {echartsDefault} from '@/assets/style/common/theme/echart';

Vue.config.productionTip = false;
// echarts 默认样式
console.log(echartsDefault);
echarts.registerTheme('df_theme', echartsDefault);
console.log(echarts);
// 过滤器
Vue.filter('currency', filters.currency);

// 插件
Vue.prototype.$jquery = jquery;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;
Vue.prototype.router = router;
Vue.prototype.theme = 'df_theme';
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
