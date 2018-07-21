import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTformComponent } from './add-tform.component';

describe('AddTformComponent', () => {
  let component: AddTformComponent;
  let fixture: ComponentFixture<AddTformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
