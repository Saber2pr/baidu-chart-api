#!/usr/bin/env node

/*
 * @Author: saber2pr
 * @Date: 2019-06-22 10:46:31
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-22 16:41:18
 */
import { Terminal, FS } from '@saber2pr/node'
import { BaiduChart, searchResultsToCsv } from './core'
import { join } from 'path'

const [arg] = Terminal.getParams()

/** cookie 缓存目录 **/
const cookie_temp = join(process.cwd(), 'cookie_baidu.txt')

async function App() {
  /** 版本信息 */

  const pkgInfor = await Terminal.getCurrentPkgConfig(__dirname)
  if (/-v|--version/.test(arg)) {
    Terminal.tips(`version:${pkgInfor.version}\n`)
    Terminal.tips(
      `@saber2pr >> github: https://github.com/Saber2pr/baidu-chart-api\n`
    )
    return
  }

  /** cookie 缓存 **/

  let cookie: string
  const isLogined = await FS.exists(cookie_temp)

  if (isLogined) {
    cookie = (await FS.readFile(cookie_temp)).toString()
  } else {
    Terminal.tips('qwq:输入你的认证信息?\n')
    cookie = await Terminal.getUserInput('百度帐号cookie:\n')
  }

  if (cookie) {
    Terminal.success('qwq:认证信息已完整(ok).\n')

    await FS.writeFile(cookie_temp, cookie)
    Terminal.success(`\nqwq:cookie已缓存 >> ${cookie_temp}`)
  } else {
    Terminal.error('qwq:出错了呢QAQ！请再试一次?\n')

    await FS.remove(cookie_temp)
    return
  }

  /** 表单 **/

  Terminal.tips('qwq:输入你要搜的关键词?\n')
  const inputs = await Terminal.getUserInput('关键词(可以多个，逗号分隔):')

  const baiduAPI = new BaiduChart(cookie)

  const keywords = inputs
    .split(/,|，/g)
    .map(s => s.trim())
    .filter(_ => _)

  Terminal.tips('\nqwq:正在努力搜索中...\n')

  /** HTTP 请求并发 **/

  try {
    const results = await Promise.all(
      keywords.map(keyword => baiduAPI.search(keyword))
    )
    console.log(results)
    Terminal.tips(`\nqwq:搜索成功！关键词:[${keywords}]\n  主人请收好数据！`)

    const file_path = join(
      process.cwd(),
      `Excel数据_${keywords.join('-')}_${Date.now()}.csv`
    )
    await FS.writeFile(file_path, searchResultsToCsv(results))

    Terminal.tips(`\nqwq:Excel文件生成成功！>> ${file_path}`)
  } catch (error) {
    Terminal.error('搜索失败！可能是cookie不正确或失效！\n')

    await FS.remove(cookie_temp)
    Terminal.tips(
      '提示：1. 重新复制一次cookie(以BAIDUID开头，注意全选) 2.重新登录百度帐号刷新cookie后，再复制一次！\n'
    )
    console.log(error)
  }

  /** 结束信息 **/

  Terminal.tips('qwq小提示: 建议把cookie记在小本本上以便备用哦')
}

App().catch(console.log)
