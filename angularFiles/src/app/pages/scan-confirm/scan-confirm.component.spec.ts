import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanConfirmComponent } from './scan-confirm.component';

describe('ScanConfirmComponent', () => {
  let component: ScanConfirmComponent;
  let fixture: ComponentFixture<ScanConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScanConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScanConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
