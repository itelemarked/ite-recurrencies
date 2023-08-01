import { DateTime, DurationLike, Interval } from "luxon"

type PeriodUnit = 'days' | 'weeks' | 'months' | 'years'

interface RecurrencyPeriod {
	nb: number,
	unit: PeriodUnit
}

interface IRecurrency {
	id?: string,
	lastEvent: string,
	period: RecurrencyPeriod
}

class Recurrency implements IRecurrency {

  private _id: string | undefined
  private _lastEvent: string
  private _period: RecurrencyPeriod

  get id(): string | undefined {
    return this._id
  }

	get lastEvent(): string {
    return this._lastEvent
  }

	get period(): RecurrencyPeriod {
    return { ...this._period }
  }

	constructor(recurrency: IRecurrency) {
    const { id, lastEvent, period } = recurrency;
    this._id = id
    this._lastEvent = lastEvent
    this._period = { ...period }
  }

	expiry(): string {
    const lastEventDate = DateTime.fromISO(this._lastEvent, {zone: 'America/New_York'}).endOf('day')

    const duration = (): DurationLike => {
      const { nb, unit } = this._period
      switch (unit) {
        case 'days': return { days: nb }
        case 'weeks': return { weeks: nb }
        case 'months': return { months: nb }
        case 'years': return { years: nb }
      }
    }

    const expiryDate = lastEventDate.plus(duration())
    return expiryDate.toISODate()!
  }

	progress(): number {
    const todayDate = DateTime.local({zone: 'America/New_York'}).endOf('day')
    const lastEventDate = DateTime.fromISO(this._lastEvent, {zone: 'America/New_York'}).endOf('day')
    const expiryDate = DateTime.fromISO(this.expiry(), {zone: 'America/New_York'}).endOf('day')

    const todayInterval = todayDate.valueOf() - lastEventDate.valueOf()
    const totalInterval = expiryDate.valueOf() - lastEventDate.valueOf()

    return todayInterval / totalInterval;
  }

	// remaining(periodUnit: PeriodUnit): number {}

}
