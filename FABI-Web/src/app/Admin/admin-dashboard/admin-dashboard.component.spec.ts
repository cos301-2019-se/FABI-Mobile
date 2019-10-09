import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component';
import { AdminProfileComponent } from '../admin-profile/admin-profile.component';
import { AdminHelpComponent } from '../admin-help/admin-help.component';
import { MaterialModule} from '../../materials';
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { DiagnosticClinicAPIService } from '../../_services/diagnostic-clinic-api.service';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('AdminDashboardComponent', () => {
  let component: AdminDashboardComponent;
  let fixture: ComponentFixture<AdminDashboardComponent>;
  let UserManagementService: UserManagementAPIService;
  let DiagnosticClinicService : DiagnosticClinicAPIService;
  let authService : AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
            AdminDashboardComponent,
            AdminNotificationComponent,
            AdminHelpComponent,
            AdminProfileComponent,
            FilterPipe
        ],
      imports: [
            MaterialModule,
            ReactiveFormsModule,
            HttpClientTestingModule,
            NoopAnimationsModule,
            RouterTestingModule
        ],
        providers: [
            { provide: AuthenticationService, useClass: MockAuthenticationService }
          ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
    UserManagementService = new UserManagementAPIService( null , null);
    DiagnosticClinicService = new DiagnosticClinicAPIService(null, null);
    authService = new AuthenticationService(null);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get Number Of Fabi Members', () =>{
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getNumberOfFABIMembers();
    expect(spy).toBeTruthy();
  });

  it('get Number Of FABI Samples', () =>{
    let spy = spyOn(DiagnosticClinicService, 'getAllSamples');
    component.getNumberOfFABIMembers();
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

});
