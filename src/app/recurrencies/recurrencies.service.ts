import { Injectable } from "@angular/core";
import { Firestore, collectionData, CollectionReference } from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";
import { Observable, map } from "rxjs";
import { IRecurrencyData, Recurrency, createRecurrency } from "./recurrency.model3";



@Injectable({ providedIn: 'root' })
export class RecurrenciesService {

  constructor(private firestore: Firestore) {}

  getAll$(): Observable<Recurrency[]> {
    const ref = collection(this.firestore, 'recurrencies')
    const datas = collectionData(ref, { idField: 'id' }) as Observable<IRecurrencyData[]>
    return datas
    .pipe(
      map(data => data.map(d => createRecurrency(d)))
    )
  }

}
