module.exports = class extends think.Controller {
  __before() {
    console.log(`>请求进入=================>${this.ctx.path}`);
    // 各个请求带来参数放到data中
    this.ctx.data = null;
    if (this.ctx.method === 'GET') {
      this.ctx.data = this.ctx.query;
    } else {
      this.ctx.data = this.ctx.post();
    }
  }
  __call() {
    console.log('===============当前没有匹配路由===============');
    this.body = `<h1>404<h2>`;
    // 如果相应的Action不存在则调用该方法
  }
};
