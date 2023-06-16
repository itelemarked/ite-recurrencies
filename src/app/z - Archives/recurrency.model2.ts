
export type IsoDate = string & { _type: 'IsoDate' }

/**
 * @param s any string or number (milliseconds) which is compatible with Date.constructor() or 'today'.
 * @returns a yyyy-mm-dd format.
 */
export function toIsoDate(s: string | number | 'today'): IsoDate {
  const datum = s === 'today' ? new Date() : new Date(s);

  const invalidDate = datum.toString() === 'Invalid Date';
  if (invalidDate) throw new Error(`Invalid date... evaluating: ${s}`)

  return datum.toISOString().match(/^\d{4}-\d{2}-\d{2}/)![0] as IsoDate;
}

export interface IRecurrencyData {
	id: string,
  title: string,
	lastEvent: IsoDate,
	period: { nb: number, unit: PeriodUnit }
}


export type PeriodUnit = 'day' | 'week' | 'month' | 'year'


export class Recurrency {

	readonly id: string;

  public title: string;

	private _lastEvent: IsoDate;
	private _expiry: IsoDate;
	private _period: { nb: number, unit: PeriodUnit };
	private _inputType: 'lastEvent' | 'expiry';

	get lastEvent(): IsoDate {
		return this._lastEvent;
	}

  get expiry(): IsoDate {
		return this._expiry;
	}

	get period(): { nb: number, unit: PeriodUnit } {
		return { ...this._period };
	}

	constructor(data: IRecurrencyData) {
		const { id, title, lastEvent, period } = data;

		this.id = id;
    this.title = title;
		this._lastEvent = lastEvent;
		this._period = { ...period };
		this._expiry = this.computedIsoDate(lastEvent, period.nb, period.unit);
		this._inputType = 'lastEvent';
	}

	setLastEvent(val: IsoDate) {
		const { nb, unit } = this._period;

		this._lastEvent = val;
		this._inputType = 'lastEvent';
		this._expiry = this.computedIsoDate(val, nb, unit)
	}

	setExpiry(val: IsoDate) {
		const { nb, unit } = this._period;

		this._expiry = val;
		this._inputType = 'expiry';
		this._lastEvent = this.computedIsoDate(val, -nb, unit)
	}

	setPeriod(val: { nb: number, unit: PeriodUnit }) {
    const { nb, unit } = val;
    const inputType = this._inputType;
    const lastEvent = this._lastEvent;
    const expiry = this._expiry;

    const updateExpiry = (): IsoDate => {
      if (inputType === 'expiry') return expiry;
      return this.computedIsoDate(lastEvent, nb, unit);
    }

    const updateLastEvent = (): IsoDate => {
      if (inputType === 'lastEvent') return lastEvent;
      return this.computedIsoDate(expiry, -nb, unit);
    }

    this._period = val;
    this._expiry = updateExpiry()
    this._lastEvent = updateLastEvent()
	}


	private computedIsoDate(initialIsoDate: IsoDate, nb: number, unit: PeriodUnit): IsoDate {

    const date = new Date(initialIsoDate);

    const addDay = (): IsoDate => {
      date.setDate(date.getDate() + nb);
      return toIsoDate(date.toISOString());
    }

    const addWeek = (): IsoDate => {
      date.setDate(date.getDate() + nb * 7);
      return toIsoDate(date.toISOString());
    }

    const addMonth = (): IsoDate => {
      const initialDay = date.getDate();
      date.setMonth(date.getMonth() + nb);

      // move the date to the previous month last day!
      if (initialDay !== date.getDate()) date.setDate(0);
      return toIsoDate(date.toISOString());
    }

    const addYear = (): IsoDate => {
      const initialDay = date.getDate()
      date.setFullYear(date.getFullYear() + nb);

      // move the date to the previous month last day!
      if (initialDay !== date.getDate()) date.setDate(0);
      return toIsoDate(date.toISOString());
    }

    switch (unit) {
			case 'day':
        return addDay();
			case 'week':
        return addWeek();
			case 'month':
        return addMonth();
			case 'year':
        return addYear();
		}
	}

}




