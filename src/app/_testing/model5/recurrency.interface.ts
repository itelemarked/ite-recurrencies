import { LocalDateString } from "./local-date-string.type";
import { PositiveInteger } from "./positive-integer.type";

export interface Recurrency {
  id?: string,
  title: string,
  lastEvent: LocalDateString,
  period: {
    nb: PositiveInteger,
    unit: 'day' | 'week' | 'month' | 'year'
  },
}
