import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationDashboardComponent } from './organization-dashboard.component';
import { MaterialModule } from '../../materials';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { OrganizationNotificationComponent } from '../organization-notification/organization-notification.component'
import { OrganizationProfileComponent } from '../organization-profile/organization-profile.component'
import { OrganizationHelpComponent } from '../organization-help/organization-help.component'
import { OrganizationViewSamplesComponent } from '../organization-view-samples/organization-view-samples.component'
//Router
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service'
//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';
import { FilterPipe } from '../../_pipes/filter.pipe';

describe('OrganizationDashboardComponent', () => {
  let component: OrganizationDashboardComponent;
  let fixture: ComponentFixture<OrganizationDashboardComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OrganizationDashboardComponent,
        OrganizationNotificationComponent,
        OrganizationProfileComponent,
        OrganizationHelpComponent,
        OrganizationViewSamplesComponent,
        FilterPipe,
      ],
      imports: [MaterialModule, MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, MatDialogModule],
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
    fixture = TestBed.createComponent(OrganizationDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
