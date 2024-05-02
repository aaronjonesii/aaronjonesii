import { TestBed } from '@angular/core/testing';
import { RoutingService } from './routing.service';
import { provideRouter } from '@angular/router';

describe('RoutingService', () => {
  let service: RoutingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
      ],
    }).compileComponents();
    service = TestBed.inject(RoutingService);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
  });
});
