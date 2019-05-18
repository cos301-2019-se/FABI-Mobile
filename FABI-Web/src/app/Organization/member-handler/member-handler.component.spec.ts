import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHandlerComponent } from './member-handler.component';

describe('MemberHandlerComponent', () => {
  let component: MemberHandlerComponent;
  let fixture: ComponentFixture<MemberHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
