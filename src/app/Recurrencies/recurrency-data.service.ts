import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { Recurrency, toDateString, toPositiveInteger, toPeriodUnit } from "./recurrency.model";



const MOCK = [
  {
    title: 'P7',
    lastEvent: '2023-06-01',
    period: {
      nb: 188,
      unit: 'days'
    }
  },
  {
    title: 'PU',
    lastEvent: '2023-07-10',
    period: {
      nb: 66,
      unit: 'days'
    }
  }
]







@Injectable({ providedIn: 'root' })
export class RecurrencyDataService {

  getAll$(): Observable<Recurrency[]> {
    return of(MOCK.map(rec => {
      const { lastEvent, title } = rec
      const { nb, unit } = rec.period
      return {
        title,
        lastEvent: toDateString(lastEvent),
        period: {
          nb: toPositiveInteger(nb),
          unit: toPeriodUnit(unit)
        }
      }
    }))
  }

}
