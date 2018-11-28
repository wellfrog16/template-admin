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
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/sceneConfig/Index.vue'], resolve)
                },
                {
                    path: 'assoAccountGroupMerge',
                    name: 'assoAccountGroupMerge',
                    label: '关联账户组合并',
                    icon: 'menu-fix-icon fa fa-venus-double',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/assoAccountGroupMerge/Index.vue'], resolve)
                },
                {
                    path: 'abnormity',
                    name: 'abnormity',
                    label: '异常交易分析',
                    icon: 'menu-fix-icon fas fa-broadcast-tower',
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/abnormityAnalysis/Index.vue'], resolve)
                },
                {
                    path: 'dictionary1',
                    name: 'dictionary1',
                    label: '账户组画像',
                    icon: 'menu-fix-icon fa fa-android',
                    component: Root
                },
                {
                    path: 'customerInformationInquiry',
                    name: 'customerInformationInquiry',
                    label: '客户信息查询',
                    icon: 'el-icon-search', // customer_information_inquiry
                    component: resolve => require(['@/pages/index/views/linkAccountAnsis/customerInformationInquiry/Index.vue'], resolve)
                }
            ]
        }
    ]
};
export default Index;
