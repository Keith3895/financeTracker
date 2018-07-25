import { Component, OnInit,ViewEncapsulation,ViewChild,ElementRef } from '@angular/core';
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
 // @Input() visible : boolean;
  constructor(private loginService: LoginService,
  private router:Router) { 
    //this.visible = true;
  }
  test=false;
  submitted =false;
  @ViewChild("loginForm") loginForm: ElementRef;
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
    // this.loginForm['valid'] = false;
    console.log(this.loginService.loggedIn());
  }

  onSubmit(fVal){
    this.submitted = true;
    if(fVal.valid){
      this.loginService.authenticateUser(fVal.value).subscribe(res => {
        this.loginService.storeUserData(res['token'],res['user']);
        this.router.navigate(['/dashboard']);
      },err=>{
        console.log(err);
      });
      
    }
  }
  // closeDialog(event){
  //   this.visible = event;
  // }
}
