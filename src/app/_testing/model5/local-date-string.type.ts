
export type LocalDateString = string & { _type: 'LocalDateString' }


const REGEX = /^(\d{4})-(\d{2})-(\d{2})$/


export function toLocalDateString(s: string): LocalDateString {
  const match = s.match(REGEX);
  if (match === null) throw new Error(`toLocalDate, invalid argument. Doesn't match 'xxxx-xx-xx'. Evaluating ${s}`)

  const date = new Date(s)
  if (date.toString() === 'Invalid Date') throw new Error(`toLocalDateString, invalid argument. Is not a valid date. Evaluating ${s}`)

  return s as LocalDateString
}


export function yyyy(localDateString: LocalDateString): number {
  return +(localDateString.match(REGEX)![1])
}


export function mm(localDateString: LocalDateString): number {
  return +(localDateString.match(REGEX)![2])
}


export function dd(localDateString: LocalDateString): number {
  return +(localDateString.match(REGEX)![3])
}
