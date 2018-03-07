import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

// components import 
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
//page imports
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { CardComponent } from './component/card/card.component';
import { InputComponent } from './component/input/input.component';
// service import
import { LoginService } from './service/login.service';
import { SystemService } from './service/system.service';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BasicGuard } from './gaurd/basic.guard';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[BasicGuard] }
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
    DashboardComponent
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
    BasicGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
