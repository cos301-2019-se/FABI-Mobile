import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHandlerComponent } from './member-handler.component';
import { OrganizationNotificationComponent } from '../organization-notification/organization-notification.component'
import { OrganizationProfileComponent } from '../organization-profile/organization-profile.component'
import { OrganizationHelpComponent } from '../organization-help/organization-help.component'

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';

describe('MemberHandlerComponent', () => {
  let component: MemberHandlerComponent;
  let fixture: ComponentFixture<MemberHandlerComponent>;

  let UserManagementService: UserManagementAPIService;
  let DiagnosticClinicService: DiagnosticClinicAPIService;
  let notificationLoggingService: NotificationLoggingService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHandlerComponent,
        OrganizationNotificationComponent,
        OrganizationProfileComponent,
        OrganizationHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        BrowserAnimationsModule, RouterTestingModule, HttpClientTestingModule ],
        providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
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
    expect(DiagnosticClinicAPIService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.addMemberForm).toBeDefined();
    expect(component.addMemberForm.invalid).toBeTruthy();

    expect(component.submitted).toBeFalsy();
    expect(component.valid).toBeFalsy();
    expect(component.loading).toBeFalsy();
    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();
  });

  // -------- Form Controls Tests --------
  it('Empty name expect invalid', () => {
    component.addMemberForm.controls.member_name.setValue('');
    expect(component.addMemberForm.controls.member_name.valid).toBeFalsy();
  });

  it('Empty surname expect invalid', () => {
    component.addMemberForm.controls.member_surname.setValue('');
    expect(component.addMemberForm.controls.member_surname.valid).toBeFalsy();
  });

  it('Empty email expect invalid', () => {
    component.addMemberForm.controls.member_email.setValue('');
    expect(component.addMemberForm.controls.member_email.valid).toBeFalsy();
  });

  it('Empty phone expect invalid', () => {
    component.addMemberForm.controls.member_phone.setValue('');
    expect(component.addMemberForm.controls.member_phone.valid).toBeFalsy();
  });

  it('Valid form expect pass', () => {
    component.addMemberForm.controls.member_name.setValue('TesterFName');
    component.addMemberForm.controls.member_surname.setValue('TesterLName');
    component.addMemberForm.controls.member_email.setValue('tester@gmail.com');
    component.addMemberForm.controls.member_phone.setValue('0000000000');

    expect(component.addMemberForm.valid).toBeTruthy();
  });

  it('Invalid form expect fail', () => {
    component.addMemberForm.controls.member_name.setValue('');
    component.addMemberForm.controls.member_surname.setValue('');
    component.addMemberForm.controls.member_email.setValue('');
    component.addMemberForm.controls.member_phone.setValue('');

    expect(component.addMemberForm.valid).toBeFalsy();
  });

  // -------- Function Tests --------
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

  // -------- Service Tests --------
  it('add organization member', () =>{
    let spy = spyOn(UserManagementService, 'addOrgMember');
    component.addMember();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('remove organization member', () =>{
    let spy = spyOn(UserManagementService, 'removeOrganizationMember');
    component.removeMember();
    expect(spy).toBeTruthy();
  });

  it('view organization members', () =>{
    let spy = spyOn(UserManagementService, 'getAllOrganizationMembers');
    component.viewMembers();
    expect(spy).toBeTruthy();
  });

});
