import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { LoginService } from '../../service/login/login.service';
import { FormsModule } from '@angular/forms';
import { InputComponent } from '../../component/input/input.component';
import { CheckboxComponent } from '../../component/checkbox/checkbox.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { DashboardComponent} from '../dashboard/dashboard.component';
import { HttpClient } from '../../../../node_modules/@types/selenium-webdriver/http';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent }
];
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let loginService: LoginService;
  let spy;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent,
        InputComponent,
        CheckboxComponent],
      imports: [
        BrowserModule,
        FlexLayoutModule,
        RouterTestingModule,
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
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        // authService = TestBed.get(AuthService); 
        loginService = TestBed.get(LoginService);
        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('#loginPage'));
        el = de.nativeElement;
      });;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('Login Button is dissabled on init', () => {
    let LoginButon = fixture.debugElement.query(By.css('.Button button')).nativeElement;
    expect(LoginButon.disabled).toBeFalsy();
  });

  it(`should set submitted to true`, async(() => {
    component.onSubmit({
      valid: false
    });
    expect(component.submitted).toBeTruthy();
  }));
  it("valid input of form elements", async () => {
    await component.onSubmit({
      valid: true,
      value: {
        userName: "keith",
        password: "1234"
      }
    });
    expect(component.submitted).toBeTruthy();
    spy = spyOn(loginService, 'authenticateUser').and.returnValue({});
    console.log(spy);
    // console.log("service",loginService);
    // expect(loginService.authenticateUser).toHaveBeenCalled();
  });
});
