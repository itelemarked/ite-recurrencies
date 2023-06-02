
export type PeriodUnit = 'days' | 'months';

export interface RecurrencyPeriod {
  value: number,
  unit: PeriodUnit
}

export interface Recurrency {
  id: string;
  title: string,
  last: string,
  period: RecurrencyPeriod,
  expiry: string
}
