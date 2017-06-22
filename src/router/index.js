import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/AdminHome',
            component: resolve => require(['../components/common/AdminHome.vue'], resolve),
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/page/BRBook.vue'], resolve)
                },
                {
                    path: '/UserRecord',
                    component: resolve => require(['../components/page/UserRecord.vue'], resolve)
                },
                {
                    path: '/AllUsers',
                    component: resolve => require(['../components/page/AllUsers.vue'], resolve)
                },
                {
                    path: '/BRBook',
                    component: resolve => require(['../components/page/BRBook.vue'], resolve)
                },
                {
                    path: '/ADBook',
                    component: resolve => require(['../components/page/ADBook.vue'], resolve)
                },
                {
                    path: '/ADCopy',
                    component: resolve => require(['../components/page/ADCopy.vue'], resolve)
                },
                {
                    path: '/RecordSearch',
                    component: resolve => require(['../components/page/RecordSearch.vue'], resolve)
                },
                {
                    path: '/SearchBook',
                    component: resolve => require(['../components/page/SearchBook.vue'], resolve)
                },
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)   //登录组件
        },
        {
            path: '/signup',
            component: resolve => require(['../components/page/SignUp.vue'], resolve)    // 注册组件
        },
        {
            path: '/UserHome',
            component: resolve => require(['../components/common/UserHome.vue'], resolve),    // 用户主页
            children: [
                {
                    path: '/',
                    component: resolve => require(['../components/page/UserTable.vue'], resolve)
                },
                {
                    path: '/UserSearchBook',
                    component: resolve => require(['../components/page/UserSearchBook.vue'], resolve)
                },
                {
                    path: '/UserTable',
                    component: resolve => require(['../components/page/UserTable.vue'], resolve)
                },
            ]
        }
    ]
})
