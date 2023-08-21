import { DateTime, DurationLike } from "luxon";
import { Period } from "./period.model";


const TIMEZONE = 'America/New_York'
const LOCALE = 'fr-CH'

type DateString = string; // alias

type Unit = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks' | 'months' | 'years'



export class DateCH {

  _date: DateTime

  private constructor(date: DateTime) {
    this._date = date.setLocale(LOCALE);
  }

  static fromISO(s: DateString) {
    // validate s???
    const newDate = DateTime.fromISO(s, {zone: TIMEZONE}).endOf('day')
    return new DateCH(newDate)
  }

  static today() {
    const newDate = DateTime.local({zone: TIMEZONE}).endOf('day')
    return new DateCH(newDate)
  }

  valueOf() {
    return this._date.valueOf()
  }

  toISODate() {
    return this._date.toISODate()
  }

  toLocalString() {
    return this._date.toLocaleString()
  }

  plus(period: Period) {
    const toDuration = (period: Period): DurationLike => {
      const unit = period.getUnit()
      const nb = period.getNb()

      switch(unit) {
        case 'milliseconds': return { milliseconds: nb }
        case 'seconds': return { seconds: nb }
        case 'minutes': return { minutes: nb }
        case 'hours': return { hours: nb }
        case 'days': return { days: nb }
        case 'weeks': return { weeks: nb }
        case 'months': return { months: nb }
        case 'years': return { years: nb }
      }
    }

    const duration = toDuration(period);
    return DateCH.fromISO(this._date.plus(duration).toISO()!)
  }

}
