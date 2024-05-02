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
  PartialWithFieldValue, UpdateData, FieldValue,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { FirebaseError } from '@angular/fire/app/firebase';
import { SetOptions } from '@firebase/firestore';
import { Injectable } from '@angular/core';
import { DocumentData, SnapshotOptions } from '@angular/fire/compat/firestore';

type CollectionPredicate<T> = string | CollectionReference<T>;
type CollectionGroupPredicate<T> = string | Query<T>;
type DocumentPredicate<T> = string | DocumentReference<T>;

type Col$Options<T, U> = {
  idField?: ((U | keyof T) & keyof NonNullable<T>);
} & SnapshotOptions;
type ColQuery$Options<T, U> = Col$Options<T, U>;
type ColGroupQuery$Options<T, U> = Col$Options<T, U>;

@Injectable({ providedIn: 'root' })
export class FirestoreService {
  constructor(private db: Firestore) {}

  /**
   * **Reference Helpers**
   *
   * Provides flexible methods for creating Firestore references to collections,
   * collection groups, and documents. These methods handle both string paths
   * and existing Firestore reference objects.
   */

  /**
   * Returns a CollectionReference, handling both string paths and existing
   * CollectionReference instances.
   *
   * @param {CollectionPredicate} ref A string path or a
   * CollectionReference.
   * @return {CollectionReference} A CollectionReference for the provided
   * path or reference.
   */
  col<T>(ref: CollectionPredicate<T>): CollectionReference<T> {
    return (
      typeof ref === 'string' ? collection(this.db, ref) : ref
    ) as CollectionReference<T>;
  }

  /**
   * Returns a Query, handling both string paths and existing Query instances.
   *
   * @param {CollectionGroupPredicate} ref A string path or a Query.
   * @return {Query} A Query for the provided path or reference.
   */
  colGroup<T>(ref: CollectionGroupPredicate<T>): Query<T> {
    return (
      typeof ref === 'string' ? collectionGroup(this.db, ref) : ref
    ) as Query<T>;
  }

  /**
   * Returns a DocumentReference, handling both string paths and existing
   * DocumentReference instances.
   *
   * @param {DocumentPredicate} ref A string path or a DocumentReference.
   * @return {DocumentReference} A DocumentReference for the provided path
   * or reference.
   */
  doc<T>(ref: DocumentPredicate<T>): DocumentReference<T> {
    return (
      typeof ref === 'string' ? doc(this.db, ref) : ref
    ) as DocumentReference<T>;
  }

  /**
   * Generates a Firestore-compatible 20-character document ID.
   *
   * @remarks Taken from Firebase: https://github.com/firebase/firebase-js-sdk/blob/master/packages/firestore/src/util/misc.ts#L27
   * @return {string} A 20-character, alphanumeric firestore compatible
   * document ID.
   */
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

  /**
   * **Data Retrieval**
   *
   * Offers a variety of functions to retrieve Firestore data, including
   * real-time updates via Observables and single-fetch operations using
   * Promises. Handles both document and collection-level queries.
   */

  /**
   * Retrieves a Firestore document as an Observable stream.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference
   * for the document.
   * @return {Observable} An Observable emitting the document data
   * (with type 'T').
   */
  doc$<T>(ref: DocumentPredicate<T>): Observable<T> {
    return docData(this.doc(ref)) as Observable<T>;
  }

  /**
   * Retrieves a snapshot of a Firestore document.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference
   * for the document.
   * @return {Promise<DocumentSnapshot>} A Promise resolving to a
   * DocumentSnapshot of the data.
   */
  docSnap<T>(ref: DocumentPredicate<T>): Promise<DocumentSnapshot<T>> {
    return getDoc(this.doc(ref));
  }

  /**
   * Retrieves documents from a Firestore collection as an Observable stream.
   *
   * @param {CollectionPredicate} ref A string path or CollectionReference
   * for the collection.
   * @param {Col$Options} options Provides options to configure how snapshot
   * data is retrieved.
   * @return {Observable} An Observable emitting an array of documents
   * (with type 'T').
   */
  col$<T, U extends string = never>(
    ref: CollectionPredicate<T>,
    options?: Col$Options<T, U>,
  ): Observable<T[]> {
    return collectionData(this.col(ref), options) as Observable<T[]>;
  }

