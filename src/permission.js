import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

/**
 * 不重定向白名单
 * 意思是说这个页面不会重定向
 */
const whiteList = ['/login'];

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    NProgress.start(); // 显示 进度条

    /**
     * 判断是否获取到 token
     */
    if (getToken()) {

        /**
         * 获取到 token 的情况下, 访问的路径是 login 的情况下, 自己登录即可
         */
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done(); // 手动关闭进度条 因为 如果当前页面是仪表板，则不会在每个钩子后触发，因此请手动处理它

        } else {

            /**
             * 获取到 token 的情况下,  判断权限， 如果权限为 0, 则重新请求一下用户信息
             */
            if (store.getters.roles.length === 0) {
                // 拉取用户信息
                store.dispatch('GetInfo').then(res => {
                    next();

                }).catch(err => {
                    // 如果 获取用户信息失败 则执行登出操作
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || 'Verification failed, please login again');
                        next({ path: '/' });

                    });

                });
            } else {
                next();

            }
        }

    } else {

        if (whiteList.indexOf(to.path) !== -1) {
            next();

        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done();

        }
    }
})

router.afterEach(() => {
    NProgress.done() // 结束Progress
});
