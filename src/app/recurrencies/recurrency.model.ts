
export type IsoDate = string & { _type: 'IsoDate' };

export function toIsoDate(arg: string | Date): IsoDate {
  // arg of type string
  if (typeof arg === 'string') {
    const datum = new Date(arg);
    const invalidDate = datum.toString() === 'Invalid Date';
    if (invalidDate) throw new Error(`Invalid date string, evaluating: ${arg}`)

    return datum.toISOString().match(/^\d{4}-\d{2}-\d{2}/)![0] as IsoDate;
  }

  // arg of type Date
  return arg.toISOString().match(/^\d{4}-\d{2}-\d{2}/)![0] as IsoDate;
}

export function formattedDate(isoDate: IsoDate): string {
  const datum = new Date(isoDate);
  const dd = datum.getDate().toString().padStart(2, '0')
  const mm = (datum.getMonth() + 1).toString().padStart(2, '0')
  const yy = datum.getFullYear().toString().slice(-2);
  return `${dd}.${mm}.${yy}`;
}

export function today(): IsoDate {
  return toIsoDate(new Date())
}

export function addPeriod(initialIsoDate: IsoDate, nb: number, unit: PeriodUnit): IsoDate {
  switch (unit) {
    case 'day':
      return addDays(initialIsoDate, nb);

    case 'week':
      return addWeeks(initialIsoDate, nb);

    case 'month':
      return addMonths(initialIsoDate, nb);

    case 'year':
      return addYears(initialIsoDate, nb);
  }
}

function addDays(initialIsoDate: IsoDate, nb: number): IsoDate {
  const initialMs = new Date(initialIsoDate).getTime();
  const expiryMs = initialMs + nb * 24 * 60 * 60 * 1000;
  const expiryDate = new Date(expiryMs);
  return toIsoDate(expiryDate);
}

function addWeeks(initalIsoDate: IsoDate, nb: number): IsoDate {
  const dayNb = 7 * nb;
  return addDays(initalIsoDate, dayNb);
}

function addMonths(initialIsoDate: IsoDate, nb: number): IsoDate {
  const initialDate = new Date(initialIsoDate);

  const initialDay = initialDate.getDate();
  const initialMonth = initialDate.getMonth() + 1;
  const initialYear = initialDate.getFullYear();

  const additionalMonths = nb % 12
  const additionalYears = Math.floor((initialMonth + nb) / 12)

  const yyyy = (initialYear + additionalYears).toString();
  const mm = (initialMonth + additionalMonths).toString().padStart(2, '0');
  const dd = initialDay.toString().padStart(2, '0');

  return toIsoDate(`${yyyy}-${mm}-${dd}`)
}

function addYears(initialIsoDate: IsoDate, nb: number): IsoDate {
  const initialDate = new Date(initialIsoDate);

  const initialDay = initialDate.getDate();
  const initialMonth = initialDate.getMonth() + 1;
  const initialYear = initialDate.getFullYear();

  const yyyy = (initialYear + nb).toString();
  const mm = initialMonth.toString().padStart(2, '0');
  const dd = initialDay.toString().padStart(2, '0');

  return toIsoDate(`${yyyy}-${mm}-${dd}`)
}





export type PeriodUnit = 'day' | 'week' | 'month' | 'year';

export interface RecurrencyPeriod {
  value: number,
  unit: PeriodUnit
}

export interface Recurrency {
  id: string;
  title: string,
  lastEvent: IsoDate,
  period: RecurrencyPeriod,
  expiry: IsoDate
}

export function expiry(recurrency: Recurrency): IsoDate {
  const { lastEvent, period } = recurrency;
  const expiryIsoDate = addPeriod(lastEvent, period.value, period.unit);
  return expiryIsoDate;
}







export function TEST() {
  const r: Recurrency = {
    id: 'abcd',
    title: 'aaa',
    lastEvent: toIsoDate('2022-03-12'),
    period: { value: -31, unit: 'day'},
    expiry: toIsoDate('2000-01-01')
  }

  console.log(today())
}
