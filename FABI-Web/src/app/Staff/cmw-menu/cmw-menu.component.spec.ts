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

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import {MatDialogModule} from '@angular/material/dialog';
import { FilterPipe } from '../../_pipes/filter.pipe'
import { AuthenticationService } from 'src/app/_services/authentication.service';

describe('CmwMenuComponent', () => {
  let component: CmwMenuComponent;
  let fixture: ComponentFixture<CmwMenuComponent>;

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
      imports: [ ReactiveFormsModule, MaterialModule, RouterTestingModule, HttpClientTestingModule, NoopAnimationsModule, BrowserAnimationsModule, MatDialogModule],
      providers: [
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
