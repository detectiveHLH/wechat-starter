[English](./README.md) | 简体中文

# Wechat Official Account Starter

- 预览：http://preview.pro.ant.design
- 首页：http://pro.ant.design/index-cn
- 使用文档：http://pro.ant.design/docs/getting-started-cn
- 更新日志: http://pro.ant.design/docs/changelog-cn
- 常见问题：http://pro.ant.design/docs/faq-cn

## 特性

- 快速的搭建自己的微信公众号（服务号）开发环境
- 能够做到静默登陆
- 并且在前端对微信相关页面做权限验证
- 基于Antd-pro框架
## 使用
- 请确认有注册成功的测试号，并且完成相关测试号码配置，并且搭配[wechat-api-starter](https://github.com/detectiveHLH/wechat-api-starter)
  起使用
- 修改/src/config/app.js中的IP为自己的ip，APP_ID修改为自己的测试号

```bash
$ npm install
$ npm start         # 访问 http://localhost:8000
```
- 完成上述步骤后在微信web开发工具中输入
  http://你的地址:8000/#/blank/login_wechat/wechat.test # 完成微信鉴权之后会重定向到/wechat/test路由

## 兼容性

现代浏览器及 IE11。
