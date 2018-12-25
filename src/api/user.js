import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 通过用户名和密码登录
 */
export function login(username, password) {
    return apibasics({
        url: `${config.url.origin}/user/login`,
        method: 'post',
        data: {
            username,
            password
        }
    });
}

/**
 * 退出登录
 */
export function logout() {
    return apibasics({
        url: `${config.url.origin}/user/logout`,
        method: 'post'
    });
}
