import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHandlerComponent } from './member-handler.component';
import { OrganizationNotificationComponent } from '../organization-notification/organization-notification.component'
import { OrganizationProfileComponent } from '../organization-profile/organization-profile.component'
import { OrganizationHelpComponent } from '../organization-help/organization-help.component'

//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Router
import { RouterTestingModule } from '@angular/router/testing';


//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';
<<<<<<< HEAD

=======
import { FilterPipe } from '../../_pipes/filter.pipe';
>>>>>>> develop

describe('MemberHandlerComponent', () => {
  let component: MemberHandlerComponent;
  let fixture: ComponentFixture<MemberHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHandlerComponent,
        OrganizationNotificationComponent,
        OrganizationProfileComponent,
        OrganizationHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        BrowserAnimationsModule, RouterTestingModule, HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
