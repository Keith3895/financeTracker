import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SystemService } from '../system/system.service';

@Injectable()
export class AddAccountService {

  url;
  systemService;
  constructor(private http: HttpClient) {
    this.systemService = new SystemService();
    this.url = this.systemService.getURL();
  }

  addAccount(details: Object) {
    details['user'] = window.localStorage.getItem('user');
    let jwtToken = "JWT " + window.localStorage.getItem('token')
    let headers = new HttpHeaders({
      'contentType': 'application/json',
      'Authorization': jwtToken
    });
    return this.http.put(this.url + '/account/add', details, { headers: headers });
  }
  getAccount() {
    let jwtToken = "JWT " + window.localStorage.getItem('token')
    let headers = new HttpHeaders({
      'contentType': 'application/json',
      'Authorization': jwtToken
    });
    return this.http.post(this.url + '/account/getAccount', {
      username: window.localStorage.getItem('user')
    }, { headers: headers });
  }
  /**
   * 
   * @param sendValue {Object} transaction object
   */
  addTransaction(sendValue){
    sendValue['user'] = window.localStorage.getItem('user');
    let jwtToken = "jwt " + window.localStorage.getItem('token')
    let headers = new HttpHeaders({
      'contentType': 'application/json',
      'Authorization': jwtToken
    });
    return this.http.put(this.url + '/transaction/add', sendValue, { headers: headers });
  }
  /**
   * 
   * @param sendValue {Array<Object>} list of transaction objects
   */
  addBulkTransaction(sendValue){
    let jwtToken = "jwt " + window.localStorage.getItem('token')
    let headers = new HttpHeaders({
      'contentType': 'application/json',
      'Authorization': jwtToken
    });
    return this.http.put(this.url + '/transaction/addMany', sendValue, { headers: headers });
  }
}
