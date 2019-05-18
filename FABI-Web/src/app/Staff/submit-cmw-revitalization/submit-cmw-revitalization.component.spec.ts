import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitCmwRevitalizationComponent } from './submit-cmw-revitalization.component';

describe('SubmitCmwRevitalizationComponent', () => {
  let component: SubmitCmwRevitalizationComponent;
  let fixture: ComponentFixture<SubmitCmwRevitalizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitCmwRevitalizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitCmwRevitalizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
