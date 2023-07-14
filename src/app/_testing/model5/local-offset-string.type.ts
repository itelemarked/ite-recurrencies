
export type LocalOffsetString = string & { _type: 'LocalOffsetString' }


const REGEX = /^([+-])([0-9][0-9]|1[0-2]):([0-5][0-9])$/


export function toLocalOffsetString(s: string): LocalOffsetString {
  const match = s.match(REGEX);
  if (match === null) throw new Error(`toLocalOffsetString, invalid argument. Doesn't match 'shh:mm' where s: + or -, hh: 00-12, mm: 00-59. Evaluating ${s}`)

  return s as LocalOffsetString
}


export function sign(offsetString: LocalOffsetString): string {
  return offsetString.match(REGEX)![1];
}


export function hh(offsetString: LocalOffsetString): number {
  const signStr = offsetString.match(REGEX)![1];
  const hhStr = offsetString.match(REGEX)![2];
  return +(signStr + hhStr)
}


export function mm(offsetString: LocalOffsetString): number {
  const signStr = offsetString.match(REGEX)![1];
  const mmStr = offsetString.match(REGEX)![3];
  return +(signStr + mmStr)
}

