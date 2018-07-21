import { Injectable } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import {HttpClient, HttpResponse, HttpHeaders} from '@angular/common/http';
import {SystemService} from './system.service';
import 'rxjs/add/operator/map';
@Injectable()
export class LoginService {
  authToken: any;
  user: any;
  systemService;
  ep;
  constructor(private http: HttpClient) { 
    this.systemService = new SystemService();
    this.ep = this.systemService.getURL()+'/auth';
  }


  registerUser(user){
    return this.http.post(this.ep+'/register',user);
  }
  authenticateUser(user){
    console.log("iinside auth",user);
    return this.http.post(this.ep+'/sign_in',user);
  }
  storeUserData(token,user){
    localStorage.setItem('token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user = user;
  }
  loadToken(){
    const token = localStorage.getItem('token');
    this.authToken = token;
    this.user = JSON.parse(localStorage.getItem('user'));
    return token;
  }
  loggedIn(){
    return tokenNotExpired();    
  }
  logout(){
    console.log('here');
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
