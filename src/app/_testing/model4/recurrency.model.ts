import { IsoDate } from "./iso-date.type";










export interface RecurrencyPeriod {
  nb: PositiveInteger,
  unit: PeriodUnit
}


export interface Recurrency {
  id: string,
  title: string,
  lastEvent: IsoDate,
  period: RecurrencyPeriod
}




/**
 * @param s any string or number (milliseconds) which is compatible with Date.constructor() or 'today'.
 * @returns a yyyy-mm-dd format.
 */
export function toIsoDate(s: string | number | 'today'): IsoDate | never {
  const datum = s === 'today' ? new Date() : new Date(s);

  const invalidDate = datum.toString() === 'Invalid Date';
  if (invalidDate) throw new Error(`toIsoDate(s) type error... evaluating 's': ${s}`)

  return datum.toISOString().match(/^\d{4}-\d{2}-\d{2}/)![0] as IsoDate;
}


/**
 *
 * @param n any number
 * @returns a PositiveInteger, or throw error
 */
export function toPositiveInteger(n: number): PositiveInteger | never {
  if (!Number.isInteger(n) || n <= 0) throw new Error(`PositiveInteger type error: evaluating ${n}`)
  return n as PositiveInteger;
}