  /**
   * Retrieves a snapshot of documents from a Firestore collection.
   *
   * @param {CollectionPredicate} ref A string path or CollectionReference
   * for the collection.
   * @param {...QueryConstraint} queryConstraints Optional Firestore query
   * constraints.
   * @return {Promise<QuerySnapshot>} A Promise resolving to a QuerySnapshot
   * of the retrieved documents.
   */
  colSnap<T>(
    ref: CollectionPredicate<T>,
    ...queryConstraints: QueryConstraint[]
  ): Promise<QuerySnapshot<T>> {
    const q = query(this.col(ref), ...queryConstraints);
    return getDocs(q);
  }

  /**
   * Retrieves documents from a Firestore collection as an Observable stream,
   * optionally filtered with query constraints.
   *
   * @param {CollectionPredicate} ref A string path or CollectionReference
   * for the collection.
   * @param {ColQuery$Options} options Provides options to configure how
   * snapshot data is retrieved.
   * @param {...QueryConstraint} queryConstraints Optional Firestore
   * query constraints.
   * @return {Observable} An Observable emitting an array of filtered documents.
   */
  colQuery$<T, U extends string = never>(
    ref: CollectionPredicate<T>,
    options?: ColQuery$Options<T, U>,
    ...queryConstraints: QueryConstraint[]
  ): Observable<T[]> {
    const q = query(this.col(ref), ...queryConstraints);
    return collectionData(q, options) as Observable<T[]>;
  }

  /**
   * Retrieves documents from a Firestore collection group query as an
   * Observable stream.
   *
   * @param {CollectionGroupPredicate} ref A string collection group
   * name or a Query representing the collection group.
   * @param {ColGroupQuery$Options} options Provides options to configure
   * how snapshot data is retrieved.
   * @param {...QueryConstraint} queryConstraints Optional Firestore query
   * constraints.
   * @return {Observable} An Observable emitting an array of documents
   * (with type 'T') from the collection group query.
   */
  colGroupQuery$<T, U extends string = never>(
    ref: CollectionGroupPredicate<T>,
    options?: ColGroupQuery$Options<T, U>,
    ...queryConstraints: QueryConstraint[]
  ): Observable<T[]> {
    const q = query(this.colGroup(ref), ...queryConstraints);
    return collectionData(q, options) as Observable<T[]>;
  }

  /**
   * Retrieves DocumentSnapshots from a Firestore collection query as an
   * Observable.
   *
   * @param {CollectionPredicate} ref A string path or CollectionReference
   * for the collection.
   * @param {...QueryConstraint} queryConstraints Optional Firestore query
   * constraints.
   * @return {Observable<QueryDocumentSnapshot[]>} An Observable emitting an
   * array of QueryDocumentSnapshots representing the query results.
   */
  colSnapshots$<T>(
    ref: CollectionPredicate<T>,
    ...queryConstraints: QueryConstraint[]
  ): Observable<QueryDocumentSnapshot<T>[]> {
    const q = query(this.col(ref), ...queryConstraints);
    return collectionSnapshots(q) as Observable<QueryDocumentSnapshot<T>[]>;
  }

