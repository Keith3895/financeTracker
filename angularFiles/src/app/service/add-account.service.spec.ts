import { TestBed, inject } from '@angular/core/testing';

import { AddAccountService } from './add-account.service';

describe('AddAccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddAccountService]
    });
  });

  it('should be created', inject([AddAccountService], (service: AddAccountService) => {
    expect(service).toBeTruthy();
  }));
});
