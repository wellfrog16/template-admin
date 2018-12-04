const state = {
    sceneCommitResp: {
        mainTableData: [],
        chartData: []
    }
};
const mutations = {
    saveSceneCommitResp(state, val) {
        state.sceneCommitResp = val;
    },
};
const getters = {
    sceneCommitResp(state) {
        return state.sceneCommitResp;
    }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};