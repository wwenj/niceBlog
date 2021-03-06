const fileCache = require('think-cache-file');
const nunjucks = require('think-view-nunjucks');
const fileSession = require('think-session-file');
const redisSession = require('think-session-redis');
const mysql = require('think-model-mysql');
const {Console, File, DateFile} = require('think-logger3');
const path = require('path');
const account = require('../../account');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'mysql',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  mysql: {
    handle: mysql,
    // database: '',
    prefix: '',
    encoding: 'utf8',
    // host: '',
    // port: '',
    // user: '',
    // password: '',
    dateStrings: true,
    pageSize: 20, // 设置默认每页为 20 条
    acquireWaitTimeout: 100000, // 等待连接的超时时间，避免获取不到连接一直卡在那里，开发环境下有用s
    ...account.mysql
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
    type: 'file',
  common: {
    cookie: {
      name: 'thinkjs',
      //maxAge: '',
      //expires: '',
      path: '/',  //a string indicating the path of the cookie
      //domain: '',
      //secure: false,
      //keys: [],
      httpOnly: true,
      sameSite: false,
      signed: false,
      overwrite: false
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session'), //file session store root path
    maxAge: '1d', //session timeout, default is 1 day
    autoUpdate: false, //update expires time when get session, default is false
  }
  // type: 'redis',
  // common: {
  //   cookie: {
  //     name: 'thinkjs',
  //     // maxAge: '',
  //     // expires: '',
  //     path: '/', // a string indicating the path of the cookie
  //     // domain: '',
  //     // secure: false,
  //     // keys: [],
  //     httpOnly: true,
  //     sameSite: false,
  //     signed: false,
  //     overwrite: false
  //   }
  // },
  // redis: {
  //   handle: redisSession,
  //   maxAge: 20 * 1000, // session timeout, if not set, session will be persistent.
  //   autoUpdate: false // update expired time when get session, default is false
  // }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'nunjucks',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    sep: '_',
    extname: '.html'
  },
  nunjucks: {
    handle: nunjucks
  }
};

/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
