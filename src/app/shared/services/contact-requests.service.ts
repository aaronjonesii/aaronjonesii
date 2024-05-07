import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { ContactRequest } from '../interfaces/contact-request';
import { MailService } from './mail.service';

@Injectable({ providedIn: 'root' })
export class ContactRequestsService {
  private readonly collectionName = 'contact-requests';

  constructor(
    private db: FirestoreService,
    private mailService: MailService,
  ) {}

  /**
   * Adds a new contact request to Firestore and sends a notification email.
   *
   * @param {ContactRequest} contactRequest - The contact request data.
   * @return {Promise<void>} A Promise that resolves when both the
   * Firestore write and the email notification have completed.
   */
  async add(contactRequest: ContactRequest): Promise<void> {
    return this.db.batch(async (batch) => {
      /** Save contact request as Firestore document */
      const contactRef = this.db.doc<ContactRequest>(
        `${this.collectionName}/${this.db.newDocumentID}`,
      );
      const contactRequestData = Object.assign(
        { created: this.db.timestamp },
        contactRequest,
      );
      batch.set(contactRef, contactRequestData);

      /** Sent notification email */
      const contactRequestWithId = Object.assign(
        { id: contactRef.id },
        contactRequestData,
      );
      await this.mailService.sendContactRequest(contactRequestWithId);
    });
  }
}
