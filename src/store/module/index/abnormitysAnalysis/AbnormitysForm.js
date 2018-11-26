const state = {};
const mutations = {};
const getters = {};
const actions = {};

export default {
    // 状态（存储对象或数组或方法）
    state: {
        count: 0,
        showFooter: 'fsfsdf',
        changableNum: 0    //要设置的初始属性值
    },
    // 变化（在 store 上注册 mutation，
    // 处理函数总是接受 state 作为第一个参数（如果定义在模块中，
    // 则为模块的局部状态），payload 作为第二个参数（可选）。）
    mutations: {
        //自定义改变state初始值的方法，
        // 这里面的参数除了state之外还可以再传额外的参数(变量或对象);
        show(state) {
            state.showFooter = true;
        },
        setStepOneParams (state, params) {
            state.stepOneParams = {...params}
        },
    },
    // 获取或接受（）
    getters: {
        isShow(state) {  //承载变化的showFooter的值
            return state.showFooter
        },
        getChangedNum() {  //承载变化的changebleNum的值
            return state.changableNum
        }
    },
    // 动作（处理函数总是接受 context 作为第一个参数）
    actions: {
        //自定义触发mutations里函数的方法，
        // context与store 实例具有相同方法和属性
        hideFooter(context) {
            context.commit('hide');
        },
    }
};


