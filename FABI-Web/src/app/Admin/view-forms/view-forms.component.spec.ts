import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFormsComponent } from './view-forms.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

//Router
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from 'src/app/_services/authentication.service'
//Import form components
import { ReactiveFormsModule } from '@angular/forms';

//Import the materials component
import { MaterialModule } from '../../materials';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ViewFormsComponent', () => {
  let component: ViewFormsComponent;
  let fixture: ComponentFixture<ViewFormsComponent>;

  class MockAuthenticationService extends AuthenticationService{
    public get getCurrentSessionValue() {
        return { "user" : "" };
    }
  } 

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, 
        MaterialModule, 
        RouterTestingModule, 
        HttpClientTestingModule, 
        NoopAnimationsModule, 
        BrowserAnimationsModule
      ],
      declarations: [ ViewFormsComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent
      ],
      providers:[
        { provide: AuthenticationService, useClass: MockAuthenticationService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
