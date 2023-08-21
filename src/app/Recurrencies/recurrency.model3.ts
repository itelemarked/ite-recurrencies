import { DateCH } from "./date-ch.model"
import { Period, PeriodUnit } from "./period.model"


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
  _lastEvent: DateCH
  _period: Period

  // constructor(recurrency: IRecurrency) {
  //   const { uid, title, lastEvent } = recurrency
  //   const { nb, unit } = recurrency.period

  //   this._uid = uid;
  //   this._title = title
  //   this._lastEvent = DateCH.fromISO(lastEvent)
  //   this._period = Period.from(nb, unit as PeriodUnit)
  // }

  constructor(recurrency: IRecurrency) {
    const { title, lastEvent, period, uid} = recurrency;
    this._title = title;
    this._lastEvent = DateCH.fromISO(lastEvent);
    this._period = Period.from(period.nb, period.unit)
    this._uid = uid;
  }

  get uid() {
    return this._uid;
  }

  get title() {
    return this._title;
  }

  get lastEvent(): DateCH {
    return DateCH.fromISO(this._lastEvent.toISODate()!)
  }

  get period() {
    return this._period.copy()
  }

  getExpiry(): DateCH {
    return this._lastEvent.plus(this._period)
  }

  getProgress(): number {
    const today = DateCH.today()
    const expiry = this.getExpiry();
    const lastEvent = this.lastEvent;

    return today.valueOf() - lastEvent.valueOf() / (expiry.valueOf() - lastEvent.valueOf())
  }

  setExpiry(date: DateCH): Recurrency {
    const uid = this._uid;
    const period = this._period.copy()
    const title = this._title
    const lastEvent = date.minus(period)
    return new Recurrency(title, lastEvent, period, uid)
  }

}
