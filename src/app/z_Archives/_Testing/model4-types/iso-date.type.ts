import { throwTypeError } from "./error.util"

export type IsoDate = string & { _type: 'IsoDate' }


export const REGEX = /^(\d{4})-(\d{2})-(\d{2})$/


export function isIsoDate(s: string): s is IsoDate {
  const matchRegex = s.match(REGEX) !== null;
  const isValidDate = new Date(s).toString() !== 'Invalid Date';
  return matchRegex && isValidDate;
}


export function toIsoDate(s: string): IsoDate {
  if (!isIsoDate(s)) throwTypeError(`Invalid format or is not a valid date.`, s)
  return s as IsoDate
}


/** FOR THIS USE EXTERNAL DATE/TIME LIBRARY INSTEAD... */

// export function year(localDateString: IsoDate): number {
//   return +(localDateString.match(REGEX)![1])
// }


// export function month(localDateString: IsoDate): number {
//   return +(localDateString.match(REGEX)![2])
// }


// export function day(localDateString: IsoDate): number {
//   return +(localDateString.match(REGEX)![3])
// }
