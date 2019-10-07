import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';
//Import form components
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
//Import the materials component
import { MaterialModule } from '../materials';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule } from 'ngx-toastr';
import { Toast, ToastrService, ToastPackage } from 'ngx-toastr';

describe('LoginComponent', () => {

    let component : LoginComponent;
    let fixture : ComponentFixture<LoginComponent>;
    let de : DebugElement;

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
            LoginComponent 
        ],
        providers :[
          { provide: ToastContainerModule, useValue: {} },
          { provide: ToastrModule, useValue: {} },
          ToastrService
        ]
    }).compileComponents();
  }));

  beforeEach(() =>{
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it("Should create component", () => {
        expect(component).toBeTruthy();
  });

  it("Empty login email is invalid", () => {
    component.loginForm.controls.login_email.setValue("");
    expect(component.loginForm.controls.login_email.valid).toBeFalsy();
  });

  it("Empty login password is invalid", () => {
    component.loginForm.controls.login_password.setValue("");
    expect(component.loginForm.controls.login_password.valid).toBeFalsy();
  });

  it("Empty login organization is invalid", () => {
    component.loginForm.controls.organization.setValue("");
    expect(component.loginForm.controls.organization.valid).toBeFalsy();
  });

  it("Empty login user type is invalid", () => {
    component.loginForm.controls.userType.setValue("");
    expect(component.loginForm.controls.userType.valid).toBeFalsy();
  });

  it("Login with all empty details should fail", () => {
        component.loginForm.controls.login_email.setValue("");
        component.loginForm.controls.login_password.setValue("");
        component.loginForm.controls.organization.setValue("");
        component.loginForm.controls.userType.setValue("");
        expect(component.loginForm.valid).toBeFalsy();
        
        expect(component.login()).toBeUndefined();
  });

  it("Login with valid details should pass", () =>{
    component.loginForm.controls.login_email.setValue("johndoe@gmail.com");
    component.loginForm.controls.login_password.setValue("Tr7hs8BjuX");
    component.loginForm.controls.organization.setValue("FABI");
    component.loginForm.controls.userType.setValue("Admin");
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).not.toBeNull();
  });

  it("Login with invalid email should fail", () =>{
    component.loginForm.controls.login_email.setValue("invalidemail@gmail.com");
    component.loginForm.controls.login_password.setValue("Tr7hs8BjuX");
    component.loginForm.controls.organization.setValue("FABI");
    component.loginForm.controls.userType.setValue("Admin");
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });

  it("Login with invalid password should fail", () =>{
    component.loginForm.controls.login_email.setValue("johndoe@gmail.com");
    component.loginForm.controls.login_password.setValue("thewrongpassword");
    component.loginForm.controls.organization.setValue("FABI");
    component.loginForm.controls.userType.setValue("Admin");
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });


  it("Login with invalid organization should fail", () =>{
    component.loginForm.controls.login_email.setValue("johndoe@gmail.com");
    component.loginForm.controls.login_password.setValue("Tr7hs8BjuX");
    component.loginForm.controls.organization.setValue("notFABI");
    component.loginForm.controls.userType.setValue("Admin");
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });

  it("Login with invalid user type should fail", () =>{
    component.loginForm.controls.login_email.setValue("johndoe@gmail.com");
    component.loginForm.controls.login_password.setValue("Tr7hs8BjuX");
    component.loginForm.controls.organization.setValue("FABI");
    component.loginForm.controls.userType.setValue("Hokage");
    expect(component.loginForm.valid).toBeTruthy();

    expect(component.login()).toBeUndefined();
  });

});
