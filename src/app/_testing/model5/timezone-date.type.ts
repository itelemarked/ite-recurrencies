
export type TimezoneDate = string & { _type: 'TimezoneDate' }


export const REGEX = /^(\d{4})-(\d{2})-(\d{2})$/


export function isTimezoneDate(s: string): s is TimezoneDate {
  const matchRegex = s.match(REGEX) !== null;
  const isValidDate = new Date(s).toString() !== 'Invalid Date';
  return matchRegex && isValidDate;
}


export function toTimezoneDate(s: string): TimezoneDate {
  // const match = s.match(REGEX);
  // if (match === null) throw new Error(`toLocalDate, invalid argument. Doesn't match 'xxxx-xx-xx'. Evaluating ${s}`)

  // const date = new Date(s)
  // if (date.toString() === 'Invalid Date') throw new Error(`toLocalDateString, invalid argument. Is not a valid date. Evaluating ${s}`)

  if (!isTimezoneDate(s)) throw new Error(`toLocalDateString(), invalid argument. Evaluating ${s}`)
  return s as TimezoneDate
}


export function yyyy(localDateString: TimezoneDate): number {
  return +(localDateString.match(REGEX)![1])
}


export function mm(localDateString: TimezoneDate): number {
  return +(localDateString.match(REGEX)![2])
}


export function dd(localDateString: TimezoneDate): number {
  return +(localDateString.match(REGEX)![3])
}
