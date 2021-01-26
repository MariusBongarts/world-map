import { Entity } from '../public-interfaces';
import { IFirebaseService } from './firebase.interface';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
export abstract class FirebaseService<T extends Entity> implements IFirebaseService<T> {

  protected collection: AngularFirestoreCollection<T>;

  constructor(path: string, protected afs: AngularFirestore) {
    this.collection = this.afs.collection(path);
  }

  public get(identifier: string): Observable<T> {
    return this.collection
      .doc<T>(identifier)
      .snapshotChanges()
      .pipe(
        map(doc => {
          if (doc.payload.exists) {
            /* workaround until spread works with generic types */
            const data = doc.payload.data() as any;
            const id = doc.payload.id;
            return { id, ...data };
          }
        })
      );
  }


  public list(): Observable<T[]> {
    return this.collection
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(a => {
            const data = a.payload.doc.data();
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }


  public add(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.collection.add(item).then(ref => {
        const newItem = {
          id: ref.id,
          /* workaround until spread works with generic types */
          ...(item as any)
        };
        resolve(newItem);
      });
    });
  }


  public update(item: T): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      const docRef = this.collection
        .doc<T>(item.id)
        .set(item)
        .then(() => {
          resolve({
            ...(item as any)
          });
        });
    });
  }

  public delete(id: string): Promise<void> {
    const docRef = this.collection.doc<T>(id);
    return docRef.delete();
  }
}
