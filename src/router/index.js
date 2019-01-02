import Vue from 'vue';
import Router from 'vue-router';

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/* Layout */
import Layout from '../components/layout/Layout';

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    { path: '/404', component: () => import('@/views/404'), hidden: true },

    /**
     * 订单管理
     */
    {
        path: '/order',
        component: Layout,
        alias: [ '/' ],
        name: 'order',
        hidden: false,
        // roles: [ 'repaier' ], // 只有 修理厂用户 (维修单位) 才可以访问
        meta: { title: '订单管理', icon: 'order' },
        children: [{
            path: '/',
            component: () => import('@/views/order/index'),
            meta: { title: '订单管理', icon: 'order', noCache: true, /** noCache 如果设置为true，则不会被 <keep-alive> 缓存(默认 false) */ }
        }],
    },

    /**
     * 商家管理
     */
    {
        path: '/shops',
        component: Layout,
        name: 'shops',
        hidden: false,
        // roles: [ 'repaier' ], // 只有 修理厂用户 (维修单位) 才可以访问
        meta: { title: '单位管理', icon: 'shops' },
        children: [{
            path: '/',
            component: () => import('@/views/shops/index'),
            meta: { title: '单位管理', icon: 'shops', noCache: true, hidden: true, }
        }],
    },
    {
        path: '/shops/details',
        component: Layout,
        name: 'shops-details',
        hidden: true,
        // roles: [ 'repaier' ], // 只有 修理厂用户 (维修单位) 才可以访问
        meta: { title: '单位管理', icon: 'shops' },
        children: [{
            path: '/',
            component: () => import('@/views/shops/details'),
        }],
    },

    // 当过滤失败的情况下, 直接跳转到 404 页面
    { path: '*', redirect: '/404', hidden: true },
];

export default new Router({
    scrollBehavior: () => ({ y: 0 }), // 每次加载的时候, 页面跳转到顶部
    routes: constantRouterMap
});
