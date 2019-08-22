import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberDashboardComponent } from './member-dashboard.component';
import { MemberViewSamplesComponent } from '../member-view-samples/member-view-samples.component'
import { MemberNotificationComponent } from '../member-notification/member-notification.component'
import { MemberProfileComponent } from '../member-profile/member-profile.component'
import { MemberHelpComponent } from '../member-help/member-help.component'

import { MaterialModule } from '../../materials';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';
//Router
import { RouterTestingModule } from '@angular/router/testing';

//Import form components
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/_services/authentication.service'
import {MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material';
import { MatSnackBar, MatSnackBarModule } from '@angular/material';

describe('MemberDashboardComponent', () => {
  let component: MemberDashboardComponent;
  let fixture: ComponentFixture<MemberDashboardComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberDashboardComponent,
        MemberViewSamplesComponent,
        MemberNotificationComponent,
        MemberProfileComponent,
        MemberHelpComponent,
        FilterPipe
      ],
      imports: [ MatSnackBarModule, FormsModule, MatFormFieldModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, MatDialogModule],
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
    fixture = TestBed.createComponent(MemberDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
