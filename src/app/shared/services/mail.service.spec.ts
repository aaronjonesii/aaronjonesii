import { TestBed } from '@angular/core/testing';

import { MailService } from './mail.service';
import { FirestoreService } from './firestore.service';

describe('MailService', () => {
  let service: MailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(MailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
