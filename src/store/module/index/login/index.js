const state = {
    accessToken: ''
};
const mutations = {
    saveAccessToken(state, val) {
        state.accessToken = val;
    },
};
const getters = {
    accessToken(state) {
        return state.accessToken;
    }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};