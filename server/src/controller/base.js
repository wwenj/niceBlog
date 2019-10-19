module.exports = class extends think.Controller {
  async __before() {
    console.log(`>请求进入=================>${this.ctx.path}`);
    // console.log(this.cookie('userToken'));
    // console.log(await this.session());
    if (this.ctx.path !== '/user/login' && this.ctx.path !== '/appleText' && this.ctx.path !== '/appleAuth' && this.ctx.path !== '/.well-known/apple-developer-domain-association.txt') {
      const sessionToken = Object.keys(await this.session());
      if (sessionToken.indexOf(this.cookie('userToken')) === -1) {
        console.log('当前未登录');
        this.ctx.fail(1003, '登录信息不存在', {});
        return false;
      }
    }
    // 各个请求带来参数放到data中
    this.ctx.data = null;
    if (this.ctx.method === 'GET') {
      this.ctx.data = this.ctx.query;
    } else {
      this.ctx.data = this.ctx.post();
    }

    // if (this.ctx.path === '/appleAuth') {
    //   console.log(this.ctx.url);
    //   this.ctx.url = '/appleAuth/appleAuth';
    //   console.log(this.ctx.url);
    // }
  }
  __call() {
    console.log('===============当前没有匹配路由===============');
    this.body = `<h1>404<h2>`;
    // 如果相应的Action不存在则调用该方法
  }
};
