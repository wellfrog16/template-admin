// 状态(要设置的初始属性值)
const state = {
    abnorDataState: {
        analysisChart1: {},
        analysisChart2: {}, // 0
        analysisChart3: {}, // 1
        analysisChart4: {}, // 2
    }
};
// 存储数据
const mutations = {
    analysisMut1(state, val) {
        state.abnorDataState.analysisChart1 = val;
    },
    // analysisMut2(state, val) {
    //     state.abnorDataState.analysisChart2 = val;
    // },
    // analysisMut3(state, val) {
    //     state.abnorDataState.analysisChart3 = val;
    // },
    // analysisMut4(state, val) {
    //     state.abnorDataState.analysisChart4 = val;
    // }
};
// 取数据
const getters = {
    analysisGetters1(state) {
        return state.abnorDataState.analysisChart1;
    },
    // analysisGetters2(state) {
    //     return state.abnorDataState.analysisChart2;
    // },
    // analysisGetters3(state) {
    //     return state.abnorDataState.analysisChart3;
    // },
    // analysisGetters4(state) {
    //     return state.abnorDataState.analysisChart4;
    // }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};
