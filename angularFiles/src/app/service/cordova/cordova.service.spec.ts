import { TestBed, inject } from '@angular/core/testing';

import { CordovaService } from './cordova.service';

describe('CordovaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CordovaService]
    });
  });

  it('should be created', inject([CordovaService], (service: CordovaService) => {
    expect(service).toBeTruthy();
  }));
});
