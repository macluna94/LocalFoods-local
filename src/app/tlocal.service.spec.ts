import { TestBed } from '@angular/core/testing';

import { TlocalService } from './tlocal.service';

describe('TlocalService', () => {
  let service: TlocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TlocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
