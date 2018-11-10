import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import jquery from 'jquery';

Vue.config.productionTip = false;

Vue.prototype.$jquery = jquery;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
