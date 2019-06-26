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

- cookie 需要抓包获得。([包含以`BAIDUID`(也可能是 BIDUPSID)开头的值就可以了, 示例>>](https://github.com/Saber2pr/baidu-chart-api/blob/master/src/test/test.ts#L10))

- 如果使用命令行工具，cookie 会缓存在命令执行的目录下，不需要再次输入！

- 自动生成 excel csv。(0.0.3 版本及以上支持， 版本号查询请执行 `baiduChart -v`)

## Bug

0.0.3 及以下版本在 windows 下会报错，最新版已解决。

## 免责声明

本项目只为学习所用，请勿用于商业用途。

使用本软件前，请先阅读

[使用百度指数前必读](http://index.baidu.com/Helper/?tpl=help&word=#duty) |
[百度指数版权声明](http://index.baidu.com/Helper/?tpl=help&word=#copyright)

如未遵守以上条款造成法律责任，本人概不负责！>\_<

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
