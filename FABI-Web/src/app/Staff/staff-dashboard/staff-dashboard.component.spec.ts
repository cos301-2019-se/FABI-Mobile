import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { StaffDashboardComponent } from './staff-dashboard.component';
import { SampleFormComponent } from '../../sample-form/sample-form.component';
import { StaffNotificationComponent } from '../staff-notification/staff-notification.component'
import { StaffProfileComponent } from '../staff-profile/staff-profile.component'
import { StaffHelpComponent } from '../staff-help/staff-help.component'
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';

describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        StaffDashboardComponent, 
        SampleFormComponent,
        StaffNotificationComponent,
        StaffProfileComponent,
        StaffHelpComponent
      ],
      imports: [ReactiveFormsModule, RouterTestingModule, MaterialModule, NoopAnimationsModule, BrowserAnimationsModule, HttpClientTestingModule]
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
