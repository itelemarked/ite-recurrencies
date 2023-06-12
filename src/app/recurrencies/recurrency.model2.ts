
export type IsoDate = string & { _type: 'IsoDate' }

/**
 * @param s any string or number (milliseconds) which is compatible with Date.constructor() or 'today'.
 * @returns a yyyy-mm-dd format.
 */
export function toIsoDate(s: string | number | 'today'): IsoDate {
  const datum = s === 'today' ? new Date() : new Date(s);

  const invalidDate = datum.toString() === 'Invalid Date';
  if (invalidDate) throw new Error(`Invalid date`)

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

		this._period = val;
		switch(this._inputType) {
			case 'lastEvent': {
				this._expiry = this.computedIsoDate(this._lastEvent, nb, unit)
				break;
			}
			case 'expiry': {
				this._lastEvent = this.computedIsoDate(this._expiry, -nb, unit)
				break;
			}
		}
	}

	// TODO
	private computedIsoDate(initialIsoDate: IsoDate, nb: number, unit: PeriodUnit): IsoDate {

    const dmy = (isoDate: IsoDate): { d: number, m: number, y: number } => {
      const datum = new Date(isoDate);
      const d = datum.getDate();
      const m = datum.getMonth() + 1;
      const y = datum.getFullYear();
      return { d, m, y };
    }

    const dayMs = 24 * 60 * 60 * 1000;

		switch (unit) {
			case 'day': {
        const dateMs = new Date(initialIsoDate).getTime();
        const newDateMs = dateMs + nb * dayMs;
        return toIsoDate(newDateMs);
			}
			case 'week': {
        const dateMs = new Date(initialIsoDate).getTime();
        const newDateMs = dateMs + nb * 7 * dayMs;
        return toIsoDate(newDateMs);
			}
			case 'month': {
        const {d, m, y } = dmy(initialIsoDate);

        const dd = d.toString().padStart(2, '0')
        const mm = ((m + nb) % 12).toString().padStart(2, '0')
        const yyyy = (y + Math.floor(nb / 12)).toString()

        return toIsoDate(`${yyyy}-${mm}-${dd}`)
			}
			case 'year': {
        const {d, m, y } = dmy(initialIsoDate);

        const dd = d.toString().padStart(2, '0')
        const mm = m.toString().padStart(2, '0')
        const yyyy = (y + nb).toString()

        return toIsoDate(`${yyyy}-${mm}-${dd}`)
			}
		}
	}


}




export function TEST() {

  const r = new Recurrency({
    id: 'abcd',
    title: 'EC',
    lastEvent: toIsoDate('2022-02-02'),
    period: { nb: 1, unit: 'year' }
  })

  console.log(r.expiry)

  /** TODO: error: logs 2021-01-04! (iso 2022) */

  // const r = new Recurrency({
  //   id: 'abcd',
  //   title: 'EC',
  //   lastEvent: toIsoDate('2022-02-02'),
  //   period: { nb: 1, unit: 'month' }
  // })

  // r.setExpiry(toIsoDate('2022-02-04'))
  // console.log(r.lastEvent)
}
