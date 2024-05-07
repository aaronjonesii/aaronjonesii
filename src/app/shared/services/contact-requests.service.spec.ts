import { TestBed } from '@angular/core/testing';

import { ContactRequestsService } from './contact-requests.service';

describe('ContactRequestsService', () => {
  let service: ContactRequestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContactRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
