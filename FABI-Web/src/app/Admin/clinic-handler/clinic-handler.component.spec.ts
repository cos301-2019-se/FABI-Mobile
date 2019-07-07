import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHandlerComponent } from './clinic-handler.component';
import { MaterialModule} from '../../materials';

//Router
import { RouterTestingModule } from '@angular/router/testing';


//Http Testing
import { HttpClientTestingModule } from '@angular/common/http/testing';


import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ClinicHandlerComponent', () => {
  let component: ClinicHandlerComponent;
  let fixture: ComponentFixture<ClinicHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicHandlerComponent ],
      imports: [MaterialModule,
        NoopAnimationsModule, HttpClientTestingModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
