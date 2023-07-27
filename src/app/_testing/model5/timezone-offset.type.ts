
export type TimezoneOffset = string & { _type: 'TimezoneOffset' }


const REGEX = /^([+-])([0-9][0-9]|1[0-2]):([0-5][0-9])$/


export function toTimezoneOffset(s: string): TimezoneOffset {
  const match = s.match(REGEX);
  if (match === null) throw new Error(`toTimezoneOffset(), invalid argument. Doesn't match 'shh:mm' where s: + or -, hh: 00-12, mm: 00-59. Evaluating ${s}`)

  return s as TimezoneOffset
}


export function sign(offsetString: TimezoneOffset): string {
  return offsetString.match(REGEX)![1];
}


export function hours(offsetString: TimezoneOffset): number {
  const signStr = offsetString.match(REGEX)![1];
  const hhStr = offsetString.match(REGEX)![2];
  return +(signStr + hhStr)
}


export function minutes(offsetString: TimezoneOffset): number {
  const signStr = offsetString.match(REGEX)![1];
  const mmStr = offsetString.match(REGEX)![3];
  return +(signStr + mmStr)
}

