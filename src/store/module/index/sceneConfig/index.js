const state = {
    sceneCommitResp: {
        mainTableData: [],
        chartData: []
    },
    sceneCommitParams: {}
};
const mutations = {
    saveSceneCommitResp(state, val) {
        state.sceneCommitResp = val;
    },
    saveSceneCommitParams(state, val) {
        state.sceneCommitParams = val;
    },
};
const getters = {
    sceneCommitResp(state) {
        return state.sceneCommitResp;
    },
    sceneCommitParams(state) {
        return state.sceneCommitParams;
    }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};