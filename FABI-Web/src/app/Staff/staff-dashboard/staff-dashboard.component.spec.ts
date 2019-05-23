import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StaffDashboardComponent } from './staff-dashboard.component';
import { SampleFormComponent } from '../../sample-form/sample-form.component';


//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';



describe('StaffDashboardComponent', () => {
  let component: StaffDashboardComponent;
  let fixture: ComponentFixture<StaffDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StaffDashboardComponent, SampleFormComponent ],
      imports: [MaterialModule, NoopAnimationsModule, BrowserAnimationsModule]
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
