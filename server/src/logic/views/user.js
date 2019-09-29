module.exports = class extends think.Logic {
  submitAction() {
    // this.rules = {
    //   title: {
    //     boolean: true, // 字段类型为 String 类型
    //     required: true, // 字段必填
    //     default: 'thinkjs', // 字段默认值为 'thinkjs'
    //     trim: true, // 字段需要trim处理
    //     method: 'GET' // 指定获取数据的方式
    //   },
    //   age: {
    //     int: {min: 20, max: 60} // 20到60之间的整数
    //   }
    // };
  }
};

// const Base = require('../base.js');

// module.exports = class extends Base {
//   indexAction() {
//     // return this.display();
//     console.log('index------');
//     // get参数
//     console.log(this.ctx.query);
//     // post参数.post  .file
//     console.log(this.ctx.request.body);
//     // get post属性
//     console.log(this.ctx.param('id'));
//     console.log(this.ctx.post('name'));
//     // 路径
//     console.log(this.ctx.path);
//     const res = {name: 'wang'};
//     this.success(res);
//   }
//   index1Action() {
//     // return this.display();
//     console.log(this.ctx.request.body);
//     console.log(this.ctx.param());
//     this.body = `<pre>index1</pre>`;
//   }
// };
// /**
//  *
//  *
//  */
// // const a = {
// //   errno: 0,
// //   message: 'succe',
// //   data: {
// //     list: [
// //       {
// //         head_img: 'http://www.daqianduan.com/wp-content/uploads/2018/03/timg-220x150.jpg',
// //         title: 'css性能优化-will-change',
// //         create_date: '2019-9-18',
// //         reader_num: '184',
// //         nice_num: '27',
// //         comment_num: '96'
// //       }
// //     ],
// //     page_data: {
// //       page: '1',
// //       page_size: '20',
// //       tatol: 180
// //     }
// //   }
// // };
