import { TestBed } from '@angular/core/testing';

import { ProviderValidationService } from './provider-validation.service';

describe('ProviderValidationService', () => {
  let service: ProviderValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProviderValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
