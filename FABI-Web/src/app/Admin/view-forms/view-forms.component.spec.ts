import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormsComponent } from './view-forms.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

//Router
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service'
//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { NotificationLoggingService } from '../../_services/notification-logging.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewFormsComponent', () => {
  let component: ViewFormsComponent;
  let fixture: ComponentFixture<ViewFormsComponent>;
  let UserManagementService: UserManagementAPIService;
  let NotificationLogService: NotificationLoggingService;
  let CCservice: CultureCollectionAPIService;
  let authService : AuthenticationService;

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
        BrowserAnimationsModule
      ],
      declarations: [ ViewFormsComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent
      ],
      providers:[
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load user details', () => {
    expect(component.loadUserDetails("")).toEqual('');
  });

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

});
