import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
// components import 
import { AppComponent } from './app.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { CardComponent } from './component/card/card.component';
import { InputComponent } from './component/input/input.component';
import { Input2Component } from './component/input2/input2.component';
import { ModalComponent } from './component/modal/modal.component';
import { NgDatepickerModule } from './component/ng-datepicker/module/ng-datepicker.module';
//page imports
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AddTformComponent } from './pages/add-tform/add-tform.component';
// service import
import { LoginService } from './service/login/login.service';
import { SystemService } from './service/system/system.service';
import { CordovaService } from './service/cordova/cordova.service';
import { SmsService } from './service/smsfunctions/sms.service';
import { BasicGuard } from './gaurd/basic.guard';
import { InterceptorService } from './service/interceptor/interceptor.service';
import { AddAccountService } from './service/addAccount/add-account.service';
import { RadioComponent } from './component/radio/radio.component';
import { SelectComponent } from './component/select/select.component';
import { ToggleComponent } from './component/toggle/toggle.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { TabComponent } from './component/tab/tab.component';
import { SpendListComponent } from './pages/subpages/spend-list/spend-list.component';
import { AccountInfoListComponent } from './pages/subpages/account-info-list/account-info-list.component';
import { GraphsComponent } from './pages/subpages/graphs/graphs.component';
import { AddAccountComponent } from './pages/subpages/add-account/add-account.component';
import { SnackBarComponent } from './component/snack-bar/snack-bar.component';
import { SnackBarService } from '../app/service/snackBar/snack-bar.service';
import { FabButtonComponent } from './component/fab-button/fab-button.component';
import { ScanConfirmComponent } from './pages/scan-confirm/scan-confirm.component';
import { MainComponent } from './pages/main/main.component';
const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  // { path: '**', component: PageNotFoundComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'main', component: MainComponent, canActivate: [BasicGuard], children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [BasicGuard] }
    ]
  },

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
    Input2Component,
    ModalComponent,
    AddTformComponent,
    RadioComponent,
    SelectComponent,
    ToggleComponent,
    CheckboxComponent,
    TabComponent,
    SpendListComponent,
    AccountInfoListComponent,
    GraphsComponent,
    AddAccountComponent,
    SnackBarComponent,
    FabButtonComponent,
    ScanConfirmComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    NgDatepickerModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAGuj_bN2XCr5GRFCcReiT1698SU4X2A7Y",
      libraries: ["places"]
    }),
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
    AddAccountService,
    SnackBarService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
