import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Education } from '../models/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  constructor(private afs: AngularFirestore) {}

  public getEducations(uid) {
    return this.afs
      .collection('educations', ref => {
        return ref.where('uid', '==', uid);
      })
      .snapshotChanges()
      .pipe(
        map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }

  public createEducation(education: Education) {
    const data = { ...education };
    return this.afs.collection('educations').add(data);
  }

  updateEducation(id: string, education: Education) {
    const data = {
      ...education
    };
    return this.afs.doc(`educations/${id}`).set(data, { merge: true });
  }
  updateUserEducations(uid, educations) {
    const userRef: AngularFirestoreDocument<Education> = this.afs.doc(
      `users/${uid}`
    );
    const data = {
      uid,
      educations
    };
    return userRef.set(data, { merge: true });
  }
  deleteEducation(ed: Education) {
    console.log(ed.id);
    
    this.afs.doc(`educations/${ed.id}`).delete()
  }
}
