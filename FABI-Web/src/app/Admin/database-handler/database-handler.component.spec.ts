import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseHandlerComponent } from './database-handler.component';
import { AdminNotificationComponent } from '../admin-notification/admin-notification.component'
import { AdminProfileComponent } from '../admin-profile/admin-profile.component'
import { AdminHelpComponent } from '../admin-help/admin-help.component'

import {MaterialModule} from '../../materials';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';

//Router
import { RouterTestingModule } from '@angular/router/testing';
<<<<<<< HEAD

=======
import { FilterPipe } from '../../_pipes/filter.pipe';
>>>>>>> develop

describe('DatabaseHandlerComponent', () => {
  let component: DatabaseHandlerComponent;
  let fixture: ComponentFixture<DatabaseHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatabaseHandlerComponent,
        AdminNotificationComponent,
        AdminProfileComponent,
        AdminHelpComponent,
        FilterPipe
      ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
