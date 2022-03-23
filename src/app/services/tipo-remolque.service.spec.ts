import { TestBed } from '@angular/core/testing';

import { TipoRemolqueService } from './tipo-remolque.service';

describe('TipoRemolqueService', () => {
  let service: TipoRemolqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoRemolqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
