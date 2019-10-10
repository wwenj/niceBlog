// default config
module.exports = {
  workers: 1,
  cookie: {
    domain: '',
    path: '/',
    httpOnly: false, // 不允许js访问
    maxAge: 10 * 3600 * 1000 // 10个小时
    // signed: true,
    // keys: [] // 当 signed 为 true 时，使用 keygrip 库加密时的密钥
  }
};
