import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwDepositComponent } from './submit-cmw-deposit.component';

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


describe('SubmitCmwDepositComponent', () => {
  let component: SubmitCmwDepositComponent;
  let fixture: ComponentFixture<SubmitCmwDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwDepositComponent ],
      imports: [MaterialModule, NoopAnimationsModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCmwDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
