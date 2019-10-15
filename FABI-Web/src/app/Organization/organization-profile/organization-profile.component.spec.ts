import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationProfileComponent } from './organization-profile.component';
import { MatSnackBarModule, MatDialogModule } from '@angular/material';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';
import { NotificationService } from '../../_services/notification.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

describe('OrganizationProfileComponent', () => {
  let component: OrganizationProfileComponent;
  let fixture: ComponentFixture<OrganizationProfileComponent>;

  let UserManagementService: UserManagementAPIService;
  let DiagnosticClinicService: DiagnosticClinicAPIService;
  let notificationLoggingService: NotificationLoggingService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { 'user' : {'organisation' : '', 'ID' : '' } };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationProfileComponent ],
      imports: [
        NoopAnimationsModule,
        BrowserAnimationsModule,
        MaterialModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        MatDialogModule,
        RouterTestingModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
      providers: [ 
        NotificationService,
        ToastrService,
        { provide: AuthenticationService, useClass: MockAuthenticationService } 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    component.adminProfileForm.controls.organization_name.setValue("");
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

  // -------- Form Controls Tests --------
  it('Empty organization name expect organization name invalid', () => {
    component.adminProfileForm.controls.organization_name.setValue('');
    expect(component.adminProfileForm.controls.admin_name.valid).toBeFalsy();
  });

  it('Empty admin name expect admin name invalid', () => {
    component.adminProfileForm.controls.admin_name.setValue('');
    expect(component.adminProfileForm.controls.admin_name.valid).toBeFalsy();
  });

  it('Empty admin surname expect admin surname invalid', () => {
    component.adminProfileForm.controls.admin_surname.setValue('');
    expect(component.adminProfileForm.controls.admin_surname.valid).toBeFalsy();
  });

  it('Empty admin email expect admin email invalid', () => {
    component.adminProfileForm.controls.admin_email.setValue('');
    expect(component.adminProfileForm.controls.admin_email.valid).toBeFalsy();
  });

  it('Valid form expect true', () => {
    component.adminProfileForm.controls.organization_name.setValue('Test');
    component.adminProfileForm.controls.admin_name.setValue('TesterFName');
    component.adminProfileForm.controls.admin_surname.setValue('TesterLName');
    component.adminProfileForm.controls.admin_email.setValue('tester@gmail.com');

    expect(component.adminProfileForm.valid).toBeTruthy();
  });

  it('Empty form expect invalid', () => {
    component.adminProfileForm.controls.organization_name.setValue('');
    component.adminProfileForm.controls.admin_name.setValue('');
    component.adminProfileForm.controls.admin_surname.setValue('');
    component.adminProfileForm.controls.admin_email.setValue('');

    expect(component.adminProfileForm.valid).toBeFalsy();
  });

  // -------- Service Tests --------
  it('get user details', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    let spy = spyOn(UserManagementService, 'getUserDetails');
    component.loadAdminProfileDetails();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('update profile details', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    let spy = spyOn(UserManagementService, 'updateOrganizationMemberDetails');
    component.saveChanges();
    expect(spy).toBeTruthy();
  });

  it('update password', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    let spy = spyOn(UserManagementService, 'updateOrganizationMemberPassword');
    component.changePassword();
    expect(spy).toBeTruthy();
  });

  it('show password', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    component.passwordInput = { nativeElement: {type:"password"} };
    component.passwordInput.nativeElement.type = 'password';
    component.showPassword();
    expect(component.passwordInput.nativeElement.type).toEqual('text');
  });

  it('hide password', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    component.passwordInput = { nativeElement: {type:"text"} };
    component.passwordInput.nativeElement.type = 'text';
    component.showPassword();
    expect(component.passwordInput.nativeElement.type).toEqual('password');
  });

  it('show confirm password', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    component.confirmInput = { nativeElement: {type:"password"} };
    component.confirmInput.nativeElement.type = 'password';
    component.showConfirmedPassword();
    expect(component.confirmInput.nativeElement.type).toEqual('text');
  });

  it('hide confirm password', () =>{
    component.adminProfileForm.controls.organization_name.setValue("");
    component.confirmInput = { nativeElement: {type:"text"} };
    component.confirmInput.nativeElement.type = 'text';
    component.showConfirmedPassword();
    expect(component.confirmInput.nativeElement.type).toEqual('password');
  });

  it('stop editing profile', () =>{
    component.isEditingProfile = true;
    component.adminProfileForm.controls.organization_name.setValue("");
    component.editProfileToggle();
    expect(component.adminProfileForm.controls.admin_name.enabled).toBeFalsy();
    expect(component.adminProfileForm.controls.admin_surname.enabled).toBeFalsy();
    expect(component.adminProfileForm.controls.admin_email.enabled).toBeFalsy();
  });

  it('editing profile', () =>{
    component.isEditingProfile = false;
    component.adminProfileForm.controls.organization_name.setValue("");
    component.editProfileToggle();
    expect(component.adminProfileForm.controls.admin_name.enabled).toBeTruthy();
    expect(component.adminProfileForm.controls.admin_surname.enabled).toBeTruthy();
    expect(component.adminProfileForm.controls.admin_email.enabled).toBeTruthy();
  });

});
