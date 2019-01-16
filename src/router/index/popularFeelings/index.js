
// popularFeelings/anomalyRecognition
import Home from '@/pages/index/views/Home.vue';
import PopularFeelings from '@/router/index/popularFeelings/Index.vue';

const PopularFeelingsIndex = {
    path: '',
    name: 'toolsqa',
    meta: {
        scrollTop: true,
        title: '舆情'
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
                title: '舆情设计'
            },
            name: 'popularFeelings',
            icon: 'menu-fix-icon fa fa-address-book',
            component: PopularFeelings,
            children: [
                {
                    meta: {
                        scrollTop: true,
                        title: '异常识别'
                    },
                    path: '/anomalyRecognition',
                    name: 'anomalyRecognition',
                    icon: 'menu-fix-icon fa fa-location-arrow',
                    component: resolve => require(['@/pages/index/views/popularFeelings/anomalyRecognition/Index.vue'], resolve)
                }
                // {
                //     meta: {
                //         scrollTop: true,
                //         title: '关联账户组合并'
                //     },
                //     path: 'assoAccountGroupMerge',
                //     name: 'assoAccountGroupMerge',
                //     icon: 'menu-fix-icon fa fa-venus-double',
                //     component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/Index.vue'], resolve)
                // },
                // {
                //     meta: {
                //         scrollTop: true,
                //         title: '组合场景整合'
                //     },
                //     path: 'knowledgeAtlas',
                //     name: 'knowledgeAtlas',
                //     icon: 'menu-fix-icon fa fa-code-branch', // customer_information_inquiry
                //     component: resolve => require(['@/pages/index/views/linkAccountAnsis/knowledgeAtlas/Index.vue'], resolve)
                // }
            ]
        }
    ]
};
export default PopularFeelingsIndex;
