/**
 * ajaxs请求复用的抽象
 */
import axios from 'axios';
import { Loading, Message } from 'element-ui';

// 创建axios实例
const service = axios.create();

/**
 * 设置 请求(request)拦截器
 */
service.interceptors.request.use(
    /**
     * 拦截请求头
     */
    config => {
        // 每个请求出去的时候, 显示加载框（防止重复点击）
        Loading.service({ fullscreen: true });

        // 让每个请求携带自定义token
        config.headers['necrs-token'] = window.localStorage.necrstoken;

        return config;
    },

    /**
     * 请求未发出去的情况
     */
    error => {
        Loading.close(); // 关闭加载框
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
service.interceptors.response.use(
    /**
     * 拦截响应
     */
    response => {
        Loading.close(); // 关闭加载框
        const res = response.data;

        /**
         * 判断拦截的是否有 1000 没有的情况表示失败
         */
        if (res.code !== 1000) {
            // 不是 1000 的情况下 直接报出错误
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });

            return Promise.reject('error');

        } else {
            return response.data

        }
    },

    /**
     * 服务器返回错误的情况
     */
    error => {
        Loading.close(); // 关闭加载框
        console.error(`服务器错误: ${error}`); // for debug

        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });

        return Promise.reject(error);
    },
)

export default service
