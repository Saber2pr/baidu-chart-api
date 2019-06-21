/*
 * @Author: saber2pr
 * @Date: 2019-06-21 20:56:35
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-06-21 21:00:24
 */
export const zip = (a: any[], b: any[]) =>
  a.reduce((receiver, x, i) => ({ ...receiver, [x]: b[i] }), {})

export const createPtbkMap = (ptbk: string) => {
  const m = ptbk.length / 2
  const key = ptbk.slice(0, m).split('')
  const value = ptbk.slice(m).split('')
  return zip(key, value)
}

export const transformDataFromPtbk = (ptbk: string, data: string) => {
  const dict = createPtbkMap(ptbk)
  return data
    .split('')
    .map(k => dict[k])
    .join('')
}
