import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { FirestoreService } from './firestore.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
