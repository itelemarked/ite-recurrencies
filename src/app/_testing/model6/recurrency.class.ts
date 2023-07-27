
type PeriodUnit = 'days' | 'weeks' | 'months' | 'years';

type DateString = string & { _type: 'DateString' }

function assertDateString(s: string): asserts s is DateString {
  const regex = /^\d{4}-\d{2}-\d{2}$/
  const matchRegex = s.match(regex) !== null
  const isValidDate = new Date(s).toString() !== 'Invalid Date'
  if (!matchRegex || !isValidDate) throw new Error(`assertDateString(): evaluating ${s}`)
}

type PositiveInteger = number & { _type: 'PositiveInteger' }

function assertPositiveInteger(n: number): asserts n is PositiveInteger {
  const isInteger = Number.isInteger(n)
  const isPositive = n > 0
  if (!isInteger || !isPositive) throw new Error(`assertPositiveInteger(): evaluating ${n}`)
}




export class Recurrency {

  _id?: string
  _title: string
  _lastEvent: DateString
  _period: { nb: PositiveInteger, unit: PeriodUnit }

  constructor(title: string, lastEvent: string, period: {nb: number, unit: PeriodUnit}, id?: string) {
    assertDateString(lastEvent)
    assertPositiveInteger(period.nb)

    this._title = title;
    this._lastEvent = lastEvent
    this._period = {
      nb: period.nb,
      unit: period.unit
    }
  }

  getId() {}

  getTitle() {}

  getLastEvent() {}

  getPeriod() {}

  getExpiry() {}

  getProgress() {}

  setLastEvent(val: string) {}

  setPeriod(val: {nb: number} | {unit: PeriodUnit} | {nb: number, unit: PeriodUnit}) {}

  setExpiry(val: string) {}

}
