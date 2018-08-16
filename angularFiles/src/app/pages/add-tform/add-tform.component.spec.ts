import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTformComponent } from './add-tform.component';
import { FormControl,FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgDatepickerModule } from '../../component/ng-datepicker/module/ng-datepicker.module';
import { MapsAPILoader } from '@agm/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { AddAccountService } from '../../service/addAccount/add-account.service';
import { SnackBarService } from '../../service/snackBar/snack-bar.service';
import { BrowserModule, By } from '@angular/platform-browser';
import { Input2Component } from '../../component/input2/input2.component';
import { RadioComponent } from '../../component/radio/radio.component';
import { SelectComponent } from '../../component/select/select.component';
import { ToggleComponent} from '../../component/toggle/toggle.component';
import { APP_BASE_HREF } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DebugElement } from '@angular/core';


describe('AddTformComponent', () => {
  let component: AddTformComponent;
  let fixture: ComponentFixture<AddTformComponent>;
  let service;
  let de : DebugElement;
  let el : HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTformComponent,
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
        HttpClientModule
      ],
     providers : [AddAccountService,MapsAPILoader,SnackBarService]
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
    component.ngAfterViewChecked();
    fixture.detectChanges();
  });
  
 it('validate type',async(() => {
  console.log(component.currentForm);
   component.type = "dummy Value";
    console.log(component.type);
    console.log(fixture.debugElement.query(By.css('form')));
    //console.log(fixture.debugElement.query(By.css('[name="credit"]')));
    expect(component.type).toBe('dummy Value');  
 }));
});
