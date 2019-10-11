import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwDepositComponent } from './submit-cmw-deposit.component';

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';
import { NotificationService } from '../../_services/notification.service';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { CultureCollectionAPIService } from '../../_services/culture-collection-api.service';
import { UserManagementAPIService } from '../../_services/user-management-api.service';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';

describe('SubmitCmwDepositComponent', () => {
  let component: SubmitCmwDepositComponent;
  let fixture: ComponentFixture<SubmitCmwDepositComponent>;
  let authService: AuthenticationService;
  let ccService: CultureCollectionAPIService;
  let UserManagementService: UserManagementAPIService;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwDepositComponent, FilterPipe ],
      imports: [MaterialModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule
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
    fixture = TestBed.createComponent(SubmitCmwDepositComponent);
    component = fixture.componentInstance;
    authService = new AuthenticationService(null);
    ccService = new CultureCollectionAPIService(null, null);
    UserManagementService = new UserManagementAPIService( null , null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

  it('submit CMW Deposit Form', () =>{
    component.cmwDepositForm.controls.date_collected.setValue("2019 10 09");
    let spy = spyOn(ccService, 'submitCMWDepositForm');
    component.submitCMWDepositForm();
    expect(spy).toBeTruthy();
  });

  it('get all staff', () =>{
    let spy = spyOn(UserManagementService, 'getAllFABIStaff');
    component.getAllStaff();
    expect(spy).toBeTruthy();
  });

});
