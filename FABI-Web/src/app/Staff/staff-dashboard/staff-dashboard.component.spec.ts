import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { StaffDashboardComponent } from './staff-dashboard.component';
import { SampleFormComponent } from '../../sample-form/sample-form.component';
import { StaffNotificationComponent } from '../staff-notification/staff-notification.component'
import { StaffProfileComponent } from '../staff-profile/staff-profile.component'
import { StaffHelpComponent } from '../staff-help/staff-help.component'
import { StaffViewSamplesComponent } from '../staff-view-samples/staff-view-samples.component';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationService } from 'src/app/_services/authentication.service';

import { FilterPipe } from '../../_pipes/filter.pipe';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StaffDashboardComponent, 
        SampleFormComponent,
        StaffNotificationComponent,
        StaffProfileComponent,
        StaffHelpComponent,
        StaffViewSamplesComponent,
        FilterPipe
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, NoopAnimationsModule, BrowserAnimationsModule, HttpClientTestingModule],
      providers: [ { provide: AuthenticationService, useClass: MockAuthenticationService } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
