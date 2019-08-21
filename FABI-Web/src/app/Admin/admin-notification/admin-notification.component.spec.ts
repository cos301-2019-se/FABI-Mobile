import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNotificationComponent } from './admin-notification.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';
//Import form components
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Import the materials component
import { MaterialModule } from '../../materials';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';

describe('AdminNotificationComponent', () => {
  let component: AdminNotificationComponent;
  let fixture: ComponentFixture<AdminNotificationComponent>;
  let de : DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, BrowserAnimationsModule 
      ],
      declarations: [ AdminNotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
