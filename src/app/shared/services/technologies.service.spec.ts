import { TestBed } from '@angular/core/testing';

import { TechnologiesService } from './technologies.service';
import { FirestoreService } from './firestore.service';

describe('TechnologiesService', () => {
  let service: TechnologiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(TechnologiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
