import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private afs: AngularFirestore) {}

  public updateUserBasicInfo(
    uid,
    displayName,
    contactPhone,
    contactEmail,
    location,
    birthday,
    description
  ) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      displayName: displayName + '',
      contactPhone: contactPhone + '',
      contactEmail: contactEmail + '',
      location: location + '',
      birthday,
      description: description + ''
    };
    return userRef.set(data, { merge: true });
  }
  public updateUsername(uid, username) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      username
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserLinks(uid, links) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      links
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserSpecializations(uid, specializations) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      specializations
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserServices(uid, services) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      services
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserLanguages(uid, languages) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      languages
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserEducations(uid, educations) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      educations
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserExperiences(uid, experiences) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      experiences
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserProjects(uid, projects) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      projects
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserSkills(uid, skills) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);

    const data = {
      uid,
      skills
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserPhone(uid, phoneNumber) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data = {
      uid,
      phoneNumber
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserAddress(uid, addressName, address, city, zip, country) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
    const data = {
      uid,
      addressName,
      address,
      city,
      zip,
      country
    };
    return userRef.set(data, { merge: true });
  }
  public updateUserPicture(uid, file) {
    return firebase
      .storage()
      .ref('avatars/' + uid + '/' + file.name + Date.now())
      .put(file)
      .then(u => {
        u.ref.getDownloadURL().then(photoURL => {
          const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${uid}`
          );
          const data = {
            uid,
            photoURL
          };
          return userRef.set(data, { merge: true });
        });
      });
  }
}
