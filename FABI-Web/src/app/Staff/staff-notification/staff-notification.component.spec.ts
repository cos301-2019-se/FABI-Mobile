import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffNotificationComponent } from './staff-notification.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationService } from '../../_services/notification.service';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('StaffNotificationComponent', () => {
  let component: StaffNotificationComponent;
  let fixture: ComponentFixture<StaffNotificationComponent>;
  let UserManagementService: UserManagementAPIService;
  let notifService: NotificationLoggingService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffNotificationComponent ],
      imports: [ReactiveFormsModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, MaterialModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        NotificationService,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffNotificationComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    notifService = new NotificationLoggingService(null, null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Tests --------
  it('get All Staff', () => {
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getAllStaff();
    expect(spy).toBeTruthy();
  });

  it('get Date (format)', () => {
    expect(component.getDate("Mon Jan 14 2019")).toEqual("14 Monday January 2019");
  });

  it('get empty Date ', () => {
    expect(component.getDate("")).toEqual("undefined undefined");
  });

  it('load logs ', () => {
    let spy = spyOn(notifService, 'getUserLogs');
    component.loadLogs();
    expect(spy).toBeTruthy();
  });

  it('load Notifications', () => {
    let spy2 = spyOn(component, 'loadLogs');
    component.loadNotifications();
    expect(spy2).toHaveBeenCalled();
  });

  it('load empty User details', () => {
    expect(component.loadUserDetails("")).toEqual("");
  });

  it('remove notification', () => {
    let spy = spyOn(notifService, 'updateFABIMemberNotifications');
    component.removeNotification("7412589630");
    expect(spy).toBeTruthy();
  });

});
