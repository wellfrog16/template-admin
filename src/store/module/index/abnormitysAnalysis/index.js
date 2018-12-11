
//状态(要设置的初始属性值)
const state = {
    abnorDataState: {
        overStoreData: {},
        frequentData: {},
        autoTradeData: {}
    }
};
// 存储数据
const mutations = {
    overStoreMut(state, val) {
        state.abnorDataState.overStoreData = val;
    },
    frequentMut (state, val) {
        state.abnorDataState.frequentData = val;
    },
    autoTradeMut (state,val) {
        state.abnorDataState.autoTradeData = val;
    },
};
// 取数据
const getters = {
    overStoreGetters(state) {  //承载变化的showFooter的值
        return state.abnorDataState.overStoreData;
    },
    frequentGetters(state) {  //承载变化的changebleNum的值
        return state.abnorDataState.frequentData;
    },
    autoTradeGetters(state){
        return state.abnorDataState.autoTradeData;
    }
};
const actions = {};

export default {
    // 状态（存储对象或数组或方法）
    state,
    // 变化（在 store 上注册 mutation，
    // 处理函数总是接受 state 作为第一个参数（如果定义在模块中，
    // 则为模块的局部状态），payload 作为第二个参数（可选）。）
    // 自定义改变state初始值的方法，
    // 这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    mutations,
    // 获取或接受（）
    getters,
    // 动作（处理函数总是接受 context 作为第一个参数）
    // 自定义触发mutations里函数的方法，
    // context与store 实例具有相同方法和属性
    actions

};


