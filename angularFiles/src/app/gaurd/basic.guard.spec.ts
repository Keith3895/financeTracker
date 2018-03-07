import { TestBed, async, inject } from '@angular/core/testing';

import { BasicGuard } from './basic.guard';

describe('BasicGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasicGuard]
    });
  });

  it('should ...', inject([BasicGuard], (guard: BasicGuard) => {
    expect(guard).toBeTruthy();
  }));
});
