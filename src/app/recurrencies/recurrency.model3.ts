
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
	lastEvent: string,
	period: { nb: number, unit: PeriodUnit }
}


export type PeriodUnit = 'day' | 'week' | 'month' | 'year'


export type RecurrencyInputType = 'lastEvent' | 'expiry'


export interface RecurrencyPeriod {
  nb: number,
  unit: PeriodUnit
}


export interface Recurrency {
  id: string,
  title: string,
  lastEvent: IsoDate,
  expiry: IsoDate,
  period: RecurrencyPeriod,
  inputType: RecurrencyInputType;
}


export function createRecurrency(data: IRecurrencyData): Recurrency {
  const { id, title, period } = data;
  const lastEvent = toIsoDate(data.lastEvent);
  const { nb, unit } = period;
  const expiry = computedIsoDate(lastEvent, nb, unit);
  const inputType = 'lastEvent';

  return { id, title, lastEvent, expiry, period, inputType }
}


export function setLastEvent(recurrency: Recurrency, date: IsoDate): Recurrency {
  const lastEvent = date;
  const { nb, unit } = recurrency.period;
  const inputType = 'lastEvent';
  const expiry = computedIsoDate(date, nb, unit);

  return { ...recurrency, lastEvent, inputType, expiry }
}


export function setExpiry(recurrency: Recurrency, date: IsoDate): Recurrency {
  const expiry = date;
  const { nb, unit } = recurrency.period;
  const inputType = 'expiry';
  const lastEvent = computedIsoDate(date, -nb, unit);

  return { ...recurrency, lastEvent, inputType, expiry }
}


export function setPeriod(recurrency: Recurrency, nb: number, unit: PeriodUnit): Recurrency {
  const lastEvent = recurrency.inputType === 'lastEvent' ? recurrency.lastEvent : computedIsoDate(recurrency.expiry, -nb, unit);
  const expiry = recurrency.inputType === 'expiry' ? recurrency.expiry : computedIsoDate(recurrency.lastEvent, nb, unit);

  return { ...recurrency, lastEvent, period: {nb, unit}, expiry }
}


export function computedIsoDate(initialIsoDate: IsoDate, nb: number, unit: PeriodUnit): IsoDate {
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


export function formattedDate(isoDate: IsoDate): string {
  const date = new Date(isoDate);
  const dd = date.getDate().toString().padStart(2, '0');
  const mm = (date.getMonth() + 1).toString().padStart(2, '0');
  const yyyy = date.getFullYear().toString();

  return `${dd}.${mm}.${yyyy}`
}





export function TEST() {

  // const recurrency = createRecurrency({id: 'abcd', title:'Title', lastEvent: toIsoDate("2023-06-07"), period: {nb: 20, unit: 'day'}})
  // console.log(setExpiry(recurrency, toIsoDate('2022-02-28')));

}
