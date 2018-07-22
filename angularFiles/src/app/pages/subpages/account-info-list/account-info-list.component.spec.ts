import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoListComponent } from './account-info-list.component';

describe('AccountInfoListComponent', () => {
  let component: AccountInfoListComponent;
  let fixture: ComponentFixture<AccountInfoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountInfoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountInfoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
