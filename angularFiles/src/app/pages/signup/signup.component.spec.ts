import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import { DebugElement } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../component/input/input.component';
import { CheckboxComponent } from '../../component/checkbox/checkbox.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { SignupComponent } from './signup.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
  // { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
];

describe('SignupComponent', () => {
  let de: DebugElement;
  let el: HTMLElement;
  let loginService: LoginService;
  let spy;
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent,
        InputComponent,
        CheckboxComponent],
      imports: [
        BrowserModule,
        FlexLayoutModule,
        RouterModule.forRoot(
          appRoutes,
          // { enableTracing: true } // <-- debugging purposes only
        ),
        FormsModule,
        HttpClientModule],
      providers: [LoginService,
        { provide: APP_BASE_HREF, useValue: '/' }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        // authService = TestBed.get(AuthService); 
        loginService = TestBed.get(LoginService);
        // query for the title <h1> by CSS element selector
        // de = fixture.debugElement.query(By.css('#loginPage'));
        // el = de.nativeElement;
      });;
  }));

  beforeEach(() => {
    fixture.detectChanges();
  });
  it('should Initialize', () => {
    component.ngOnInit();
    // expect(component).toBeTruthy();
  });
  it('Signup Button is not dissabled on init', () => {
    let LoginButon = fixture.debugElement.query(By.css('.Button button')).nativeElement;
    expect(LoginButon.disabled).toBeFalsy();
  });
  it('Check matchCheck with correct values', () => {
    component.matchCheck({
      value: {
        password: "passwords are same",
        rePassword: "passwords are same"
      }
    });
    expect(component.errorToggle).toEqual("none");
    expect(component.passwordError).toEqual("Enter a valid password");
  });
  it ("Check matchCheck with wrong values ", () => {
    component.matchCheck({
      value: {
        password: "passwords are not the same",
        rePassword: "asdf"
      }
    });
    expect(component.errorToggle).toEqual("block");
    expect(component.passwordError).toEqual("Passwords do not match");
  });
});
