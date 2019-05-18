import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwDepositComponent } from './submit-cmw-deposit.component';

describe('SubmitCmwDepositComponent', () => {
  let component: SubmitCmwDepositComponent;
  let fixture: ComponentFixture<SubmitCmwDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwDepositComponent ]
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
