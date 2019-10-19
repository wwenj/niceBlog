const Base = require('./base.js');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const qs = require('qs');
const appleAuth = require('../utilAppleApple/appleAuth');
const apple = appleAuth.apple;
module.exports = class extends Base {
  async knownAction() {
    const privateKey = fs.readFileSync(path.join(__dirname, '../utilApple/apple-developer-domain-association.txt'), {encoding: 'utf-8'});
    this.ctx.body = privateKey;
  }
  async appleTextAction() {
    console.log('apple===========');
    console.log(apple);
    const option = this.ctx.query;
    const url = new URL('https://appleid.apple.com/auth/authorize');
    url.searchParams.append('response_type', option.response_type || 'code');
    url.searchParams.append('response_mode', option.response_mode || 'form_post');
    url.searchParams.append('state', option.state || 'state');
    url.searchParams.append('client_id', option.client_id || apple.client_id);
    url.searchParams.append('redirect_uri', option.redirect_uri || apple.url);
    url.searchParams.append('scope', option.scope || 'openid');
    this.success({
      params: this.ctx.query,
      url: url.toString()
    });
  }
  async appleAuthAction() {
    const getClientSecret = () => {
      const privateKey = fs.readFileSync(path.join(__dirname, '../utilApple/AuthKey_XHGXCP8B9S.txt'), {encoding: 'utf-8'});
      const headers = {
        alg: 'ES256',
        kid: apple.key_id
      };
      const timeNow = Math.floor(Date.now() / 1000);
      const claims = {
        iss: apple.team_id,
        aud: 'https://appleid.apple.com',
        sub: apple.client_id,
        iat: timeNow,
        exp: timeNow + 15777000
      };

      const token = jwt.sign(claims, privateKey, {
        algorithm: 'ES256',
        header: headers
        // expiresIn: '24h'
      });
      return token;
    };
    const reData = {
      grant_type: 'authorization_code', // refresh_token authorization_code
      code: this.ctx.data.code,
      redirect_uri: apple.url,
      client_id: apple.client_id,
      client_secret: getClientSecret()
      // refresh_token: this.ctx.data.id_token
      // scope: process.env.SCOPE
    };
    console.log('接受参数===============>');
    console.log(this.ctx.data);
    console.log('请求参数===============>');
    console.log(reData);
    await axios.request({
      method: 'POST',
      url: 'https://appleid.apple.com/auth/token',
      data: qs.stringify(reData),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Accept': 'application/json',
        // 'User-Agent':curl
      }
    }).then(res => {
      console.log('success=================>');
      this.ctx.success({success: res}, '/appleAuth');
      console.log(res);
    }).catch(err => {
      console.log('error=====================>');
      console.log(err);
      this.ctx.fail(100000, '错误/appleAuth', {
        params: reData,
        error: err});
    });
  }
};
