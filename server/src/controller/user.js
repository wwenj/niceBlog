const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const res = {};
    const User = this.model('user');
    const params = this.ctx.data;
    const userItem = await User.where({username: params.userName}).find();
    console.log('----登录用户');
    if (userItem.password && userItem.password === params.passWord) {
      this.cookie('userToken', null);
      const timeuuid = new Date().getTime();
      const tmpuuid = think.uuid();
      this.cookie('userToken', `${tmpuuid}&time=${timeuuid}`);
      await this.session(`${tmpuuid}&time=${timeuuid}`, userItem);
      console.log(await this.cookie('userToken'));
      console.log(await this.session(await this.cookie('userToken')));
      this.success(res, 'success');
    } else {
      this.fail(1001, '账号或密码错误', res);
    }
  }
};
