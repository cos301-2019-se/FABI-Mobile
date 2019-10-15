import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormsComponent } from './view-forms.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';

import { RouterTestingModule } from '@angular/router/testing';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { MaterialModule } from '../../materials';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DebugElement } from '@angular/core';

import { NotificationService } from '../../_services/notification.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';

import { FilterPipe } from '../../_pipes/filter.pipe';
describe('ViewFormsComponent', () => {
  let component: ViewFormsComponent;
  let fixture: ComponentFixture<ViewFormsComponent>;
  let UserManagementService: UserManagementAPIService;
  let NotificationLogService: NotificationLoggingService;
  let CCservice: CultureCollectionAPIService;
  let authService: AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, 
        MaterialModule, 
        RouterTestingModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
      ],
      declarations: [ ViewFormsComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent
      ],
      providers:[
        NotificationService,
        ToastrService,
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormsComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    NotificationLogService = new NotificationLoggingService(null, null);
    CCservice = new CultureCollectionAPIService(null, null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();
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
    expect(CCservice).toBeTruthy();
  });

  it('should be defined', () => {
    expect(NotificationLoggingService).toBeTruthy();
  });

  // -------- Initial State Tests --------
  it('Component initial state', () => {
    expect(component.notificationsTab).toBeFalsy();
    expect(component.profileTab).toBeFalsy();
    expect(component.saveBtn).toBeFalsy();
    expect(component.confirmPasswordInput).toBeFalsy();
    expect(component.helpTab).toBeFalsy();

    expect(component.depositFormTab).toBeFalsy();
    expect(component.requestFormTab).toBeFalsy();
    expect(component.revitalizationFormTab).toBeFalsy();
    expect(component.processedFormTab).toBeFalsy();
    expect(component.associatedFormTab).toBeFalsy();

    expect(component.downloadDeposit).toBeTruthy();
    expect(component.downloadRequest).toBeTruthy();
    expect(component.downloadRevitalization).toBeTruthy();
    expect(component.downloadProcessed).toBeTruthy();

    expect(component.processForm).toBeDefined();
    expect(component.processForm.invalid).toBeTruthy();
  });

  // -------- Form Controls Tests --------
  it('Empty culture status expect invalid', () => {
    component.processForm.controls.statusOfCulture.setValue('');
    expect(component.processForm.controls.statusOfCulture.valid).toBeFalsy();
  });

  it('Empty agar slants expect invalid', () => {
    component.processForm.controls.agarSlants.setValue('');
    expect(component.processForm.controls.agarSlants.valid).toBeFalsy();
  });

  it('Empty water expect invalid', () => {
    component.processForm.controls.water.setValue('');
    expect(component.processForm.controls.water.valid).toBeFalsy();
  });

  it('Empty oil expect invalid', () => {
    component.processForm.controls.oil.setValue('');
    expect(component.processForm.controls.oil.valid).toBeFalsy();
  });

  it('Empty room temperature expect invalid', () => {
    component.processForm.controls.roomTemperature.setValue('');
    expect(component.processForm.controls.roomTemperature.valid).toBeFalsy();
  });

  it('Empty c18 expect invalid', () => {
    component.processForm.controls.c18.setValue('');
    expect(component.processForm.controls.c18.valid).toBeFalsy();
  });

  it('Empty freeze dried expect invalid', () => {
    component.processForm.controls.freezeDried.setValue('');
    expect(component.processForm.controls.freezeDried.valid).toBeFalsy();
  });

  it('Empty freeze expect invalid', () => {
    component.processForm.controls.freeze.setValue('');
    expect(component.processForm.controls.freeze.valid).toBeFalsy();
  });

  it('Empty collection date expect invalid', () => {
    component.processForm.controls.dateOfCollectionValidation.setValue('');
    expect(component.processForm.controls.dateOfCollectionValidation.valid).toBeFalsy();
  });

  it('Empty microscope slides expect invalid', () => {
    component.processForm.controls.microscopeSlides.setValue('');
    expect(component.processForm.controls.microscopeSlides.valid).toBeFalsy();
  });

   // -------- Function Tests --------
  it('load user details', () => {
    expect(component.loadUserDetails("")).toEqual('');
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

  it('toggleDepositFormsTab', () => {
    component.toggleDepositFormsTab();
    expect(component.depositFormTab).toBeTruthy();
    expect(component.requestFormTab).toBeFalsy();
    expect(component.revitalizationFormTab).toBeFalsy();
    expect(component.processedFormTab).toBeFalsy();
  });

  it('toggleRequestFormsTab', () => {
    component.toggleRequestFormsTab();
    expect(component.depositFormTab).toBeFalsy();
    expect(component.requestFormTab).toBeTruthy();
    expect(component.revitalizationFormTab).toBeFalsy();
    expect(component.processedFormTab).toBeFalsy();
  });

  it('toggleRevitalizationFormsTab', () => {
    component.toggleRevitalizationFormsTab();
    expect(component.depositFormTab).toBeFalsy();
    expect(component.requestFormTab).toBeFalsy();
    expect(component.revitalizationFormTab).toBeTruthy();
    expect(component.processedFormTab).toBeFalsy();
  });

  it('toggleProcessedFormsTab', () => {
    component.toggleProcessedFormsTab();
    expect(component.depositFormTab).toBeFalsy();
    expect(component.requestFormTab).toBeFalsy();
    expect(component.revitalizationFormTab).toBeFalsy();
    expect(component.processedFormTab).toBeTruthy();
  });

   // -------- Service Tests --------
  it('get All staff', () =>{
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getAllStaff();
    expect(spy).toBeTruthy();
  });

  it('get Deposit Forms', () =>{
    let spy = spyOn(CCservice, 'getAllDepositLogs');
    component.getAllDepositForms();
    expect(spy).toBeTruthy();
  });

  it('delete Deposit Forms', () =>{
    let spy = spyOn(CCservice, 'deleteDepositForm');
    component.deleteDepositForm();
    expect(spy).toBeTruthy();
  });

  it('get Request Forms', () =>{
    let spy = spyOn(CCservice, 'getAllRequestLogs');
    component.getAllRequestForms();
    expect(spy).toBeTruthy();
  });

  it('delete Request Forms', () =>{
    let spy = spyOn(CCservice, 'deleteRequestForm');
    component.deleteRequestForm();
    expect(spy).toBeTruthy();
  });

  it('get Revitalization Forms', () =>{
    let spy = spyOn(CCservice, 'getAllRequestLogs');
    component.getAllRevitalizationForms();
    expect(spy).toBeTruthy();
  });

  it('delete Revitalization Forms', () =>{
    let spy = spyOn(CCservice, 'deleteRevitalizationForm');
    component.deleteRevitalizationForm();
    expect(spy).toBeTruthy();
  });

  it('get All Proccessed Forms', () =>{
    let spy = spyOn(CCservice, 'getAllProcessedLogs');
    component.getAllProcessedForms();
    expect(spy).toBeTruthy();
  });

  it('delete Proccessed Forms', () =>{
    let spy = spyOn(CCservice, 'deleteProcessedForm');
    component.deleteProcessedForm();
    expect(spy).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});