  /**
   * Subscribes to a Firestore query, providing callbacks for results, errors,
   * and completion.
   *
   * @param {CollectionPredicate} ref A string path or CollectionReference
   * for the query.
   * @param {function(QuerySnapshot):void} onNext Callback for successful
   * query results.
   * @param {function(FirebaseError):void} onError Callback for errors.
   * @param {function():void} onCompletion Callback for when the subscription
   * completes.
   * @param {...QueryConstraint} queryConstraints Optional Firestore query
   * constraints.
   * @return {Unsubscribe} A function to unsubscribe from the Firestore stream.
   */
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
    );
  }

  /**
   * Subscribes to a Firestore document, providing callbacks for updates,
   * errors, and completion.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference for
   * the document.
   * @param {function(DocumentSnapshot):void} onNext Callback for document
   * updates.
   * @param {function(FirebaseError):void} onError Callback for errors.
   * @param {function():void} onCompletion Callback for when the subscription
   * completes.
   * @return {Unsubscribe} A function to unsubscribe from the Firestore stream.
   */
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

  /**
   * Returns a `serverTimestamp()` placeholder from Firestore, useful for
   * setting timestamps.
   *
   * @return {FieldValue} A serverTimestamp field value for Firestore.
   */
  get timestamp(): FieldValue {
    return serverTimestamp();
  }

  /**
   * **Data Manipulation**
   *
   * Encapsulates Firestore data manipulation operations for adding, setting,
   * updating, and deleting documents. Includes helpers for server-side
   * timestamps.
   */

  /**
   * Adds a new document to a Firestore collection. Automatically sets
   * 'created' and 'updated' timestamps using `serverTimestamp()`.
   *
   * @param {CollectionPredicate} ref A string path or CollectionReference
   * to the collection.
   * @param {WithFieldValue} data The data for the new document.
   * @return {Promise<DocumentReference>} A Promise resolving to the
   * DocumentReference of the newly created document.
   */
  add<T>(
    ref: CollectionPredicate<T>,
    data: WithFieldValue<T>,
  ): Promise<DocumentReference<T>> {
    const timestamp = this.timestamp;
    data = Object.assign({ created: timestamp, updated: timestamp }, data);
    return addDoc(this.col(ref), data);
  }

  /**
   * Creates a new document in Firestore or overwrites an existing one.
   * Automatically sets 'created' and 'updated' timestamps using
   * `serverTimestamp()`.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference for
   * the document.
   * @param {PartialWithFieldValue} data The data for the document.
   * @param {SetOptions} options (Optional) Options for the set operation
   * (e.g., merge, mergeFields).
   * @return {Promise<void>} A Promise resolving upon successful completion
   * of the set operation.
   */
  set<T>(
    ref: DocumentPredicate<T>,
    data: PartialWithFieldValue<T>,
    options: SetOptions = {},
  ): Promise<void> {
    const timestamp = this.timestamp;
    data = Object.assign({ created: timestamp, updated: timestamp }, data);
    return setDoc(this.doc(ref), data, options);
  }

  /**
   * Updates an existing Firestore document.
   * Automatically sets the 'updated' timestamp using `serverTimestamp()`.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference for
   * the document.
   * @param {UpdateData} data The fields and values to update in the document.
   * @return {Promise<void>} A Promise resolving upon successful completion
   * of the update operation.
   */
  update<T extends DocumentData>(
    ref: DocumentPredicate<T>,
    data: UpdateData<T>,
  ): Promise<void> {
    const timestamp = this.timestamp;
    data = Object.assign({ updated: timestamp }, data);
    return updateDoc(this.doc(ref), data);
  }

  /**
   * Checks if a Firestore document exists.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference for
   * the document.
   * @return {Promise<boolean>} A Promise resolving to `true` if the document
   * exists, `false` otherwise.
   */
  async docExists<T>(ref: DocumentPredicate<T>): Promise<boolean> {
    const snapshot = await getDoc(this.doc(ref));
    return snapshot.exists();
  }

  /**
   * Deletes a Firestore document.
   *
   * @param {DocumentPredicate} ref A string path or DocumentReference for
   * the document.
   * @return {Promise<void>} A Promise resolving upon successful deletion.
   */
  delete<T>(ref: DocumentPredicate<T>): Promise<void> {
    return deleteDoc(this.doc(ref));
  }

  /**
   * **Advanced Operations**
   *
   * Provides methods to perform Firestore transactions and write batches,
   * enabling complex, atomic updates across multiple documents.
   */

  /**
   * Executes a Firestore transaction with automatic retries.
   *
   * @param {function(Transaction):Promise} updateFunction A function that
   * takes a Transaction object and performs the transactional updates.
   * Must return a Promise.
   * @param {Options} options (Optional) Options to configure the
   * transaction behavior.
   * @return {Promise} A Promise resolving with the result of the
   * transaction's `updateFunction`.
   */
  transaction<T>(
    updateFunction: (transaction: Transaction) => Promise<T>,
    options?: TransactionOptions,
  ) {
    return runTransaction(this.db, updateFunction, options ?? undefined);
  }

  /**
   * Executes a batch of write operations on Firestore.
   *
   * @param {function(WriteBatch):Promise<void>} updateFunction A function
   * that takes a WriteBatch object and adds write operations
   * (set, update, delete). Must return a Promise.
   * @return {Promise<void>} A Promise resolving upon successful completion
   * of all write operations.
   */
  async batch(
    updateFunction: (batch: WriteBatch) => Promise<void>,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        const batch = writeBatch(this.db);

        return updateFunction(batch)
          .then(() => batch.commit())
          .then(() => resolve(undefined))
          .catch((error) => {
            reject(error.message);
          });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
