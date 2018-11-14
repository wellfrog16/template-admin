import Vue from 'vue';
import ElementUI from 'element-ui';
import utils from '@/utils/utils';
import App from './App.vue';
import router from './router/router';
import store from '@/store';

import jquery from 'jquery';
import echarts from 'echarts';
import moment from 'moment';

Vue.config.productionTip = false;

Vue.filter('currency', utils.currency);

Vue.prototype.$jquery = jquery;
Vue.prototype.$echarts = echarts;
Vue.prototype.$moment = moment;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
