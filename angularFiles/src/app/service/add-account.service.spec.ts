import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";
import { AddAccountService } from './add-account.service';
import { SystemService } from './system.service';
import { HttpClient } from "@angular/common/http";
describe('AddAccountService', () => {
  let service: AddAccountService;
  let httpTestingController: HttpTestingController;
  let systemService = new SystemService();
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddAccountService]
    });
    service = TestBed.get(AddAccountService);
    httpTestingController = TestBed.get(HttpTestingController);
  });
  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
  it(
    "search should return SearchItems",
    fakeAsync(() => {
      let response = {
        "bankName": "dkkdk",
        "mobileNumber": "1231231231",
        "accountNumber": "12345678901",
        "balance": "2931",
        "overrideBalance": false
      };

      // Perform a request (this is fakeAsync to the responce won't be called until tick() is called)
      console.log("res");
      service.addAccount({
        "bankName": "dkkdk",
        "mobileNumber": "1231231231",
        "accountNumber": "12345678901",
        "balance": "2931",
        "overrideBalance": false
      }).subscribe(res=>{
        expect(res).toBeDefined();
      });

      // Expect a call to this URL
      const req = httpTestingController.expectOne(
        systemService.getURL() + "/account/add"
      );
      // Assert that the request is a GET.
      expect(req.request.method).toEqual("PUT");
      // Respond with this data when called
      req.flush(response);

      // Call tick whic actually processes te response
      tick();
      
    })
  );
});
