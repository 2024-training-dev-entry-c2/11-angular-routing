import { TestBed } from '@angular/core/testing';

import { GetOrdenService } from './get-orden.service';

describe('GetOrdenService', () => {
  let service: GetOrdenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrdenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
