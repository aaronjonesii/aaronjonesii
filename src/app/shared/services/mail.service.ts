import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { appInformation } from '../../information';
import { WriteBatch } from '@angular/fire/firestore';
import { ContactRequest } from '../interfaces/contact-request';

@Injectable({ providedIn: 'root' })
export class MailService {
  private readonly collectionName = 'mail';

  constructor(private db: FirestoreService) {}

  /**
   * Generates and sends a contact request notification email.
   * Can be sent immediately or as part of a Firestore batch transaction.
   *
   * @param {ContactRequest} contactRequest - The contact request details.
   * @param {WriteBatch} batch - (Optional) A Firestore WriteBatch to include
   * the email operation in.
   * @return {Promise<void>} A Promise that resolves when the email is sent.
   */
  async sendContactRequest(
    contactRequest: ContactRequest,
    batch?: WriteBatch,
  ): Promise<void> {
    /* todo: use template for this email w/link to admin contact request */
    const mailRef = this.db.doc(
      `${this.collectionName}/${this.db.newDocumentID}`,
    );
    const contactRequestLink = `https://${appInformation.website}/admin/contact-requests/${contactRequest.id}`;
    const mailData = {
      to: appInformation.email,
      replyTo: contactRequest.email,
      message: {
        subject: `New Contact Request - ${contactRequest.name}`,
        /* eslint-disable max-len */
        html: `Heyooo, ${contactRequest.name} just submitted a contact request to you.
               <a target="_blank" href="${contactRequestLink}">Check it out!</a>`,
        /* eslint-enable max-len */
      },
    };

    if (batch) batch.set(mailRef, mailData);
    else await this.db.set(mailRef, mailData);
  }
}
