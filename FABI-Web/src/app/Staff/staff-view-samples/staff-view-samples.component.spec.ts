import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:FABI-Web/src/app/Staff/staff-view-samples/staff-view-samples.component.spec.ts
import { StaffViewSamplesComponent } from './staff-view-samples.component';
=======
import { ReportingComponent } from './reporting.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

import { FilterPipe } from '../../_pipes/filter.pipe';
import { AuthenticationService } from 'src/app/_services/authentication.service'
>>>>>>> unitTesting:FABI-Web/src/app/Admin/reporting/reporting.component.spec.ts

describe('StaffViewSamplesComponent', () => {
  let component: StaffViewSamplesComponent;
  let fixture: ComponentFixture<StaffViewSamplesComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
<<<<<<< HEAD:FABI-Web/src/app/Staff/staff-view-samples/staff-view-samples.component.spec.ts
      declarations: [ StaffViewSamplesComponent ]
=======
      declarations: [ ReportingComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        { provide: MatSnackBar, useValue: {} },
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
>>>>>>> unitTesting:FABI-Web/src/app/Admin/reporting/reporting.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StaffViewSamplesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
