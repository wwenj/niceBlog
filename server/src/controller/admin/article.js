const Base = require('../base.js');
// const mysql = require('think-model-mysql');

module.exports = class extends Base {
  async submitAction() {
    let res;
    try {
      const blog_article = this.model('blog_article');
      const params = ['user_id', 'title', 'content', 'class', 'tab'];
      const data = this.post(params.join(','));
      data.tab = data.tab.join(',');
      blog_article.add(data);
      console.log(data);
    } catch (error) {
      console.error(`服务端错误${error}`);
      res = error;
    }

    this.success(res);
  }
};
