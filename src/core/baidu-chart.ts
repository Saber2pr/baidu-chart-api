/*
 * @Author: saber2pr
 * @Date: 2019-06-21 21:07:23
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-26 13:49:19
 */
import axios, { AxiosInstance } from 'axios'
import { Baidu } from './url'
import { transformDataFromPtbk } from './parser'
import { SearchResult } from './result'

interface PTBK_Result {
  status: number
  data: string
}

interface Thumbnail {
  status: number
  data: {
    pc: {
      word: string
      area: number
      startDate: string
      endDate: string
      data: string
    }
    wise: {
      word: string
      area: number
      startDate: string
      endDate: string
      data: string
    }
    all: {
      word: string
      area: number
      startDate: string
      endDate: string
      data: string
    }
    uniqid: string
  }
  message: string
}

interface Index {
  status: number
  data: {
    userIndexes: Array<{
      word: string
      all: { startDate: string; endDate: string; data: string }
      pc: { startDate: string; endDate: string; data: string }
      wise: { startDate: string; endDate: string; data: string }
      type: string
    }>
    generalRatio: Array<{
      word: string
      all: { avg: number; yoy: number; qoq: number }
      pc: { avg: number; yoy: number; qoq: string }
      wise: { avg: number; yoy: string; qoq: number }
    }>
    uniqid: string
  }
  message: number
}

export class BaiduChart {
  /**
   * # 百度指数数据解析
   * * 需要百度帐号Cookie信息
   * @param {string} Baidu_Cookie
   * @memberof BaiduChart
   */
  public constructor(private readonly Baidu_Cookie: string) {
    this.request = axios.create({
      headers: {
        Cookie: Baidu_Cookie
      }
    })

    this.initInterceptors()
  }

  private request: AxiosInstance

  private async getPTBK(uniqid: string) {
    return await this.request.get<PTBK_Result>(Baidu.PTBK, {
      params: {
        uniqid
      }
    })
  }

  private initInterceptors() {
    this.request.interceptors.response.use(res => {
      if (res.status !== 200) {
        return Promise.reject({
          message: '请求失败！',
          data: res.data
        })
      }

      return res
    })
  }

  /**
   * # 输入搜索关键词
   *
   * @param {string} keyword
   * @returns
   * @memberof BaiduChart
   */
  public async search(keyword: string, days = 365): Promise<SearchResult> {
    const {
      data: {
        data: {
          uniqid,
          userIndexes: [
            {
              word,
              all: { startDate, endDate, data }
            }
          ]
        }
      }
    } = await this.request.get<Index>(Baidu.Index, {
      params: {
        area: 0,
        word: keyword,
        days
      }
    })

    const {
      data: { data: ptbk }
    } = await this.getPTBK(uniqid)

    return {
      word,
      startDate,
      endDate,
      data: transformDataFromPtbk(ptbk, data)
    }
  }
}
