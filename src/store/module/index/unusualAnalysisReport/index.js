const state = {
    unusualEventList: {}
};
const mutations = {
    saveUnusualEventList(state, val) {
        state.unusualEventList = val;
    },
};
const getters = {
    unusualEventList(state) {
        return state.unusualEventList;
    },
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};