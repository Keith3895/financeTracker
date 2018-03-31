import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';

import {DatepickerOptions} from '../../component/ng-datepicker/component/ng-datepicker.component';
import * as enLocale from 'date-fns/locale/en';
import * as frLocale from 'date-fns/locale/fr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
  private router:Router) { 
  }
  test=false;
  // date: Date;
  // options: DatepickerOptions = {
  //   locale: enLocale
  // };
  // options =[
	// 	'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
	// 	'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
	// 	'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
	// 	'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
	// 	'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 
	// 	'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros'];
  ngOnInit() {
  }
  onSubmit(fVal){
    if(fVal.valid){
      this.loginService.authenticateUser(fVal.value).subscribe(res => {
        this.loginService.storeUserData(res['token'],res['user']);
        this.router.navigate(['/dashboard']);
      },err=>{
        console.log(err);
      });
      
    }
  }
}
