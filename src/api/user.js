/**
 * 因为登录前的操作 与封装的 apibasics 操作不一致, 所以登录前的请求是写在页面上的
 */
import apibasics from '@/components/apibasics';
import config from '@/config';

/**
 * 退出登录
 */
export function logout() {
    return apibasics({
        url: `${config.url.origin}/necrs/server/logout`,
        method: 'get'
    });
}
