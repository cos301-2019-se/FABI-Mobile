import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCbsRequestComponent } from './submit-cbs-request.component';

describe('SubmitCbsRequestComponent', () => {
  let component: SubmitCbsRequestComponent;
  let fixture: ComponentFixture<SubmitCbsRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCbsRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCbsRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
