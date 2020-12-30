import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirebaseService } from '../../firebase/firebase.service';
import { Country } from '../../public-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends FirebaseService<Country> {

  constructor(private firestore: AngularFirestore) {
    super('countries', firestore);
  }
}
