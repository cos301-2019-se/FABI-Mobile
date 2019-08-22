import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreDiagnosisComponent } from './pre-diagnosis.component';

describe('PreDiagnosisComponent', () => {
  let component: PreDiagnosisComponent;
  let fixture: ComponentFixture<PreDiagnosisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreDiagnosisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreDiagnosisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
