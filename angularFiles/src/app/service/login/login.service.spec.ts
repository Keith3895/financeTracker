import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { SystemService } from '../system/system.service';
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
    localStorage.setItem('token', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1MzIwOTkwNDUsImV4cCI6NDExOTc3OTA0NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.Sq6Z2yBTzPo-3te6tPNS_z_J8l037AozQ8XWwQ0tXeo');
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
