import Vue from 'vue';
import Home from '@/pages/index/views/Home.vue';
import LinkAccountAnsis from '@/pages/index/views/linkAccountAnsis/Index.vue';

// 一个空模板，方便子节点使用
const Root = Vue.component('root', {
    template: '<router-view></router-view>'
});
const Index = {
    path: '',
    name: 'tools',
    label: '监管科技工具集',
    component: Home,
    icon: 'menu-fix-icon fa fa-toolbox',
    children: [
        {
            path: '',
            name: 'linkAccountAnsis',
            label: '关联账户分析',
            icon: 'menu-fix-icon fa fa-address-book',
            component: LinkAccountAnsis,
            children: [
                {
                    meta: 'scrollTop',
                    path: '/',
                    name: 'sceneConfig',
                    label: '分析向导',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/sceneConfig/Index.vue'], resolve)
                },
                {
                    meta: 'scrollTop',
                    path: '/sceneConfig',
                    name: 'sceneConfig',
                    label: '分析向导',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/sceneConfig/Index.vue'], resolve)
                },
                {
                    meta: 'scrollTop',
                    path: 'assoAccountGroupMerge',
                    name: 'assoAccountGroupMerge',
                    label: '关联账户组合并',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/Index.vue'], resolve)
                },
                {
                    meta: 'scrollTop',
                    path: 'abnormity',
                    name: 'abnormity',
                    label: '异常交易分析',
                    icon: 'menu-fix-icon fa fa-broadcast-tower',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/abnormityAnalysis/Index.vue'], resolve)
                },
                {
                    meta: 'scrollTop',
                    path: 'dictionary1',
                    name: 'dictionary1',
                    label: '账户组画像',
                    icon: 'menu-fix-icon fa fa-street-view',
                    component: Root
                },
                {
                    meta: 'scrollTop',
                    path: 'customerInformationInquiry',
                    name: 'customerInformationInquiry',
                    label: '客户信息查询',
                    icon: 'menu-fix-icon fa fa-search', // customer_information_inquiry
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/customerInformationInquiry/Index.vue'], resolve)
                }, {
                    meta: 'scrollTop',
                    path: 'knowledgeAtlas',
                    name: 'knowledgeAtlas',
                    label: '组合场景整合',
                    icon: 'menu-fix-icon fa fa-code-branch', // customer_information_inquiry
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/knowledgeAtlas/Index.vue'], resolve)
                }
            ]
        }
    ]
};
export default Index;
