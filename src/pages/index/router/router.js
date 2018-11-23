import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';
import LinkAccountAnsis from '../views/linkAccountAnsis/Index.vue';

Vue.use(Router);

// 一个空模板，方便子节点使用
const Root = Vue.component('root', {
    template: '<router-view></router-view>'
});

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
    // savedPosition is only available for popstate navigations.
        return savedPosition;
    } else {
        const position = {};
        // new navigation.
        // scroll to anchor by returning the selector
        if (to.hash) {
            position.selector = to.hash;
        }
        // check if any matched route config has meta that requires scrolling to top
        if (to.matched.some(m => !m.meta.scrollToTop)) {
            // cords will be used if no selector is provided,
            // or if the selector didn't match any element.
            position.x = 0;
            position.y = 0;
        }
        // if the returned position is falsy or an empty object,
        // will retain current scroll position.
        return position;
    }
};

// todo 按模块写入单独的文件引用
const router = new Router({
    scrollBehavior,
    routes: [
        {
            path: '',
            name: 'flat',
            label: '研究支撑平台',
            component: Home,
            icon: 'el-icon-setting',
            children: [
                {
                    path: 'demo',
                    name: 'Demo',
                    label: 'Demo',
                    icon: 'el-icon-tickets',
                    component: resolve => require(['../views/demo/Index.vue'], resolve)
                },
                // {
                //     path: 'log',
                //     name: '二级菜单2',
                //     icon: 'el-icon-document',
                //     components: Root},
                // {
                //     path: 'file',
                //     name: '二级菜单3',
                //     icon: 'menu-fix-icon fas fa-angry fa-lg',
                //     components: Root
                // },
                // {
                //     path: 'config22',
                //     name: '二级菜单4',
                //     components: Root,
                //     icon: 'el-icon-setting',
                //     children: [
                //         {
                //             path: 'dictionary',
                //             name: '三级菜单1',
                //             icon: 'el-icon-document',
                //             components: Root
                //         },
                //         {
                //             path: 'dictionary1',
                //             name: '三级菜单2',
                //             icon: 'el-icon-document',
                //             components: Root
                //         }
                //     ]
                // }
            ]
        },
        {
            path: '',
            name: 'tools',
            label: '监管科技工具集',
            component: Home,
            icon: 'menu-fix-icon fa fa-eye',
            children: [
                {
                    path: '',
                    name: 'linkAccountAnsis',
                    label: '关联账户分析',
                    icon: 'menu-fix-icon fa fa-address-book',
                    component: LinkAccountAnsis,
                    children: [
                        {
                            path: '/sceneConfig',
                            name: 'sceneConfig',
                            label: '分析向导',
                            icon: 'menu-fix-icon fa fa-atom',
                            component: resolve => require(['../views/linkAccountAnsis/sceneConfig/Index.vue'], resolve)
                        },
                        {
                            path: 'log',
                            name: 'log',
                            label: '关联账户组合并',
                            icon: 'menu-fix-icon fa fa-venus-double',
                            component: Root
                        },
                        {
                            path: 'abnormity',
                            name: 'abnormity',
                            label: '异常交易分析',
                            icon: 'menu-fix-icon fas fa-broadcast-tower',
                            component: resolve => require(['../views/linkAccountAnsis/abnormitysAnalysis/Index.vue'], resolve)
                        },
                        {
                            path: 'dictionary',
                            name: 'dictionary',
                            label: '异常交易分析',
                            icon: 'menu-fix-icon fas fa-broadcast-tower',
                            component: resolve => require(['../views/linkAccountAnsis/abnormityAnalysis/Index.vue'], resolve)
                        },
                        {
                            path: 'dictionary1',
                            name: 'dictionary1',
                            label: '账户组画像',
                            icon: 'menu-fix-icon fa fa-android',
                            component: Root
                        },
                        {
                            path: 'demo11',
                            name: 'demo11',
                            label: '客户信息查询',
                            icon: 'el-icon-search',
                            component: resolve => require(['../views/demo/Index.vue'], resolve)
                        }
                    ]
                }
            ]
            // children: [
            //     {
            //         path: 'sceneConfig',
            //         name: '场景设置',
            //         icon: 'el-icon-document',
            //         components: resolve => require(['../views/sceneConfig/Index.vue'], resolve)
            //     },
            //     {
            //         path: 'abnormityAnalysis',
            //         name: '异常行为分析',
            //         icon: 'el-icon-document',
            //         components: resolve => require(['../views/abnormityAnalysis/Index.vue'], resolve)
            //     },
            //     {
            //         path: 'ssss',
            //         name: '关联账户分析',
            //         components: Root,
            //         icon: 'el-icon-setting',
            //         children: [
            //             {
            //                 path: 'sceneConfig',
            //                 name: '场景设置',
            //                 icon: 'el-icon-document',
            //                 components: Root
            //             },
            //             {
            //                 path: 'abnormityAnalysis',
            //                 name: '异常行为分析',
            //                 icon: 'el-icon-document',
            //                 components: Root
            //             }
            //         ]
            //     }
            // ]
        },
        {
            path: '/about',
            name: 'about',
            label: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
        },
        {
            path: '/login',
            name: 'login',
            label: 'login',
            // route level code-splitting
            // this generates a separate chunk (login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
        }
    ]
});

router.beforeEach((to, from, next) => {
    // todo权限校验等
    next();
});

export default router;
