/*
 * @Author: saber2pr
 * @Date: 2019-06-21 20:56:35
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-07-03 15:00:51
 */
import { zip } from "@saber2pr/fp/lib/list";
import { zips } from "@saber2pr/fp";
import { SearchResult } from "./result";

export const createPtbkMap = (ptbk: string) => {
  const m = ptbk.length / 2;
  const key = ptbk.slice(0, m).split("");
  const value = ptbk.slice(m).split("");
  return zip(key)(value);
};

export const transformDataFromPtbk = (ptbk: string, data: string) => {
  const dict = createPtbkMap(ptbk);
  return data
    .split("")
    .map(k => dict[k])
    .join("");
};

const RegTime = /([\d]{4}-[\d]{2}-[\d]{2}){1}/;

export function* timeRangeIt(start: string, end: string, step: number) {
  const current = new Date(start);
  current.setDate(current.getDate() + 2);
  const endTime = new Date(end);
  while (current < endTime) {
    yield RegTime.exec(current.toJSON())[0].replace(/-/g, "/");
    current.setDate(current.getDate() + step);
  }
}

export function timeRange(start: string, end: string, step: number) {
  return Array.from(timeRangeIt(start, end, step)).map(t => t.toString());
}

export const parseData = (data: string) => data.split(",");

export const searchResultsToCsv = (result: SearchResult[]) => {
  const { startDate, endDate } = result[0];
  console.log(startDate, endDate);
  const ts = timeRange(startDate, endDate, 7);
  const dss = result.map(res => parseData(res.data).slice(1));

  const head = ["时间", ...result.map(res => res.word)].join(",");
  const body = zips(ts, ...dss).map(line => line.join(","));

  return [head, ...body].join("\n");
};
