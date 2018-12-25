import Vue from 'vue';
import Router from 'vue-router';
import Tools from './index/index';
import {Notification} from 'element-ui';
import Home from '@/pages/index/views/Home.vue';
Vue.use(Router);

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
            name: 'index',
            hidden: true,
            meta: {
                scrollTop: true,
                title: '首页'
            },
            component: Home,
            icon: 'menu-fix-icon fa fa-home',
            children: [
                {
                    meta: {
                        scrollTop: true,
                        title: '首页'
                    },
                    path: '/pageIndex',
                    name: 'pageIndex',
                    icon: 'menu-fix-icon fa fa-home',
                    component: resolve => require(['@/pages/index/views/Index.vue'], resolve)
                }
            ]
        },
        Tools,
        {
            path: '/login',
            name: 'login',
            label: 'login',
            hidden: true,
            // route level code-splitting
            // this generates a separate chunk (login.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "login" */ '@/pages/index/views/Login.vue')
        },
        {
            path: '/notFound',
            name: 'notFound',
            label: 'notFound',
            hidden: true,
            // route level code-splitting
            // this generates a separate chunk (notFound.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "notFound" */ '@/pages/index/views/NotFound.vue')
        },
        {
            path: '*',
            hidden: true,
            redirect: '/notFound'
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.name === 'login') {
        next();
    } else {
        document.title = to.meta.title || '上期所大数据监管科技平台';
        // 权限校验等
        let accessToken = localStorage.getItem('ACCESS_TOKEN');
        if (!accessToken) {
            Notification.error('您的登陆已过期，请重新登录!');
            localStorage.removeItem('ACCESS_TOKEN');
            localStorage.removeItem('USER_NAME');
            next({
                path: '/login',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            });
        } else {
            next();
        }
    }
});
router.afterEach((to, from, next) => {
    Vue.prototype.$jquery('#main-container').scrollTop(0);
});
export default router;
