import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCbsDepositComponent } from './submit-cbs-deposit.component';

describe('SubmitCbsDepositComponent', () => {
  let component: SubmitCbsDepositComponent;
  let fixture: ComponentFixture<SubmitCbsDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCbsDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCbsDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
