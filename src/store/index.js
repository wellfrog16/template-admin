import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count: 0
};

const mutations = {
    updateCount(state, num) {
        state.count += num || 1;
    }
};

// 创建 store 实例
export default new Vuex.Store({
    state,
    mutations
});
