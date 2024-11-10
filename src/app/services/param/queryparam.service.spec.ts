import { TestBed } from '@angular/core/testing';

import { QueryparamService } from './queryparam.service';

describe('QueryparamService', () => {
  let service: QueryparamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueryparamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
