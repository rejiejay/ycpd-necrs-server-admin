// 框架类
import NProgress from 'nprogress'; // Progress 进度条
// 组件类
import router from './router';
// 样式类
import 'nprogress/nprogress.css'; // Progress 进度条样式

/**
 * 不重定向白名单
 * 意思是说这个页面不会重定向
 */
const whiteList = [ '/login' ];

/**
 * 路由守卫
 */
router.beforeEach((to, from, next) => {
    NProgress.start(); // 显示 进度条

    /**
     * 判断是否获取到 token
     */
    if (window.sessionStorage.necrstoken) {
        
        /**
         * 获取到 token 的情况下, 访问的路径是 login 的情况下, 重定向到 首页
         */
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done(); // 手动关闭进度条 因为 如果当前页面是仪表板，则不会在每个钩子后触发，因此请手动处理它

        } else {
            next();

        }

    } else {
        // 未获取 token 的情况下, 判断跳转的路径是否在白名单
        if (whiteList.indexOf(to.path) !== -1) {
            next(); // 白名单的情况下不做任何处理即可

        } else {
            // 不在白名单的情况 重定向到登录页
            next(`/login?redirect=${to.path}`);
            NProgress.done();

        }
    }
})

router.afterEach(() => {
    NProgress.done() // 关闭 进度条
});
