import { TestBed } from '@angular/core/testing';

import { SendEmailsV2Service } from './send-emails-v2.service';

describe('SendEmailsV2Service', () => {
  let service: SendEmailsV2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendEmailsV2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
