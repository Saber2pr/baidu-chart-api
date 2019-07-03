/*
 * @Author: saber2pr
 * @Date: 2019-06-21 22:15:37
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-07-03 14:41:55
 */
import { BaiduChart } from "..";

// 你的百度帐号 cookie, 参考类型 `BAIDUID=xxx`
const cookie = "";

// // search 传入关键词 搜索结果，console.log输出到控制台。
new BaiduChart(cookie).search("假面骑士").then(res => console.log(res));
