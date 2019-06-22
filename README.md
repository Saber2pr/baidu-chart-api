# @saber2pr/baidu-chart-api

[![npm](https://img.shields.io/npm/v/@saber2pr/baidu-chart-api.svg?color=%23f253d4)](https://www.npmjs.com/package/@saber2pr/baidu-chart-api)

> 百度指数数据解析

> 送给 b 站的小伙伴 qwq

# 使用方法

1. 确保电脑安装 node.js

2. 打开 cmd(或终端)，执行以下命令安装 app

windows 下执行

```bash
npm install @saber2pr/baidu-chart-api -g
```

mac 或 linux 下执行(加 sudo)

```bash
sudo npm install @saber2pr/baidu-chart-api -g
```

### 命令安装好 app 后

命令行执行

```bash
baiduChart
```

> 命令行输入 baiduChart 回车，然后根据提示就可以了

# API

```bash
npm i @saber2pr/baidu-chart-api
```

```ts
import { BaiduChart } from '@saber2pr/baidu-chart-api'

const cookie = '你的百度帐号cookie'

new BaiduChart(cookie).search('关键字')
```

- cookie 需要抓包获得。([以`BAIDUID`开头的值就可以了, 示例>>](https://github.com/Saber2pr/baidu-chart-api/blob/master/src/test/test.ts#L10))

> document.cookie 拿到的值不行！虽然大部分 cookie 都是 httponly=false 的，但是也有个别有安全策略。所以不如直接抓包来的快。

> 其实 cookie 是可以服务端模拟登录拿到的，但是由于百度的身份认证加密过于复杂，up 我只能手动复制 cookie 了 T_T

---

## start

```bash
npm install
```

```bash
npm start

npm test

```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
