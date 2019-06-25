import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHandlerComponent } from './staff-handler.component';

import {MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';


describe('StaffHandlerComponent', () => {
  let component: StaffHandlerComponent;
  let fixture: ComponentFixture<StaffHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHandlerComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
