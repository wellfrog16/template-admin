import Vue from 'vue';
import ElementUI from 'element-ui';
import App from './App.vue';
import router from './router';
import store from './store';

import jquery from 'jquery';
import echarts from 'echarts';

Vue.config.productionTip = false;

Vue.prototype.$jquery = jquery;
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
