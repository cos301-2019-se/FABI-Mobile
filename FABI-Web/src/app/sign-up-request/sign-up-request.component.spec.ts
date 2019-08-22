import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpRequestComponent } from './sign-up-request.component';

describe('SignUpRequestComponent', () => {
  let component: SignUpRequestComponent;
  let fixture: ComponentFixture<SignUpRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
