const state = {
    activeTab: '0',
    tabIndex: 0,
    blockData: {}
};
const mutations = {
    saveActiveTab(state, val) {
        state.activeTab = val;
    },
    saveTabIndex(state, val) {
        state.tabIndex = val;
    },
    saveChartTableData(state, val) {
        if (!state.blockData[val.index]) {
            state.blockData[val.index] = {};
        }
        state.blockData[val.index].chartTableData = val.data;
    },
    saveMainTableData(state, val) {
        if (!state.blockData[val.index]) {
            state.blockData[val.index] = {};
        }
        state.blockData[val.index].mainTableData = val.data;
    },
    savechart1(state, val) {
        if (!state.blockData[val.index]) {
            state.blockData[val.index] = {};
        }
        state.blockData[val.index].chartData1 = val.data;
    },
    savechart2(state, val) {
        if (!state.blockData[val.index]) {
            state.blockData[val.index] = {};
        }
        state.blockData[val.index].chartData2 = val.data;
    },
    savechart3(state, val) {
        if (!state.blockData[val.index]) {
            state.blockData[val.index] = {};
        }
        state.blockData[val.index].chartData3 = val.data;
    },
    savechart4(state, val) {
        if (!state.blockData[val.index]) {
            state.blockData[val.index] = {};
        }
        state.blockData[val.index].chartData4 = val.data;
    }
};
const getters = {
    getActiveTab(state) {
        return state.activeTab;
    },
    getTabIndex(state) {
        return state.tabIndex;
    },
    getBlockData(state) {
        return state.blockData;
    },
    getChartTableData(state) {
        return state.tabIndex ? state.blockData[state.tabIndex].chartTableData : null;
    },
    getMainTableData(state) {
        return state.tabIndex ? state.blockData[state.tabIndex].mainTableData : null;
    },
    getchart1(state) {
        return state.tabIndex ? state.blockData[state.tabIndex].chartData1 : null;
    },
    getchart2(state) {
        return state.tabIndex ? state.blockData[state.tabIndex].chartData2 : null;
    },
    getchart3(state) {
        return state.tabIndex ? state.blockData[state.tabIndex].chartData3 : null;
    },
    getchart4(state) {
        return state.tabIndex ? state.blockData[state.tabIndex].chartData4 : null;
    }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};