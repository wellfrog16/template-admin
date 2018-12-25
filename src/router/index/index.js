// import Vue from 'vue';
import Home from '@/pages/index/views/Home.vue';
import LinkAccountAnsis from '@/pages/index/views/linkAccountAnsis/Index.vue';

// 一个空模板，方便子节点使用
// const Root = Vue.component('root', {
//     template: '<router-view></router-view>'
// });
const Index = {
    path: '',
    name: 'tools',
    meta: {
        scrollTop: true,
        title: '监管科技工具集'
    },
    component: Home,
    icon: 'menu-fix-icon fa fa-toolbox',
    children: [
        {
            path: '',
            meta: {
                scrollTop: true,
                title: '关联账户分析'
            },
            name: 'linkAccountAnsis',
            icon: 'menu-fix-icon fa fa-address-book',
            component: LinkAccountAnsis,
            children: [
                {
                    meta: {
                        scrollTop: true,
                        title: '首页'
                    },
                    path: '/',
                    name: 'toolsHome',
                    icon: 'menu-fix-icon fa fa-home',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/Home.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '分析向导'
                    },
                    path: '/sceneConfig',
                    name: 'sceneConfig',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/sceneConfig/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '关联账户组合并'
                    },
                    path: 'assoAccountGroupMerge',
                    name: 'assoAccountGroupMerge',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/Index.vue'], resolve)
                },
                /* {
                    meta: {
                        scrollTop: true,
                        title: '账户组-相关性'
                    },
                    path: 'assoAccountGroupMergeXG',
                    name: 'assoAccountGroupMergeXG',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/assoAccountGroupMergeXG/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '账户组-行为分析'
                    },
                    path: 'assoAccountGroupMergeBV',
                    name: 'assoAccountGroupMergeBV',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/assoAccountGroupMergeBV/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '账户组-基本信息'
                    },
                    path: 'assoAccountGroupMergeBI',
                    name: 'assoAccountGroupMergeBI',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/assoAccountGroupMergeBI/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '账户组-关系人'
                    },
                    path: 'assoAccountGroupMergeRL',
                    name: 'assoAccountGroupMergeRL',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/assoAccountGroupMergeRL/Index.vue'], resolve)
                }, */
                {
                    meta: {
                        scrollTop: true,
                        title: '异常交易分析'
                    },
                    path: 'abnormity',
                    name: 'abnormity',
                    icon: 'menu-fix-icon fa fa-broadcast-tower',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/abnormityAnalysis/Index.vue'], resolve)
                },
                // {
                //    meta: {
                //     scrollTop: true,
                //     title: '账户组画像'
                // },
                //     path: 'dictionary1',
                //     name: 'dictionary1',
                //     icon: 'menu-fix-icon fa fa-street-view',
                //     component: Root
                // },
                {
                    meta: {
                        scrollTop: true,
                        title: '客户信息查询'
                    },
                    path: 'customerInformationInquiry',
                    name: 'customerInformationInquiry',
                    icon: 'menu-fix-icon fa fa-search', // customer_information_inquiry
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/customerInformationInquiry/Index.vue'], resolve)
                }, {
                    meta: {
                        scrollTop: true,
                        title: '组合场景整合'
                    },
                    path: 'knowledgeAtlas',
                    name: 'knowledgeAtlas',
                    icon: 'menu-fix-icon fa fa-code-branch', // customer_information_inquiry
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/knowledgeAtlas/Index.vue'], resolve)
                }
            ]
        }
    ]
};
export default Index;
