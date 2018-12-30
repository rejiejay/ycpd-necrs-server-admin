const user = {
    /**
     * 单一状态树 唯一数据源 (SSOT)
     * 注意这里的数据尽量扁平化, 页面上能处理的数据尽量让页面处理, 这里只做到简入简出
     */
    state: {
        token: '',
        name: '',
        avatar: '',
        roles: ''
    },

    /**
     * Action 类似于 mutation
     * Action 可以包含任意异步操作。
     */
    actions: {
        // /**
        //  * 登录
        //  */
        // Login({ commit }, userInfo) {
        //     const username = userInfo.username.trim();

        //     return new Promise((resolve, reject) => {
        //         // 通过用户名 与 密码 请求登录
        //         login(username, userInfo.password)
        //         .then(response => {
        //             const data = response.data;

        //             setToken(data.token);
        //             commit('SET_TOKEN', data.token);
        //             resolve();

        //         }).catch(error => reject(error));
        //     });
        // },
    },

    /**
     * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
     */
    mutations: {
        // /**
        //  * 设置 token
        //  */
        // SET_TOKEN: (state, token) => {
        //     state.token = token
        // },
    },
}

export default user
