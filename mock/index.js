const user = require('./user');

/**
 * 监听http请求
 * exports 给 webpack 的函数
 */
module.exports = function(app) {
    app.post('/mock/user/login', (rep, res) => user.login(rep, res));
    app.get('/mock/user/logout', (rep, res) => user.logout(rep, res));
}
