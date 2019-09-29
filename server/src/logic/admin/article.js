module.exports = class extends think.Logic {
  get scope() {
    return {
      app_id: {
        // required: true
      }
    };
  }
  submitAction() {
    this.allowMethods = 'post'; //  只允许 POST 请求类型
    this.rules = {
      user_id: {
        int: true,
        required: true,
        default: ''
      },
      title: {
        string: true, // 字段类型为 String 类型
        default: '无标题', // 字段默认值为 'thinkjs'
        trim: true // 字段需要trim处理
      },
      content: {
        string: true,
        default: '无内容'
      },
      class: {
        int: true,
        required: true,
        default: ''
      },
      tab: {
        array: true,
        children: {
          int: true,
          trim: true,
          default: ''
        }
      }
    };
  }
};
