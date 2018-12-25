import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
    /**
     * 单一状态树 唯一数据源 (SSOT)
     * 注意这里的数据尽量扁平化, 页面上能处理的数据尽量让页面处理, 这里只做到简入简出
     */
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    /**
     * Action 类似于 mutation
     * Action 可以包含任意异步操作。
     */
    actions: {
        /**
         * 登录
         */
        Login({ commit }, userInfo) {
            const username = userInfo.username.trim();

            return new Promise((resolve, reject) => {
                // 通过用户名 与 密码 请求登录
                login(username, userInfo.password)
                .then(response => {
                    const data = response.data;

                    setToken(data.token);
                    commit('SET_TOKEN', data.token);
                    resolve();

                }).catch(error => reject(error));
            });
        },

        /**
         * 获取用户信息
         */
        GetInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                // 通过 token 获取 用户信息
                getInfo(state.token)
                .then(response => {
                    const data = response.data
                    
                    // 验证返回的roles是否是一个非空数组
                    if (data.roles && data.roles.length > 0) {
                        commit('SET_ROLES', data.roles);

                    } else {
                        reject('getInfo: roles must be a non-null array !');

                    }

                    commit('SET_NAME', data.name); // 名称
                    commit('SET_AVATAR', data.avatar); // 头像
                    resolve(response);

                }).catch(error => reject(error));
            })
        },

        /**
         * 登出
         */
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {

                logout(state.token)
                .then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve();

                }).catch(error => reject(error));
            })
        },

        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve();
            });
        }
    },

    /**
     * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
     */
    mutations: {
        /**
         * 设置 token
         */
        SET_TOKEN: (state, token) => {
            state.token = token
        },

        /**
         * 设置 昵称
         */
        SET_NAME: (state, name) => {
            state.name = name
        },

        /**
         * 设置 头像
         */
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },

        /**
         * 设置 权限
         */
        SET_ROLES: (state, roles) => {
            state.roles = roles
    }
    },
}

export default user
