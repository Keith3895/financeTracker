import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemService } from './system.service';

@Injectable()
export class AddAccountService {
  
  url;
  systemService;
  constructor(private http: HttpClient) { 
    this.systemService = new SystemService();
    this.url = this.systemService.getURL()+'/account';
  }

  addAccount(details: Object) {
    details['user'] = window.localStorage.getItem('user');
    let jwtToken = "jwt " + window.localStorage.getItem('token')
    let headers = new HttpHeaders({
      'contentType': 'application/json',
      'Authorization': jwtToken
    });
    return this.http.put(this.url + '/add', details, { headers: headers });
  }
}
