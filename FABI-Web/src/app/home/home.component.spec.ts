
import { HomeComponent } from './home.component';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserManagementAPIService } from '../_services/user-management-api.service';
import { CookieService } from 'ngx-cookie-service';

import { RouterTestingModule } from '@angular/router/testing';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
import { MaterialModule } from '../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../_services/notification.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let UserManagementService: UserManagementAPIService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
        providers: [ CookieService, ToastrService, NotificationService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    UserManagementService = new UserManagementAPIService( null , null);
  });

  // -------- Component Creation Tests - Boilerplate Test Case --------
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Service Creation Tests --------
  it('should be defined', () => {
    expect(UserManagementAPIService).toBeTruthy();
  });

  it('should be defined', () => {
    expect(CookieService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.submitted).toBeFalsy();
    expect(component.contact_form).toBeDefined();
    expect(component.request_register_org).toBeDefined();
    expect(component.contact_form.invalid).toBeTruthy();
    expect(component.request_register_org.invalid).toBeTruthy();
    expect(component.submitted).toBeFalsy();
    expect(component.valid).toBeFalsy();
  });

  // -------- Form Controls Tests --------

  // Contact Form
  it('Empty name expect name invalid', () => {
    component.contact_form.controls.name.setValue('');
    expect(component.contact_form.controls.name.valid).toBeFalsy();
  });

  it('Empty email expect email invalid', () => {
    component.contact_form.controls.email.setValue('');
    expect(component.contact_form.controls.email.valid).toBeFalsy();
  });

  it('Empty message expect message invalid', () => {
    component.contact_form.controls.message.setValue('');
    expect(component.contact_form.controls.message.valid).toBeFalsy();
  });

  it('Empty form expect invalid', () => {
    component.contact_form.controls.name.setValue('');
    component.contact_form.controls.email.setValue('');
    component.contact_form.controls.message.setValue('');

    expect(component.contact_form.valid).toBeFalsy();
  });

  it('Valid form expect true', () => {
    component.contact_form.controls.name.setValue('Tester');
    component.contact_form.controls.email.setValue('tester@gmail.com');
    component.contact_form.controls.message.setValue('xxxxxxxxxxxxxxx');

    expect(component.contact_form.valid).toBeTruthy();
  });

  // Request to Register Form
  it('Empty organization name expect organization name invalid', () => {
    component.request_register_org.controls.organization_name.setValue('');
    expect(component.request_register_org.controls.organization_name.valid).toBeFalsy();
  });

  it('Empty admin name expect admin name invalid', () => {
    component.request_register_org.controls.admin_name.setValue('');
    expect(component.request_register_org.controls.admin_name.valid).toBeFalsy();
  });

  it('Empty admin surname expect email admin surname invalid', () => {
    component.request_register_org.controls.admin_surname.setValue('');
    expect(component.request_register_org.controls.admin_surname.valid).toBeFalsy();
  });

  it('Empty admin email expect email admin email invalid', () => {
    component.request_register_org.controls.admin_email.setValue('');
    expect(component.request_register_org.controls.admin_email.valid).toBeFalsy();
  });

  it('Empty admin phone expect email admin phone invalid', () => {
    component.request_register_org.controls.admin_phone.setValue('');
    expect(component.request_register_org.controls.admin_phone.valid).toBeFalsy();
  });

  it('Empty form expect invalid', () => {
    component.request_register_org.controls.organization_name.setValue('');
    component.request_register_org.controls.admin_name.setValue('');
    component.request_register_org.controls.admin_surname.setValue('');
    component.request_register_org.controls.admin_email.setValue('');
    component.request_register_org.controls.admin_phone.setValue('');

    expect(component.request_register_org.valid).toBeFalsy();
  });

  it('Valid request expect true', () => {
    component.request_register_org.controls.organization_name.setValue('TestOrg');
    component.request_register_org.controls.admin_name.setValue('TesterFName');
    component.request_register_org.controls.admin_surname.setValue('TesterLName');
    component.request_register_org.controls.admin_email.setValue('tester@gmail.com');
    component.request_register_org.controls.admin_phone.setValue('0000000000');

    expect(component.request_register_org.valid).toBeTruthy();
  });

  // -------- Service Tests --------
  it('send request to register', () =>{
    let spy = spyOn(UserManagementService, 'sendRequestToRegisterOrganization');
    component.requestToRegister();
    expect(spy).toBeTruthy();
  });

});