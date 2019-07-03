#!/usr/bin/env node

/*
 * @Author: saber2pr
 * @Date: 2019-06-22 10:46:31
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-07-03 14:38:08
 */
import { Terminal, FS } from "@saber2pr/node";
import { BaiduChart, searchResultsToCsv } from "./core";
import { join } from "path";
import { getID } from "./core/utils";

const [arg] = Terminal.getParams();

/** cookie 缓存目录 **/
const cookie_temp = join(process.cwd(), "cookie_baidu.txt");

async function App() {
  const id = getID();
  Terminal.notice(`qwq:主人！${id}号机为您服务！请多多关照！\n`);
  /** 版本信息 */

  const pkgInfor = await Terminal.getCurrentPkgConfig(__dirname);
  if (/-v|--version/.test(arg)) {
    Terminal.notice(`version:${pkgInfor.version}\n`);
    Terminal.tips(
      `@saber2pr >> github: https://github.com/Saber2pr/baidu-chart-api\n`
    );
    return;
  }

  /** cookie 缓存 **/

  let cookie: string;
  const isLogined = await FS.exists(cookie_temp);

  if (isLogined) {
    cookie = (await FS.readFile(cookie_temp)).toString();
  } else {
    Terminal.notice("qwq:主人请先介绍一下自己吧！\n");
    cookie = await Terminal.getUserInput("百度帐号cookie:\n");
    Terminal.success("qwq:你以后就是我的master啦.\n");
  }

  if (cookie) {
    Terminal.success("qwq:认证信息已完整(ok).");

    await FS.writeFile(cookie_temp, cookie);
    Terminal.success(`qwq:cookie已缓存 >> ${cookie_temp}\n`);
  } else {
    Terminal.error("qwq:诶？！出错了呢QAQ！主人请再试一次?\n");

    await FS.remove(cookie_temp);
    return;
  }

  /** 表单 **/

  Terminal.notice("qwq:主人想了解什么呢?(是我的身体吗?\\坏笑)");
  const inputs = await Terminal.getUserInput("关键词(可以多个，逗号分隔):");
  if (!inputs) {
    Terminal.notice(`\nqwq: ${id}号机没有听到主人的命令，此次任务失败！`);
    return;
  }
  const baiduAPI = new BaiduChart(cookie);

  const keywords = inputs
    .split(/,|，/g)
    .map(s => s.trim())
    .filter(_ => _);

  Terminal.notice("\nqwq:主人请先喝口水，正在努力搜索中...\n");

  /** HTTP 请求并发 **/

  try {
    const results = await Promise.all(
      keywords.map(keyword => baiduAPI.search(keyword))
    );
    console.log(results);
    Terminal.notice(`\nqwq:搜索成功！关键词:[${keywords}]\n  主人请收好数据！`);

    const file_path = join(
      process.cwd(),
      `Excel数据_${keywords.join("-")}_${Date.now()}.csv`
    );
    await FS.writeFile(file_path, searchResultsToCsv(results));

    Terminal.notice(`\nqwq:Excel文件生成成功！>> ${file_path}\n`);
  } catch (error) {
    Terminal.error("qwq：搜索失败啦！可能是cookie不正确或失效！\n");

    await FS.remove(cookie_temp);
    Terminal.notice(
      "提示：1. 重新复制一次cookie(以BAIDUID开头，注意全选) 2.重新登录百度帐号刷新cookie后，再复制一次！\n"
    );
    console.log(error);
  }

  /** 结束信息 **/

  Terminal.notice(`qwq: ${id}号机任务已完成！主人我还会想你的！`);
}

App().catch(console.log);
