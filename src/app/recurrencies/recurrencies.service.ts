import { Injectable } from "@angular/core";
import { Firestore, collectionData, CollectionReference } from "@angular/fire/firestore";
import { collection } from "@firebase/firestore";
import { Observable } from "rxjs";
import { Recurrency } from "./recurrency.model2";



@Injectable({ providedIn: 'root' })
export class RecurrenciesService {

  constructor(private firestore: Firestore) {}

  getAll$(): Observable<Recurrency[]> {
    const ref = collection(this.firestore, 'recurrencies')
    return collectionData(ref, { idField: 'id' }) as Observable<Recurrency[]>
  }

}
