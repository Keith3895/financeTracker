import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AddAccountService {
  url = "http://localhost:4000/account/";
  constructor(private http:HttpClient) { }

  addAccount(details : Object){
    details['user'] = window.localStorage.getItem('user');
    let jwtToken = "jwt "+window.localStorage.getItem('token') 
    let headers = new HttpHeaders({'contentType':'application/json',
                                    'Authorization' : jwtToken});
    return this.http.put(this.url+'add',details,{headers : headers});
  }
}
