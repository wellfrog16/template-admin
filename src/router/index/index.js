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
            meta: {
                scrollTop: true,
                title: '首页'
            },
            hidden: true,
            path: '/toolsHome',
            name: 'toolsHome',
            icon: 'menu-fix-icon fa fa-home',
            component: resolve => require(['@/pages/index/views/linkAccountAnsis/Home.vue'], resolve)
        }, {
            meta: {
                scrollTop: true,
                title: '首页'
            },
            hidden: true,
            path: '/',
            name: 'toolsHome',
            icon: 'menu-fix-icon fa fa-home',
            component: resolve => require(['@/pages/index/views/linkAccountAnsis/Home.vue'], resolve)
        },
        {
            path: '',
            noLink: true,
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
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMergeNew/assoAccountGroupMergeXG/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '账户组-行为分析'
                    },
                    path: 'assoAccountGroupMergeBV',
                    name: 'assoAccountGroupMergeBV',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMergeNew/assoAccountGroupMergeBV/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '账户组-基本信息'
                    },
                    path: 'assoAccountGroupMergeBI',
                    name: 'assoAccountGroupMergeBI',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMergeNew/assoAccountGroupMergeBI/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '账户组-实控关系'
                    },
                    path: 'assoAccountGroupMergeRL',
                    name: 'assoAccountGroupMergeRL',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMergeNew/assoAccountGroupMergeRL/Index.vue'], resolve)
                }, */
                {
                    meta: {
                        scrollTop: true,
                        title: '组合场景整合'
                    },
                    path: 'multipleScenesMerge',
                    name: 'multipleScenesMerge',
                    icon: 'menu-fix-icon fa fa-code-branch', // customer_information_inquiry
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/multipleScenesMerge/Index.vue'], resolve)
                },
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
                }
            ]
        },
        {
            path: '',
            noLink: true,
            meta: {
                scrollTop: true,
                title: '舆情异常'
            },
            hidden: false,
            name: 'popularFeeling',
            icon: 'menu-fix-icon fa fa-address-book',
            component: LinkAccountAnsis,
            children: [
                {
                    meta: {
                        scrollTop: true,
                        title: '异常识别'
                    },
                    path: '/popularFeelings',
                    name: 'popularFeelings',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/popularFeelings/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '舆情波动'
                    },
                    path: '/publicOpinionSwings',
                    name: 'publicOpinionSwings',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/publicOpinionSwings/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '新闻详情'
                    },
                    path: '/newsDetails',
                    name: 'newsDetails',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/newsDetails/Index.vue'], resolve)
                },
                {
                    meta: {
                        scrollTop: true,
                        title: '舆情情感分析'
                    },
                    path: '/PublicAnalysis',
                    name: 'PublicAnalysis',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/PublicAnalysis/Index.vue'], resolve)
                }
            ]
        },
        {
            path: '',
            noLink: true,
            meta: {
                scrollTop: true,
                title: '可拖拽'
            },
            hidden: true,
            name: 'dragabled',
            icon: 'menu-fix-icon fa fa-address-book',
            component: LinkAccountAnsis,
            children: [
                {
                    meta: {
                        scrollTop: true,
                        title: '可拖拽测试'
                    },
                    path: '/test',
                    name: 'test',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/dragComponent/index.vue'], resolve)
                }
            ]
        }
    ]
};
export default Index;
