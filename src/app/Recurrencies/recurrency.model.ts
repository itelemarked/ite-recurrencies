


export type DateString = string & { _type: 'DateString' }

export function isDateString(s: string): s is DateString {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  const matchRegex = s.match(regex) !== null
  const isValidDate = new Date(s).toString() !== 'Invalid Date'
  return matchRegex && isValidDate
}

export function toDateString(s: string): DateString {
  if (!isDateString(s)) throw new Error(`Invalid DateString, evaluating ${s}`)
  return s;
}


export type PositiveInteger = number & { _type: 'PositiveInteger' }

export function isPositiveInteger(n: number): n is PositiveInteger {
  const isInteger = Number.isInteger(n)
  const isPositive = n > 0
  return isInteger && isPositive
}

export function toPositiveInteger(n: number): PositiveInteger {
  if (!isPositiveInteger(n)) throw new Error(`Invalid PositiveInteger, evaluating ${n}`)
  return n;
}

const UNITS = ['days', 'weeks', 'months', 'years']
export type PeriodUnit = 'days' | 'weeks' | 'months' | 'years'

export function toPeriodUnit(s: string): PeriodUnit {
  if (!UNITS.includes(s)) throw new Error(`Invalid PeriodUnit, evaluating ${s}`)
  return s as PeriodUnit
}


export interface Recurrency {
  uid?: string,
  title: string,
  lastEvent: DateString,
  period: {
    nb: PositiveInteger,
    unit: PeriodUnit
  }
}


// export interface Recurrency {
//   uid?: string,
//   title: string,
//   lastEvent: string,
//   period: {
//     nb: number,
//     unit: PeriodUnit
//   }
// }

