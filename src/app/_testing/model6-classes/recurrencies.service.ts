import { Injectable } from "@angular/core";
import { IRecurrency, Recurrency } from "./recurrency.class";
import { Observable, map, of } from "rxjs";




let MOCK_DATAS: IRecurrency[] = [
  {
    id: 'abcdef-1',
    title: 'Recurrency 1',
    lastEvent: '2023-08-01',
    period: {
      nb: 3,
      unit: 'days'
    }
  },
  {
    id: 'abcdef-2',
    title: 'Recurrency 2',
    lastEvent: '2023-08-01',
    period: {
      nb: 15,
      unit: 'weeks'
    }
  },
  {
    id: 'abcdef-3',
    title: 'Recurrency 3',
    lastEvent: '2023-08-01',
    period: {
      nb: 2,
      unit: 'months'
    }
  },
]



@Injectable({ providedIn: 'root' })
export class RecurrenciesService {

  fetch$(): Observable<Recurrency[]> {
    return of(MOCK_DATAS).pipe(
      map(res => res.map(r => new Recurrency(r)))
    )
  }

  save(recurrencies: Recurrency[]) {
    MOCK_DATAS = recurrencies.map(rec => {
      const { id, title, lastEvent } = rec
      const period = {...rec.period}
      return { id, title, lastEvent, period }
    })
  }

}
