const app = {
    
    /**
     * 单一状态树 唯一数据源 (SSOT)
     * 注意这里的数据尽量扁平化, 页面上能处理的数据尽量让页面处理, 这里只做到简入简出
     */
    state: {
        /**
         * 侧边栏
         */
        sidebar: {
            opened: !+window.sessionStorage.sidebarStatus,
            withoutAnimation: false
        },

        device: 'desktop',
    },

    /**
     * Action 类似于 mutation
     * Action 可以包含任意异步操作。
     */
    actions: {
        /**
         * 切换 侧边栏的方法 toggle siderbar
         */
        ToggleSideBar: ({ commit }) => {
            commit('TOGGLE_SIDEBAR');
        },

        /**
         * 关闭侧边栏 close siderbar 
         */
        CloseSideBar({ commit }, { withoutAnimation }) {
            commit('CLOSE_SIDEBAR', withoutAnimation);
        },
        
        /**
         * 切换 设备 device
         */
        ToggleDevice({ commit }, device) {
            commit('TOGGLE_DEVICE', device);
        }
    },

    /**
     * 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
     */
    mutations: {
        /**
         * 切换 侧边栏的方法 toggle siderbar
         */
        TOGGLE_SIDEBAR: state => {

            /**
             * 持久化 侧边栏 是否打开
             */
            if (state.sidebar.opened) {
                window.sessionStorage.setItem('sidebarStatus', 1);

            } else {
                window.sessionStorage.setItem('sidebarStatus', 0);

            }

            state.sidebar.opened = !state.sidebar.opened; // 侧边栏切换
            state.sidebar.withoutAnimation = false; // 是否有动画
        },

        /**
         * 关闭侧边栏 close siderbar 
         */
        CLOSE_SIDEBAR: (state, withoutAnimation) => {
            window.sessionStorage.setItem('sidebarStatus', 1);
            state.sidebar.opened = false
            state.sidebar.withoutAnimation = withoutAnimation
        },

        /**
         * 切换 设备 device
         */
        TOGGLE_DEVICE: (state, device) => {
            state.device = device
        }
    },
}

export default app
