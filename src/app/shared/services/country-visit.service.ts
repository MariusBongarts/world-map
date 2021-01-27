import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { FirebaseService } from '../../firebase/firebase.service';
import { Country, CountryVisit } from '../../public-interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CountryVisitService extends FirebaseService<CountryVisit> {

  constructor(private firestore: AngularFirestore, private authService: AuthService) {
    super('countryVisit', firestore);
  }

  public getVisitedCountriesOfUser(): Observable<CountryVisit[]> {
    return super.list().pipe(map(countriesVisited =>
      countriesVisited.filter(countryVisit => countryVisit.userId === this.authService.user.getValue()?.uid)));
  }

  /**
   * Marks a country as visited when it´s not visited yet. Else it removes the visited flag.
   */
  public async addOrDelete(item: Omit<CountryVisit, 'userId'>): Promise<CountryVisit | void> {
    return new Promise(res => {
      this.getVisitedCountriesOfUser().pipe(first()).subscribe(countriesVisited => {
        const countryIsVisited = countriesVisited.find(countryVisited => countryVisited.countryId === item.countryId);
        if (!countryIsVisited) { res(super.add({ ...item, userId: this.authService.user.getValue()?.uid || '' })); }
        if (countryIsVisited && countryIsVisited.id) { res(super.delete(countryIsVisited.id)); }
      });
    });
  }

}
