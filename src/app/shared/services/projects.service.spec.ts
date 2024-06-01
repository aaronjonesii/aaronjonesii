import { TestBed } from '@angular/core/testing';

import { ProjectsService } from './projects.service';
import { FirestoreService } from './firestore.service';

describe('ProjectsService', () => {
  let service: ProjectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: FirestoreService,
          useValue: {},
        },
      ],
    });
    service = TestBed.inject(ProjectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
