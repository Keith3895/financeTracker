import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// components import 
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { CardComponent } from './component/card/card.component';
import { InputComponent } from './component/input/input.component';
//page imports
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
// service import
import { LoginService } from './service/login.service';
import { SystemService } from './service/system.service';
import { CordovaService } from './service/cordova/cordova.service';
import { SmsService } from './service/smsfunctions/sms.service';
import { BasicGuard } from './gaurd/basic.guard';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { Input2Component } from './component/input2/input2.component'
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [BasicGuard] }
];
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any>{
    'swipe': { velocity: 0.4, threshold: 20 } // override default settings
  }
}
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SidenavComponent,
    LoginComponent,
    SignupComponent,
    CardComponent,
    InputComponent,
    DashboardComponent,
    Input2Component
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  },
    LoginService,
    SystemService,
    BasicGuard,
    CordovaService,
    SmsService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
],
  bootstrap: [AppComponent]
})
export class AppModule { }
