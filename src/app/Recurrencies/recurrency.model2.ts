import { DateTime } from "luxon"
import { DateString, PositiveInteger, toDateString, toPeriodUnit, toPositiveInteger } from "./recurrency.model"

export type PeriodUnit = 'days' | 'weeks' | 'months' | 'years'


export interface IRecurrency {
  uid?: string,
  title: string,
  lastEvent: string,
  period: {
    nb: number,
    unit: string
  }
}


export class Recurrency {

  _uid?: string
  _title: string
  _lastEvent: DateString
  _period: {
    nb: PositiveInteger,
    unit: PeriodUnit
  }

  constructor(recurrency: IRecurrency) {
    const { uid, title, lastEvent } = recurrency
    const { nb, unit } = recurrency.period

    this._uid = uid;
    this._title = title
    this._lastEvent = toDateString(lastEvent)
    this._period = {
      nb: toPositiveInteger(nb),
      unit: toPeriodUnit(unit)
    }
  }

  getUid() {
    return this._uid;
  }

  getTitle() {
    return this._title;
  }

  getLastEvent(opts: {format: 'ch' | 'dateString'} = { format: 'dateString'}): string {
    switch(opts.format) {
      case 'dateString':
      {
        return this._lastEvent
      }

      case 'ch':
      {
        const TIMEZONE = 'America/New_York'
        const date = DateTime.fromISO(this._lastEvent, {zone: TIMEZONE}).endOf('day')
        const day = date.day.toString().padStart(2,'0')
        const month = date.month.toString().padStart(2,'0')
        const year = date.year.toString()
        return `${day}.${month}.${year}`
      }
    }
  }

  getPeriod() {
    return { ...this._period }
  }

  getPeriodToString() {
    const { nb, unit } = this._period
    const unitString = nb > 1 ? unit : unit.replace(/s$/, '')
    return `${nb} ${unitString}`
  }

  getExpiry(opts: {format: 'ch' | 'dateString'} = { format: 'dateString'}) {
    const toDuration = (nb: PositiveInteger, unit: PeriodUnit) => {
      switch (unit) {
        case 'days': return {days: nb}
        case 'weeks': return {weeks: nb}
        case 'months': return {months: nb}
        case 'years': return {years: nb}
      }
    }

    const TIMEZONE = 'America/New_York'
    const date = DateTime.fromISO(this._lastEvent, {zone: TIMEZONE}).endOf('day')
    const { unit, nb } = this._period;
    const expiryDate = date.plus(toDuration(nb, unit))

    switch(opts.format) {
      case 'dateString':
      {
        return expiryDate.toISODate()
      }

      case 'ch':
      {
        const day = expiryDate.day.toString().padStart(2,'0')
        const month = expiryDate.month.toString().padStart(2,'0')
        const year = expiryDate.year.toString()
        return `${day}.${month}.${year}`
      }
    }
  }

}
