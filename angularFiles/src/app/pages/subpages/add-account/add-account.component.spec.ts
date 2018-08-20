import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddAccountComponent } from './add-account.component';
import { AddAccountService } from '../../../service/addAccount/add-account.service';
import { SnackBarService } from '../../../service/snackBar/snack-bar.service';
import { Input2Component } from '../../../component/input2/input2.component';
import { ToggleComponent } from '../../../component/toggle/toggle.component';

function random(min, max) {
  return Math.floor(Math.random() * (+max - +min)) + +min;
}

describe('AddAccountComponent', () => {
  let component: AddAccountComponent;
  let fixture: ComponentFixture<AddAccountComponent>;
  let service;
  // let randomValue;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddAccountComponent,
        Input2Component,
        ToggleComponent],
      imports: [
        HttpClientModule,
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule],
      providers: [AddAccountService, SnackBarService]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(AddAccountComponent);
        component = fixture.componentInstance;
        service = TestBed.get(AddAccountService);
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Bank Name Check with value: "Dummy bank Name"', () => {
    component.bankName = 'Dummy bank Name';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('bankName');
      expect(test.valid).toBeTruthy();
    });
  });
  const randomValue = random(0, 1000000000);
  it('Bank Name Check with value<number> :' + randomValue + ' ', () => {
    component.bankName = randomValue;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('bankName');
      expect(test.valid).toBeFalsy();
    });
  });
  const randomValue2 = random(0, 1000000000);
  it('Bank Name Check with value<string> : "' + randomValue2 + '"', () => {
    component.bankName = randomValue2;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('bankName');
      console.log(test);
      expect(test.valid).toBeFalsy();
    });
  });
  const randomValue3 = random(1000000000, 9999999999);
  it('1) Mobile Number Check with value<string> : "' + randomValue3 + '"', () => {
    component.mobileNumber = '' + randomValue3 + '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('mobileNumber');

      expect(test.valid).toBeTruthy();
      // fix this
    });
  });
  const randomValue4 = random(1000000000, 9999999999);
  it('2) Mobile Number Check with value<Number> : ' + randomValue4 + '', () => {
    component.mobileNumber = randomValue4;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('mobileNumber');
      expect(test.valid).toBeTruthy();
    });
  });
  const randomValue5 = random(10000000000, 99999999999999);
  it('3) Mobile Number Check with value<string> : "' + randomValue5 + '"', () => {
    component.mobileNumber = '' + randomValue5 + '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('mobileNumber');
      expect(test.valid).toBeFalsy();
    });
  });
  const randomValue6 = random(0, 999);
  it('4) Mobile Number Check with value<string> : "' + randomValue6 + '"', () => {
    component.mobileNumber = '' + randomValue6 + '';
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('mobileNumber');
      expect(test.valid).toBeFalsy();
    });
  });
  for (let i = 100000000000; i <= 10000000000000000; i *= 10) {
    it('Account Number Check with value<string> ', () => {
      component.accountNumber = '' + random(i, i - 1) + '';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const test = component.ngForm.form.get('accountNumber');
        expect(test.valid).toBeTruthy();
      });
    });
    it('Account Number Check with value<Number>', () => {
      component.accountNumber = random(i, i - 1);
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const test = component.ngForm.form.get('accountNumber');
        expect(test.valid).toBeTruthy();
      });
    });
  }
  for (let i = 10000; i <= 100000000; i *= 10) {
    // const randomValue = random(i, i - 1);
    it('Account Number Check with value<string>', () => {
      component.accountNumber = '' + random(i, i - 1) + '';
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        const test = component.ngForm.form.get('accountNumber');
        expect(test.valid).toBeFalsy();
      });
    });
  }
  it('Ballance Accepts Digits', () => {
    component.balance = random(0, 99999);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const test = component.ngForm.form.get('balance');
      expect(test.valid).toBeTruthy();
    });
  });
});
