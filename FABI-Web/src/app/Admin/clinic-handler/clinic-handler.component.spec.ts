import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicHandlerComponent } from './clinic-handler.component';

describe('ClinicHandlerComponent', () => {
  let component: ClinicHandlerComponent;
  let fixture: ComponentFixture<ClinicHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClinicHandlerComponent ]
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
