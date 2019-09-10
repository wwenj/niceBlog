module.exports = class extends think.Controller {
  __before() {
    console.log('----请求开始前');
  }
  __call() {
    console.log('----当前没有匹配路由');
    this.body = `<h1>404<h2>`;
    // 如果相应的Action不存在则调用该方法
  }
};
