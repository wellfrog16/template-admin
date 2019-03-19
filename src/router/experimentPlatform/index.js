// import Vue from 'vue';
import Home from '@/pages/index/views/Home.vue';

// 一个空模板，方便子节点使用
// const Root = Vue.component('root', {
//     template: '<router-view></router-view>'
// });
const Index =
    {
        path: '',
        noLink: true,
        meta: {
            scrollTop: true,
            title: '研究支撑平台'
        },
        name: 'experimentPlatform',
        icon: 'menu-fix-icon fa fa-campground',
        component: Home,
        children: [
            {
                meta: {
                    scrollTop: true,
                    title: '首页'
                },
                hidden: true,
                path: '/experimentPlatformHome',
                name: 'experimentPlatformHome',
                icon: 'menu-fix-icon fa fa-home',
                component: resolve => require(['@/pages/index/views/experimentPlatform/Home.vue'], resolve)
            },
            {
                meta: {
                    scrollTop: true,
                    title: '实验流程'
                },
                path: '/operationFlow',
                name: 'operationFlow',
                icon: 'menu-fix-icon fa fa-bezier-curve',
                component: resolve => require(['@/pages/index/views/experimentPlatform/operationFlow/Index.vue'], resolve)
            },
            {
                meta: {
                    scrollTop: true,
                    title: '业务评价'
                },
                path: 'bussinessEvaluation',
                name: 'bussinessEvaluation',
                icon: 'menu-fix-icon fa fa-atlas',
                component: resolve => require(['@/pages/index/views/experimentPlatform/businessEvaluation/Index.vue'], resolve)
            },
        ]
    };
export default Index;
