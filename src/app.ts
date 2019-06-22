#!/usr/bin/env node

/*
 * @Author: saber2pr
 * @Date: 2019-06-22 10:46:31
 * @Last Modified by:   saber2pr
 * @Last Modified time: 2019-06-22 10:46:31
 */
import { Terminal } from '@saber2pr/node'
import { BaiduChart } from './core'

const [arg] = Terminal.getParams()

async function App() {
  const pkgInfor = await Terminal.getCurrentPkgConfig(__dirname)
  if (/-v|--version/.test(arg)) {
    Terminal.tips(`version:${pkgInfor.version}\n`)
    Terminal.tips(
      `@saber2pr >> github: https://github.com/Saber2pr/baidu-chart-api\n`
    )
    return
  }

  Terminal.tips('qwq:输入你的认证信息?\n')
  const cookie = await Terminal.getUserInput('百度帐号cookie:\n')

  if (cookie) {
    Terminal.success('qwq:认证信息已完整(ok).\n')
  } else {
    Terminal.error('qwq:出错了呢QAQ！请再试一次?\n')
    return
  }

  Terminal.tips('qwq:输入你要搜的关键词?\n')
  const inputs = await Terminal.getUserInput('关键词(可以多个，逗号分隔):')

  const baiduAPI = new BaiduChart(cookie)

  const keywords = inputs
    .split(/,|，/g)
    .map(s => s.trim())
    .filter(_ => _)

  Terminal.tips('\nqwq:正在努力搜索中...\n')

  try {
    const results = await Promise.all(
      keywords.map(keyword => baiduAPI.search(keyword))
    )

    console.log(results)
    Terminal.tips(`\nqwq:搜索成功！关键词:[${keywords}]\n  主人请收好数据！`)
  } catch (error) {
    Terminal.error('搜索失败！可能是cookie不正确或失效！\n')
    Terminal.tips(
      '提示：1. 重新赋值一次cookie(以BAIDUID开头) 2.重新登录百度帐号刷新cookie后，再复制一次！\n'
    )
    console.log(error)
  }

  Terminal.tips('qwq小提示: 建议把cookie记在小本本上以便备用哦')
}

App().catch(console.log)
