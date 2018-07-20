import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { SystemService } from './system.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { } from 'jasmine';
describe('LoginService', () => {
  let service: LoginService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginService,
        SystemService],
      imports: [HttpClientModule]
    });
  });
  beforeEach(() => {
    let http: HttpClient;
    service = new LoginService(http);
  });

  it('should return true from loggedIn when there is a token', () => {
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImp0aSI6ImE0ZWFjODMxLTJiZDgtNDBmZS05YWNkLTNkYjZhMzhhN2VmNCIsImlhdCI6MTUzMjA4MzI5NCwiZXhwIjoxNTMyMDg2ODk0fQ.Aowre_GZwbVIzr3Vl4jiXNj_retpBZr6YrwNqyhDtKk');
    expect(service.loggedIn()).toBeTruthy();
  });
  it('should return false from loggedIn when there is no token', () => {
    expect(service.loggedIn()).toBeFalsy();
  });
  it('should return Stored Token', () => {
    expect(service.loadToken()).toMatch(new RegExp('^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$', 'ig'));
  });
  afterEach(() => {
    service = null;
    localStorage.removeItem('token');
  });
});
