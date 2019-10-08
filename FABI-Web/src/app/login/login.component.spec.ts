import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { LoadingComponent } from '../_loading/loading.component';

import { AuthenticationService } from '../_services/authentication.service';
import { UserManagementAPIService } from '../_services/user-management-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;

  let UserManagementService: UserManagementAPIService;
  let authService: AuthenticationService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NoopAnimationsModule,
        BrowserAnimationsModule,
        ToastContainerModule,
        ToastrModule,
        ToastrComponentlessModule,
        ToastrModule.forRoot()
      ],
      declarations: [
        LoginComponent,
        LoadingComponent
      ],
      providers: [
        { provide: ToastContainerModule, useValue: {} },
        { provide: ToastrModule, useValue: {} },
        ToastrService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);

  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(AuthenticationService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.loginForm).toBeDefined();
    expect(component.loginForm.invalid).toBeTruthy();
    expect(component.submitted).toBeFalsy();
    expect(component.valid).toBeFalsy();
    expect(component.loggedIn).toBeFalsy();
    expect(component.loading).toBeFalsy();
  });

  // -------- Form Controls Tests --------
  it('Empty login email expect invalid', () => {
    component.loginForm.controls.email.setValue('');
    expect(component.loginForm.controls.email.valid).toBeFalsy();
  });

  it('Empty login password expect invalid', () => {
    component.loginForm.controls.password.setValue('');
    expect(component.loginForm.controls.password.valid).toBeFalsy();
  });

  it('Empty login organization expect invalid', () => {
    component.loginForm.controls.organization.setValue('');
    expect(component.loginForm.controls.organization.valid).toBeFalsy();
  });

  it('Empty login user type expect invalid', () => {
    expect(component.loginForm.controls.userType).toBeUndefined();
  });

  it('Login with all empty details expect fail', () => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');
    component.loginForm.controls.organization.setValue('');
    expect(component.loginForm.valid).toBeFalsy();

    expect(component.login()).toBeUndefined();
  });

  it('Login with valid details expect pass', () => {
    component.loginForm.controls.email.setValue('johndoe@gmail.com');
    component.loginForm.controls.password.setValue('Tr7hs8BjuX');
    component.loginForm.controls.organization.setValue('FABI');
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).not.toBeNull();
  });

  it('Login with invalid email expect fail', () => {
    component.loginForm.controls.email.setValue('invalidemail@gmail.com');
    component.loginForm.controls.password.setValue('Tr7hs8BjuX');
    component.loginForm.controls.organization.setValue('FABI');
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });

  it('Login with invalid password expect fail', () => {
    component.loginForm.controls.email.setValue('johndoe@gmail.com');
    component.loginForm.controls.password.setValue('thewrongpassword');
    component.loginForm.controls.organization.setValue('FABI');
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });

  it('Login with invalid organization expect fail', () => {
    component.loginForm.controls.email.setValue('johndoe@gmail.com');
    component.loginForm.controls.password.setValue('Tr7hs8BjuX');
    component.loginForm.controls.organization.setValue('notFABI');
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });

  // -------- Service Tests --------
  it('get list of Organizations for login dropdown', () =>{
    let spy = spyOn(UserManagementService, 'getAllOrganizations');
    component.ngOnInit();
    expect(spy).toBeTruthy();
  });

  it('call login service', () =>{
    let spy = spyOn(authService, 'login');
    component.login();
    expect(spy).toBeTruthy();
  });

});