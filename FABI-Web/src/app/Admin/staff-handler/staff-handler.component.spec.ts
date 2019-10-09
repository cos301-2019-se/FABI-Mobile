import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffHandlerComponent } from './staff-handler.component';

import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

import { MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

//Router
import { RouterTestingModule } from '@angular/router/testing';


describe('StaffHandlerComponent', () => {
  let component: StaffHandlerComponent;
  let fixture: ComponentFixture<StaffHandlerComponent>;
  let UserManagementService: UserManagementAPIService;
  let authService : AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
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
    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get DB Names', () =>{
    let spy = spyOn(UserManagementService, 'getDatabaseNames');
    component.getDBNames();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('get admin types', () =>{
    let spy = spyOn(UserManagementService, 'getFABIAdminTypes');
    component.getAdminTypes();
    expect(spy).toBeTruthy();
  });

  it('add staff', () =>{
    let spy = spyOn(UserManagementService, 'addStaffMember');
    component.addStaff();
    expect(spy).toBeTruthy();
  });

  it('remove staff', () =>{
    let spy = spyOn(UserManagementService, 'removeFABIStaffMember');
    component.removeStaffMember();
    expect(spy).toBeTruthy();
  });

  it('refresh datasource', () =>{
    let spy = spyOn(component, 'viewStaff');
    component.refreshDataSource();
    expect(spy).toHaveBeenCalled();
  });

  it('view staff', () =>{
    let spy = spyOn(UserManagementService, 'getAllStaffMembers');
    component.viewStaff();
    expect(spy).toBeTruthy();
  });

  it('toggle notification tab', () =>{
    let x = component.notificationsTab;
    component.toggleNotificationsTab();
    expect(component.notificationsTab == !x).toBeTruthy();
  });

  it('toggle profile tab', () =>{
    let x = component.profileTab;
    component.toggleProfileTab();
    expect(component.profileTab == !x).toBeTruthy();
  });

  it('toggle help tab', () =>{
    let x = component.helpTab;
    component.toggleHelpTab();
    expect(component.helpTab == !x).toBeTruthy();
  });

  it('displayProfileSaveBtn', () => {
    component.displayProfileSaveBtn();
    expect(component.saveBtn).toBeTruthy();
  });

  it('displayConfirmPasswordInput', () => {
    component.displayConfirmPasswordInput();
    expect(component.confirmPasswordInput).toBeTruthy();
  });

  it('reset add fields', () =>{
    let spy = spyOn(component.addStaffForm, 'reset');
    component.resetAddFields();
    expect(spy).toHaveBeenCalled();
  });

  it("Empty form expect invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("");
    component.addStaffForm.controls.staff_surname.setValue("");
    component.addStaffForm.controls.staff_email.setValue("");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue([]);

    expect(component.addStaffForm.valid).toBeFalsy();
  });

  it("Empty staff surname expect admin surname invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("");
    component.addStaffForm.controls.staff_email.setValue("");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue([]);

    expect(component.addStaffForm.controls.staff_surname.valid).toBeFalsy();
  });

  it("Empty staff email expect admin email invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue([]);

    expect(component.addStaffForm.controls.staff_email.valid).toBeFalsy();
  });

  it("Empty staff phone expect admin phone invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("");
    component.addStaffForm.controls.staff_position.setValue("");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue([]);

    expect(component.addStaffForm.controls.staff_phone.valid).toBeFalsy();
  });

  it("Empty admin type expect admin type invalid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("0000000000");
    component.addStaffForm.controls.staff_position.setValue("clinic");
    component.addStaffForm.controls.admin_type.setValue("");
    component.addStaffForm.controls.database_privileges.setValue([]);

    expect(component.addStaffForm.controls.admin_type.valid).toBeFalsy();
  });

  it("Empty database privileges expect database privileges valid", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("0000000000");
    component.addStaffForm.controls.staff_position.setValue("clinic");
    component.addStaffForm.controls.admin_type.setValue("super");
    component.addStaffForm.controls.database_privileges.setValue([]);

    expect(component.addStaffForm.controls.database_privileges.valid).toBeTruthy();
  });

  it("Valid form expect true", () => {
    component.addStaffForm.controls.staff_name.setValue("TesterFName");
    component.addStaffForm.controls.staff_surname.setValue("TesterLName");
    component.addStaffForm.controls.staff_email.setValue("tester@gmail.com");
    component.addStaffForm.controls.staff_phone.setValue("0000000000");
    component.addStaffForm.controls.staff_position.setValue("clinic");
    component.addStaffForm.controls.admin_type.setValue("super");
    component.addStaffForm.controls.database_privileges.setValue([true]);

    expect(component.addStaffForm.valid).toBeTruthy();
  });
});
