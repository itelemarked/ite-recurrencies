import { PeriodUnit } from "./period-unit.type";
import { PositiveInteger } from "./positive-integer.type";
import { TimezoneDate } from "./timezone-date.type";

export interface Recurrency {
  id?: string,
  title: string,
  lastEvent: TimezoneDate,
  period: {
    nb: PositiveInteger,
    unit: PeriodUnit
  },
}
