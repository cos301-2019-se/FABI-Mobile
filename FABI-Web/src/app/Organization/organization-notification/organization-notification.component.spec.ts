import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationNotificationComponent } from './organization-notification.component';
import { MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';

describe('OrganizationNotificationComponent', () => {
  let component: OrganizationNotificationComponent;
  let fixture: ComponentFixture<OrganizationNotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        OrganizationNotificationComponent 
      ],
      imports: [
        MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
