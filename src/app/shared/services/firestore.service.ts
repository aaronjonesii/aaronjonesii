import {
  collection, collectionData, CollectionReference,
  deleteDoc, doc, docData, DocumentReference,
  query, Firestore, getDoc, serverTimestamp,
  setDoc, updateDoc, QueryConstraint,
  DocumentSnapshot, addDoc, collectionGroup,
  Query, onSnapshot, collectionSnapshots,
  QueryDocumentSnapshot, QuerySnapshot, Unsubscribe,
  runTransaction, TransactionOptions, Transaction,
  writeBatch, WriteBatch, getDocs, WithFieldValue,
  PartialWithFieldValue, UpdateData,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';
import { SetOptions } from '@firebase/firestore';
import { Injectable } from '@angular/core';
import { DocumentData, SnapshotOptions } from "@angular/fire/compat/firestore";

type CollectionPredicate<T> = string | CollectionReference<T>;
type CollectionGroupPredicate<T> = string | Query<T>;
type DocumentPredicate<T> = string | DocumentReference<T>;

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private db: Firestore) {}

  /** Get References */
  col<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
    return (typeof ref === 'string' ? collection(this.db, ref) : ref) as CollectionReference<T>;
  }
  colGroup<T>(ref: CollectionGroupPredicate<T>): Query<T> {
    return (typeof ref === 'string' ? collectionGroup(this.db, ref) : ref) as Query<T>;
  }
  doc<T>(ref: DocumentPredicate<T>): DocumentReference<T> {
    return (typeof ref === 'string' ? doc(this.db, ref) : ref) as DocumentReference<T>;
  }

  // https://github.com/firebase/firebase-js-sdk/blob/master/packages/firestore/src/util/misc.ts#L27
  get newDocumentID(): string {
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    const targetLength = 20;

    for (let i = 0; i < targetLength; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    if (autoId.length != targetLength) {
      throw new Error('Invalid auto ID: ' + autoId);
    }

    return autoId;
  }

  /** Get Data */
  doc$<T>(ref: DocumentPredicate<T>): Observable<T> {
    return docData(this.doc(ref)) as Observable<T>;
  }
  docSnap<T>(ref: DocumentPredicate<T>): Promise<DocumentSnapshot<T>> {
    return getDoc(this.doc(ref));
  }
  col$<T, U extends string = never>(
    ref: CollectionPredicate<T>,
    options?: {
      idField?: ((U | keyof T) & keyof NonNullable<T>);
    } & SnapshotOptions,
  ): Observable<T[]> {
    return collectionData(this.col(ref), options) as Observable<T[]>;
  }
  colSnap<T>(ref: CollectionPredicate<T>, ...queryConstraints: QueryConstraint[]): Promise<QuerySnapshot<T>> {
    const q = query(this.col(ref), ...queryConstraints)
    return getDocs(q);
  }
  colQuery$<T, U extends string = never>(
    ref: CollectionPredicate<T>,
    options?: {
      idField?: ((U | keyof T) & keyof NonNullable<T>);
    } & SnapshotOptions,
    ...queryConstraints: QueryConstraint[]
  ): Observable<T[]> {
    const q = query(this.col(ref), ...queryConstraints);
    return collectionData(q, options) as Observable<T[]>;
  }
  colGroupQuery$<T>(
    ref: CollectionGroupPredicate<T>,
    options?: {idField?: undefined} & SnapshotOptions,
    ...queryConstraints: QueryConstraint[]
  ): Observable<T[]> {
    const q = query(this.colGroup(ref), ...queryConstraints);
    return collectionData(q, options) as Observable<T[]>;
  }
  colSnapshots$<T>(
    ref: CollectionPredicate<T>,
    ...queryConstraints: QueryConstraint[]
  ): Observable<QueryDocumentSnapshot<T>[]> {
    const q = query(this.col(ref), ...queryConstraints);
    return collectionSnapshots(q) as Observable<QueryDocumentSnapshot<T>[]>;
  }

  snapshots<T>(
    ref: CollectionPredicate<T>,
    onNext: (snap: QuerySnapshot<T>) => void,
    onError: (error: FirebaseError) => void,
    onCompletion: () => void,
    ...queryConstraints: QueryConstraint[]
  ): Unsubscribe {
    const q = query(this.col(ref), ...queryConstraints);
    return onSnapshot(
      q,
      (snapshot) => onNext(snapshot),
      (error) => onError(error),
      () => onCompletion
    )
  }

  snapshot<T>(
    ref: DocumentPredicate<T>,
    onNext: (snap: DocumentSnapshot<T>) => void,
    onError: (error: FirebaseError) => void,
    onCompletion: () => void
  ): Unsubscribe {
    return onSnapshot(
      this.doc(ref),
      (doc) => onNext(doc),
      (error) => onError(error),
      () => onCompletion
    );
  }

  get timestamp() { return serverTimestamp(); }

  /** Write data */
  add<T>(ref: CollectionPredicate<T>, data: WithFieldValue<T>): Promise<DocumentReference<T>> {
    const timestamp = this.timestamp;
    data = Object.assign({created: timestamp, updated: timestamp}, data);
    return addDoc(this.col(ref), data);
  }
  set<T>(ref: DocumentPredicate<T>, data: PartialWithFieldValue<T>, options: SetOptions = {}): Promise<void> {
    const timestamp = this.timestamp;
    data = Object.assign({created: timestamp, updated: timestamp}, data);
    return setDoc(this.doc(ref), data, options);
  }
  update<T extends DocumentData>(ref: DocumentPredicate<T>, data: UpdateData<T>): Promise<void> {
    const timestamp = this.timestamp;
    data = Object.assign({updated: timestamp}, data);
    return updateDoc(this.doc(ref), data);
  }
  async docExists<T>(ref: DocumentPredicate<T>): Promise<boolean> {
    const snapshot = await getDoc(this.doc(ref));
    return snapshot.exists();
  }

  /** Delete data */
  delete<T>(ref: DocumentPredicate<T>): Promise<void> {
    return deleteDoc(this.doc(ref));
  }

  /** Transaction */
  transaction<T>(updateFunction: (transaction: Transaction) => Promise<T>, options?: TransactionOptions ) {
    return runTransaction(this.db, updateFunction, options ?? undefined);
  }

  /** Batch */
  async batch(updateFunction: (batch: WriteBatch) => Promise<void>): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const batch = writeBatch(this.db);

        return updateFunction(batch)
          .then(() => batch.commit())
          .then(() => resolve(undefined))
          .catch(error => { reject(error.message); });
      } catch (error) { return reject(error); }
    });
  }
}
