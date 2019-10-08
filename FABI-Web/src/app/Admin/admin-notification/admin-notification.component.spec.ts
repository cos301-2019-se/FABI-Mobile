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
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { AdminNotificationComponent } from './admin-notification.component';

describe('AdminNotificationComponent', () => {
  let component: AdminNotificationComponent;
  let fixture: ComponentFixture<AdminNotificationComponent>;
  let de : DebugElement;
  let UserManagementService: UserManagementAPIService;

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
      declarations: [  AdminNotificationComponent ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNotificationComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    UserManagementService = new UserManagementAPIService( null , null);
    component.ngOnInit();
    fixture.autoDetectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get All Staff', () => {
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getAllStaff();
    expect(spy).toBeTruthy();
  });

  it('get Date (format)', () => {
    expect(component.getDate("Mon Jan 14 2019")).toEqual("14 Monday January 2019");
  });

});
