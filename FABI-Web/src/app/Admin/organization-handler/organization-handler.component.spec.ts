import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationHandlerComponent } from './organization-handler.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

import { MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FilterPipe } from '../../_pipes/filter.pipe';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';



//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';


describe('OrganizationHandlerComponent', () => {
  let component: OrganizationHandlerComponent;
  let fixture: ComponentFixture<OrganizationHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganizationHandlerComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
