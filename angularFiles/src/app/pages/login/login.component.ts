import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  constructor(private loginService: LoginService,
  private router:Router) { }
  test;
  options =[
		'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur',
		'adipiscing', 'elit', 'curabitur', 'vel', 'hendrerit', 'libero',
		'eleifend', 'blandit', 'nunc', 'ornare', 'odio', 'ut',
		'orci', 'gravida', 'imperdiet', 'nullam', 'purus', 'lacinia',
		'a', 'pretium', 'quis', 'congue', 'praesent', 'sagittis', 
		'laoreet', 'auctor', 'mauris', 'non', 'velit', 'eros'];
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
