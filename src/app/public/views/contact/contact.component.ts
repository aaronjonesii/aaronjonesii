import { Component, Inject } from '@angular/core';
import { initialContactForm } from "../../../shared/forms/contact-form";
import { FirestoreService } from "../../../shared/services/firestore.service";
import { ConsoleLoggerService } from "../../../core/services/console-logger.service";
import { appInformation } from "../../../information";
import { DOCUMENT } from "@angular/common";
import { TopAppBarService } from "../../../shared/components/top-app-bar/top-app-bar.service";
import { SeoService } from "../../../core/services/seo.service";
import { nav_path } from "../../../app-routing.module";

@Component({
  selector: 'aj-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  private readonly title = 'Contact';
  public contactForm = initialContactForm;
  public success = false;
  public readonly appInformation = appInformation;

  constructor(
    private db: FirestoreService,
    private cLog: ConsoleLoggerService,
    @Inject(DOCUMENT) private document: Document,
    private topAppBarService: TopAppBarService,
    private seoService: SeoService,
  ) {
    topAppBarService.setOptions({
      title: this.title,
      showBackBtn: false,
      loading: false,
    });
    seoService.generateTags({
      title: this.title,
      route: nav_path.contact,
    });
  }

  private get name() { return this.contactForm.controls.name; }
  private get company() { return this.contactForm.controls.company; }
  private get email() { return this.contactForm.controls.email; }
  private get message() { return this.contactForm.controls.message; }

  public scrollToForm() {
    this.document.getElementById(`contact-container`)
      ?.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

  public async onSubmit(): Promise<void> {
    await this.db.batch(async batch => {
      const contactRef = this.db.doc(`contact/${this.db.newDocumentID}`);
      const contactData = Object.assign({created: this.db.timestamp}, this.contactForm.value);
      batch.set(contactRef, contactData);

      /* todo: use template for this email and add link to admin contact request */
      const mailRef = this.db.doc(`mail/${this.db.newDocumentID}`);
      const mailData = {
        to: appInformation.email,
        replyTo: this.email.value,
        message: {
          subject: `New Contact Request - ${this.name.value}`,
          text: `${this.name.value} just submitted a contact request on your website. Go check it out.`,
        },
      };
      batch.set(mailRef, mailData);
    }).then(() => {
      this.cLog.log(`Contact request received, we will follow up with you soon.`);
      this.success = true;
    }).catch(error => this.cLog.error(`Something went wrong sending your contact request.`, error));
  }
}
