import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  passwordError = "Enter a valid password";
  errorToggle = 'none';
  constructor(private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
  }
  matchCheck(signup) {
    if (signup.value.password != signup.value.rePassword) {
      this.passwordError = 'Passwords do not match';
      this.errorToggle = 'block';
    } else {
      this.passwordError = "Enter a valid password";
      this.errorToggle = 'none';
    }
  }
  onSubmit(signup) {
    if (signup.valid) {
      if (this.errorToggle == 'none') {
        this.loginService.registerUser(signup.value).subscribe(res => {
          this.router.navigate(['dashboard']);
        });
      } else {
        this.matchCheck(signup);
      }
    }
  }
}
