var Mock = require('mockjs');

module.exports = {
    /**
     * 登录
     */
    login: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {
                    "token": Mock.Random.id(),
                    "username": Mock.Random.name(),
                    "roles": 1,
                },
                "msg": "success"
            }
        ));
    },

    /**
     * 登出
     */
    logout: (rep, res) => {
        res.json(Mock.mock(
            {
                "code": 1000,
                "data": {},
                "msg": "success"
            }
        ));
    },
}


