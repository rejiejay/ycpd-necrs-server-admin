import common from './config.default.js'; // 复用数据
import local from './config.local.js'; // 本地请求, 链接到测试环境, 目标是为了解决跨域的问题
import mock from './config.mock.js'; // 本地 mock 数据, 方便自己生成测试数据
import dev from './config.dev.js'; // 打包到开发环境用的配置
import prod from './config.prod.js'; // 生产环境用的配置

let main = () => {
    let config = common; // 公共配置
    let plugin = {};

    if (window.location.hostname === 'localhost') {
        // 本地环境
        plugin = local;

        // mock环境
        // plugin = mock;

    } else if (window.location.host === 'necrsserver.api2.hotgz.com') {
        // 测试环境
        plugin = dev;

    } else {
        plugin = prod;

    }

    /**
     * 混合 公共配置
     * 注意 公共配置 会覆盖掉 本身的配置 因为 代码执行是靠后的
     */
    for (let key in plugin) {
        config[key] = plugin[key];
    }

    return config;
}

export default main();
