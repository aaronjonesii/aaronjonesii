import { TestBed } from '@angular/core/testing';

import { ContactRequestsService } from './contact-requests.service';
import { FirestoreService } from './firestore.service';

describe('ContactRequestsService', () => {
  let service: ContactRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ContactRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
