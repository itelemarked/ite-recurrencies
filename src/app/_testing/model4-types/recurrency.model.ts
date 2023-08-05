import { PositiveInteger } from "./integers.type";
import { IsoDate, toIsoDate } from "./iso-date.type";
import { PeriodUnit } from "./period-unit.type";

import { DateTime, DurationLike } from "luxon";



const DEFAULT_TIMEZONE = 'America/New_York'


export interface RecurrencyPeriod {
  nb: PositiveInteger,
  unit: PeriodUnit
}


export interface Recurrency {
  id?: string,
  title: string,
  lastEvent: IsoDate,
  period: RecurrencyPeriod
}


export function getExpiry(recurrency: Recurrency): IsoDate {

  const { lastEvent } = recurrency
  const { nb, unit } = recurrency.period

  const lastEventDate = DateTime.fromISO(lastEvent, {zone: DEFAULT_TIMEZONE}).endOf('day')

  const duration = (): DurationLike => {
    switch (unit) {
      case 'days': return { days: nb }
      case 'weeks': return { weeks: nb }
      case 'months': return { months: nb }
      case 'years': return { years: nb }
    }
  }

  const expiryDate = lastEventDate.plus(duration())
  const expiryIsoDate = toIsoDate(expiryDate.toISODate()!)
  return expiryIsoDate
}

export function getProgress(): number {
  const todayDate = DateTime.local({zone: ZONE}).endOf('day')
  const lastEventDate = DateTime.fromISO(this._lastEvent, {zone: ZONE}).endOf('day')
  const expiryDate = DateTime.fromISO(this.expiry(), {zone: ZONE}).endOf('day')

  const todayInterval = todayDate.valueOf() - lastEventDate.valueOf()
  const totalInterval = expiryDate.valueOf() - lastEventDate.valueOf()

  return todayInterval / totalInterval;
}

export function getRemaining(periodUnit: PeriodUnit): number {
  const todayDate = DateTime.local({zone: ZONE}).endOf('day')
  const expiryDate = DateTime.fromISO(this.expiry(), {zone: ZONE}).endOf('day')
  const i = Interval.fromDateTimes(todayDate, expiryDate)
  return i.length(periodUnit)
}