export function TEST() {

  // const r = new Recurrency({
  //   id: 'abcd',
  //   title: 'EC',
  //   lastEvent: toIsoDate('2022-02-02'),
  //   period: { nb: 11, unit: 'month' }
  // })

  // console.log(r.expiry)

  /** TODO: error: logs 2021-01-04! (iso 2022) */
  // const r = new Recurrency({
  //   id: 'abcd',
  //   title: 'EC',
  //   lastEvent: toIsoDate('2022-02-02'),
  //   period: { nb: 2, unit: 'month' }
  // })

  // r.setExpiry(toIsoDate('2022-02-04'))
  // console.log(r.lastEvent)




  // const testing: {
  //   date: string,
  //   nb: number,
  //   unit: PeriodUnit,
  //   result: string
  // } [] = [
  //   {date: '2022-01-01', nb: 1, unit: 'day', result: '2022-01-02'},
  //   {date: '2022-01-01', nb: -1, unit: 'day', result: '2021-12-31'},
  //   {date: '2022-01-01', nb: 30, unit: 'day', result: '2022-01-31'},
  //   {date: '2022-01-31', nb: -30, unit: 'day', result: '2022-01-01'},
  //   {date: '2022-01-01', nb: 31, unit: 'day', result: '2022-02-01'},
  //   {date: '2022-02-01', nb: -31, unit: 'day', result: '2022-01-01'},

  //   {date: '2022-01-01', nb: 1, unit: 'week', result: '2022-01-08'},
  //   {date: '2022-01-01', nb: -1, unit: 'week', result: '2021-12-25'},
  //   {date: '2022-01-01', nb: -5, unit: 'week', result: '2021-11-27'},
  //   {date: '2022-01-01', nb: 5, unit: 'week', result: '2022-02-05'},

  //   {date: '2022-01-01', nb: 1, unit: 'month', result: '2022-02-01'},
  //   {date: '2022-01-01', nb: -1, unit: 'month', result: '2021-12-01'},
  //   {date: '2022-01-01', nb: 13, unit: 'month', result: '2023-02-01'},
  //   {date: '2022-01-01', nb: -13, unit: 'month', result: '2020-12-01'},
  //   {date: '2022-01-31', nb: 1, unit: 'month', result: '2022-02-28'},

  //   {date: '2022-01-31', nb: 1, unit: 'year', result: '2023-01-31'},
  //   {date: '2022-01-31', nb: -2, unit: 'year', result: '2020-01-31'},
  //   {date: '2020-02-29', nb: 1, unit: 'year', result: '2021-02-28'},
  // ]

  // testing.forEach((t, i) => {
  //   const r = new Recurrency({
  //     id: 'abcd',
  //     title: 'EC',
  //     lastEvent: toIsoDate('2022-02-02'),
  //     period: { nb: 11, unit: 'month' }
  //   })

  //   const computed = r.computedIsoDate(toIsoDate(t.date), t.nb, t.unit)
  //   console.log(`${computed === t.result}, id: ${i}, date: ${t.date}, nb: ${t.nb}, unit: ${t.unit}, result: ${t.result}, (${computed})`)
  // })





  // function addDay(initialIsoDate: IsoDate, nb: number) {
  //   const date = new Date(initialIsoDate);

  //   date.setDate(date.getDate() + nb);
  //   console.log(toIsoDate(date.toISOString()))

  //   // if (date.getDate() !== initialDay) {
  //   //   date.setDate(0);
  //   // }
  //   // console.log(toIsoDate(date.toISOString()))
  // }

  // function addMonth(initialIsoDate: IsoDate, nb: number) {
  //   const date = new Date(initialIsoDate);
  //   const initialDay = date.getDate();

  //   date.setMonth(date.getMonth() + nb);
  //   console.log(toIsoDate(date.toISOString()))

  //   if (date.getDate() !== initialDay) {
  //     date.setDate(0);
  //   }
  //   console.log(toIsoDate(date.toISOString()))
  // }

  // addDay(toIsoDate('2022-01-31'), -31)

}
