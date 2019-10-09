import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffViewDatabasesComponent } from './staff-view-databases.component';
import { StaffNotificationComponent } from '../staff-notification/staff-notification.component'
import { StaffProfileComponent } from '../staff-profile/staff-profile.component'
import { StaffHelpComponent } from '../staff-help/staff-help.component'
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/_services/authentication.service'
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

describe('StaffViewDatabasesComponent', () => {
  let component: StaffViewDatabasesComponent;
  let fixture: ComponentFixture<StaffViewDatabasesComponent>;
  let authService: AuthenticationService;
  
  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffViewDatabasesComponent,
        StaffNotificationComponent,
        StaffProfileComponent,
        StaffHelpComponent,
        FilterPipe
      ],
      imports: [MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewDatabasesComponent);
    component = fixture.componentInstance;
    authService = new AuthenticationService(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('reset Database Fields', () => {
    component.resetDatabaseFields();
    expect(component.fields).toEqual([]);
    expect(component.databaseData).toEqual([]);
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

  it('logging out', () =>{
    let spy = spyOn(authService, 'logoutUser');
    component.logout();
    expect(spy).toBeTruthy();
  });

});
