import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'jasmine';

import { StaffProfileComponent } from './staff-profile.component';
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

describe('StaffProfileComponent', () => {
  let component: StaffProfileComponent;
  let fixture: ComponentFixture<StaffProfileComponent>;
  let UserManagementService: UserManagementAPIService;
  let authService: AuthenticationService;


  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffProfileComponent ],
      imports: [ReactiveFormsModule, MaterialModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffProfileComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Empty form expect invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("");
    component.staffProfileForm.controls.staff_surname.setValue("");
    component.staffProfileForm.controls.staff_email.setValue("");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.valid).toBeTruthy();
  });

  it("Empty staff surname expect staffsurname name invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("Test");
    component.staffProfileForm.controls.staff_surname.setValue("");
    component.staffProfileForm.controls.staff_email.setValue("");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.controls.staff_surname.valid).toBeFalsy();
  });

  it("Empty staff email expect staff email invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("Test");
    component.staffProfileForm.controls.staff_surname.setValue("TesterFName");
    component.staffProfileForm.controls.staff_email.setValue("");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.controls.staff_email.valid).toBeFalsy();
  });

  it("Empty staff type expect staff type invalid", () => {
    component.staffProfileForm.controls.staff_name.setValue("Test");
    component.staffProfileForm.controls.staff_surname.setValue("TesterFName");
    component.staffProfileForm.controls.staff_email.setValue("TesterLName");
    component.staffProfileForm.controls.staff_type.setValue("");

    expect(component.staffProfileForm.controls.staff_type.valid).toBeFalsy();
  });

  it("Valid form expect true", () => {
    component.staffProfileForm.controls.staff_name.setValue("TesterFName");
    component.staffProfileForm.controls.staff_surname.setValue("TesterLName");
    component.staffProfileForm.controls.staff_email.setValue("tester@gmail.com");
    component.staffProfileForm.controls.staff_type.setValue("super");

    expect(component.staffProfileForm.valid).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('load Staff Profile Details', () =>{
    let spy = spyOn(UserManagementService, 'getUserDetails');
    component.loadStaffProfileDetails();
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
  });

  it('show password', () =>{
    component.passwordInput = { nativeElement: {type:"password"} };
    component.passwordInput.nativeElement.type = 'password';
    component.showPassword();
    expect(component.passwordInput.nativeElement.type).toEqual('text');
  });

  it('hide password', () =>{
    component.passwordInput = { nativeElement: {type:"text"} };
    component.passwordInput.nativeElement.type = 'text';
    component.showPassword();
    expect(component.passwordInput.nativeElement.type).toEqual('password');
  });

  it('show confirm password', () =>{
    component.confirmInput = { nativeElement: {type:"password"} };
    component.confirmInput.nativeElement.type = 'password';
    component.showConfirmedPassword();
    expect(component.confirmInput.nativeElement.type).toEqual('text');
  });

  it('hide confirm password', () =>{
    component.confirmInput = { nativeElement: {type:"text"} };
    component.confirmInput.nativeElement.type = 'text';
    component.showConfirmedPassword();
    expect(component.confirmInput.nativeElement.type).toEqual('password');
  });

  it('stop editing profile', () =>{
    component.isEditingProfile = true;
    component.editProfileToggle();
    expect(component.staffProfileForm.controls.staff_name.enabled).toBeFalsy();
    expect(component.staffProfileForm.controls.staff_surname.enabled).toBeFalsy();
    expect(component.staffProfileForm.controls.staff_email.enabled).toBeFalsy();
  });

  it('editing profile', () =>{
    component.isEditingProfile = false;
    component.editProfileToggle();
    expect(component.staffProfileForm.controls.staff_name.enabled).toBeTruthy();
    expect(component.staffProfileForm.controls.staff_surname.enabled).toBeTruthy();
    expect(component.staffProfileForm.controls.staff_email.enabled).toBeTruthy();
  });

});
