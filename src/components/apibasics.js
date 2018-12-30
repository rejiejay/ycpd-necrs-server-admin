/**
 * ajaxs请求复用的抽象
 */
import axios from 'axios';
import { Message } from 'element-ui';
import Router from '@/router';

/**
 * 加载框（防止重复点击）
 */
let myLoading = {
    /**
     * 显示加载框
     */
    show: function show() {
        let Loading = document.getElementById('el-loading-mask');
        // 判断加载框是否不存在
        if (!Loading) {
            // 不存在的情况下才创建
            Loading = document.createElement('div');
            Loading.id = 'el-loading-mask';
            Loading.classList.add("el-loading-mask");
            Loading.classList.add("is-fullscreen");
            Loading.setAttribute('style', 'z-index: 2000;');
            Loading.innerHTML = '<div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg></div>';
            document.body.classList.add('el-loading-parent--relative');
            document.body.appendChild(Loading);
        }
    },

    /**
     * 关闭加载框
     */
    close: function close() {
        let Loading = document.getElementById('el-loading-mask');
        // 判断加载框是否存在
        if (Loading) {
            // 存在的情况下才进行删除
            document.body.classList.remove('el-loading-parent--relative');
            document.body.removeChild(Loading);
        }
    },
}

// 创建axios实例
const apibasics = axios.create();

/**
 * 设置 请求(request)拦截器
 */
apibasics.interceptors.request.use(
    /**
     * 拦截请求头
     */
    config => {
        myLoading.show(); // 每个请求出去的时候, 显示加载框（主要用来防止UI重复点击提交）

        // 让每个请求携带自定义token
        config.headers['token'] = window.sessionStorage.necrstoken ? window.sessionStorage.necrstoken : 'null';

        return config;
    },

    /**
     * 请求未发出去的情况
     */
    error => {
        myLoading.close(); // 关闭加载框
        console.error(error); // for debug
        Message({
            message: `请求未发送, 原因: ${error}`,
            type: 'error',
            duration: 5 * 1000
        });
        Promise.reject(error); // 这个的意思是 获取到 Promise 然后调用 reject
    },
);

/**
 * 设置 响应(response)拦截器
 */
apibasics.interceptors.response.use(
    /**
     * 拦截响应
     */
    response => {
        const res = response.data;
        
        myLoading.close(); // 关闭加载框

        // 网络错误的情况
        if (response.status === 0 && response.statusText === 'error') {
            return Promise.reject('网络错误, 请检查你的网络');
        }

        // 登录过期的情况
        if (response.status === 444) {
            Router.push({ path: '/login' });
            return Promise.reject('登录过期, 请重新登录');
        }
    
        // 服务器正在升级或异常
        if (response.status === 502) {
            // 跳转等正在升级页面
            Router.push({ path: '/404' });
            return Promise.reject('服务器正在升级或异常,请稍后再试!');
        } 
        
        /**
         * 判断拦截的是否有 1000 没有的情况表示失败
         */
        if (res.code !== 1000) {
            // 不是 1000 的情况下, 直接报出错误

            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject('error');

        } else {
            return response.data;

        }
    },

    /**
     * 服务器返回错误的情况
     */
    (error, da, addd) => {
        myLoading.close(); // 关闭加载框
        
        console.error(`服务器错误: ${error}`); // for debug

        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });

        return Promise.reject(error);
    },
);

export default apibasics
