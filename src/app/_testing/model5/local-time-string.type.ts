
export type LocalTimeString = string & { _type: 'LocalTimeString' }


const REGEX = /^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/


export function toLocalTimeString(s: string): LocalTimeString {
  const match = s.match(REGEX);
  if (match === null) throw new Error(`toLocalTimeString, invalid argument. Doesn't match 'hh:mm:ss' where hh: 00-23, mm: 00-59, ss: 00-59. Evaluating ${s}`)

  return s as LocalTimeString
}


export function hh(localTimeString: LocalTimeString): number {
  return +(localTimeString.match(REGEX)![1]);
}


export function mm(localTimeString: LocalTimeString): number {
  return +(localTimeString.match(REGEX)![2]);
}


export function ss(localTimeString: LocalTimeString): number {
  return +(localTimeString.match(REGEX)![3]);
}
