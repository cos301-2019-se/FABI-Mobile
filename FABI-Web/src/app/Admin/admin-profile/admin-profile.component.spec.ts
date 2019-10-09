import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { AdminProfileComponent } from './admin-profile.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('AdminProfileComponent', () => {
  let component: AdminProfileComponent;
  let fixture: ComponentFixture<AdminProfileComponent>;
  let UserManagementService: UserManagementAPIService;
  let authService : AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule, 
        MaterialModule, 
        RouterTestingModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule, 
        MatDialogModule
      ],
      declarations: [ AdminProfileComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProfileComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.adminProfileForm.controls.admin_name.setValue("");
    component.adminProfileForm.controls.admin_surname.setValue("");
    component.adminProfileForm.controls.admin_email.setValue("");
    component.adminProfileForm.controls.admin_type.setValue("");

    expect(component.adminProfileForm.valid).toBeFalsy();
  });

  it("Empty admin surname expect admin surname invalid", () => {
    component.adminProfileForm.controls.admin_name.setValue("Tester");
    component.adminProfileForm.controls.admin_surname.setValue("");
    component.adminProfileForm.controls.admin_email.setValue("");
    component.adminProfileForm.controls.admin_type.setValue("");

    expect(component.adminProfileForm.controls.admin_surname.valid).toBeFalsy();
  });

  it("Empty admin email expect admin email invalid", () => {
    component.adminProfileForm.controls.admin_name.setValue("TesterFName");
    component.adminProfileForm.controls.admin_surname.setValue("TesterLName");
    component.adminProfileForm.controls.admin_email.setValue("");
    component.adminProfileForm.controls.admin_type.setValue("");

    expect(component.adminProfileForm.controls.admin_email.valid).toBeFalsy();
  });

  it("Empty admin type expect admin type invalid", () => {
    component.adminProfileForm.controls.admin_name.setValue("TesterFName");
    component.adminProfileForm.controls.admin_surname.setValue("TesterLName");
    component.adminProfileForm.controls.admin_email.setValue("tester@gmail.com");
    component.adminProfileForm.controls.admin_type.setValue("");

    expect(component.adminProfileForm.controls.admin_type.valid).toBeFalsy();
  });

  it("Valid form expect true", () => {
    component.adminProfileForm.controls.admin_name.setValue("TesterFName");
    component.adminProfileForm.controls.admin_surname.setValue("TesterLName");
    component.adminProfileForm.controls.admin_email.setValue("tester@gmail.com");
    component.adminProfileForm.controls.admin_type.setValue("super");

    expect(component.adminProfileForm.valid).toBeTruthy();
  });

  it('toggle profile tab', () =>{
    let x = component.profileTab;
    component.toggleProfileTab();
    expect(component.profileTab == !x).toBeTruthy();
  });

  it('load Admin Profile Details', () =>{
    let spy = spyOn(UserManagementService, 'getUserDetails');
    component.loadAdminProfileDetails();
    expect(spy).toBeTruthy();
  });

  it('save changes', () =>{
    let spy = spyOn(UserManagementService, 'updateFABIMemberDetails');
    component.saveChanges();
    expect(component.submitted).toBeTruthy();
    expect(spy).toBeTruthy();
  });

  it('change password', () =>{
    let spy = spyOn(UserManagementService, 'updateStaffPassword');
    component.changePassword();
    expect(component.submitted).toBeTruthy();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});
