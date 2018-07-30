import { TestBed, async, inject } from '@angular/core/testing';

import { BasicGuard } from './basic.guard';
import {LoginService} from '../service/login/login.service';
describe('BasicGuard', () => {
  let testBedService;
  beforeEach(() => {
    testBedService = TestBed.get(LoginService);
    TestBed.configureTestingModule({
      providers: [BasicGuard,LoginService]
    });
    
  });
});
