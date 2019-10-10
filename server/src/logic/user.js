module.exports = class extends think.Logic {
  loginAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    this.rules = {
      username: {
        int: true,
        required: true,
        default: ''
      },
      password: {
        string: true,
        required: true,
        default: ''
      }
    };
  }
};
