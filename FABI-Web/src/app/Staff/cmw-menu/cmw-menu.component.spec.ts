import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CmwMenuComponent } from './cmw-menu.component';
import { SubmitCmwRequestComponent } from '../submit-cmw-request/submit-cmw-request.component'
import { SubmitCmwDepositComponent } from '../submit-cmw-deposit/submit-cmw-deposit.component'
import { SubmitCmwRevitalizationComponent } from '../submit-cmw-revitalization/submit-cmw-revitalization.component'
import { StaffNotificationComponent } from '../staff-notification/staff-notification.component'
import { StaffProfileComponent } from '../staff-profile/staff-profile.component'
import { StaffHelpComponent } from '../staff-help/staff-help.component'

//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';
import { ToastContainerModule, ToastrModule, ToastrComponentlessModule, ToastrService } from 'ngx-toastr';
//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../../_services/notification.service';
//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { FilterPipe } from '../../_pipes/filter.pipe'
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('CmwMenuComponent', () => {
  let component: CmwMenuComponent;
  let fixture: ComponentFixture<CmwMenuComponent>;
  let authService: AuthenticationService;
  
  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        CmwMenuComponent,
        SubmitCmwRequestComponent,
        SubmitCmwDepositComponent,
        SubmitCmwRevitalizationComponent,
        StaffNotificationComponent,
        StaffProfileComponent,
        StaffHelpComponent,
        FilterPipe
      ],
      imports: [ ReactiveFormsModule, ToastContainerModule, ToastrModule.forRoot(), ToastrComponentlessModule, MaterialModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        NotificationService,
        ToastrService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmwMenuComponent);
    component = fixture.componentInstance;
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // -------- Function Tests --------
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

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});
