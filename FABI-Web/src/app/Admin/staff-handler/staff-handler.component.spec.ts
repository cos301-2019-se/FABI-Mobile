import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHandlerComponent } from './staff-handler.component';

import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'
import { LoadingComponent } from '../../_loading/loading.component';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';

describe('StaffHandlerComponent', () => {
  let component: StaffHandlerComponent;
  let fixture: ComponentFixture<StaffHandlerComponent>;

  let UserManagementService: UserManagementAPIService;
  let notificationLoggingService: NotificationLoggingService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { 'user' : '' };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffHandlerComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule],
        providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
      })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    notificationLoggingService = new NotificationLoggingService(null, null);
    authService = new AuthenticationService(null);
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(AuthenticationService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.addStaffForm).toBeDefined();
    expect(component.addStaffForm.invalid).toBeTruthy();

    expect(component.submitted).toBeFalsy();
    expect(component.valid).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  // -------- Form Controls Tests --------
  it('Empty admin name expect admin name invalid', () => {
    component.addStaffForm.controls.staff_name.setValue('');
    expect(component.addStaffForm.controls.staff_name.valid).toBeFalsy();
  });

  it('Empty admin surname expect admin surname invalid', () => {
    component.addStaffForm.controls.staff_surname.setValue('');
    expect(component.addStaffForm.controls.admin_surname.valid).toBeFalsy();
  });

  it('Empty admin email expect admin email invalid', () => {
    component.addStaffForm.controls.staff_email.setValue('');
    expect(component.addStaffForm.controls.admin_email.valid).toBeFalsy();
  });

  it('Empty admin phone expect admin phone invalid', () => {
    component.addStaffForm.controls.staff_phone.setValue('');
    expect(component.addStaffForm.controls.admin_phone.valid).toBeFalsy();
  });

  it('Empty admin type expect admin type invalid', () => {
    component.addStaffForm.controls.admin_type.setValue('');
    expect(component.addStaffForm.controls.admin_type.valid).toBeFalsy();
  });

  // it('Empty database privileges expect database privileges invalid', () => {
  //   component.addStaffForm.controls.database_privileges.setValue('[]');
  //   expect(component.addStaffForm.controls.database_privileges.valid).toBeFalsy();
  // });

  it('Empty form expect invalid', () => {
    component.addStaffForm.controls.staff_name.setValue('');
    component.addStaffForm.controls.staff_surname.setValue('');
    component.addStaffForm.controls.staff_email.setValue('');
    component.addStaffForm.controls.staff_phone.setValue('');
    component.addStaffForm.controls.staff_position.setValue('');
    component.addStaffForm.controls.admin_type.setValue('');
    // component.addStaffForm.controls.database_privileges.setValue('[]');

    expect(component.addStaffForm.valid).toBeFalsy();
  });


  it('Valid form expect true', () => {
    component.addStaffForm.controls.staff_name.setValue('TesterFName');
    component.addStaffForm.controls.staff_surname.setValue('TesterLName');
    component.addStaffForm.controls.staff_email.setValue('tester@gmail.com');
    component.addStaffForm.controls.staff_phone.setValue('0000000000');
    component.addStaffForm.controls.staff_position.setValue('clinic');
    component.addStaffForm.controls.admin_type.setValue('super');
    // component.addStaffForm.controls.database_privileges.setValue('["Sirex"]');

    expect(component.addStaffForm.valid).toBeTruthy();
  });
});
