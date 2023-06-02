import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


export interface RecurrencyData {
  title: string,
  lastFlight: string,
  period: { value: number, unit: 'days' | 'months' }
  expiry: string
}

export interface Recurrency extends RecurrencyData {
  id: string;
}

export function generatedId(): string {
  return Date.now().toString() + '-' + Math.round(Math.random() * 1000).toString();
}



// export type PeriodUnit = 'days' | 'months' | 'years';

// export type IsoString = string & { _type: 'IsoString' };

// export function toIsoString(val: string): IsoString {
//   const validFormat = val.match(/^\d{4}-\d{2}-\d{2}$/) !== null;
//   const validDate = (new Date(val)).toString() !== 'Invalid Date';

//   if(!validFormat) throw new Error(`Invalid ISO Format, should be like "xxxx-xx-xx": evaluating ${val}`)
//   if(!validDate) throw new Error(`Invalid date: evaluating ${val}`)
//   return val as IsoString;
// }

// export interface RecurrencyPeriod {
//   value: number,
//   unit: PeriodUnit
// }


// export interface Recurrency {
//   id: string,
//   title: string,
//   lastFlight: IsoString,
//   period: RecurrencyPeriod,
//   expiry: IsoString
// }


export const DATAS: {[key:string]: any} = {
  recurrencies: {
    'id1': {
      title: 'EC',
      lastFlight: '2023-03-09',
      period: { value: 66, unit: 'days' },
      expiry: '2023-07-23',
    },
    'id2': {
      title: 'PT',
      lastFlight: '2023-04-09',
      period: { value: 94, unit: 'days' },
      expiry: '2023-09-23',
    },
  }
}


@Injectable({providedIn: 'root'})
export class DataService {

  private _recurrencies$ = new BehaviorSubject<Recurrency[]>(this.getRecurrencies());
  recurrencies$ = this._recurrencies$.asObservable();

  getRecurrencies(): Recurrency[] {
    let result: Recurrency[] = [];
    for (let id in DATAS['recurrencies']) {
      result.push(this.getRecurrencyById(id))
    }
    return result;
  }

  getRecurrencyById(id: string): Recurrency {
    const data: RecurrencyData = DATAS['recurrencies'][id]
    return {
      id,
      ...data,
      period: {
        ...data.period
      }
    }
  }

  createRecurrency(rec: RecurrencyData) {
    const id = generatedId()
    const data = {
      ...rec,
      period: {
        ...rec.period
      }
    }

    DATAS['recurrencies'][id] = data;
    this._recurrencies$.next(this.getRecurrencies())
  }

  deleteRecurrency(recurrencyId: string) {
    const recs: {[key: string]: any} = {};
    for (let id in DATAS['recurrencies']) {
      if (id !== recurrencyId) {
        recs[id] = DATAS['recurrencies'][id];
      }
    }
    DATAS['recurrencies'] = recs;
    this._recurrencies$.next(this.getRecurrencies())
  }

}
