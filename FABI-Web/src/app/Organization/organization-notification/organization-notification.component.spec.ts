import { async, ComponentFixture, TestBed } from '@angular/core/testing';


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
import { DebugElement, NgModule } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/authentication.service';

import { OrganizationNotificationComponent } from './organization-notification.component';

describe('OrganizationNotificationComponent', () => {
  let component: OrganizationNotificationComponent;
  let fixture: ComponentFixture<OrganizationNotificationComponent>;
  let de : DebugElement;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
         MaterialModule, ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule, BrowserAnimationsModule 
      ],
      declarations: [ 
        OrganizationNotificationComponent 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationNotificationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
