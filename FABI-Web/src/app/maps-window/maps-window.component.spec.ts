import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsWindowComponent } from './maps-window.component';

describe('MapsWindowComponent', () => {
  let component: MapsWindowComponent;
  let fixture: ComponentFixture<MapsWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
