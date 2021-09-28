import { Injectable } from '@angular/core';
import { AngularFirestore, QueryFn } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  constructor(private afs: AngularFirestore) {}

  /**
   * Returns  documents from a collection
   * @param collectionName desired collection name
   * @example getCollection('experiences');
   */
  public getCollection(collectionName: string) {
    return this.afs
      .collection(collectionName)
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  /**
   * Returns  documents from a collection
   * @param collectionName desired collection name
   * @param docId desired document id
   * @example getDocument('experiences', experienceId);
   */
  public getDocument(collectionName: string, docId: string) {
    return this.afs
      .collection(collectionName)
      .doc(docId)
      .snapshotChanges()
      .pipe(
        map(a => {
          const data = a.payload.data();
          const id = a.payload.id;
          return { id, ...data };
        })
      );
  }

  /**
   * Returns filtred documents from a collection
   * @param collectionName desired collection name
   * @param queryFn query to fitlter the results
   * @example getFiltredCollection('experiences', ref => {ref.where('uid', '==', user.uid).where('type', '==', 'project')});
   */
  public getFiltredCollection(collectionName: string, queryFn: QueryFn) {
    return this.afs
      .collection(collectionName, queryFn)
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

  /**
   * @param collectionName collection where you want to create the document
   * @param data document's data you want to create
   * @example createDocument('experiences', this.experience)
   */
  public createDocument(collectionName: string, data: any) {
    return this.afs.collection(collectionName).add(data);
  }

  /**
   * @param collectionName collection where you want to update the document
   * @param docId document id you want to update
   * @param items document fields to save
   * @example updateDocument('experiences', this.experience.id, this.experience)
   */
  updateDocument(collectionName: string, docId: string, data: any) {
    return this.afs
      .doc(`${collectionName}/${docId}`)
      .set(data, { merge: true });
  }
  // updateUserServices(uid, services) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${uid}`);
  //   const data = {
  //     uid,
  //     services
  //   };
  //   return userRef.set(data, { merge: true });
  // }
  /**
   * @param collectionName collection where you want to delete the document
   * @param docId document id you want to delete
   * @example updateDocument('experiences', this.experience.id)
   */
  deleteDocument(collectionName: string, docId: string) {
    return this.afs
      .collection(collectionName)
      .doc(docId)
      .delete();
  }
}
