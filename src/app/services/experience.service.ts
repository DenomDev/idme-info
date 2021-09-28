import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Experience } from '../models/experience.model';

@Injectable({
  providedIn: 'root'
})
export class ExperienceService {
  constructor(private afs: AngularFirestore) {}

  public getExperiences(uid) {
    return this.afs
      .collection('experiences', ref => {
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

  public createExperience(experience: Experience) {
    const data = { ...experience };
    return this.afs.collection('experiences').add(data);
  }

  updateExperience(id: string, experience: Experience) {
    const data = {
      ...experience
    };
    return this.afs.doc(`experiences/${id}`).set(data, { merge: true });
  }

  updateUserExperiences(uid, experiences) {
    const userRef: AngularFirestoreDocument<Experience> = this.afs.doc(
      `users/${uid}`
    );
    const data = {
      uid,
      experiences
    };
    return userRef.set(data, { merge: true });
  }
  deleteExperience(ex: Experience) {
    return this.afs
      .collection('experiences')
      .doc(ex.id)
      .delete();
  }
}
