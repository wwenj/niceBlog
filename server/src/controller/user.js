const Base = require('./base.js');

module.exports = class extends Base {
  async loginAction() {
    const User = this.model('user');
    const params = this.ctx.data;
    const userItem = await User.where({username: params.username}).find();
    if (userItem.password && userItem.password === params.password) {
      this.cookie('userToken', null);
      await this.session(null);
      const timeuuid = new Date().getTime();
      const tmpuuid = think.uuid();
      this.cookie('userToken', `${tmpuuid}&time=${timeuuid}`);
      await this.session(`${tmpuuid}&time=${timeuuid}`, userItem);
      // console.log(await this.cookie('userToken'));
      // console.log(await this.session(await this.cookie('userToken')));
      delete userItem.password
      // console.log(userItem)
      this.success(userItem, 'success');
    } else {
      this.fail(1002, '账号或密码错误', {});
    }
  }
  async infoAction() {
    let res = await this.session(this.cookie('userToken'))
    this.success(res, 'success');
  }
  async logoutAction() {
    console.log('退出')
    // let res = await this.session(this.cookie('userToken'))
    await this.session(this.cookie('userToken'),null)
    this.cookie('userToken', null);
    this.success({}, 'success');
  }
};

