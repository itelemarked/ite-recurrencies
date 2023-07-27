import { Injectable } from "@angular/core";
import { Firestore, collectionData, doc, setDoc } from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";
import { Observable, map } from "rxjs";
import { IRecurrencyData, Recurrency, createRecurrency } from "./recurrency.model3";



@Injectable({ providedIn: 'root' })
export class RecurrenciesService {

  private collectionRef = collection(this.firestore, 'recurrencies')

  constructor(private firestore: Firestore) {}

  getAll$(): Observable<Recurrency[]> {
    const datas = collectionData(this.collectionRef, { idField: 'id' }) as Observable<IRecurrencyData[]>
    return datas
    .pipe(
      map(data => data.map(d => createRecurrency(d)))
    )
  }

  async save(recurrency: Recurrency) {
    const { title, lastEvent, period } = recurrency;
    const data = { title, lastEvent, period };

    if (recurrency.id) {
      const id = recurrency.id;
      const recurrenciesDoc = doc(this.firestore, 'recurrencies', id)
      await setDoc(recurrenciesDoc, data)
    } else {
      const generatedId = doc(this.collectionRef)
      await setDoc(generatedId, data)
    }
  }

}
