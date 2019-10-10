module.exports = class extends think.Logic {
  loginAction() {
    this.allowMethods = 'get'; //  只允许 POST 请求类型
    this.rules = {
      userName: {
        int: true,
        required: true,
        default: ''
      },
      passWord: {
        string: true,
        required: true,
        default: ''
      }
    };
  }
};
