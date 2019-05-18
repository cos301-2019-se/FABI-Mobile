import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwRequestComponent } from './submit-cmw-request.component';

describe('SubmitCmwRequestComponent', () => {
  let component: SubmitCmwRequestComponent;
  let fixture: ComponentFixture<SubmitCmwRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCmwRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
