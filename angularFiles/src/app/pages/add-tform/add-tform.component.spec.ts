import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddTformComponent } from './add-tform.component';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDatepickerModule } from '../../component/ng-datepicker/module/ng-datepicker.module';
import { MapsAPILoader,AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { AddAccountService } from '../../service/addAccount/add-account.service';
import { SnackBarService } from '../../service/snackBar/snack-bar.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { Input2Component } from '../../component/input2/input2.component';
import { RadioComponent } from '../../component/radio/radio.component';
import { SelectComponent } from '../../component/select/select.component';
import { ToggleComponent } from '../../component/toggle/toggle.component';
import { APP_BASE_HREF } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DebugElement } from '@angular/core';

function random(min, max) {
  return Math.floor(Math.random() * (+max - +min)) + +min;
}


describe('AddTformComponent', () => {
  let component: AddTformComponent;
  let fixture: ComponentFixture<AddTformComponent>;
  let service;
  let de: DebugElement;
  let el: HTMLElement;
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
      ],
      providers: [AddAccountService, MapsAPILoader, SnackBarService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddTformComponent);
        component = fixture.componentInstance;
        service = TestBed.get(AddAccountService);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImtlaXRoIiwiX2lkIjoiNWI3NjhhNGEwNGE2YTMwZmUyMzIwYzEzIiwiaWF0IjoxNTM0NDk1NDI3LCJleHAiOjE1MzQ0OTkwMjd9.xb-EfPLj357RJtR9mdL4vHejRWXjc6OcsUfnlzuLnT4');
    });
  

  it('validate type',async(() => {
    // component.showLoader = false;
    component.type = "dummy Value";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.currentForm.form.get('type');
    expect(service.getAccount()).toBeTruthy();
      expect(test.valid).toBeTruthy();
    });
  }));

  const randomValue = random(0,10000000000000);
  it('validate Amount', async(() => {
    expect(service.getAccount()).toBeTruthy();
    component.Amount = randomValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const amount = component.currentForm.form.get('Amount');
      expect(amount.valid).toBeTruthy();
    });
  }));
  
  it('validate Account',async(() => {
    component.account = "select Value";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
       const account = component.currentForm.form.get('account');
       expect(service.getAccount()).toBeTruthy();
       expect(account.valid).toBeTruthy();
    });
  }));

  it('validate date',() => {
    component.date = new Date();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const date = component.currentForm.form.get('date');
      expect(date.valid).toBeTruthy();
    })
  });

  it('validate overide',async(() => {
    component.overide = false;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const overide = component.currentForm.form.get('overide');
      expect(overide.valid).toBeTruthy();
    });
  }));

  it('check for showMap if false',async(() => {
     component.showMap = false;
     component.latitude = null;
     component.longitude = null;
     component.address = null;
     fixture.detectChanges();
     fixture.whenStable().then(() => {
       const showMap = component.currentForm.form.get('showMap');
       expect(showMap.value).toBeFalsy();
       expect(component.latitude).toBeNull();
       expect(component.longitude).toBeNull();
       expect(component.address).toBeNull()
     });
  }));

  it('check for showMap if true',async(() => {
// component.showMap = true;
    component.latitude = random(-90.0000,90.0000);
    component.longitude = random(-180.0000,180.0000);
    component.address = "random";
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const showMap = component.currentForm.form.get('showMap');
  //    expect(showMap.value).toBeFalsy();
      expect(component.latitude).toBeDefined();
      expect(component.longitude).toBeDefined();
      expect(component.address).toBeDefined()
    });
  }))

  afterEach(() => {
    TestBed.resetTestingModule();
  });
});
