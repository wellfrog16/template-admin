const state = {
    chartData1: {},
    chartData2: {},
    chartData3: {},
    chartData4: {} // 包含买卖
};
const mutations = {
    saveXGchart1(state, val) {
        state.chartData1 = val;
    },
    saveXGchart2(state, val) {
        state.chartData2 = val;
    },
    saveXGchart3(state, val) {
        state.chartData3 = val;
    },
    saveXGchart4(state, val) {
        state.chartData4 = val;
    }
};
const getters = {
    getXGchart1(state) {
        return state.chartData1;
    },
    getXGchart2(state) {
        return state.chartData2;
    },
    getXGchart3(state) {
        return state.chartData3;
    },
    getXGchart4(state) {
        return state.chartData4;
    }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};