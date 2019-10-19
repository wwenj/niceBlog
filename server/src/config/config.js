// default config
module.exports = {
  port: 80, // 将监听的端口修改为 1234
  // port: 8360x, // 将监听的端口修改为 1234
  workers: 1,
  url_route_on: true,
  cookie: {
    domain: '',
    path: '/',
    httpOnly: false, // 不允许js访问
    maxAge: 10 * 3600 * 1000 // 10个小时
    // signed: true,
    // keys: [] // 当 signed 为 true 时，使用 keygrip 库加密时的密钥
  }
};
