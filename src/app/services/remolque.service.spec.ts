import { TestBed } from '@angular/core/testing';

import { RemolqueService } from './remolque.service';

describe('RemolqueService', () => {
  let service: RemolqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RemolqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
