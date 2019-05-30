import Vue from 'vue';
import Vuex from 'vuex';

// 模块
import login from '@/store/module/index/login';
import sceneConfig from '@/store/module/index/sceneConfig';
import abnormitysAnalysis from '@/store/module/index/abnormitysAnalysis';
import accountMerge from '@/store/module/index/accountMerge';
import PublicAnalysis from '@/store/module/index/PublicAnalysis';
import unusualAnalysisReport from '@/store/module/index/unusualAnalysisReport';

Vue.use(Vuex);

const state = {
    count: 0
};

const mutations = {};
const getters = {};
const actions = {};

// 返回 store 实例
export default new Vuex.Store({
    state,
    mutations,
    getters,
    actions,
    modules: {
        login,
        sceneConfig,
        abnormitysAnalysis,
        accountMerge,
        PublicAnalysis,
        unusualAnalysisReport // 动因分析
    }
});
