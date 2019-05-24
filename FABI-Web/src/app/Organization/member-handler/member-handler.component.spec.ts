import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHandlerComponent } from './member-handler.component';

//Import the materials component
import { MaterialModule } from '../../materials';

//Animation Testing
import { NoopAnimationsModule, BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('MemberHandlerComponent', () => {
  let component: MemberHandlerComponent;
  let fixture: ComponentFixture<MemberHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHandlerComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule,
        BrowserAnimationsModule ]
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
