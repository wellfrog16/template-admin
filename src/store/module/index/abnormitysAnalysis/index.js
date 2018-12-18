
//状态(要设置的初始属性值)
const state = {
    abnorDataState: {
        momentState: {},
        overStoreData: [], // 0
        frequentData: [], // 1
        autoTradeData: [], // 2

    }
};
// 存储数据
const mutations = {
    momentMut (state, val) {
        state.abnorDataState.momentState = val;
    },

    overStoreMut (state, val) {
        state.abnorDataState.overStoreData = val;
    },
    frequentMut (state, val) {
        state.abnorDataState.frequentData = val;
    },
    autoTradeMut (state, val) {
        state.abnorDataState.autoTradeData = val;
    }
};
// 取数据
const getters = {
    momentGetters(state) {
        return state.abnorDataState.momentState;
    },
    overStoreGetters(state) {
        return state.abnorDataState.overStoreData;
    },
    frequentGetters(state) {
        return state.abnorDataState.frequentData;
    },
    autoTradeGetters(state){
        return state.abnorDataState.autoTradeData;
    }
};
const actions = {};

export default {
    state,
    mutations,
    getters,
    actions
};


