import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHandlerComponent } from './clinic-handler.component';
import { MaterialModule} from '../../materials';
import { ClinicAdminViewSamplesComponent } from '../clinic-admin-view-samples/clinic-admin-view-samples.component'
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'
import { PipesFiltersModule } from 'ng-pipe-filter'

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service'
import { UserManagementAPIService } from '../../_services/user-management-api.service';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';

describe('ClinicHandlerComponent', () => {
  let component: ClinicHandlerComponent;
  let fixture: ComponentFixture<ClinicHandlerComponent>;
  let UserManagementService: UserManagementAPIService;
  let authService : AuthenticationService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        ClinicHandlerComponent,
        ClinicAdminViewSamplesComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule, 
        HttpClientTestingModule, 
        RouterTestingModule,
        PipesFiltersModule
      ],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicHandlerComponent);
    component = fixture.componentInstance;
    UserManagementService = new UserManagementAPIService( null , null);
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get DB Names', () =>{
    let spy = spyOn(UserManagementService, 'getDatabaseNames');
    component.getDBNames();
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

  it('displayProfileSaveBtn', () => {
    component.displayProfileSaveBtn();
    expect(component.saveBtn).toBeTruthy();
  });

  it('displayConfirmPasswordInput', () => {
    component.displayConfirmPasswordInput();
    expect(component.confirmPasswordInput).toBeTruthy();
  });

  it('toggle help tab', () =>{
    let x = component.helpTab;
    component.toggleHelpTab();
    expect(component.helpTab == !x).toBeTruthy();
  });

  it('reset staff fields', () =>{
    let x = component.helpTab;
    component.resetStaffFields();
    expect(component.helpTab == !x).toBeTruthy();
  });

});
