const Base = require('../base.js');

module.exports = class extends Base {
  async submitAction() {
    let res;
    try {
      this.cookie('user', 'wangwenjain');
      this.session('aaaa', '1212121212121');
      const blogArticle = this.model('blog_article');
      const params = ['user_id', 'title', 'class', 'tab'];
      const data = this.post(params.join(','));
      data.tab = data.tab.join(',');
      // blogArticle.add(data);
      console.log(data);
      console.log('cookie=>', this.cookie('user'));
      console.log(await this.session());
    } catch (error) {
      console.error(`服务端错误${error}`);
      res = error;
    }

    this.success(res);
  }
};
