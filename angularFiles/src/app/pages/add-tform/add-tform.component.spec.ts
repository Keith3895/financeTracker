import { AgmCoreModule, MapsAPILoader } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Input2Component } from '../../component/input2/input2.component';
import { NgDatepickerModule } from '../../component/ng-datepicker/module/ng-datepicker.module';
import { RadioComponent } from '../../component/radio/radio.component';
import { SelectComponent } from '../../component/select/select.component';
import { ToggleComponent } from '../../component/toggle/toggle.component';
import { AddAccountService } from '../../service/addAccount/add-account.service';
import { SnackBarService } from '../../service/snackBar/snack-bar.service';
import { SystemService } from '../../service/system/system.service';
import { AddTformComponent } from './add-tform.component';
function random(min, max) {
  return Math.floor(Math.random() * (+max - +min)) + +min;
}


describe('AddTformComponent', () => {
  let component: AddTformComponent;
  let fixture: ComponentFixture<AddTformComponent>;
  let service;
  let httpTestingController: HttpTestingController;
  let systeService = new SystemService();
  let endpoint = systeService.getURL() + "/account/getAccount";
  console.log(endpoint);
  const response = [{ "bankName": "Syndicate Bank", "accountNumber": "0934232434234", "balance": 423, "overrideBalance": false, "user": "Ramya" }, { "bankName": "dfd", "accountNumber": "343234343343423", "balance": 3423, "overrideBalance": false, "user": "Ramya" }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddTformComponent,
        Input2Component,
        RadioComponent,
        SelectComponent,
        ToggleComponent],
      imports: [
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        NgDatepickerModule,
        AgmCoreModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [AddAccountService, MapsAPILoader, SnackBarService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddTformComponent);

        service = TestBed.get(AddAccountService);
        httpTestingController = TestBed.get(HttpTestingController);
        component = fixture.componentInstance;
      });
  }));
  it('validate type : "Credit"', fakeAsync(() => {
    component.type = "Credit";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const test = component.currentForm.form.get('type');
      expect(test.valid).toBeTruthy();
    });
  }));


  const randomValue = random(0, 10000000000000);
  it('validate Amount : ' + randomValue, async(() => {
    component.Amount = randomValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const amount = component.currentForm.form.get('Amount');
      expect(amount.valid).toBeTruthy();
    });
  }));

  it('validate Account', async(() => {
    component.account = "select Value";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const account = component.currentForm.form.get('account');
      expect(account.valid).toBeTruthy();
    });
  }));

  it('validate date', () => {
    component.date = new Date();
    fixture.detectChanges();
    const req = httpTestingController.expectOne(endpoint);
    expect(req.request.method).toEqual('POST');
    // Respond with this data when called
    req.flush(response);
    fixture.whenStable().then(() => {
      const date = component.currentForm.form.get('date');
      expect(date.valid).toBeTruthy();
    })
  });

  it('validate overide', async(() => {
    component.overide = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const overide = component.currentForm.form.get('overide');
      expect(overide.valid).toBeTruthy();
    });
  }));

  it('check for overide balance value if true', async(() => {
    component.overide = true;
    component.balance = random(0, 9999999);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const overide = component.currentForm.form.get('overide');
      const balance = component.currentForm.form.get('balance');
      expect(overide.valid).toBeTruthy();
      expect(balance.valid).toBeTruthy();
    });
  }));


  it('check for showMap if false', async(() => {
    component.showMap = false;
    component.latitude = null;
    component.longitude = null;
    component.address = null;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const showMap = component.currentForm.form.get('showMap');
      expect(showMap.value).toBeFalsy();
      expect(component.latitude).toBeNull();
      expect(component.longitude).toBeNull();
      expect(component.address).toBeNull()
    });
  }));

  it('check for showMap if true', async(() => {
    // component.showMap = true;
    component.latitude = random(-90.0000, 90.0000);
    component.longitude = random(-180.0000, 180.0000);
    component.address = "random";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const req = httpTestingController.expectOne(endpoint);
      expect(req.request.method).toEqual('POST');
      // Respond with this data when called
      req.flush(response);
      const showMap = component.currentForm.form.get('showMap');
      //    expect(showMap.value).toBeFalsy();
      expect(component.latitude).toBeDefined();
      expect(component.longitude).toBeDefined();
      expect(component.address).toBeDefined()
    });
  }))

  afterEach(() => {
    TestBed.resetTestingModule();
    httpTestingController.verify();
  });
});