import { PositiveInteger } from "./integers.type";
import { IsoDate, toIsoDate } from "./iso-date.type";
import { PeriodUnit } from "./period-unit.type";

import { DateTime, DurationLike, Interval } from "luxon";



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

// TODO:
// - what if zone is not valid??? --> DateTime object will be marked as 'invalid', and toISO() will return 'null'!
// - Theoretically, doesn't need 'zone'... right???
export function getExpiry(recurrency: Recurrency, zone: string): IsoDate {

  const { lastEvent } = recurrency
  const { nb, unit } = recurrency.period

  const lastEventDate = DateTime.fromISO(lastEvent, {zone}).endOf('day')

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

// TODO: what if zone is not valid???
export function getProgress(recurrency: Recurrency, zone: string): number {
  const { lastEvent } = recurrency
  const expiry = getExpiry(recurrency, zone)

  const todayDate = DateTime.local({zone}).endOf('day')
  const lastEventDate = DateTime.fromISO(lastEvent, {zone}).endOf('day')
  const expiryDate = DateTime.fromISO(expiry, {zone}).endOf('day')

  const todayInterval = todayDate.valueOf() - lastEventDate.valueOf()
  const totalInterval = expiryDate.valueOf() - lastEventDate.valueOf()

  return todayInterval / totalInterval;
}

// TODO: what if zone is not valid???
export function getRemainingUnit(recurrency: Recurrency, unit: PeriodUnit, zone: string): number {
  const todayDate = DateTime.local({zone}).endOf('day')
  const expiry = getExpiry(recurrency, zone)
  const expiryDate = DateTime.fromISO(expiry, {zone}).endOf('day')
  const i = Interval.fromDateTimes(todayDate, expiryDate)
  return i.length(unit)
}
